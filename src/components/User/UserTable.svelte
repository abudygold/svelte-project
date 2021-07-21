<script>
	import DataTable, {
		Head,
		Body,
		Row,
		Cell,
		Label
	} from '@smui/data-table';
  	import IconButton from '@smui/icon-button';
    import Button, { Label as LabelButton, Icon } from '@smui/button';
    import users from '../../store/users-store';

    export let fetchedUsers;
      
	let sort = 'id';
	let sortDirection = 'ascending';

    function handleSort() {
        fetchedUsers.sort((a, b) => {
            const [aVal, bVal] = [a[sort], b[sort]][
                sortDirection === 'ascending' ? 'slice' : 'reverse'
            ]();

            if (typeof aVal === 'string') {
                return aVal.localeCompare(bVal);
            }

            return aVal - bVal;
        });
    }

    function onDelete(id) {
        users.deleteUser(id);
    }
</script>

<DataTable
    sortable
    bind:sort
    bind:sortDirection
    on:MDCDataTable:sorted={handleSort}
    table$aria-label="User list"
    style="width: 100%;">
    <Head>
        <Row>
            <Cell numeric columnId="id">
                <IconButton class="material-icons">arrow_upward</IconButton>
                <Label>ID</Label>
            </Cell>
            <Cell columnId="name" style="width: 100%;">
                <Label>Name</Label>
                <IconButton class="material-icons">arrow_upward</IconButton>
            </Cell>
            <Cell columnId="username">
                <Label>Username</Label>
                <IconButton class="material-icons">arrow_upward</IconButton>
            </Cell>
            <Cell columnId="email" l>
                <Label>Email</Label>
                <IconButton class="material-icons">arrow_upward</IconButton>
            </Cell>
            <Cell sortable={false}>Website</Cell>
            <Cell sortable={false}>Actions</Cell>
        </Row>
    </Head>
    <Body>
        {#each fetchedUsers as item (item.id)}
            <Row>
                <Cell numeric>{item.id}</Cell>
                <Cell>{item.name}</Cell>
                <Cell>{item.username}</Cell>
                <Cell>{item.email}</Cell>
                <Cell>{item.website}</Cell>
                <Cell>
                    <Button href="/user/form/{item.id}" variant="raised">
                        <Icon class="material-icons">
                            edit
                        </Icon>

                        <LabelButton>Edit</LabelButton>
                    </Button>

                    <Button on:click={onDelete(item.id)} variant="outlined">
                        <Icon class="material-icons">
                            remove_circle_outline
                        </Icon>

                        <LabelButton>Delete</LabelButton>
                    </Button>
                </Cell>
            </Row>
        {/each}
    </Body>
</DataTable>
