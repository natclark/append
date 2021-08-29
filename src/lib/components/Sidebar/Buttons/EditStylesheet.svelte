<script>
    import { getContext } from 'svelte';
    import EditStylesheet from '../Modals/EditStylesheet.svelte';

    export let path;

    const { open, } = getContext(`simple-modal`);

    const click = () => open(EditStylesheet, { path, });
</script>

<button class="secondary" on:click={click}>Edit</button>
