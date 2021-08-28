<script>
    import { getContext } from 'svelte';
    import EditFeed from '../Modals/EditFeed.svelte';

    export let path;

    const { open, } = getContext(`simple-modal`);

    const click = () => open(EditFeed, { path, });
</script>

<button class="primary" on:click={click}>Edit</button>
