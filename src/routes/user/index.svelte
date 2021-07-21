<script>
	import { onMount, onDestroy } from 'svelte';
	import users from '../../store/users-store';
	import Button, { Label } from '@smui/button';
	import LoadingSpinner from '../../components/UI/component/LoadingSpinner.svelte';
	import UserTable from '../../components/User/UserTable.svelte';
	
	let fetchedUsers;

	let unsubscribe;
	let isLoading = true;

	onMount(() => {
		unsubscribe = users.subscribe((items) => {
			fetchedUsers = items;
			isLoading = false;
		})
	});

	onDestroy(() => {
		if (unsubscribe) {
			unsubscribe();
		}
	});
</script>

<svelte:head>
	<title>Dashboard</title>
</svelte:head>

<div class="flex-end-btn">
	<Button href="/user/form" variant="raised">
		<Label>Add New User</Label>
	</Button>
</div>

{#if isLoading}
	<LoadingSpinner />
{:else}
	<UserTable {fetchedUsers} />
{/if}
