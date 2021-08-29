<script>
    import { getContext } from 'svelte';
    import EditSecurityTXT from '../Modals/EditSecurityTXT.svelte';

    export let path;

    const { open, } = getContext(`simple-modal`);

    const click = () => open(EditSecurityTXT, { path, });
</script>

<button class="secondary" on:click={click}>Edit</button>
