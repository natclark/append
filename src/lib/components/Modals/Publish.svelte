<script>
    import Breaker from '$lib/components/Layout/Breaker.svelte';
    import { Web3Storage } from 'web3.storage';
    import { wallet, builtin, chain, flow, fallback } from '$lib/stores/wallet';
    //import { Resolution } from '@unstoppabledomains/resolution';
    //import ENS, { getEnsAddress } from '@ensdomains/ensjs'
    import pages from '$lib/stores/pages';
    import css from '$lib/stores/css';
    import { onMount } from 'svelte';

    // TODO: Brush up one-click publishing
    // const resolution = new Resolution();
    // const provider = null;
    // const ens = new ENS({ provider, ensAddress: getEnsAddress('1') })
    let domain;
    let ls;
    let publications = [];

    // * The below method is TEMPORARY. Yes, of course this is bad practice. If someone abuses the below API key before I switch to something else, I'll add a new default one ASAP.
    const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGI0MEIzZGU3Y0Y2Mjk3MTZBNDM2NGQ2NWY2NTJBMzNCOTU5N2E0QzEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Mjc1OTAzMTc0MzMsIm5hbWUiOiJFVEhHbG9iYWwgVGVzdCJ9.wpGMGBuvu4n2f4hXTYyU7n13u-gMe6I_KOCTtHkQ280`;

    const submit = async () => {
        const client = new Web3Storage({ token, });
        let files = [];
        const parser = new DOMParser();
        $pages.forEach((page) => {
            let blob;
            switch (page.type) {
                case `page`:
                    let doc = parser.parseFromString(page.body, `text/html`);
                    doc.querySelectorAll(`*`).forEach((el) => {
                        el.removeAttribute(`contenteditable`);
                        el.removeAttribute(`draggable`);
                        el.removeAttribute(`style`);
                    });
                    doc.querySelectorAll(`style`).forEach((el) => el.remove());
                    doc.querySelector(`.append-contextMenu`).remove();
                    const link = doc.createElement(`link`);
                    link.rel = `stylesheet`;
                    link.type = `text/css`;
                    link.href = `./style.css`;
                    doc.querySelector(`head`).appendChild(link);
                    blob = new Blob([`<!DOCTYPE html>${doc.getElementsByTagName(`html`)[0].outerHTML.trim()}`], { type: page.mime, });
                    files.push(new File([blob], page.file));
                    break;
                case `stylesheet`:
                    let generatedStyles = ``;
                    $css.generated.forEach((selector) => {
                        let rules = ``;
                        selector.rules.forEach((rule) => rules.push(`${rule.key}: ${rule.val}; `));
                        generatedStyles.push(`[data-id="${selector.id}"] { ${rules}}`);
                    });
                    blob = new Blob([`${generatedStyles.trim()}${$css.custom.trim()}`], { type: page.mime, });
                    files.push(new File([blob], page.file));
                    break;
                case `redirect`:
                    blob = new Blob([`<!DOCTYPE html><title>.</title>\<script\>window.location=\`${page.to}\`\<\/script\><noscript><meta http-equiv="refresh" content="0;url=${page.to}"></noscript>`.trim()], { type: page.mime, });
                    files.push(new File([blob], page.file));
                    break;
                case `security`:
                    blob = new Blob([page.body.trim()], { type: page.mime, });
                    files.push(new File([blob], page.file));
                    break;
                case `ads`:
                    blob = new Blob([page.body.trim()], { type: page.mime, });
                    files.push(new File([blob], page.file));
                    break;
                case `browserconfig`:
                    blob = new Blob([page.body.trim()], { type: page.mime, });
                    files.push(new File([blob], page.file));
                    break;
                case `humans`:
                    blob = new Blob([page.body.trim()], { type: page.mime, });
                    files.push(new File([blob], page.file));
                    break;
                case `webmanifest`:
                    blob = new Blob([page.body.trim()], { type: page.mime, });
                    files.push(new File([blob], page.file));
                    break;
                case `robots`:
                    blob = new Blob([page.body.trim()], { type: page.mime, });
                    files.push(new File([blob], page.file));
                    break;
                case `feed`:
                    blob = new Blob([page.body.trim()], { type: page.mime, });
                    files.push(new File([blob], page.file));
                    break;
                case `sitemap`:
                    blob = new Blob([page.body.trim()], { type: page.mime, });
                    files.push(new File([blob], page.file));
                    break;
                default:
            }
        });
        const cid = await client.put(files);
        if (ls) {
            ls.getItem(`publications`) === null && (ls.setItem(`publications`, ``));
            let newPublications = ls.getItem(`publications`).split(`,`);
            newPublications.push(`${cid};${null};${new Date().toUTCString().replace(`,`, ``)}`); // TODO sanitize in case domain has semicolons
            publications = newPublications.join(`,`);
            ls.setItem(`publications`, publications);
        }
    };

    onMount(() => {
        if (typeof localStorage !== `undefined`) {
            ls = localStorage;
            ls.getItem(`publications`) === null && (ls.setItem(`publications`, ``));
            publications = ls.getItem(`publications`).split(`,`).reverse();
        }
    });
</script>

<h2>Publish Site</h2>
<form on:submit|preventDefault={submit}>
    <div class="flex">
        <label for="title">Blockchain Domain (optional)</label>
        <input bind:value={domain} id="title" type="text" placeholder="example.eth, example.crypto" aria-required="false">
    </div>
    <Breaker />
    <div class="flex">
        <span></span>
        <input class="primary" type="submit" value="Publish">
    </div>
</form>
<p><strong>Note:</strong> One-click publishing to blockchain domains is currently disabled.</p>
<Breaker />
<h3>Previous Publications</h3>
<table>
    <thead>
        <tr>
            <th>Content Hash</th>
            <th>Domain (if any)</th>
            <th>Date</th>
        </tr>
    </thead>
    <tbody>
        {#each publications as pub}
            {#if pub !== ``}
                <tr>
                    <td><a href="https://gateway.ipfs.io/ipfs/{pub.split(`;`)[0]}" rel="external noopener nofollow" target="_blank">{pub.split(`;`)[0]}</a></td>
                    <td>{pub.split(`;`)[1]}</td>
                    <td>{pub.split(`;`)[2]}</td>
                </tr>
            {/if}
        {/each}
    </tbody>
</table>

<style>
    .flex {
        align-items: center;
        display: flex;
        justify-content: space-between;
        width: 100%;
        input[type="text"] {
            font-size: 18px;
            width: 50%;
        }
    }
    table {
        border: 1px solid #eee;
        border-collapse: collapse;
        width: 100%;
        tbody {
            tr:nth-child(odd) {
                background-color: #e9fdff;
            }
        }
        tr {
            height: 35px;
            th, td {
                padding: 0 8px;
                text-align: left;
                &:last-child {
                    text-align: right;
                }
            }
            td:first-child {
                word-wrap: break-word;
                max-width: 100px;
            }
        }
    }
</style>
