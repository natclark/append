<script>
    import Dropdown from '$lib/components/Layout/Dropdown.svelte';
    import Grid from '$lib/components/Layout/Grid.svelte';
    import Center from '$lib/components/Layout/Center.svelte';
    import Breaker from '$lib/components/Layout/Breaker.svelte';
    //import IPFS from 'ipfs/dist/index.min.js';
    //import IPFS from 'ipfs-core';
    import { Web3Storage } from 'web3.storage';
    import UploadFile from '../Buttons/UploadFile.svelte';
    import Upload from '../Upload.svelte';
    import { onMount } from 'svelte';

    let metadata = true;

    // * The below method is TEMPORARY. Yes, of course this is bad practice. If someone abuses the below API key before I switch to something else, I'll add a new default one ASAP.
    const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGI0MEIzZGU3Y0Y2Mjk3MTZBNDM2NGQ2NWY2NTJBMzNCOTU5N2E0QzEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Mjc1OTAzMTc0MzMsIm5hbWUiOiJFVEhHbG9iYWwgVGVzdCJ9.wpGMGBuvu4n2f4hXTYyU7n13u-gMe6I_KOCTtHkQ280`;

    let files;

    // * Alias for browser localStorage:
    let ls;

    let uploads = [];

    const uploadFiles = async () => {
        if (metadata) {
            // TODO: Strip image metadata like EXIF
        }
        const client = new Web3Storage({ token, });
        const cid = await client.put(files);
        if (ls) {
            ls.getItem(`uploads`) === null && (ls.setItem(`uploads`, ``));
            let newUploads = ls.getItem(`uploads`).split(`,`);
            newUploads.push(cid);
            uploads = newUploads.join(`,`);
            ls.setItem(`uploads`, uploads);
        }
    };

    onMount(() => {
        if (typeof localStorage !== `undefined`) {
            ls = localStorage;
            ls.getItem(`uploads`) === null && (ls.setItem(`uploads`, ``));
            uploads = ls.getItem(`uploads`).split(`,`);
        }
    });
</script>

<Dropdown text="Upload File">
    <Center>
        <!--
        TODO - Modal for easy file dragging-and-dropping
        <Modal>
            <UploadFile />
        </Modal>
        -->
        <input class="primary" type="file" multiple bind:files={files} on:change={uploadFiles}>
    </Center>
    <Breaker />
    <Center>
        <div class="checkbox">
            <input id="metadata" name="metadata" type="checkbox" bind:checked={metadata}>
            <label for="metadata">Strip image metadata (WIP)</label>
        </div>
    </Center>
    <Breaker />
    <Center>
        <p class="normal"><em>You might want to avoid uploading private or personally identifying files to IPFS! They might not be able to be removed later, as long as at least one node is still replicating them.</em></p>
    </Center>
</Dropdown>
<Dropdown text="My Files">
    <Grid>
        {#each uploads as cid}
            {#if cid !== ``}
                <Upload {cid} />
            {/if}
        {/each}
    </Grid>
</Dropdown>

<style>
    p {
        color: #f8f8f8;
        font-size: 14px;
        font-weight: 600;
        padding: 0 8px;
        &:not(.normal) {
            background-color: #333;
            padding: 4px 8px;
        }
    }
    .checkbox {
        input {
            filter: hue-rotate(340deg);
        }
        label {
            color: #fafafa;
            cursor: pointer;
            
        }
    }
</style>
