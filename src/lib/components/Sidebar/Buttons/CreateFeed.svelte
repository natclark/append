<script>
    import { getContext } from 'svelte';
    import CreateFeed from '../Modals/CreateFeed.svelte';

    const { open, } = getContext(`simple-modal`);

    const click = () => open(CreateFeed);
</script>

<button class="primary" on:click={click}>Create Feed</button>
