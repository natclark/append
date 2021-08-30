<script>
    import websites from '$lib/stores/websites';
    import Website from '$lib/websites/Website.svelte';
</script>

<h1>My Websites</h1>

<div class="flex">
    {#each $websites as website}
        <Website {website} />
    {/each}
</div>

<style>
    .flex {
        align-items: center;
        display: flex;
        justify-content: space-around;
    }
</style>
