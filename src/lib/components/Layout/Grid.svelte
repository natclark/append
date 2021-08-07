<div class="grid">
    <slot />
</div>

<style>
    .grid {
        display: grid;
        grid-template-columns: auto auto auto;
    }
    :global(.grid > *) {
        border: 1px solid;
        text-align: center;
    }
</style>