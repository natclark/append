<script>
    import { getContext } from 'svelte';
    import EditFavicons from './EditFavicons.svelte';

    const { open, } = getContext(`simple-modal`);

    const click = () => open(EditFavicons);
</script>

<button class="primary" on:click={click}>Edit Favicons</button>
