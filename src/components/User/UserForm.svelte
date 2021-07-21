<script>
    import { onMount, onDestroy } from 'svelte';
    import users from '../../store/users-store';
    import { goto } from '@sapper/app';
    import Textfield from '@smui/textfield';
    import HelperText from '@smui/textfield/helper-text/index';
    import Button, { Label } from '@smui/button';
    import { isEmpty, isValidEmail } from '../../helpers/validation';
   
    export let id = null;

    let nextId = null;
    let name = '';
    let username = '';
    let email = '';
    let website = '';
    let unsubscribe;

    onMount(() => {
        unsubscribe = users.subscribe(items => {
            const selectedUser = items.find(i => i.id === id);

            nextId = items.length + 1;

            if (selectedUser) {
                name = selectedUser.name;
                username = selectedUser.username;
                email = selectedUser.email;
                website = selectedUser.website;
            }
        });
    })

    onDestroy(() => {
        if (unsubscribe) {
            unsubscribe();
        }
    })

    $: nameValid = !isEmpty(name);
    $: usernameValid = !isEmpty(username);
    $: emailValid = isValidEmail(email);
    $: websiteValid = !isEmpty(website);
    $: formIsValid = nameValid &&
        usernameValid &&
        emailValid &&
        websiteValid;

    function onSubmit() {
        const userData = {
            name: name,
            username: username,
            email: email,
            website: website
        };

        if (id) {
            users.updateUser(id, userData);
        } else {
            users.addUser({ ...userData, id: nextId });
        }
        
        goto('/user');
    }
</script>

<div class="w-50 m-auto">
    <form autocomplete="off"
        on:submit|preventDefault="{onSubmit}">
        <div class="columns margins">
            <Textfield variant="outlined"
                bind:value={name}
                label="Name"
                class="w-100"
                required>
                <HelperText validationMsg slot="helper">
                    Name is Required
                </HelperText>
            </Textfield>
            
            <Textfield variant="outlined"
                bind:value={username}
                label="Username"
                class="w-100"
                required>
                <HelperText validationMsg slot="helper">
                    Username is Required
                </HelperText>
            </Textfield>
            
            <Textfield variant="outlined"
                type="email"
                bind:value={email}
                label="E-Mail"
                class="w-100"
                required>
                <HelperText validationMsg slot="helper">
                    That's not a valid email address
                </HelperText>
            </Textfield>
            
            <Textfield variant="outlined"
                bind:value={website}
                label="Website"
                class="w-100"
                required>
                <HelperText validationMsg slot="helper">
                    Website is Required
                </HelperText>
            </Textfield>
        </div>
    </form>
</div>

<div class="w-50 m-auto d-flex">
    <Button variant="raised"
        class="w-50 m-5px"
        disabled="{!formIsValid}"
        on:click={onSubmit}>
        <Label>Save</Label>
    </Button>
    
    <Button variant="outlined"
        class="w-50 m-5px"
        href="/user">
        <Label>Cancel</Label>
    </Button>
</div>
