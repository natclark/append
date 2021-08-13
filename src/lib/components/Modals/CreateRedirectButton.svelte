<script>
    import { getContext } from 'svelte';
    import CreateRedirect from './CreateRedirect.svelte';

    const { open, } = getContext(`simple-modal`);

    const click = () => open(CreateRedirect);
</script>

<button class="primary" on:click={click}>Create Redirect</button>
