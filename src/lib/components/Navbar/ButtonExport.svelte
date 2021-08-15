<script>
    import pages from '$lib/stores/pages';
    import metadata from '$lib/stores/metadata';
    import JSZip from 'jszip';
    import { saveAs } from 'file-saver';
    import css from '$lib/stores/css';

    const click = () => {
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
                    doc.querySelectorAll(`style`).forEach((el) => el.remove());
                    doc.querySelector(`.append-contextMenu`).remove();
                    const link = doc.createElement(`link`);
                    link.rel = `stylesheet`;
                    link.type = `text/css`;
                    link.href = `/style.css`;
                    doc.querySelector(`head`).appendChild(link);
                    zip.file(page.file, `<!DOCTYPE html>${doc.getElementsByTagName(`html`)[0].outerHTML.trim()}`);
                    break;
                case `stylesheet`:
                    let generatedStyles = ``;
                    $css.generated.forEach((selector) => {
                        let rules = ``;
                        selector.rules.forEach((rule) => rules.push(`${rule.key}: ${rule.val}; `));
                        generatedStyles.push(`[data-id="${selector.id}"] { ${rules}}`)
                    });
                    zip.file(page.file, `${generatedStyles.trim()}${$css.custom.trim()}`);
                    break;
                case `redirect`:
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
        zip.generateAsync({ type: `blob`, }).then((blob) => saveAs(blob, `append.zip`));
    };
</script>

<button class="button primary" on:click={click}>Export</button>
