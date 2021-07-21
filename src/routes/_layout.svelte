<script>
	import Drawer, {
		AppContent,
		Content,
		Header,
		Title,
		Scrim,
	} from '@smui/drawer';
	import List, {
		Item,
		Text,
		Graphic,
	} from '@smui/list';
	import Nav from '../components/Layout/Nav.svelte';

	export let segment;
   
	let open = false;
	let active = 'dashboard';

	$: if (segment) {
		active = segment;
	};
   
	function setActive(value) {
		active = value;
		open = false;
	}
</script>
   
<style>
	.drawer-container {
		position: relative;
		display: flex;
		max-width: 100%;
		max-height: 100vh;
		overflow: hidden;
		z-index: 0;
	}
   
	* :global(.app-content) {
		flex: auto;
		position: relative;
		flex-grow: 1;
	}
   
	.main-content {
		overflow: auto;
		padding: 16px;
		height: 100%;
		min-height: 100vh;
		box-sizing: border-box;
		padding-bottom: 100px;
	}
</style>

<div class="drawer-container">
	<Drawer variant="modal" fixed={false} bind:open>
		<Header>
				<Title>My App</Title>
		</Header>

		<Content>
			<List>
				<Item
					href="/"
					on:click={() => setActive('dashboard')}
					activated={active === 'dashboard'}>
					<Graphic class="material-icons" aria-hidden="true">
						dashboard
					</Graphic>
					<Text>Dashboard</Text>
				</Item>
				<Item
					href="/user"
					on:click={() => setActive('user')}
					activated={active === 'user'}>
					<Graphic class="material-icons" aria-hidden="true">
						manage_accounts
					</Graphic>
					<Text>Users</Text>
				</Item>
				<Item
					href="/blog"
					on:click={() => setActive('blog')}
					activated={active === 'blog'}>
					<Graphic class="material-icons" aria-hidden="true">
						article
					</Graphic>
					<Text>Blog</Text>
				</Item>
			</List>
		</Content>
	</Drawer>
   
	<Scrim fixed={false} />

	<AppContent class="app-content">
		<Nav on:close={() => (open = !open)} />

		<main class="main-content">
			<!-- <div style="height: 100vh;"> -->
			<slot></slot>
			<!-- </div> -->
		</main>
	</AppContent>
</div>
