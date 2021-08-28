<script>
    import { getContext } from 'svelte';
    import CreateSitemap from '../Modals/CreateSitemap.svelte';

    const { open, } = getContext(`simple-modal`);

    const click = () => open(CreateSitemap);
</script>

<button class="primary" on:click={click}>Create Sitemap</button>
