<script>
    import { getContext } from 'svelte';
    import CreatePrice from '../Modals/CreatePrice.svelte';

    const { open, } = getContext(`simple-modal`);

    const click = () => open(CreatePrice);
</script>

<button class="primary" on:click={click}>Create Price</button>
