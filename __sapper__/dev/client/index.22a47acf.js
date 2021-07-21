import { S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, v as validate_slots, o as space, P as create_component, q as query_selector_all, g as detach_dev, p as claim_space, R as claim_component, k as insert_dev, T as mount_component, n as noop, H as transition_in, I as transition_out, W as destroy_component } from './client.ca603276.js';
import { U as UserForm } from './UserForm.96f97c1a.js';
import './CommonLabel.fe31601d.js';

/* src\routes\user\form\index.svelte generated by Svelte v3.38.3 */

function create_fragment(ctx) {
	let t;
	let userform;
	let current;
	userform = new UserForm({ $$inline: true });

	const block = {
		c: function create() {
			t = space();
			create_component(userform.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			const head_nodes = query_selector_all("[data-svelte=\"svelte-1m3gnzi\"]", document.head);
			head_nodes.forEach(detach_dev);
			t = claim_space(nodes);
			claim_component(userform.$$.fragment, nodes);
			this.h();
		},
		h: function hydrate() {
			document.title = "Create User";
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
			mount_component(userform, target, anchor);
			current = true;
		},
		p: noop,
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

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("Form", slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Form> was created with unknown prop '${key}'`);
	});

	$$self.$capture_state = () => ({ UserForm });
	return [];
}

class Form extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Form",
			options,
			id: create_fragment.name
		});
	}
}

export default Form;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguMjJhNDdhY2YuanMiLCJzb3VyY2VzIjpbXSwic291cmNlc0NvbnRlbnQiOltdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==
