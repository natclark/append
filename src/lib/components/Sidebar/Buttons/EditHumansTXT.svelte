<script>
    import { getContext } from 'svelte';
    import EditHumansTXT from '../Modals/EditHumansTXT.svelte';

    export let path;

    const { open, } = getContext(`simple-modal`);

    const click = () => open(EditHumansTXT, { path, });
</script>

<button class="primary" on:click={click}>Edit</button>
