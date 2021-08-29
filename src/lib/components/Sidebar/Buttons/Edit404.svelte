<script>
    import { getContext } from 'svelte';
    import Edit404 from '../Modals/Edit404.svelte';

    export let path;

    const { open, } = getContext(`simple-modal`);

    const click = () => open(Edit404, { path, });
</script>

<button class="secondary" on:click={click}>Edit</button>
