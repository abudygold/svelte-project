<script>
	import { createEventDispatcher } from 'svelte';
	import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
	import IconButton from '@smui/icon-button';

	let dispatch = createEventDispatcher();
 
	let prominent = false;
	let dense = false;
	let secondaryColor = false;
</script>

<TopAppBar
	variant="static"
	{prominent}
	{dense}
	color={secondaryColor ? 'secondary' : 'primary'}>
	<Row>
		<Section>
			<IconButton class="material-icons" on:click={() => {dispatch('close')}}>
				menu
			</IconButton>

			<Title>
				My App
			</Title>
		</Section>
	</Row>
</TopAppBar>
