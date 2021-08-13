<div class="grid">
    <slot />
</div>

<style>
    .grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
    }
    :global(.grid > *) {
        border: 1px solid;
        text-align: center;
    }
</style>
