<script>
    import { getContext } from 'svelte';
    import EditMetaTags from '../Modals/EditMetaTags.svelte';

    const { open, } = getContext(`simple-modal`);

    const click = () => open(EditMetaTags);
</script>

<button class="primary" on:click={click}>Edit Meta Tags</button>
