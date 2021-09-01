<script>
    import isModified from '$lib/stores/ismodified';
    import { Web3Storage } from 'web3.storage';
    import websites from '$lib/stores/websites';
    import { onMount, tick } from 'svelte';

    // * Alias for browser localStorage:
    let ls;

    // * The button element binding:
    let button;

    const click = async () => {
        button.disabled = true;
        button.innerText = `Saving...`;
        isModified.update(() => false);
        // * The below method is TEMPORARY. Yes, of course this is bad practice. If someone abuses the below API key before I switch to something else, I'll add a new default one ASAP.
        const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGI0MEIzZGU3Y0Y2Mjk3MTZBNDM2NGQ2NWY2NTJBMzNCOTU5N2E0QzEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Mjc1OTAzMTc0MzMsIm5hbWUiOiJFVEhHbG9iYWwgVGVzdCJ9.wpGMGBuvu4n2f4hXTYyU7n13u-gMe6I_KOCTtHkQ280`;
        const client = new Web3Storage({ token, });
        const blob = new Blob([JSON.stringify($websites)], { type: `application/json`, });
        const files = [new File([blob], `websites.json`)];
        const cid = await client.put(files);
        ls && (ls.setItem(`hash`, cid));
        await tick();
        button.innerText = `Save`;
        button.disabled = false;
    };

    onMount(() => typeof localStorage !== `undefined` && (ls = localStorage));
</script>

<button bind:this={button} class="primary" on:click={click}>Save</button>

<!--
    TODO
{#if $isModified}
    <button class="primary" on:click={click}>Save</button>
{:else}
    <button class="primary" disabled>Save</button>
{/if}
-->
