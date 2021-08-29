<script>
    import page from '$lib/stores/page';
    import components from '$lib/stores/components';
    import pages from '$lib/stores/pages';
    import tab from '$lib/stores/tab';
    import css from '$lib/stores/css';
    import iframe from '$lib/stores/iframe';
    import element from '$lib/stores/element';
    import { flip } from 'svelte/animate';
    import isModified from '$lib/stores/ismodified';
    import ContextMenu from '$lib/editor/ContextMenu';
    import ShortcutMenu from '$lib/editor/ShortcutMenu';

    // * The index of the current page:
    let currentPage = $page;

    // * The iframe (not an actual JS canvas) in which a preview of the selected page lies:
    let canvas;
    // * The name of the iframe:
    let name = `canvas`;
    // * The class list of the iframe:
    let classList = ``;
    // * The source URL of the iframe:
    const src = `/preview.html`;

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

    // * Increments each time a component is created, to ensure all components have a unique ID:
    let counter = 0;

    // * The object array of components:
    components.update(() => $pages[$pages.indexOf($pages.find((e) => e.id === currentPage))].components);

    // * The object array of items within the custom context menu:
    let menuOptions = [];

    // * Reset an existing component:
    const resetComponent = (component, el) => {
        if (component.id == el.getAttribute(`data-id`)) {
            if (typeof component.element === `undefined`) {
                let newComponents = $components;
                newComponents[newComponents.indexOf(component)].element = el;
                components.update(() => newComponents);
            } else if (component.element === null) {
                let newComponents = $components;
                newComponents[newComponents.indexOf(component)].element = el;
                components.update(() => newComponents);
            }
        }
    };

    // * Create a new component:
    const createComponent = (dom, parent, tag, options, push) => {
        let el = dom.createElement(tag);
        Object.keys(options).forEach((key) => el[key === `dataId` ? `data-id` : key] = options[key]);
        let editable = el.contentEditable === `inherit` ? false : true;
        editable && (el.contentEditable = false);
        if (typeof el[`data-id`] === `undefined`) {
            el.setAttribute(`data-id`, counter);
            counter++;
        } else {
            el.setAttribute(`data-id`, el[`data-id`]);
            reactive();
        }
        el.style.cursor = `pointer`;
        el.draggable = `true`;
        el.style.willChange = `box-shadow`;
        el.addEventListener(`mouseover`, () => {
            if (el !== dom.activeElement && selection != el.getAttribute(`data-id`)) {
                let newComponents = $components;
                $components.forEach((component) => {
                    resetComponent(component, el);
                    try {
                        if (component.element !== dom.activeElement && selection != component.element.getAttribute(`data-id`)) {
                            dom.querySelector(`[data-id="${component.id}"]`).style.outline = ``;
                            dom.querySelector(`[data-id="${component.id}"]`).style.boxShadow = ``;
                            newComponents[newComponents.indexOf(component)].element.style.outline = ``;
                            newComponents[newComponents.indexOf(component)].element.style.boxShadow = ``;
                        }
                    } catch (e) {}
                });
                components.update(() => newComponents);
                // * There is 100% a better way to do this. Not worries about optimizing everything right now.
                const elStyle = el.currentStyle || window.frames[`canvas`].getComputedStyle(el);
                el.style.boxShadow = ``;
                elStyle.marginTop.slice(0, -2) > 0 && (el.style.boxShadow += `0 -${elStyle.marginTop} 0 rgba(255, 255, 0, 0.15)`);
                elStyle.marginRight.slice(0, -2) > 0 && (el.style.boxShadow += `${elStyle.marginRight} 0 0 rgba(255, 255, 0, 0.15)`);
                elStyle.marginBottom.slice(0, -2) > 0 && (el.style.boxShadow += `0 ${elStyle.marginBottom} 0 rgba(255, 255, 0, 0.15)`);
                elStyle.marginLeft.slice(0, -2) > 0 && (el.style.boxShadow += `-${elStyle.marginLeft} 0 0 rgba(255, 255, 0, 0.15)`);
                elStyle.paddingTop.slice(0, -2) > 0 && (el.style.boxShadow += `inset 0 -${elStyle.paddingTop} 0 rgba(128, 0, 128, 0.15)`);
                elStyle.paddingRight.slice(0, -2) > 0 && (el.style.boxShadow += `inset ${elStyle.paddingRight} 0 0 rgba(128, 0, 128, 0.15)`);
                elStyle.paddingBottom.slice(0, -2) > 0 && (el.style.boxShadow += `inset 0 ${elStyle.paddingBottom} 0 rgba(128, 0, 128, 0.15)`);
                elStyle.paddingLeft.slice(0, -2) > 0 && (el.style.boxShadow += `inset -${elStyle.paddingLeft} 0 0 rgba(128, 0, 128, 0.15)`);
                el.style.outline = `2px dotted #6fbcff`;
            }
        });
        el.addEventListener(`mouseout`, () => {
            if (el !== dom.activeElement && selection != el.getAttribute(`data-id`)) {
                el.style.outline = ``;
                el.style.boxShadow = ``;
            }
        });
        el.addEventListener(`dragstart`, (e) => {
            e.dataTransfer.setData(`text/plain`, null);
        });
        el.addEventListener(`click`, () => {
            selection = el.getAttribute(`data-id`);
            const obj = { id: selection, el, };
            element.update(() => obj);
            el.focus();
            const boxShadow = el.style.boxShadow;
            let newComponents = $components;
            $components.forEach((component) => {
                resetComponent(component, el);
                try {
                    dom.querySelector(`[data-id="${component.id}"]`).style.outline = ``;
                    dom.querySelector(`[data-id="${component.id}"]`).style.boxShadow = ``;
                    newComponents[newComponents.indexOf(component)].element.style.outline = ``;
                    newComponents[newComponents.indexOf(component)].element.style.boxShadow = ``;
                } catch (e) {}
            });
            components.update(() => newComponents);
            el.style.outline = `2px solid #08f`;
            el.style.boxShadow = boxShadow;
        });
        el.addEventListener(`dblclick`, () => {
            editable && (el.contentEditable = true);
            selection = el.getAttribute(`data-id`);
            const obj = { id: selection, el, };
            element.update(() => obj);
            el.focus();
            editable && (el.style.cursor = `text`);
            const boxShadow = el.style.boxShadow;
            let newComponents = $components;
            $components.forEach((component) => {
                try {
                    newComponents[newComponents.indexOf(component)].element.style.outline = ``;
                    newComponents[newComponents.indexOf(component)].element.style.boxShadow = ``;
                } catch (e) {}
            });
            components.update(() => newComponents);
            el.style.outline = `2px solid #08f`;
            el.style.boxShadow = boxShadow;
        });
        el.addEventListener(`keydown`, (e) => { // TODO - fix two bugs related to this function
            if (e.keyCode === 46 && el === dom.activeElement && el.contentEditable === true) {
                selection = -1;
                const obj = { id: -1, el, };
                element.update(() => obj);
                unsetComponent(dom, el.getAttribute(`data-id`));
            }
        });
        el.addEventListener(`focusout`, () => {
            editable && (el.contentEditable = false);
            element.update(() => false);
            el.style.cursor = `pointer`;
            el.style.outline = ``;
            el.style.boxShadow = ``;
        });
        el.addEventListener(`input`, () => {
            push ? options[`textContent`] = el.textContent : $components[$components.indexOf($components.find((e) => e.id == el.getAttribute(`data-id`)))].options[`textContent`] = el.textContent;
        });
        if (push) {
            let newComponents = [];
            newComponents.push({ id: el.getAttribute(`data-id`), element: el, children: [], tag, options, });
            components.update(() => newComponents);
        }
        parent.appendChild(el);
        return el;
    };

    const moveItem = (array, from, to) => {
        const el = array[from];
        array.splice(from, 1);
        array.splice(to, 0, el);
        return array;
    };

    // * Move an existing component:
    const moveComponent = (dom, from, to, mouseY) => {
        let fromEl = dom.querySelector(`[data-id="${from}"]`);
        let toEl = dom.querySelector(`[data-id="${to}"]`);
        switch (toEl.tagName) {
            case `BODY`:
                // TODO - redo this (this is a sloppy and unsustainble solution. but good enough for most pages for now.)
                const last = dom.body.lastElementChild;
                const bodyStyle = dom.body.getBoundingClientRect();
                const elStyle = last.getBoundingClientRect();
                if ((mouseY - 240) > (bodyStyle.top + elStyle.top)) {
                    dom.body.appendChild(fromEl);
                }
                break;
            case `DIV`:
                break;
            default:
                let toIndex = Array.prototype.indexOf.call(dom.querySelectorAll(`*`), toEl);
                let fromIndex = Array.prototype.indexOf.call(dom.querySelectorAll(`*`), fromEl);
                if (fromIndex > toIndex) {
                    // * prepend
                    toEl.parentElement.insertBefore(fromEl, toEl);
                    components.update(() => moveItem($components, $components.indexOf($components.find((e) => e.id === parseInt(from))), $components.indexOf($components.find((e) => e.id === parseInt(to)))));
                } else {
                    // * append
                    toEl.parentElement.insertBefore(fromEl, toEl.nextSibling);
                    components.update(() => moveItem($components, $components.indexOf($components.find((e) => e.id === parseInt(from))), $components.indexOf($components.find((e) => e.id === parseInt(to)))));
                }
        }
        reactive();
    };

    // * Remove a component:
    const unsetComponent = (dom, id) => {
        let newComponents = $components;
        newComponents.splice(newComponents.indexOf(newComponents.find((e) => e.id === id)), 1);
        components.update(() => newComponents);
        reactive();
        dom.querySelector(`[data-id="${id}"]`).remove();
    };

    const contextMenu = new ContextMenu();
    const shortcutMenu = new ShortcutMenu();

    // * Returns whether the iframe been loaded once yet:
    let hasLoaded = false;

    // * Actions to perform once the iframe has loaded:
    const load = (e) => {
        iframe.update(() => window.frames[`canvas`]);
        doc = window.frames[`canvas`].document;
        html = doc.getElementsByTagName(`html`)[0];
        head = doc.getElementsByTagName(`head`)[0];
        body = doc.getElementsByTagName(`body`)[0];

        let dragged;

        doc.addEventListener(`drag`, (e) => {
            // TODO
        }, false);
        doc.addEventListener(`dragstart`, (e) => {
            dragged = e.target;
            try {
                if (dragged.getAttribute(`data-id`) === null) {
                    let draggedId = counter;
                    counter++;
                    dragged.setAttribute(`data-id`, draggedId);
                }
            } catch (err) {
                if (dragged.parentElement.getAttribute(`data-id`) === null) {
                    let draggedId = counter;
                    counter++;
                    dragged.parentElement.setAttribute(`data-id`, draggedId);
                }
            }
            e.target.style.opacity = .8;
        }, false);
        doc.addEventListener(`dragend`, (e) => {
            typeof e.target.style !== `undefined` && (e.target.style.opacity = ``);
        }, false);
        doc.addEventListener(`dragover`, (e) => {
            e.preventDefault();
        }, false);
        doc.addEventListener(`dragenter`, (e) => {
            if (e.target.tagName !== `BODY` && e.target.tagName !== `HTML`) {
                if (e.target.tagName === `H1` || e.target.tagName === `H2` || e.target.tagName === `H3` || e.target.tagName === `H4` || e.target.tagName === `H5` || e.target.tagName === `H6` || e.target.tagName === `P`) {
                    e.target.style.backgroundColor = `#fcabab`;
                    e.target.style.outline = `2px solid #f00`;
                } else {
                    try {
                        e.target.style.backgroundColor = `#c7e3fc`;
                        e.target.style.outline = `2px solid #08f`;
                    } catch (err) {
                        e.target.parentElement.style.backgroundColor = `#c7e3fc`;
                        e.target.parentElement.style.outline = `2px solid #08f`;
                    }
                }
            }
            // TODO: Consider an approach like the following:
            let id = -1;
            try {
                id = e.target.getAttribute(`data-id`);
            } catch (err) {
                id = e.target.parentElement.getAttribute(`data-id`);
            }
            if (id === null) {
                id = counter++
                e.target.setAttribute(`data-id`, id);
            }
        }, false);
        doc.addEventListener(`dragleave`, (e) => {
            try {
                e.target.style.backgroundColor = ``;
                e.target.style.boxShadow = ``;
                e.target.style.outline = ``;
            } catch (err) {
                e.target.parentElement.style.backgroundColor = ``;
                e.target.parentElement.style.boxShadow = ``;
                e.target.parentElement.style.outline = ``;
            }
        }, false);
        doc.addEventListener(`drop`, (e) => {
            e.preventDefault();
            if (typeof e.target.style !== `undefined`) { // * ensure some stray text wasn't dragged
                e.target.style.backgroundColor = ``;
                e.target.style.outline = ``;
                if (e.target.tagName !== `HTML`) {
                    if (typeof dragged !== `undefined`) { // * An existing element has been dropped and was moved from another location within the iframe:
                        if (dragged.tagName !== `BODY`) {
                            let id = e.target.getAttribute(`data-id`);
                            if (id === null) {
                                id = counter++;
                                e.target.setAttribute(`data-id`, id);
                            }
                            try {
                                moveComponent(doc, dragged.getAttribute(`data-id`), id, e.screenY);
                                doc.activeElement.blur();
                                dragged.click();
                                dragged.focus();
                            } catch (e) {
                                console.log(`Non fatal error:`, e.message);
                            }
                        }
                    } else { // * A new element has been dropped:
                        let id = counter;
                        counter++;
                        let idExtra = counter;
                        counter++;
                        let targetId = e.target.getAttribute(`data-id`);
                        if (targetId === null) {
                            targetId = counter;
                            counter++;
                            e.target.setAttribute(`data-id`, targetId);
                        }
                        if (e.dataTransfer.getData(`element`)) {
                            // * If the dropped element came from the sidebar:
                            const tagName = e.dataTransfer.getData(`element`);
                            switch (tagName) {
                                // * These are some special cases for creating "exception" elements:
                                case `container`:
                                    createComponent(doc, body, `div`, { className: `container`, dataId: id, }, true);
                                    break;
                                case `item`:
                                    createComponent(doc, body, `div`, { className: `item`, dataId: id, }, true);
                                    break;
                                case `ul`:
                                    createComponent(doc, createComponent(doc, body, `ul`, { dataId: id, }, true), `li`, { contentEditable: true, textContent: `This is some dummy text.`, dataId: idExtra, }, true);
                                    break;
                                case `markdown`:
                                    createComponent(doc, body, `div`, { contentEditable: true, classList: `markdown`, dataId: id, }, true);
                                    break;
                                case `rich-text`:
                                    createComponent(doc, body, `div`, { contentEditable: true, classList: `rich-text`, dataId: id, }, true);
                                    break;
                                case `details`:
                                    createComponent(doc, createComponent(doc, body, `details`, { contentEditable: true, textContent: `This is some dummy text.`, dataId: id, }, true), `summary`, { contentEditable: true, textContent: `Dropdown`, dataId: idExtra, }, true);
                                    break;
                                case `img`:
                                    createComponent(doc, body, `img`, { alt: `Undescribed image`, height: `100%`, src: ``, width: `100%`, dataId: id, }, true);
                                    break;
                                case `video`:
                                    alert(`This component is still in the works! Sorry.`);
                                    break;
                                case `audio`:
                                    alert(`This component is still in the works! Sorry.`);
                                    break;
                                default:
                                    // * This is the "catch-all" for creating any other kind of element:
                                    createComponent(doc, body, tagName, { contentEditable: true, textContent: `This is some dummy text.`, dataId: id, }, true);
                            }
                            try {
                                moveComponent(doc, id, targetId, e.screenY);
                            } catch (e) {
                                console.log(`Non fatal error:`, e.message);
                            }
                        }
                    }
                }
            }
        }, false);

        doc.addEventListener(`selectionchange`, () => {
            shortcutMenu.selectedText = doc.getSelection();
            if (shortcutMenu.selectedText.anchorNode.data !== ``) {
                // TODO: Show options for bold/underline/linking/etc.
            }
        });

        let generatedStyles = ``;
        $css.generated.forEach((selector) => {
            let rules = ``;
            selector.rules.forEach((rule) => rules += `${rule.key}: ${rule.val}; `);
            generatedStyles += `[data-id="${selector.id}"] { ${rules}}`;
        });

        createComponent(doc, body, `style`, { type: `text/css`, innerHTML: generatedStyles.trim(), }, false);
        createComponent(doc, body, `style`, { type: `text/css`, innerHTML: $css.custom.trim(), }, false);
        createComponent(doc, body, `style`, { type: `text/css`, innerHTML: contextMenu.menuStyles.trim(), }, false);
        createComponent(doc, body, `nav`, { class: `append-contextMenu`, innerHTML: contextMenu.menuMarkup.trim(), }, false);

        contextMenu.menu = doc.querySelector(`.append-contextMenu`);
        contextMenu.hide();
        doc.addEventListener(`click`, (e) => {
            if (e.target.tagName === `BODY`) {
                let newComponents = $components;
                const componentIndex = newComponents.indexOf(newComponents.find((component) => component.id === selection));
                if (componentIndex > -1) {
                    selection = -1;
                    newComponents[componentIndex].element.blur();
                    newComponents[componentIndex].element.contentEditable !== `inherit` && (newComponents[componentIndex].element.contentEditable = false);
                    element.update(() => false);
                    newComponents[componentIndex].element.style.cursor = `pointer`;
                    newComponents[componentIndex].element.style.outline = ``;
                    newComponents[componentIndex].element.style.boxShadow = ``;
                    components.update(() => newComponents);
                }
            }
            contextMenu.hide();
        });
        doc.addEventListener(`contextmenu`, (e) => {
            e.preventDefault();
            contextMenu.show();
            contextMenu.move(doc, e);
        }, true);

        components.update(() => $pages[$pages.indexOf($pages.find((e) => e.id === currentPage))].components);
        let newComponents = $components;
        $components.forEach((component) => {
            if (component.id === null) {
                /*
                TODO - omit? potentially redundant
                $pages[$pages.indexOf($pages.find((e) => e.id === currentPage))].components[$components.indexOf(component)].id = counter;
                $pages[$pages.indexOf($pages.find((e) => e.id === currentPage))].components[$components.indexOf(component)].options.dataId = counter;
                */
                newComponents[newComponents.indexOf(component)].id = counter;
                newComponents[newComponents.indexOf(component)].options.dataId = counter;
                counter++;
            }
            let options = component.options || {};
            options.dataId = component.id;
            createComponent(doc, body, component.tag, options, false);
        });
        components.update(() => newComponents);
        hasLoaded = true;
    };

    // * If changes have been made but not saved, alert the user before they close the page:
    const beforeunload = (e) => {
        if (!!$isModified) return null;
        e = e || window.event;
        if (e) e.returnValue = `Are you sure?`;
        return `Are you sure?`;
    };

    // * If the custom context menu is showing and the escape key has been pressed, then hide it:
    const keyup = (e) => (e.keyCode === 27 && contextMenu.menu && contextMenu.menuVisible) && (contextMenu.hide());

    // * Automatically set the width of the iframe based on whether the left menu is expanded:
    tab.subscribe((val) => classList = val !== false ? `shrink` : ``);

    // * Automatically update the iframe with user-generated custom CSS as it is being typed:
    css.subscribe((val) => {
        let generatedStyles = ``;
        $css.generated.forEach((selector) => {
            let rules = ``;
            selector.rules.forEach((rule) => rules += `${rule.key}: ${rule.val}; `);
            generatedStyles += `[data-id="${selector.id}"] { ${rules}} `;
        });
        if (body) {
            body.getElementsByTagName(`style`)[0].innerHTML = generatedStyles.trim();
            body.getElementsByTagName(`style`)[1].innerHTML = $css.custom.trim();
        }
    });

    // * Automatically update the page when it's been changed by another component:
    page.subscribe((val) => {
        if (doc) {
            if (currentPage !== val && canvas !== null) {
                reactive();
                currentPage = val;
                canvas.contentWindow.location.reload();
            }
        }
    });

    // * Determines whether the following reactive statement has been executed for the first time or any subsequent time:
    let isFirstLoad = false;

    // * Inform that some part of the project has been modified, and updates the page store with the latest data:
    const reactive = () => {
        const index = $pages.indexOf($pages.find((e) => e.id === currentPage));
        if (index !== -1) {
            $pages[index].body = `<!DOCTYPE html>${doc.getElementsByTagName(`html`)[0].outerHTML}`;
            $pages[index].components = $components;
            $isModified !== true && (isFirstLoad ? isModified.update(() => true) : isFirstLoad = true);
        }
    };
</script>

<svelte:window on:beforeunload={beforeunload} on:keyup={keyup} />

<svelte:head>
    <title>Append</title>
</svelte:head>

<iframe bind:this={canvas} id={name} class={classList} {name} {src} title={name} on:load={load} />

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
            max-width: calc(100vw - 40em - 40px) !important;
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
