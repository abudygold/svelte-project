import { S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, a8 as globals, v as validate_slots, P as create_component, R as claim_component, T as mount_component, n as noop, H as transition_in, I as transition_out, W as destroy_component } from './client.1425ee8b.js';
import { U as UserForm } from './UserForm.d4a4b198.js';
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
	const res = await this.fetch(`user/form/${params.id}.json`);
	const data = await res.json();
	console.log(data);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiW2lkXS44NDc0NWI1Mi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3JvdXRlcy91c2VyL2Zvcm0vW2lkXS5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdCBjb250ZXh0PVwibW9kdWxlXCI+XHJcbiAgICBleHBvcnQgYXN5bmMgZnVuY3Rpb24gcHJlbG9hZCh7IHBhcmFtcyB9KSB7XHJcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy5mZXRjaChgdXNlci9mb3JtLyR7cGFyYW1zLmlkfS5qc29uYCk7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlcy5qc29uKCk7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cclxuICAgICAgICBpZiAocmVzLnN0YXR1cyA9PT0gMjAwKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgICAgICByZXR1cm4geyB1c2VyOiBkYXRhIH07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5lcnJvcihyZXMuc3RhdHVzLCBkYXRhLm1lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuPC9zY3JpcHQ+XHJcblxyXG48c2NyaXB0PlxyXG4gICAgaW1wb3J0IFVzZXJGb3JtIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvVXNlci9Vc2VyRm9ybS5zdmVsdGUnO1xyXG5cclxuICAgIGV4cG9ydCBsZXQgdXNlcjtcclxuXHJcbiAgICAkOiBjb25zb2xlLmxvZyh1c2VyKTtcclxuPC9zY3JpcHQ+XHJcblxyXG48VXNlckZvcm0gLz5cclxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2VBQzBCLE9BQU8sR0FBRyxNQUFNO09BQzVCLEdBQUcsU0FBUyxJQUFJLENBQUMsS0FBSyxjQUFjLE1BQU0sQ0FBQyxFQUFFO09BQzdDLElBQUksU0FBUyxHQUFHLENBQUMsSUFBSTtDQUUzQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUk7O0tBRVosR0FBRyxDQUFDLE1BQU0sS0FBSyxHQUFHO0VBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSTtXQUNQLElBQUksRUFBRSxJQUFJOztFQUVuQixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU87Ozs7Ozs7T0FRaEMsSUFBSTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FFWixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==
