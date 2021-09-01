<script>
    import pages from '$lib/stores/pages';
    // TODO import metadata from '$lib/stores/metadata';
    import JSZip from 'jszip';
    import { saveAs } from 'file-saver';
    import css from '$lib/stores/css';
    import redirects from '$lib/stores/redirects';
    import websites from '$lib/stores/websites';
    import website from '$lib/stores/website';

    // * Disable the publish button when it is loading:
    let disabled = false;

    const click = () => {
        disabled = true;
        let zip = new JSZip();
        const parser = new DOMParser();
        $pages.forEach((page) => {
            switch (page.type) {
                case `page`:
                    let doc = parser.parseFromString(page.body, `text/html`);
                    doc.querySelectorAll(`*`).forEach((el) => {
                        el.removeAttribute(`contenteditable`);
                        el.removeAttribute(`draggable`);
                        el.removeAttribute(`style`);
                    });
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
                    zip.file(page.path, `<!DOCTYPE html>${doc.getElementsByTagName(`html`)[0].outerHTML.trim()}`);
                    break;
                case `stylesheet`:
                    zip.file(page.file, $css.trim());
                    break;
                case `ipfs-404`:
                    zip.file(page.file, `<!DOCTYPE html><title>.</title>\<script\>window.location=\`${page.to}\`\<\/script\><noscript><meta http-equiv="refresh" content="0;url=${page.to}"></noscript>`.trim());
                    break;
                case `security`:
                    zip.file(page.file, page.body.trim());
                    break;
                case `ads`:
                    zip.file(page.file, page.body.trim());
                    break;
                case `browserconfig`:
                    zip.file(page.file, page.body.trim());
                    break;
                case `humans`:
                    zip.file(page.file, page.body.trim());
                    break;
                case `webmanifest`:
                    zip.file(page.file, page.body.trim());
                    break;
                case `robots`:
                    zip.file(page.file, page.body.trim());
                    break;
                case `feed`:
                    zip.file(page.file, page.body.trim());
                    break;
                case `sitemap`:
                    zip.file(page.file, page.body.trim());
                    break;
                default:
            }
        });
        $redirects.forEach((redirect) => {
            zip.file(redirect.file, `<!DOCTYPE html><title>.</title>\<script\>window.location=\`${redirect.to}\`\<\/script\><noscript><meta http-equiv="refresh" content="0;url=${redirect.to}"></noscript>`.trim());
        });
        zip.generateAsync({ type: `blob`, }).then((blob) => saveAs(blob, `${$websites[$websites.indexOf($websites.find((e) => e.id === $website))].title}.zip`));
        disabled = false;
    };
</script>

<button class="primary{disabled ? ` disabled` : ``}" on:click={click} {disabled}>Export</button>
