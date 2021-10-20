<script>
    import Breaker from '$lib/components/Layout/Breaker.svelte';
    import { Web3Storage } from 'web3.storage';
    import { wallet, builtin, chain, flow, fallback } from '$lib/stores/wallet';
    //import { Resolution } from '@unstoppabledomains/resolution';
    import pages from '$lib/stores/pages';
    import css from '$lib/stores/css';
    import redirects from '$lib/stores/redirects';
    import websites from '$lib/stores/websites';
    import website from '$lib/stores/website';
    import confetti from 'canvas-confetti';
    import { onMount } from 'svelte';

    let domain;
    let ls;
    let publications = [];

    // * Disable the publish button when it is loading:
    let disabled = false;

    // * The below method is TEMPORARY. Yes, of course this is bad practice. If someone abuses the below API key before I switch to something else, I'll add a new default one ASAP.
    const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGI0MEIzZGU3Y0Y2Mjk3MTZBNDM2NGQ2NWY2NTJBMzNCOTU5N2E0QzEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Mjc1OTAzMTc0MzMsIm5hbWUiOiJFVEhHbG9iYWwgVGVzdCJ9.wpGMGBuvu4n2f4hXTYyU7n13u-gMe6I_KOCTtHkQ280`;

    const submit = async () => {
        disabled = true;
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
                    const title = doc.querySelector(`title`);
                    title.innerText = page.title;
                    const styles = doc.querySelectorAll(`style`);
                    styles[1].remove();
                    styles[2].remove();
                    try {
                        // TODO - clean up context menu removal
                        doc.querySelector(`.append-contextMenu__items`).remove();
                        doc.querySelector(`.append-contextMenu`).remove();
                    } catch (e) {}
                    const link = doc.createElement(`link`);
                    link.rel = `stylesheet`;
                    link.type = `text/css`;
                    let stylePath = ``;
                    const numSlashes = page.path.split(`/`).length - 1;
                    if (numSlashes < 2) {
                        stylePath = `./`;
                    } else {
                        for (let i = 1; i < numSlashes; i++) {
                            stylePath += `../`;
                        }
                    }
                    link.href = `${stylePath}style.css`;
                    doc.querySelector(`head`).appendChild(link);
                    blob = new Blob([`<!DOCTYPE html>${doc.getElementsByTagName(`html`)[0].outerHTML.trim()}`], { type: page.mime, });
                    files.push(new File([blob], page.path));
                    break;
                case `stylesheet`:
                    blob = new Blob([$css.trim()], { type: page.mime, });
                    files.push(new File([blob], page.file));
                    break;
                case `ipfs-404`:
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
        $redirects.forEach((redirect) => {
            const blob = new Blob([`<!DOCTYPE html><title>.</title>\<script\>window.location=\`${redirect.to}\`\<\/script\><noscript><meta http-equiv="refresh" content="0;url=${redirect.to}"></noscript>`.trim()], { type: redirect.mime, });
            files.push(new File([blob]), page.file);
        });
        const cid = await client.put(files);
        let newWebsites = $websites;
        const date = new Date();
        newWebsites[newWebsites.indexOf(newWebsites.find((e) => e.id === $website))].publications.push({
            cid,
            domains: [],
            date: date.toUTCString(),
            timestamp: date.getTime(),
        });
        websites.update(() => newWebsites);
        const blob = new Blob([JSON.stringify($websites)], { type: `application/json`, });
        const newFiles = [new File([blob], `websites.json`)];
        const newCid = await client.put(newFiles);
        ls && (ls.setItem(`append::v0`, newCid));
        disabled = false;
        confetti({
            origin: {
                y: .6,
            },
            particleCount: 100,
            spread: 70,
            zIndex: 1001,
        });
    };

    onMount(() => typeof localStorage !== `undefined` && (ls = localStorage));
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
        <input class="primary{disabled ? ` disabled` : ``}" type="submit" value={disabled ? `Publishing...` : `Publish`} {disabled}>
    </div>
</form>
<p><strong>Note:</strong> One-click publishing to blockchain domains is currently disabled.<Breaker /><Breaker />However, you can still click "Publish" anyway to just publish on IPFS.</p>
<Breaker />
<h3>Previous Publications</h3>
<div class="container">
    <table>
        <thead>
            <tr>
                <th>Content Hash</th>
                <th>Domain (if any)</th>
                <th>Date</th>
            </tr>
        </thead>
        <tbody>
            {#each $websites[$websites.indexOf($websites.find((e) => e.id === $website))].publications as pub}
                {#if pub !== ``}
                    <tr>
                        <td><a class="link" href="https://cloudflare-ipfs.com/ipfs/{pub.cid}" rel="external noopener nofollow" target="_blank">{pub.cid}</a></td>
                        <td>{pub.domains.length > 0 ? pub.domains[0] : `Not yet published to a domain.`}</td>
                        <td>{pub.date}</td>
                    </tr>
                {/if}
            {/each}
        </tbody>
    </table>
</div>

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
    .container {
        height: 300px;
        overflow: hidden scroll;
        scrollbar-color: #999 #333;
        scrollbar-face-color: #999;
        scrollbar-track-color: #333;
        scrollbar-width: thin;
        table {
            border: 1px solid #111;
            border-collapse: collapse;
            border-radius: 2px;
            position: sticky;
            top: 0;
            width: 100%;
            tbody {
                tr:nth-child(odd) {
                    background-color: #555;
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
        &::-webkit-scrollbar {
            width: 8px;
        }
        &::-webkit-scrollbar-corner, &::-webkit-scrollbar-track {
            background-color: #333;
        }
        &::-webkit-scrollbar-thumb {
            background-color: #999;
        }
    }
</style>
