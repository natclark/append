<script>
    import { getContext } from 'svelte';
    import EditProduct from '../Modals/EditProduct.svelte';

    export let id;

    const { open, } = getContext(`simple-modal`);

    const click = () => open(EditProduct, { id, });
</script>

<button class="primary" on:click={click}>Edit</button>
