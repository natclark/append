<script>
    import { Web3Storage } from 'web3.storage';
    import { onMount } from 'svelte';

    export let cid;

    let uploads = [];

    // * The below method is TEMPORARY. Yes, of course this is bad practice. If someone abuses the below API key before I switch to something else, I'll add a new default one ASAP.
    const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGI0MEIzZGU3Y0Y2Mjk3MTZBNDM2NGQ2NWY2NTJBMzNCOTU5N2E0QzEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Mjc1OTAzMTc0MzMsIm5hbWUiOiJFVEhHbG9iYWwgVGVzdCJ9.wpGMGBuvu4n2f4hXTYyU7n13u-gMe6I_KOCTtHkQ280`;

    const retrieveFiles = async (hash) => {
        const client = new Web3Storage({ token, });
        const res = await client.get(hash);
        res.ok && (uploads = await res.files());
    };

    const click = (e) => alert(`This feature is still in the works. Sorry!`);

    onMount(() => retrieveFiles(cid));
</script>

{#each uploads as upload}
    <div role="button" on:click={click}>
        <img src="https://gateway.ipfs.io/ipfs/{cid}/{upload.name}" width="24px" height="24px" alt="{upload.name}">
        <p>{upload.name}</p>
    </div>
{/each}

<style>
    div {
        border-color: #777;
        cursor: pointer !important;
        height: 70px;
        padding-top: 9px;
        width: auto;
        p {
            color: #fafafa;
            font-size: 14px;
            margin: 6px 0 0;
        }
        &:hover {
            background-color: #444;
        }
    }
</style>
