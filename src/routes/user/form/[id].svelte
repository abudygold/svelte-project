<script context="module">
    export async function preload({ params }) {
        const res = await this.fetch(`user/form/${params.id}.json`);
        const data = await res.json();

        if (res.status === 200) {
            return { id: data.id };
        } else {
            this.error(res.status, data.message);
        }
    }
</script>

<script>
    import UserForm from '../../../components/User/UserForm.svelte';

    export let id;
</script>

<svelte:head>
    <title>Update User</title>
</svelte:head>

<UserForm {id} />
