<script>
    import { getContext } from 'svelte';
    import EditBrowserconfig from '../Modals/EditBrowserconfig.svelte';

    export let path;

    const { open, } = getContext(`simple-modal`);

    const click = () => open(EditBrowserconfig, { path, });
</script>

<button class="secondary" on:click={click}>Edit</button>
