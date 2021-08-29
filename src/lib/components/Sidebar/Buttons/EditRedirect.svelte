<script>
    import { getContext } from 'svelte';
    import EditRedirect from '../Modals/EditRedirect.svelte';

    export let path;

    const { open, } = getContext(`simple-modal`);

    const click = () => open(EditRedirect, { path, });
</script>

<button class="secondary" on:click={click}>Edit</button>
