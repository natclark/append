<script>
    import { getContext } from 'svelte';
    import UploadFile from './UploadFile.svelte';

    const { open, } = getContext(`simple-modal`);

    const click = () => open(UploadFile);
</script>

<button class="primary" on:click={click}>Upload File</button>
