function noop() { }
function assign(tar, src) {
    // @ts-ignore
    for (const k in src)
        tar[k] = src[k];
    return tar;
}
function add_location(element, file, line, column, char) {
    element.__svelte_meta = {
        loc: { file, line, column, char }
    };
}
function run(fn) {
    return fn();
}
function blank_object() {
    return Object.create(null);
}
function run_all(fns) {
    fns.forEach(run);
}
function is_function(thing) {
    return typeof thing === 'function';
}
function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}
function is_empty(obj) {
    return Object.keys(obj).length === 0;
}
function validate_store(store, name) {
    if (store != null && typeof store.subscribe !== 'function') {
        throw new Error(`'${name}' is not a store with a 'subscribe' method`);
    }
}
function subscribe(store, ...callbacks) {
    if (store == null) {
        return noop;
    }
    const unsub = store.subscribe(...callbacks);
    return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function component_subscribe(component, store, callback) {
    component.$$.on_destroy.push(subscribe(store, callback));
}
function create_slot(definition, ctx, $$scope, fn) {
    if (definition) {
        const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
        return definition[0](slot_ctx);
    }
}
function get_slot_context(definition, ctx, $$scope, fn) {
    return definition[1] && fn
        ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
        : $$scope.ctx;
}
function get_slot_changes(definition, $$scope, dirty, fn) {
    if (definition[2] && fn) {
        const lets = definition[2](fn(dirty));
        if ($$scope.dirty === undefined) {
            return lets;
        }
        if (typeof lets === 'object') {
            const merged = [];
            const len = Math.max($$scope.dirty.length, lets.length);
            for (let i = 0; i < len; i += 1) {
                merged[i] = $$scope.dirty[i] | lets[i];
            }
            return merged;
        }
        return $$scope.dirty | lets;
    }
    return $$scope.dirty;
}
function update_slot(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_context_fn) {
    const slot_changes = get_slot_changes(slot_definition, $$scope, dirty, get_slot_changes_fn);
    if (slot_changes) {
        const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
        slot.p(slot_context, slot_changes);
    }
}
function exclude_internal_props(props) {
    const result = {};
    for (const k in props)
        if (k[0] !== '$')
            result[k] = props[k];
    return result;
}
function compute_rest_props(props, keys) {
    const rest = {};
    keys = new Set(keys);
    for (const k in props)
        if (!keys.has(k) && k[0] !== '$')
            rest[k] = props[k];
    return rest;
}
function compute_slots(slots) {
    const result = {};
    for (const key in slots) {
        result[key] = true;
    }
    return result;
}
function set_store_value(store, ret, value = ret) {
    store.set(value);
    return ret;
}
function action_destroyer(action_result) {
    return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
}

// Track which nodes are claimed during hydration. Unclaimed nodes can then be removed from the DOM
// at the end of hydration without touching the remaining nodes.
let is_hydrating = false;
function start_hydrating() {
    is_hydrating = true;
}
function end_hydrating() {
    is_hydrating = false;
}
function upper_bound(low, high, key, value) {
    // Return first index of value larger than input value in the range [low, high)
    while (low < high) {
        const mid = low + ((high - low) >> 1);
        if (key(mid) <= value) {
            low = mid + 1;
        }
        else {
            high = mid;
        }
    }
    return low;
}
function init_hydrate(target) {
    if (target.hydrate_init)
        return;
    target.hydrate_init = true;
    // We know that all children have claim_order values since the unclaimed have been detached
    const children = target.childNodes;
    /*
    * Reorder claimed children optimally.
    * We can reorder claimed children optimally by finding the longest subsequence of
    * nodes that are already claimed in order and only moving the rest. The longest
    * subsequence subsequence of nodes that are claimed in order can be found by
    * computing the longest increasing subsequence of .claim_order values.
    *
    * This algorithm is optimal in generating the least amount of reorder operations
    * possible.
    *
    * Proof:
    * We know that, given a set of reordering operations, the nodes that do not move
    * always form an increasing subsequence, since they do not move among each other
    * meaning that they must be already ordered among each other. Thus, the maximal
    * set of nodes that do not move form a longest increasing subsequence.
    */
    // Compute longest increasing subsequence
    // m: subsequence length j => index k of smallest value that ends an increasing subsequence of length j
    const m = new Int32Array(children.length + 1);
    // Predecessor indices + 1
    const p = new Int32Array(children.length);
    m[0] = -1;
    let longest = 0;
    for (let i = 0; i < children.length; i++) {
        const current = children[i].claim_order;
        // Find the largest subsequence length such that it ends in a value less than our current value
        // upper_bound returns first greater value, so we subtract one
        const seqLen = upper_bound(1, longest + 1, idx => children[m[idx]].claim_order, current) - 1;
        p[i] = m[seqLen] + 1;
        const newLen = seqLen + 1;
        // We can guarantee that current is the smallest value. Otherwise, we would have generated a longer sequence.
        m[newLen] = i;
        longest = Math.max(newLen, longest);
    }
    // The longest increasing subsequence of nodes (initially reversed)
    const lis = [];
    // The rest of the nodes, nodes that will be moved
    const toMove = [];
    let last = children.length - 1;
    for (let cur = m[longest] + 1; cur != 0; cur = p[cur - 1]) {
        lis.push(children[cur - 1]);
        for (; last >= cur; last--) {
            toMove.push(children[last]);
        }
        last--;
    }
    for (; last >= 0; last--) {
        toMove.push(children[last]);
    }
    lis.reverse();
    // We sort the nodes being moved to guarantee that their insertion order matches the claim order
    toMove.sort((a, b) => a.claim_order - b.claim_order);
    // Finally, we move the nodes
    for (let i = 0, j = 0; i < toMove.length; i++) {
        while (j < lis.length && toMove[i].claim_order >= lis[j].claim_order) {
            j++;
        }
        const anchor = j < lis.length ? lis[j] : null;
        target.insertBefore(toMove[i], anchor);
    }
}
function append(target, node) {
    if (is_hydrating) {
        init_hydrate(target);
        if ((target.actual_end_child === undefined) || ((target.actual_end_child !== null) && (target.actual_end_child.parentElement !== target))) {
            target.actual_end_child = target.firstChild;
        }
        if (node !== target.actual_end_child) {
            target.insertBefore(node, target.actual_end_child);
        }
        else {
            target.actual_end_child = node.nextSibling;
        }
    }
    else if (node.parentNode !== target) {
        target.appendChild(node);
    }
}
function insert(target, node, anchor) {
    if (is_hydrating && !anchor) {
        append(target, node);
    }
    else if (node.parentNode !== target || (anchor && node.nextSibling !== anchor)) {
        target.insertBefore(node, anchor || null);
    }
}
function detach(node) {
    node.parentNode.removeChild(node);
}
function destroy_each(iterations, detaching) {
    for (let i = 0; i < iterations.length; i += 1) {
        if (iterations[i])
            iterations[i].d(detaching);
    }
}
function element(name) {
    return document.createElement(name);
}
function svg_element(name) {
    return document.createElementNS('http://www.w3.org/2000/svg', name);
}
function text(data) {
    return document.createTextNode(data);
}
function space() {
    return text(' ');
}
function empty() {
    return text('');
}
function listen(node, event, handler, options) {
    node.addEventListener(event, handler, options);
    return () => node.removeEventListener(event, handler, options);
}
function prevent_default(fn) {
    return function (event) {
        event.preventDefault();
        // @ts-ignore
        return fn.call(this, event);
    };
}
function stop_propagation(fn) {
    return function (event) {
        event.stopPropagation();
        // @ts-ignore
        return fn.call(this, event);
    };
}
function attr(node, attribute, value) {
    if (value == null)
        node.removeAttribute(attribute);
    else if (node.getAttribute(attribute) !== value)
        node.setAttribute(attribute, value);
}
function set_attributes(node, attributes) {
    // @ts-ignore
    const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
    for (const key in attributes) {
        if (attributes[key] == null) {
            node.removeAttribute(key);
        }
        else if (key === 'style') {
            node.style.cssText = attributes[key];
        }
        else if (key === '__value') {
            node.value = node[key] = attributes[key];
        }
        else if (descriptors[key] && descriptors[key].set) {
            node[key] = attributes[key];
        }
        else {
            attr(node, key, attributes[key]);
        }
    }
}
function set_svg_attributes(node, attributes) {
    for (const key in attributes) {
        attr(node, key, attributes[key]);
    }
}
function children(element) {
    return Array.from(element.childNodes);
}
function claim_node(nodes, predicate, processNode, createNode, dontUpdateLastIndex = false) {
    // Try to find nodes in an order such that we lengthen the longest increasing subsequence
    if (nodes.claim_info === undefined) {
        nodes.claim_info = { last_index: 0, total_claimed: 0 };
    }
    const resultNode = (() => {
        // We first try to find an element after the previous one
        for (let i = nodes.claim_info.last_index; i < nodes.length; i++) {
            const node = nodes[i];
            if (predicate(node)) {
                processNode(node);
                nodes.splice(i, 1);
                if (!dontUpdateLastIndex) {
                    nodes.claim_info.last_index = i;
                }
                return node;
            }
        }
        // Otherwise, we try to find one before
        // We iterate in reverse so that we don't go too far back
        for (let i = nodes.claim_info.last_index - 1; i >= 0; i--) {
            const node = nodes[i];
            if (predicate(node)) {
                processNode(node);
                nodes.splice(i, 1);
                if (!dontUpdateLastIndex) {
                    nodes.claim_info.last_index = i;
                }
                else {
                    // Since we spliced before the last_index, we decrease it
                    nodes.claim_info.last_index--;
                }
                return node;
            }
        }
        // If we can't find any matching node, we create a new one
        return createNode();
    })();
    resultNode.claim_order = nodes.claim_info.total_claimed;
    nodes.claim_info.total_claimed += 1;
    return resultNode;
}
function claim_element(nodes, name, attributes, svg) {
    return claim_node(nodes, (node) => node.nodeName === name, (node) => {
        const remove = [];
        for (let j = 0; j < node.attributes.length; j++) {
            const attribute = node.attributes[j];
            if (!attributes[attribute.name]) {
                remove.push(attribute.name);
            }
        }
        remove.forEach(v => node.removeAttribute(v));
    }, () => svg ? svg_element(name) : element(name));
}
function claim_text(nodes, data) {
    return claim_node(nodes, (node) => node.nodeType === 3, (node) => {
        node.data = '' + data;
    }, () => text(data), true // Text nodes should not update last index since it is likely not worth it to eliminate an increasing subsequence of actual elements
    );
}
function claim_space(nodes) {
    return claim_text(nodes, ' ');
}
function set_input_value(input, value) {
    input.value = value == null ? '' : value;
}
function set_style(node, key, value, important) {
    node.style.setProperty(key, value, important ? 'important' : '');
}
function custom_event(type, detail) {
    const e = document.createEvent('CustomEvent');
    e.initCustomEvent(type, false, false, detail);
    return e;
}
function query_selector_all(selector, parent = document.body) {
    return Array.from(parent.querySelectorAll(selector));
}

let current_component;
function set_current_component(component) {
    current_component = component;
}
function get_current_component() {
    if (!current_component)
        throw new Error('Function called outside component initialization');
    return current_component;
}
function onMount(fn) {
    get_current_component().$$.on_mount.push(fn);
}
function afterUpdate(fn) {
    get_current_component().$$.after_update.push(fn);
}
function onDestroy(fn) {
    get_current_component().$$.on_destroy.push(fn);
}
function createEventDispatcher() {
    const component = get_current_component();
    return (type, detail) => {
        const callbacks = component.$$.callbacks[type];
        if (callbacks) {
            // TODO are there situations where events could be dispatched
            // in a server (non-DOM) environment?
            const event = custom_event(type, detail);
            callbacks.slice().forEach(fn => {
                fn.call(component, event);
            });
        }
    };
}
function setContext(key, context) {
    get_current_component().$$.context.set(key, context);
}
function getContext(key) {
    return get_current_component().$$.context.get(key);
}
// TODO figure out if we still want to support
// shorthand events, or if we want to implement
// a real bubbling mechanism
function bubble(component, event) {
    const callbacks = component.$$.callbacks[event.type];
    if (callbacks) {
        // @ts-ignore
        callbacks.slice().forEach(fn => fn.call(this, event));
    }
}

const dirty_components = [];
const binding_callbacks = [];
const render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = Promise.resolve();
let update_scheduled = false;
function schedule_update() {
    if (!update_scheduled) {
        update_scheduled = true;
        resolved_promise.then(flush);
    }
}
function tick() {
    schedule_update();
    return resolved_promise;
}
function add_render_callback(fn) {
    render_callbacks.push(fn);
}
function add_flush_callback(fn) {
    flush_callbacks.push(fn);
}
let flushing = false;
const seen_callbacks = new Set();
function flush() {
    if (flushing)
        return;
    flushing = true;
    do {
        // first, call beforeUpdate functions
        // and update components
        for (let i = 0; i < dirty_components.length; i += 1) {
            const component = dirty_components[i];
            set_current_component(component);
            update(component.$$);
        }
        set_current_component(null);
        dirty_components.length = 0;
        while (binding_callbacks.length)
            binding_callbacks.pop()();
        // then, once components are updated, call
        // afterUpdate functions. This may cause
        // subsequent updates...
        for (let i = 0; i < render_callbacks.length; i += 1) {
            const callback = render_callbacks[i];
            if (!seen_callbacks.has(callback)) {
                // ...so guard against infinite loops
                seen_callbacks.add(callback);
                callback();
            }
        }
        render_callbacks.length = 0;
    } while (dirty_components.length);
    while (flush_callbacks.length) {
        flush_callbacks.pop()();
    }
    update_scheduled = false;
    flushing = false;
    seen_callbacks.clear();
}
function update($$) {
    if ($$.fragment !== null) {
        $$.update();
        run_all($$.before_update);
        const dirty = $$.dirty;
        $$.dirty = [-1];
        $$.fragment && $$.fragment.p($$.ctx, dirty);
        $$.after_update.forEach(add_render_callback);
    }
}
const outroing = new Set();
let outros;
function group_outros() {
    outros = {
        r: 0,
        c: [],
        p: outros // parent group
    };
}
function check_outros() {
    if (!outros.r) {
        run_all(outros.c);
    }
    outros = outros.p;
}
function transition_in(block, local) {
    if (block && block.i) {
        outroing.delete(block);
        block.i(local);
    }
}
function transition_out(block, local, detach, callback) {
    if (block && block.o) {
        if (outroing.has(block))
            return;
        outroing.add(block);
        outros.c.push(() => {
            outroing.delete(block);
            if (callback) {
                if (detach)
                    block.d(1);
                callback();
            }
        });
        block.o(local);
    }
}

const globals = (typeof window !== 'undefined'
    ? window
    : typeof globalThis !== 'undefined'
        ? globalThis
        : global);
function outro_and_destroy_block(block, lookup) {
    transition_out(block, 1, 1, () => {
        lookup.delete(block.key);
    });
}
function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
    let o = old_blocks.length;
    let n = list.length;
    let i = o;
    const old_indexes = {};
    while (i--)
        old_indexes[old_blocks[i].key] = i;
    const new_blocks = [];
    const new_lookup = new Map();
    const deltas = new Map();
    i = n;
    while (i--) {
        const child_ctx = get_context(ctx, list, i);
        const key = get_key(child_ctx);
        let block = lookup.get(key);
        if (!block) {
            block = create_each_block(key, child_ctx);
            block.c();
        }
        else if (dynamic) {
            block.p(child_ctx, dirty);
        }
        new_lookup.set(key, new_blocks[i] = block);
        if (key in old_indexes)
            deltas.set(key, Math.abs(i - old_indexes[key]));
    }
    const will_move = new Set();
    const did_move = new Set();
    function insert(block) {
        transition_in(block, 1);
        block.m(node, next);
        lookup.set(block.key, block);
        next = block.first;
        n--;
    }
    while (o && n) {
        const new_block = new_blocks[n - 1];
        const old_block = old_blocks[o - 1];
        const new_key = new_block.key;
        const old_key = old_block.key;
        if (new_block === old_block) {
            // do nothing
            next = new_block.first;
            o--;
            n--;
        }
        else if (!new_lookup.has(old_key)) {
            // remove old block
            destroy(old_block, lookup);
            o--;
        }
        else if (!lookup.has(new_key) || will_move.has(new_key)) {
            insert(new_block);
        }
        else if (did_move.has(old_key)) {
            o--;
        }
        else if (deltas.get(new_key) > deltas.get(old_key)) {
            did_move.add(new_key);
            insert(new_block);
        }
        else {
            will_move.add(old_key);
            o--;
        }
    }
    while (o--) {
        const old_block = old_blocks[o];
        if (!new_lookup.has(old_block.key))
            destroy(old_block, lookup);
    }
    while (n)
        insert(new_blocks[n - 1]);
    return new_blocks;
}
function validate_each_keys(ctx, list, get_context, get_key) {
    const keys = new Set();
    for (let i = 0; i < list.length; i++) {
        const key = get_key(get_context(ctx, list, i));
        if (keys.has(key)) {
            throw new Error('Cannot have duplicate keys in a keyed each');
        }
        keys.add(key);
    }
}

function get_spread_update(levels, updates) {
    const update = {};
    const to_null_out = {};
    const accounted_for = { $$scope: 1 };
    let i = levels.length;
    while (i--) {
        const o = levels[i];
        const n = updates[i];
        if (n) {
            for (const key in o) {
                if (!(key in n))
                    to_null_out[key] = 1;
            }
            for (const key in n) {
                if (!accounted_for[key]) {
                    update[key] = n[key];
                    accounted_for[key] = 1;
                }
            }
            levels[i] = n;
        }
        else {
            for (const key in o) {
                accounted_for[key] = 1;
            }
        }
    }
    for (const key in to_null_out) {
        if (!(key in update))
            update[key] = undefined;
    }
    return update;
}
function get_spread_object(spread_props) {
    return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
}

function bind(component, name, callback) {
    const index = component.$$.props[name];
    if (index !== undefined) {
        component.$$.bound[index] = callback;
        callback(component.$$.ctx[index]);
    }
}
function create_component(block) {
    block && block.c();
}
function claim_component(block, parent_nodes) {
    block && block.l(parent_nodes);
}
function mount_component(component, target, anchor, customElement) {
    const { fragment, on_mount, on_destroy, after_update } = component.$$;
    fragment && fragment.m(target, anchor);
    if (!customElement) {
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
    }
    after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
    const $$ = component.$$;
    if ($$.fragment !== null) {
        run_all($$.on_destroy);
        $$.fragment && $$.fragment.d(detaching);
        // TODO null out other refs, including component.$$ (but need to
        // preserve final state?)
        $$.on_destroy = $$.fragment = null;
        $$.ctx = [];
    }
}
function make_dirty(component, i) {
    if (component.$$.dirty[0] === -1) {
        dirty_components.push(component);
        schedule_update();
        component.$$.dirty.fill(0);
    }
    component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
}
function init$1(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
    const parent_component = current_component;
    set_current_component(component);
    const $$ = component.$$ = {
        fragment: null,
        ctx: null,
        // state
        props,
        update: noop,
        not_equal,
        bound: blank_object(),
        // lifecycle
        on_mount: [],
        on_destroy: [],
        on_disconnect: [],
        before_update: [],
        after_update: [],
        context: new Map(parent_component ? parent_component.$$.context : options.context || []),
        // everything else
        callbacks: blank_object(),
        dirty,
        skip_bound: false
    };
    let ready = false;
    $$.ctx = instance
        ? instance(component, options.props || {}, (i, ret, ...rest) => {
            const value = rest.length ? rest[0] : ret;
            if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                if (!$$.skip_bound && $$.bound[i])
                    $$.bound[i](value);
                if (ready)
                    make_dirty(component, i);
            }
            return ret;
        })
        : [];
    $$.update();
    ready = true;
    run_all($$.before_update);
    // `false` as a special case of no DOM component
    $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
    if (options.target) {
        if (options.hydrate) {
            start_hydrating();
            const nodes = children(options.target);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.l(nodes);
            nodes.forEach(detach);
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.c();
        }
        if (options.intro)
            transition_in(component.$$.fragment);
        mount_component(component, options.target, options.anchor, options.customElement);
        end_hydrating();
        flush();
    }
    set_current_component(parent_component);
}
/**
 * Base class for Svelte components. Used when dev=false.
 */
class SvelteComponent {
    $destroy() {
        destroy_component(this, 1);
        this.$destroy = noop;
    }
    $on(type, callback) {
        const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
        callbacks.push(callback);
        return () => {
            const index = callbacks.indexOf(callback);
            if (index !== -1)
                callbacks.splice(index, 1);
        };
    }
    $set($$props) {
        if (this.$$set && !is_empty($$props)) {
            this.$$.skip_bound = true;
            this.$$set($$props);
            this.$$.skip_bound = false;
        }
    }
}

function dispatch_dev(type, detail) {
    document.dispatchEvent(custom_event(type, Object.assign({ version: '3.38.3' }, detail)));
}
function append_dev(target, node) {
    dispatch_dev('SvelteDOMInsert', { target, node });
    append(target, node);
}
function insert_dev(target, node, anchor) {
    dispatch_dev('SvelteDOMInsert', { target, node, anchor });
    insert(target, node, anchor);
}
function detach_dev(node) {
    dispatch_dev('SvelteDOMRemove', { node });
    detach(node);
}
function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
    const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
    if (has_prevent_default)
        modifiers.push('preventDefault');
    if (has_stop_propagation)
        modifiers.push('stopPropagation');
    dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
    const dispose = listen(node, event, handler, options);
    return () => {
        dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
        dispose();
    };
}
function attr_dev(node, attribute, value) {
    attr(node, attribute, value);
    if (value == null)
        dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
    else
        dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
}
function set_data_dev(text, data) {
    data = '' + data;
    if (text.wholeText === data)
        return;
    dispatch_dev('SvelteDOMSetData', { node: text, data });
    text.data = data;
}
function validate_each_argument(arg) {
    if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
        let msg = '{#each} only iterates over array-like objects.';
        if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
            msg += ' You can use a spread to convert this iterable into an array.';
        }
        throw new Error(msg);
    }
}
function validate_slots(name, slot, keys) {
    for (const slot_key of Object.keys(slot)) {
        if (!~keys.indexOf(slot_key)) {
            console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
        }
    }
}
/**
 * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
 */
class SvelteComponentDev extends SvelteComponent {
    constructor(options) {
        if (!options || (!options.target && !options.$$inline)) {
            throw new Error("'target' is a required option");
        }
        super();
    }
    $destroy() {
        super.$destroy();
        this.$destroy = () => {
            console.warn('Component was already destroyed'); // eslint-disable-line no-console
        };
    }
    $capture_state() { }
    $inject_state() { }
}

const subscriber_queue = [];
/**
 * Creates a `Readable` store that allows reading by subscription.
 * @param value initial value
 * @param {StartStopNotifier}start start and stop notifications for subscriptions
 */
function readable(value, start) {
    return {
        subscribe: writable(value, start).subscribe
    };
}
/**
 * Create a `Writable` store that allows both updating and reading by subscription.
 * @param {*=}value initial value
 * @param {StartStopNotifier=}start start and stop notifications for subscriptions
 */
function writable(value, start = noop) {
    let stop;
    const subscribers = [];
    function set(new_value) {
        if (safe_not_equal(value, new_value)) {
            value = new_value;
            if (stop) { // store is ready
                const run_queue = !subscriber_queue.length;
                for (let i = 0; i < subscribers.length; i += 1) {
                    const s = subscribers[i];
                    s[1]();
                    subscriber_queue.push(s, value);
                }
                if (run_queue) {
                    for (let i = 0; i < subscriber_queue.length; i += 2) {
                        subscriber_queue[i][0](subscriber_queue[i + 1]);
                    }
                    subscriber_queue.length = 0;
                }
            }
        }
    }
    function update(fn) {
        set(fn(value));
    }
    function subscribe(run, invalidate = noop) {
        const subscriber = [run, invalidate];
        subscribers.push(subscriber);
        if (subscribers.length === 1) {
            stop = start(set) || noop;
        }
        run(value);
        return () => {
            const index = subscribers.indexOf(subscriber);
            if (index !== -1) {
                subscribers.splice(index, 1);
            }
            if (subscribers.length === 0) {
                stop();
                stop = null;
            }
        };
    }
    return { set, update, subscribe };
}

const CONTEXT_KEY = {};

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter$1(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCFoundation = /** @class */ (function () {
    function MDCFoundation(adapter) {
        if (adapter === void 0) { adapter = {}; }
        this.adapter = adapter;
    }
    Object.defineProperty(MDCFoundation, "cssClasses", {
        get: function () {
            // Classes extending MDCFoundation should implement this method to return an object which exports every
            // CSS class the foundation class needs as a property. e.g. {ACTIVE: 'mdc-component--active'}
            return {};
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCFoundation, "strings", {
        get: function () {
            // Classes extending MDCFoundation should implement this method to return an object which exports all
            // semantic strings as constants. e.g. {ARIA_ROLE: 'tablist'}
            return {};
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCFoundation, "numbers", {
        get: function () {
            // Classes extending MDCFoundation should implement this method to return an object which exports all
            // of its semantic numbers as constants. e.g. {ANIMATION_DELAY_MS: 350}
            return {};
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCFoundation, "defaultAdapter", {
        get: function () {
            // Classes extending MDCFoundation may choose to implement this getter in order to provide a convenient
            // way of viewing the necessary methods of an adapter. In the future, this could also be used for adapter
            // validation.
            return {};
        },
        enumerable: false,
        configurable: true
    });
    MDCFoundation.prototype.init = function () {
        // Subclasses should override this method to perform initialization routines (registering events, etc.)
    };
    MDCFoundation.prototype.destroy = function () {
        // Subclasses should override this method to perform de-initialization routines (de-registering events, etc.)
    };
    return MDCFoundation;
}());

/**
 * @license
 * Copyright 2020 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var FOCUS_SENTINEL_CLASS = 'mdc-dom-focus-sentinel';
/**
 * Utility to trap focus in a given root element, e.g. for modal components such
 * as dialogs. The root should have at least one focusable child element,
 * for setting initial focus when trapping focus.
 * Also tracks the previously focused element, and restores focus to that
 * element when releasing focus.
 */
var FocusTrap = /** @class */ (function () {
    function FocusTrap(root, options) {
        if (options === void 0) { options = {}; }
        this.root = root;
        this.options = options;
        // Previously focused element before trapping focus.
        this.elFocusedBeforeTrapFocus = null;
    }
    /**
     * Traps focus in `root`. Also focuses on either `initialFocusEl` if set;
     * otherwises sets initial focus to the first focusable child element.
     */
    FocusTrap.prototype.trapFocus = function () {
        var focusableEls = this.getFocusableElements(this.root);
        if (focusableEls.length === 0) {
            throw new Error('FocusTrap: Element must have at least one focusable child.');
        }
        this.elFocusedBeforeTrapFocus =
            document.activeElement instanceof HTMLElement ? document.activeElement :
                null;
        this.wrapTabFocus(this.root);
        if (!this.options.skipInitialFocus) {
            this.focusInitialElement(focusableEls, this.options.initialFocusEl);
        }
    };
    /**
     * Releases focus from `root`. Also restores focus to the previously focused
     * element.
     */
    FocusTrap.prototype.releaseFocus = function () {
        [].slice.call(this.root.querySelectorAll("." + FOCUS_SENTINEL_CLASS))
            .forEach(function (sentinelEl) {
            sentinelEl.parentElement.removeChild(sentinelEl);
        });
        if (!this.options.skipRestoreFocus && this.elFocusedBeforeTrapFocus) {
            this.elFocusedBeforeTrapFocus.focus();
        }
    };
    /**
     * Wraps tab focus within `el` by adding two hidden sentinel divs which are
     * used to mark the beginning and the end of the tabbable region. When
     * focused, these sentinel elements redirect focus to the first/last
     * children elements of the tabbable region, ensuring that focus is trapped
     * within that region.
     */
    FocusTrap.prototype.wrapTabFocus = function (el) {
        var _this = this;
        var sentinelStart = this.createSentinel();
        var sentinelEnd = this.createSentinel();
        sentinelStart.addEventListener('focus', function () {
            var focusableEls = _this.getFocusableElements(el);
            if (focusableEls.length > 0) {
                focusableEls[focusableEls.length - 1].focus();
            }
        });
        sentinelEnd.addEventListener('focus', function () {
            var focusableEls = _this.getFocusableElements(el);
            if (focusableEls.length > 0) {
                focusableEls[0].focus();
            }
        });
        el.insertBefore(sentinelStart, el.children[0]);
        el.appendChild(sentinelEnd);
    };
    /**
     * Focuses on `initialFocusEl` if defined and a child of the root element.
     * Otherwise, focuses on the first focusable child element of the root.
     */
    FocusTrap.prototype.focusInitialElement = function (focusableEls, initialFocusEl) {
        var focusIndex = 0;
        if (initialFocusEl) {
            focusIndex = Math.max(focusableEls.indexOf(initialFocusEl), 0);
        }
        focusableEls[focusIndex].focus();
    };
    FocusTrap.prototype.getFocusableElements = function (root) {
        var focusableEls = [].slice.call(root.querySelectorAll('[autofocus], [tabindex], a, input, textarea, select, button'));
        return focusableEls.filter(function (el) {
            var isDisabledOrHidden = el.getAttribute('aria-disabled') === 'true' ||
                el.getAttribute('disabled') != null ||
                el.getAttribute('hidden') != null ||
                el.getAttribute('aria-hidden') === 'true';
            var isTabbableAndVisible = el.tabIndex >= 0 &&
                el.getBoundingClientRect().width > 0 &&
                !el.classList.contains(FOCUS_SENTINEL_CLASS) && !isDisabledOrHidden;
            var isProgrammaticallyHidden = false;
            if (isTabbableAndVisible) {
                var style = getComputedStyle(el);
                isProgrammaticallyHidden =
                    style.display === 'none' || style.visibility === 'hidden';
            }
            return isTabbableAndVisible && !isProgrammaticallyHidden;
        });
    };
    FocusTrap.prototype.createSentinel = function () {
        var sentinel = document.createElement('div');
        sentinel.setAttribute('tabindex', '0');
        // Don't announce in screen readers.
        sentinel.setAttribute('aria-hidden', 'true');
        sentinel.classList.add(FOCUS_SENTINEL_CLASS);
        return sentinel;
    };
    return FocusTrap;
}());

var domFocusTrap = /*#__PURE__*/Object.freeze({
    __proto__: null,
    FocusTrap: FocusTrap
});

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
/**
 * @fileoverview A "ponyfill" is a polyfill that doesn't modify the global prototype chain.
 * This makes ponyfills safer than traditional polyfills, especially for libraries like MDC.
 */
function closest(element, selector) {
    if (element.closest) {
        return element.closest(selector);
    }
    var el = element;
    while (el) {
        if (matches$1(el, selector)) {
            return el;
        }
        el = el.parentElement;
    }
    return null;
}
function matches$1(element, selector) {
    var nativeMatches = element.matches
        || element.webkitMatchesSelector
        || element.msMatchesSelector;
    return nativeMatches.call(element, selector);
}
/**
 * Used to compute the estimated scroll width of elements. When an element is
 * hidden due to display: none; being applied to a parent element, the width is
 * returned as 0. However, the element will have a true width once no longer
 * inside a display: none context. This method computes an estimated width when
 * the element is hidden or returns the true width when the element is visble.
 * @param {Element} element the element whose width to estimate
 */
function estimateScrollWidth(element) {
    // Check the offsetParent. If the element inherits display: none from any
    // parent, the offsetParent property will be null (see
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetParent).
    // This check ensures we only clone the node when necessary.
    var htmlEl = element;
    if (htmlEl.offsetParent !== null) {
        return htmlEl.scrollWidth;
    }
    var clone = htmlEl.cloneNode(true);
    clone.style.setProperty('position', 'absolute');
    clone.style.setProperty('transform', 'translate(-9999px, -9999px)');
    document.documentElement.appendChild(clone);
    var scrollWidth = clone.scrollWidth;
    document.documentElement.removeChild(clone);
    return scrollWidth;
}

var ponyfill = /*#__PURE__*/Object.freeze({
    __proto__: null,
    closest: closest,
    matches: matches$1,
    estimateScrollWidth: estimateScrollWidth
});

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var _a, _b;
var cssClasses$4 = {
    LIST_ITEM_ACTIVATED_CLASS: 'mdc-list-item--activated',
    LIST_ITEM_CLASS: 'mdc-list-item',
    LIST_ITEM_DISABLED_CLASS: 'mdc-list-item--disabled',
    LIST_ITEM_SELECTED_CLASS: 'mdc-list-item--selected',
    LIST_ITEM_TEXT_CLASS: 'mdc-list-item__text',
    LIST_ITEM_PRIMARY_TEXT_CLASS: 'mdc-list-item__primary-text',
    ROOT: 'mdc-list',
};
(_a = {},
    _a["" + cssClasses$4.LIST_ITEM_ACTIVATED_CLASS] = 'mdc-list-item--activated',
    _a["" + cssClasses$4.LIST_ITEM_CLASS] = 'mdc-list-item',
    _a["" + cssClasses$4.LIST_ITEM_DISABLED_CLASS] = 'mdc-list-item--disabled',
    _a["" + cssClasses$4.LIST_ITEM_SELECTED_CLASS] = 'mdc-list-item--selected',
    _a["" + cssClasses$4.LIST_ITEM_PRIMARY_TEXT_CLASS] = 'mdc-list-item__primary-text',
    _a["" + cssClasses$4.ROOT] = 'mdc-list',
    _a);
var deprecatedClassNameMap = (_b = {},
    _b["" + cssClasses$4.LIST_ITEM_ACTIVATED_CLASS] = 'mdc-deprecated-list-item--activated',
    _b["" + cssClasses$4.LIST_ITEM_CLASS] = 'mdc-deprecated-list-item',
    _b["" + cssClasses$4.LIST_ITEM_DISABLED_CLASS] = 'mdc-deprecated-list-item--disabled',
    _b["" + cssClasses$4.LIST_ITEM_SELECTED_CLASS] = 'mdc-deprecated-list-item--selected',
    _b["" + cssClasses$4.LIST_ITEM_TEXT_CLASS] = 'mdc-deprecated-list-item__text',
    _b["" + cssClasses$4.LIST_ITEM_PRIMARY_TEXT_CLASS] = 'mdc-deprecated-list-item__primary-text',
    _b["" + cssClasses$4.ROOT] = 'mdc-deprecated-list',
    _b);
var strings$4 = {
    ACTION_EVENT: 'MDCList:action',
    ARIA_CHECKED: 'aria-checked',
    ARIA_CHECKED_CHECKBOX_SELECTOR: '[role="checkbox"][aria-checked="true"]',
    ARIA_CHECKED_RADIO_SELECTOR: '[role="radio"][aria-checked="true"]',
    ARIA_CURRENT: 'aria-current',
    ARIA_DISABLED: 'aria-disabled',
    ARIA_ORIENTATION: 'aria-orientation',
    ARIA_ORIENTATION_HORIZONTAL: 'horizontal',
    ARIA_ROLE_CHECKBOX_SELECTOR: '[role="checkbox"]',
    ARIA_SELECTED: 'aria-selected',
    ARIA_INTERACTIVE_ROLES_SELECTOR: '[role="listbox"], [role="menu"]',
    ARIA_MULTI_SELECTABLE_SELECTOR: '[aria-multiselectable="true"]',
    CHECKBOX_RADIO_SELECTOR: 'input[type="checkbox"], input[type="radio"]',
    CHECKBOX_SELECTOR: 'input[type="checkbox"]',
    CHILD_ELEMENTS_TO_TOGGLE_TABINDEX: "\n    ." + cssClasses$4.LIST_ITEM_CLASS + " button:not(:disabled),\n    ." + cssClasses$4.LIST_ITEM_CLASS + " a,\n    ." + deprecatedClassNameMap[cssClasses$4.LIST_ITEM_CLASS] + " button:not(:disabled),\n    ." + deprecatedClassNameMap[cssClasses$4.LIST_ITEM_CLASS] + " a\n  ",
    DEPRECATED_SELECTOR: '.mdc-deprecated-list',
    FOCUSABLE_CHILD_ELEMENTS: "\n    ." + cssClasses$4.LIST_ITEM_CLASS + " button:not(:disabled),\n    ." + cssClasses$4.LIST_ITEM_CLASS + " a,\n    ." + cssClasses$4.LIST_ITEM_CLASS + " input[type=\"radio\"]:not(:disabled),\n    ." + cssClasses$4.LIST_ITEM_CLASS + " input[type=\"checkbox\"]:not(:disabled),\n    ." + deprecatedClassNameMap[cssClasses$4.LIST_ITEM_CLASS] + " button:not(:disabled),\n    ." + deprecatedClassNameMap[cssClasses$4.LIST_ITEM_CLASS] + " a,\n    ." + deprecatedClassNameMap[cssClasses$4.LIST_ITEM_CLASS] + " input[type=\"radio\"]:not(:disabled),\n    ." + deprecatedClassNameMap[cssClasses$4.LIST_ITEM_CLASS] + " input[type=\"checkbox\"]:not(:disabled)\n  ",
    RADIO_SELECTOR: 'input[type="radio"]',
    SELECTED_ITEM_SELECTOR: '[aria-selected="true"], [aria-current="true"]',
};
var numbers$2 = {
    UNSET_INDEX: -1,
    TYPEAHEAD_BUFFER_CLEAR_TIMEOUT_MS: 300
};

/**
 * @license
 * Copyright 2020 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
/**
 * KEY provides normalized string values for keys.
 */
var KEY = {
    UNKNOWN: 'Unknown',
    BACKSPACE: 'Backspace',
    ENTER: 'Enter',
    SPACEBAR: 'Spacebar',
    PAGE_UP: 'PageUp',
    PAGE_DOWN: 'PageDown',
    END: 'End',
    HOME: 'Home',
    ARROW_LEFT: 'ArrowLeft',
    ARROW_UP: 'ArrowUp',
    ARROW_RIGHT: 'ArrowRight',
    ARROW_DOWN: 'ArrowDown',
    DELETE: 'Delete',
    ESCAPE: 'Escape',
    TAB: 'Tab',
};
var normalizedKeys = new Set();
// IE11 has no support for new Map with iterable so we need to initialize this
// by hand.
normalizedKeys.add(KEY.BACKSPACE);
normalizedKeys.add(KEY.ENTER);
normalizedKeys.add(KEY.SPACEBAR);
normalizedKeys.add(KEY.PAGE_UP);
normalizedKeys.add(KEY.PAGE_DOWN);
normalizedKeys.add(KEY.END);
normalizedKeys.add(KEY.HOME);
normalizedKeys.add(KEY.ARROW_LEFT);
normalizedKeys.add(KEY.ARROW_UP);
normalizedKeys.add(KEY.ARROW_RIGHT);
normalizedKeys.add(KEY.ARROW_DOWN);
normalizedKeys.add(KEY.DELETE);
normalizedKeys.add(KEY.ESCAPE);
normalizedKeys.add(KEY.TAB);
var KEY_CODE = {
    BACKSPACE: 8,
    ENTER: 13,
    SPACEBAR: 32,
    PAGE_UP: 33,
    PAGE_DOWN: 34,
    END: 35,
    HOME: 36,
    ARROW_LEFT: 37,
    ARROW_UP: 38,
    ARROW_RIGHT: 39,
    ARROW_DOWN: 40,
    DELETE: 46,
    ESCAPE: 27,
    TAB: 9,
};
var mappedKeyCodes = new Map();
// IE11 has no support for new Map with iterable so we need to initialize this
// by hand.
mappedKeyCodes.set(KEY_CODE.BACKSPACE, KEY.BACKSPACE);
mappedKeyCodes.set(KEY_CODE.ENTER, KEY.ENTER);
mappedKeyCodes.set(KEY_CODE.SPACEBAR, KEY.SPACEBAR);
mappedKeyCodes.set(KEY_CODE.PAGE_UP, KEY.PAGE_UP);
mappedKeyCodes.set(KEY_CODE.PAGE_DOWN, KEY.PAGE_DOWN);
mappedKeyCodes.set(KEY_CODE.END, KEY.END);
mappedKeyCodes.set(KEY_CODE.HOME, KEY.HOME);
mappedKeyCodes.set(KEY_CODE.ARROW_LEFT, KEY.ARROW_LEFT);
mappedKeyCodes.set(KEY_CODE.ARROW_UP, KEY.ARROW_UP);
mappedKeyCodes.set(KEY_CODE.ARROW_RIGHT, KEY.ARROW_RIGHT);
mappedKeyCodes.set(KEY_CODE.ARROW_DOWN, KEY.ARROW_DOWN);
mappedKeyCodes.set(KEY_CODE.DELETE, KEY.DELETE);
mappedKeyCodes.set(KEY_CODE.ESCAPE, KEY.ESCAPE);
mappedKeyCodes.set(KEY_CODE.TAB, KEY.TAB);
var navigationKeys = new Set();
// IE11 has no support for new Set with iterable so we need to initialize this
// by hand.
navigationKeys.add(KEY.PAGE_UP);
navigationKeys.add(KEY.PAGE_DOWN);
navigationKeys.add(KEY.END);
navigationKeys.add(KEY.HOME);
navigationKeys.add(KEY.ARROW_LEFT);
navigationKeys.add(KEY.ARROW_UP);
navigationKeys.add(KEY.ARROW_RIGHT);
navigationKeys.add(KEY.ARROW_DOWN);
/**
 * normalizeKey returns the normalized string for a navigational action.
 */
function normalizeKey(evt) {
    var key = evt.key;
    // If the event already has a normalized key, return it
    if (normalizedKeys.has(key)) {
        return key;
    }
    // tslint:disable-next-line:deprecation
    var mappedKey = mappedKeyCodes.get(evt.keyCode);
    if (mappedKey) {
        return mappedKey;
    }
    return KEY.UNKNOWN;
}

/**
 * @license
 * Copyright 2020 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var ELEMENTS_KEY_ALLOWED_IN = ['input', 'button', 'textarea', 'select'];
/**
 * Ensures that preventDefault is only called if the containing element
 * doesn't consume the event, and it will cause an unintended scroll.
 *
 * @param evt keyboard event to be prevented.
 */
var preventDefaultEvent = function (evt) {
    var target = evt.target;
    if (!target) {
        return;
    }
    var tagName = ("" + target.tagName).toLowerCase();
    if (ELEMENTS_KEY_ALLOWED_IN.indexOf(tagName) === -1) {
        evt.preventDefault();
    }
};

/**
 * @license
 * Copyright 2020 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
/**
 * Initializes a state object for typeahead. Use the same reference for calls to
 * typeahead functions.
 *
 * @return The current state of the typeahead process. Each state reference
 *     represents a typeahead instance as the reference is typically mutated
 *     in-place.
 */
function initState() {
    var state = {
        bufferClearTimeout: 0,
        currentFirstChar: '',
        sortedIndexCursor: 0,
        typeaheadBuffer: '',
    };
    return state;
}
/**
 * Initializes typeahead state by indexing the current list items by primary
 * text into the sortedIndexByFirstChar data structure.
 *
 * @param listItemCount numer of items in the list
 * @param getPrimaryTextByItemIndex function that returns the primary text at a
 *     given index
 *
 * @return Map that maps the first character of the primary text to the full
 *     list text and it's index
 */
function initSortedIndex(listItemCount, getPrimaryTextByItemIndex) {
    var sortedIndexByFirstChar = new Map();
    // Aggregate item text to index mapping
    for (var i = 0; i < listItemCount; i++) {
        var primaryText = getPrimaryTextByItemIndex(i).trim();
        if (!primaryText) {
            continue;
        }
        var firstChar = primaryText[0].toLowerCase();
        if (!sortedIndexByFirstChar.has(firstChar)) {
            sortedIndexByFirstChar.set(firstChar, []);
        }
        sortedIndexByFirstChar.get(firstChar).push({ text: primaryText.toLowerCase(), index: i });
    }
    // Sort the mapping
    // TODO(b/157162694): Investigate replacing forEach with Map.values()
    sortedIndexByFirstChar.forEach(function (values) {
        values.sort(function (first, second) {
            return first.index - second.index;
        });
    });
    return sortedIndexByFirstChar;
}
/**
 * Given the next desired character from the user, it attempts to find the next
 * list option matching the buffer. Wraps around if at the end of options.
 *
 * @param opts Options and accessors
 *   - nextChar - the next character to match against items
 *   - sortedIndexByFirstChar - output of `initSortedIndex(...)`
 *   - focusedItemIndex - the index of the currently focused item
 *   - focusItemAtIndex - function that focuses a list item at given index
 *   - skipFocus - whether or not to focus the matched item
 *   - isItemAtIndexDisabled - function that determines whether an item at a
 *        given index is disabled
 * @param state The typeahead state instance. See `initState`.
 *
 * @return The index of the matched item, or -1 if no match.
 */
function matchItem(opts, state) {
    var nextChar = opts.nextChar, focusItemAtIndex = opts.focusItemAtIndex, sortedIndexByFirstChar = opts.sortedIndexByFirstChar, focusedItemIndex = opts.focusedItemIndex, skipFocus = opts.skipFocus, isItemAtIndexDisabled = opts.isItemAtIndexDisabled;
    clearTimeout(state.bufferClearTimeout);
    state.bufferClearTimeout = setTimeout(function () {
        clearBuffer(state);
    }, numbers$2.TYPEAHEAD_BUFFER_CLEAR_TIMEOUT_MS);
    state.typeaheadBuffer = state.typeaheadBuffer + nextChar;
    var index;
    if (state.typeaheadBuffer.length === 1) {
        index = matchFirstChar(sortedIndexByFirstChar, focusedItemIndex, isItemAtIndexDisabled, state);
    }
    else {
        index = matchAllChars(sortedIndexByFirstChar, isItemAtIndexDisabled, state);
    }
    if (index !== -1 && !skipFocus) {
        focusItemAtIndex(index);
    }
    return index;
}
/**
 * Matches the user's single input character in the buffer to the
 * next option that begins with such character. Wraps around if at
 * end of options. Returns -1 if no match is found.
 */
function matchFirstChar(sortedIndexByFirstChar, focusedItemIndex, isItemAtIndexDisabled, state) {
    var firstChar = state.typeaheadBuffer[0];
    var itemsMatchingFirstChar = sortedIndexByFirstChar.get(firstChar);
    if (!itemsMatchingFirstChar) {
        return -1;
    }
    // Has the same firstChar been recently matched?
    // Also, did starting index remain the same between key presses?
    // If both hold true, simply increment index.
    if (firstChar === state.currentFirstChar &&
        itemsMatchingFirstChar[state.sortedIndexCursor].index ===
            focusedItemIndex) {
        state.sortedIndexCursor =
            (state.sortedIndexCursor + 1) % itemsMatchingFirstChar.length;
        var newIndex = itemsMatchingFirstChar[state.sortedIndexCursor].index;
        if (!isItemAtIndexDisabled(newIndex)) {
            return newIndex;
        }
    }
    // If we're here, it means one of the following happened:
    // - either firstChar or startingIndex has changed, invalidating the
    // cursor.
    // - The next item of typeahead is disabled, so we have to look further.
    state.currentFirstChar = firstChar;
    var newCursorPosition = -1;
    var cursorPosition;
    // Find the first non-disabled item as a fallback.
    for (cursorPosition = 0; cursorPosition < itemsMatchingFirstChar.length; cursorPosition++) {
        if (!isItemAtIndexDisabled(itemsMatchingFirstChar[cursorPosition].index)) {
            newCursorPosition = cursorPosition;
            break;
        }
    }
    // Advance cursor to first item matching the firstChar that is positioned
    // after starting item. Cursor is unchanged from fallback if there's no
    // such item.
    for (; cursorPosition < itemsMatchingFirstChar.length; cursorPosition++) {
        if (itemsMatchingFirstChar[cursorPosition].index > focusedItemIndex &&
            !isItemAtIndexDisabled(itemsMatchingFirstChar[cursorPosition].index)) {
            newCursorPosition = cursorPosition;
            break;
        }
    }
    if (newCursorPosition !== -1) {
        state.sortedIndexCursor = newCursorPosition;
        return itemsMatchingFirstChar[state.sortedIndexCursor].index;
    }
    return -1;
}
/**
 * Attempts to find the next item that matches all of the typeahead buffer.
 * Wraps around if at end of options. Returns -1 if no match is found.
 */
function matchAllChars(sortedIndexByFirstChar, isItemAtIndexDisabled, state) {
    var firstChar = state.typeaheadBuffer[0];
    var itemsMatchingFirstChar = sortedIndexByFirstChar.get(firstChar);
    if (!itemsMatchingFirstChar) {
        return -1;
    }
    // Do nothing if text already matches
    var startingItem = itemsMatchingFirstChar[state.sortedIndexCursor];
    if (startingItem.text.lastIndexOf(state.typeaheadBuffer, 0) === 0 &&
        !isItemAtIndexDisabled(startingItem.index)) {
        return startingItem.index;
    }
    // Find next item that matches completely; if no match, we'll eventually
    // loop around to same position
    var cursorPosition = (state.sortedIndexCursor + 1) % itemsMatchingFirstChar.length;
    var nextCursorPosition = -1;
    while (cursorPosition !== state.sortedIndexCursor) {
        var currentItem = itemsMatchingFirstChar[cursorPosition];
        var matches = currentItem.text.lastIndexOf(state.typeaheadBuffer, 0) === 0;
        var isEnabled = !isItemAtIndexDisabled(currentItem.index);
        if (matches && isEnabled) {
            nextCursorPosition = cursorPosition;
            break;
        }
        cursorPosition = (cursorPosition + 1) % itemsMatchingFirstChar.length;
    }
    if (nextCursorPosition !== -1) {
        state.sortedIndexCursor = nextCursorPosition;
        return itemsMatchingFirstChar[state.sortedIndexCursor].index;
    }
    return -1;
}
/**
 * Whether or not the given typeahead instaance state is currently typing.
 *
 * @param state The typeahead state instance. See `initState`.
 */
function isTypingInProgress(state) {
    return state.typeaheadBuffer.length > 0;
}
/**
 * Clears the typeahaed buffer so that it resets item matching to the first
 * character.
 *
 * @param state The typeahead state instance. See `initState`.
 */
function clearBuffer(state) {
    state.typeaheadBuffer = '';
}
/**
 * Given a keydown event, it calculates whether or not to automatically focus a
 * list item depending on what was typed mimicing the typeahead functionality of
 * a standard <select> element that is open.
 *
 * @param opts Options and accessors
 *   - event - the KeyboardEvent to handle and parse
 *   - sortedIndexByFirstChar - output of `initSortedIndex(...)`
 *   - focusedItemIndex - the index of the currently focused item
 *   - focusItemAtIndex - function that focuses a list item at given index
 *   - isItemAtFocusedIndexDisabled - whether or not the currently focused item
 *      is disabled
 *   - isTargetListItem - whether or not the event target is a list item
 * @param state The typeahead state instance. See `initState`.
 *
 * @returns index of the item matched by the keydown. -1 if not matched.
 */
function handleKeydown(opts, state) {
    var event = opts.event, isTargetListItem = opts.isTargetListItem, focusedItemIndex = opts.focusedItemIndex, focusItemAtIndex = opts.focusItemAtIndex, sortedIndexByFirstChar = opts.sortedIndexByFirstChar, isItemAtIndexDisabled = opts.isItemAtIndexDisabled;
    var isArrowLeft = normalizeKey(event) === 'ArrowLeft';
    var isArrowUp = normalizeKey(event) === 'ArrowUp';
    var isArrowRight = normalizeKey(event) === 'ArrowRight';
    var isArrowDown = normalizeKey(event) === 'ArrowDown';
    var isHome = normalizeKey(event) === 'Home';
    var isEnd = normalizeKey(event) === 'End';
    var isEnter = normalizeKey(event) === 'Enter';
    var isSpace = normalizeKey(event) === 'Spacebar';
    if (event.ctrlKey || event.metaKey || isArrowLeft || isArrowUp ||
        isArrowRight || isArrowDown || isHome || isEnd || isEnter) {
        return -1;
    }
    var isCharacterKey = !isSpace && event.key.length === 1;
    if (isCharacterKey) {
        preventDefaultEvent(event);
        var matchItemOpts = {
            focusItemAtIndex: focusItemAtIndex,
            focusedItemIndex: focusedItemIndex,
            nextChar: event.key.toLowerCase(),
            sortedIndexByFirstChar: sortedIndexByFirstChar,
            skipFocus: false,
            isItemAtIndexDisabled: isItemAtIndexDisabled,
        };
        return matchItem(matchItemOpts, state);
    }
    if (!isSpace) {
        return -1;
    }
    if (isTargetListItem) {
        preventDefaultEvent(event);
    }
    var typeaheadOnListItem = isTargetListItem && isTypingInProgress(state);
    if (typeaheadOnListItem) {
        var matchItemOpts = {
            focusItemAtIndex: focusItemAtIndex,
            focusedItemIndex: focusedItemIndex,
            nextChar: ' ',
            sortedIndexByFirstChar: sortedIndexByFirstChar,
            skipFocus: false,
            isItemAtIndexDisabled: isItemAtIndexDisabled,
        };
        // space participates in typeahead matching if in rapid typing mode
        return matchItem(matchItemOpts, state);
    }
    return -1;
}

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
function isNumberArray(selectedIndex) {
    return selectedIndex instanceof Array;
}
var MDCListFoundation = /** @class */ (function (_super) {
    __extends(MDCListFoundation, _super);
    function MDCListFoundation(adapter) {
        var _this = _super.call(this, __assign(__assign({}, MDCListFoundation.defaultAdapter), adapter)) || this;
        _this.wrapFocus_ = false;
        _this.isVertical_ = true;
        _this.isSingleSelectionList_ = false;
        _this.selectedIndex_ = numbers$2.UNSET_INDEX;
        _this.focusedItemIndex = numbers$2.UNSET_INDEX;
        _this.useActivatedClass_ = false;
        _this.useSelectedAttr_ = false;
        _this.ariaCurrentAttrValue_ = null;
        _this.isCheckboxList_ = false;
        _this.isRadioList_ = false;
        _this.hasTypeahead = false;
        // Transiently holds current typeahead prefix from user.
        _this.typeaheadState = initState();
        _this.sortedIndexByFirstChar = new Map();
        return _this;
    }
    Object.defineProperty(MDCListFoundation, "strings", {
        get: function () {
            return strings$4;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCListFoundation, "cssClasses", {
        get: function () {
            return cssClasses$4;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCListFoundation, "numbers", {
        get: function () {
            return numbers$2;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCListFoundation, "defaultAdapter", {
        get: function () {
            return {
                addClassForElementIndex: function () { return undefined; },
                focusItemAtIndex: function () { return undefined; },
                getAttributeForElementIndex: function () { return null; },
                getFocusedElementIndex: function () { return 0; },
                getListItemCount: function () { return 0; },
                hasCheckboxAtIndex: function () { return false; },
                hasRadioAtIndex: function () { return false; },
                isCheckboxCheckedAtIndex: function () { return false; },
                isFocusInsideList: function () { return false; },
                isRootFocused: function () { return false; },
                listItemAtIndexHasClass: function () { return false; },
                notifyAction: function () { return undefined; },
                removeClassForElementIndex: function () { return undefined; },
                setAttributeForElementIndex: function () { return undefined; },
                setCheckedCheckboxOrRadioAtIndex: function () { return undefined; },
                setTabIndexForListItemChildren: function () { return undefined; },
                getPrimaryTextAtIndex: function () { return ''; },
            };
        },
        enumerable: false,
        configurable: true
    });
    MDCListFoundation.prototype.layout = function () {
        if (this.adapter.getListItemCount() === 0) {
            return;
        }
        // TODO(b/172274142): consider all items when determining the list's type.
        if (this.adapter.hasCheckboxAtIndex(0)) {
            this.isCheckboxList_ = true;
        }
        else if (this.adapter.hasRadioAtIndex(0)) {
            this.isRadioList_ = true;
        }
        else {
            this.maybeInitializeSingleSelection();
        }
        if (this.hasTypeahead) {
            this.sortedIndexByFirstChar = this.typeaheadInitSortedIndex();
        }
    };
    /**
     * Sets the private wrapFocus_ variable.
     */
    MDCListFoundation.prototype.setWrapFocus = function (value) {
        this.wrapFocus_ = value;
    };
    /**
     * Sets the isVertical_ private variable.
     */
    MDCListFoundation.prototype.setVerticalOrientation = function (value) {
        this.isVertical_ = value;
    };
    /**
     * Sets the isSingleSelectionList_ private variable.
     */
    MDCListFoundation.prototype.setSingleSelection = function (value) {
        this.isSingleSelectionList_ = value;
        if (value) {
            this.maybeInitializeSingleSelection();
        }
    };
    /**
     * Automatically determines whether the list is single selection list. If so,
     * initializes the internal state to match the selected item.
     */
    MDCListFoundation.prototype.maybeInitializeSingleSelection = function () {
        var listItemsCount = this.adapter.getListItemCount();
        for (var i = 0; i < listItemsCount; i++) {
            var hasSelectedClass = this.adapter.listItemAtIndexHasClass(i, cssClasses$4.LIST_ITEM_SELECTED_CLASS);
            var hasActivatedClass = this.adapter.listItemAtIndexHasClass(i, cssClasses$4.LIST_ITEM_ACTIVATED_CLASS);
            if (!(hasSelectedClass || hasActivatedClass)) {
                continue;
            }
            if (hasActivatedClass) {
                this.setUseActivatedClass(true);
            }
            this.isSingleSelectionList_ = true;
            this.selectedIndex_ = i;
            return;
        }
    };
    /**
     * Sets whether typeahead is enabled on the list.
     * @param hasTypeahead Whether typeahead is enabled.
     */
    MDCListFoundation.prototype.setHasTypeahead = function (hasTypeahead) {
        this.hasTypeahead = hasTypeahead;
        if (hasTypeahead) {
            this.sortedIndexByFirstChar = this.typeaheadInitSortedIndex();
        }
    };
    /**
     * @return Whether typeahead is currently matching a user-specified prefix.
     */
    MDCListFoundation.prototype.isTypeaheadInProgress = function () {
        return this.hasTypeahead &&
            isTypingInProgress(this.typeaheadState);
    };
    /**
     * Sets the useActivatedClass_ private variable.
     */
    MDCListFoundation.prototype.setUseActivatedClass = function (useActivated) {
        this.useActivatedClass_ = useActivated;
    };
    /**
     * Sets the useSelectedAttr_ private variable.
     */
    MDCListFoundation.prototype.setUseSelectedAttribute = function (useSelected) {
        this.useSelectedAttr_ = useSelected;
    };
    MDCListFoundation.prototype.getSelectedIndex = function () {
        return this.selectedIndex_;
    };
    MDCListFoundation.prototype.setSelectedIndex = function (index) {
        if (!this.isIndexValid_(index)) {
            return;
        }
        if (this.isCheckboxList_) {
            this.setCheckboxAtIndex_(index);
        }
        else if (this.isRadioList_) {
            this.setRadioAtIndex_(index);
        }
        else {
            this.setSingleSelectionAtIndex_(index);
        }
    };
    /**
     * Focus in handler for the list items.
     */
    MDCListFoundation.prototype.handleFocusIn = function (_, listItemIndex) {
        if (listItemIndex >= 0) {
            this.focusedItemIndex = listItemIndex;
            this.adapter.setAttributeForElementIndex(listItemIndex, 'tabindex', '0');
            this.adapter.setTabIndexForListItemChildren(listItemIndex, '0');
        }
    };
    /**
     * Focus out handler for the list items.
     */
    MDCListFoundation.prototype.handleFocusOut = function (_, listItemIndex) {
        var _this = this;
        if (listItemIndex >= 0) {
            this.adapter.setAttributeForElementIndex(listItemIndex, 'tabindex', '-1');
            this.adapter.setTabIndexForListItemChildren(listItemIndex, '-1');
        }
        /**
         * Between Focusout & Focusin some browsers do not have focus on any
         * element. Setting a delay to wait till the focus is moved to next element.
         */
        setTimeout(function () {
            if (!_this.adapter.isFocusInsideList()) {
                _this.setTabindexToFirstSelectedOrFocusedItem();
            }
        }, 0);
    };
    /**
     * Key handler for the list.
     */
    MDCListFoundation.prototype.handleKeydown = function (event, isRootListItem, listItemIndex) {
        var _this = this;
        var isArrowLeft = normalizeKey(event) === 'ArrowLeft';
        var isArrowUp = normalizeKey(event) === 'ArrowUp';
        var isArrowRight = normalizeKey(event) === 'ArrowRight';
        var isArrowDown = normalizeKey(event) === 'ArrowDown';
        var isHome = normalizeKey(event) === 'Home';
        var isEnd = normalizeKey(event) === 'End';
        var isEnter = normalizeKey(event) === 'Enter';
        var isSpace = normalizeKey(event) === 'Spacebar';
        // Have to check both upper and lower case, because having caps lock on affects the value.
        var isLetterA = event.key === 'A' || event.key === 'a';
        if (this.adapter.isRootFocused()) {
            if (isArrowUp || isEnd) {
                event.preventDefault();
                this.focusLastElement();
            }
            else if (isArrowDown || isHome) {
                event.preventDefault();
                this.focusFirstElement();
            }
            if (this.hasTypeahead) {
                var handleKeydownOpts = {
                    event: event,
                    focusItemAtIndex: function (index) {
                        _this.focusItemAtIndex(index);
                    },
                    focusedItemIndex: -1,
                    isTargetListItem: isRootListItem,
                    sortedIndexByFirstChar: this.sortedIndexByFirstChar,
                    isItemAtIndexDisabled: function (index) {
                        return _this.adapter.listItemAtIndexHasClass(index, cssClasses$4.LIST_ITEM_DISABLED_CLASS);
                    },
                };
                handleKeydown(handleKeydownOpts, this.typeaheadState);
            }
            return;
        }
        var currentIndex = this.adapter.getFocusedElementIndex();
        if (currentIndex === -1) {
            currentIndex = listItemIndex;
            if (currentIndex < 0) {
                // If this event doesn't have a mdc-list-item ancestor from the
                // current list (not from a sublist), return early.
                return;
            }
        }
        if ((this.isVertical_ && isArrowDown) ||
            (!this.isVertical_ && isArrowRight)) {
            preventDefaultEvent(event);
            this.focusNextElement(currentIndex);
        }
        else if ((this.isVertical_ && isArrowUp) || (!this.isVertical_ && isArrowLeft)) {
            preventDefaultEvent(event);
            this.focusPrevElement(currentIndex);
        }
        else if (isHome) {
            preventDefaultEvent(event);
            this.focusFirstElement();
        }
        else if (isEnd) {
            preventDefaultEvent(event);
            this.focusLastElement();
        }
        else if (isLetterA && event.ctrlKey && this.isCheckboxList_) {
            event.preventDefault();
            this.toggleAll(this.selectedIndex_ === numbers$2.UNSET_INDEX ? [] : this.selectedIndex_);
        }
        else if (isEnter || isSpace) {
            if (isRootListItem) {
                // Return early if enter key is pressed on anchor element which triggers
                // synthetic MouseEvent event.
                var target = event.target;
                if (target && target.tagName === 'A' && isEnter) {
                    return;
                }
                preventDefaultEvent(event);
                if (this.adapter.listItemAtIndexHasClass(currentIndex, cssClasses$4.LIST_ITEM_DISABLED_CLASS)) {
                    return;
                }
                if (!this.isTypeaheadInProgress()) {
                    if (this.isSelectableList_()) {
                        this.setSelectedIndexOnAction_(currentIndex);
                    }
                    this.adapter.notifyAction(currentIndex);
                }
            }
        }
        if (this.hasTypeahead) {
            var handleKeydownOpts = {
                event: event,
                focusItemAtIndex: function (index) {
                    _this.focusItemAtIndex(index);
                },
                focusedItemIndex: this.focusedItemIndex,
                isTargetListItem: isRootListItem,
                sortedIndexByFirstChar: this.sortedIndexByFirstChar,
                isItemAtIndexDisabled: function (index) { return _this.adapter.listItemAtIndexHasClass(index, cssClasses$4.LIST_ITEM_DISABLED_CLASS); },
            };
            handleKeydown(handleKeydownOpts, this.typeaheadState);
        }
    };
    /**
     * Click handler for the list.
     */
    MDCListFoundation.prototype.handleClick = function (index, toggleCheckbox) {
        if (index === numbers$2.UNSET_INDEX) {
            return;
        }
        if (this.adapter.listItemAtIndexHasClass(index, cssClasses$4.LIST_ITEM_DISABLED_CLASS)) {
            return;
        }
        if (this.isSelectableList_()) {
            this.setSelectedIndexOnAction_(index, toggleCheckbox);
        }
        this.adapter.notifyAction(index);
    };
    /**
     * Focuses the next element on the list.
     */
    MDCListFoundation.prototype.focusNextElement = function (index) {
        var count = this.adapter.getListItemCount();
        var nextIndex = index + 1;
        if (nextIndex >= count) {
            if (this.wrapFocus_) {
                nextIndex = 0;
            }
            else {
                // Return early because last item is already focused.
                return index;
            }
        }
        this.focusItemAtIndex(nextIndex);
        return nextIndex;
    };
    /**
     * Focuses the previous element on the list.
     */
    MDCListFoundation.prototype.focusPrevElement = function (index) {
        var prevIndex = index - 1;
        if (prevIndex < 0) {
            if (this.wrapFocus_) {
                prevIndex = this.adapter.getListItemCount() - 1;
            }
            else {
                // Return early because first item is already focused.
                return index;
            }
        }
        this.focusItemAtIndex(prevIndex);
        return prevIndex;
    };
    MDCListFoundation.prototype.focusFirstElement = function () {
        this.focusItemAtIndex(0);
        return 0;
    };
    MDCListFoundation.prototype.focusLastElement = function () {
        var lastIndex = this.adapter.getListItemCount() - 1;
        this.focusItemAtIndex(lastIndex);
        return lastIndex;
    };
    MDCListFoundation.prototype.focusInitialElement = function () {
        var initialIndex = this.getFirstSelectedOrFocusedItemIndex();
        this.focusItemAtIndex(initialIndex);
        return initialIndex;
    };
    /**
     * @param itemIndex Index of the list item
     * @param isEnabled Sets the list item to enabled or disabled.
     */
    MDCListFoundation.prototype.setEnabled = function (itemIndex, isEnabled) {
        if (!this.isIndexValid_(itemIndex)) {
            return;
        }
        if (isEnabled) {
            this.adapter.removeClassForElementIndex(itemIndex, cssClasses$4.LIST_ITEM_DISABLED_CLASS);
            this.adapter.setAttributeForElementIndex(itemIndex, strings$4.ARIA_DISABLED, 'false');
        }
        else {
            this.adapter.addClassForElementIndex(itemIndex, cssClasses$4.LIST_ITEM_DISABLED_CLASS);
            this.adapter.setAttributeForElementIndex(itemIndex, strings$4.ARIA_DISABLED, 'true');
        }
    };
    MDCListFoundation.prototype.setSingleSelectionAtIndex_ = function (index) {
        if (this.selectedIndex_ === index) {
            return;
        }
        var selectedClassName = cssClasses$4.LIST_ITEM_SELECTED_CLASS;
        if (this.useActivatedClass_) {
            selectedClassName = cssClasses$4.LIST_ITEM_ACTIVATED_CLASS;
        }
        if (this.selectedIndex_ !== numbers$2.UNSET_INDEX) {
            this.adapter.removeClassForElementIndex(this.selectedIndex_, selectedClassName);
        }
        this.setAriaForSingleSelectionAtIndex_(index);
        this.setTabindexAtIndex(index);
        if (index !== numbers$2.UNSET_INDEX) {
            this.adapter.addClassForElementIndex(index, selectedClassName);
        }
        this.selectedIndex_ = index;
    };
    /**
     * Sets aria attribute for single selection at given index.
     */
    MDCListFoundation.prototype.setAriaForSingleSelectionAtIndex_ = function (index) {
        // Detect the presence of aria-current and get the value only during list
        // initialization when it is in unset state.
        if (this.selectedIndex_ === numbers$2.UNSET_INDEX) {
            this.ariaCurrentAttrValue_ =
                this.adapter.getAttributeForElementIndex(index, strings$4.ARIA_CURRENT);
        }
        var isAriaCurrent = this.ariaCurrentAttrValue_ !== null;
        var ariaAttribute = isAriaCurrent ? strings$4.ARIA_CURRENT : strings$4.ARIA_SELECTED;
        if (this.selectedIndex_ !== numbers$2.UNSET_INDEX) {
            this.adapter.setAttributeForElementIndex(this.selectedIndex_, ariaAttribute, 'false');
        }
        if (index !== numbers$2.UNSET_INDEX) {
            var ariaAttributeValue = isAriaCurrent ? this.ariaCurrentAttrValue_ : 'true';
            this.adapter.setAttributeForElementIndex(index, ariaAttribute, ariaAttributeValue);
        }
    };
    /**
     * Returns the attribute to use for indicating selection status.
     */
    MDCListFoundation.prototype.getSelectionAttribute = function () {
        return this.useSelectedAttr_ ? strings$4.ARIA_SELECTED : strings$4.ARIA_CHECKED;
    };
    /**
     * Toggles radio at give index. Radio doesn't change the checked state if it
     * is already checked.
     */
    MDCListFoundation.prototype.setRadioAtIndex_ = function (index) {
        var selectionAttribute = this.getSelectionAttribute();
        this.adapter.setCheckedCheckboxOrRadioAtIndex(index, true);
        if (this.selectedIndex_ !== numbers$2.UNSET_INDEX) {
            this.adapter.setAttributeForElementIndex(this.selectedIndex_, selectionAttribute, 'false');
        }
        this.adapter.setAttributeForElementIndex(index, selectionAttribute, 'true');
        this.selectedIndex_ = index;
    };
    MDCListFoundation.prototype.setCheckboxAtIndex_ = function (index) {
        var selectionAttribute = this.getSelectionAttribute();
        for (var i = 0; i < this.adapter.getListItemCount(); i++) {
            var isChecked = false;
            if (index.indexOf(i) >= 0) {
                isChecked = true;
            }
            this.adapter.setCheckedCheckboxOrRadioAtIndex(i, isChecked);
            this.adapter.setAttributeForElementIndex(i, selectionAttribute, isChecked ? 'true' : 'false');
        }
        this.selectedIndex_ = index;
    };
    MDCListFoundation.prototype.setTabindexAtIndex = function (index) {
        if (this.focusedItemIndex === numbers$2.UNSET_INDEX && index !== 0) {
            // If some list item was selected set first list item's tabindex to -1.
            // Generally, tabindex is set to 0 on first list item of list that has no
            // preselected items.
            this.adapter.setAttributeForElementIndex(0, 'tabindex', '-1');
        }
        else if (this.focusedItemIndex >= 0 && this.focusedItemIndex !== index) {
            this.adapter.setAttributeForElementIndex(this.focusedItemIndex, 'tabindex', '-1');
        }
        // Set the previous selection's tabindex to -1. We need this because
        // in selection menus that are not visible, programmatically setting an
        // option will not change focus but will change where tabindex should be 0.
        if (!(this.selectedIndex_ instanceof Array) &&
            this.selectedIndex_ !== index) {
            this.adapter.setAttributeForElementIndex(this.selectedIndex_, 'tabindex', '-1');
        }
        if (index !== numbers$2.UNSET_INDEX) {
            this.adapter.setAttributeForElementIndex(index, 'tabindex', '0');
        }
    };
    /**
     * @return Return true if it is single selectin list, checkbox list or radio
     *     list.
     */
    MDCListFoundation.prototype.isSelectableList_ = function () {
        return this.isSingleSelectionList_ || this.isCheckboxList_ ||
            this.isRadioList_;
    };
    MDCListFoundation.prototype.setTabindexToFirstSelectedOrFocusedItem = function () {
        var targetIndex = this.getFirstSelectedOrFocusedItemIndex();
        this.setTabindexAtIndex(targetIndex);
    };
    MDCListFoundation.prototype.getFirstSelectedOrFocusedItemIndex = function () {
        var targetIndex = this.focusedItemIndex >= 0 ? this.focusedItemIndex : 0;
        if (this.isSelectableList_()) {
            if (typeof this.selectedIndex_ === 'number' &&
                this.selectedIndex_ !== numbers$2.UNSET_INDEX) {
                targetIndex = this.selectedIndex_;
            }
            else if (isNumberArray(this.selectedIndex_) &&
                this.selectedIndex_.length > 0) {
                targetIndex = this.selectedIndex_.reduce(function (currentIndex, minIndex) { return Math.min(currentIndex, minIndex); });
            }
        }
        return targetIndex;
    };
    MDCListFoundation.prototype.isIndexValid_ = function (index) {
        var _this = this;
        if (index instanceof Array) {
            if (!this.isCheckboxList_) {
                throw new Error('MDCListFoundation: Array of index is only supported for checkbox based list');
            }
            if (index.length === 0) {
                return true;
            }
            else {
                return index.some(function (i) { return _this.isIndexInRange_(i); });
            }
        }
        else if (typeof index === 'number') {
            if (this.isCheckboxList_) {
                throw new Error("MDCListFoundation: Expected array of index for checkbox based list but got number: " + index);
            }
            return this.isIndexInRange_(index) ||
                this.isSingleSelectionList_ && index === numbers$2.UNSET_INDEX;
        }
        else {
            return false;
        }
    };
    MDCListFoundation.prototype.isIndexInRange_ = function (index) {
        var listSize = this.adapter.getListItemCount();
        return index >= 0 && index < listSize;
    };
    /**
     * Sets selected index on user action, toggles checkbox / radio based on
     * toggleCheckbox value. User interaction should not toggle list item(s) when
     * disabled.
     */
    MDCListFoundation.prototype.setSelectedIndexOnAction_ = function (index, toggleCheckbox) {
        if (toggleCheckbox === void 0) { toggleCheckbox = true; }
        if (this.isCheckboxList_) {
            this.toggleCheckboxAtIndex_(index, toggleCheckbox);
        }
        else {
            this.setSelectedIndex(index);
        }
    };
    MDCListFoundation.prototype.toggleCheckboxAtIndex_ = function (index, toggleCheckbox) {
        var selectionAttribute = this.getSelectionAttribute();
        var isChecked = this.adapter.isCheckboxCheckedAtIndex(index);
        if (toggleCheckbox) {
            isChecked = !isChecked;
            this.adapter.setCheckedCheckboxOrRadioAtIndex(index, isChecked);
        }
        this.adapter.setAttributeForElementIndex(index, selectionAttribute, isChecked ? 'true' : 'false');
        // If none of the checkbox items are selected and selectedIndex is not
        // initialized then provide a default value.
        var selectedIndexes = this.selectedIndex_ === numbers$2.UNSET_INDEX ?
            [] :
            this.selectedIndex_.slice();
        if (isChecked) {
            selectedIndexes.push(index);
        }
        else {
            selectedIndexes = selectedIndexes.filter(function (i) { return i !== index; });
        }
        this.selectedIndex_ = selectedIndexes;
    };
    MDCListFoundation.prototype.focusItemAtIndex = function (index) {
        this.adapter.focusItemAtIndex(index);
        this.focusedItemIndex = index;
    };
    MDCListFoundation.prototype.toggleAll = function (currentlySelectedIndexes) {
        var count = this.adapter.getListItemCount();
        // If all items are selected, deselect everything.
        if (currentlySelectedIndexes.length === count) {
            this.setCheckboxAtIndex_([]);
        }
        else {
            // Otherwise select all enabled options.
            var allIndexes = [];
            for (var i = 0; i < count; i++) {
                if (!this.adapter.listItemAtIndexHasClass(i, cssClasses$4.LIST_ITEM_DISABLED_CLASS) ||
                    currentlySelectedIndexes.indexOf(i) > -1) {
                    allIndexes.push(i);
                }
            }
            this.setCheckboxAtIndex_(allIndexes);
        }
    };
    /**
     * Given the next desired character from the user, adds it to the typeahead
     * buffer. Then, attempts to find the next option matching the buffer. Wraps
     * around if at the end of options.
     *
     * @param nextChar The next character to add to the prefix buffer.
     * @param startingIndex The index from which to start matching. Only relevant
     *     when starting a new match sequence. To start a new match sequence,
     *     clear the buffer using `clearTypeaheadBuffer`, or wait for the buffer
     *     to clear after a set interval defined in list foundation. Defaults to
     *     the currently focused index.
     * @return The index of the matched item, or -1 if no match.
     */
    MDCListFoundation.prototype.typeaheadMatchItem = function (nextChar, startingIndex, skipFocus) {
        var _this = this;
        if (skipFocus === void 0) { skipFocus = false; }
        var opts = {
            focusItemAtIndex: function (index) {
                _this.focusItemAtIndex(index);
            },
            focusedItemIndex: startingIndex ? startingIndex : this.focusedItemIndex,
            nextChar: nextChar,
            sortedIndexByFirstChar: this.sortedIndexByFirstChar,
            skipFocus: skipFocus,
            isItemAtIndexDisabled: function (index) { return _this.adapter.listItemAtIndexHasClass(index, cssClasses$4.LIST_ITEM_DISABLED_CLASS); }
        };
        return matchItem(opts, this.typeaheadState);
    };
    /**
     * Initializes the MDCListTextAndIndex data structure by indexing the current
     * list items by primary text.
     *
     * @return The primary texts of all the list items sorted by first character.
     */
    MDCListFoundation.prototype.typeaheadInitSortedIndex = function () {
        return initSortedIndex(this.adapter.getListItemCount(), this.adapter.getPrimaryTextAtIndex);
    };
    /**
     * Clears the typeahead buffer.
     */
    MDCListFoundation.prototype.clearTypeaheadBuffer = function () {
        clearBuffer(this.typeaheadState);
    };
    return MDCListFoundation;
}(MDCFoundation));

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses$3 = {
    ANIMATE: 'mdc-drawer--animate',
    CLOSING: 'mdc-drawer--closing',
    DISMISSIBLE: 'mdc-drawer--dismissible',
    MODAL: 'mdc-drawer--modal',
    OPEN: 'mdc-drawer--open',
    OPENING: 'mdc-drawer--opening',
    ROOT: 'mdc-drawer',
};
var strings$3 = {
    APP_CONTENT_SELECTOR: '.mdc-drawer-app-content',
    CLOSE_EVENT: 'MDCDrawer:closed',
    OPEN_EVENT: 'MDCDrawer:opened',
    SCRIM_SELECTOR: '.mdc-drawer-scrim',
    LIST_SELECTOR: '.mdc-list,.mdc-deprecated-list',
    LIST_ITEM_ACTIVATED_SELECTOR: '.mdc-list-item--activated,.mdc-deprecated-list-item--activated',
};

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCDismissibleDrawerFoundation = /** @class */ (function (_super) {
    __extends(MDCDismissibleDrawerFoundation, _super);
    function MDCDismissibleDrawerFoundation(adapter) {
        var _this = _super.call(this, __assign(__assign({}, MDCDismissibleDrawerFoundation.defaultAdapter), adapter)) || this;
        _this.animationFrame_ = 0;
        _this.animationTimer_ = 0;
        return _this;
    }
    Object.defineProperty(MDCDismissibleDrawerFoundation, "strings", {
        get: function () {
            return strings$3;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCDismissibleDrawerFoundation, "cssClasses", {
        get: function () {
            return cssClasses$3;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCDismissibleDrawerFoundation, "defaultAdapter", {
        get: function () {
            // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
            return {
                addClass: function () { return undefined; },
                removeClass: function () { return undefined; },
                hasClass: function () { return false; },
                elementHasClass: function () { return false; },
                notifyClose: function () { return undefined; },
                notifyOpen: function () { return undefined; },
                saveFocus: function () { return undefined; },
                restoreFocus: function () { return undefined; },
                focusActiveNavigationItem: function () { return undefined; },
                trapFocus: function () { return undefined; },
                releaseFocus: function () { return undefined; },
            };
            // tslint:enable:object-literal-sort-keys
        },
        enumerable: false,
        configurable: true
    });
    MDCDismissibleDrawerFoundation.prototype.destroy = function () {
        if (this.animationFrame_) {
            cancelAnimationFrame(this.animationFrame_);
        }
        if (this.animationTimer_) {
            clearTimeout(this.animationTimer_);
        }
    };
    /**
     * Opens the drawer from the closed state.
     */
    MDCDismissibleDrawerFoundation.prototype.open = function () {
        var _this = this;
        if (this.isOpen() || this.isOpening() || this.isClosing()) {
            return;
        }
        this.adapter.addClass(cssClasses$3.OPEN);
        this.adapter.addClass(cssClasses$3.ANIMATE);
        // Wait a frame once display is no longer "none", to establish basis for animation
        this.runNextAnimationFrame_(function () {
            _this.adapter.addClass(cssClasses$3.OPENING);
        });
        this.adapter.saveFocus();
    };
    /**
     * Closes the drawer from the open state.
     */
    MDCDismissibleDrawerFoundation.prototype.close = function () {
        if (!this.isOpen() || this.isOpening() || this.isClosing()) {
            return;
        }
        this.adapter.addClass(cssClasses$3.CLOSING);
    };
    /**
     * Returns true if the drawer is in the open position.
     * @return true if drawer is in open state.
     */
    MDCDismissibleDrawerFoundation.prototype.isOpen = function () {
        return this.adapter.hasClass(cssClasses$3.OPEN);
    };
    /**
     * Returns true if the drawer is animating open.
     * @return true if drawer is animating open.
     */
    MDCDismissibleDrawerFoundation.prototype.isOpening = function () {
        return this.adapter.hasClass(cssClasses$3.OPENING) ||
            this.adapter.hasClass(cssClasses$3.ANIMATE);
    };
    /**
     * Returns true if the drawer is animating closed.
     * @return true if drawer is animating closed.
     */
    MDCDismissibleDrawerFoundation.prototype.isClosing = function () {
        return this.adapter.hasClass(cssClasses$3.CLOSING);
    };
    /**
     * Keydown handler to close drawer when key is escape.
     */
    MDCDismissibleDrawerFoundation.prototype.handleKeydown = function (evt) {
        var keyCode = evt.keyCode, key = evt.key;
        var isEscape = key === 'Escape' || keyCode === 27;
        if (isEscape) {
            this.close();
        }
    };
    /**
     * Handles the `transitionend` event when the drawer finishes opening/closing.
     */
    MDCDismissibleDrawerFoundation.prototype.handleTransitionEnd = function (evt) {
        var OPENING = cssClasses$3.OPENING, CLOSING = cssClasses$3.CLOSING, OPEN = cssClasses$3.OPEN, ANIMATE = cssClasses$3.ANIMATE, ROOT = cssClasses$3.ROOT;
        // In Edge, transitionend on ripple pseudo-elements yields a target without classList, so check for Element first.
        var isRootElement = this.isElement_(evt.target) &&
            this.adapter.elementHasClass(evt.target, ROOT);
        if (!isRootElement) {
            return;
        }
        if (this.isClosing()) {
            this.adapter.removeClass(OPEN);
            this.closed_();
            this.adapter.restoreFocus();
            this.adapter.notifyClose();
        }
        else {
            this.adapter.focusActiveNavigationItem();
            this.opened_();
            this.adapter.notifyOpen();
        }
        this.adapter.removeClass(ANIMATE);
        this.adapter.removeClass(OPENING);
        this.adapter.removeClass(CLOSING);
    };
    /**
     * Extension point for when drawer finishes open animation.
     */
    MDCDismissibleDrawerFoundation.prototype.opened_ = function () { }; // tslint:disable-line:no-empty
    /**
     * Extension point for when drawer finishes close animation.
     */
    MDCDismissibleDrawerFoundation.prototype.closed_ = function () { }; // tslint:disable-line:no-empty
    /**
     * Runs the given logic on the next animation frame, using setTimeout to factor in Firefox reflow behavior.
     */
    MDCDismissibleDrawerFoundation.prototype.runNextAnimationFrame_ = function (callback) {
        var _this = this;
        cancelAnimationFrame(this.animationFrame_);
        this.animationFrame_ = requestAnimationFrame(function () {
            _this.animationFrame_ = 0;
            clearTimeout(_this.animationTimer_);
            _this.animationTimer_ = setTimeout(callback, 0);
        });
    };
    MDCDismissibleDrawerFoundation.prototype.isElement_ = function (element) {
        // In Edge, transitionend on ripple pseudo-elements yields a target without classList.
        return Boolean(element.classList);
    };
    return MDCDismissibleDrawerFoundation;
}(MDCFoundation));

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
/* istanbul ignore next: subclass is not a branch statement */
var MDCModalDrawerFoundation = /** @class */ (function (_super) {
    __extends(MDCModalDrawerFoundation, _super);
    function MDCModalDrawerFoundation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Handles click event on scrim.
     */
    MDCModalDrawerFoundation.prototype.handleScrimClick = function () {
        this.close();
    };
    /**
     * Called when drawer finishes open animation.
     */
    MDCModalDrawerFoundation.prototype.opened_ = function () {
        this.adapter.trapFocus();
    };
    /**
     * Called when drawer finishes close animation.
     */
    MDCModalDrawerFoundation.prototype.closed_ = function () {
        this.adapter.releaseFocus();
    };
    return MDCModalDrawerFoundation;
}(MDCDismissibleDrawerFoundation));

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
/**
 * Determine whether the current browser supports passive event listeners, and
 * if so, use them.
 */
function applyPassive$1(globalObj) {
    if (globalObj === void 0) { globalObj = window; }
    return supportsPassiveOption(globalObj) ?
        { passive: true } :
        false;
}
function supportsPassiveOption(globalObj) {
    if (globalObj === void 0) { globalObj = window; }
    // See
    // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
    var passiveSupported = false;
    try {
        var options = {
            // This function will be called when the browser
            // attempts to access the passive property.
            get passive() {
                passiveSupported = true;
                return false;
            }
        };
        var handler = function () { };
        globalObj.document.addEventListener('test', handler, options);
        globalObj.document.removeEventListener('test', handler, options);
    }
    catch (err) {
        passiveSupported = false;
    }
    return passiveSupported;
}

var events = /*#__PURE__*/Object.freeze({
    __proto__: null,
    applyPassive: applyPassive$1
});

// Match modifiers on DOM events.
const oldModifierRegex = /^[a-z]+(?::(?:preventDefault|stopPropagation|passive|nonpassive|capture|once|self))+$/;
// Match modifiers on other events.
const newModifierRegex = /^[^$]+(?:\$(?:preventDefault|stopPropagation|passive|nonpassive|capture|once|self))+$/;

function forwardEventsBuilder(component) {
  // This is our pseudo $on function. It is defined on component mount.
  let $on;
  // This is a list of events bound before mount.
  let events = [];
  // This is the original component $on function.
  const componentOn = component.$on;

  // And we override the $on function to forward all bound events.
  component.$on = (fullEventType, callback) => {
    let eventType = fullEventType;
    let destructor = () => {};
    if ($on) {
      // The event was bound programmatically.
      destructor = $on(eventType, callback);
    } else {
      // The event was bound before mount by Svelte.
      events.push([eventType, callback]);
    }
    const oldModifierMatch = eventType.match(oldModifierRegex);
    const newModifierMatch = eventType.match(newModifierRegex);
    const modifierMatch = oldModifierMatch || newModifierMatch;

    if (oldModifierMatch && console) {
      console.warn(
        'Event modifiers in SMUI now use "$" instead of ":", so that all events can be bound with modifiers. Please update your event binding: ',
        eventType
      );
    }

    if (modifierMatch) {
      // Remove modifiers from the real event.
      const parts = eventType.split(oldModifierMatch ? ':' : '$');
      eventType = parts[0];
    }

    // Call the original $on function.
    const componentDestructor = componentOn.call(
      component,
      eventType,
      callback
    );

    return (...args) => {
      destructor();
      return componentDestructor(...args);
    };
  };

  function forward(e) {
    // Internally bubble the event up from Svelte components.
    bubble(component, e);
  }

  return (node) => {
    const destructors = [];
    const forwardDestructors = {};

    // This function is responsible for forwarding all bound events.
    $on = (fullEventType, callback) => {
      let eventType = fullEventType;
      let handler = callback;
      // DOM addEventListener options argument.
      let options = false;
      const oldModifierMatch = eventType.match(oldModifierRegex);
      const newModifierMatch = eventType.match(newModifierRegex);
      const modifierMatch = oldModifierMatch || newModifierMatch;
      if (modifierMatch) {
        // Parse the event modifiers.
        // Supported modifiers:
        // - preventDefault
        // - stopPropagation
        // - passive
        // - nonpassive
        // - capture
        // - once
        const parts = eventType.split(oldModifierMatch ? ':' : '$');
        eventType = parts[0];
        options = Object.fromEntries(parts.slice(1).map((mod) => [mod, true]));
        if (options.nonpassive) {
          options.passive = false;
          delete options.nonpassive;
        }
        if (options.preventDefault) {
          handler = prevent_default(handler);
          delete options.preventDefault;
        }
        if (options.stopPropagation) {
          handler = stop_propagation(handler);
          delete options.stopPropagation;
        }
      }

      // Listen for the event directly, with the given options.
      const off = listen(node, eventType, handler, options);
      const destructor = () => {
        off();
        const idx = destructors.indexOf(destructor);
        if (idx > -1) {
          destructors.splice(idx, 1);
        }
      };

      destructors.push(destructor);

      // Forward the event from Svelte.
      if (!eventType in forwardDestructors) {
        forwardDestructors[eventType] = listen(node, eventType, forward);
      }

      return destructor;
    };

    for (let i = 0; i < events.length; i++) {
      // Listen to all the events added before mount.
      $on(events[i][0], events[i][1]);
    }

    return {
      destroy: () => {
        // Remove all event listeners.
        for (let i = 0; i < destructors.length; i++) {
          destructors[i]();
        }

        // Remove all event forwarders.
        for (let entry of Object.entries(forwardDestructors)) {
          entry[1]();
        }
      },
    };
  };
}

function classMap(classObj) {
  return Object.entries(classObj)
    .filter(([name, value]) => name !== '' && value)
    .map(([name]) => name)
    .join(' ');
}

/* node_modules\@smui\common\ClassAdder.svelte generated by Svelte v3.38.3 */

// (1:0) <svelte:component   this={component}   bind:this={element}   use={[forwardEvents, ...use]}   class={classMap({     [className]: true,     [smuiClass]: true,     ...smuiClassMap,   })}   {...props}   {...$$restProps}>
function create_default_slot$7(ctx) {
	let current;
	const default_slot_template = /*#slots*/ ctx[10].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[12], null);

	const block = {
		c: function create() {
			if (default_slot) default_slot.c();
		},
		l: function claim(nodes) {
			if (default_slot) default_slot.l(nodes);
		},
		m: function mount(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 4096)) {
					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[12], !current ? -1 : dirty, null, null);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot$7.name,
		type: "slot",
		source: "(1:0) <svelte:component   this={component}   bind:this={element}   use={[forwardEvents, ...use]}   class={classMap({     [className]: true,     [smuiClass]: true,     ...smuiClassMap,   })}   {...props}   {...$$restProps}>",
		ctx
	});

	return block;
}

function create_fragment$m(ctx) {
	let switch_instance;
	let switch_instance_anchor;
	let current;

	const switch_instance_spread_levels = [
		{
			use: [/*forwardEvents*/ ctx[7], .../*use*/ ctx[0]]
		},
		{
			class: classMap({
				[/*className*/ ctx[1]]: true,
				[/*smuiClass*/ ctx[5]]: true,
				.../*smuiClassMap*/ ctx[4]
			})
		},
		/*props*/ ctx[6],
		/*$$restProps*/ ctx[8]
	];

	var switch_value = /*component*/ ctx[2];

	function switch_props(ctx) {
		let switch_instance_props = {
			$$slots: { default: [create_default_slot$7] },
			$$scope: { ctx }
		};

		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
		}

		return {
			props: switch_instance_props,
			$$inline: true
		};
	}

	if (switch_value) {
		switch_instance = new switch_value(switch_props(ctx));
		/*switch_instance_binding*/ ctx[11](switch_instance);
	}

	const block = {
		c: function create() {
			if (switch_instance) create_component(switch_instance.$$.fragment);
			switch_instance_anchor = empty();
		},
		l: function claim(nodes) {
			if (switch_instance) claim_component(switch_instance.$$.fragment, nodes);
			switch_instance_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (switch_instance) {
				mount_component(switch_instance, target, anchor);
			}

			insert_dev(target, switch_instance_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const switch_instance_changes = (dirty & /*forwardEvents, use, classMap, className, smuiClass, smuiClassMap, props, $$restProps*/ 499)
			? get_spread_update(switch_instance_spread_levels, [
					dirty & /*forwardEvents, use*/ 129 && {
						use: [/*forwardEvents*/ ctx[7], .../*use*/ ctx[0]]
					},
					dirty & /*classMap, className, smuiClass, smuiClassMap*/ 50 && {
						class: classMap({
							[/*className*/ ctx[1]]: true,
							[/*smuiClass*/ ctx[5]]: true,
							.../*smuiClassMap*/ ctx[4]
						})
					},
					dirty & /*props*/ 64 && get_spread_object(/*props*/ ctx[6]),
					dirty & /*$$restProps*/ 256 && get_spread_object(/*$$restProps*/ ctx[8])
				])
			: {};

			if (dirty & /*$$scope*/ 4096) {
				switch_instance_changes.$$scope = { dirty, ctx };
			}

			if (switch_value !== (switch_value = /*component*/ ctx[2])) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props(ctx));
					/*switch_instance_binding*/ ctx[11](switch_instance);
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}
		},
		i: function intro(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			/*switch_instance_binding*/ ctx[11](null);
			if (detaching) detach_dev(switch_instance_anchor);
			if (switch_instance) destroy_component(switch_instance, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$m.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

const internals = {
	component: null,
	class: "",
	// The class map maps classes to contexts. The context
	// should resolve to a Svelte store, and the class
	// will be added if the Svelte store's value is true.
	classMap: {},
	contexts: {},
	props: {}
};

function instance$i($$self, $$props, $$invalidate) {
	const omit_props_names = ["use","class","component","getElement"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("ClassAdder", slots, ['default']);
	let { use = [] } = $$props;
	let { class: className = "" } = $$props;
	let element;
	const smuiClass = internals.class;
	const smuiClassMap = {};
	const smuiClassUnsubscribes = [];
	const contexts = internals.contexts;
	const props = internals.props;
	let { component = internals.component } = $$props;

	Object.entries(internals.classMap).forEach(([name, context]) => {
		const store = getContext(context);

		if (store && "subscribe" in store) {
			smuiClassUnsubscribes.push(store.subscribe(value => {
				$$invalidate(4, smuiClassMap[name] = value, smuiClassMap);
			}));
		}
	});

	const forwardEvents = forwardEventsBuilder(get_current_component());

	for (let context in contexts) {
		if (contexts.hasOwnProperty(context)) {
			setContext(context, contexts[context]);
		}
	}

	onDestroy(() => {
		for (const unsubscribe of smuiClassUnsubscribes) {
			unsubscribe();
		}
	});

	function getElement() {
		return element.getElement();
	}

	function switch_instance_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			element = $$value;
			$$invalidate(3, element);
		});
	}

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(8, $$restProps = compute_rest_props($$props, omit_props_names));
		if ("use" in $$new_props) $$invalidate(0, use = $$new_props.use);
		if ("class" in $$new_props) $$invalidate(1, className = $$new_props.class);
		if ("component" in $$new_props) $$invalidate(2, component = $$new_props.component);
		if ("$$scope" in $$new_props) $$invalidate(12, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({
		internals,
		onDestroy,
		getContext,
		setContext,
		get_current_component,
		forwardEventsBuilder,
		classMap,
		use,
		className,
		element,
		smuiClass,
		smuiClassMap,
		smuiClassUnsubscribes,
		contexts,
		props,
		component,
		forwardEvents,
		getElement
	});

	$$self.$inject_state = $$new_props => {
		if ("use" in $$props) $$invalidate(0, use = $$new_props.use);
		if ("className" in $$props) $$invalidate(1, className = $$new_props.className);
		if ("element" in $$props) $$invalidate(3, element = $$new_props.element);
		if ("component" in $$props) $$invalidate(2, component = $$new_props.component);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		use,
		className,
		component,
		element,
		smuiClassMap,
		smuiClass,
		props,
		forwardEvents,
		$$restProps,
		getElement,
		slots,
		switch_instance_binding,
		$$scope
	];
}

class ClassAdder extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init$1(this, options, instance$i, create_fragment$m, safe_not_equal, {
			use: 0,
			class: 1,
			component: 2,
			getElement: 9
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "ClassAdder",
			options,
			id: create_fragment$m.name
		});
	}

	get use() {
		throw new Error("<ClassAdder>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set use(value) {
		throw new Error("<ClassAdder>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get class() {
		throw new Error("<ClassAdder>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set class(value) {
		throw new Error("<ClassAdder>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get component() {
		throw new Error("<ClassAdder>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set component(value) {
		throw new Error("<ClassAdder>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get getElement() {
		return this.$$.ctx[9];
	}

	set getElement(value) {
		throw new Error("<ClassAdder>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

const defaults = { ...internals };

function classAdderBuilder(props) {
  function Component(...args) {
    Object.assign(internals, defaults, props);
    return new ClassAdder(...args);
  }

  Component.prototype = ClassAdder;

  // SSR support
  if (ClassAdder.$$render) {
    Component.$$render = (...args) =>
      Object.assign(internals, defaults, props) && ClassAdder.$$render(...args);
  }
  if (ClassAdder.render) {
    Component.render = (...args) =>
      Object.assign(internals, defaults, props) && ClassAdder.render(...args);
  }

  return Component;
}

function dispatch(
  element,
  eventType,
  detail = {},
  eventInit = { bubbles: true }
) {
  if (typeof Event !== 'undefined' && element) {
    const event = new Event(eventType, eventInit);
    event.detail = detail;
    const el = 'getElement' in element ? element.getElement() : element;
    el.dispatchEvent(event);
    return event;
  }
}

function useActions(node, actions) {
  let objects = [];

  if (actions) {
    for (let i = 0; i < actions.length; i++) {
      const isArray = Array.isArray(actions[i]);
      const action = isArray ? actions[i][0] : actions[i];
      if (isArray && actions[i].length > 1) {
        objects.push(action(node, actions[i][1]));
      } else {
        objects.push(action(node));
      }
    }
  }

  return {
    update(actions) {
      if (((actions && actions.length) || 0) != objects.length) {
        throw new Error('You must not change the length of an actions array.');
      }

      if (actions) {
        for (let i = 0; i < actions.length; i++) {
          if (objects[i] && 'update' in objects[i]) {
            const isArray = Array.isArray(actions[i]);
            if (isArray && actions[i].length > 1) {
              objects[i].update(actions[i][1]);
            } else {
              objects[i].update();
            }
          }
        }
      }
    },

    destroy() {
      for (let i = 0; i < objects.length; i++) {
        if (objects[i] && 'destroy' in objects[i]) {
          objects[i].destroy();
        }
      }
    },
  };
}

/* node_modules\@smui\drawer\Drawer.svelte generated by Svelte v3.38.3 */

const file$g = "node_modules\\@smui\\drawer\\Drawer.svelte";

function create_fragment$l(ctx) {
	let aside;
	let aside_class_value;
	let useActions_action;
	let current;
	let mounted;
	let dispose;
	const default_slot_template = /*#slots*/ ctx[15].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[14], null);

	let aside_levels = [
		{
			class: aside_class_value = classMap({
				[/*className*/ ctx[1]]: true,
				"mdc-drawer": true,
				"mdc-drawer--dismissible": /*variant*/ ctx[2] === "dismissible",
				"mdc-drawer--modal": /*variant*/ ctx[2] === "modal",
				"smui-drawer__absolute": /*variant*/ ctx[2] === "modal" && !/*fixed*/ ctx[3],
				.../*internalClasses*/ ctx[6]
			})
		},
		/*$$restProps*/ ctx[8]
	];

	let aside_data = {};

	for (let i = 0; i < aside_levels.length; i += 1) {
		aside_data = assign(aside_data, aside_levels[i]);
	}

	const block = {
		c: function create() {
			aside = element("aside");
			if (default_slot) default_slot.c();
			this.h();
		},
		l: function claim(nodes) {
			aside = claim_element(nodes, "ASIDE", { class: true });
			var aside_nodes = children(aside);
			if (default_slot) default_slot.l(aside_nodes);
			aside_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			set_attributes(aside, aside_data);
			add_location(aside, file$g, 0, 0, 0);
		},
		m: function mount(target, anchor) {
			insert_dev(target, aside, anchor);

			if (default_slot) {
				default_slot.m(aside, null);
			}

			/*aside_binding*/ ctx[16](aside);
			current = true;

			if (!mounted) {
				dispose = [
					action_destroyer(useActions_action = useActions.call(null, aside, /*use*/ ctx[0])),
					action_destroyer(/*forwardEvents*/ ctx[7].call(null, aside)),
					listen_dev(aside, "keydown", /*keydown_handler*/ ctx[17], false, false, false),
					listen_dev(aside, "transitionend", /*transitionend_handler*/ ctx[18], false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 16384)) {
					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[14], !current ? -1 : dirty, null, null);
				}
			}

			set_attributes(aside, aside_data = get_spread_update(aside_levels, [
				(!current || dirty & /*className, variant, fixed, internalClasses*/ 78 && aside_class_value !== (aside_class_value = classMap({
					[/*className*/ ctx[1]]: true,
					"mdc-drawer": true,
					"mdc-drawer--dismissible": /*variant*/ ctx[2] === "dismissible",
					"mdc-drawer--modal": /*variant*/ ctx[2] === "modal",
					"smui-drawer__absolute": /*variant*/ ctx[2] === "modal" && !/*fixed*/ ctx[3],
					.../*internalClasses*/ ctx[6]
				}))) && { class: aside_class_value },
				dirty & /*$$restProps*/ 256 && /*$$restProps*/ ctx[8]
			]));

			if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/ 1) useActions_action.update.call(null, /*use*/ ctx[0]);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(aside);
			if (default_slot) default_slot.d(detaching);
			/*aside_binding*/ ctx[16](null);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$l.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance_1$3($$self, $$props, $$invalidate) {
	const omit_props_names = ["use","class","variant","open","fixed","setOpen","isOpen","getElement"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("Drawer", slots, ['default']);
	const { FocusTrap } = domFocusTrap;
	const forwardEvents = forwardEventsBuilder(get_current_component());
	let { use = [] } = $$props;
	let { class: className = "" } = $$props;
	let { variant = null } = $$props;
	let { open = false } = $$props;
	let { fixed = true } = $$props;
	let element;
	let instance;
	let internalClasses = {};
	let previousFocus;
	let focusTrap;
	let scrim = false;
	setContext("SMUI:list:nav", true);
	setContext("SMUI:list:item:nav", true);
	setContext("SMUI:list:wrapFocus", true);
	let oldVariant = variant;

	onMount(() => {
		focusTrap = new FocusTrap(element,
		{
				// Component handles focusing on active nav item.
				skipInitialFocus: true
			});

		$$invalidate(4, instance = getInstance());
		instance && instance.init();
	});

	onDestroy(() => {
		instance && instance.destroy();
		scrim && scrim.removeEventListener("SMUI:drawer:scrim:click", handleScrimClick);
	});

	function getInstance() {
		if (scrim) {
			scrim.removeEventListener("SMUI:drawer:scrim:click", handleScrimClick);
		}

		if (variant === "modal") {
			scrim = element.parentNode.querySelector(".mdc-drawer-scrim");

			if (scrim) {
				scrim.addEventListener("SMUI:drawer:scrim:click", handleScrimClick);
			}
		}

		const Foundation = ({
			dismissible: MDCDismissibleDrawerFoundation,
			modal: MDCModalDrawerFoundation
		})[variant];

		return Foundation
		? new Foundation({
					addClass,
					removeClass,
					hasClass,
					elementHasClass: (element, className) => element.classList.contains(className),
					saveFocus: () => previousFocus = document.activeElement,
					restoreFocus: () => {
						if (previousFocus && previousFocus.focus && element.contains(document.activeElement)) {
							previousFocus.focus();
						}
					},
					focusActiveNavigationItem: () => {
						const activeNavItemEl = element.querySelector(".mdc-list-item--activated,.mdc-deprecated-list-item--activated");

						if (activeNavItemEl) {
							activeNavItemEl.focus();
						}
					},
					notifyClose: () => {
						$$invalidate(9, open = false);
						dispatch(element, "MDCDrawer:closed");
					},
					notifyOpen: () => {
						$$invalidate(9, open = true);
						dispatch(element, "MDCDrawer:opened");
					},
					trapFocus: () => focusTrap.trapFocus(),
					releaseFocus: () => focusTrap.releaseFocus()
				})
		: undefined;
	}

	function hasClass(className) {
		return className in internalClasses
		? internalClasses[className]
		: getElement().classList.contains(className);
	}

	function addClass(className) {
		if (!internalClasses[className]) {
			$$invalidate(6, internalClasses[className] = true, internalClasses);
		}
	}

	function removeClass(className) {
		if (!(className in internalClasses) || internalClasses[className]) {
			$$invalidate(6, internalClasses[className] = false, internalClasses);
		}
	}

	function handleScrimClick() {
		instance && instance.handleScrimClick();
	}

	function setOpen(value) {
		$$invalidate(9, open = value);
	}

	function isOpen() {
		return open;
	}

	function getElement() {
		return element;
	}

	function aside_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			element = $$value;
			$$invalidate(5, element);
		});
	}

	const keydown_handler = event => instance && instance.handleKeydown(event);
	const transitionend_handler = event => instance && instance.handleTransitionEnd(event);

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(8, $$restProps = compute_rest_props($$props, omit_props_names));
		if ("use" in $$new_props) $$invalidate(0, use = $$new_props.use);
		if ("class" in $$new_props) $$invalidate(1, className = $$new_props.class);
		if ("variant" in $$new_props) $$invalidate(2, variant = $$new_props.variant);
		if ("open" in $$new_props) $$invalidate(9, open = $$new_props.open);
		if ("fixed" in $$new_props) $$invalidate(3, fixed = $$new_props.fixed);
		if ("$$scope" in $$new_props) $$invalidate(14, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({
		MDCDismissibleDrawerFoundation,
		MDCModalDrawerFoundation,
		domFocusTrap,
		onMount,
		onDestroy,
		setContext,
		get_current_component,
		forwardEventsBuilder,
		classMap,
		useActions,
		dispatch,
		FocusTrap,
		forwardEvents,
		use,
		className,
		variant,
		open,
		fixed,
		element,
		instance,
		internalClasses,
		previousFocus,
		focusTrap,
		scrim,
		oldVariant,
		getInstance,
		hasClass,
		addClass,
		removeClass,
		handleScrimClick,
		setOpen,
		isOpen,
		getElement
	});

	$$self.$inject_state = $$new_props => {
		if ("use" in $$props) $$invalidate(0, use = $$new_props.use);
		if ("className" in $$props) $$invalidate(1, className = $$new_props.className);
		if ("variant" in $$props) $$invalidate(2, variant = $$new_props.variant);
		if ("open" in $$props) $$invalidate(9, open = $$new_props.open);
		if ("fixed" in $$props) $$invalidate(3, fixed = $$new_props.fixed);
		if ("element" in $$props) $$invalidate(5, element = $$new_props.element);
		if ("instance" in $$props) $$invalidate(4, instance = $$new_props.instance);
		if ("internalClasses" in $$props) $$invalidate(6, internalClasses = $$new_props.internalClasses);
		if ("previousFocus" in $$props) previousFocus = $$new_props.previousFocus;
		if ("focusTrap" in $$props) focusTrap = $$new_props.focusTrap;
		if ("scrim" in $$props) scrim = $$new_props.scrim;
		if ("oldVariant" in $$props) $$invalidate(13, oldVariant = $$new_props.oldVariant);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*oldVariant, variant, instance*/ 8212) {
			if (oldVariant !== variant) {
				$$invalidate(13, oldVariant = variant);
				instance && instance.destroy();
				$$invalidate(6, internalClasses = {});
				$$invalidate(4, instance = getInstance());
				instance && instance.init();
			}
		}

		if ($$self.$$.dirty & /*instance, open*/ 528) {
			if (instance && instance.isOpen() !== open) {
				if (open) {
					instance.open();
				} else {
					instance.close();
				}
			}
		}
	};

	return [
		use,
		className,
		variant,
		fixed,
		instance,
		element,
		internalClasses,
		forwardEvents,
		$$restProps,
		open,
		setOpen,
		isOpen,
		getElement,
		oldVariant,
		$$scope,
		slots,
		aside_binding,
		keydown_handler,
		transitionend_handler
	];
}

class Drawer extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init$1(this, options, instance_1$3, create_fragment$l, safe_not_equal, {
			use: 0,
			class: 1,
			variant: 2,
			open: 9,
			fixed: 3,
			setOpen: 10,
			isOpen: 11,
			getElement: 12
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Drawer",
			options,
			id: create_fragment$l.name
		});
	}

	get use() {
		throw new Error("<Drawer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set use(value) {
		throw new Error("<Drawer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get class() {
		throw new Error("<Drawer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set class(value) {
		throw new Error("<Drawer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get variant() {
		throw new Error("<Drawer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set variant(value) {
		throw new Error("<Drawer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get open() {
		throw new Error("<Drawer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set open(value) {
		throw new Error("<Drawer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get fixed() {
		throw new Error("<Drawer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set fixed(value) {
		throw new Error("<Drawer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get setOpen() {
		return this.$$.ctx[10];
	}

	set setOpen(value) {
		throw new Error("<Drawer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isOpen() {
		return this.$$.ctx[11];
	}

	set isOpen(value) {
		throw new Error("<Drawer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get getElement() {
		return this.$$.ctx[12];
	}

	set getElement(value) {
		throw new Error("<Drawer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* node_modules\@smui\common\Div.svelte generated by Svelte v3.38.3 */
const file$f = "node_modules\\@smui\\common\\Div.svelte";

function create_fragment$k(ctx) {
	let div;
	let useActions_action;
	let current;
	let mounted;
	let dispose;
	const default_slot_template = /*#slots*/ ctx[6].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[5], null);
	let div_levels = [/*$$restProps*/ ctx[3]];
	let div_data = {};

	for (let i = 0; i < div_levels.length; i += 1) {
		div_data = assign(div_data, div_levels[i]);
	}

	const block = {
		c: function create() {
			div = element("div");
			if (default_slot) default_slot.c();
			this.h();
		},
		l: function claim(nodes) {
			div = claim_element(nodes, "DIV", {});
			var div_nodes = children(div);
			if (default_slot) default_slot.l(div_nodes);
			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			set_attributes(div, div_data);
			add_location(div, file$f, 0, 0, 0);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);

			if (default_slot) {
				default_slot.m(div, null);
			}

			/*div_binding*/ ctx[7](div);
			current = true;

			if (!mounted) {
				dispose = [
					action_destroyer(useActions_action = useActions.call(null, div, /*use*/ ctx[0])),
					action_destroyer(/*forwardEvents*/ ctx[2].call(null, div))
				];

				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 32)) {
					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[5], !current ? -1 : dirty, null, null);
				}
			}

			set_attributes(div, div_data = get_spread_update(div_levels, [dirty & /*$$restProps*/ 8 && /*$$restProps*/ ctx[3]]));
			if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/ 1) useActions_action.update.call(null, /*use*/ ctx[0]);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			if (default_slot) default_slot.d(detaching);
			/*div_binding*/ ctx[7](null);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$k.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$h($$self, $$props, $$invalidate) {
	const omit_props_names = ["use","getElement"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("Div", slots, ['default']);
	let { use = [] } = $$props;
	const forwardEvents = forwardEventsBuilder(get_current_component());
	let element = null;

	function getElement() {
		return element;
	}

	function div_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			element = $$value;
			$$invalidate(1, element);
		});
	}

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(3, $$restProps = compute_rest_props($$props, omit_props_names));
		if ("use" in $$new_props) $$invalidate(0, use = $$new_props.use);
		if ("$$scope" in $$new_props) $$invalidate(5, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({
		get_current_component,
		forwardEventsBuilder,
		useActions,
		use,
		forwardEvents,
		element,
		getElement
	});

	$$self.$inject_state = $$new_props => {
		if ("use" in $$props) $$invalidate(0, use = $$new_props.use);
		if ("element" in $$props) $$invalidate(1, element = $$new_props.element);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		use,
		element,
		forwardEvents,
		$$restProps,
		getElement,
		$$scope,
		slots,
		div_binding
	];
}

class Div extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$h, create_fragment$k, safe_not_equal, { use: 0, getElement: 4 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Div",
			options,
			id: create_fragment$k.name
		});
	}

	get use() {
		throw new Error("<Div>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set use(value) {
		throw new Error("<Div>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get getElement() {
		return this.$$.ctx[4];
	}

	set getElement(value) {
		throw new Error("<Div>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

var AppContent = classAdderBuilder({
  class: 'mdc-drawer-app-content',
  component: Div,
});

var Content = classAdderBuilder({
  class: 'mdc-drawer__content',
  component: Div,
});

var Header = classAdderBuilder({
  class: 'mdc-drawer__header',
  component: Div,
});

/* node_modules\@smui\common\H1.svelte generated by Svelte v3.38.3 */
const file$e = "node_modules\\@smui\\common\\H1.svelte";

function create_fragment$j(ctx) {
	let h1;
	let useActions_action;
	let current;
	let mounted;
	let dispose;
	const default_slot_template = /*#slots*/ ctx[6].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[5], null);
	let h1_levels = [/*$$restProps*/ ctx[3]];
	let h1_data = {};

	for (let i = 0; i < h1_levels.length; i += 1) {
		h1_data = assign(h1_data, h1_levels[i]);
	}

	const block = {
		c: function create() {
			h1 = element("h1");
			if (default_slot) default_slot.c();
			this.h();
		},
		l: function claim(nodes) {
			h1 = claim_element(nodes, "H1", {});
			var h1_nodes = children(h1);
			if (default_slot) default_slot.l(h1_nodes);
			h1_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			set_attributes(h1, h1_data);
			add_location(h1, file$e, 0, 0, 0);
		},
		m: function mount(target, anchor) {
			insert_dev(target, h1, anchor);

			if (default_slot) {
				default_slot.m(h1, null);
			}

			/*h1_binding*/ ctx[7](h1);
			current = true;

			if (!mounted) {
				dispose = [
					action_destroyer(useActions_action = useActions.call(null, h1, /*use*/ ctx[0])),
					action_destroyer(/*forwardEvents*/ ctx[2].call(null, h1))
				];

				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 32)) {
					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[5], !current ? -1 : dirty, null, null);
				}
			}

			set_attributes(h1, h1_data = get_spread_update(h1_levels, [dirty & /*$$restProps*/ 8 && /*$$restProps*/ ctx[3]]));
			if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/ 1) useActions_action.update.call(null, /*use*/ ctx[0]);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(h1);
			if (default_slot) default_slot.d(detaching);
			/*h1_binding*/ ctx[7](null);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$j.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$g($$self, $$props, $$invalidate) {
	const omit_props_names = ["use","getElement"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("H1", slots, ['default']);
	let { use = [] } = $$props;
	const forwardEvents = forwardEventsBuilder(get_current_component());
	let element = null;

	function getElement() {
		return element;
	}

	function h1_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			element = $$value;
			$$invalidate(1, element);
		});
	}

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(3, $$restProps = compute_rest_props($$props, omit_props_names));
		if ("use" in $$new_props) $$invalidate(0, use = $$new_props.use);
		if ("$$scope" in $$new_props) $$invalidate(5, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({
		get_current_component,
		forwardEventsBuilder,
		useActions,
		use,
		forwardEvents,
		element,
		getElement
	});

	$$self.$inject_state = $$new_props => {
		if ("use" in $$props) $$invalidate(0, use = $$new_props.use);
		if ("element" in $$props) $$invalidate(1, element = $$new_props.element);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		use,
		element,
		forwardEvents,
		$$restProps,
		getElement,
		$$scope,
		slots,
		h1_binding
	];
}

class H1 extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$g, create_fragment$j, safe_not_equal, { use: 0, getElement: 4 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "H1",
			options,
			id: create_fragment$j.name
		});
	}

	get use() {
		throw new Error("<H1>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set use(value) {
		throw new Error("<H1>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get getElement() {
		return this.$$.ctx[4];
	}

	set getElement(value) {
		throw new Error("<H1>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

var Title$1 = classAdderBuilder({
  class: 'mdc-drawer__title',
  component: H1,
});

/* node_modules\@smui\common\H2.svelte generated by Svelte v3.38.3 */
const file$d = "node_modules\\@smui\\common\\H2.svelte";

function create_fragment$i(ctx) {
	let h2;
	let useActions_action;
	let current;
	let mounted;
	let dispose;
	const default_slot_template = /*#slots*/ ctx[6].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[5], null);
	let h2_levels = [/*$$restProps*/ ctx[3]];
	let h2_data = {};

	for (let i = 0; i < h2_levels.length; i += 1) {
		h2_data = assign(h2_data, h2_levels[i]);
	}

	const block = {
		c: function create() {
			h2 = element("h2");
			if (default_slot) default_slot.c();
			this.h();
		},
		l: function claim(nodes) {
			h2 = claim_element(nodes, "H2", {});
			var h2_nodes = children(h2);
			if (default_slot) default_slot.l(h2_nodes);
			h2_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			set_attributes(h2, h2_data);
			add_location(h2, file$d, 0, 0, 0);
		},
		m: function mount(target, anchor) {
			insert_dev(target, h2, anchor);

			if (default_slot) {
				default_slot.m(h2, null);
			}

			/*h2_binding*/ ctx[7](h2);
			current = true;

			if (!mounted) {
				dispose = [
					action_destroyer(useActions_action = useActions.call(null, h2, /*use*/ ctx[0])),
					action_destroyer(/*forwardEvents*/ ctx[2].call(null, h2))
				];

				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 32)) {
					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[5], !current ? -1 : dirty, null, null);
				}
			}

			set_attributes(h2, h2_data = get_spread_update(h2_levels, [dirty & /*$$restProps*/ 8 && /*$$restProps*/ ctx[3]]));
			if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/ 1) useActions_action.update.call(null, /*use*/ ctx[0]);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(h2);
			if (default_slot) default_slot.d(detaching);
			/*h2_binding*/ ctx[7](null);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$i.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$f($$self, $$props, $$invalidate) {
	const omit_props_names = ["use","getElement"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("H2", slots, ['default']);
	let { use = [] } = $$props;
	const forwardEvents = forwardEventsBuilder(get_current_component());
	let element = null;

	function getElement() {
		return element;
	}

	function h2_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			element = $$value;
			$$invalidate(1, element);
		});
	}

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(3, $$restProps = compute_rest_props($$props, omit_props_names));
		if ("use" in $$new_props) $$invalidate(0, use = $$new_props.use);
		if ("$$scope" in $$new_props) $$invalidate(5, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({
		get_current_component,
		forwardEventsBuilder,
		useActions,
		use,
		forwardEvents,
		element,
		getElement
	});

	$$self.$inject_state = $$new_props => {
		if ("use" in $$props) $$invalidate(0, use = $$new_props.use);
		if ("element" in $$props) $$invalidate(1, element = $$new_props.element);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		use,
		element,
		forwardEvents,
		$$restProps,
		getElement,
		$$scope,
		slots,
		h2_binding
	];
}

class H2 extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$f, create_fragment$i, safe_not_equal, { use: 0, getElement: 4 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "H2",
			options,
			id: create_fragment$i.name
		});
	}

	get use() {
		throw new Error("<H2>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set use(value) {
		throw new Error("<H2>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get getElement() {
		return this.$$.ctx[4];
	}

	set getElement(value) {
		throw new Error("<H2>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

classAdderBuilder({
  class: 'mdc-drawer__subtitle',
  component: H2,
});

/* node_modules\@smui\drawer\Scrim.svelte generated by Svelte v3.38.3 */

// (1:0) <svelte:component   this={component}   bind:this={element}   use={[forwardEvents, ...use]}   class={classMap({     [className]: true,     'mdc-drawer-scrim': true,     'smui-drawer-scrim__absolute': !fixed,   })}   on:click={(event) => dispatch(element, 'SMUI:drawer:scrim:click', event)}   {...$$restProps} >
function create_default_slot$6(ctx) {
	let current;
	const default_slot_template = /*#slots*/ ctx[8].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[11], null);

	const block = {
		c: function create() {
			if (default_slot) default_slot.c();
		},
		l: function claim(nodes) {
			if (default_slot) default_slot.l(nodes);
		},
		m: function mount(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 2048)) {
					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[11], !current ? -1 : dirty, null, null);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot$6.name,
		type: "slot",
		source: "(1:0) <svelte:component   this={component}   bind:this={element}   use={[forwardEvents, ...use]}   class={classMap({     [className]: true,     'mdc-drawer-scrim': true,     'smui-drawer-scrim__absolute': !fixed,   })}   on:click={(event) => dispatch(element, 'SMUI:drawer:scrim:click', event)}   {...$$restProps} >",
		ctx
	});

	return block;
}

function create_fragment$h(ctx) {
	let switch_instance;
	let switch_instance_anchor;
	let current;

	const switch_instance_spread_levels = [
		{
			use: [/*forwardEvents*/ ctx[5], .../*use*/ ctx[0]]
		},
		{
			class: classMap({
				[/*className*/ ctx[1]]: true,
				"mdc-drawer-scrim": true,
				"smui-drawer-scrim__absolute": !/*fixed*/ ctx[2]
			})
		},
		/*$$restProps*/ ctx[6]
	];

	var switch_value = /*component*/ ctx[3];

	function switch_props(ctx) {
		let switch_instance_props = {
			$$slots: { default: [create_default_slot$6] },
			$$scope: { ctx }
		};

		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
		}

		return {
			props: switch_instance_props,
			$$inline: true
		};
	}

	if (switch_value) {
		switch_instance = new switch_value(switch_props(ctx));
		/*switch_instance_binding*/ ctx[9](switch_instance);
		switch_instance.$on("click", /*click_handler*/ ctx[10]);
	}

	const block = {
		c: function create() {
			if (switch_instance) create_component(switch_instance.$$.fragment);
			switch_instance_anchor = empty();
		},
		l: function claim(nodes) {
			if (switch_instance) claim_component(switch_instance.$$.fragment, nodes);
			switch_instance_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (switch_instance) {
				mount_component(switch_instance, target, anchor);
			}

			insert_dev(target, switch_instance_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const switch_instance_changes = (dirty & /*forwardEvents, use, classMap, className, fixed, $$restProps*/ 103)
			? get_spread_update(switch_instance_spread_levels, [
					dirty & /*forwardEvents, use*/ 33 && {
						use: [/*forwardEvents*/ ctx[5], .../*use*/ ctx[0]]
					},
					dirty & /*classMap, className, fixed*/ 6 && {
						class: classMap({
							[/*className*/ ctx[1]]: true,
							"mdc-drawer-scrim": true,
							"smui-drawer-scrim__absolute": !/*fixed*/ ctx[2]
						})
					},
					dirty & /*$$restProps*/ 64 && get_spread_object(/*$$restProps*/ ctx[6])
				])
			: {};

			if (dirty & /*$$scope*/ 2048) {
				switch_instance_changes.$$scope = { dirty, ctx };
			}

			if (switch_value !== (switch_value = /*component*/ ctx[3])) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props(ctx));
					/*switch_instance_binding*/ ctx[9](switch_instance);
					switch_instance.$on("click", /*click_handler*/ ctx[10]);
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}
		},
		i: function intro(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			/*switch_instance_binding*/ ctx[9](null);
			if (detaching) detach_dev(switch_instance_anchor);
			if (switch_instance) destroy_component(switch_instance, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$h.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$e($$self, $$props, $$invalidate) {
	const omit_props_names = ["use","class","fixed","component","getElement"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("Scrim", slots, ['default']);
	const forwardEvents = forwardEventsBuilder(get_current_component());
	let { use = [] } = $$props;
	let { class: className = "" } = $$props;
	let { fixed = true } = $$props;
	let element;
	let { component = Div } = $$props;

	function getElement() {
		return element.getElement();
	}

	function switch_instance_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			element = $$value;
			$$invalidate(4, element);
		});
	}

	const click_handler = event => dispatch(element, "SMUI:drawer:scrim:click", event);

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(6, $$restProps = compute_rest_props($$props, omit_props_names));
		if ("use" in $$new_props) $$invalidate(0, use = $$new_props.use);
		if ("class" in $$new_props) $$invalidate(1, className = $$new_props.class);
		if ("fixed" in $$new_props) $$invalidate(2, fixed = $$new_props.fixed);
		if ("component" in $$new_props) $$invalidate(3, component = $$new_props.component);
		if ("$$scope" in $$new_props) $$invalidate(11, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({
		get_current_component,
		forwardEventsBuilder,
		classMap,
		dispatch,
		Div,
		forwardEvents,
		use,
		className,
		fixed,
		element,
		component,
		getElement
	});

	$$self.$inject_state = $$new_props => {
		if ("use" in $$props) $$invalidate(0, use = $$new_props.use);
		if ("className" in $$props) $$invalidate(1, className = $$new_props.className);
		if ("fixed" in $$props) $$invalidate(2, fixed = $$new_props.fixed);
		if ("element" in $$props) $$invalidate(4, element = $$new_props.element);
		if ("component" in $$props) $$invalidate(3, component = $$new_props.component);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		use,
		className,
		fixed,
		component,
		element,
		forwardEvents,
		$$restProps,
		getElement,
		slots,
		switch_instance_binding,
		click_handler,
		$$scope
	];
}

class Scrim extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init$1(this, options, instance$e, create_fragment$h, safe_not_equal, {
			use: 0,
			class: 1,
			fixed: 2,
			component: 3,
			getElement: 7
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Scrim",
			options,
			id: create_fragment$h.name
		});
	}

	get use() {
		throw new Error("<Scrim>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set use(value) {
		throw new Error("<Scrim>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get class() {
		throw new Error("<Scrim>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set class(value) {
		throw new Error("<Scrim>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get fixed() {
		throw new Error("<Scrim>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set fixed(value) {
		throw new Error("<Scrim>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get component() {
		throw new Error("<Scrim>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set component(value) {
		throw new Error("<Scrim>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get getElement() {
		return this.$$.ctx[7];
	}

	set getElement(value) {
		throw new Error("<Scrim>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* node_modules\@smui\common\Ul.svelte generated by Svelte v3.38.3 */
const file$c = "node_modules\\@smui\\common\\Ul.svelte";

function create_fragment$g(ctx) {
	let ul;
	let useActions_action;
	let current;
	let mounted;
	let dispose;
	const default_slot_template = /*#slots*/ ctx[6].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[5], null);
	let ul_levels = [/*$$restProps*/ ctx[3]];
	let ul_data = {};

	for (let i = 0; i < ul_levels.length; i += 1) {
		ul_data = assign(ul_data, ul_levels[i]);
	}

	const block = {
		c: function create() {
			ul = element("ul");
			if (default_slot) default_slot.c();
			this.h();
		},
		l: function claim(nodes) {
			ul = claim_element(nodes, "UL", {});
			var ul_nodes = children(ul);
			if (default_slot) default_slot.l(ul_nodes);
			ul_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			set_attributes(ul, ul_data);
			add_location(ul, file$c, 0, 0, 0);
		},
		m: function mount(target, anchor) {
			insert_dev(target, ul, anchor);

			if (default_slot) {
				default_slot.m(ul, null);
			}

			/*ul_binding*/ ctx[7](ul);
			current = true;

			if (!mounted) {
				dispose = [
					action_destroyer(useActions_action = useActions.call(null, ul, /*use*/ ctx[0])),
					action_destroyer(/*forwardEvents*/ ctx[2].call(null, ul))
				];

				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 32)) {
					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[5], !current ? -1 : dirty, null, null);
				}
			}

			set_attributes(ul, ul_data = get_spread_update(ul_levels, [dirty & /*$$restProps*/ 8 && /*$$restProps*/ ctx[3]]));
			if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/ 1) useActions_action.update.call(null, /*use*/ ctx[0]);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(ul);
			if (default_slot) default_slot.d(detaching);
			/*ul_binding*/ ctx[7](null);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$g.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$d($$self, $$props, $$invalidate) {
	const omit_props_names = ["use","getElement"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("Ul", slots, ['default']);
	let { use = [] } = $$props;
	const forwardEvents = forwardEventsBuilder(get_current_component());
	let element = null;

	function getElement() {
		return element;
	}

	function ul_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			element = $$value;
			$$invalidate(1, element);
		});
	}

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(3, $$restProps = compute_rest_props($$props, omit_props_names));
		if ("use" in $$new_props) $$invalidate(0, use = $$new_props.use);
		if ("$$scope" in $$new_props) $$invalidate(5, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({
		get_current_component,
		forwardEventsBuilder,
		useActions,
		use,
		forwardEvents,
		element,
		getElement
	});

	$$self.$inject_state = $$new_props => {
		if ("use" in $$props) $$invalidate(0, use = $$new_props.use);
		if ("element" in $$props) $$invalidate(1, element = $$new_props.element);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		use,
		element,
		forwardEvents,
		$$restProps,
		getElement,
		$$scope,
		slots,
		ul_binding
	];
}

class Ul extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$d, create_fragment$g, safe_not_equal, { use: 0, getElement: 4 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Ul",
			options,
			id: create_fragment$g.name
		});
	}

	get use() {
		throw new Error("<Ul>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set use(value) {
		throw new Error("<Ul>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get getElement() {
		return this.$$.ctx[4];
	}

	set getElement(value) {
		throw new Error("<Ul>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* node_modules\@smui\common\Nav.svelte generated by Svelte v3.38.3 */
const file$b = "node_modules\\@smui\\common\\Nav.svelte";

function create_fragment$f(ctx) {
	let nav;
	let useActions_action;
	let current;
	let mounted;
	let dispose;
	const default_slot_template = /*#slots*/ ctx[6].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[5], null);
	let nav_levels = [/*$$restProps*/ ctx[3]];
	let nav_data = {};

	for (let i = 0; i < nav_levels.length; i += 1) {
		nav_data = assign(nav_data, nav_levels[i]);
	}

	const block = {
		c: function create() {
			nav = element("nav");
			if (default_slot) default_slot.c();
			this.h();
		},
		l: function claim(nodes) {
			nav = claim_element(nodes, "NAV", {});
			var nav_nodes = children(nav);
			if (default_slot) default_slot.l(nav_nodes);
			nav_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			set_attributes(nav, nav_data);
			add_location(nav, file$b, 0, 0, 0);
		},
		m: function mount(target, anchor) {
			insert_dev(target, nav, anchor);

			if (default_slot) {
				default_slot.m(nav, null);
			}

			/*nav_binding*/ ctx[7](nav);
			current = true;

			if (!mounted) {
				dispose = [
					action_destroyer(useActions_action = useActions.call(null, nav, /*use*/ ctx[0])),
					action_destroyer(/*forwardEvents*/ ctx[2].call(null, nav))
				];

				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 32)) {
					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[5], !current ? -1 : dirty, null, null);
				}
			}

			set_attributes(nav, nav_data = get_spread_update(nav_levels, [dirty & /*$$restProps*/ 8 && /*$$restProps*/ ctx[3]]));
			if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/ 1) useActions_action.update.call(null, /*use*/ ctx[0]);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(nav);
			if (default_slot) default_slot.d(detaching);
			/*nav_binding*/ ctx[7](null);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$f.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$c($$self, $$props, $$invalidate) {
	const omit_props_names = ["use","getElement"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("Nav", slots, ['default']);
	let { use = [] } = $$props;
	const forwardEvents = forwardEventsBuilder(get_current_component());
	let element = null;

	function getElement() {
		return element;
	}

	function nav_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			element = $$value;
			$$invalidate(1, element);
		});
	}

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(3, $$restProps = compute_rest_props($$props, omit_props_names));
		if ("use" in $$new_props) $$invalidate(0, use = $$new_props.use);
		if ("$$scope" in $$new_props) $$invalidate(5, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({
		get_current_component,
		forwardEventsBuilder,
		useActions,
		use,
		forwardEvents,
		element,
		getElement
	});

	$$self.$inject_state = $$new_props => {
		if ("use" in $$props) $$invalidate(0, use = $$new_props.use);
		if ("element" in $$props) $$invalidate(1, element = $$new_props.element);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		use,
		element,
		forwardEvents,
		$$restProps,
		getElement,
		$$scope,
		slots,
		nav_binding
	];
}

class Nav$1 extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$c, create_fragment$f, safe_not_equal, { use: 0, getElement: 4 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Nav",
			options,
			id: create_fragment$f.name
		});
	}

	get use() {
		throw new Error("<Nav>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set use(value) {
		throw new Error("<Nav>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get getElement() {
		return this.$$.ctx[4];
	}

	set getElement(value) {
		throw new Error("<Nav>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* node_modules\@smui\list\List.svelte generated by Svelte v3.38.3 */

// (1:0) <svelte:component   this={component}   bind:this={element}   use={[forwardEvents, ...use]}   class={classMap({     [className]: true,     'mdc-deprecated-list': true,     'mdc-deprecated-list--non-interactive': nonInteractive,     'mdc-deprecated-list--dense': dense,     'mdc-deprecated-list--textual-list': textualList,     'mdc-deprecated-list--avatar-list': avatarList || selectionDialog,     'mdc-deprecated-list--icon-list': iconList,     'mdc-deprecated-list--image-list': imageList,     'mdc-deprecated-list--thumbnail-list': thumbnailList,     'mdc-deprecated-list--video-list': videoList,     'mdc-deprecated-list--two-line': twoLine,     'smui-list--three-line': threeLine && !twoLine,   })}   {role}   on:keydown={(event) =>     instance &&     instance.handleKeydown(       event,       event.target.classList.contains('mdc-deprecated-list-item'),       getListItemIndex(event.target)     )}   on:focusin={(event) =>     instance && instance.handleFocusIn(event, getListItemIndex(event.target))}   on:focusout={(event) =>     instance && instance.handleFocusOut(event, getListItemIndex(event.target))}   on:click={(event) =>     instance &&     instance.handleClick(       getListItemIndex(event.target),       !matches(event.target, 'input[type="checkbox"], input[type="radio"]')     )}   on:SMUI:list:item:mount={handleItemMount}   on:SMUI:list:item:unmount={handleItemUnmount}   on:SMUI:action={handleAction}   {...$$restProps} >
function create_default_slot$5(ctx) {
	let current;
	const default_slot_template = /*#slots*/ ctx[38].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[44], null);

	const block = {
		c: function create() {
			if (default_slot) default_slot.c();
		},
		l: function claim(nodes) {
			if (default_slot) default_slot.l(nodes);
		},
		m: function mount(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty[1] & /*$$scope*/ 8192)) {
					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[44], !current ? [-1, -1] : dirty, null, null);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot$5.name,
		type: "slot",
		source: "(1:0) <svelte:component   this={component}   bind:this={element}   use={[forwardEvents, ...use]}   class={classMap({     [className]: true,     'mdc-deprecated-list': true,     'mdc-deprecated-list--non-interactive': nonInteractive,     'mdc-deprecated-list--dense': dense,     'mdc-deprecated-list--textual-list': textualList,     'mdc-deprecated-list--avatar-list': avatarList || selectionDialog,     'mdc-deprecated-list--icon-list': iconList,     'mdc-deprecated-list--image-list': imageList,     'mdc-deprecated-list--thumbnail-list': thumbnailList,     'mdc-deprecated-list--video-list': videoList,     'mdc-deprecated-list--two-line': twoLine,     'smui-list--three-line': threeLine && !twoLine,   })}   {role}   on:keydown={(event) =>     instance &&     instance.handleKeydown(       event,       event.target.classList.contains('mdc-deprecated-list-item'),       getListItemIndex(event.target)     )}   on:focusin={(event) =>     instance && instance.handleFocusIn(event, getListItemIndex(event.target))}   on:focusout={(event) =>     instance && instance.handleFocusOut(event, getListItemIndex(event.target))}   on:click={(event) =>     instance &&     instance.handleClick(       getListItemIndex(event.target),       !matches(event.target, 'input[type=\\\"checkbox\\\"], input[type=\\\"radio\\\"]')     )}   on:SMUI:list:item:mount={handleItemMount}   on:SMUI:list:item:unmount={handleItemUnmount}   on:SMUI:action={handleAction}   {...$$restProps} >",
		ctx
	});

	return block;
}

function create_fragment$e(ctx) {
	let switch_instance;
	let switch_instance_anchor;
	let current;

	const switch_instance_spread_levels = [
		{
			use: [/*forwardEvents*/ ctx[17], .../*use*/ ctx[0]]
		},
		{
			class: classMap({
				[/*className*/ ctx[1]]: true,
				"mdc-deprecated-list": true,
				"mdc-deprecated-list--non-interactive": /*nonInteractive*/ ctx[2],
				"mdc-deprecated-list--dense": /*dense*/ ctx[3],
				"mdc-deprecated-list--textual-list": /*textualList*/ ctx[4],
				"mdc-deprecated-list--avatar-list": /*avatarList*/ ctx[5] || /*selectionDialog*/ ctx[18],
				"mdc-deprecated-list--icon-list": /*iconList*/ ctx[6],
				"mdc-deprecated-list--image-list": /*imageList*/ ctx[7],
				"mdc-deprecated-list--thumbnail-list": /*thumbnailList*/ ctx[8],
				"mdc-deprecated-list--video-list": /*videoList*/ ctx[9],
				"mdc-deprecated-list--two-line": /*twoLine*/ ctx[10],
				"smui-list--three-line": /*threeLine*/ ctx[11] && !/*twoLine*/ ctx[10]
			})
		},
		{ role: /*role*/ ctx[15] },
		/*$$restProps*/ ctx[23]
	];

	var switch_value = /*component*/ ctx[12];

	function switch_props(ctx) {
		let switch_instance_props = {
			$$slots: { default: [create_default_slot$5] },
			$$scope: { ctx }
		};

		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
		}

		return {
			props: switch_instance_props,
			$$inline: true
		};
	}

	if (switch_value) {
		switch_instance = new switch_value(switch_props(ctx));
		/*switch_instance_binding*/ ctx[39](switch_instance);
		switch_instance.$on("keydown", /*keydown_handler*/ ctx[40]);
		switch_instance.$on("focusin", /*focusin_handler*/ ctx[41]);
		switch_instance.$on("focusout", /*focusout_handler*/ ctx[42]);
		switch_instance.$on("click", /*click_handler*/ ctx[43]);
		switch_instance.$on("SMUI:list:item:mount", /*handleItemMount*/ ctx[19]);
		switch_instance.$on("SMUI:list:item:unmount", /*handleItemUnmount*/ ctx[20]);
		switch_instance.$on("SMUI:action", /*handleAction*/ ctx[21]);
	}

	const block = {
		c: function create() {
			if (switch_instance) create_component(switch_instance.$$.fragment);
			switch_instance_anchor = empty();
		},
		l: function claim(nodes) {
			if (switch_instance) claim_component(switch_instance.$$.fragment, nodes);
			switch_instance_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (switch_instance) {
				mount_component(switch_instance, target, anchor);
			}

			insert_dev(target, switch_instance_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const switch_instance_changes = (dirty[0] & /*forwardEvents, use, className, nonInteractive, dense, textualList, avatarList, selectionDialog, iconList, imageList, thumbnailList, videoList, twoLine, threeLine, role, $$restProps*/ 8818687)
			? get_spread_update(switch_instance_spread_levels, [
					dirty[0] & /*forwardEvents, use*/ 131073 && {
						use: [/*forwardEvents*/ ctx[17], .../*use*/ ctx[0]]
					},
					dirty[0] & /*className, nonInteractive, dense, textualList, avatarList, selectionDialog, iconList, imageList, thumbnailList, videoList, twoLine, threeLine*/ 266238 && {
						class: classMap({
							[/*className*/ ctx[1]]: true,
							"mdc-deprecated-list": true,
							"mdc-deprecated-list--non-interactive": /*nonInteractive*/ ctx[2],
							"mdc-deprecated-list--dense": /*dense*/ ctx[3],
							"mdc-deprecated-list--textual-list": /*textualList*/ ctx[4],
							"mdc-deprecated-list--avatar-list": /*avatarList*/ ctx[5] || /*selectionDialog*/ ctx[18],
							"mdc-deprecated-list--icon-list": /*iconList*/ ctx[6],
							"mdc-deprecated-list--image-list": /*imageList*/ ctx[7],
							"mdc-deprecated-list--thumbnail-list": /*thumbnailList*/ ctx[8],
							"mdc-deprecated-list--video-list": /*videoList*/ ctx[9],
							"mdc-deprecated-list--two-line": /*twoLine*/ ctx[10],
							"smui-list--three-line": /*threeLine*/ ctx[11] && !/*twoLine*/ ctx[10]
						})
					},
					dirty[0] & /*role*/ 32768 && { role: /*role*/ ctx[15] },
					dirty[0] & /*$$restProps*/ 8388608 && get_spread_object(/*$$restProps*/ ctx[23])
				])
			: {};

			if (dirty[1] & /*$$scope*/ 8192) {
				switch_instance_changes.$$scope = { dirty, ctx };
			}

			if (switch_value !== (switch_value = /*component*/ ctx[12])) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props(ctx));
					/*switch_instance_binding*/ ctx[39](switch_instance);
					switch_instance.$on("keydown", /*keydown_handler*/ ctx[40]);
					switch_instance.$on("focusin", /*focusin_handler*/ ctx[41]);
					switch_instance.$on("focusout", /*focusout_handler*/ ctx[42]);
					switch_instance.$on("click", /*click_handler*/ ctx[43]);
					switch_instance.$on("SMUI:list:item:mount", /*handleItemMount*/ ctx[19]);
					switch_instance.$on("SMUI:list:item:unmount", /*handleItemUnmount*/ ctx[20]);
					switch_instance.$on("SMUI:action", /*handleAction*/ ctx[21]);
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}
		},
		i: function intro(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			/*switch_instance_binding*/ ctx[39](null);
			if (detaching) detach_dev(switch_instance_anchor);
			if (switch_instance) destroy_component(switch_instance, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$e.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance_1$2($$self, $$props, $$invalidate) {
	const omit_props_names = [
		"use","class","nonInteractive","dense","textualList","avatarList","iconList","imageList","thumbnailList","videoList","twoLine","threeLine","vertical","wrapFocus","singleSelection","selectedIndex","radioList","checkList","hasTypeahead","radiolist","checklist","component","layout","setEnabled","getTypeaheadInProgress","getSelectedIndex","getElement"
	];

	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("List", slots, ['default']);
	const { closest, matches } = ponyfill;
	const forwardEvents = forwardEventsBuilder(get_current_component());
	let { use = [] } = $$props;
	let { class: className = "" } = $$props;
	let { nonInteractive = false } = $$props;
	let { dense = false } = $$props;
	let { textualList = false } = $$props;
	let { avatarList = false } = $$props;
	let { iconList = false } = $$props;
	let { imageList = false } = $$props;
	let { thumbnailList = false } = $$props;
	let { videoList = false } = $$props;
	let { twoLine = false } = $$props;
	let { threeLine = false } = $$props;
	let { vertical = true } = $$props;
	let { wrapFocus = getContext("SMUI:list:wrapFocus") || false } = $$props;
	let { singleSelection = false } = $$props;
	let { selectedIndex = -1 } = $$props;
	let { radioList = false } = $$props;
	let { checkList = false } = $$props;
	let { hasTypeahead = false } = $$props;
	let { radiolist = false } = $$props;

	if (radiolist) {
		radioList = true;
	}

	let { checklist = false } = $$props;

	if (checklist) {
		checkList = true;
	}

	let element;
	let instance;
	let items = [];
	let role = getContext("SMUI:list:role");
	let nav = getContext("SMUI:list:nav");
	const itemAccessorMap = new WeakMap();
	let selectionDialog = getContext("SMUI:dialog:selection");
	let addLayoutListener = getContext("SMUI:addLayoutListener");
	let removeLayoutListener;
	let { component = nav ? Nav$1 : Ul } = $$props;
	setContext("SMUI:list:nonInteractive", nonInteractive);
	setContext("SMUI:separator:context", "list");

	if (!role) {
		if (singleSelection) {
			role = "listbox";
			setContext("SMUI:list:item:role", "option");
		} else if (radioList) {
			role = "radiogroup";
			setContext("SMUI:list:item:role", "radio");
		} else if (checkList) {
			role = "group";
			setContext("SMUI:list:item:role", "checkbox");
		} else {
			role = "list";
			setContext("SMUI:list:item:role", undefined);
		}
	}

	if (addLayoutListener) {
		removeLayoutListener = addLayoutListener(layout);
	}

	onMount(() => {
		$$invalidate(13, instance = new MDCListFoundation({
				addClassForElementIndex,
				focusItemAtIndex,
				getAttributeForElementIndex: (index, name) => getOrderedList()[index].getAttr(name),
				getFocusedElementIndex: () => getOrderedList().map(accessor => accessor.element).indexOf(document.activeElement),
				getListItemCount: () => items.length,
				getPrimaryTextAtIndex,
				hasCheckboxAtIndex: index => getOrderedList()[index].hasCheckbox,
				hasRadioAtIndex: index => getOrderedList()[index].hasRadio,
				isCheckboxCheckedAtIndex: index => {
					const listItem = getOrderedList()[index];
					return listItem.hasCheckbox && listItem.checked;
				},
				isFocusInsideList: () => getElement() !== document.activeElement && getElement().contains(document.activeElement),
				isRootFocused: () => document.activeElement === getElement(),
				listItemAtIndexHasClass,
				notifyAction: index => {
					$$invalidate(24, selectedIndex = index);
					dispatch(element, "MDCList:action", { index });
				},
				removeClassForElementIndex,
				setAttributeForElementIndex,
				setCheckedCheckboxOrRadioAtIndex: (index, isChecked) => {
					getOrderedList()[index].checked = isChecked;
				},
				setTabIndexForListItemChildren: (listItemIndex, tabIndexValue) => {
					const listItem = getOrderedList()[listItemIndex];
					const selector = "button:not(:disabled), a";

					Array.prototype.forEach.call(listItem.element.querySelectorAll(selector), el => {
						el.setAttribute("tabindex", tabIndexValue);
					});
				}
			}));

		dispatch(element, "SMUI:list:mount", {
			get element() {
				return getElement();
			},
			get items() {
				return items;
			},
			get typeaheadInProgress() {
				return instance.isTypeaheadInProgress();
			},
			typeaheadMatchItem(nextChar, startingIndex) {
				return instance.typeaheadMatchItem(nextChar, startingIndex, /** skipFocus */
				true);
			},
			getOrderedList,
			focusItemAtIndex,
			addClassForElementIndex,
			removeClassForElementIndex,
			// getAttributeForElementIndex,
			setAttributeForElementIndex,
			removeAttributeForElementIndex,
			getPrimaryTextAtIndex
		});

		instance.init();

		return () => {
			instance.destroy();
		};
	});

	onDestroy(() => {
		if (removeLayoutListener) {
			removeLayoutListener();
		}
	});

	function handleItemMount(event) {
		items.push(event.detail);
		itemAccessorMap.set(event.detail.element, event.detail);

		if (singleSelection && event.detail.selected) {
			$$invalidate(24, selectedIndex = getListItemIndex(event.detail.element));
		}

		event.stopPropagation();
	}

	function handleItemUnmount(event) {
		const idx = items.indexOf(event.detail);

		if (idx !== -1) {
			items.splice(idx, 1);
			items = items;
		}

		itemAccessorMap.delete(event.detail.element);
		event.stopPropagation();
	}

	function handleAction(event) {
		if (radioList || checkList) {
			const index = getListItemIndex(event.target);

			if (index !== -1) {
				const item = getOrderedList()[index];

				if (radioList && !item.checked || checkList) {
					item.checked = !item.checked;
					item.activateRipple();

					window.requestAnimationFrame(() => {
						item.deactivateRipple();
					});
				}
			}
		}
	}

	function getOrderedList() {
		return [...getElement().children].map(element => itemAccessorMap.get(element)).filter(accessor => accessor && accessor._smui_list_item_accessor);
	}

	function focusItemAtIndex(index) {
		const accessor = getOrderedList()[index];
		accessor && accessor.element.focus();
	}

	function listItemAtIndexHasClass(index, className) {
		const accessor = getOrderedList()[index];
		return accessor && accessor.hasClass(className);
	}

	function addClassForElementIndex(index, className) {
		const accessor = getOrderedList()[index];
		accessor && accessor.addClass(className);
	}

	function removeClassForElementIndex(index, className) {
		const accessor = getOrderedList()[index];
		accessor && accessor.removeClass(className);
	}

	// function getAttributeForElementIndex(index, name) {
	//   const accessor = getOrderedList()[index];
	//   accessor && accessor.getAttr(name, value);
	// }
	function setAttributeForElementIndex(index, name, value) {
		const accessor = getOrderedList()[index];
		accessor && accessor.addAttr(name, value);
	}

	function removeAttributeForElementIndex(index, name) {
		const accessor = getOrderedList()[index];
		accessor && accessor.removeAttr(name);
	}

	function getPrimaryTextAtIndex(index) {
		const accessor = getOrderedList()[index];
		return accessor && accessor.getPrimaryText();
	}

	function getListItemIndex(element) {
		const nearestParent = closest(element, ".mdc-deprecated-list-item, .mdc-deprecated-list");

		// Get the index of the element if it is a list item.
		if (nearestParent && matches(nearestParent, ".mdc-deprecated-list-item")) {
			return getOrderedList().map(item => item.element).indexOf(nearestParent);
		}

		return -1;
	}

	function layout() {
		return instance.layout();
	}

	function setEnabled(...args) {
		return instance.setEnabled(...args);
	}

	function getTypeaheadInProgress() {
		return instance.isTypeaheadInProgress();
	}

	function getSelectedIndex() {
		return instance.getSelectedIndex();
	}

	function getElement() {
		return element.getElement();
	}

	function switch_instance_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			element = $$value;
			$$invalidate(14, element);
		});
	}

	const keydown_handler = event => instance && instance.handleKeydown(event, event.target.classList.contains("mdc-deprecated-list-item"), getListItemIndex(event.target));
	const focusin_handler = event => instance && instance.handleFocusIn(event, getListItemIndex(event.target));
	const focusout_handler = event => instance && instance.handleFocusOut(event, getListItemIndex(event.target));
	const click_handler = event => instance && instance.handleClick(getListItemIndex(event.target), !matches(event.target, "input[type=\"checkbox\"], input[type=\"radio\"]"));

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(23, $$restProps = compute_rest_props($$props, omit_props_names));
		if ("use" in $$new_props) $$invalidate(0, use = $$new_props.use);
		if ("class" in $$new_props) $$invalidate(1, className = $$new_props.class);
		if ("nonInteractive" in $$new_props) $$invalidate(2, nonInteractive = $$new_props.nonInteractive);
		if ("dense" in $$new_props) $$invalidate(3, dense = $$new_props.dense);
		if ("textualList" in $$new_props) $$invalidate(4, textualList = $$new_props.textualList);
		if ("avatarList" in $$new_props) $$invalidate(5, avatarList = $$new_props.avatarList);
		if ("iconList" in $$new_props) $$invalidate(6, iconList = $$new_props.iconList);
		if ("imageList" in $$new_props) $$invalidate(7, imageList = $$new_props.imageList);
		if ("thumbnailList" in $$new_props) $$invalidate(8, thumbnailList = $$new_props.thumbnailList);
		if ("videoList" in $$new_props) $$invalidate(9, videoList = $$new_props.videoList);
		if ("twoLine" in $$new_props) $$invalidate(10, twoLine = $$new_props.twoLine);
		if ("threeLine" in $$new_props) $$invalidate(11, threeLine = $$new_props.threeLine);
		if ("vertical" in $$new_props) $$invalidate(27, vertical = $$new_props.vertical);
		if ("wrapFocus" in $$new_props) $$invalidate(28, wrapFocus = $$new_props.wrapFocus);
		if ("singleSelection" in $$new_props) $$invalidate(29, singleSelection = $$new_props.singleSelection);
		if ("selectedIndex" in $$new_props) $$invalidate(24, selectedIndex = $$new_props.selectedIndex);
		if ("radioList" in $$new_props) $$invalidate(25, radioList = $$new_props.radioList);
		if ("checkList" in $$new_props) $$invalidate(26, checkList = $$new_props.checkList);
		if ("hasTypeahead" in $$new_props) $$invalidate(30, hasTypeahead = $$new_props.hasTypeahead);
		if ("radiolist" in $$new_props) $$invalidate(31, radiolist = $$new_props.radiolist);
		if ("checklist" in $$new_props) $$invalidate(32, checklist = $$new_props.checklist);
		if ("component" in $$new_props) $$invalidate(12, component = $$new_props.component);
		if ("$$scope" in $$new_props) $$invalidate(44, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({
		MDCListFoundation,
		ponyfill,
		onMount,
		onDestroy,
		getContext,
		setContext,
		get_current_component,
		forwardEventsBuilder,
		classMap,
		dispatch,
		Ul,
		Nav: Nav$1,
		closest,
		matches,
		forwardEvents,
		use,
		className,
		nonInteractive,
		dense,
		textualList,
		avatarList,
		iconList,
		imageList,
		thumbnailList,
		videoList,
		twoLine,
		threeLine,
		vertical,
		wrapFocus,
		singleSelection,
		selectedIndex,
		radioList,
		checkList,
		hasTypeahead,
		radiolist,
		checklist,
		element,
		instance,
		items,
		role,
		nav,
		itemAccessorMap,
		selectionDialog,
		addLayoutListener,
		removeLayoutListener,
		component,
		handleItemMount,
		handleItemUnmount,
		handleAction,
		getOrderedList,
		focusItemAtIndex,
		listItemAtIndexHasClass,
		addClassForElementIndex,
		removeClassForElementIndex,
		setAttributeForElementIndex,
		removeAttributeForElementIndex,
		getPrimaryTextAtIndex,
		getListItemIndex,
		layout,
		setEnabled,
		getTypeaheadInProgress,
		getSelectedIndex,
		getElement
	});

	$$self.$inject_state = $$new_props => {
		if ("use" in $$props) $$invalidate(0, use = $$new_props.use);
		if ("className" in $$props) $$invalidate(1, className = $$new_props.className);
		if ("nonInteractive" in $$props) $$invalidate(2, nonInteractive = $$new_props.nonInteractive);
		if ("dense" in $$props) $$invalidate(3, dense = $$new_props.dense);
		if ("textualList" in $$props) $$invalidate(4, textualList = $$new_props.textualList);
		if ("avatarList" in $$props) $$invalidate(5, avatarList = $$new_props.avatarList);
		if ("iconList" in $$props) $$invalidate(6, iconList = $$new_props.iconList);
		if ("imageList" in $$props) $$invalidate(7, imageList = $$new_props.imageList);
		if ("thumbnailList" in $$props) $$invalidate(8, thumbnailList = $$new_props.thumbnailList);
		if ("videoList" in $$props) $$invalidate(9, videoList = $$new_props.videoList);
		if ("twoLine" in $$props) $$invalidate(10, twoLine = $$new_props.twoLine);
		if ("threeLine" in $$props) $$invalidate(11, threeLine = $$new_props.threeLine);
		if ("vertical" in $$props) $$invalidate(27, vertical = $$new_props.vertical);
		if ("wrapFocus" in $$props) $$invalidate(28, wrapFocus = $$new_props.wrapFocus);
		if ("singleSelection" in $$props) $$invalidate(29, singleSelection = $$new_props.singleSelection);
		if ("selectedIndex" in $$props) $$invalidate(24, selectedIndex = $$new_props.selectedIndex);
		if ("radioList" in $$props) $$invalidate(25, radioList = $$new_props.radioList);
		if ("checkList" in $$props) $$invalidate(26, checkList = $$new_props.checkList);
		if ("hasTypeahead" in $$props) $$invalidate(30, hasTypeahead = $$new_props.hasTypeahead);
		if ("radiolist" in $$props) $$invalidate(31, radiolist = $$new_props.radiolist);
		if ("checklist" in $$props) $$invalidate(32, checklist = $$new_props.checklist);
		if ("element" in $$props) $$invalidate(14, element = $$new_props.element);
		if ("instance" in $$props) $$invalidate(13, instance = $$new_props.instance);
		if ("items" in $$props) items = $$new_props.items;
		if ("role" in $$props) $$invalidate(15, role = $$new_props.role);
		if ("nav" in $$props) nav = $$new_props.nav;
		if ("selectionDialog" in $$props) $$invalidate(18, selectionDialog = $$new_props.selectionDialog);
		if ("addLayoutListener" in $$props) addLayoutListener = $$new_props.addLayoutListener;
		if ("removeLayoutListener" in $$props) removeLayoutListener = $$new_props.removeLayoutListener;
		if ("component" in $$props) $$invalidate(12, component = $$new_props.component);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty[0] & /*instance, vertical*/ 134225920) {
			if (instance) {
				instance.setVerticalOrientation(vertical);
			}
		}

		if ($$self.$$.dirty[0] & /*instance, wrapFocus*/ 268443648) {
			if (instance) {
				instance.setWrapFocus(wrapFocus);
			}
		}

		if ($$self.$$.dirty[0] & /*instance, hasTypeahead*/ 1073750016) {
			if (instance) {
				instance.setHasTypeahead(hasTypeahead);
			}
		}

		if ($$self.$$.dirty[0] & /*instance, singleSelection*/ 536879104) {
			if (instance) {
				instance.setSingleSelection(singleSelection);
			}
		}

		if ($$self.$$.dirty[0] & /*instance, singleSelection, selectedIndex*/ 553656320) {
			if (instance && singleSelection && getSelectedIndex() !== selectedIndex) {
				instance.setSelectedIndex(selectedIndex);
			}
		}
	};

	return [
		use,
		className,
		nonInteractive,
		dense,
		textualList,
		avatarList,
		iconList,
		imageList,
		thumbnailList,
		videoList,
		twoLine,
		threeLine,
		component,
		instance,
		element,
		role,
		matches,
		forwardEvents,
		selectionDialog,
		handleItemMount,
		handleItemUnmount,
		handleAction,
		getListItemIndex,
		$$restProps,
		selectedIndex,
		radioList,
		checkList,
		vertical,
		wrapFocus,
		singleSelection,
		hasTypeahead,
		radiolist,
		checklist,
		layout,
		setEnabled,
		getTypeaheadInProgress,
		getSelectedIndex,
		getElement,
		slots,
		switch_instance_binding,
		keydown_handler,
		focusin_handler,
		focusout_handler,
		click_handler,
		$$scope
	];
}

class List extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init$1(
			this,
			options,
			instance_1$2,
			create_fragment$e,
			safe_not_equal,
			{
				use: 0,
				class: 1,
				nonInteractive: 2,
				dense: 3,
				textualList: 4,
				avatarList: 5,
				iconList: 6,
				imageList: 7,
				thumbnailList: 8,
				videoList: 9,
				twoLine: 10,
				threeLine: 11,
				vertical: 27,
				wrapFocus: 28,
				singleSelection: 29,
				selectedIndex: 24,
				radioList: 25,
				checkList: 26,
				hasTypeahead: 30,
				radiolist: 31,
				checklist: 32,
				component: 12,
				layout: 33,
				setEnabled: 34,
				getTypeaheadInProgress: 35,
				getSelectedIndex: 36,
				getElement: 37
			},
			[-1, -1]
		);

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "List",
			options,
			id: create_fragment$e.name
		});
	}

	get use() {
		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set use(value) {
		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get class() {
		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set class(value) {
		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get nonInteractive() {
		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set nonInteractive(value) {
		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get dense() {
		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set dense(value) {
		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get textualList() {
		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set textualList(value) {
		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get avatarList() {
		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set avatarList(value) {
		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get iconList() {
		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set iconList(value) {
		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get imageList() {
		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set imageList(value) {
		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get thumbnailList() {
		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set thumbnailList(value) {
		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get videoList() {
		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set videoList(value) {
		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get twoLine() {
		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set twoLine(value) {
		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get threeLine() {
		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set threeLine(value) {
		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get vertical() {
		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set vertical(value) {
		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get wrapFocus() {
		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set wrapFocus(value) {
		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get singleSelection() {
		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set singleSelection(value) {
		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get selectedIndex() {
		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set selectedIndex(value) {
		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get radioList() {
		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set radioList(value) {
		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get checkList() {
		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set checkList(value) {
		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get hasTypeahead() {
		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set hasTypeahead(value) {
		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get radiolist() {
		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set radiolist(value) {
		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get checklist() {
		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set checklist(value) {
		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get component() {
		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set component(value) {
		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get layout() {
		return this.$$.ctx[33];
	}

	set layout(value) {
		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get setEnabled() {
		return this.$$.ctx[34];
	}

	set setEnabled(value) {
		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get getTypeaheadInProgress() {
		return this.$$.ctx[35];
	}

	set getTypeaheadInProgress(value) {
		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get getSelectedIndex() {
		return this.$$.ctx[36];
	}

	set getSelectedIndex(value) {
		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get getElement() {
		return this.$$.ctx[37];
	}

	set getElement(value) {
		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/**
 * Stores result from supportsCssVariables to avoid redundant processing to
 * detect CSS custom variable support.
 */
var supportsCssVariables_;
function supportsCssVariables(windowObj, forceRefresh) {
    if (forceRefresh === void 0) { forceRefresh = false; }
    var CSS = windowObj.CSS;
    var supportsCssVars = supportsCssVariables_;
    if (typeof supportsCssVariables_ === 'boolean' && !forceRefresh) {
        return supportsCssVariables_;
    }
    var supportsFunctionPresent = CSS && typeof CSS.supports === 'function';
    if (!supportsFunctionPresent) {
        return false;
    }
    var explicitlySupportsCssVars = CSS.supports('--css-vars', 'yes');
    // See: https://bugs.webkit.org/show_bug.cgi?id=154669
    // See: README section on Safari
    var weAreFeatureDetectingSafari10plus = (CSS.supports('(--css-vars: yes)') &&
        CSS.supports('color', '#00000000'));
    supportsCssVars =
        explicitlySupportsCssVars || weAreFeatureDetectingSafari10plus;
    if (!forceRefresh) {
        supportsCssVariables_ = supportsCssVars;
    }
    return supportsCssVars;
}
function getNormalizedEventCoords(evt, pageOffset, clientRect) {
    if (!evt) {
        return { x: 0, y: 0 };
    }
    var x = pageOffset.x, y = pageOffset.y;
    var documentX = x + clientRect.left;
    var documentY = y + clientRect.top;
    var normalizedX;
    var normalizedY;
    // Determine touch point relative to the ripple container.
    if (evt.type === 'touchstart') {
        var touchEvent = evt;
        normalizedX = touchEvent.changedTouches[0].pageX - documentX;
        normalizedY = touchEvent.changedTouches[0].pageY - documentY;
    }
    else {
        var mouseEvent = evt;
        normalizedX = mouseEvent.pageX - documentX;
        normalizedY = mouseEvent.pageY - documentY;
    }
    return { x: normalizedX, y: normalizedY };
}

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses$2 = {
    // Ripple is a special case where the "root" component is really a "mixin" of sorts,
    // given that it's an 'upgrade' to an existing component. That being said it is the root
    // CSS class that all other CSS classes derive from.
    BG_FOCUSED: 'mdc-ripple-upgraded--background-focused',
    FG_ACTIVATION: 'mdc-ripple-upgraded--foreground-activation',
    FG_DEACTIVATION: 'mdc-ripple-upgraded--foreground-deactivation',
    ROOT: 'mdc-ripple-upgraded',
    UNBOUNDED: 'mdc-ripple-upgraded--unbounded',
};
var strings$2 = {
    VAR_FG_SCALE: '--mdc-ripple-fg-scale',
    VAR_FG_SIZE: '--mdc-ripple-fg-size',
    VAR_FG_TRANSLATE_END: '--mdc-ripple-fg-translate-end',
    VAR_FG_TRANSLATE_START: '--mdc-ripple-fg-translate-start',
    VAR_LEFT: '--mdc-ripple-left',
    VAR_TOP: '--mdc-ripple-top',
};
var numbers$1 = {
    DEACTIVATION_TIMEOUT_MS: 225,
    FG_DEACTIVATION_MS: 150,
    INITIAL_ORIGIN_SCALE: 0.6,
    PADDING: 10,
    TAP_DELAY_MS: 300, // Delay between touch and simulated mouse events on touch devices
};

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
// Activation events registered on the root element of each instance for activation
var ACTIVATION_EVENT_TYPES = [
    'touchstart', 'pointerdown', 'mousedown', 'keydown',
];
// Deactivation events registered on documentElement when a pointer-related down event occurs
var POINTER_DEACTIVATION_EVENT_TYPES = [
    'touchend', 'pointerup', 'mouseup', 'contextmenu',
];
// simultaneous nested activations
var activatedTargets = [];
var MDCRippleFoundation = /** @class */ (function (_super) {
    __extends(MDCRippleFoundation, _super);
    function MDCRippleFoundation(adapter) {
        var _this = _super.call(this, __assign(__assign({}, MDCRippleFoundation.defaultAdapter), adapter)) || this;
        _this.activationAnimationHasEnded_ = false;
        _this.activationTimer_ = 0;
        _this.fgDeactivationRemovalTimer_ = 0;
        _this.fgScale_ = '0';
        _this.frame_ = { width: 0, height: 0 };
        _this.initialSize_ = 0;
        _this.layoutFrame_ = 0;
        _this.maxRadius_ = 0;
        _this.unboundedCoords_ = { left: 0, top: 0 };
        _this.activationState_ = _this.defaultActivationState_();
        _this.activationTimerCallback_ = function () {
            _this.activationAnimationHasEnded_ = true;
            _this.runDeactivationUXLogicIfReady_();
        };
        _this.activateHandler_ = function (e) { return _this.activate_(e); };
        _this.deactivateHandler_ = function () { return _this.deactivate_(); };
        _this.focusHandler_ = function () { return _this.handleFocus(); };
        _this.blurHandler_ = function () { return _this.handleBlur(); };
        _this.resizeHandler_ = function () { return _this.layout(); };
        return _this;
    }
    Object.defineProperty(MDCRippleFoundation, "cssClasses", {
        get: function () {
            return cssClasses$2;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCRippleFoundation, "strings", {
        get: function () {
            return strings$2;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCRippleFoundation, "numbers", {
        get: function () {
            return numbers$1;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCRippleFoundation, "defaultAdapter", {
        get: function () {
            return {
                addClass: function () { return undefined; },
                browserSupportsCssVars: function () { return true; },
                computeBoundingRect: function () { return ({ top: 0, right: 0, bottom: 0, left: 0, width: 0, height: 0 }); },
                containsEventTarget: function () { return true; },
                deregisterDocumentInteractionHandler: function () { return undefined; },
                deregisterInteractionHandler: function () { return undefined; },
                deregisterResizeHandler: function () { return undefined; },
                getWindowPageOffset: function () { return ({ x: 0, y: 0 }); },
                isSurfaceActive: function () { return true; },
                isSurfaceDisabled: function () { return true; },
                isUnbounded: function () { return true; },
                registerDocumentInteractionHandler: function () { return undefined; },
                registerInteractionHandler: function () { return undefined; },
                registerResizeHandler: function () { return undefined; },
                removeClass: function () { return undefined; },
                updateCssVariable: function () { return undefined; },
            };
        },
        enumerable: false,
        configurable: true
    });
    MDCRippleFoundation.prototype.init = function () {
        var _this = this;
        var supportsPressRipple = this.supportsPressRipple_();
        this.registerRootHandlers_(supportsPressRipple);
        if (supportsPressRipple) {
            var _a = MDCRippleFoundation.cssClasses, ROOT_1 = _a.ROOT, UNBOUNDED_1 = _a.UNBOUNDED;
            requestAnimationFrame(function () {
                _this.adapter.addClass(ROOT_1);
                if (_this.adapter.isUnbounded()) {
                    _this.adapter.addClass(UNBOUNDED_1);
                    // Unbounded ripples need layout logic applied immediately to set coordinates for both shade and ripple
                    _this.layoutInternal_();
                }
            });
        }
    };
    MDCRippleFoundation.prototype.destroy = function () {
        var _this = this;
        if (this.supportsPressRipple_()) {
            if (this.activationTimer_) {
                clearTimeout(this.activationTimer_);
                this.activationTimer_ = 0;
                this.adapter.removeClass(MDCRippleFoundation.cssClasses.FG_ACTIVATION);
            }
            if (this.fgDeactivationRemovalTimer_) {
                clearTimeout(this.fgDeactivationRemovalTimer_);
                this.fgDeactivationRemovalTimer_ = 0;
                this.adapter.removeClass(MDCRippleFoundation.cssClasses.FG_DEACTIVATION);
            }
            var _a = MDCRippleFoundation.cssClasses, ROOT_2 = _a.ROOT, UNBOUNDED_2 = _a.UNBOUNDED;
            requestAnimationFrame(function () {
                _this.adapter.removeClass(ROOT_2);
                _this.adapter.removeClass(UNBOUNDED_2);
                _this.removeCssVars_();
            });
        }
        this.deregisterRootHandlers_();
        this.deregisterDeactivationHandlers_();
    };
    /**
     * @param evt Optional event containing position information.
     */
    MDCRippleFoundation.prototype.activate = function (evt) {
        this.activate_(evt);
    };
    MDCRippleFoundation.prototype.deactivate = function () {
        this.deactivate_();
    };
    MDCRippleFoundation.prototype.layout = function () {
        var _this = this;
        if (this.layoutFrame_) {
            cancelAnimationFrame(this.layoutFrame_);
        }
        this.layoutFrame_ = requestAnimationFrame(function () {
            _this.layoutInternal_();
            _this.layoutFrame_ = 0;
        });
    };
    MDCRippleFoundation.prototype.setUnbounded = function (unbounded) {
        var UNBOUNDED = MDCRippleFoundation.cssClasses.UNBOUNDED;
        if (unbounded) {
            this.adapter.addClass(UNBOUNDED);
        }
        else {
            this.adapter.removeClass(UNBOUNDED);
        }
    };
    MDCRippleFoundation.prototype.handleFocus = function () {
        var _this = this;
        requestAnimationFrame(function () { return _this.adapter.addClass(MDCRippleFoundation.cssClasses.BG_FOCUSED); });
    };
    MDCRippleFoundation.prototype.handleBlur = function () {
        var _this = this;
        requestAnimationFrame(function () { return _this.adapter.removeClass(MDCRippleFoundation.cssClasses.BG_FOCUSED); });
    };
    /**
     * We compute this property so that we are not querying information about the client
     * until the point in time where the foundation requests it. This prevents scenarios where
     * client-side feature-detection may happen too early, such as when components are rendered on the server
     * and then initialized at mount time on the client.
     */
    MDCRippleFoundation.prototype.supportsPressRipple_ = function () {
        return this.adapter.browserSupportsCssVars();
    };
    MDCRippleFoundation.prototype.defaultActivationState_ = function () {
        return {
            activationEvent: undefined,
            hasDeactivationUXRun: false,
            isActivated: false,
            isProgrammatic: false,
            wasActivatedByPointer: false,
            wasElementMadeActive: false,
        };
    };
    /**
     * supportsPressRipple Passed from init to save a redundant function call
     */
    MDCRippleFoundation.prototype.registerRootHandlers_ = function (supportsPressRipple) {
        var _this = this;
        if (supportsPressRipple) {
            ACTIVATION_EVENT_TYPES.forEach(function (evtType) {
                _this.adapter.registerInteractionHandler(evtType, _this.activateHandler_);
            });
            if (this.adapter.isUnbounded()) {
                this.adapter.registerResizeHandler(this.resizeHandler_);
            }
        }
        this.adapter.registerInteractionHandler('focus', this.focusHandler_);
        this.adapter.registerInteractionHandler('blur', this.blurHandler_);
    };
    MDCRippleFoundation.prototype.registerDeactivationHandlers_ = function (evt) {
        var _this = this;
        if (evt.type === 'keydown') {
            this.adapter.registerInteractionHandler('keyup', this.deactivateHandler_);
        }
        else {
            POINTER_DEACTIVATION_EVENT_TYPES.forEach(function (evtType) {
                _this.adapter.registerDocumentInteractionHandler(evtType, _this.deactivateHandler_);
            });
        }
    };
    MDCRippleFoundation.prototype.deregisterRootHandlers_ = function () {
        var _this = this;
        ACTIVATION_EVENT_TYPES.forEach(function (evtType) {
            _this.adapter.deregisterInteractionHandler(evtType, _this.activateHandler_);
        });
        this.adapter.deregisterInteractionHandler('focus', this.focusHandler_);
        this.adapter.deregisterInteractionHandler('blur', this.blurHandler_);
        if (this.adapter.isUnbounded()) {
            this.adapter.deregisterResizeHandler(this.resizeHandler_);
        }
    };
    MDCRippleFoundation.prototype.deregisterDeactivationHandlers_ = function () {
        var _this = this;
        this.adapter.deregisterInteractionHandler('keyup', this.deactivateHandler_);
        POINTER_DEACTIVATION_EVENT_TYPES.forEach(function (evtType) {
            _this.adapter.deregisterDocumentInteractionHandler(evtType, _this.deactivateHandler_);
        });
    };
    MDCRippleFoundation.prototype.removeCssVars_ = function () {
        var _this = this;
        var rippleStrings = MDCRippleFoundation.strings;
        var keys = Object.keys(rippleStrings);
        keys.forEach(function (key) {
            if (key.indexOf('VAR_') === 0) {
                _this.adapter.updateCssVariable(rippleStrings[key], null);
            }
        });
    };
    MDCRippleFoundation.prototype.activate_ = function (evt) {
        var _this = this;
        if (this.adapter.isSurfaceDisabled()) {
            return;
        }
        var activationState = this.activationState_;
        if (activationState.isActivated) {
            return;
        }
        // Avoid reacting to follow-on events fired by touch device after an already-processed user interaction
        var previousActivationEvent = this.previousActivationEvent_;
        var isSameInteraction = previousActivationEvent && evt !== undefined && previousActivationEvent.type !== evt.type;
        if (isSameInteraction) {
            return;
        }
        activationState.isActivated = true;
        activationState.isProgrammatic = evt === undefined;
        activationState.activationEvent = evt;
        activationState.wasActivatedByPointer = activationState.isProgrammatic ? false : evt !== undefined && (evt.type === 'mousedown' || evt.type === 'touchstart' || evt.type === 'pointerdown');
        var hasActivatedChild = evt !== undefined &&
            activatedTargets.length > 0 &&
            activatedTargets.some(function (target) { return _this.adapter.containsEventTarget(target); });
        if (hasActivatedChild) {
            // Immediately reset activation state, while preserving logic that prevents touch follow-on events
            this.resetActivationState_();
            return;
        }
        if (evt !== undefined) {
            activatedTargets.push(evt.target);
            this.registerDeactivationHandlers_(evt);
        }
        activationState.wasElementMadeActive = this.checkElementMadeActive_(evt);
        if (activationState.wasElementMadeActive) {
            this.animateActivation_();
        }
        requestAnimationFrame(function () {
            // Reset array on next frame after the current event has had a chance to bubble to prevent ancestor ripples
            activatedTargets = [];
            if (!activationState.wasElementMadeActive
                && evt !== undefined
                && (evt.key === ' ' || evt.keyCode === 32)) {
                // If space was pressed, try again within an rAF call to detect :active, because different UAs report
                // active states inconsistently when they're called within event handling code:
                // - https://bugs.chromium.org/p/chromium/issues/detail?id=635971
                // - https://bugzilla.mozilla.org/show_bug.cgi?id=1293741
                // We try first outside rAF to support Edge, which does not exhibit this problem, but will crash if a CSS
                // variable is set within a rAF callback for a submit button interaction (#2241).
                activationState.wasElementMadeActive = _this.checkElementMadeActive_(evt);
                if (activationState.wasElementMadeActive) {
                    _this.animateActivation_();
                }
            }
            if (!activationState.wasElementMadeActive) {
                // Reset activation state immediately if element was not made active.
                _this.activationState_ = _this.defaultActivationState_();
            }
        });
    };
    MDCRippleFoundation.prototype.checkElementMadeActive_ = function (evt) {
        return (evt !== undefined && evt.type === 'keydown') ?
            this.adapter.isSurfaceActive() :
            true;
    };
    MDCRippleFoundation.prototype.animateActivation_ = function () {
        var _this = this;
        var _a = MDCRippleFoundation.strings, VAR_FG_TRANSLATE_START = _a.VAR_FG_TRANSLATE_START, VAR_FG_TRANSLATE_END = _a.VAR_FG_TRANSLATE_END;
        var _b = MDCRippleFoundation.cssClasses, FG_DEACTIVATION = _b.FG_DEACTIVATION, FG_ACTIVATION = _b.FG_ACTIVATION;
        var DEACTIVATION_TIMEOUT_MS = MDCRippleFoundation.numbers.DEACTIVATION_TIMEOUT_MS;
        this.layoutInternal_();
        var translateStart = '';
        var translateEnd = '';
        if (!this.adapter.isUnbounded()) {
            var _c = this.getFgTranslationCoordinates_(), startPoint = _c.startPoint, endPoint = _c.endPoint;
            translateStart = startPoint.x + "px, " + startPoint.y + "px";
            translateEnd = endPoint.x + "px, " + endPoint.y + "px";
        }
        this.adapter.updateCssVariable(VAR_FG_TRANSLATE_START, translateStart);
        this.adapter.updateCssVariable(VAR_FG_TRANSLATE_END, translateEnd);
        // Cancel any ongoing activation/deactivation animations
        clearTimeout(this.activationTimer_);
        clearTimeout(this.fgDeactivationRemovalTimer_);
        this.rmBoundedActivationClasses_();
        this.adapter.removeClass(FG_DEACTIVATION);
        // Force layout in order to re-trigger the animation.
        this.adapter.computeBoundingRect();
        this.adapter.addClass(FG_ACTIVATION);
        this.activationTimer_ = setTimeout(function () { return _this.activationTimerCallback_(); }, DEACTIVATION_TIMEOUT_MS);
    };
    MDCRippleFoundation.prototype.getFgTranslationCoordinates_ = function () {
        var _a = this.activationState_, activationEvent = _a.activationEvent, wasActivatedByPointer = _a.wasActivatedByPointer;
        var startPoint;
        if (wasActivatedByPointer) {
            startPoint = getNormalizedEventCoords(activationEvent, this.adapter.getWindowPageOffset(), this.adapter.computeBoundingRect());
        }
        else {
            startPoint = {
                x: this.frame_.width / 2,
                y: this.frame_.height / 2,
            };
        }
        // Center the element around the start point.
        startPoint = {
            x: startPoint.x - (this.initialSize_ / 2),
            y: startPoint.y - (this.initialSize_ / 2),
        };
        var endPoint = {
            x: (this.frame_.width / 2) - (this.initialSize_ / 2),
            y: (this.frame_.height / 2) - (this.initialSize_ / 2),
        };
        return { startPoint: startPoint, endPoint: endPoint };
    };
    MDCRippleFoundation.prototype.runDeactivationUXLogicIfReady_ = function () {
        var _this = this;
        // This method is called both when a pointing device is released, and when the activation animation ends.
        // The deactivation animation should only run after both of those occur.
        var FG_DEACTIVATION = MDCRippleFoundation.cssClasses.FG_DEACTIVATION;
        var _a = this.activationState_, hasDeactivationUXRun = _a.hasDeactivationUXRun, isActivated = _a.isActivated;
        var activationHasEnded = hasDeactivationUXRun || !isActivated;
        if (activationHasEnded && this.activationAnimationHasEnded_) {
            this.rmBoundedActivationClasses_();
            this.adapter.addClass(FG_DEACTIVATION);
            this.fgDeactivationRemovalTimer_ = setTimeout(function () {
                _this.adapter.removeClass(FG_DEACTIVATION);
            }, numbers$1.FG_DEACTIVATION_MS);
        }
    };
    MDCRippleFoundation.prototype.rmBoundedActivationClasses_ = function () {
        var FG_ACTIVATION = MDCRippleFoundation.cssClasses.FG_ACTIVATION;
        this.adapter.removeClass(FG_ACTIVATION);
        this.activationAnimationHasEnded_ = false;
        this.adapter.computeBoundingRect();
    };
    MDCRippleFoundation.prototype.resetActivationState_ = function () {
        var _this = this;
        this.previousActivationEvent_ = this.activationState_.activationEvent;
        this.activationState_ = this.defaultActivationState_();
        // Touch devices may fire additional events for the same interaction within a short time.
        // Store the previous event until it's safe to assume that subsequent events are for new interactions.
        setTimeout(function () { return _this.previousActivationEvent_ = undefined; }, MDCRippleFoundation.numbers.TAP_DELAY_MS);
    };
    MDCRippleFoundation.prototype.deactivate_ = function () {
        var _this = this;
        var activationState = this.activationState_;
        // This can happen in scenarios such as when you have a keyup event that blurs the element.
        if (!activationState.isActivated) {
            return;
        }
        var state = __assign({}, activationState);
        if (activationState.isProgrammatic) {
            requestAnimationFrame(function () { return _this.animateDeactivation_(state); });
            this.resetActivationState_();
        }
        else {
            this.deregisterDeactivationHandlers_();
            requestAnimationFrame(function () {
                _this.activationState_.hasDeactivationUXRun = true;
                _this.animateDeactivation_(state);
                _this.resetActivationState_();
            });
        }
    };
    MDCRippleFoundation.prototype.animateDeactivation_ = function (_a) {
        var wasActivatedByPointer = _a.wasActivatedByPointer, wasElementMadeActive = _a.wasElementMadeActive;
        if (wasActivatedByPointer || wasElementMadeActive) {
            this.runDeactivationUXLogicIfReady_();
        }
    };
    MDCRippleFoundation.prototype.layoutInternal_ = function () {
        var _this = this;
        this.frame_ = this.adapter.computeBoundingRect();
        var maxDim = Math.max(this.frame_.height, this.frame_.width);
        // Surface diameter is treated differently for unbounded vs. bounded ripples.
        // Unbounded ripple diameter is calculated smaller since the surface is expected to already be padded appropriately
        // to extend the hitbox, and the ripple is expected to meet the edges of the padded hitbox (which is typically
        // square). Bounded ripples, on the other hand, are fully expected to expand beyond the surface's longest diameter
        // (calculated based on the diagonal plus a constant padding), and are clipped at the surface's border via
        // `overflow: hidden`.
        var getBoundedRadius = function () {
            var hypotenuse = Math.sqrt(Math.pow(_this.frame_.width, 2) + Math.pow(_this.frame_.height, 2));
            return hypotenuse + MDCRippleFoundation.numbers.PADDING;
        };
        this.maxRadius_ = this.adapter.isUnbounded() ? maxDim : getBoundedRadius();
        // Ripple is sized as a fraction of the largest dimension of the surface, then scales up using a CSS scale transform
        var initialSize = Math.floor(maxDim * MDCRippleFoundation.numbers.INITIAL_ORIGIN_SCALE);
        // Unbounded ripple size should always be even number to equally center align.
        if (this.adapter.isUnbounded() && initialSize % 2 !== 0) {
            this.initialSize_ = initialSize - 1;
        }
        else {
            this.initialSize_ = initialSize;
        }
        this.fgScale_ = "" + this.maxRadius_ / this.initialSize_;
        this.updateLayoutCssVars_();
    };
    MDCRippleFoundation.prototype.updateLayoutCssVars_ = function () {
        var _a = MDCRippleFoundation.strings, VAR_FG_SIZE = _a.VAR_FG_SIZE, VAR_LEFT = _a.VAR_LEFT, VAR_TOP = _a.VAR_TOP, VAR_FG_SCALE = _a.VAR_FG_SCALE;
        this.adapter.updateCssVariable(VAR_FG_SIZE, this.initialSize_ + "px");
        this.adapter.updateCssVariable(VAR_FG_SCALE, this.fgScale_);
        if (this.adapter.isUnbounded()) {
            this.unboundedCoords_ = {
                left: Math.round((this.frame_.width / 2) - (this.initialSize_ / 2)),
                top: Math.round((this.frame_.height / 2) - (this.initialSize_ / 2)),
            };
            this.adapter.updateCssVariable(VAR_LEFT, this.unboundedCoords_.left + "px");
            this.adapter.updateCssVariable(VAR_TOP, this.unboundedCoords_.top + "px");
        }
    };
    return MDCRippleFoundation;
}(MDCFoundation));

const { applyPassive } = events;
const { matches } = ponyfill;

function Ripple(
  node,
  {
    ripple = true,
    surface = false,
    unbounded = false,
    disabled = false,
    color = null,
    active = null,
    eventTarget = null,
    activeTarget = null,
    addClass = (className) => node.classList.add(className),
    removeClass = (className) => node.classList.remove(className),
    addStyle = (name, value) => node.style.setProperty(name, value),
    initPromise = Promise.resolve(),
  } = {}
) {
  let instance;
  let addLayoutListener = getContext('SMUI:addLayoutListener');
  let removeLayoutListener;
  let oldActive = active;
  let oldEventTarget = eventTarget;
  let oldActiveTarget = activeTarget;

  function handleProps() {
    if (surface) {
      addClass('mdc-ripple-surface');
      if (color === 'primary') {
        addClass('smui-ripple-surface--primary');
        removeClass('smui-ripple-surface--secondary');
      } else if (color === 'secondary') {
        removeClass('smui-ripple-surface--primary');
        addClass('smui-ripple-surface--secondary');
      } else {
        removeClass('smui-ripple-surface--primary');
        removeClass('smui-ripple-surface--secondary');
      }
    }

    // Handle activation first.
    if (instance && oldActive !== active) {
      oldActive = active;
      if (active) {
        instance.activate();
      } else if (active === false) {
        instance.deactivate();
      }
    }

    // Then create/destroy an instance.
    if (ripple && !instance) {
      instance = new MDCRippleFoundation({
        addClass,
        browserSupportsCssVars: () => supportsCssVariables(window),
        computeBoundingRect: () => node.getBoundingClientRect(),
        containsEventTarget: (target) => node.contains(target),
        deregisterDocumentInteractionHandler: (evtType, handler) =>
          document.documentElement.removeEventListener(
            evtType,
            handler,
            applyPassive()
          ),
        deregisterInteractionHandler: (evtType, handler) =>
          (eventTarget || node).removeEventListener(
            evtType,
            handler,
            applyPassive()
          ),
        deregisterResizeHandler: (handler) =>
          window.removeEventListener('resize', handler),
        getWindowPageOffset: () => ({
          x: window.pageXOffset,
          y: window.pageYOffset,
        }),
        isSurfaceActive: () =>
          active == null ? matches(activeTarget || node, ':active') : active,
        isSurfaceDisabled: () => !!disabled,
        isUnbounded: () => !!unbounded,
        registerDocumentInteractionHandler: (evtType, handler) =>
          document.documentElement.addEventListener(
            evtType,
            handler,
            applyPassive()
          ),
        registerInteractionHandler: (evtType, handler) =>
          (eventTarget || node).addEventListener(
            evtType,
            handler,
            applyPassive()
          ),
        registerResizeHandler: (handler) =>
          window.addEventListener('resize', handler),
        removeClass,
        updateCssVariable: addStyle,
      });

      initPromise.then(() => {
        instance.init();
        instance.setUnbounded(unbounded);
      });
    } else if (instance && !ripple) {
      initPromise.then(() => {
        instance.destroy();
        instance = null;
      });
    }

    // Now handle event/active targets
    if (
      instance &&
      (oldEventTarget !== eventTarget || oldActiveTarget !== activeTarget)
    ) {
      oldEventTarget = eventTarget;
      oldActiveTarget = activeTarget;

      instance.destroy();
      requestAnimationFrame(() => {
        if (instance) {
          instance.init();
          instance.setUnbounded(unbounded);
        }
      });
    }

    if (!ripple && unbounded) {
      addClass('mdc-ripple-upgraded--unbounded');
    }
  }

  handleProps();

  if (addLayoutListener) {
    removeLayoutListener = addLayoutListener(layout);
  }

  function layout() {
    if (instance) {
      instance.layout();
    }
  }

  return {
    update(props) {
      ({
        ripple,
        surface,
        unbounded,
        disabled,
        color,
        active,
        eventTarget,
        activeTarget,
        addClass,
        removeClass,
        addStyle,
        initPromise,
      } = {
        ripple: true,
        surface: false,
        unbounded: false,
        disabled: false,
        color: null,
        active: null,
        eventTarget: null,
        activeTarget: null,
        addClass: (className) => node.classList.add(className),
        removeClass: (className) => node.classList.remove(className),
        addStyle: (name, value) => node.style.setProperty(name, value),
        initPromise: Promise.resolve(),
        ...props,
      });
      handleProps();
    },

    destroy() {
      if (instance) {
        instance.destroy();
        instance = null;
        removeClass('mdc-ripple-surface');
        removeClass('smui-ripple-surface--primary');
        removeClass('smui-ripple-surface--secondary');
      }

      if (removeLayoutListener) {
        removeLayoutListener();
      }
    },
  };
}

/* node_modules\@smui\common\A.svelte generated by Svelte v3.38.3 */
const file$a = "node_modules\\@smui\\common\\A.svelte";

function create_fragment$d(ctx) {
	let a;
	let useActions_action;
	let current;
	let mounted;
	let dispose;
	const default_slot_template = /*#slots*/ ctx[7].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[6], null);
	let a_levels = [{ href: /*href*/ ctx[0] }, /*$$restProps*/ ctx[4]];
	let a_data = {};

	for (let i = 0; i < a_levels.length; i += 1) {
		a_data = assign(a_data, a_levels[i]);
	}

	const block = {
		c: function create() {
			a = element("a");
			if (default_slot) default_slot.c();
			this.h();
		},
		l: function claim(nodes) {
			a = claim_element(nodes, "A", { href: true });
			var a_nodes = children(a);
			if (default_slot) default_slot.l(a_nodes);
			a_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			set_attributes(a, a_data);
			add_location(a, file$a, 0, 0, 0);
		},
		m: function mount(target, anchor) {
			insert_dev(target, a, anchor);

			if (default_slot) {
				default_slot.m(a, null);
			}

			/*a_binding*/ ctx[8](a);
			current = true;

			if (!mounted) {
				dispose = [
					action_destroyer(useActions_action = useActions.call(null, a, /*use*/ ctx[1])),
					action_destroyer(/*forwardEvents*/ ctx[3].call(null, a))
				];

				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 64)) {
					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[6], !current ? -1 : dirty, null, null);
				}
			}

			set_attributes(a, a_data = get_spread_update(a_levels, [
				(!current || dirty & /*href*/ 1) && { href: /*href*/ ctx[0] },
				dirty & /*$$restProps*/ 16 && /*$$restProps*/ ctx[4]
			]));

			if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/ 2) useActions_action.update.call(null, /*use*/ ctx[1]);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(a);
			if (default_slot) default_slot.d(detaching);
			/*a_binding*/ ctx[8](null);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$d.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$b($$self, $$props, $$invalidate) {
	const omit_props_names = ["href","use","getElement"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("A", slots, ['default']);
	let { href = "javascript:void(0);" } = $$props;
	let { use = [] } = $$props;
	const forwardEvents = forwardEventsBuilder(get_current_component());
	let element = null;

	function getElement() {
		return element;
	}

	function a_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			element = $$value;
			$$invalidate(2, element);
		});
	}

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(4, $$restProps = compute_rest_props($$props, omit_props_names));
		if ("href" in $$new_props) $$invalidate(0, href = $$new_props.href);
		if ("use" in $$new_props) $$invalidate(1, use = $$new_props.use);
		if ("$$scope" in $$new_props) $$invalidate(6, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({
		get_current_component,
		forwardEventsBuilder,
		useActions,
		href,
		use,
		forwardEvents,
		element,
		getElement
	});

	$$self.$inject_state = $$new_props => {
		if ("href" in $$props) $$invalidate(0, href = $$new_props.href);
		if ("use" in $$props) $$invalidate(1, use = $$new_props.use);
		if ("element" in $$props) $$invalidate(2, element = $$new_props.element);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		href,
		use,
		element,
		forwardEvents,
		$$restProps,
		getElement,
		$$scope,
		slots,
		a_binding
	];
}

class A extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$b, create_fragment$d, safe_not_equal, { href: 0, use: 1, getElement: 5 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "A",
			options,
			id: create_fragment$d.name
		});
	}

	get href() {
		throw new Error("<A>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set href(value) {
		throw new Error("<A>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get use() {
		throw new Error("<A>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set use(value) {
		throw new Error("<A>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get getElement() {
		return this.$$.ctx[5];
	}

	set getElement(value) {
		throw new Error("<A>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* node_modules\@smui\common\Span.svelte generated by Svelte v3.38.3 */
const file$9 = "node_modules\\@smui\\common\\Span.svelte";

function create_fragment$c(ctx) {
	let span;
	let useActions_action;
	let current;
	let mounted;
	let dispose;
	const default_slot_template = /*#slots*/ ctx[6].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[5], null);
	let span_levels = [/*$$restProps*/ ctx[3]];
	let span_data = {};

	for (let i = 0; i < span_levels.length; i += 1) {
		span_data = assign(span_data, span_levels[i]);
	}

	const block = {
		c: function create() {
			span = element("span");
			if (default_slot) default_slot.c();
			this.h();
		},
		l: function claim(nodes) {
			span = claim_element(nodes, "SPAN", {});
			var span_nodes = children(span);
			if (default_slot) default_slot.l(span_nodes);
			span_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			set_attributes(span, span_data);
			add_location(span, file$9, 0, 0, 0);
		},
		m: function mount(target, anchor) {
			insert_dev(target, span, anchor);

			if (default_slot) {
				default_slot.m(span, null);
			}

			/*span_binding*/ ctx[7](span);
			current = true;

			if (!mounted) {
				dispose = [
					action_destroyer(useActions_action = useActions.call(null, span, /*use*/ ctx[0])),
					action_destroyer(/*forwardEvents*/ ctx[2].call(null, span))
				];

				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 32)) {
					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[5], !current ? -1 : dirty, null, null);
				}
			}

			set_attributes(span, span_data = get_spread_update(span_levels, [dirty & /*$$restProps*/ 8 && /*$$restProps*/ ctx[3]]));
			if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/ 1) useActions_action.update.call(null, /*use*/ ctx[0]);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(span);
			if (default_slot) default_slot.d(detaching);
			/*span_binding*/ ctx[7](null);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$c.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$a($$self, $$props, $$invalidate) {
	const omit_props_names = ["use","getElement"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("Span", slots, ['default']);
	let { use = [] } = $$props;
	const forwardEvents = forwardEventsBuilder(get_current_component());
	let element = null;

	function getElement() {
		return element;
	}

	function span_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			element = $$value;
			$$invalidate(1, element);
		});
	}

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(3, $$restProps = compute_rest_props($$props, omit_props_names));
		if ("use" in $$new_props) $$invalidate(0, use = $$new_props.use);
		if ("$$scope" in $$new_props) $$invalidate(5, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({
		get_current_component,
		forwardEventsBuilder,
		useActions,
		use,
		forwardEvents,
		element,
		getElement
	});

	$$self.$inject_state = $$new_props => {
		if ("use" in $$props) $$invalidate(0, use = $$new_props.use);
		if ("element" in $$props) $$invalidate(1, element = $$new_props.element);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		use,
		element,
		forwardEvents,
		$$restProps,
		getElement,
		$$scope,
		slots,
		span_binding
	];
}

class Span extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$a, create_fragment$c, safe_not_equal, { use: 0, getElement: 4 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Span",
			options,
			id: create_fragment$c.name
		});
	}

	get use() {
		throw new Error("<Span>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set use(value) {
		throw new Error("<Span>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get getElement() {
		return this.$$.ctx[4];
	}

	set getElement(value) {
		throw new Error("<Span>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* node_modules\@smui\common\Li.svelte generated by Svelte v3.38.3 */
const file$8 = "node_modules\\@smui\\common\\Li.svelte";

function create_fragment$b(ctx) {
	let li;
	let useActions_action;
	let current;
	let mounted;
	let dispose;
	const default_slot_template = /*#slots*/ ctx[6].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[5], null);
	let li_levels = [/*$$restProps*/ ctx[3]];
	let li_data = {};

	for (let i = 0; i < li_levels.length; i += 1) {
		li_data = assign(li_data, li_levels[i]);
	}

	const block = {
		c: function create() {
			li = element("li");
			if (default_slot) default_slot.c();
			this.h();
		},
		l: function claim(nodes) {
			li = claim_element(nodes, "LI", {});
			var li_nodes = children(li);
			if (default_slot) default_slot.l(li_nodes);
			li_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			set_attributes(li, li_data);
			add_location(li, file$8, 0, 0, 0);
		},
		m: function mount(target, anchor) {
			insert_dev(target, li, anchor);

			if (default_slot) {
				default_slot.m(li, null);
			}

			/*li_binding*/ ctx[7](li);
			current = true;

			if (!mounted) {
				dispose = [
					action_destroyer(useActions_action = useActions.call(null, li, /*use*/ ctx[0])),
					action_destroyer(/*forwardEvents*/ ctx[2].call(null, li))
				];

				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 32)) {
					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[5], !current ? -1 : dirty, null, null);
				}
			}

			set_attributes(li, li_data = get_spread_update(li_levels, [dirty & /*$$restProps*/ 8 && /*$$restProps*/ ctx[3]]));
			if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/ 1) useActions_action.update.call(null, /*use*/ ctx[0]);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(li);
			if (default_slot) default_slot.d(detaching);
			/*li_binding*/ ctx[7](null);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$b.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$9($$self, $$props, $$invalidate) {
	const omit_props_names = ["use","getElement"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("Li", slots, ['default']);
	let { use = [] } = $$props;
	const forwardEvents = forwardEventsBuilder(get_current_component());
	let element = null;

	function getElement() {
		return element;
	}

	function li_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			element = $$value;
			$$invalidate(1, element);
		});
	}

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(3, $$restProps = compute_rest_props($$props, omit_props_names));
		if ("use" in $$new_props) $$invalidate(0, use = $$new_props.use);
		if ("$$scope" in $$new_props) $$invalidate(5, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({
		get_current_component,
		forwardEventsBuilder,
		useActions,
		use,
		forwardEvents,
		element,
		getElement
	});

	$$self.$inject_state = $$new_props => {
		if ("use" in $$props) $$invalidate(0, use = $$new_props.use);
		if ("element" in $$props) $$invalidate(1, element = $$new_props.element);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		use,
		element,
		forwardEvents,
		$$restProps,
		getElement,
		$$scope,
		slots,
		li_binding
	];
}

class Li extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$9, create_fragment$b, safe_not_equal, { use: 0, getElement: 4 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Li",
			options,
			id: create_fragment$b.name
		});
	}

	get use() {
		throw new Error("<Li>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set use(value) {
		throw new Error("<Li>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get getElement() {
		return this.$$.ctx[4];
	}

	set getElement(value) {
		throw new Error("<Li>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* node_modules\@smui\list\Item.svelte generated by Svelte v3.38.3 */
const file$7 = "node_modules\\@smui\\list\\Item.svelte";

// (56:3) {#if ripple}
function create_if_block$2(ctx) {
	let span;

	const block = {
		c: function create() {
			span = element("span");
			this.h();
		},
		l: function claim(nodes) {
			span = claim_element(nodes, "SPAN", { class: true });
			children(span).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(span, "class", "mdc-deprecated-list-item__ripple");
			add_location(span, file$7, 55, 15, 1654);
		},
		m: function mount(target, anchor) {
			insert_dev(target, span, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(span);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$2.name,
		type: "if",
		source: "(56:3) {#if ripple}",
		ctx
	});

	return block;
}

// (1:0) <svelte:component   this={component}   bind:this={element}   use={[     ...(nonInteractive       ? []       : [           [             Ripple,             {               ripple: !input,               unbounded: false,               color:                 (activated || selected) && color == null ? 'primary' : color,               disabled,               addClass,               removeClass,               addStyle,             },           ],         ]),     forwardEvents,     ...use,   ]}   class={classMap({     [className]: true,     'mdc-deprecated-list-item': true,     'mdc-deprecated-list-item--activated': activated,     'mdc-deprecated-list-item--selected': selected,     'mdc-deprecated-list-item--disabled': disabled,     'mdc-menu-item--selected': !nav && role === 'menuitem' && selected,     'smui-menu-item--non-interactive': nonInteractive,     ...internalClasses,   })}   style={Object.entries(internalStyles)     .map(([name, value]) => `${name}: ${value};`)     .concat([style])     .join(' ')}   {...nav && activated ? { 'aria-current': 'page' } : {}}   {...!nav ? { role } : {}}   {...!nav && role === 'option'     ? { 'aria-selected': selected ? 'true' : 'false' }     : {}}   {...!nav && (role === 'radio' || role === 'checkbox')     ? { 'aria-checked': input && input.checked ? 'true' : 'false' }     : {}}   {...!nav ? { 'aria-disabled': disabled ? 'true' : 'false' } : {}}   {tabindex}   on:click={action}   on:keydown={handleKeydown}   on:SMUI:generic:input:mount={(event) => (input = event.detail)}   on:SMUI:generic:input:unmount={() => (input = undefined)}   {href}   {...internalAttrs}   {...$$restProps}   >
function create_default_slot$4(ctx) {
	let if_block_anchor;
	let current;
	let if_block = /*ripple*/ ctx[6] && create_if_block$2(ctx);
	const default_slot_template = /*#slots*/ ctx[30].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[34], null);

	const block = {
		c: function create() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
			if (default_slot) default_slot.c();
		},
		l: function claim(nodes) {
			if (if_block) if_block.l(nodes);
			if_block_anchor = empty();
			if (default_slot) default_slot.l(nodes);
		},
		m: function mount(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);

			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (/*ripple*/ ctx[6]) {
				if (if_block) ; else {
					if_block = create_if_block$2(ctx);
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}

			if (default_slot) {
				if (default_slot.p && (!current || dirty[1] & /*$$scope*/ 8)) {
					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[34], !current ? [-1, -1] : dirty, null, null);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) detach_dev(if_block_anchor);
			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot$4.name,
		type: "slot",
		source: "(1:0) <svelte:component   this={component}   bind:this={element}   use={[     ...(nonInteractive       ? []       : [           [             Ripple,             {               ripple: !input,               unbounded: false,               color:                 (activated || selected) && color == null ? 'primary' : color,               disabled,               addClass,               removeClass,               addStyle,             },           ],         ]),     forwardEvents,     ...use,   ]}   class={classMap({     [className]: true,     'mdc-deprecated-list-item': true,     'mdc-deprecated-list-item--activated': activated,     'mdc-deprecated-list-item--selected': selected,     'mdc-deprecated-list-item--disabled': disabled,     'mdc-menu-item--selected': !nav && role === 'menuitem' && selected,     'smui-menu-item--non-interactive': nonInteractive,     ...internalClasses,   })}   style={Object.entries(internalStyles)     .map(([name, value]) => `${name}: ${value};`)     .concat([style])     .join(' ')}   {...nav && activated ? { 'aria-current': 'page' } : {}}   {...!nav ? { role } : {}}   {...!nav && role === 'option'     ? { 'aria-selected': selected ? 'true' : 'false' }     : {}}   {...!nav && (role === 'radio' || role === 'checkbox')     ? { 'aria-checked': input && input.checked ? 'true' : 'false' }     : {}}   {...!nav ? { 'aria-disabled': disabled ? 'true' : 'false' } : {}}   {tabindex}   on:click={action}   on:keydown={handleKeydown}   on:SMUI:generic:input:mount={(event) => (input = event.detail)}   on:SMUI:generic:input:unmount={() => (input = undefined)}   {href}   {...internalAttrs}   {...$$restProps}   >",
		ctx
	});

	return block;
}

function create_fragment$a(ctx) {
	let switch_instance;
	let switch_instance_anchor;
	let current;

	const switch_instance_spread_levels = [
		{
			use: [
				.../*nonInteractive*/ ctx[5]
				? []
				: [
						[
							Ripple,
							{
								ripple: !/*input*/ ctx[12],
								unbounded: false,
								color: (/*activated*/ ctx[7] || /*selected*/ ctx[0]) && /*color*/ ctx[4] == null
								? "primary"
								: /*color*/ ctx[4],
								disabled: /*disabled*/ ctx[9],
								addClass: /*addClass*/ ctx[20],
								removeClass: /*removeClass*/ ctx[21],
								addStyle: /*addStyle*/ ctx[22]
							}
						]
					],
				/*forwardEvents*/ ctx[18],
				.../*use*/ ctx[1]
			]
		},
		{
			class: classMap({
				[/*className*/ ctx[2]]: true,
				"mdc-deprecated-list-item": true,
				"mdc-deprecated-list-item--activated": /*activated*/ ctx[7],
				"mdc-deprecated-list-item--selected": /*selected*/ ctx[0],
				"mdc-deprecated-list-item--disabled": /*disabled*/ ctx[9],
				"mdc-menu-item--selected": !/*nav*/ ctx[19] && /*role*/ ctx[8] === "menuitem" && /*selected*/ ctx[0],
				"smui-menu-item--non-interactive": /*nonInteractive*/ ctx[5],
				.../*internalClasses*/ ctx[14]
			})
		},
		{
			style: Object.entries(/*internalStyles*/ ctx[15]).map(func$2).concat([/*style*/ ctx[3]]).join(" ")
		},
		/*nav*/ ctx[19] && /*activated*/ ctx[7]
		? { "aria-current": "page" }
		: {},
		!/*nav*/ ctx[19] ? { role: /*role*/ ctx[8] } : {},
		!/*nav*/ ctx[19] && /*role*/ ctx[8] === "option"
		? {
				"aria-selected": /*selected*/ ctx[0] ? "true" : "false"
			}
		: {},
		!/*nav*/ ctx[19] && (/*role*/ ctx[8] === "radio" || /*role*/ ctx[8] === "checkbox")
		? {
				"aria-checked": /*input*/ ctx[12] && /*input*/ ctx[12].checked
				? "true"
				: "false"
			}
		: {},
		!/*nav*/ ctx[19]
		? {
				"aria-disabled": /*disabled*/ ctx[9] ? "true" : "false"
			}
		: {},
		{ tabindex: /*tabindex*/ ctx[17] },
		{ href: /*href*/ ctx[10] },
		/*internalAttrs*/ ctx[16],
		/*$$restProps*/ ctx[25]
	];

	var switch_value = /*component*/ ctx[11];

	function switch_props(ctx) {
		let switch_instance_props = {
			$$slots: { default: [create_default_slot$4] },
			$$scope: { ctx }
		};

		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
		}

		return {
			props: switch_instance_props,
			$$inline: true
		};
	}

	if (switch_value) {
		switch_instance = new switch_value(switch_props(ctx));
		/*switch_instance_binding*/ ctx[31](switch_instance);
		switch_instance.$on("click", /*action*/ ctx[23]);
		switch_instance.$on("keydown", /*handleKeydown*/ ctx[24]);
		switch_instance.$on("SMUI:generic:input:mount", /*SMUI_generic_input_mount_handler*/ ctx[32]);
		switch_instance.$on("SMUI:generic:input:unmount", /*SMUI_generic_input_unmount_handler*/ ctx[33]);
	}

	const block = {
		c: function create() {
			if (switch_instance) create_component(switch_instance.$$.fragment);
			switch_instance_anchor = empty();
		},
		l: function claim(nodes) {
			if (switch_instance) claim_component(switch_instance.$$.fragment, nodes);
			switch_instance_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (switch_instance) {
				mount_component(switch_instance, target, anchor);
			}

			insert_dev(target, switch_instance_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const switch_instance_changes = (dirty[0] & /*nonInteractive, input, activated, selected, color, disabled, addClass, removeClass, addStyle, forwardEvents, use, className, nav, role, internalClasses, internalStyles, style, tabindex, href, internalAttrs, $$restProps*/ 41932735)
			? get_spread_update(switch_instance_spread_levels, [
					dirty[0] & /*nonInteractive, input, activated, selected, color, disabled, addClass, removeClass, addStyle, forwardEvents, use*/ 7606963 && {
						use: [
							.../*nonInteractive*/ ctx[5]
							? []
							: [
									[
										Ripple,
										{
											ripple: !/*input*/ ctx[12],
											unbounded: false,
											color: (/*activated*/ ctx[7] || /*selected*/ ctx[0]) && /*color*/ ctx[4] == null
											? "primary"
											: /*color*/ ctx[4],
											disabled: /*disabled*/ ctx[9],
											addClass: /*addClass*/ ctx[20],
											removeClass: /*removeClass*/ ctx[21],
											addStyle: /*addStyle*/ ctx[22]
										}
									]
								],
							/*forwardEvents*/ ctx[18],
							.../*use*/ ctx[1]
						]
					},
					dirty[0] & /*className, activated, selected, disabled, nav, role, nonInteractive, internalClasses*/ 541605 && {
						class: classMap({
							[/*className*/ ctx[2]]: true,
							"mdc-deprecated-list-item": true,
							"mdc-deprecated-list-item--activated": /*activated*/ ctx[7],
							"mdc-deprecated-list-item--selected": /*selected*/ ctx[0],
							"mdc-deprecated-list-item--disabled": /*disabled*/ ctx[9],
							"mdc-menu-item--selected": !/*nav*/ ctx[19] && /*role*/ ctx[8] === "menuitem" && /*selected*/ ctx[0],
							"smui-menu-item--non-interactive": /*nonInteractive*/ ctx[5],
							.../*internalClasses*/ ctx[14]
						})
					},
					dirty[0] & /*internalStyles, style*/ 32776 && {
						style: Object.entries(/*internalStyles*/ ctx[15]).map(func$2).concat([/*style*/ ctx[3]]).join(" ")
					},
					dirty[0] & /*nav, activated*/ 524416 && get_spread_object(/*nav*/ ctx[19] && /*activated*/ ctx[7]
					? { "aria-current": "page" }
					: {}),
					dirty[0] & /*nav, role*/ 524544 && get_spread_object(!/*nav*/ ctx[19] ? { role: /*role*/ ctx[8] } : {}),
					dirty[0] & /*nav, role, selected*/ 524545 && get_spread_object(!/*nav*/ ctx[19] && /*role*/ ctx[8] === "option"
					? {
							"aria-selected": /*selected*/ ctx[0] ? "true" : "false"
						}
					: {}),
					dirty[0] & /*nav, role, input*/ 528640 && get_spread_object(!/*nav*/ ctx[19] && (/*role*/ ctx[8] === "radio" || /*role*/ ctx[8] === "checkbox")
					? {
							"aria-checked": /*input*/ ctx[12] && /*input*/ ctx[12].checked
							? "true"
							: "false"
						}
					: {}),
					dirty[0] & /*nav, disabled*/ 524800 && get_spread_object(!/*nav*/ ctx[19]
					? {
							"aria-disabled": /*disabled*/ ctx[9] ? "true" : "false"
						}
					: {}),
					dirty[0] & /*tabindex*/ 131072 && { tabindex: /*tabindex*/ ctx[17] },
					dirty[0] & /*href*/ 1024 && { href: /*href*/ ctx[10] },
					dirty[0] & /*internalAttrs*/ 65536 && get_spread_object(/*internalAttrs*/ ctx[16]),
					dirty[0] & /*$$restProps*/ 33554432 && get_spread_object(/*$$restProps*/ ctx[25])
				])
			: {};

			if (dirty[0] & /*ripple*/ 64 | dirty[1] & /*$$scope*/ 8) {
				switch_instance_changes.$$scope = { dirty, ctx };
			}

			if (switch_value !== (switch_value = /*component*/ ctx[11])) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props(ctx));
					/*switch_instance_binding*/ ctx[31](switch_instance);
					switch_instance.$on("click", /*action*/ ctx[23]);
					switch_instance.$on("keydown", /*handleKeydown*/ ctx[24]);
					switch_instance.$on("SMUI:generic:input:mount", /*SMUI_generic_input_mount_handler*/ ctx[32]);
					switch_instance.$on("SMUI:generic:input:unmount", /*SMUI_generic_input_unmount_handler*/ ctx[33]);
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}
		},
		i: function intro(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			/*switch_instance_binding*/ ctx[31](null);
			if (detaching) detach_dev(switch_instance_anchor);
			if (switch_instance) destroy_component(switch_instance, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$a.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

let counter = 0;
const func$2 = ([name, value]) => `${name}: ${value};`;

function instance$8($$self, $$props, $$invalidate) {
	let tabindex;

	const omit_props_names = [
		"use","class","style","color","nonInteractive","ripple","activated","role","selected","disabled","tabindex","inputId","href","component","getPrimaryText","getElement"
	];

	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("Item", slots, ['default']);
	const forwardEvents = forwardEventsBuilder(get_current_component());

	let uninitializedValue = () => {
		
	};

	let { use = [] } = $$props;
	let { class: className = "" } = $$props;
	let { style = "" } = $$props;
	let { color = null } = $$props;
	let { nonInteractive = getContext("SMUI:list:nonInteractive") } = $$props;
	setContext("SMUI:list:nonInteractive", undefined);
	let { ripple = !nonInteractive } = $$props;
	let { activated = false } = $$props;
	let { role = getContext("SMUI:list:item:role") } = $$props;
	setContext("SMUI:list:item:role", undefined);
	let { selected = false } = $$props;
	let { disabled = false } = $$props;
	let { tabindex: tabindexProp = uninitializedValue } = $$props;
	let { inputId = "SMUI-form-field-list-" + counter++ } = $$props;
	let { href = null } = $$props;
	let element;
	let internalClasses = {};
	let internalStyles = {};
	let internalAttrs = {};
	let input;
	let addTabindexIfNoItemsSelectedRaf;
	let nav = getContext("SMUI:list:item:nav");
	let { component = nav ? href ? A : Span : Li } = $$props;
	setContext("SMUI:generic:input:props", { id: inputId });

	// Reset separator context, because we aren't directly under a list anymore.
	setContext("SMUI:separator:context", undefined);

	onMount(() => {
		// Tabindex needs to be '0' if this is the first non-disabled list item, and
		// no other item is selected.
		if (!selected && !nonInteractive) {
			let first = true;
			let el = element;

			while (el.previousSibling) {
				el = el.previousSibling;

				if (el.nodeType === 1 && el.classList.contains("mdc-deprecated-list-item") && !el.classList.contains("mdc-deprecated-list-item--disabled")) {
					first = false;
					break;
				}
			}

			if (first) {
				// This is first, so now set up a check that no other items are
				// selected.
				addTabindexIfNoItemsSelectedRaf = window.requestAnimationFrame(addTabindexIfNoItemsSelected);
			}
		}

		const accessor = {
			_smui_list_item_accessor: true,
			get element() {
				return getElement();
			},
			get selected() {
				return selected;
			},
			set selected(value) {
				$$invalidate(0, selected = value);
			},
			hasClass,
			addClass,
			removeClass,
			getAttr,
			addAttr,
			removeAttr,
			getPrimaryText,
			// For inputs within item.
			get checked() {
				return input && input.checked;
			},
			set checked(value) {
				if (input) {
					$$invalidate(12, input.checked = value, input);
				}
			},
			get hasCheckbox() {
				return !!(input && input._smui_checkbox_accessor);
			},
			get hasRadio() {
				return !!(input && input._smui_radio_accessor);
			},
			activateRipple() {
				if (input) {
					input.activateRipple();
				}
			},
			deactivateRipple() {
				if (input) {
					input.deactivateRipple();
				}
			},
			// For select options.
			getValue() {
				return $$restProps.value;
			}
		};

		dispatch(element, "SMUI:list:item:mount", accessor);

		return () => {
			dispatch(element, "SMUI:list:item:unmount", accessor);
		};
	});

	onDestroy(() => {
		if (addTabindexIfNoItemsSelectedRaf) {
			window.cancelAnimationFrame(addTabindexIfNoItemsSelectedRaf);
		}
	});

	function hasClass(className) {
		return className in internalClasses
		? internalClasses[className]
		: getElement().classList.contains(className);
	}

	function addClass(className) {
		if (!internalClasses[className]) {
			$$invalidate(14, internalClasses[className] = true, internalClasses);
		}
	}

	function removeClass(className) {
		if (!(className in internalClasses) || internalClasses[className]) {
			$$invalidate(14, internalClasses[className] = false, internalClasses);
		}
	}

	function addStyle(name, value) {
		if (internalStyles[name] != value) {
			if (value === "" || value == null) {
				delete internalStyles[name];
				$$invalidate(15, internalStyles);
			} else {
				$$invalidate(15, internalStyles[name] = value, internalStyles);
			}
		}
	}

	function getAttr(name) {
		return name in internalAttrs
		? internalAttrs[name]
		: getElement().getAttribute(name);
	}

	function addAttr(name, value) {
		if (internalAttrs[name] !== value) {
			$$invalidate(16, internalAttrs[name] = value, internalAttrs);
		}
	}

	function removeAttr(name) {
		if (!(name in internalAttrs) || internalAttrs[name] != null) {
			$$invalidate(16, internalAttrs[name] = undefined, internalAttrs);
		}
	}

	function addTabindexIfNoItemsSelected() {
		// Look through next siblings to see if none of them are selected.
		let noneSelected = true;

		let el = element;

		while (el.nextSibling) {
			el = el.nextSibling;

			if (el.nodeType === 1 && el.classList.contains("mdc-deprecated-list-item") && el.attributes["tabindex"] && el.attributes["tabindex"].value === "0") {
				noneSelected = false;
				break;
			}
		}

		if (noneSelected) {
			// This is the first element, and no other element is selected, so the
			// tabindex should be '0'.
			$$invalidate(17, tabindex = "0");
		}
	}

	function action(e) {
		if (!disabled) {
			dispatch(element, "SMUI:action", e);
		}
	}

	function handleKeydown(e) {
		const isEnter = e.key === "Enter" || e.keyCode === 13;
		const isSpace = e.key === "Space" || e.keyCode === 32;

		if (isEnter || isSpace) {
			action(e);
		}
	}

	function getPrimaryText() {
		const element = getElement();
		const primaryText = element.querySelector(".mdc-deprecated-list-item__primary-text");

		if (primaryText) {
			return primaryText.textContent;
		}

		const text = element.querySelector(".mdc-deprecated-list-item__text");

		if (text) {
			return text.textContent;
		}

		return element.textContent;
	}

	function getElement() {
		return element.getElement();
	}

	function switch_instance_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			element = $$value;
			$$invalidate(13, element);
		});
	}

	const SMUI_generic_input_mount_handler = event => $$invalidate(12, input = event.detail);
	const SMUI_generic_input_unmount_handler = () => $$invalidate(12, input = undefined);

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(25, $$restProps = compute_rest_props($$props, omit_props_names));
		if ("use" in $$new_props) $$invalidate(1, use = $$new_props.use);
		if ("class" in $$new_props) $$invalidate(2, className = $$new_props.class);
		if ("style" in $$new_props) $$invalidate(3, style = $$new_props.style);
		if ("color" in $$new_props) $$invalidate(4, color = $$new_props.color);
		if ("nonInteractive" in $$new_props) $$invalidate(5, nonInteractive = $$new_props.nonInteractive);
		if ("ripple" in $$new_props) $$invalidate(6, ripple = $$new_props.ripple);
		if ("activated" in $$new_props) $$invalidate(7, activated = $$new_props.activated);
		if ("role" in $$new_props) $$invalidate(8, role = $$new_props.role);
		if ("selected" in $$new_props) $$invalidate(0, selected = $$new_props.selected);
		if ("disabled" in $$new_props) $$invalidate(9, disabled = $$new_props.disabled);
		if ("tabindex" in $$new_props) $$invalidate(26, tabindexProp = $$new_props.tabindex);
		if ("inputId" in $$new_props) $$invalidate(27, inputId = $$new_props.inputId);
		if ("href" in $$new_props) $$invalidate(10, href = $$new_props.href);
		if ("component" in $$new_props) $$invalidate(11, component = $$new_props.component);
		if ("$$scope" in $$new_props) $$invalidate(34, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({
		counter,
		onMount,
		onDestroy,
		getContext,
		setContext,
		get_current_component,
		forwardEventsBuilder,
		classMap,
		dispatch,
		Ripple,
		A,
		Span,
		Li,
		forwardEvents,
		uninitializedValue,
		use,
		className,
		style,
		color,
		nonInteractive,
		ripple,
		activated,
		role,
		selected,
		disabled,
		tabindexProp,
		inputId,
		href,
		element,
		internalClasses,
		internalStyles,
		internalAttrs,
		input,
		addTabindexIfNoItemsSelectedRaf,
		nav,
		component,
		hasClass,
		addClass,
		removeClass,
		addStyle,
		getAttr,
		addAttr,
		removeAttr,
		addTabindexIfNoItemsSelected,
		action,
		handleKeydown,
		getPrimaryText,
		getElement,
		tabindex
	});

	$$self.$inject_state = $$new_props => {
		if ("uninitializedValue" in $$props) $$invalidate(36, uninitializedValue = $$new_props.uninitializedValue);
		if ("use" in $$props) $$invalidate(1, use = $$new_props.use);
		if ("className" in $$props) $$invalidate(2, className = $$new_props.className);
		if ("style" in $$props) $$invalidate(3, style = $$new_props.style);
		if ("color" in $$props) $$invalidate(4, color = $$new_props.color);
		if ("nonInteractive" in $$props) $$invalidate(5, nonInteractive = $$new_props.nonInteractive);
		if ("ripple" in $$props) $$invalidate(6, ripple = $$new_props.ripple);
		if ("activated" in $$props) $$invalidate(7, activated = $$new_props.activated);
		if ("role" in $$props) $$invalidate(8, role = $$new_props.role);
		if ("selected" in $$props) $$invalidate(0, selected = $$new_props.selected);
		if ("disabled" in $$props) $$invalidate(9, disabled = $$new_props.disabled);
		if ("tabindexProp" in $$props) $$invalidate(26, tabindexProp = $$new_props.tabindexProp);
		if ("inputId" in $$props) $$invalidate(27, inputId = $$new_props.inputId);
		if ("href" in $$props) $$invalidate(10, href = $$new_props.href);
		if ("element" in $$props) $$invalidate(13, element = $$new_props.element);
		if ("internalClasses" in $$props) $$invalidate(14, internalClasses = $$new_props.internalClasses);
		if ("internalStyles" in $$props) $$invalidate(15, internalStyles = $$new_props.internalStyles);
		if ("internalAttrs" in $$props) $$invalidate(16, internalAttrs = $$new_props.internalAttrs);
		if ("input" in $$props) $$invalidate(12, input = $$new_props.input);
		if ("addTabindexIfNoItemsSelectedRaf" in $$props) addTabindexIfNoItemsSelectedRaf = $$new_props.addTabindexIfNoItemsSelectedRaf;
		if ("nav" in $$props) $$invalidate(19, nav = $$new_props.nav);
		if ("component" in $$props) $$invalidate(11, component = $$new_props.component);
		if ("tabindex" in $$props) $$invalidate(17, tabindex = $$new_props.tabindex);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty[0] & /*tabindexProp, nonInteractive, disabled, selected, input*/ 67113505) {
			$$invalidate(17, tabindex = tabindexProp == uninitializedValue
			? !nonInteractive && !disabled && (selected || input && input.checked) && "0" || "-1"
			: tabindexProp);
		}
	};

	return [
		selected,
		use,
		className,
		style,
		color,
		nonInteractive,
		ripple,
		activated,
		role,
		disabled,
		href,
		component,
		input,
		element,
		internalClasses,
		internalStyles,
		internalAttrs,
		tabindex,
		forwardEvents,
		nav,
		addClass,
		removeClass,
		addStyle,
		action,
		handleKeydown,
		$$restProps,
		tabindexProp,
		inputId,
		getPrimaryText,
		getElement,
		slots,
		switch_instance_binding,
		SMUI_generic_input_mount_handler,
		SMUI_generic_input_unmount_handler,
		$$scope
	];
}

class Item extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init$1(
			this,
			options,
			instance$8,
			create_fragment$a,
			safe_not_equal,
			{
				use: 1,
				class: 2,
				style: 3,
				color: 4,
				nonInteractive: 5,
				ripple: 6,
				activated: 7,
				role: 8,
				selected: 0,
				disabled: 9,
				tabindex: 26,
				inputId: 27,
				href: 10,
				component: 11,
				getPrimaryText: 28,
				getElement: 29
			},
			[-1, -1]
		);

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Item",
			options,
			id: create_fragment$a.name
		});
	}

	get use() {
		throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set use(value) {
		throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get class() {
		throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set class(value) {
		throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get style() {
		throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set style(value) {
		throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get color() {
		throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set color(value) {
		throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get nonInteractive() {
		throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set nonInteractive(value) {
		throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get ripple() {
		throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set ripple(value) {
		throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get activated() {
		throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set activated(value) {
		throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get role() {
		throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set role(value) {
		throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get selected() {
		throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set selected(value) {
		throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get disabled() {
		throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set disabled(value) {
		throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get tabindex() {
		throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set tabindex(value) {
		throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get inputId() {
		throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set inputId(value) {
		throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get href() {
		throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set href(value) {
		throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get component() {
		throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set component(value) {
		throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get getPrimaryText() {
		return this.$$.ctx[28];
	}

	set getPrimaryText(value) {
		throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get getElement() {
		return this.$$.ctx[29];
	}

	set getElement(value) {
		throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

var Text = classAdderBuilder({
  class: 'mdc-deprecated-list-item__text',
  component: Span,
});

classAdderBuilder({
  class: 'mdc-deprecated-list-item__primary-text',
  component: Span,
});

classAdderBuilder({
  class: 'mdc-deprecated-list-item__secondary-text',
  component: Span,
});

/* node_modules\@smui\list\Graphic.svelte generated by Svelte v3.38.3 */

const file$6 = "node_modules\\@smui\\list\\Graphic.svelte";

function create_fragment$9(ctx) {
	let span;
	let span_class_value;
	let useActions_action;
	let current;
	let mounted;
	let dispose;
	const default_slot_template = /*#slots*/ ctx[8].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[7], null);

	let span_levels = [
		{
			class: span_class_value = classMap({
				[/*className*/ ctx[1]]: true,
				"mdc-deprecated-list-item__graphic": true,
				"mdc-menu__selection-group-icon": /*menuSelectionGroup*/ ctx[4]
			})
		},
		/*$$restProps*/ ctx[5]
	];

	let span_data = {};

	for (let i = 0; i < span_levels.length; i += 1) {
		span_data = assign(span_data, span_levels[i]);
	}

	const block = {
		c: function create() {
			span = element("span");
			if (default_slot) default_slot.c();
			this.h();
		},
		l: function claim(nodes) {
			span = claim_element(nodes, "SPAN", { class: true });
			var span_nodes = children(span);
			if (default_slot) default_slot.l(span_nodes);
			span_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			set_attributes(span, span_data);
			add_location(span, file$6, 0, 0, 0);
		},
		m: function mount(target, anchor) {
			insert_dev(target, span, anchor);

			if (default_slot) {
				default_slot.m(span, null);
			}

			/*span_binding*/ ctx[9](span);
			current = true;

			if (!mounted) {
				dispose = [
					action_destroyer(useActions_action = useActions.call(null, span, /*use*/ ctx[0])),
					action_destroyer(/*forwardEvents*/ ctx[3].call(null, span))
				];

				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 128)) {
					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[7], !current ? -1 : dirty, null, null);
				}
			}

			set_attributes(span, span_data = get_spread_update(span_levels, [
				(!current || dirty & /*className*/ 2 && span_class_value !== (span_class_value = classMap({
					[/*className*/ ctx[1]]: true,
					"mdc-deprecated-list-item__graphic": true,
					"mdc-menu__selection-group-icon": /*menuSelectionGroup*/ ctx[4]
				}))) && { class: span_class_value },
				dirty & /*$$restProps*/ 32 && /*$$restProps*/ ctx[5]
			]));

			if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/ 1) useActions_action.update.call(null, /*use*/ ctx[0]);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(span);
			if (default_slot) default_slot.d(detaching);
			/*span_binding*/ ctx[9](null);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$9.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$7($$self, $$props, $$invalidate) {
	const omit_props_names = ["use","class","getElement"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("Graphic", slots, ['default']);
	const forwardEvents = forwardEventsBuilder(get_current_component());
	let { use = [] } = $$props;
	let { class: className = "" } = $$props;
	let element;
	let menuSelectionGroup = getContext("SMUI:list:graphic:menu-selection-group");

	function getElement() {
		return element;
	}

	function span_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			element = $$value;
			$$invalidate(2, element);
		});
	}

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(5, $$restProps = compute_rest_props($$props, omit_props_names));
		if ("use" in $$new_props) $$invalidate(0, use = $$new_props.use);
		if ("class" in $$new_props) $$invalidate(1, className = $$new_props.class);
		if ("$$scope" in $$new_props) $$invalidate(7, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({
		getContext,
		get_current_component,
		forwardEventsBuilder,
		classMap,
		useActions,
		forwardEvents,
		use,
		className,
		element,
		menuSelectionGroup,
		getElement
	});

	$$self.$inject_state = $$new_props => {
		if ("use" in $$props) $$invalidate(0, use = $$new_props.use);
		if ("className" in $$props) $$invalidate(1, className = $$new_props.className);
		if ("element" in $$props) $$invalidate(2, element = $$new_props.element);
		if ("menuSelectionGroup" in $$props) $$invalidate(4, menuSelectionGroup = $$new_props.menuSelectionGroup);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		use,
		className,
		element,
		forwardEvents,
		menuSelectionGroup,
		$$restProps,
		getElement,
		$$scope,
		slots,
		span_binding
	];
}

class Graphic extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$7, create_fragment$9, safe_not_equal, { use: 0, class: 1, getElement: 6 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Graphic",
			options,
			id: create_fragment$9.name
		});
	}

	get use() {
		throw new Error("<Graphic>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set use(value) {
		throw new Error("<Graphic>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get class() {
		throw new Error("<Graphic>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set class(value) {
		throw new Error("<Graphic>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get getElement() {
		return this.$$.ctx[6];
	}

	set getElement(value) {
		throw new Error("<Graphic>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

classAdderBuilder({
  class: 'mdc-deprecated-list-item__meta',
  component: Span,
});

classAdderBuilder({
  class: 'mdc-deprecated-list-group',
  component: Div,
});

/* node_modules\@smui\common\H3.svelte generated by Svelte v3.38.3 */
const file$5 = "node_modules\\@smui\\common\\H3.svelte";

function create_fragment$8(ctx) {
	let h3;
	let useActions_action;
	let current;
	let mounted;
	let dispose;
	const default_slot_template = /*#slots*/ ctx[6].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[5], null);
	let h3_levels = [/*$$restProps*/ ctx[3]];
	let h3_data = {};

	for (let i = 0; i < h3_levels.length; i += 1) {
		h3_data = assign(h3_data, h3_levels[i]);
	}

	const block = {
		c: function create() {
			h3 = element("h3");
			if (default_slot) default_slot.c();
			this.h();
		},
		l: function claim(nodes) {
			h3 = claim_element(nodes, "H3", {});
			var h3_nodes = children(h3);
			if (default_slot) default_slot.l(h3_nodes);
			h3_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			set_attributes(h3, h3_data);
			add_location(h3, file$5, 0, 0, 0);
		},
		m: function mount(target, anchor) {
			insert_dev(target, h3, anchor);

			if (default_slot) {
				default_slot.m(h3, null);
			}

			/*h3_binding*/ ctx[7](h3);
			current = true;

			if (!mounted) {
				dispose = [
					action_destroyer(useActions_action = useActions.call(null, h3, /*use*/ ctx[0])),
					action_destroyer(/*forwardEvents*/ ctx[2].call(null, h3))
				];

				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 32)) {
					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[5], !current ? -1 : dirty, null, null);
				}
			}

			set_attributes(h3, h3_data = get_spread_update(h3_levels, [dirty & /*$$restProps*/ 8 && /*$$restProps*/ ctx[3]]));
			if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/ 1) useActions_action.update.call(null, /*use*/ ctx[0]);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(h3);
			if (default_slot) default_slot.d(detaching);
			/*h3_binding*/ ctx[7](null);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$8.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$6($$self, $$props, $$invalidate) {
	const omit_props_names = ["use","getElement"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("H3", slots, ['default']);
	let { use = [] } = $$props;
	const forwardEvents = forwardEventsBuilder(get_current_component());
	let element = null;

	function getElement() {
		return element;
	}

	function h3_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			element = $$value;
			$$invalidate(1, element);
		});
	}

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(3, $$restProps = compute_rest_props($$props, omit_props_names));
		if ("use" in $$new_props) $$invalidate(0, use = $$new_props.use);
		if ("$$scope" in $$new_props) $$invalidate(5, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({
		get_current_component,
		forwardEventsBuilder,
		useActions,
		use,
		forwardEvents,
		element,
		getElement
	});

	$$self.$inject_state = $$new_props => {
		if ("use" in $$props) $$invalidate(0, use = $$new_props.use);
		if ("element" in $$props) $$invalidate(1, element = $$new_props.element);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		use,
		element,
		forwardEvents,
		$$restProps,
		getElement,
		$$scope,
		slots,
		h3_binding
	];
}

class H3 extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$6, create_fragment$8, safe_not_equal, { use: 0, getElement: 4 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "H3",
			options,
			id: create_fragment$8.name
		});
	}

	get use() {
		throw new Error("<H3>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set use(value) {
		throw new Error("<H3>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get getElement() {
		return this.$$.ctx[4];
	}

	set getElement(value) {
		throw new Error("<H3>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

classAdderBuilder({
  class: 'mdc-deprecated-list-group__subheader',
  component: H3,
});

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses$1 = {
    FIXED_CLASS: 'mdc-top-app-bar--fixed',
    FIXED_SCROLLED_CLASS: 'mdc-top-app-bar--fixed-scrolled',
    SHORT_CLASS: 'mdc-top-app-bar--short',
    SHORT_COLLAPSED_CLASS: 'mdc-top-app-bar--short-collapsed',
    SHORT_HAS_ACTION_ITEM_CLASS: 'mdc-top-app-bar--short-has-action-item',
};
var numbers = {
    DEBOUNCE_THROTTLE_RESIZE_TIME_MS: 100,
    MAX_TOP_APP_BAR_HEIGHT: 128,
};
var strings$1 = {
    ACTION_ITEM_SELECTOR: '.mdc-top-app-bar__action-item',
    NAVIGATION_EVENT: 'MDCTopAppBar:nav',
    NAVIGATION_ICON_SELECTOR: '.mdc-top-app-bar__navigation-icon',
    ROOT_SELECTOR: '.mdc-top-app-bar',
    TITLE_SELECTOR: '.mdc-top-app-bar__title',
};

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCTopAppBarBaseFoundation = /** @class */ (function (_super) {
    __extends(MDCTopAppBarBaseFoundation, _super);
    /* istanbul ignore next: optional argument is not a branch statement */
    function MDCTopAppBarBaseFoundation(adapter) {
        return _super.call(this, __assign(__assign({}, MDCTopAppBarBaseFoundation.defaultAdapter), adapter)) || this;
    }
    Object.defineProperty(MDCTopAppBarBaseFoundation, "strings", {
        get: function () {
            return strings$1;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCTopAppBarBaseFoundation, "cssClasses", {
        get: function () {
            return cssClasses$1;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCTopAppBarBaseFoundation, "numbers", {
        get: function () {
            return numbers;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCTopAppBarBaseFoundation, "defaultAdapter", {
        /**
         * See {@link MDCTopAppBarAdapter} for typing information on parameters and return types.
         */
        get: function () {
            // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
            return {
                addClass: function () { return undefined; },
                removeClass: function () { return undefined; },
                hasClass: function () { return false; },
                setStyle: function () { return undefined; },
                getTopAppBarHeight: function () { return 0; },
                notifyNavigationIconClicked: function () { return undefined; },
                getViewportScrollY: function () { return 0; },
                getTotalActionItems: function () { return 0; },
            };
            // tslint:enable:object-literal-sort-keys
        },
        enumerable: false,
        configurable: true
    });
    /** Other variants of TopAppBar foundation overrides this method */
    MDCTopAppBarBaseFoundation.prototype.handleTargetScroll = function () { }; // tslint:disable-line:no-empty
    /** Other variants of TopAppBar foundation overrides this method */
    MDCTopAppBarBaseFoundation.prototype.handleWindowResize = function () { }; // tslint:disable-line:no-empty
    MDCTopAppBarBaseFoundation.prototype.handleNavigationClick = function () {
        this.adapter.notifyNavigationIconClicked();
    };
    return MDCTopAppBarBaseFoundation;
}(MDCFoundation));

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var INITIAL_VALUE = 0;
var MDCTopAppBarFoundation = /** @class */ (function (_super) {
    __extends(MDCTopAppBarFoundation, _super);
    /* istanbul ignore next: optional argument is not a branch statement */
    function MDCTopAppBarFoundation(adapter) {
        var _this = _super.call(this, adapter) || this;
        /**
         * Indicates if the top app bar was docked in the previous scroll handler iteration.
         */
        _this.wasDocked_ = true;
        /**
         * Indicates if the top app bar is docked in the fully shown position.
         */
        _this.isDockedShowing_ = true;
        /**
         * Variable for current scroll position of the top app bar
         */
        _this.currentAppBarOffsetTop_ = 0;
        /**
         * Used to prevent the top app bar from being scrolled out of view during resize events
         */
        _this.isCurrentlyBeingResized_ = false;
        /**
         * The timeout that's used to throttle the resize events
         */
        _this.resizeThrottleId_ = INITIAL_VALUE;
        /**
         * The timeout that's used to debounce toggling the isCurrentlyBeingResized_ variable after a resize
         */
        _this.resizeDebounceId_ = INITIAL_VALUE;
        _this.lastScrollPosition_ = _this.adapter.getViewportScrollY();
        _this.topAppBarHeight_ = _this.adapter.getTopAppBarHeight();
        return _this;
    }
    MDCTopAppBarFoundation.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.adapter.setStyle('top', '');
    };
    /**
     * Scroll handler for the default scroll behavior of the top app bar.
     * @override
     */
    MDCTopAppBarFoundation.prototype.handleTargetScroll = function () {
        var currentScrollPosition = Math.max(this.adapter.getViewportScrollY(), 0);
        var diff = currentScrollPosition - this.lastScrollPosition_;
        this.lastScrollPosition_ = currentScrollPosition;
        // If the window is being resized the lastScrollPosition_ needs to be updated but the
        // current scroll of the top app bar should stay in the same position.
        if (!this.isCurrentlyBeingResized_) {
            this.currentAppBarOffsetTop_ -= diff;
            if (this.currentAppBarOffsetTop_ > 0) {
                this.currentAppBarOffsetTop_ = 0;
            }
            else if (Math.abs(this.currentAppBarOffsetTop_) > this.topAppBarHeight_) {
                this.currentAppBarOffsetTop_ = -this.topAppBarHeight_;
            }
            this.moveTopAppBar_();
        }
    };
    /**
     * Top app bar resize handler that throttle/debounce functions that execute updates.
     * @override
     */
    MDCTopAppBarFoundation.prototype.handleWindowResize = function () {
        var _this = this;
        // Throttle resize events 10 p/s
        if (!this.resizeThrottleId_) {
            this.resizeThrottleId_ = setTimeout(function () {
                _this.resizeThrottleId_ = INITIAL_VALUE;
                _this.throttledResizeHandler_();
            }, numbers.DEBOUNCE_THROTTLE_RESIZE_TIME_MS);
        }
        this.isCurrentlyBeingResized_ = true;
        if (this.resizeDebounceId_) {
            clearTimeout(this.resizeDebounceId_);
        }
        this.resizeDebounceId_ = setTimeout(function () {
            _this.handleTargetScroll();
            _this.isCurrentlyBeingResized_ = false;
            _this.resizeDebounceId_ = INITIAL_VALUE;
        }, numbers.DEBOUNCE_THROTTLE_RESIZE_TIME_MS);
    };
    /**
     * Function to determine if the DOM needs to update.
     */
    MDCTopAppBarFoundation.prototype.checkForUpdate_ = function () {
        var offscreenBoundaryTop = -this.topAppBarHeight_;
        var hasAnyPixelsOffscreen = this.currentAppBarOffsetTop_ < 0;
        var hasAnyPixelsOnscreen = this.currentAppBarOffsetTop_ > offscreenBoundaryTop;
        var partiallyShowing = hasAnyPixelsOffscreen && hasAnyPixelsOnscreen;
        // If it's partially showing, it can't be docked.
        if (partiallyShowing) {
            this.wasDocked_ = false;
        }
        else {
            // Not previously docked and not partially showing, it's now docked.
            if (!this.wasDocked_) {
                this.wasDocked_ = true;
                return true;
            }
            else if (this.isDockedShowing_ !== hasAnyPixelsOnscreen) {
                this.isDockedShowing_ = hasAnyPixelsOnscreen;
                return true;
            }
        }
        return partiallyShowing;
    };
    /**
     * Function to move the top app bar if needed.
     */
    MDCTopAppBarFoundation.prototype.moveTopAppBar_ = function () {
        if (this.checkForUpdate_()) {
            // Once the top app bar is fully hidden we use the max potential top app bar height as our offset
            // so the top app bar doesn't show if the window resizes and the new height > the old height.
            var offset = this.currentAppBarOffsetTop_;
            if (Math.abs(offset) >= this.topAppBarHeight_) {
                offset = -numbers.MAX_TOP_APP_BAR_HEIGHT;
            }
            this.adapter.setStyle('top', offset + 'px');
        }
    };
    /**
     * Throttled function that updates the top app bar scrolled values if the
     * top app bar height changes.
     */
    MDCTopAppBarFoundation.prototype.throttledResizeHandler_ = function () {
        var currentHeight = this.adapter.getTopAppBarHeight();
        if (this.topAppBarHeight_ !== currentHeight) {
            this.wasDocked_ = false;
            // Since the top app bar has a different height depending on the screen width, this
            // will ensure that the top app bar remains in the correct location if
            // completely hidden and a resize makes the top app bar a different height.
            this.currentAppBarOffsetTop_ -= this.topAppBarHeight_ - currentHeight;
            this.topAppBarHeight_ = currentHeight;
        }
        this.handleTargetScroll();
    };
    return MDCTopAppBarFoundation;
}(MDCTopAppBarBaseFoundation));

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCFixedTopAppBarFoundation = /** @class */ (function (_super) {
    __extends(MDCFixedTopAppBarFoundation, _super);
    function MDCFixedTopAppBarFoundation() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * State variable for the previous scroll iteration top app bar state
         */
        _this.wasScrolled_ = false;
        return _this;
    }
    /**
     * Scroll handler for applying/removing the modifier class on the fixed top app bar.
     * @override
     */
    MDCFixedTopAppBarFoundation.prototype.handleTargetScroll = function () {
        var currentScroll = this.adapter.getViewportScrollY();
        if (currentScroll <= 0) {
            if (this.wasScrolled_) {
                this.adapter.removeClass(cssClasses$1.FIXED_SCROLLED_CLASS);
                this.wasScrolled_ = false;
            }
        }
        else {
            if (!this.wasScrolled_) {
                this.adapter.addClass(cssClasses$1.FIXED_SCROLLED_CLASS);
                this.wasScrolled_ = true;
            }
        }
    };
    return MDCFixedTopAppBarFoundation;
}(MDCTopAppBarFoundation));

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCShortTopAppBarFoundation = /** @class */ (function (_super) {
    __extends(MDCShortTopAppBarFoundation, _super);
    /* istanbul ignore next: optional argument is not a branch statement */
    function MDCShortTopAppBarFoundation(adapter) {
        var _this = _super.call(this, adapter) || this;
        _this.isCollapsed_ = false;
        _this.isAlwaysCollapsed_ = false;
        return _this;
    }
    Object.defineProperty(MDCShortTopAppBarFoundation.prototype, "isCollapsed", {
        // Public visibility for backward compatibility.
        get: function () {
            return this.isCollapsed_;
        },
        enumerable: false,
        configurable: true
    });
    MDCShortTopAppBarFoundation.prototype.init = function () {
        _super.prototype.init.call(this);
        if (this.adapter.getTotalActionItems() > 0) {
            this.adapter.addClass(cssClasses$1.SHORT_HAS_ACTION_ITEM_CLASS);
        }
        // If initialized with SHORT_COLLAPSED_CLASS, the bar should always be collapsed
        this.setAlwaysCollapsed(this.adapter.hasClass(cssClasses$1.SHORT_COLLAPSED_CLASS));
    };
    /**
     * Set if the short top app bar should always be collapsed.
     *
     * @param value When `true`, bar will always be collapsed. When `false`, bar may collapse or expand based on scroll.
     */
    MDCShortTopAppBarFoundation.prototype.setAlwaysCollapsed = function (value) {
        this.isAlwaysCollapsed_ = !!value;
        if (this.isAlwaysCollapsed_) {
            this.collapse_();
        }
        else {
            // let maybeCollapseBar_ determine if the bar should be collapsed
            this.maybeCollapseBar_();
        }
    };
    MDCShortTopAppBarFoundation.prototype.getAlwaysCollapsed = function () {
        return this.isAlwaysCollapsed_;
    };
    /**
     * Scroll handler for applying/removing the collapsed modifier class on the short top app bar.
     * @override
     */
    MDCShortTopAppBarFoundation.prototype.handleTargetScroll = function () {
        this.maybeCollapseBar_();
    };
    MDCShortTopAppBarFoundation.prototype.maybeCollapseBar_ = function () {
        if (this.isAlwaysCollapsed_) {
            return;
        }
        var currentScroll = this.adapter.getViewportScrollY();
        if (currentScroll <= 0) {
            if (this.isCollapsed_) {
                this.uncollapse_();
            }
        }
        else {
            if (!this.isCollapsed_) {
                this.collapse_();
            }
        }
    };
    MDCShortTopAppBarFoundation.prototype.uncollapse_ = function () {
        this.adapter.removeClass(cssClasses$1.SHORT_COLLAPSED_CLASS);
        this.isCollapsed_ = false;
    };
    MDCShortTopAppBarFoundation.prototype.collapse_ = function () {
        this.adapter.addClass(cssClasses$1.SHORT_COLLAPSED_CLASS);
        this.isCollapsed_ = true;
    };
    return MDCShortTopAppBarFoundation;
}(MDCTopAppBarBaseFoundation));

/* node_modules\@smui\top-app-bar\TopAppBar.svelte generated by Svelte v3.38.3 */

const { window: window_1 } = globals;

const file$4 = "node_modules\\@smui\\top-app-bar\\TopAppBar.svelte";

function create_fragment$7(ctx) {
	let header;
	let header_class_value;
	let header_style_value;
	let useActions_action;
	let current;
	let mounted;
	let dispose;
	const default_slot_template = /*#slots*/ ctx[22].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[21], null);

	let header_levels = [
		{
			class: header_class_value = classMap({
				[/*className*/ ctx[2]]: true,
				"mdc-top-app-bar": true,
				"mdc-top-app-bar--short": /*variant*/ ctx[4] === "short",
				"mdc-top-app-bar--short-collapsed": /*collapsed*/ ctx[0],
				"mdc-top-app-bar--fixed": /*variant*/ ctx[4] === "fixed",
				"smui-top-app-bar--static": /*variant*/ ctx[4] === "static",
				"smui-top-app-bar--color-secondary": /*color*/ ctx[5] === "secondary",
				"mdc-top-app-bar--prominent": /*prominent*/ ctx[6],
				"mdc-top-app-bar--dense": /*dense*/ ctx[7],
				.../*internalClasses*/ ctx[11]
			})
		},
		{
			style: header_style_value = Object.entries(/*internalStyles*/ ctx[12]).map(func$1).concat([/*style*/ ctx[3]]).join(" ")
		},
		/*$$restProps*/ ctx[15]
	];

	let header_data = {};

	for (let i = 0; i < header_levels.length; i += 1) {
		header_data = assign(header_data, header_levels[i]);
	}

	const block = {
		c: function create() {
			header = element("header");
			if (default_slot) default_slot.c();
			this.h();
		},
		l: function claim(nodes) {
			header = claim_element(nodes, "HEADER", { class: true, style: true });
			var header_nodes = children(header);
			if (default_slot) default_slot.l(header_nodes);
			header_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			set_attributes(header, header_data);
			add_location(header, file$4, 9, 0, 208);
		},
		m: function mount(target, anchor) {
			insert_dev(target, header, anchor);

			if (default_slot) {
				default_slot.m(header, null);
			}

			/*header_binding*/ ctx[25](header);
			current = true;

			if (!mounted) {
				dispose = [
					listen_dev(window_1, "resize", /*resize_handler*/ ctx[23], false, false, false),
					listen_dev(window_1, "scroll", /*scroll_handler*/ ctx[24], false, false, false),
					action_destroyer(useActions_action = useActions.call(null, header, /*use*/ ctx[1])),
					action_destroyer(/*forwardEvents*/ ctx[13].call(null, header)),
					listen_dev(header, "SMUI:top-app-bar:icon-button:nav", /*SMUI_top_app_bar_icon_button_nav_handler*/ ctx[26], false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty[0] & /*$$scope*/ 2097152)) {
					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[21], !current ? [-1, -1] : dirty, null, null);
				}
			}

			set_attributes(header, header_data = get_spread_update(header_levels, [
				(!current || dirty[0] & /*className, variant, collapsed, color, prominent, dense, internalClasses*/ 2293 && header_class_value !== (header_class_value = classMap({
					[/*className*/ ctx[2]]: true,
					"mdc-top-app-bar": true,
					"mdc-top-app-bar--short": /*variant*/ ctx[4] === "short",
					"mdc-top-app-bar--short-collapsed": /*collapsed*/ ctx[0],
					"mdc-top-app-bar--fixed": /*variant*/ ctx[4] === "fixed",
					"smui-top-app-bar--static": /*variant*/ ctx[4] === "static",
					"smui-top-app-bar--color-secondary": /*color*/ ctx[5] === "secondary",
					"mdc-top-app-bar--prominent": /*prominent*/ ctx[6],
					"mdc-top-app-bar--dense": /*dense*/ ctx[7],
					.../*internalClasses*/ ctx[11]
				}))) && { class: header_class_value },
				(!current || dirty[0] & /*internalStyles, style*/ 4104 && header_style_value !== (header_style_value = Object.entries(/*internalStyles*/ ctx[12]).map(func$1).concat([/*style*/ ctx[3]]).join(" "))) && { style: header_style_value },
				dirty[0] & /*$$restProps*/ 32768 && /*$$restProps*/ ctx[15]
			]));

			if (useActions_action && is_function(useActions_action.update) && dirty[0] & /*use*/ 2) useActions_action.update.call(null, /*use*/ ctx[1]);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(header);
			if (default_slot) default_slot.d(detaching);
			/*header_binding*/ ctx[25](null);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$7.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

const func$1 = ([name, value]) => `${name}: ${value};`;

function instance_1$1($$self, $$props, $$invalidate) {
	const omit_props_names = [
		"use","class","style","variant","color","collapsed","prominent","dense","scrollTarget","getPropStore","getElement"
	];

	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("TopAppBar", slots, ['default']);
	const forwardEvents = forwardEventsBuilder(get_current_component());

	let uninitializedValue = () => {
		
	};

	let { use = [] } = $$props;
	let { class: className = "" } = $$props;
	let { style = "" } = $$props;
	let { variant = "standard" } = $$props;
	let { color = "primary" } = $$props;
	let { collapsed = uninitializedValue } = $$props;
	let { prominent = false } = $$props;
	let { dense = false } = $$props;
	let { scrollTarget = null } = $$props;
	let element;
	let instance;
	let internalClasses = {};
	let internalStyles = {};
	const alwaysCollapsed = collapsed !== uninitializedValue && !!collapsed;

	if (collapsed === uninitializedValue) {
		collapsed = false;
	}

	let propStoreSet;

	let propStore = readable({ variant, prominent, dense }, set => {
		$$invalidate(18, propStoreSet = set);
	});

	let oldScrollTarget = null;
	let oldVariant = variant;

	onMount(() => {
		$$invalidate(9, instance = getInstance());
		instance.init();

		return () => {
			instance.destroy();
		};
	});

	function getInstance() {
		const Foundation = ({
			static: MDCTopAppBarBaseFoundation,
			short: MDCShortTopAppBarFoundation,
			fixed: MDCFixedTopAppBarFoundation
		})[variant] || MDCTopAppBarFoundation;

		return new Foundation({
				hasClass,
				addClass,
				removeClass,
				setStyle: addStyle,
				getTopAppBarHeight: () => element.clientHeight,
				notifyNavigationIconClicked: () => dispatch(element, "MDCTopAppBar:nav"),
				getViewportScrollY: () => scrollTarget == null
				? window.pageYOffset
				: scrollTarget.scrollTop,
				getTotalActionItems: () => element.querySelectorAll(".mdc-top-app-bar__action-item").length
			});
	}

	function hasClass(className) {
		return className in internalClasses
		? internalClasses[className]
		: getElement().classList.contains(className);
	}

	function addClass(className) {
		if (!internalClasses[className]) {
			$$invalidate(11, internalClasses[className] = true, internalClasses);
		}
	}

	function removeClass(className) {
		if (!(className in internalClasses) || internalClasses[className]) {
			$$invalidate(11, internalClasses[className] = false, internalClasses);
		}
	}

	function addStyle(name, value) {
		if (internalStyles[name] != value) {
			if (value === "" || value == null) {
				delete internalStyles[name];
				((($$invalidate(12, internalStyles), $$invalidate(20, oldVariant)), $$invalidate(4, variant)), $$invalidate(9, instance));
			} else {
				$$invalidate(12, internalStyles[name] = value, internalStyles);
			}
		}
	}

	function handleTargetScroll() {
		if (instance) {
			instance.handleTargetScroll();

			if (variant === "short") {
				$$invalidate(0, collapsed = instance.isCollapsed);
			}
		}
	}

	function getPropStore() {
		return propStore;
	}

	function getElement() {
		return element;
	}

	const resize_handler = () => variant !== "short" && variant !== "fixed" && instance && instance.handleWindowResize();
	const scroll_handler = () => scrollTarget == null && handleTargetScroll();

	function header_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			element = $$value;
			$$invalidate(10, element);
		});
	}

	const SMUI_top_app_bar_icon_button_nav_handler = () => instance && instance.handleNavigationClick();

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(15, $$restProps = compute_rest_props($$props, omit_props_names));
		if ("use" in $$new_props) $$invalidate(1, use = $$new_props.use);
		if ("class" in $$new_props) $$invalidate(2, className = $$new_props.class);
		if ("style" in $$new_props) $$invalidate(3, style = $$new_props.style);
		if ("variant" in $$new_props) $$invalidate(4, variant = $$new_props.variant);
		if ("color" in $$new_props) $$invalidate(5, color = $$new_props.color);
		if ("collapsed" in $$new_props) $$invalidate(0, collapsed = $$new_props.collapsed);
		if ("prominent" in $$new_props) $$invalidate(6, prominent = $$new_props.prominent);
		if ("dense" in $$new_props) $$invalidate(7, dense = $$new_props.dense);
		if ("scrollTarget" in $$new_props) $$invalidate(8, scrollTarget = $$new_props.scrollTarget);
		if ("$$scope" in $$new_props) $$invalidate(21, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({
		MDCTopAppBarBaseFoundation,
		MDCTopAppBarFoundation,
		MDCFixedTopAppBarFoundation,
		MDCShortTopAppBarFoundation,
		onMount,
		get_current_component,
		readable,
		forwardEventsBuilder,
		classMap,
		useActions,
		dispatch,
		forwardEvents,
		uninitializedValue,
		use,
		className,
		style,
		variant,
		color,
		collapsed,
		prominent,
		dense,
		scrollTarget,
		element,
		instance,
		internalClasses,
		internalStyles,
		alwaysCollapsed,
		propStoreSet,
		propStore,
		oldScrollTarget,
		oldVariant,
		getInstance,
		hasClass,
		addClass,
		removeClass,
		addStyle,
		handleTargetScroll,
		getPropStore,
		getElement
	});

	$$self.$inject_state = $$new_props => {
		if ("uninitializedValue" in $$props) uninitializedValue = $$new_props.uninitializedValue;
		if ("use" in $$props) $$invalidate(1, use = $$new_props.use);
		if ("className" in $$props) $$invalidate(2, className = $$new_props.className);
		if ("style" in $$props) $$invalidate(3, style = $$new_props.style);
		if ("variant" in $$props) $$invalidate(4, variant = $$new_props.variant);
		if ("color" in $$props) $$invalidate(5, color = $$new_props.color);
		if ("collapsed" in $$props) $$invalidate(0, collapsed = $$new_props.collapsed);
		if ("prominent" in $$props) $$invalidate(6, prominent = $$new_props.prominent);
		if ("dense" in $$props) $$invalidate(7, dense = $$new_props.dense);
		if ("scrollTarget" in $$props) $$invalidate(8, scrollTarget = $$new_props.scrollTarget);
		if ("element" in $$props) $$invalidate(10, element = $$new_props.element);
		if ("instance" in $$props) $$invalidate(9, instance = $$new_props.instance);
		if ("internalClasses" in $$props) $$invalidate(11, internalClasses = $$new_props.internalClasses);
		if ("internalStyles" in $$props) $$invalidate(12, internalStyles = $$new_props.internalStyles);
		if ("propStoreSet" in $$props) $$invalidate(18, propStoreSet = $$new_props.propStoreSet);
		if ("propStore" in $$props) propStore = $$new_props.propStore;
		if ("oldScrollTarget" in $$props) $$invalidate(19, oldScrollTarget = $$new_props.oldScrollTarget);
		if ("oldVariant" in $$props) $$invalidate(20, oldVariant = $$new_props.oldVariant);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty[0] & /*propStoreSet, variant, prominent, dense*/ 262352) {
			if (propStoreSet) {
				propStoreSet({ variant, prominent, dense });
			}
		}

		if ($$self.$$.dirty[0] & /*oldVariant, variant, instance*/ 1049104) {
			if (oldVariant !== variant && instance) {
				$$invalidate(20, oldVariant = variant);
				instance.destroy();
				$$invalidate(11, internalClasses = {});
				$$invalidate(12, internalStyles = {});
				$$invalidate(9, instance = getInstance());
				instance.init();
			}
		}

		if ($$self.$$.dirty[0] & /*instance, variant*/ 528) {
			if (instance && variant === "short") {
				instance.setAlwaysCollapsed(alwaysCollapsed);
			}
		}

		if ($$self.$$.dirty[0] & /*oldScrollTarget, scrollTarget*/ 524544) {
			if (oldScrollTarget !== scrollTarget) {
				if (oldScrollTarget) {
					oldScrollTarget.removeEventListener("scroll", handleTargetScroll);
				}

				if (scrollTarget) {
					scrollTarget.addEventListener("scroll", handleTargetScroll);
				}

				$$invalidate(19, oldScrollTarget = scrollTarget);
			}
		}
	};

	return [
		collapsed,
		use,
		className,
		style,
		variant,
		color,
		prominent,
		dense,
		scrollTarget,
		instance,
		element,
		internalClasses,
		internalStyles,
		forwardEvents,
		handleTargetScroll,
		$$restProps,
		getPropStore,
		getElement,
		propStoreSet,
		oldScrollTarget,
		oldVariant,
		$$scope,
		slots,
		resize_handler,
		scroll_handler,
		header_binding,
		SMUI_top_app_bar_icon_button_nav_handler
	];
}

class TopAppBar extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init$1(
			this,
			options,
			instance_1$1,
			create_fragment$7,
			safe_not_equal,
			{
				use: 1,
				class: 2,
				style: 3,
				variant: 4,
				color: 5,
				collapsed: 0,
				prominent: 6,
				dense: 7,
				scrollTarget: 8,
				getPropStore: 16,
				getElement: 17
			},
			[-1, -1]
		);

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "TopAppBar",
			options,
			id: create_fragment$7.name
		});
	}

	get use() {
		throw new Error("<TopAppBar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set use(value) {
		throw new Error("<TopAppBar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get class() {
		throw new Error("<TopAppBar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set class(value) {
		throw new Error("<TopAppBar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get style() {
		throw new Error("<TopAppBar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set style(value) {
		throw new Error("<TopAppBar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get variant() {
		throw new Error("<TopAppBar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set variant(value) {
		throw new Error("<TopAppBar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get color() {
		throw new Error("<TopAppBar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set color(value) {
		throw new Error("<TopAppBar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get collapsed() {
		throw new Error("<TopAppBar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set collapsed(value) {
		throw new Error("<TopAppBar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get prominent() {
		throw new Error("<TopAppBar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set prominent(value) {
		throw new Error("<TopAppBar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get dense() {
		throw new Error("<TopAppBar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set dense(value) {
		throw new Error("<TopAppBar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get scrollTarget() {
		throw new Error("<TopAppBar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set scrollTarget(value) {
		throw new Error("<TopAppBar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get getPropStore() {
		return this.$$.ctx[16];
	}

	set getPropStore(value) {
		throw new Error("<TopAppBar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get getElement() {
		return this.$$.ctx[17];
	}

	set getElement(value) {
		throw new Error("<TopAppBar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

var Row = classAdderBuilder({
  class: 'mdc-top-app-bar__row',
  component: Div,
});

/* node_modules\@smui\top-app-bar\Section.svelte generated by Svelte v3.38.3 */

const file$3 = "node_modules\\@smui\\top-app-bar\\Section.svelte";

function create_fragment$6(ctx) {
	let section;
	let section_class_value;
	let useActions_action;
	let current;
	let mounted;
	let dispose;
	const default_slot_template = /*#slots*/ ctx[9].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[8], null);

	let section_levels = [
		{
			class: section_class_value = classMap({
				[/*className*/ ctx[1]]: true,
				"mdc-top-app-bar__section": true,
				"mdc-top-app-bar__section--align-start": /*align*/ ctx[2] === "start",
				"mdc-top-app-bar__section--align-end": /*align*/ ctx[2] === "end"
			})
		},
		/*toolbar*/ ctx[3] ? { role: "toolbar" } : {},
		/*$$restProps*/ ctx[6]
	];

	let section_data = {};

	for (let i = 0; i < section_levels.length; i += 1) {
		section_data = assign(section_data, section_levels[i]);
	}

	const block = {
		c: function create() {
			section = element("section");
			if (default_slot) default_slot.c();
			this.h();
		},
		l: function claim(nodes) {
			section = claim_element(nodes, "SECTION", { class: true });
			var section_nodes = children(section);
			if (default_slot) default_slot.l(section_nodes);
			section_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			set_attributes(section, section_data);
			add_location(section, file$3, 0, 0, 0);
		},
		m: function mount(target, anchor) {
			insert_dev(target, section, anchor);

			if (default_slot) {
				default_slot.m(section, null);
			}

			/*section_binding*/ ctx[10](section);
			current = true;

			if (!mounted) {
				dispose = [
					action_destroyer(useActions_action = useActions.call(null, section, /*use*/ ctx[0])),
					action_destroyer(/*forwardEvents*/ ctx[5].call(null, section))
				];

				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 256)) {
					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[8], !current ? -1 : dirty, null, null);
				}
			}

			set_attributes(section, section_data = get_spread_update(section_levels, [
				(!current || dirty & /*className, align*/ 6 && section_class_value !== (section_class_value = classMap({
					[/*className*/ ctx[1]]: true,
					"mdc-top-app-bar__section": true,
					"mdc-top-app-bar__section--align-start": /*align*/ ctx[2] === "start",
					"mdc-top-app-bar__section--align-end": /*align*/ ctx[2] === "end"
				}))) && { class: section_class_value },
				dirty & /*toolbar*/ 8 && (/*toolbar*/ ctx[3] ? { role: "toolbar" } : {}),
				dirty & /*$$restProps*/ 64 && /*$$restProps*/ ctx[6]
			]));

			if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/ 1) useActions_action.update.call(null, /*use*/ ctx[0]);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(section);
			if (default_slot) default_slot.d(detaching);
			/*section_binding*/ ctx[10](null);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$6.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$5($$self, $$props, $$invalidate) {
	const omit_props_names = ["use","class","align","toolbar","getElement"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("Section", slots, ['default']);
	const forwardEvents = forwardEventsBuilder(get_current_component());
	let { use = [] } = $$props;
	let { class: className = "" } = $$props;
	let { align = "start" } = $$props;
	let { toolbar = false } = $$props;
	let element;

	setContext("SMUI:icon-button:context", toolbar
	? "top-app-bar:action"
	: "top-app-bar:navigation");

	setContext("SMUI:button:context", toolbar
	? "top-app-bar:action"
	: "top-app-bar:navigation");

	function getElement() {
		return element;
	}

	function section_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			element = $$value;
			$$invalidate(4, element);
		});
	}

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(6, $$restProps = compute_rest_props($$props, omit_props_names));
		if ("use" in $$new_props) $$invalidate(0, use = $$new_props.use);
		if ("class" in $$new_props) $$invalidate(1, className = $$new_props.class);
		if ("align" in $$new_props) $$invalidate(2, align = $$new_props.align);
		if ("toolbar" in $$new_props) $$invalidate(3, toolbar = $$new_props.toolbar);
		if ("$$scope" in $$new_props) $$invalidate(8, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({
		setContext,
		get_current_component,
		forwardEventsBuilder,
		classMap,
		useActions,
		forwardEvents,
		use,
		className,
		align,
		toolbar,
		element,
		getElement
	});

	$$self.$inject_state = $$new_props => {
		if ("use" in $$props) $$invalidate(0, use = $$new_props.use);
		if ("className" in $$props) $$invalidate(1, className = $$new_props.className);
		if ("align" in $$props) $$invalidate(2, align = $$new_props.align);
		if ("toolbar" in $$props) $$invalidate(3, toolbar = $$new_props.toolbar);
		if ("element" in $$props) $$invalidate(4, element = $$new_props.element);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		use,
		className,
		align,
		toolbar,
		element,
		forwardEvents,
		$$restProps,
		getElement,
		$$scope,
		slots,
		section_binding
	];
}

class Section extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init$1(this, options, instance$5, create_fragment$6, safe_not_equal, {
			use: 0,
			class: 1,
			align: 2,
			toolbar: 3,
			getElement: 7
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Section",
			options,
			id: create_fragment$6.name
		});
	}

	get use() {
		throw new Error("<Section>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set use(value) {
		throw new Error("<Section>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get class() {
		throw new Error("<Section>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set class(value) {
		throw new Error("<Section>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get align() {
		throw new Error("<Section>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set align(value) {
		throw new Error("<Section>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get toolbar() {
		throw new Error("<Section>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set toolbar(value) {
		throw new Error("<Section>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get getElement() {
		return this.$$.ctx[7];
	}

	set getElement(value) {
		throw new Error("<Section>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

var Title = classAdderBuilder({
  class: 'mdc-top-app-bar__title',
  component: Span,
});

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses = {
    ICON_BUTTON_ON: 'mdc-icon-button--on',
    ROOT: 'mdc-icon-button',
};
var strings = {
    ARIA_LABEL: 'aria-label',
    ARIA_PRESSED: 'aria-pressed',
    DATA_ARIA_LABEL_OFF: 'data-aria-label-off',
    DATA_ARIA_LABEL_ON: 'data-aria-label-on',
    CHANGE_EVENT: 'MDCIconButtonToggle:change',
};

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCIconButtonToggleFoundation = /** @class */ (function (_super) {
    __extends(MDCIconButtonToggleFoundation, _super);
    function MDCIconButtonToggleFoundation(adapter) {
        var _this = _super.call(this, __assign(__assign({}, MDCIconButtonToggleFoundation.defaultAdapter), adapter)) || this;
        /**
         * Whether the icon button has an aria label that changes depending on
         * toggled state.
         */
        _this.hasToggledAriaLabel = false;
        return _this;
    }
    Object.defineProperty(MDCIconButtonToggleFoundation, "cssClasses", {
        get: function () {
            return cssClasses;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCIconButtonToggleFoundation, "strings", {
        get: function () {
            return strings;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCIconButtonToggleFoundation, "defaultAdapter", {
        get: function () {
            return {
                addClass: function () { return undefined; },
                hasClass: function () { return false; },
                notifyChange: function () { return undefined; },
                removeClass: function () { return undefined; },
                getAttr: function () { return null; },
                setAttr: function () { return undefined; },
            };
        },
        enumerable: false,
        configurable: true
    });
    MDCIconButtonToggleFoundation.prototype.init = function () {
        var ariaLabelOn = this.adapter.getAttr(strings.DATA_ARIA_LABEL_ON);
        var ariaLabelOff = this.adapter.getAttr(strings.DATA_ARIA_LABEL_OFF);
        if (ariaLabelOn && ariaLabelOff) {
            if (this.adapter.getAttr(strings.ARIA_PRESSED) !== null) {
                throw new Error('MDCIconButtonToggleFoundation: Button should not set ' +
                    '`aria-pressed` if it has a toggled aria label.');
            }
            this.hasToggledAriaLabel = true;
        }
        else {
            this.adapter.setAttr(strings.ARIA_PRESSED, String(this.isOn()));
        }
    };
    MDCIconButtonToggleFoundation.prototype.handleClick = function () {
        this.toggle();
        this.adapter.notifyChange({ isOn: this.isOn() });
    };
    MDCIconButtonToggleFoundation.prototype.isOn = function () {
        return this.adapter.hasClass(cssClasses.ICON_BUTTON_ON);
    };
    MDCIconButtonToggleFoundation.prototype.toggle = function (isOn) {
        if (isOn === void 0) { isOn = !this.isOn(); }
        // Toggle UI based on state.
        if (isOn) {
            this.adapter.addClass(cssClasses.ICON_BUTTON_ON);
        }
        else {
            this.adapter.removeClass(cssClasses.ICON_BUTTON_ON);
        }
        // Toggle aria attributes based on state.
        if (this.hasToggledAriaLabel) {
            var ariaLabel = isOn ?
                this.adapter.getAttr(strings.DATA_ARIA_LABEL_ON) :
                this.adapter.getAttr(strings.DATA_ARIA_LABEL_OFF);
            this.adapter.setAttr(strings.ARIA_LABEL, ariaLabel || '');
        }
        else {
            this.adapter.setAttr(strings.ARIA_PRESSED, "" + isOn);
        }
    };
    return MDCIconButtonToggleFoundation;
}(MDCFoundation));

/* node_modules\@smui\common\Button.svelte generated by Svelte v3.38.3 */
const file$2 = "node_modules\\@smui\\common\\Button.svelte";

function create_fragment$5(ctx) {
	let button;
	let useActions_action;
	let current;
	let mounted;
	let dispose;
	const default_slot_template = /*#slots*/ ctx[6].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[5], null);
	let button_levels = [/*$$restProps*/ ctx[3]];
	let button_data = {};

	for (let i = 0; i < button_levels.length; i += 1) {
		button_data = assign(button_data, button_levels[i]);
	}

	const block = {
		c: function create() {
			button = element("button");
			if (default_slot) default_slot.c();
			this.h();
		},
		l: function claim(nodes) {
			button = claim_element(nodes, "BUTTON", {});
			var button_nodes = children(button);
			if (default_slot) default_slot.l(button_nodes);
			button_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			set_attributes(button, button_data);
			add_location(button, file$2, 0, 0, 0);
		},
		m: function mount(target, anchor) {
			insert_dev(target, button, anchor);

			if (default_slot) {
				default_slot.m(button, null);
			}

			/*button_binding*/ ctx[7](button);
			current = true;

			if (!mounted) {
				dispose = [
					action_destroyer(useActions_action = useActions.call(null, button, /*use*/ ctx[0])),
					action_destroyer(/*forwardEvents*/ ctx[2].call(null, button))
				];

				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 32)) {
					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[5], !current ? -1 : dirty, null, null);
				}
			}

			set_attributes(button, button_data = get_spread_update(button_levels, [dirty & /*$$restProps*/ 8 && /*$$restProps*/ ctx[3]]));
			if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/ 1) useActions_action.update.call(null, /*use*/ ctx[0]);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(button);
			if (default_slot) default_slot.d(detaching);
			/*button_binding*/ ctx[7](null);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$5.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$4($$self, $$props, $$invalidate) {
	const omit_props_names = ["use","getElement"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("Button", slots, ['default']);
	let { use = [] } = $$props;
	const forwardEvents = forwardEventsBuilder(get_current_component());
	let element = null;

	function getElement() {
		return element;
	}

	function button_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			element = $$value;
			$$invalidate(1, element);
		});
	}

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(3, $$restProps = compute_rest_props($$props, omit_props_names));
		if ("use" in $$new_props) $$invalidate(0, use = $$new_props.use);
		if ("$$scope" in $$new_props) $$invalidate(5, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({
		get_current_component,
		forwardEventsBuilder,
		useActions,
		use,
		forwardEvents,
		element,
		getElement
	});

	$$self.$inject_state = $$new_props => {
		if ("use" in $$props) $$invalidate(0, use = $$new_props.use);
		if ("element" in $$props) $$invalidate(1, element = $$new_props.element);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		use,
		element,
		forwardEvents,
		$$restProps,
		getElement,
		$$scope,
		slots,
		button_binding
	];
}

class Button extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$4, create_fragment$5, safe_not_equal, { use: 0, getElement: 4 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Button",
			options,
			id: create_fragment$5.name
		});
	}

	get use() {
		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set use(value) {
		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get getElement() {
		return this.$$.ctx[4];
	}

	set getElement(value) {
		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* node_modules\@smui\icon-button\IconButton.svelte generated by Svelte v3.38.3 */

// (1:0) <svelte:component   this={component}   bind:this={element}   use={[     [       Ripple,       {         ripple,         unbounded: true,         color,         disabled: !!$$restProps.disabled,         addClass,         removeClass,         addStyle,       },     ],     forwardEvents,     ...use,   ]}   class={classMap({     [className]: true,     'mdc-icon-button': true,     'mdc-icon-button--on': pressed !== uninitializedValue && pressed,     'mdc-card__action': context === 'card:action',     'mdc-card__action--icon': context === 'card:action',     'mdc-top-app-bar__navigation-icon': context === 'top-app-bar:navigation',     'mdc-top-app-bar__action-item': context === 'top-app-bar:action',     'mdc-snackbar__dismiss': context === 'snackbar:actions',     'mdc-data-table__pagination-button': context === 'data-table:pagination',     'mdc-data-table__sort-icon-button':       context === 'data-table:sortable-header-cell',     'mdc-dialog__close': context === 'dialog:header' && action === 'close',     ...internalClasses,   })}   style={Object.entries(internalStyles)     .map(([name, value]) => `${name}: ${value};`)     .concat([style])     .join(' ')}   aria-pressed={pressed !== uninitializedValue     ? pressed       ? 'true'       : 'false'     : null}   aria-label={pressed ? ariaLabelOn : ariaLabelOff}   data-aria-label-on={ariaLabelOn}   data-aria-label-off={ariaLabelOff}   aria-describedby={ariaDescribedby}   on:click={() => instance && instance.handleClick()}   on:click={() =>     context === 'top-app-bar:navigation' &&     dispatch(element, 'SMUI:top-app-bar:icon-button:nav')}   {href}   {...actionProp}   {...internalAttrs}   {...$$restProps}>
function create_default_slot$3(ctx) {
	let current;
	const default_slot_template = /*#slots*/ ctx[28].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[32], null);

	const block = {
		c: function create() {
			if (default_slot) default_slot.c();
		},
		l: function claim(nodes) {
			if (default_slot) default_slot.l(nodes);
		},
		m: function mount(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty[1] & /*$$scope*/ 2)) {
					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[32], !current ? [-1, -1] : dirty, null, null);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot$3.name,
		type: "slot",
		source: "(1:0) <svelte:component   this={component}   bind:this={element}   use={[     [       Ripple,       {         ripple,         unbounded: true,         color,         disabled: !!$$restProps.disabled,         addClass,         removeClass,         addStyle,       },     ],     forwardEvents,     ...use,   ]}   class={classMap({     [className]: true,     'mdc-icon-button': true,     'mdc-icon-button--on': pressed !== uninitializedValue && pressed,     'mdc-card__action': context === 'card:action',     'mdc-card__action--icon': context === 'card:action',     'mdc-top-app-bar__navigation-icon': context === 'top-app-bar:navigation',     'mdc-top-app-bar__action-item': context === 'top-app-bar:action',     'mdc-snackbar__dismiss': context === 'snackbar:actions',     'mdc-data-table__pagination-button': context === 'data-table:pagination',     'mdc-data-table__sort-icon-button':       context === 'data-table:sortable-header-cell',     'mdc-dialog__close': context === 'dialog:header' && action === 'close',     ...internalClasses,   })}   style={Object.entries(internalStyles)     .map(([name, value]) => `${name}: ${value};`)     .concat([style])     .join(' ')}   aria-pressed={pressed !== uninitializedValue     ? pressed       ? 'true'       : 'false'     : null}   aria-label={pressed ? ariaLabelOn : ariaLabelOff}   data-aria-label-on={ariaLabelOn}   data-aria-label-off={ariaLabelOff}   aria-describedby={ariaDescribedby}   on:click={() => instance && instance.handleClick()}   on:click={() =>     context === 'top-app-bar:navigation' &&     dispatch(element, 'SMUI:top-app-bar:icon-button:nav')}   {href}   {...actionProp}   {...internalAttrs}   {...$$restProps}>",
		ctx
	});

	return block;
}

function create_fragment$4(ctx) {
	let switch_instance;
	let switch_instance_anchor;
	let current;

	const switch_instance_spread_levels = [
		{
			use: [
				[
					Ripple,
					{
						ripple: /*ripple*/ ctx[4],
						unbounded: true,
						color: /*color*/ ctx[5],
						disabled: !!/*$$restProps*/ ctx[24].disabled,
						addClass: /*addClass*/ ctx[21],
						removeClass: /*removeClass*/ ctx[22],
						addStyle: /*addStyle*/ ctx[23]
					}
				],
				/*forwardEvents*/ ctx[17],
				.../*use*/ ctx[1]
			]
		},
		{
			class: classMap({
				[/*className*/ ctx[2]]: true,
				"mdc-icon-button": true,
				"mdc-icon-button--on": /*pressed*/ ctx[0] !== /*uninitializedValue*/ ctx[18] && /*pressed*/ ctx[0],
				"mdc-card__action": /*context*/ ctx[19] === "card:action",
				"mdc-card__action--icon": /*context*/ ctx[19] === "card:action",
				"mdc-top-app-bar__navigation-icon": /*context*/ ctx[19] === "top-app-bar:navigation",
				"mdc-top-app-bar__action-item": /*context*/ ctx[19] === "top-app-bar:action",
				"mdc-snackbar__dismiss": /*context*/ ctx[19] === "snackbar:actions",
				"mdc-data-table__pagination-button": /*context*/ ctx[19] === "data-table:pagination",
				"mdc-data-table__sort-icon-button": /*context*/ ctx[19] === "data-table:sortable-header-cell",
				"mdc-dialog__close": /*context*/ ctx[19] === "dialog:header" && /*action*/ ctx[9] === "close",
				.../*internalClasses*/ ctx[13]
			})
		},
		{
			style: Object.entries(/*internalStyles*/ ctx[14]).map(func).concat([/*style*/ ctx[3]]).join(" ")
		},
		{
			"aria-pressed": /*pressed*/ ctx[0] !== /*uninitializedValue*/ ctx[18]
			? /*pressed*/ ctx[0] ? "true" : "false"
			: null
		},
		{
			"aria-label": /*pressed*/ ctx[0]
			? /*ariaLabelOn*/ ctx[6]
			: /*ariaLabelOff*/ ctx[7]
		},
		{
			"data-aria-label-on": /*ariaLabelOn*/ ctx[6]
		},
		{
			"data-aria-label-off": /*ariaLabelOff*/ ctx[7]
		},
		{
			"aria-describedby": /*ariaDescribedby*/ ctx[20]
		},
		{ href: /*href*/ ctx[8] },
		/*actionProp*/ ctx[16],
		/*internalAttrs*/ ctx[15],
		/*$$restProps*/ ctx[24]
	];

	var switch_value = /*component*/ ctx[10];

	function switch_props(ctx) {
		let switch_instance_props = {
			$$slots: { default: [create_default_slot$3] },
			$$scope: { ctx }
		};

		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
		}

		return {
			props: switch_instance_props,
			$$inline: true
		};
	}

	if (switch_value) {
		switch_instance = new switch_value(switch_props(ctx));
		/*switch_instance_binding*/ ctx[29](switch_instance);
		switch_instance.$on("click", /*click_handler*/ ctx[30]);
		switch_instance.$on("click", /*click_handler_1*/ ctx[31]);
	}

	const block = {
		c: function create() {
			if (switch_instance) create_component(switch_instance.$$.fragment);
			switch_instance_anchor = empty();
		},
		l: function claim(nodes) {
			if (switch_instance) claim_component(switch_instance.$$.fragment, nodes);
			switch_instance_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (switch_instance) {
				mount_component(switch_instance, target, anchor);
			}

			insert_dev(target, switch_instance_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const switch_instance_changes = (dirty[0] & /*ripple, color, $$restProps, addClass, removeClass, addStyle, forwardEvents, use, className, pressed, uninitializedValue, context, action, internalClasses, internalStyles, style, ariaLabelOn, ariaLabelOff, ariaDescribedby, href, actionProp, internalAttrs*/ 33547263)
			? get_spread_update(switch_instance_spread_levels, [
					dirty[0] & /*ripple, color, $$restProps, addClass, removeClass, addStyle, forwardEvents, use*/ 31588402 && {
						use: [
							[
								Ripple,
								{
									ripple: /*ripple*/ ctx[4],
									unbounded: true,
									color: /*color*/ ctx[5],
									disabled: !!/*$$restProps*/ ctx[24].disabled,
									addClass: /*addClass*/ ctx[21],
									removeClass: /*removeClass*/ ctx[22],
									addStyle: /*addStyle*/ ctx[23]
								}
							],
							/*forwardEvents*/ ctx[17],
							.../*use*/ ctx[1]
						]
					},
					dirty[0] & /*className, pressed, uninitializedValue, context, action, internalClasses*/ 795141 && {
						class: classMap({
							[/*className*/ ctx[2]]: true,
							"mdc-icon-button": true,
							"mdc-icon-button--on": /*pressed*/ ctx[0] !== /*uninitializedValue*/ ctx[18] && /*pressed*/ ctx[0],
							"mdc-card__action": /*context*/ ctx[19] === "card:action",
							"mdc-card__action--icon": /*context*/ ctx[19] === "card:action",
							"mdc-top-app-bar__navigation-icon": /*context*/ ctx[19] === "top-app-bar:navigation",
							"mdc-top-app-bar__action-item": /*context*/ ctx[19] === "top-app-bar:action",
							"mdc-snackbar__dismiss": /*context*/ ctx[19] === "snackbar:actions",
							"mdc-data-table__pagination-button": /*context*/ ctx[19] === "data-table:pagination",
							"mdc-data-table__sort-icon-button": /*context*/ ctx[19] === "data-table:sortable-header-cell",
							"mdc-dialog__close": /*context*/ ctx[19] === "dialog:header" && /*action*/ ctx[9] === "close",
							.../*internalClasses*/ ctx[13]
						})
					},
					dirty[0] & /*internalStyles, style*/ 16392 && {
						style: Object.entries(/*internalStyles*/ ctx[14]).map(func).concat([/*style*/ ctx[3]]).join(" ")
					},
					dirty[0] & /*pressed, uninitializedValue*/ 262145 && {
						"aria-pressed": /*pressed*/ ctx[0] !== /*uninitializedValue*/ ctx[18]
						? /*pressed*/ ctx[0] ? "true" : "false"
						: null
					},
					dirty[0] & /*pressed, ariaLabelOn, ariaLabelOff*/ 193 && {
						"aria-label": /*pressed*/ ctx[0]
						? /*ariaLabelOn*/ ctx[6]
						: /*ariaLabelOff*/ ctx[7]
					},
					dirty[0] & /*ariaLabelOn*/ 64 && {
						"data-aria-label-on": /*ariaLabelOn*/ ctx[6]
					},
					dirty[0] & /*ariaLabelOff*/ 128 && {
						"data-aria-label-off": /*ariaLabelOff*/ ctx[7]
					},
					dirty[0] & /*ariaDescribedby*/ 1048576 && {
						"aria-describedby": /*ariaDescribedby*/ ctx[20]
					},
					dirty[0] & /*href*/ 256 && { href: /*href*/ ctx[8] },
					dirty[0] & /*actionProp*/ 65536 && get_spread_object(/*actionProp*/ ctx[16]),
					dirty[0] & /*internalAttrs*/ 32768 && get_spread_object(/*internalAttrs*/ ctx[15]),
					dirty[0] & /*$$restProps*/ 16777216 && get_spread_object(/*$$restProps*/ ctx[24])
				])
			: {};

			if (dirty[1] & /*$$scope*/ 2) {
				switch_instance_changes.$$scope = { dirty, ctx };
			}

			if (switch_value !== (switch_value = /*component*/ ctx[10])) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props(ctx));
					/*switch_instance_binding*/ ctx[29](switch_instance);
					switch_instance.$on("click", /*click_handler*/ ctx[30]);
					switch_instance.$on("click", /*click_handler_1*/ ctx[31]);
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}
		},
		i: function intro(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			/*switch_instance_binding*/ ctx[29](null);
			if (detaching) detach_dev(switch_instance_anchor);
			if (switch_instance) destroy_component(switch_instance, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$4.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

const func = ([name, value]) => `${name}: ${value};`;

function instance_1($$self, $$props, $$invalidate) {
	let actionProp;

	const omit_props_names = [
		"use","class","style","ripple","color","toggle","pressed","ariaLabelOn","ariaLabelOff","href","action","component","getElement"
	];

	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("IconButton", slots, ['default']);
	const forwardEvents = forwardEventsBuilder(get_current_component());

	let uninitializedValue = () => {
		
	};

	let { use = [] } = $$props;
	let { class: className = "" } = $$props;
	let { style = "" } = $$props;
	let { ripple = true } = $$props;
	let { color = null } = $$props;
	let { toggle = false } = $$props;
	let { pressed = uninitializedValue } = $$props;
	let { ariaLabelOn = null } = $$props;
	let { ariaLabelOff = null } = $$props;
	let { href = null } = $$props;
	let { action = null } = $$props;
	let element;
	let instance;
	let internalClasses = {};
	let internalStyles = {};
	let internalAttrs = {};
	let context = getContext("SMUI:icon-button:context");
	let ariaDescribedby = getContext("SMUI:icon-button:aria-describedby");
	let { component = href == null ? Button : A } = $$props;
	setContext("SMUI:icon:context", "icon-button");
	let oldToggle = null;

	onDestroy(() => {
		instance && instance.destroy();
	});

	function hasClass(className) {
		return className in internalClasses
		? internalClasses[className]
		: getElement().classList.contains(className);
	}

	function addClass(className) {
		if (!internalClasses[className]) {
			$$invalidate(13, internalClasses[className] = true, internalClasses);
		}
	}

	function removeClass(className) {
		if (!(className in internalClasses) || internalClasses[className]) {
			$$invalidate(13, internalClasses[className] = false, internalClasses);
		}
	}

	function addStyle(name, value) {
		if (internalStyles[name] != value) {
			if (value === "" || value == null) {
				delete internalStyles[name];
				$$invalidate(14, internalStyles);
			} else {
				$$invalidate(14, internalStyles[name] = value, internalStyles);
			}
		}
	}

	function getAttr(name) {
		return name in internalAttrs
		? internalAttrs[name]
		: getElement().getAttribute(name);
	}

	function addAttr(name, value) {
		if (internalAttrs[name] !== value) {
			$$invalidate(15, internalAttrs[name] = value, internalAttrs);
		}
	}

	function handleChange(evtData) {
		$$invalidate(0, pressed = evtData.isOn);
	}

	function getElement() {
		return element.getElement();
	}

	function switch_instance_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			element = $$value;
			$$invalidate(11, element);
		});
	}

	const click_handler = () => instance && instance.handleClick();
	const click_handler_1 = () => context === "top-app-bar:navigation" && dispatch(element, "SMUI:top-app-bar:icon-button:nav");

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(24, $$restProps = compute_rest_props($$props, omit_props_names));
		if ("use" in $$new_props) $$invalidate(1, use = $$new_props.use);
		if ("class" in $$new_props) $$invalidate(2, className = $$new_props.class);
		if ("style" in $$new_props) $$invalidate(3, style = $$new_props.style);
		if ("ripple" in $$new_props) $$invalidate(4, ripple = $$new_props.ripple);
		if ("color" in $$new_props) $$invalidate(5, color = $$new_props.color);
		if ("toggle" in $$new_props) $$invalidate(25, toggle = $$new_props.toggle);
		if ("pressed" in $$new_props) $$invalidate(0, pressed = $$new_props.pressed);
		if ("ariaLabelOn" in $$new_props) $$invalidate(6, ariaLabelOn = $$new_props.ariaLabelOn);
		if ("ariaLabelOff" in $$new_props) $$invalidate(7, ariaLabelOff = $$new_props.ariaLabelOff);
		if ("href" in $$new_props) $$invalidate(8, href = $$new_props.href);
		if ("action" in $$new_props) $$invalidate(9, action = $$new_props.action);
		if ("component" in $$new_props) $$invalidate(10, component = $$new_props.component);
		if ("$$scope" in $$new_props) $$invalidate(32, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({
		MDCIconButtonToggleFoundation,
		onDestroy,
		getContext,
		setContext,
		get_current_component,
		forwardEventsBuilder,
		classMap,
		dispatch,
		Ripple,
		A,
		Button,
		forwardEvents,
		uninitializedValue,
		use,
		className,
		style,
		ripple,
		color,
		toggle,
		pressed,
		ariaLabelOn,
		ariaLabelOff,
		href,
		action,
		element,
		instance,
		internalClasses,
		internalStyles,
		internalAttrs,
		context,
		ariaDescribedby,
		component,
		oldToggle,
		hasClass,
		addClass,
		removeClass,
		addStyle,
		getAttr,
		addAttr,
		handleChange,
		getElement,
		actionProp
	});

	$$self.$inject_state = $$new_props => {
		if ("uninitializedValue" in $$props) $$invalidate(18, uninitializedValue = $$new_props.uninitializedValue);
		if ("use" in $$props) $$invalidate(1, use = $$new_props.use);
		if ("className" in $$props) $$invalidate(2, className = $$new_props.className);
		if ("style" in $$props) $$invalidate(3, style = $$new_props.style);
		if ("ripple" in $$props) $$invalidate(4, ripple = $$new_props.ripple);
		if ("color" in $$props) $$invalidate(5, color = $$new_props.color);
		if ("toggle" in $$props) $$invalidate(25, toggle = $$new_props.toggle);
		if ("pressed" in $$props) $$invalidate(0, pressed = $$new_props.pressed);
		if ("ariaLabelOn" in $$props) $$invalidate(6, ariaLabelOn = $$new_props.ariaLabelOn);
		if ("ariaLabelOff" in $$props) $$invalidate(7, ariaLabelOff = $$new_props.ariaLabelOff);
		if ("href" in $$props) $$invalidate(8, href = $$new_props.href);
		if ("action" in $$props) $$invalidate(9, action = $$new_props.action);
		if ("element" in $$props) $$invalidate(11, element = $$new_props.element);
		if ("instance" in $$props) $$invalidate(12, instance = $$new_props.instance);
		if ("internalClasses" in $$props) $$invalidate(13, internalClasses = $$new_props.internalClasses);
		if ("internalStyles" in $$props) $$invalidate(14, internalStyles = $$new_props.internalStyles);
		if ("internalAttrs" in $$props) $$invalidate(15, internalAttrs = $$new_props.internalAttrs);
		if ("context" in $$props) $$invalidate(19, context = $$new_props.context);
		if ("ariaDescribedby" in $$props) $$invalidate(20, ariaDescribedby = $$new_props.ariaDescribedby);
		if ("component" in $$props) $$invalidate(10, component = $$new_props.component);
		if ("oldToggle" in $$props) $$invalidate(27, oldToggle = $$new_props.oldToggle);
		if ("actionProp" in $$props) $$invalidate(16, actionProp = $$new_props.actionProp);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty[0] & /*action*/ 512) {
			$$invalidate(16, actionProp = (() => {
				if (context === "data-table:pagination") {
					switch (action) {
						case "first-page":
							return { "data-first-page": "true" };
						case "prev-page":
							return { "data-prev-page": "true" };
						case "next-page":
							return { "data-next-page": "true" };
						case "last-page":
							return { "data-last-page": "true" };
						default:
							return { "data-action": "true" };
					}
				} else if (context === "dialog:header") {
					return { "data-mdc-dialog-action": action };
				} else {
					return { action };
				}
			})());
		}

		if ($$self.$$.dirty[0] & /*element, toggle, oldToggle, instance*/ 167778304) {
			if (element && getElement() && toggle !== oldToggle) {
				if (toggle && !instance) {
					$$invalidate(12, instance = new MDCIconButtonToggleFoundation({
							addClass,
							hasClass,
							notifyChange: evtData => {
								handleChange(evtData);
								dispatch(getElement(), "MDCIconButtonToggle:change", evtData);
							},
							removeClass,
							getAttr,
							setAttr: addAttr
						}));

					instance.init();
				} else if (!toggle && instance) {
					instance.destroy();
					$$invalidate(12, instance = null);
					$$invalidate(13, internalClasses = {});
					$$invalidate(15, internalAttrs = {});
				}

				$$invalidate(27, oldToggle = toggle);
			}
		}

		if ($$self.$$.dirty[0] & /*instance, pressed*/ 4097) {
			if (instance && instance.isOn() !== pressed) {
				instance.toggle(pressed);
			}
		}
	};

	return [
		pressed,
		use,
		className,
		style,
		ripple,
		color,
		ariaLabelOn,
		ariaLabelOff,
		href,
		action,
		component,
		element,
		instance,
		internalClasses,
		internalStyles,
		internalAttrs,
		actionProp,
		forwardEvents,
		uninitializedValue,
		context,
		ariaDescribedby,
		addClass,
		removeClass,
		addStyle,
		$$restProps,
		toggle,
		getElement,
		oldToggle,
		slots,
		switch_instance_binding,
		click_handler,
		click_handler_1,
		$$scope
	];
}

class IconButton extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init$1(
			this,
			options,
			instance_1,
			create_fragment$4,
			safe_not_equal,
			{
				use: 1,
				class: 2,
				style: 3,
				ripple: 4,
				color: 5,
				toggle: 25,
				pressed: 0,
				ariaLabelOn: 6,
				ariaLabelOff: 7,
				href: 8,
				action: 9,
				component: 10,
				getElement: 26
			},
			[-1, -1]
		);

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "IconButton",
			options,
			id: create_fragment$4.name
		});
	}

	get use() {
		throw new Error("<IconButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set use(value) {
		throw new Error("<IconButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get class() {
		throw new Error("<IconButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set class(value) {
		throw new Error("<IconButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get style() {
		throw new Error("<IconButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set style(value) {
		throw new Error("<IconButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get ripple() {
		throw new Error("<IconButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set ripple(value) {
		throw new Error("<IconButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get color() {
		throw new Error("<IconButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set color(value) {
		throw new Error("<IconButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get toggle() {
		throw new Error("<IconButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set toggle(value) {
		throw new Error("<IconButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get pressed() {
		throw new Error("<IconButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set pressed(value) {
		throw new Error("<IconButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get ariaLabelOn() {
		throw new Error("<IconButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set ariaLabelOn(value) {
		throw new Error("<IconButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get ariaLabelOff() {
		throw new Error("<IconButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set ariaLabelOff(value) {
		throw new Error("<IconButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get href() {
		throw new Error("<IconButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set href(value) {
		throw new Error("<IconButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get action() {
		throw new Error("<IconButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set action(value) {
		throw new Error("<IconButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get component() {
		throw new Error("<IconButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set component(value) {
		throw new Error("<IconButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get getElement() {
		return this.$$.ctx[26];
	}

	set getElement(value) {
		throw new Error("<IconButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src\components\Layout\Nav.svelte generated by Svelte v3.38.3 */

// (20:3) <IconButton class="material-icons" on:click={() => {dispatch('close')}}>
function create_default_slot_4$1(ctx) {
	let t;

	const block = {
		c: function create() {
			t = text("menu");
		},
		l: function claim(nodes) {
			t = claim_text(nodes, "menu");
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_4$1.name,
		type: "slot",
		source: "(20:3) <IconButton class=\\\"material-icons\\\" on:click={() => {dispatch('close')}}>",
		ctx
	});

	return block;
}

// (24:3) <Title>
function create_default_slot_3$1(ctx) {
	let t;

	const block = {
		c: function create() {
			t = text("My App");
		},
		l: function claim(nodes) {
			t = claim_text(nodes, "My App");
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_3$1.name,
		type: "slot",
		source: "(24:3) <Title>",
		ctx
	});

	return block;
}

// (19:2) <Section>
function create_default_slot_2$1(ctx) {
	let iconbutton;
	let t;
	let title;
	let current;

	iconbutton = new IconButton({
			props: {
				class: "material-icons",
				$$slots: { default: [create_default_slot_4$1] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	iconbutton.$on("click", /*click_handler*/ ctx[4]);

	title = new Title({
			props: {
				$$slots: { default: [create_default_slot_3$1] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(iconbutton.$$.fragment);
			t = space();
			create_component(title.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(iconbutton.$$.fragment, nodes);
			t = claim_space(nodes);
			claim_component(title.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(iconbutton, target, anchor);
			insert_dev(target, t, anchor);
			mount_component(title, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const iconbutton_changes = {};

			if (dirty & /*$$scope*/ 32) {
				iconbutton_changes.$$scope = { dirty, ctx };
			}

			iconbutton.$set(iconbutton_changes);
			const title_changes = {};

			if (dirty & /*$$scope*/ 32) {
				title_changes.$$scope = { dirty, ctx };
			}

			title.$set(title_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(iconbutton.$$.fragment, local);
			transition_in(title.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(iconbutton.$$.fragment, local);
			transition_out(title.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(iconbutton, detaching);
			if (detaching) detach_dev(t);
			destroy_component(title, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_2$1.name,
		type: "slot",
		source: "(19:2) <Section>",
		ctx
	});

	return block;
}

// (18:1) <Row>
function create_default_slot_1$1(ctx) {
	let section;
	let current;

	section = new Section({
			props: {
				$$slots: { default: [create_default_slot_2$1] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(section.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(section.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(section, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const section_changes = {};

			if (dirty & /*$$scope*/ 32) {
				section_changes.$$scope = { dirty, ctx };
			}

			section.$set(section_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(section.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(section.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(section, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_1$1.name,
		type: "slot",
		source: "(18:1) <Row>",
		ctx
	});

	return block;
}

// (13:0) <TopAppBar  variant="static"  {prominent}  {dense}  color={secondaryColor ? 'secondary' : 'primary'}>
function create_default_slot$2(ctx) {
	let row;
	let current;

	row = new Row({
			props: {
				$$slots: { default: [create_default_slot_1$1] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(row.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(row.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(row, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const row_changes = {};

			if (dirty & /*$$scope*/ 32) {
				row_changes.$$scope = { dirty, ctx };
			}

			row.$set(row_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(row.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(row.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(row, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot$2.name,
		type: "slot",
		source: "(13:0) <TopAppBar  variant=\\\"static\\\"  {prominent}  {dense}  color={secondaryColor ? 'secondary' : 'primary'}>",
		ctx
	});

	return block;
}

function create_fragment$3(ctx) {
	let topappbar;
	let current;

	topappbar = new TopAppBar({
			props: {
				variant: "static",
				prominent: /*prominent*/ ctx[1],
				dense: /*dense*/ ctx[2],
				color: /*secondaryColor*/ ctx[3] ? "secondary" : "primary",
				$$slots: { default: [create_default_slot$2] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(topappbar.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(topappbar.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(topappbar, target, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const topappbar_changes = {};

			if (dirty & /*$$scope*/ 32) {
				topappbar_changes.$$scope = { dirty, ctx };
			}

			topappbar.$set(topappbar_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(topappbar.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(topappbar.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(topappbar, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("Nav", slots, []);
	let dispatch = createEventDispatcher();
	let prominent = false;
	let dense = false;
	let secondaryColor = false;
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Nav> was created with unknown prop '${key}'`);
	});

	const click_handler = () => {
		dispatch("close");
	};

	$$self.$capture_state = () => ({
		createEventDispatcher,
		TopAppBar,
		Row,
		Section,
		Title,
		IconButton,
		dispatch,
		prominent,
		dense,
		secondaryColor
	});

	$$self.$inject_state = $$props => {
		if ("dispatch" in $$props) $$invalidate(0, dispatch = $$props.dispatch);
		if ("prominent" in $$props) $$invalidate(1, prominent = $$props.prominent);
		if ("dense" in $$props) $$invalidate(2, dense = $$props.dense);
		if ("secondaryColor" in $$props) $$invalidate(3, secondaryColor = $$props.secondaryColor);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [dispatch, prominent, dense, secondaryColor, click_handler];
}

class Nav extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$3, create_fragment$3, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Nav",
			options,
			id: create_fragment$3.name
		});
	}
}

/* src\routes\_layout.svelte generated by Svelte v3.38.3 */
const file$1 = "src\\routes\\_layout.svelte";

// (58:4) <Title>
function create_default_slot_14(ctx) {
	let t;

	const block = {
		c: function create() {
			t = text("My App");
		},
		l: function claim(nodes) {
			t = claim_text(nodes, "My App");
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_14.name,
		type: "slot",
		source: "(58:4) <Title>",
		ctx
	});

	return block;
}

// (57:2) <Header>
function create_default_slot_13(ctx) {
	let title;
	let current;

	title = new Title$1({
			props: {
				$$slots: { default: [create_default_slot_14] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(title.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(title.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(title, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const title_changes = {};

			if (dirty & /*$$scope*/ 1024) {
				title_changes.$$scope = { dirty, ctx };
			}

			title.$set(title_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(title.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(title.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(title, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_13.name,
		type: "slot",
		source: "(57:2) <Header>",
		ctx
	});

	return block;
}

// (67:5) <Graphic class="material-icons" aria-hidden="true">
function create_default_slot_12(ctx) {
	let t;

	const block = {
		c: function create() {
			t = text("dashboard");
		},
		l: function claim(nodes) {
			t = claim_text(nodes, "dashboard");
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_12.name,
		type: "slot",
		source: "(67:5) <Graphic class=\\\"material-icons\\\" aria-hidden=\\\"true\\\">",
		ctx
	});

	return block;
}

// (70:5) <Text>
function create_default_slot_11(ctx) {
	let t;

	const block = {
		c: function create() {
			t = text("Dashboard");
		},
		l: function claim(nodes) {
			t = claim_text(nodes, "Dashboard");
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_11.name,
		type: "slot",
		source: "(70:5) <Text>",
		ctx
	});

	return block;
}

// (63:4) <Item      href="/"      on:click={() => setActive('dashboard')}      activated={active === 'dashboard'}>
function create_default_slot_10(ctx) {
	let graphic;
	let t;
	let text_1;
	let current;

	graphic = new Graphic({
			props: {
				class: "material-icons",
				"aria-hidden": "true",
				$$slots: { default: [create_default_slot_12] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	text_1 = new Text({
			props: {
				$$slots: { default: [create_default_slot_11] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(graphic.$$.fragment);
			t = space();
			create_component(text_1.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(graphic.$$.fragment, nodes);
			t = claim_space(nodes);
			claim_component(text_1.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(graphic, target, anchor);
			insert_dev(target, t, anchor);
			mount_component(text_1, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const graphic_changes = {};

			if (dirty & /*$$scope*/ 1024) {
				graphic_changes.$$scope = { dirty, ctx };
			}

			graphic.$set(graphic_changes);
			const text_1_changes = {};

			if (dirty & /*$$scope*/ 1024) {
				text_1_changes.$$scope = { dirty, ctx };
			}

			text_1.$set(text_1_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(graphic.$$.fragment, local);
			transition_in(text_1.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(graphic.$$.fragment, local);
			transition_out(text_1.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(graphic, detaching);
			if (detaching) detach_dev(t);
			destroy_component(text_1, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_10.name,
		type: "slot",
		source: "(63:4) <Item      href=\\\"/\\\"      on:click={() => setActive('dashboard')}      activated={active === 'dashboard'}>",
		ctx
	});

	return block;
}

// (76:5) <Graphic class="material-icons" aria-hidden="true">
function create_default_slot_9(ctx) {
	let t;

	const block = {
		c: function create() {
			t = text("manage_accounts");
		},
		l: function claim(nodes) {
			t = claim_text(nodes, "manage_accounts");
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_9.name,
		type: "slot",
		source: "(76:5) <Graphic class=\\\"material-icons\\\" aria-hidden=\\\"true\\\">",
		ctx
	});

	return block;
}

// (79:5) <Text>
function create_default_slot_8(ctx) {
	let t;

	const block = {
		c: function create() {
			t = text("Users");
		},
		l: function claim(nodes) {
			t = claim_text(nodes, "Users");
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_8.name,
		type: "slot",
		source: "(79:5) <Text>",
		ctx
	});

	return block;
}

// (72:4) <Item      href="/user"      on:click={() => setActive('user')}      activated={active === 'user'}>
function create_default_slot_7(ctx) {
	let graphic;
	let t;
	let text_1;
	let current;

	graphic = new Graphic({
			props: {
				class: "material-icons",
				"aria-hidden": "true",
				$$slots: { default: [create_default_slot_9] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	text_1 = new Text({
			props: {
				$$slots: { default: [create_default_slot_8] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(graphic.$$.fragment);
			t = space();
			create_component(text_1.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(graphic.$$.fragment, nodes);
			t = claim_space(nodes);
			claim_component(text_1.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(graphic, target, anchor);
			insert_dev(target, t, anchor);
			mount_component(text_1, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const graphic_changes = {};

			if (dirty & /*$$scope*/ 1024) {
				graphic_changes.$$scope = { dirty, ctx };
			}

			graphic.$set(graphic_changes);
			const text_1_changes = {};

			if (dirty & /*$$scope*/ 1024) {
				text_1_changes.$$scope = { dirty, ctx };
			}

			text_1.$set(text_1_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(graphic.$$.fragment, local);
			transition_in(text_1.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(graphic.$$.fragment, local);
			transition_out(text_1.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(graphic, detaching);
			if (detaching) detach_dev(t);
			destroy_component(text_1, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_7.name,
		type: "slot",
		source: "(72:4) <Item      href=\\\"/user\\\"      on:click={() => setActive('user')}      activated={active === 'user'}>",
		ctx
	});

	return block;
}

// (85:5) <Graphic class="material-icons" aria-hidden="true">
function create_default_slot_6(ctx) {
	let t;

	const block = {
		c: function create() {
			t = text("article");
		},
		l: function claim(nodes) {
			t = claim_text(nodes, "article");
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_6.name,
		type: "slot",
		source: "(85:5) <Graphic class=\\\"material-icons\\\" aria-hidden=\\\"true\\\">",
		ctx
	});

	return block;
}

// (88:5) <Text>
function create_default_slot_5(ctx) {
	let t;

	const block = {
		c: function create() {
			t = text("Blog");
		},
		l: function claim(nodes) {
			t = claim_text(nodes, "Blog");
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_5.name,
		type: "slot",
		source: "(88:5) <Text>",
		ctx
	});

	return block;
}

// (81:4) <Item      href="/blog"      on:click={() => setActive('blog')}      activated={active === 'blog'}>
function create_default_slot_4(ctx) {
	let graphic;
	let t;
	let text_1;
	let current;

	graphic = new Graphic({
			props: {
				class: "material-icons",
				"aria-hidden": "true",
				$$slots: { default: [create_default_slot_6] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	text_1 = new Text({
			props: {
				$$slots: { default: [create_default_slot_5] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(graphic.$$.fragment);
			t = space();
			create_component(text_1.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(graphic.$$.fragment, nodes);
			t = claim_space(nodes);
			claim_component(text_1.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(graphic, target, anchor);
			insert_dev(target, t, anchor);
			mount_component(text_1, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const graphic_changes = {};

			if (dirty & /*$$scope*/ 1024) {
				graphic_changes.$$scope = { dirty, ctx };
			}

			graphic.$set(graphic_changes);
			const text_1_changes = {};

			if (dirty & /*$$scope*/ 1024) {
				text_1_changes.$$scope = { dirty, ctx };
			}

			text_1.$set(text_1_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(graphic.$$.fragment, local);
			transition_in(text_1.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(graphic.$$.fragment, local);
			transition_out(text_1.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(graphic, detaching);
			if (detaching) detach_dev(t);
			destroy_component(text_1, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_4.name,
		type: "slot",
		source: "(81:4) <Item      href=\\\"/blog\\\"      on:click={() => setActive('blog')}      activated={active === 'blog'}>",
		ctx
	});

	return block;
}

// (62:3) <List>
function create_default_slot_3(ctx) {
	let item0;
	let t0;
	let item1;
	let t1;
	let item2;
	let current;

	item0 = new Item({
			props: {
				href: "/",
				activated: /*active*/ ctx[1] === "dashboard",
				$$slots: { default: [create_default_slot_10] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	item0.$on("click", /*click_handler*/ ctx[5]);

	item1 = new Item({
			props: {
				href: "/user",
				activated: /*active*/ ctx[1] === "user",
				$$slots: { default: [create_default_slot_7] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	item1.$on("click", /*click_handler_1*/ ctx[6]);

	item2 = new Item({
			props: {
				href: "/blog",
				activated: /*active*/ ctx[1] === "blog",
				$$slots: { default: [create_default_slot_4] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	item2.$on("click", /*click_handler_2*/ ctx[7]);

	const block = {
		c: function create() {
			create_component(item0.$$.fragment);
			t0 = space();
			create_component(item1.$$.fragment);
			t1 = space();
			create_component(item2.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(item0.$$.fragment, nodes);
			t0 = claim_space(nodes);
			claim_component(item1.$$.fragment, nodes);
			t1 = claim_space(nodes);
			claim_component(item2.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(item0, target, anchor);
			insert_dev(target, t0, anchor);
			mount_component(item1, target, anchor);
			insert_dev(target, t1, anchor);
			mount_component(item2, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const item0_changes = {};
			if (dirty & /*active*/ 2) item0_changes.activated = /*active*/ ctx[1] === "dashboard";

			if (dirty & /*$$scope*/ 1024) {
				item0_changes.$$scope = { dirty, ctx };
			}

			item0.$set(item0_changes);
			const item1_changes = {};
			if (dirty & /*active*/ 2) item1_changes.activated = /*active*/ ctx[1] === "user";

			if (dirty & /*$$scope*/ 1024) {
				item1_changes.$$scope = { dirty, ctx };
			}

			item1.$set(item1_changes);
			const item2_changes = {};
			if (dirty & /*active*/ 2) item2_changes.activated = /*active*/ ctx[1] === "blog";

			if (dirty & /*$$scope*/ 1024) {
				item2_changes.$$scope = { dirty, ctx };
			}

			item2.$set(item2_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(item0.$$.fragment, local);
			transition_in(item1.$$.fragment, local);
			transition_in(item2.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(item0.$$.fragment, local);
			transition_out(item1.$$.fragment, local);
			transition_out(item2.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(item0, detaching);
			if (detaching) detach_dev(t0);
			destroy_component(item1, detaching);
			if (detaching) detach_dev(t1);
			destroy_component(item2, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_3.name,
		type: "slot",
		source: "(62:3) <List>",
		ctx
	});

	return block;
}

// (61:2) <Content>
function create_default_slot_2(ctx) {
	let list;
	let current;

	list = new List({
			props: {
				$$slots: { default: [create_default_slot_3] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(list.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(list.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(list, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const list_changes = {};

			if (dirty & /*$$scope, active*/ 1026) {
				list_changes.$$scope = { dirty, ctx };
			}

			list.$set(list_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(list.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(list.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(list, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_2.name,
		type: "slot",
		source: "(61:2) <Content>",
		ctx
	});

	return block;
}

// (56:1) <Drawer variant="modal" fixed={false} bind:open>
function create_default_slot_1(ctx) {
	let header;
	let t;
	let content;
	let current;

	header = new Header({
			props: {
				$$slots: { default: [create_default_slot_13] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	content = new Content({
			props: {
				$$slots: { default: [create_default_slot_2] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(header.$$.fragment);
			t = space();
			create_component(content.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(header.$$.fragment, nodes);
			t = claim_space(nodes);
			claim_component(content.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(header, target, anchor);
			insert_dev(target, t, anchor);
			mount_component(content, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const header_changes = {};

			if (dirty & /*$$scope*/ 1024) {
				header_changes.$$scope = { dirty, ctx };
			}

			header.$set(header_changes);
			const content_changes = {};

			if (dirty & /*$$scope, active*/ 1026) {
				content_changes.$$scope = { dirty, ctx };
			}

			content.$set(content_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(header.$$.fragment, local);
			transition_in(content.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(header.$$.fragment, local);
			transition_out(content.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(header, detaching);
			if (detaching) detach_dev(t);
			destroy_component(content, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_1.name,
		type: "slot",
		source: "(56:1) <Drawer variant=\\\"modal\\\" fixed={false} bind:open>",
		ctx
	});

	return block;
}

// (96:1) <AppContent class="app-content">
function create_default_slot$1(ctx) {
	let nav;
	let t;
	let main;
	let div;
	let current;
	nav = new Nav({ $$inline: true });
	nav.$on("close", /*close_handler*/ ctx[9]);
	const default_slot_template = /*#slots*/ ctx[4].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[10], null);

	const block = {
		c: function create() {
			create_component(nav.$$.fragment);
			t = space();
			main = element("main");
			div = element("div");
			if (default_slot) default_slot.c();
			this.h();
		},
		l: function claim(nodes) {
			claim_component(nav.$$.fragment, nodes);
			t = claim_space(nodes);
			main = claim_element(nodes, "MAIN", { class: true });
			var main_nodes = children(main);
			div = claim_element(main_nodes, "DIV", { style: true, class: true });
			var div_nodes = children(div);
			if (default_slot) default_slot.l(div_nodes);
			div_nodes.forEach(detach_dev);
			main_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			set_style(div, "height", "100vh");
			attr_dev(div, "class", "svelte-pwyy9p");
			add_location(div, file$1, 99, 3, 1791);
			attr_dev(main, "class", "main-content svelte-pwyy9p");
			add_location(main, file$1, 98, 2, 1760);
		},
		m: function mount(target, anchor) {
			mount_component(nav, target, anchor);
			insert_dev(target, t, anchor);
			insert_dev(target, main, anchor);
			append_dev(main, div);

			if (default_slot) {
				default_slot.m(div, null);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 1024)) {
					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[10], !current ? -1 : dirty, null, null);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(nav.$$.fragment, local);
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(nav.$$.fragment, local);
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(nav, detaching);
			if (detaching) detach_dev(t);
			if (detaching) detach_dev(main);
			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot$1.name,
		type: "slot",
		source: "(96:1) <AppContent class=\\\"app-content\\\">",
		ctx
	});

	return block;
}

function create_fragment$2(ctx) {
	let div;
	let drawer;
	let updating_open;
	let t0;
	let scrim;
	let t1;
	let appcontent;
	let current;

	function drawer_open_binding(value) {
		/*drawer_open_binding*/ ctx[8](value);
	}

	let drawer_props = {
		variant: "modal",
		fixed: false,
		$$slots: { default: [create_default_slot_1] },
		$$scope: { ctx }
	};

	if (/*open*/ ctx[0] !== void 0) {
		drawer_props.open = /*open*/ ctx[0];
	}

	drawer = new Drawer({ props: drawer_props, $$inline: true });
	binding_callbacks.push(() => bind(drawer, "open", drawer_open_binding));
	scrim = new Scrim({ props: { fixed: false }, $$inline: true });

	appcontent = new AppContent({
			props: {
				class: "app-content",
				$$slots: { default: [create_default_slot$1] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			div = element("div");
			create_component(drawer.$$.fragment);
			t0 = space();
			create_component(scrim.$$.fragment);
			t1 = space();
			create_component(appcontent.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);
			claim_component(drawer.$$.fragment, div_nodes);
			t0 = claim_space(div_nodes);
			claim_component(scrim.$$.fragment, div_nodes);
			t1 = claim_space(div_nodes);
			claim_component(appcontent.$$.fragment, div_nodes);
			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(div, "class", "drawer-container svelte-pwyy9p");
			add_location(div, file$1, 54, 0, 763);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			mount_component(drawer, div, null);
			append_dev(div, t0);
			mount_component(scrim, div, null);
			append_dev(div, t1);
			mount_component(appcontent, div, null);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const drawer_changes = {};

			if (dirty & /*$$scope, active*/ 1026) {
				drawer_changes.$$scope = { dirty, ctx };
			}

			if (!updating_open && dirty & /*open*/ 1) {
				updating_open = true;
				drawer_changes.open = /*open*/ ctx[0];
				add_flush_callback(() => updating_open = false);
			}

			drawer.$set(drawer_changes);
			const appcontent_changes = {};

			if (dirty & /*$$scope, open*/ 1025) {
				appcontent_changes.$$scope = { dirty, ctx };
			}

			appcontent.$set(appcontent_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(drawer.$$.fragment, local);
			transition_in(scrim.$$.fragment, local);
			transition_in(appcontent.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(drawer.$$.fragment, local);
			transition_out(scrim.$$.fragment, local);
			transition_out(appcontent.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			destroy_component(drawer);
			destroy_component(scrim);
			destroy_component(appcontent);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("Layout", slots, ['default']);
	let { segment } = $$props;
	let open = false;
	let active = "dashboard";
	

	function setActive(value) {
		$$invalidate(1, active = value);
		$$invalidate(0, open = false);
	}

	const writable_props = ["segment"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Layout> was created with unknown prop '${key}'`);
	});

	const click_handler = () => setActive("dashboard");
	const click_handler_1 = () => setActive("user");
	const click_handler_2 = () => setActive("blog");

	function drawer_open_binding(value) {
		open = value;
		$$invalidate(0, open);
	}

	const close_handler = () => $$invalidate(0, open = !open);

	$$self.$$set = $$props => {
		if ("segment" in $$props) $$invalidate(3, segment = $$props.segment);
		if ("$$scope" in $$props) $$invalidate(10, $$scope = $$props.$$scope);
	};

	$$self.$capture_state = () => ({
		Drawer,
		AppContent,
		Content,
		Header,
		Title: Title$1,
		Scrim,
		List,
		Item,
		Text,
		Graphic,
		Nav,
		segment,
		open,
		active,
		setActive
	});

	$$self.$inject_state = $$props => {
		if ("segment" in $$props) $$invalidate(3, segment = $$props.segment);
		if ("open" in $$props) $$invalidate(0, open = $$props.open);
		if ("active" in $$props) $$invalidate(1, active = $$props.active);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*segment*/ 8) {
			if (segment) {
				$$invalidate(1, active = segment);
			}
		}
	};

	return [
		open,
		active,
		setActive,
		segment,
		slots,
		click_handler,
		click_handler_1,
		click_handler_2,
		drawer_open_binding,
		close_handler,
		$$scope
	];
}

class Layout extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$2, create_fragment$2, safe_not_equal, { segment: 3 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Layout",
			options,
			id: create_fragment$2.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*segment*/ ctx[3] === undefined && !("segment" in props)) {
			console.warn("<Layout> was created without expected prop 'segment'");
		}
	}

	get segment() {
		throw new Error("<Layout>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set segment(value) {
		throw new Error("<Layout>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src\routes\_error.svelte generated by Svelte v3.38.3 */

const { Error: Error_1$1 } = globals;
const file = "src\\routes\\_error.svelte";

// (38:0) {#if dev && error.stack}
function create_if_block$1(ctx) {
	let pre;
	let t_value = /*error*/ ctx[1].stack + "";
	let t;

	const block = {
		c: function create() {
			pre = element("pre");
			t = text(t_value);
			this.h();
		},
		l: function claim(nodes) {
			pre = claim_element(nodes, "PRE", {});
			var pre_nodes = children(pre);
			t = claim_text(pre_nodes, t_value);
			pre_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(pre, file, 38, 1, 443);
		},
		m: function mount(target, anchor) {
			insert_dev(target, pre, anchor);
			append_dev(pre, t);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*error*/ 2 && t_value !== (t_value = /*error*/ ctx[1].stack + "")) set_data_dev(t, t_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(pre);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$1.name,
		type: "if",
		source: "(38:0) {#if dev && error.stack}",
		ctx
	});

	return block;
}

function create_fragment$1(ctx) {
	let title_value;
	let t0;
	let h1;
	let t1;
	let t2;
	let p;
	let t3_value = /*error*/ ctx[1].message + "";
	let t3;
	let t4;
	let if_block_anchor;
	document.title = title_value = /*status*/ ctx[0];
	let if_block = /*dev*/ ctx[2] && /*error*/ ctx[1].stack && create_if_block$1(ctx);

	const block = {
		c: function create() {
			t0 = space();
			h1 = element("h1");
			t1 = text(/*status*/ ctx[0]);
			t2 = space();
			p = element("p");
			t3 = text(t3_value);
			t4 = space();
			if (if_block) if_block.c();
			if_block_anchor = empty();
			this.h();
		},
		l: function claim(nodes) {
			const head_nodes = query_selector_all("[data-svelte=\"svelte-1o9r2ue\"]", document.head);
			head_nodes.forEach(detach_dev);
			t0 = claim_space(nodes);
			h1 = claim_element(nodes, "H1", { class: true });
			var h1_nodes = children(h1);
			t1 = claim_text(h1_nodes, /*status*/ ctx[0]);
			h1_nodes.forEach(detach_dev);
			t2 = claim_space(nodes);
			p = claim_element(nodes, "P", { class: true });
			var p_nodes = children(p);
			t3 = claim_text(p_nodes, t3_value);
			p_nodes.forEach(detach_dev);
			t4 = claim_space(nodes);
			if (if_block) if_block.l(nodes);
			if_block_anchor = empty();
			this.h();
		},
		h: function hydrate() {
			attr_dev(h1, "class", "svelte-8od9u6");
			add_location(h1, file, 33, 0, 374);
			attr_dev(p, "class", "svelte-8od9u6");
			add_location(p, file, 35, 0, 393);
		},
		m: function mount(target, anchor) {
			insert_dev(target, t0, anchor);
			insert_dev(target, h1, anchor);
			append_dev(h1, t1);
			insert_dev(target, t2, anchor);
			insert_dev(target, p, anchor);
			append_dev(p, t3);
			insert_dev(target, t4, anchor);
			if (if_block) if_block.m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*status*/ 1 && title_value !== (title_value = /*status*/ ctx[0])) {
				document.title = title_value;
			}

			if (dirty & /*status*/ 1) set_data_dev(t1, /*status*/ ctx[0]);
			if (dirty & /*error*/ 2 && t3_value !== (t3_value = /*error*/ ctx[1].message + "")) set_data_dev(t3, t3_value);

			if (/*dev*/ ctx[2] && /*error*/ ctx[1].stack) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block$1(ctx);
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(h1);
			if (detaching) detach_dev(t2);
			if (detaching) detach_dev(p);
			if (detaching) detach_dev(t4);
			if (if_block) if_block.d(detaching);
			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("Error", slots, []);
	let { status } = $$props;
	let { error } = $$props;
	const dev = "development" === "development";
	const writable_props = ["status", "error"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Error> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ("status" in $$props) $$invalidate(0, status = $$props.status);
		if ("error" in $$props) $$invalidate(1, error = $$props.error);
	};

	$$self.$capture_state = () => ({ status, error, dev });

	$$self.$inject_state = $$props => {
		if ("status" in $$props) $$invalidate(0, status = $$props.status);
		if ("error" in $$props) $$invalidate(1, error = $$props.error);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [status, error, dev];
}

class Error$1 extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$1, create_fragment$1, safe_not_equal, { status: 0, error: 1 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Error",
			options,
			id: create_fragment$1.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*status*/ ctx[0] === undefined && !("status" in props)) {
			console.warn("<Error> was created without expected prop 'status'");
		}

		if (/*error*/ ctx[1] === undefined && !("error" in props)) {
			console.warn("<Error> was created without expected prop 'error'");
		}
	}

	get status() {
		throw new Error_1$1("<Error>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set status(value) {
		throw new Error_1$1("<Error>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get error() {
		throw new Error_1$1("<Error>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set error(value) {
		throw new Error_1$1("<Error>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src\node_modules\@sapper\internal\App.svelte generated by Svelte v3.38.3 */

const { Error: Error_1 } = globals;

// (23:1) {:else}
function create_else_block(ctx) {
	let switch_instance;
	let switch_instance_anchor;
	let current;
	const switch_instance_spread_levels = [/*level1*/ ctx[4].props];
	var switch_value = /*level1*/ ctx[4].component;

	function switch_props(ctx) {
		let switch_instance_props = {};

		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
		}

		return {
			props: switch_instance_props,
			$$inline: true
		};
	}

	if (switch_value) {
		switch_instance = new switch_value(switch_props());
	}

	const block = {
		c: function create() {
			if (switch_instance) create_component(switch_instance.$$.fragment);
			switch_instance_anchor = empty();
		},
		l: function claim(nodes) {
			if (switch_instance) claim_component(switch_instance.$$.fragment, nodes);
			switch_instance_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (switch_instance) {
				mount_component(switch_instance, target, anchor);
			}

			insert_dev(target, switch_instance_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const switch_instance_changes = (dirty & /*level1*/ 16)
			? get_spread_update(switch_instance_spread_levels, [get_spread_object(/*level1*/ ctx[4].props)])
			: {};

			if (switch_value !== (switch_value = /*level1*/ ctx[4].component)) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props());
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}
		},
		i: function intro(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(switch_instance_anchor);
			if (switch_instance) destroy_component(switch_instance, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block.name,
		type: "else",
		source: "(23:1) {:else}",
		ctx
	});

	return block;
}

// (21:1) {#if error}
function create_if_block(ctx) {
	let error_1;
	let current;

	error_1 = new Error$1({
			props: {
				error: /*error*/ ctx[0],
				status: /*status*/ ctx[1]
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(error_1.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(error_1.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(error_1, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const error_1_changes = {};
			if (dirty & /*error*/ 1) error_1_changes.error = /*error*/ ctx[0];
			if (dirty & /*status*/ 2) error_1_changes.status = /*status*/ ctx[1];
			error_1.$set(error_1_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(error_1.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(error_1.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(error_1, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(21:1) {#if error}",
		ctx
	});

	return block;
}

// (20:0) <Layout segment="{segments[0]}" {...level0.props}>
function create_default_slot(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block, create_else_block];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*error*/ ctx[0]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	const block = {
		c: function create() {
			if_block.c();
			if_block_anchor = empty();
		},
		l: function claim(nodes) {
			if_block.l(nodes);
			if_block_anchor = empty();
		},
		m: function mount(target, anchor) {
			if_blocks[current_block_type_index].m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if_blocks[current_block_type_index].d(detaching);
			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot.name,
		type: "slot",
		source: "(20:0) <Layout segment=\\\"{segments[0]}\\\" {...level0.props}>",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let layout;
	let current;
	const layout_spread_levels = [{ segment: /*segments*/ ctx[2][0] }, /*level0*/ ctx[3].props];

	let layout_props = {
		$$slots: { default: [create_default_slot] },
		$$scope: { ctx }
	};

	for (let i = 0; i < layout_spread_levels.length; i += 1) {
		layout_props = assign(layout_props, layout_spread_levels[i]);
	}

	layout = new Layout({ props: layout_props, $$inline: true });

	const block = {
		c: function create() {
			create_component(layout.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(layout.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(layout, target, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const layout_changes = (dirty & /*segments, level0*/ 12)
			? get_spread_update(layout_spread_levels, [
					dirty & /*segments*/ 4 && { segment: /*segments*/ ctx[2][0] },
					dirty & /*level0*/ 8 && get_spread_object(/*level0*/ ctx[3].props)
				])
			: {};

			if (dirty & /*$$scope, error, status, level1*/ 147) {
				layout_changes.$$scope = { dirty, ctx };
			}

			layout.$set(layout_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(layout.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(layout.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(layout, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("App", slots, []);
	let { stores } = $$props;
	let { error } = $$props;
	let { status } = $$props;
	let { segments } = $$props;
	let { level0 } = $$props;
	let { level1 = null } = $$props;
	let { notify } = $$props;
	afterUpdate(notify);
	setContext(CONTEXT_KEY, stores);
	const writable_props = ["stores", "error", "status", "segments", "level0", "level1", "notify"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ("stores" in $$props) $$invalidate(5, stores = $$props.stores);
		if ("error" in $$props) $$invalidate(0, error = $$props.error);
		if ("status" in $$props) $$invalidate(1, status = $$props.status);
		if ("segments" in $$props) $$invalidate(2, segments = $$props.segments);
		if ("level0" in $$props) $$invalidate(3, level0 = $$props.level0);
		if ("level1" in $$props) $$invalidate(4, level1 = $$props.level1);
		if ("notify" in $$props) $$invalidate(6, notify = $$props.notify);
	};

	$$self.$capture_state = () => ({
		setContext,
		afterUpdate,
		CONTEXT_KEY,
		Layout,
		Error: Error$1,
		stores,
		error,
		status,
		segments,
		level0,
		level1,
		notify
	});

	$$self.$inject_state = $$props => {
		if ("stores" in $$props) $$invalidate(5, stores = $$props.stores);
		if ("error" in $$props) $$invalidate(0, error = $$props.error);
		if ("status" in $$props) $$invalidate(1, status = $$props.status);
		if ("segments" in $$props) $$invalidate(2, segments = $$props.segments);
		if ("level0" in $$props) $$invalidate(3, level0 = $$props.level0);
		if ("level1" in $$props) $$invalidate(4, level1 = $$props.level1);
		if ("notify" in $$props) $$invalidate(6, notify = $$props.notify);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [error, status, segments, level0, level1, stores, notify];
}

class App extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init$1(this, options, instance, create_fragment, safe_not_equal, {
			stores: 5,
			error: 0,
			status: 1,
			segments: 2,
			level0: 3,
			level1: 4,
			notify: 6
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "App",
			options,
			id: create_fragment.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*stores*/ ctx[5] === undefined && !("stores" in props)) {
			console.warn("<App> was created without expected prop 'stores'");
		}

		if (/*error*/ ctx[0] === undefined && !("error" in props)) {
			console.warn("<App> was created without expected prop 'error'");
		}

		if (/*status*/ ctx[1] === undefined && !("status" in props)) {
			console.warn("<App> was created without expected prop 'status'");
		}

		if (/*segments*/ ctx[2] === undefined && !("segments" in props)) {
			console.warn("<App> was created without expected prop 'segments'");
		}

		if (/*level0*/ ctx[3] === undefined && !("level0" in props)) {
			console.warn("<App> was created without expected prop 'level0'");
		}

		if (/*notify*/ ctx[6] === undefined && !("notify" in props)) {
			console.warn("<App> was created without expected prop 'notify'");
		}
	}

	get stores() {
		throw new Error_1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set stores(value) {
		throw new Error_1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get error() {
		throw new Error_1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set error(value) {
		throw new Error_1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get status() {
		throw new Error_1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set status(value) {
		throw new Error_1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get segments() {
		throw new Error_1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set segments(value) {
		throw new Error_1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get level0() {
		throw new Error_1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set level0(value) {
		throw new Error_1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get level1() {
		throw new Error_1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set level1(value) {
		throw new Error_1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get notify() {
		throw new Error_1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set notify(value) {
		throw new Error_1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

// This file is generated by Sapper — do not edit it!

const ignore = [/^\/blog\.json$/, /^\/blog\/([^/]+?)\.json$/, /^\/user\/form\/([^/]+?)\.json$/];

const components = [
	{
		js: () => Promise.all([import('./index.e807d2b0.js'), __inject_styles(["client-c08a706c.css"])]).then(function(x) { return x[0]; })
	},
	{
		js: () => Promise.all([import('./index.a26d09f9.js'), __inject_styles(["client-c08a706c.css","index-7ed37c94.css"])]).then(function(x) { return x[0]; })
	},
	{
		js: () => Promise.all([import('./[slug].203397d1.js'), __inject_styles(["client-c08a706c.css","[slug]-5bc8f95f.css"])]).then(function(x) { return x[0]; })
	},
	{
		js: () => Promise.all([import('./index.b5ed7ada.js'), __inject_styles(["client-c08a706c.css","index-da2e01cc.css"])]).then(function(x) { return x[0]; })
	},
	{
		js: () => Promise.all([import('./index.f4c5905e.js'), __inject_styles(["client-c08a706c.css"])]).then(function(x) { return x[0]; })
	},
	{
		js: () => Promise.all([import('./[id].85843a76.js'), __inject_styles(["client-c08a706c.css"])]).then(function(x) { return x[0]; })
	}
];

const routes = (d => [
	{
		// index.svelte
		pattern: /^\/$/,
		parts: [
			{ i: 0 }
		]
	},

	{
		// blog/index.svelte
		pattern: /^\/blog\/?$/,
		parts: [
			{ i: 1 }
		]
	},

	{
		// blog/[slug].svelte
		pattern: /^\/blog\/([^/]+?)\/?$/,
		parts: [
			null,
			{ i: 2, params: match => ({ slug: d(match[1]) }) }
		]
	},

	{
		// user/index.svelte
		pattern: /^\/user\/?$/,
		parts: [
			{ i: 3 }
		]
	},

	{
		// user/form/index.svelte
		pattern: /^\/user\/form\/?$/,
		parts: [
			null,
			{ i: 4 }
		]
	},

	{
		// user/form/[id].svelte
		pattern: /^\/user\/form\/([^/]+?)\/?$/,
		parts: [
			null,
			null,
			{ i: 5, params: match => ({ id: d(match[1]) }) }
		]
	}
])(decodeURIComponent);

if (typeof window !== 'undefined') {
	Promise.all([import('./sapper-dev-client.1e7a4a5e.js'), ]).then(function(x) { return x[0]; }).then(client => {
		client.connect(10000);
	});
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function find_anchor(node) {
    while (node && node.nodeName.toUpperCase() !== 'A')
        node = node.parentNode; // SVG <a> elements have a lowercase name
    return node;
}

let uid = 1;
function set_uid(n) {
    uid = n;
}
let cid;
function set_cid(n) {
    cid = n;
}
const _history = typeof history !== 'undefined' ? history : {
    pushState: () => { },
    replaceState: () => { },
    scrollRestoration: 'auto'
};
const scroll_history = {};
function load_current_page() {
    return Promise.resolve().then(() => {
        const { hash, href } = location;
        _history.replaceState({ id: uid }, '', href);
        const target = select_target(new URL(location.href));
        if (target)
            return navigate(target, uid, true, hash);
    });
}
let base_url;
let handle_target;
function init(base, handler) {
    base_url = base;
    handle_target = handler;
    if ('scrollRestoration' in _history) {
        _history.scrollRestoration = 'manual';
    }
    // Adopted from Nuxt.js
    // Reset scrollRestoration to auto when leaving page, allowing page reload
    // and back-navigation from other pages to use the browser to restore the
    // scrolling position.
    addEventListener('beforeunload', () => {
        _history.scrollRestoration = 'auto';
    });
    // Setting scrollRestoration to manual again when returning to this page.
    addEventListener('load', () => {
        _history.scrollRestoration = 'manual';
    });
    addEventListener('click', handle_click);
    addEventListener('popstate', handle_popstate);
}
function extract_query(search) {
    const query = Object.create(null);
    if (search.length > 0) {
        search.slice(1).split('&').forEach(searchParam => {
            const [, key, value = ''] = /([^=]*)(?:=(.*))?/.exec(decodeURIComponent(searchParam.replace(/\+/g, ' ')));
            if (typeof query[key] === 'string')
                query[key] = [query[key]];
            if (typeof query[key] === 'object')
                query[key].push(value);
            else
                query[key] = value;
        });
    }
    return query;
}
function select_target(url) {
    if (url.origin !== location.origin)
        return null;
    if (!url.pathname.startsWith(base_url))
        return null;
    let path = url.pathname.slice(base_url.length);
    if (path === '') {
        path = '/';
    }
    // avoid accidental clashes between server routes and page routes
    if (ignore.some(pattern => pattern.test(path)))
        return;
    for (let i = 0; i < routes.length; i += 1) {
        const route = routes[i];
        const match = route.pattern.exec(path);
        if (match) {
            const query = extract_query(url.search);
            const part = route.parts[route.parts.length - 1];
            const params = part.params ? part.params(match) : {};
            const page = { host: location.host, path, query, params };
            return { href: url.href, route, match, page };
        }
    }
}
function handle_click(event) {
    // Adapted from https://github.com/visionmedia/page.js
    // MIT license https://github.com/visionmedia/page.js#license
    if (which(event) !== 1)
        return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
        return;
    if (event.defaultPrevented)
        return;
    const a = find_anchor(event.target);
    if (!a)
        return;
    if (!a.href)
        return;
    // check if link is inside an svg
    // in this case, both href and target are always inside an object
    const svg = typeof a.href === 'object' && a.href.constructor.name === 'SVGAnimatedString';
    const href = String(svg ? a.href.baseVal : a.href);
    if (href === location.href) {
        if (!location.hash)
            event.preventDefault();
        return;
    }
    // Ignore if tag has
    // 1. 'download' attribute
    // 2. rel='external' attribute
    if (a.hasAttribute('download') || a.getAttribute('rel') === 'external')
        return;
    // Ignore if <a> has a target
    if (svg ? a.target.baseVal : a.target)
        return;
    const url = new URL(href);
    // Don't handle hash changes
    if (url.pathname === location.pathname && url.search === location.search)
        return;
    const target = select_target(url);
    if (target) {
        const noscroll = a.hasAttribute('sapper:noscroll');
        navigate(target, null, noscroll, url.hash);
        event.preventDefault();
        _history.pushState({ id: cid }, '', url.href);
    }
}
function which(event) {
    return event.which === null ? event.button : event.which;
}
function scroll_state() {
    return {
        x: pageXOffset,
        y: pageYOffset
    };
}
function handle_popstate(event) {
    scroll_history[cid] = scroll_state();
    if (event.state) {
        const url = new URL(location.href);
        const target = select_target(url);
        if (target) {
            navigate(target, event.state.id);
        }
        else {
            // eslint-disable-next-line
            location.href = location.href; // nosonar
        }
    }
    else {
        // hashchange
        set_uid(uid + 1);
        set_cid(uid);
        _history.replaceState({ id: cid }, '', location.href);
    }
}
function navigate(dest, id, noscroll, hash) {
    return __awaiter(this, void 0, void 0, function* () {
        const popstate = !!id;
        if (popstate) {
            cid = id;
        }
        else {
            const current_scroll = scroll_state();
            // clicked on a link. preserve scroll state
            scroll_history[cid] = current_scroll;
            cid = id = ++uid;
            scroll_history[cid] = noscroll ? current_scroll : { x: 0, y: 0 };
        }
        yield handle_target(dest);
        if (document.activeElement && (document.activeElement instanceof HTMLElement))
            document.activeElement.blur();
        if (!noscroll) {
            let scroll = scroll_history[id];
            let deep_linked;
            if (hash) {
                // scroll is an element id (from a hash), we need to compute y.
                deep_linked = document.getElementById(hash.slice(1));
                if (deep_linked) {
                    scroll = {
                        x: 0,
                        y: deep_linked.getBoundingClientRect().top + scrollY
                    };
                }
            }
            scroll_history[cid] = scroll;
            if (popstate || deep_linked) {
                scrollTo(scroll.x, scroll.y);
            }
            else {
                scrollTo(0, 0);
            }
        }
    });
}

function get_base_uri(window_document) {
    let baseURI = window_document.baseURI;
    if (!baseURI) {
        const baseTags = window_document.getElementsByTagName('base');
        baseURI = baseTags.length ? baseTags[0].href : window_document.URL;
    }
    return baseURI;
}

let prefetching = null;
let mousemove_timeout;
function start() {
    addEventListener('touchstart', trigger_prefetch);
    addEventListener('mousemove', handle_mousemove);
}
function prefetch(href) {
    const target = select_target(new URL(href, get_base_uri(document)));
    if (target) {
        if (!prefetching || href !== prefetching.href) {
            prefetching = { href, promise: hydrate_target(target) };
        }
        return prefetching.promise;
    }
}
function get_prefetched(target) {
    if (prefetching && prefetching.href === target.href) {
        return prefetching.promise;
    }
    else {
        return hydrate_target(target);
    }
}
function trigger_prefetch(event) {
    const a = find_anchor(event.target);
    if (a && a.rel === 'prefetch') {
        prefetch(a.href);
    }
}
function handle_mousemove(event) {
    clearTimeout(mousemove_timeout);
    mousemove_timeout = setTimeout(() => {
        trigger_prefetch(event);
    }, 20);
}

function goto(href, opts = { noscroll: false, replaceState: false }) {
    const target = select_target(new URL(href, get_base_uri(document)));
    if (target) {
        _history[opts.replaceState ? 'replaceState' : 'pushState']({ id: cid }, '', href);
        return navigate(target, null, opts.noscroll);
    }
    location.href = href;
    return new Promise(() => {
        /* never resolves */
    });
}

function page_store(value) {
    const store = writable(value);
    let ready = true;
    function notify() {
        ready = true;
        store.update(val => val);
    }
    function set(new_value) {
        ready = false;
        store.set(new_value);
    }
    function subscribe(run) {
        let old_value;
        return store.subscribe((new_value) => {
            if (old_value === undefined || (ready && new_value !== old_value)) {
                run(old_value = new_value);
            }
        });
    }
    return { notify, set, subscribe };
}

const initial_data = typeof __SAPPER__ !== 'undefined' && __SAPPER__;
let ready = false;
let root_component;
let current_token;
let root_preloaded;
let current_branch = [];
let current_query = '{}';
const stores = {
    page: page_store({}),
    preloading: writable(null),
    session: writable(initial_data && initial_data.session)
};
let $session;
let session_dirty;
stores.session.subscribe((value) => __awaiter(void 0, void 0, void 0, function* () {
    $session = value;
    if (!ready)
        return;
    session_dirty = true;
    const dest = select_target(new URL(location.href));
    const token = current_token = {};
    const { redirect, props, branch } = yield hydrate_target(dest);
    if (token !== current_token)
        return; // a secondary navigation happened while we were loading
    if (redirect) {
        yield goto(redirect.location, { replaceState: true });
    }
    else {
        yield render(branch, props, buildPageContext(props, dest.page));
    }
}));
let target;
function set_target(node) {
    target = node;
}
function start$1(opts) {
    set_target(opts.target);
    init(initial_data.baseUrl, handle_target$1);
    start();
    if (initial_data.error) {
        return Promise.resolve().then(() => {
            return handle_error();
        });
    }
    return load_current_page();
}
function handle_error() {
    const { host, pathname, search } = location;
    const { session, preloaded, status, error } = initial_data;
    if (!root_preloaded) {
        root_preloaded = preloaded && preloaded[0];
    }
    const props = {
        error,
        status,
        session,
        level0: {
            props: root_preloaded
        },
        level1: {
            props: {
                status,
                error
            },
            component: Error$1
        },
        segments: preloaded
    };
    const query = extract_query(search);
    render([], props, { host, path: pathname, query, params: {}, error });
}
function buildPageContext(props, page) {
    const { error } = props;
    return Object.assign({ error }, page);
}
function handle_target$1(dest) {
    return __awaiter(this, void 0, void 0, function* () {
        if (root_component)
            stores.preloading.set(true);
        const hydrating = get_prefetched(dest);
        const token = current_token = {};
        const hydrated_target = yield hydrating;
        const { redirect } = hydrated_target;
        if (token !== current_token)
            return; // a secondary navigation happened while we were loading
        if (redirect) {
            yield goto(redirect.location, { replaceState: true });
        }
        else {
            const { props, branch } = hydrated_target;
            yield render(branch, props, buildPageContext(props, dest.page));
        }
    });
}
function render(branch, props, page) {
    return __awaiter(this, void 0, void 0, function* () {
        stores.page.set(page);
        stores.preloading.set(false);
        if (root_component) {
            root_component.$set(props);
        }
        else {
            props.stores = {
                page: { subscribe: stores.page.subscribe },
                preloading: { subscribe: stores.preloading.subscribe },
                session: stores.session
            };
            props.level0 = {
                props: yield root_preloaded
            };
            props.notify = stores.page.notify;
            root_component = new App({
                target,
                props,
                hydrate: true
            });
        }
        current_branch = branch;
        current_query = JSON.stringify(page.query);
        ready = true;
        session_dirty = false;
    });
}
function part_changed(i, segment, match, stringified_query) {
    // TODO only check query string changes for preload functions
    // that do in fact depend on it (using static analysis or
    // runtime instrumentation)
    if (stringified_query !== current_query)
        return true;
    const previous = current_branch[i];
    if (!previous)
        return false;
    if (segment !== previous.segment)
        return true;
    if (previous.match) {
        if (JSON.stringify(previous.match.slice(1, i + 2)) !== JSON.stringify(match.slice(1, i + 2))) {
            return true;
        }
    }
}
function hydrate_target(dest) {
    return __awaiter(this, void 0, void 0, function* () {
        const { route, page } = dest;
        const segments = page.path.split('/').filter(Boolean);
        let redirect = null;
        const props = { error: null, status: 200, segments: [segments[0]] };
        const preload_context = {
            fetch: (url, opts) => fetch(url, opts),
            redirect: (statusCode, location) => {
                if (redirect && (redirect.statusCode !== statusCode || redirect.location !== location)) {
                    throw new Error('Conflicting redirects');
                }
                redirect = { statusCode, location };
            },
            error: (status, error) => {
                props.error = typeof error === 'string' ? new Error(error) : error;
                props.status = status;
            }
        };
        if (!root_preloaded) {
            const root_preload = undefined || (() => ({}));
            root_preloaded = initial_data.preloaded[0] || root_preload.call(preload_context, {
                host: page.host,
                path: page.path,
                query: page.query,
                params: {}
            }, $session);
        }
        let branch;
        let l = 1;
        try {
            const stringified_query = JSON.stringify(page.query);
            const match = route.pattern.exec(page.path);
            let segment_dirty = false;
            branch = yield Promise.all(route.parts.map((part, i) => __awaiter(this, void 0, void 0, function* () {
                const segment = segments[i];
                if (part_changed(i, segment, match, stringified_query))
                    segment_dirty = true;
                props.segments[l] = segments[i + 1]; // TODO make this less confusing
                if (!part)
                    return { segment };
                const j = l++;
                if (!session_dirty && !segment_dirty && current_branch[i] && current_branch[i].part === part.i) {
                    return current_branch[i];
                }
                segment_dirty = false;
                const { default: component, preload } = yield components[part.i].js();
                let preloaded;
                if (ready || !initial_data.preloaded[i + 1]) {
                    preloaded = preload
                        ? yield preload.call(preload_context, {
                            host: page.host,
                            path: page.path,
                            query: page.query,
                            params: part.params ? part.params(dest.match) : {}
                        }, $session)
                        : {};
                }
                else {
                    preloaded = initial_data.preloaded[i + 1];
                }
                return (props[`level${j}`] = { component, props: preloaded, segment, match, part: part.i });
            })));
        }
        catch (error) {
            props.error = error;
            props.status = 500;
            branch = [];
        }
        return { redirect, props, branch };
    });
}

start$1({
	target: document.querySelector('#sapper')
});

export { MDCFoundation as $, exclude_internal_props as A, useActions as B, set_attributes as C, action_destroyer as D, update_slot as E, get_spread_update as F, is_function as G, transition_in as H, transition_out as I, run_all as J, binding_callbacks as K, svg_element as L, set_svg_attributes as M, classMap as N, getContext as O, create_component as P, empty as Q, claim_component as R, SvelteComponentDev as S, mount_component as T, get_spread_object as U, group_outros as V, destroy_component as W, check_outros as X, __assign as Y, __awaiter$1 as Z, __extends as _, validate_each_argument as a, __generator as a0, globals as a1, compute_slots as a2, validate_store as a3, component_subscribe as a4, setContext as a5, onMount as a6, dispatch as a7, onDestroy as a8, ponyfill as a9, writable as aa, set_store_value as ab, listen_dev as ac, bind as ad, IconButton as ae, add_flush_callback as af, validate_each_keys as ag, update_keyed_each as ah, outro_and_destroy_block as ai, Ripple as aj, A as ak, Button as al, Span as am, classAdderBuilder as an, Div as ao, set_input_value as ap, tick as aq, events as ar, bubble as as, goto as at, prevent_default as au, children as b, claim_element as c, dispatch_dev as d, element as e, claim_text as f, detach_dev as g, attr_dev as h, init$1 as i, add_location as j, insert_dev as k, append_dev as l, set_data_dev as m, noop as n, space as o, claim_space as p, query_selector_all as q, destroy_each as r, safe_not_equal as s, text as t, create_slot as u, validate_slots as v, assign as w, compute_rest_props as x, forwardEventsBuilder as y, get_current_component as z };
