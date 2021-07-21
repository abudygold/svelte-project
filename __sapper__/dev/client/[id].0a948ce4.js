import { S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, a8 as globals, v as validate_slots, P as create_component, R as claim_component, T as mount_component, n as noop, H as transition_in, I as transition_out, W as destroy_component } from './client.09a0b5a4.js';
import { U as UserForm } from './UserForm.56faeeb0.js';
import './prefixFilter.5cb4521a.js';

/* src\routes\user\form\[id].svelte generated by Svelte v3.38.3 */

const { console: console_1 } = globals;

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

async function preload({ params }) {
	const userId = params.id;
	const res = await this.fetch(`user/form/${userId}.json`);
	const data = await res.json();

	if (res.status === 200) {
		console.log(data);
		return { user: data };
	} else {
		this.error(res.status, data.message);
	}
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("U5Bidu5D", slots, []);
	let { user } = $$props;
	const writable_props = ["user"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1.warn(`<U5Bidu5D> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ("user" in $$props) $$invalidate(0, user = $$props.user);
	};

	$$self.$capture_state = () => ({ preload, UserForm, user });

	$$self.$inject_state = $$props => {
		if ("user" in $$props) $$invalidate(0, user = $$props.user);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*user*/ 1) {
			console.log(user);
		}
	};

	return [user];
}

class U5Bidu5D extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, { user: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "U5Bidu5D",
			options,
			id: create_fragment.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*user*/ ctx[0] === undefined && !("user" in props)) {
			console_1.warn("<U5Bidu5D> was created without expected prop 'user'");
		}
	}

	get user() {
		throw new Error("<U5Bidu5D>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set user(value) {
		throw new Error("<U5Bidu5D>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

export default U5Bidu5D;
export { preload };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiW2lkXS4wYTk0OGNlNC5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3JvdXRlcy91c2VyL2Zvcm0vW2lkXS5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdCBjb250ZXh0PVwibW9kdWxlXCI+XHJcbiAgICBleHBvcnQgYXN5bmMgZnVuY3Rpb24gcHJlbG9hZCh7IHBhcmFtcyB9KSB7XHJcbiAgICAgICAgY29uc3QgdXNlcklkID0gcGFyYW1zLmlkO1xyXG5cclxuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLmZldGNoKGB1c2VyL2Zvcm0vJHt1c2VySWR9Lmpzb25gKTtcclxuICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzLmpzb24oKTtcclxuXHJcbiAgICAgICAgaWYgKHJlcy5zdGF0dXMgPT09IDIwMCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdXNlcjogZGF0YSB9O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZXJyb3IocmVzLnN0YXR1cywgZGF0YS5tZXNzYWdlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbjwvc2NyaXB0PlxyXG5cclxuPHNjcmlwdD5cclxuICAgIGltcG9ydCBVc2VyRm9ybSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL1VzZXIvVXNlckZvcm0uc3ZlbHRlJztcclxuXHJcbiAgICBleHBvcnQgbGV0IHVzZXI7XHJcblxyXG4gICAgJDogY29uc29sZS5sb2codXNlcik7XHJcbjwvc2NyaXB0PlxyXG5cclxuPFVzZXJGb3JtIC8+XHJcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztlQUMwQixPQUFPLEdBQUcsTUFBTTtPQUM1QixNQUFNLEdBQUcsTUFBTSxDQUFDLEVBQUU7T0FFbEIsR0FBRyxTQUFTLElBQUksQ0FBQyxLQUFLLGNBQWMsTUFBTTtPQUMxQyxJQUFJLFNBQVMsR0FBRyxDQUFDLElBQUk7O0tBRXZCLEdBQUcsQ0FBQyxNQUFNLEtBQUssR0FBRztFQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUk7V0FDUCxJQUFJLEVBQUUsSUFBSTs7RUFFbkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPOzs7Ozs7O09BUWhDLElBQUk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBRVosT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=