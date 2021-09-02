<script>
    import { getContext } from 'svelte';
    import EditPrice from '../Modals/EditPrice.svelte';

    export let id;

    const { open, } = getContext(`simple-modal`);

    const click = () => open(EditPrice, { id, });
</script>

<button class="primary" on:click={click}>Edit Price</button>
