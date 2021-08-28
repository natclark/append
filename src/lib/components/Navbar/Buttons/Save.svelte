<script>
    import isModified from '$lib/stores/ismodified.ts';

    const click = () => {
        isModified.update(() => false);
    };
</script>

<!--
    TODO
{#if $isModified}
    <button class="primary" on:click={click}>Save</button>
{:else}
    <button class="primary" disabled>Save</button>
{/if}
-->

