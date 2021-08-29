<script>
    import { getContext } from 'svelte';
    import EditManifest from '../Modals/EditManifest.svelte';

    export let path;

    const { open, } = getContext(`simple-modal`);

    const click = () => open(EditManifest, { path, });
</script>

<button class="secondary" on:click={click}>Edit</button>
