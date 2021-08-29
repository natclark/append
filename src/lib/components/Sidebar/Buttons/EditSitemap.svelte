<script>
    import { getContext } from 'svelte';
    import EditSitemap from '../Modals/EditSitemap.svelte';

    export let path;

    const { open, } = getContext(`simple-modal`);

    const click = () => open(EditSitemap, { path, });
</script>

<button class="secondary" on:click={click}>Edit</button>
