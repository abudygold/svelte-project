import { S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, v as validate_slots, P as create_component, R as claim_component, T as mount_component, n as noop, H as transition_in, I as transition_out, W as destroy_component } from './client.09a0b5a4.js';
import { U as UserForm } from './UserForm.56faeeb0.js';
import './prefixFilter.5cb4521a.js';

/* src\routes\user\form\index.svelte generated by Svelte v3.38.3 */

function create_fragment(ctx) {
	let userform;
	let current;
	userform = new UserForm({ $$inline: true });

	const block = {
		c: function create() {
			create_component(userform.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(userform.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYWY3ZTFmMDQuanMiLCJzb3VyY2VzIjpbXSwic291cmNlc0NvbnRlbnQiOltdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==
