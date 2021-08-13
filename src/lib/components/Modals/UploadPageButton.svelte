<script>
    import { getContext } from 'svelte';
    import UploadPage from './UploadPage.svelte';

    const { open, } = getContext(`simple-modal`);

    const click = () => open(UploadPage);
</script>

<button class="primary" on:click={click}>Upload Page</button>
