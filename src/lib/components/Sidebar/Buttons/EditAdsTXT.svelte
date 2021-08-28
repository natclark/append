<script>
    import { getContext } from 'svelte';
    import EditAdsTXT from '../Modals/EditAdsTXT.svelte';

    export let path;

    const { open, } = getContext(`simple-modal`);

    const click = () => open(EditAdsTXT, { path, });
</script>

<button class="primary" on:click={click}>Edit</button>
