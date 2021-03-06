import { S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, v as validate_slots, o as space, P as create_component, q as query_selector_all, g as detach_dev, p as claim_space, R as claim_component, k as insert_dev, T as mount_component, H as transition_in, I as transition_out, W as destroy_component } from './client.ca603276.js';
import { U as UserForm } from './UserForm.96f97c1a.js';
import './CommonLabel.fe31601d.js';

/* src\routes\user\form\[id].svelte generated by Svelte v3.38.3 */

function create_fragment(ctx) {
	let t;
	let userform;
	let current;

	userform = new UserForm({
			props: { id: /*id*/ ctx[0] },
			$$inline: true
		});

	const block = {
		c: function create() {
			t = space();
			create_component(userform.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			const head_nodes = query_selector_all("[data-svelte=\"svelte-1qjz0vx\"]", document.head);
			head_nodes.forEach(detach_dev);
			t = claim_space(nodes);
			claim_component(userform.$$.fragment, nodes);
			this.h();
		},
		h: function hydrate() {
			document.title = "Update User";
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
			mount_component(userform, target, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const userform_changes = {};
			if (dirty & /*id*/ 1) userform_changes.id = /*id*/ ctx[0];
			userform.$set(userform_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(userform.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(userform.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t);
			destroy_component(userform, detaching);
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

async function preload({ params }) {
	const res = await this.fetch(`user/form/${params.id}.json`);
	const data = await res.json();

	if (res.status === 200) {
		return { id: data.id };
	} else {
		this.error(res.status, data.message);
	}
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("U5Bidu5D", slots, []);
	let { id } = $$props;
	const writable_props = ["id"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<U5Bidu5D> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ("id" in $$props) $$invalidate(0, id = $$props.id);
	};

	$$self.$capture_state = () => ({ preload, UserForm, id });

	$$self.$inject_state = $$props => {
		if ("id" in $$props) $$invalidate(0, id = $$props.id);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [id];
}

class U5Bidu5D extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, { id: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "U5Bidu5D",
			options,
			id: create_fragment.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*id*/ ctx[0] === undefined && !("id" in props)) {
			console.warn("<U5Bidu5D> was created without expected prop 'id'");
		}
	}

	get id() {
		throw new Error("<U5Bidu5D>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set id(value) {
		throw new Error("<U5Bidu5D>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

export default U5Bidu5D;
export { preload };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiW2lkXS5kOTRmNTYxNi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3JvdXRlcy91c2VyL2Zvcm0vW2lkXS5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdCBjb250ZXh0PVwibW9kdWxlXCI+XHJcbiAgICBleHBvcnQgYXN5bmMgZnVuY3Rpb24gcHJlbG9hZCh7IHBhcmFtcyB9KSB7XHJcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy5mZXRjaChgdXNlci9mb3JtLyR7cGFyYW1zLmlkfS5qc29uYCk7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlcy5qc29uKCk7XHJcblxyXG4gICAgICAgIGlmIChyZXMuc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHsgaWQ6IGRhdGEuaWQgfTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmVycm9yKHJlcy5zdGF0dXMsIGRhdGEubWVzc2FnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG48L3NjcmlwdD5cclxuXHJcbjxzY3JpcHQ+XHJcbiAgICBpbXBvcnQgVXNlckZvcm0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9Vc2VyL1VzZXJGb3JtLnN2ZWx0ZSc7XHJcblxyXG4gICAgZXhwb3J0IGxldCBpZDtcclxuPC9zY3JpcHQ+XHJcblxyXG48c3ZlbHRlOmhlYWQ+XHJcbiAgICA8dGl0bGU+VXBkYXRlIFVzZXI8L3RpdGxlPlxyXG48L3N2ZWx0ZTpoZWFkPlxyXG5cclxuPFVzZXJGb3JtIHtpZH0gLz5cclxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2VBQzBCLE9BQU8sR0FBRyxNQUFNO09BQzVCLEdBQUcsU0FBUyxJQUFJLENBQUMsS0FBSyxjQUFjLE1BQU0sQ0FBQyxFQUFFO09BQzdDLElBQUksU0FBUyxHQUFHLENBQUMsSUFBSTs7S0FFdkIsR0FBRyxDQUFDLE1BQU0sS0FBSyxHQUFHO1dBQ1QsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFOztFQUVwQixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU87Ozs7Ozs7T0FRaEMsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=
