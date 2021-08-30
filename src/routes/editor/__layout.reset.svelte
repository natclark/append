<script context="module">
    import { browser, dev } from '$app/env';
    import { page } from '$app/stores';
    export const hydrate = dev;
    export const router = browser;
    export const prerender = true;
</script>

<script>
    import '$lib/editor/global.scss';
    import Navbar from '$lib/components/Navbar/index.svelte';
    import Sidebar from '$lib/components/Sidebar/index.svelte';
    import Details from '$lib/components/Details/index.svelte';
</script>

<Navbar />

<div>
    <Sidebar />
        <slot />
    <Details />
</div>

<style>
    div {
        display: flex;
    }
</style>
