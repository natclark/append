<script>
    import tab from '$lib/stores/tab';
    import css from '$lib/stores/css';
    import { flip } from 'svelte/animate';
    import { onMount } from 'svelte';

    // * The current page:
    let page = {
        css: {
            custom: $css,
            generated: ``,
        },
        file: null,
        html: ``,
        js: ``,
    };
    // * The array of all pages:
    let pages = [
        {
            page,
            url: `/`,
        }
    ];

    // * The iframe (not an actual JS canvas) in which a preview of the selected page lies:
    let canvas;
    // * The name of the iframe:
    let name = `canvas`;
    // * The class list of the iframe:
    let classList = ``;
    // * The source URL of the iframe:
    const src = `/preview.html`;

    // * Returns whether the user made any changes:
    let isModified = false;

    // * The canvas document:
    let doc = null;
    // * The canvas "<html>" tag:
    let html = null;
    // * The canvas head:
    let head = null;
    // * The canvas body:
    let body = null;

    // * The current selected element:
    let selection = -1;

    // * The default elements to be rendered:
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

    // * Increments each time a component is created, to ensure all components have a unique ID:
    let counter = 0;

    // * The object array of components:
    let components = [];

    // * The object array of items within the custom context menu:
    let menuOptions = [];

    const createComponent = (dom, parent, tag, options) => {
        let el = dom.createElement(tag);
        Object.keys(options).forEach((key) => el[key] = options[key]);
        let editable = el.contentEditable === `inherit` ? false : true;
        if (editable) el.contentEditable = false;
        el.setAttribute(`data-id`, counter);
        counter++;
        el.style.cursor = 'pointer';
        el.draggable = 'true';
        el.style.transition = `.1s outline`;
        el.style.willChange = `box-shadow`;
        el.addEventListener(`mouseover`, () => {
            if (el !== dom.activeElement) {
                components.forEach((component) => {
                    if (component !== dom.activeElement) component.element.style.outline = ``;
                });
                el.style.outline = `2px dotted #6fbcff`;
            }
        });
        el.addEventListener(`mouseout`, () => {
            if (el !== dom.activeElement) el.style.outline = ``;
        });
        el.addEventListener(`dragover`, (e) => {
            selection = el.getAttribute(`data-id`);
        });
        el.addEventListener(`click`, () => {
            el.focus();
            components.forEach((component) => component.element.style.outline = ``);
            el.style.outline = `2px solid #08f`;
        });
        el.addEventListener(`dblclick`, () => {
            if (editable) el.contentEditable = true;
            el.focus();
            if (editable) el.style.cursor = 'text';
            components.forEach((component) => component.element.style.outline = ``);
            el.style.outline = `2px solid #08f`;
        });
        el.addEventListener(`focusout`, () => {
            if (editable) el.contentEditable = false;
            el.style.cursor = 'pointer';
            el.style.outline = ``;
        });
        components.push({ element: el, children: [], });
        parent.appendChild(el);
        page.html = `<!DOCTYPE html>${dom.getElementsByTagName(`html`)[0].outerHTML}`;
        return el;
    };

    const moveComponent = (dom, id, newParent, newPosition) => {

    };

    const unsetComponent = (dom, id) => {
        let el = dom.querySelector(`[data-id="${id}"]`);
        el.remove();
    };

    // * The custom context menu element:
    let menu = null;

    // * Boolean based on whether the custom context menu is active:
    let menuVisible = false;

    // * Shows the custom context menu, if there's any options available:
    const showMenu = () => {
        if (!menuVisible) {
            menuVisible = true;
            let listCounter = 0;
            menuOptions.forEach((option) => {
                menu.innerHTML = option.markup;
                menu.querySelectorAll(`li`)[listCounter].addEventListener(`click`, option.event);
                listCounter++;
            });
            if (menuOptions.length > 0) menu.className = `append-contextMenu append-contextMenu--active`;
        }
    };

    // * Positions the custom context menu at the cursor:
    const moveMenu = (dom, e) => {
        let offsetX = 0;
        let offsetY = 0;

        if (e.pageX || e.pageY) {
            offsetX = e.pageX;
            offsetY = e.pageY;
        } else if (e.clientX || e.clientY) {
            offsetX = e.clientX + dom.body.scrollLeft + dom.documentElement.scrollLeft;
            offsetY = e.clientY + dom.body.scrollTop + dom.documentElement.scrollTop;
        }

        const menuWidth = menu.offsetWidth + 4;
        const menuHeight = menu.offsetHeight + 4;

        menu.style.left = ((window.innerWidth - offsetX) < menuWidth) ? `${window.innerWidth - menuWidth}px` : `${offsetX}px`;
        menu.style.top = ((window.innerHeight - offsetY) < menuHeight) ? `${window.innerHeight - menuHeight}px` : `${offsetY}px`;
    };

    // * Hides the custom context menu:
    const hideMenu = () => {
        menuVisible = false;
        menu.className = `append-contextMenu`;
    };

    // * Styling for the custom context menu:
    const menuStyles = `
        .append-contextMenu {
            background-color: #fff;
            border: 1px solid #dfdfdf;
            box-shadow: 1px 1px 2px #cfcfcf;
            display: none;
            padding: 12px 0;
            position: absolute;
            width: 240px;
            z-index: 999999 !important;
        }

        .append-contextMenu.append-contextMenu--active {
            display: block;
        }

        .append-contextMenu__items {
            list-style: none;
            margin: 0;
            padding: 0;
        }

        .append-contextMenu__item {
            display: block;
            margin-bottom: 4px;
        }

        .append-contextMenu__item:last-child {
            margin-bottom: 0;
        }

        .append-contextMenu__link {
            color: #0066aa;
            display: block;
            padding: 4px 12px;
            text-decoration: none;
        }

        .append-contextMenu__link:hover {
            background-color: #0066aa;
            color: #fff;
        }
    `;

    // * Markup for the custom context menu:
    const menuMarkup = `<ul class="append-contextMenu__items"></ul>`;

    // * Actions to perform once the iframe has loaded:
    const load = (e) => {
        doc = window.frames[`canvas`].document;
        html = doc.getElementsByTagName(`html`)[0];
        head = doc.getElementsByTagName(`head`)[0];
        body = doc.getElementsByTagName(`body`)[0];

        body.addEventListener(`dragover`, (e) => {
            e.preventDefault();
        });

        createComponent(doc, body, `style`, { type: `text/css`, innerHTML: page.css.generated.trim(), });
        createComponent(doc, body, `style`, { type: `text/css`, innerHTML: page.css.custom.trim(), });
        createComponent(doc, body, `style`, { type: `text/css`, innerHTML: menuStyles.trim(), });
        createComponent(doc, body, `nav`, { class: `append-contextMenu`, innerHTML: menuMarkup.trim(), });

        menu = doc.querySelector(`[data-id="3"]`);
        hideMenu();
        doc.addEventListener(`click`, () => {
            hideMenu();
        });
        doc.addEventListener(`contextmenu`, (e) => {
            e.preventDefault();
            showMenu();
            moveMenu(doc, e);
        }, true);

        items.forEach((item) => {
            components.push({ element: body, children: [], });
            switch (item.type) {
                case `header`:
                    createComponent(doc, body, `h1`, { contentEditable: true, textContent: item.text, });
                    break;
                case `paragraph`:
                    createComponent(doc, body, `p`, { contentEditable: true, textContent: item.text, });
                    break;
            }
        });

        // * This listens for elements dropped into the iframe body:
        body.addEventListener(`drop`, (e) => {
            e.preventDefault();
            if (e.dataTransfer.getData(`element`)) {
                // * If the dropped element came from the sidebar:
                const tagName = e.dataTransfer.getData(`element`);
                switch (tagName) {
                    // * These are some special cases for creating "exception" elements:
                    case `ul`:
                        createComponent(doc, createComponent(doc, body, `ul`, {}), `li`, { contentEditable: true, textContent: `This is some dummy text.`, });
                        break;
                    case `markdown`:
                        createComponent(doc, body, `div`, { contentEditable: true, classList: `markdown`, });
                        break;
                    case `rich-text`:
                        createComponent(doc, body, `div`, { contentEditable: true, classList: `rich-text`, });
                        break;
                    case `details`:
                        createComponent(doc, createComponent(doc, body, `details`, { contentEditable: true, textContent: `This is some dummy text.`, }), `summary`, { contentEditable: true, textContent: `Dropdown`, });
                        break;
                    case `img`:
                        createComponent(doc, body, `img`, { alt: `Undescribed image`, height: `100%`, src: ``, width: `100%`, });
                        break;
                    case `video`:
                        alert(`This component is still in the works! Sorry.`);
                        break;
                    case `audio`:
                        alert(`This component is still in the works! Sorry.`);
                        break;
                    default:
                        // * This is the "catch-all" for creating any other kind of element:
                        createComponent(doc, body, tagName, { contentEditable: true, textContent: `This is some dummy text.`, });
                }
            } else {
                // * If the dropped element already exists within the iframe and was moved from another location:
                const id = selection;
                const el = doc.querySelector(`[data-id="${id}"]`);
                createComponent(doc, body, el.tagName.toLowerCase(), { contentEditable: el.contentEditable, textContent: el.textContent, });
                unsetComponent(doc, id);
            }
        });
    };

    // * If changes have been made but not saved, alert the user before they close the page:
    const beforeunload = (e) => {
        if (!isModified) return null;
        e = e || window.event;
        if (e) e.returnValue = `Are you sure?`;
        return `Are you sure?`;
    };

    // * If the custom context menu is showing and the escape key has been pressed, then hide it:
    const keyup = (e) => (e.keyCode === 27 && menu && menuVisible) && (hideMenu());

    // * Automatically set the width of the iframe based on whether the left menu is expanded:
    tab.subscribe((val) => classList = val !== false ? `shrink` : ``);

    // * Automatically update the iframe with user-generated custom CSS as it is being typed:
    css.subscribe((val) => {
        page.css.custom = val;
        if (body) body.getElementsByTagName(`style`)[1].innerHTML = val;
    });

    // * Actions to perform once this component has been mounted to the page:
    onMount(() => {
        //isModified = true;
    });

</script>

<svelte:window on:beforeunload={beforeunload} on:keyup={keyup} />

<svelte:head>
    <title>Append</title>
</svelte:head>

<iframe bind:this={canvas} id={name} class={classList} {name} {src} title={name} on:load={load}></iframe>

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
