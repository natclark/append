<script>
    import { getContext } from 'svelte';
    import EditRobotsTXT from '../Modals/EditRobotsTXT.svelte';

    export let path;

    const { open, } = getContext(`simple-modal`);

    const click = () => open(EditRobotsTXT, { path, });
</script>

<button class="secondary" on:click={click}>Edit</button>
