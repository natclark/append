<script>
    import { getContext } from 'svelte';
    import CreatePage from '../Modals/CreatePage.svelte';

    const { open, } = getContext(`simple-modal`);

    const click = () => open(CreatePage);
</script>

<button class="primary" on:click={click}>Create Page</button>
