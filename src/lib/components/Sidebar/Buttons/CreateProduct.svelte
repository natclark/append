<script>
    import { getContext } from 'svelte';
    import CreateProduct from '../Modals/CreateProduct.svelte';

    const { open, } = getContext(`simple-modal`);

    const click = () => open(CreateProduct);
</script>

<button class="primary" on:click={click}>Create Product</button>
