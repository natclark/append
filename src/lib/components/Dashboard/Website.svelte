<script>
    import websites from '$lib/stores/websites';
    import website from '$lib/stores/website';
    import pages from '$lib/stores/pages';
    import page from '$lib/stores/page';
    import products from '$lib/stores/products';
    import prices from '$lib/stores/prices';
    import { goto } from '$app/navigation';

    export let id;

    const title = $websites[$websites.indexOf($websites.find((e) => e.id === id))].title;

    const websiteIndex = $websites.indexOf($websites.find((e) => e.id === id));

    // * Renders a static preview of a given website:
    const renderPreview = () => {
        const parser = new DOMParser();
        let doc = parser.parseFromString($websites[websiteIndex].pages[0].body, `text/html`);
        doc.querySelectorAll(`*`).forEach((el) => {
            el.removeAttribute(`contenteditable`);
            el.removeAttribute(`draggable`);
            el.removeAttribute(`style`);
        });
        document.getElementById(id).contentWindow.document.write(`<!DOCTYPE html>${doc.getElementsByTagName(`html`)[0].outerHTML.trim()}`);
    };

    // * Triggers when a website is selected:
    const editWebsite = () => {
        website.update(() => id);
        pages.update(() => $websites[websiteIndex].pages);
        page.update(() => 0);
        products.update(() => $websites[websiteIndex].products);
        prices.update(() => $websites[websiteIndex].prices);
        goto(`/editor/`);
    };
</script>

<button class="website" tabindex="0" role="link" on:click={editWebsite}>
    <div class="website__preview">
        {#if $websites[websiteIndex].pages[0].body !== ``}
            <iframe id="{id}" src="/preview.html" title="Preview of {title}" scrolling="no" on:load={renderPreview} />
        {:else}
            <p>Preview currently unavailable.</p>
            <p>Once you've saved some changes to your site, it should appear.</p>
        {/if}
    </div>
    <h2 class="website__title">{title}</h2>
</button>

<style>
    .website {
        background-color: #000;
        border: 1px solid #444;
        border-radius: .5rem;
        cursor: pointer;
        padding: 0;
        text-align: center;
        text-decoration: none;
        .website__preview {
            background-color: #111;
            height: 180px;
            iframe {
                background-color: #fff;
                border-radius: .5rem .5rem 0 0;
                border: 0;
                color: #000;
                height: 200%;
                pointer-events: none;
                transform: scale(.5);
                transform-origin: top left;
                width: 200%;
            }
            p {
                margin: 0;
            }
        }
        .website__title {
            color: #f8f8f8;
            font-size: 16px;
            font-weight: 400;
        }
        &:hover {
            border-color: #888;
        }
        &:focus {
            outline: 0;
        }
    }
</style>
