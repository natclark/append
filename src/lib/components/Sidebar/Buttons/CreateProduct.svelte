<script>
    import { getContext } from 'svelte';
    import prices from '$lib/stores/prices';
    import CreateProduct from '../Modals/CreateProduct.svelte';

    const { open, } = getContext(`simple-modal`);

    const click = () => $prices.length > 0 ? open(CreateProduct) : alert(`You must first create at least one price!`);
</script>

<button class="primary" on:click={click}>Create Product</button>
