<script>
    import tab from '$lib/stores/tab';

    let canvas;
    let page;
    let name = `canvas`;
    let classList = ``;
    const src = `/preview.html`;

    const preview = (e) => {
        e.target.style.boxShadow = `rgb(85, 91, 255) 0px 0px 2px`;
    };

    const reset = (e) => {
        e.target.style.boxShadow = ``;
    };

    const select = (e) => {
        e.target.style.boxShadow = `rgb(0, 8, 255) 0px 0px 4px`;
    };

    let items = [
        {
            id: 1,
            text: `Hello World`,
            type: `header`,
        },
        {
            id: 2,
            text: `This is my unstoppable blog.`,
            type: `paragraph`,
        },
    ];

    const createComponent = (parent, tag, options) => {
        let el = document.createElement(tag);
        Object.keys(options).forEach((key) => el[key] = options[key]);
        el.addEventListener(`mouseover`, () => {
            el.style.boxShadow = `rgb(85, 91, 255) 0 0 2px`;
        });
        el.addEventListener(`mouseout`, () => {
            el.style.boxShadow = ``;
        });
        parent.appendChild(el);
        page = `<!DOCTYPE html>${window.frames[`canvas`].document.getElementsByTagName(`html`)[0].outerHTML}`;
    };

    const load = (e) => {
        const html = window.frames[`canvas`].document.getElementsByTagName(`html`)[0];
        const head = window.frames[`canvas`].document.getElementsByTagName(`head`)[0];
        const body = window.frames[`canvas`].document.getElementsByTagName(`body`)[0];
        items.forEach((item) => {
            switch (item.type) {
                case `header`:
                    createComponent(body, `h1`, { textContent: item.text, });
                    break;
                case `paragraph`:
                    createComponent(body, `p`, { textContent: item.text, });
                    break;
            }
        });
    };

    tab.subscribe((val) => classList = val !== false ? `shrink` : ``);
</script>

<svelte:head>
    <title>Append</title>
</svelte:head>

<iframe bind:this={canvas} id={name} class={classList} {name} {src} title={name} on:mouseover={preview} on:mouseout={reset} on:mousedown={select} on:load={load}></iframe>

<style>
    iframe {
        background-color: #fff;
        color: #000;
        height: calc(100vh - 40px);
        max-width: calc(100vw - 20em - 40px);
        width: 100%;
    }
    :global {
        .shrink {
            max-width: calc(100vw - 40em - 40px);
        }
        .dropContainer {
            overflow: auto !important;
        }
        .dragContainer {
            height: auto !important;
            width: 100% !important;
        }
    }
</style>
