<script>
    import isModified from '$lib/stores/ismodified.ts';

    const click = () => {
        isModified.update(() => false);
    };
</script>

{#if $isModified}
    <button class="button primary" on:click={click}>Save</button>
{:else}
    <button class="button primary" disabled>Save</button>
{/if}
