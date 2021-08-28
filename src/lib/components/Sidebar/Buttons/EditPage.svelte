<script>
    import { getContext } from 'svelte';
    import EditPage from '../Modals/EditPage.svelte';

    export let path;

    const { open, } = getContext(`simple-modal`);

    const click = () => open(EditPage, { path, });
</script>

<button class="primary" on:click={click}>Edit</button>
