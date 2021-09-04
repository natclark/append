<script>
    import init from '$lib/stores/init';
    import websites from '$lib/stores/websites';
    import website from '$lib/stores/website';
    import pages from '$lib/stores/pages';
    import page from '$lib/stores/page';
    import { goto } from '$app/navigation';
    import components from '$lib/stores/components';
    import tab from '$lib/stores/tab';
    import css from '$lib/stores/css';
    import iframe from '$lib/stores/iframe';
    import element from '$lib/stores/element';
    import isModified from '$lib/stores/ismodified';
    import ContextMenu from '$lib/editor/ContextMenu';
    import ShortcutMenu from '$lib/editor/ShortcutMenu';
    import { onDestroy } from 'svelte';

    // * If no website is selected or if there are no websites, then redirect back to the dashboard:
    const start = () => {
        if ($init === false || $websites.length < 1 || $website < 0 || $pages.length < 0 || $page < 0) {
            goto(`/websites/`);
        }
    };

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

    if ($websites.length > 0 && $website > -1 && $pages.length > -1 && $page > -1) {
        // * The object array of components:
        components.update(() => $pages[$pages.indexOf($pages.find((e) => e.id === currentPage))].components);
        // * The website's CSS (both custom and generated):
        css.update(() => $websites[$websites.indexOf($websites.find((e) => e.id === $website))].css);
    }

    // * The object array of items within the custom context menu:
    let menuOptions = [];

    // * Create a new component:
    const createComponent = (dom, parent, tag, options, push) => {
        let el = dom.createElement(tag);
        Object.keys(options).forEach((key) => el[key] = options[key]);
        let editable = el.contentEditable === `inherit` ? false : true;
        editable && (el.contentEditable = false);
        el.setAttribute(`data-id`, counter);
        counter++;
        el.style.cursor = `pointer`;
        el.draggable = `true`;
        el.style.willChange = `box-shadow`;
        el.addEventListener(`mouseover`, () => {
            if (el !== dom.activeElement && selection != el.getAttribute(`data-id`)) {
                let newComponents = $components;
                $components.forEach((component) => {
                    try {
                        if (component.element !== dom.activeElement && selection !== parseInt(component.element.getAttribute(`data-id`))) {
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
                /* TODO
                elStyle.marginTop.replace(/[^\d.-]/g, ``) > 0 && (el.style.boxShadow += `0 -${elStyle.marginTop} 0 rgba(255, 255, 0, .15)`);
                elStyle.marginRight.replace(/[^\d.-]/g, ``) > 0 && (el.style.boxShadow += `${elStyle.marginRight} 0 0 rgba(255, 255, 0, .15)`);
                elStyle.marginBottom.replace(/[^\d.-]/g, ``) > 0 && (el.style.boxShadow += `0 ${elStyle.marginBottom} 0 rgba(255, 255, 0, .15)`);
                elStyle.marginLeft.replace(/[^\d.-]/g, ``) > 0 && (el.style.boxShadow += `-${elStyle.marginLeft} 0 0 rgba(255, 255, 0, .15)`);
                elStyle.paddingTop.replace(/[^\d.-]/g, ``) > 0 && (el.style.boxShadow += `inset 0 -${elStyle.paddingTop} 0 rgba(128, 0, 128, .15)`);
                elStyle.paddingRight.replace(/[^\d.-]/g, ``) > 0 && (el.style.boxShadow += `inset ${elStyle.paddingRight} 0 0 rgba(128, 0, 128, .15)`);
                elStyle.paddingBottom.replace(/[^\d.-]/g, ``) > 0 && (el.style.boxShadow += `inset 0 ${elStyle.paddingBottom} 0 rgba(128, 0, 128, .15)`);
                elStyle.paddingLeft.replace(/[^\d.-]/g, ``) > 0 && (el.style.boxShadow += `inset -${elStyle.paddingLeft} 0 0 rgba(128, 0, 128, .15)`);
                */
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
            selection = parseInt(el.getAttribute(`data-id`));
            const obj = { id: selection, el, };
            element.update(() => obj);
            el.focus();
            const boxShadow = el.style.boxShadow;
            let newComponents = $components;
            $components.forEach((component) => {
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
            selection = parseInt(el.getAttribute(`data-id`));
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
            if (push) {
                options[`textContent`] = el.textContent;
            } else {
                let newComponents = $components;
                newComponents[newComponents.indexOf(newComponents.find((e) => e.id === parseInt(el.getAttribute(`data-id`))))].options[`textContent`] = el.textContent;
                components.update(() => newComponents);
            }
        });
        if (push) {
            let newComponents = $components;
            newComponents.push({ id: parseInt(el.getAttribute(`data-id`)), element: el, children: [], tag, options, styles: [], globals: [], });
            components.update(() => newComponents);
        }
        parent.appendChild(el);
        return el;
    };

    const moveItem = (array, from, to) => {
        let arr = array;
        const el = arr[from];
        arr.splice(from, 1);
        arr.splice(to, 0, el);
        return arr;
    };

    // * Move an existing component:
    const moveComponent = (dom, from, to, mouseY) => {
        let fromEl = dom.querySelector(`[data-id="${from}"]`);
        let toEl = to === -1 ? dom.querySelector(`body`) : dom.querySelector(`[data-id="${to}"]`);
        switch (toEl.tagName) {
            case `BODY`:
                // TODO - redo this (this is a sloppy and unsustainble solution. but good enough for most pages for now.)
                const last = dom.body.lastElementChild;
                const bodyStyle = dom.body.getBoundingClientRect();
                const elStyle = last.getBoundingClientRect();
                ((mouseY - 240) > (bodyStyle.top + elStyle.top)) && (dom.body.appendChild(fromEl));
                break;
            case `DIV`:
                break;
            default:
                let toIndex = Array.prototype.indexOf.call(dom.querySelectorAll(`*`), toEl);
                let fromIndex = Array.prototype.indexOf.call(dom.querySelectorAll(`*`), fromEl);
                if (fromIndex > toIndex) {
                    // * prepend
                    toEl.parentElement.insertBefore(fromEl, toEl);
                    if (to === -1) {
                        components.update(() => moveItem($components, $components.indexOf($components.find((e) => e.id === from)), $components.length - 1));
                    } else {
                        components.update(() => moveItem($components, $components.indexOf($components.find((e) => e.id === from)), $components.indexOf($components.find((e) => e.id === to))));
                    }
                } else {
                    // * append
                    toEl.parentElement.insertBefore(fromEl, toEl.nextSibling);
                    if (to === -1) {
                        components.update(() => moveItem($components, $components.indexOf($components.find((e) => e.id === from)), $components.length - 1));
                    } else {
                        components.update(() => moveItem($components, $components.indexOf($components.find((e) => e.id === from)), $components.indexOf($components.find((e) => e.id === to))));
                    }
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
        selection = -1;
        counter = 0;
        iframe.update(() => window.frames[`canvas`]);
        doc = window.frames[`canvas`].document;
        html = doc.getElementsByTagName(`html`)[0];
        head = doc.getElementsByTagName(`head`)[0];
        body = doc.getElementsByTagName(`body`)[0];

        let dragged = null;
        let tagName = ``;

        doc.addEventListener(`drag`, (e) => {
            // TODO
        }, false);
        doc.addEventListener(`dragstart`, (e) => {
            if (e.dataTransfer.getData(`element`) && !e.target.getAttribute(`data-id`)) {
                dragged = null;
                tagName = e.dataTransfer.getData(`element`); 
                e.dataTransfer.setData(`text/plain`, null);
            } else {
                dragged = e.target;
                try {
                    if (dragged.getAttribute(`data-id`) === null && dragged.tagName !== `BODY`) {
                        dragged.setAttribute(`data-id`, counter);
                        counter++;
                    }
                } catch (err) {
                    if (dragged.parentElement.getAttribute(`data-id`) === null && dragged.parentElement.tagName !== `BODY`) {
                        dragged.parentElement.setAttribute(`data-id`, counter);
                        counter++;
                    }
                }
                e.target.style.opacity = .8;
            }
        }, false);
        doc.addEventListener(`dragend`, (e) => {
            typeof e.target.style !== `undefined` && (e.target.style.opacity = ``);
        }, false);
        doc.addEventListener(`dragover`, (e) => {
            e.preventDefault();
            if (e.dataTransfer.getData(`element`) && !parseInt(e.target.getAttribute(`data-id`))) {
                dragged = null;
                tagName = e.dataTransfer.getData(`element`);
            }
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
            // TODO clean this bit up
            let id = -1;
            try {
                id = parseInt(e.target.getAttribute(`data-id`));
            } catch (err) {
                try {
                    id = parseInt(e.target.parentElement.getAttribute(`data-id`));
                } catch (error) {}
            }
            if (id === null && e.target.tagName !== `BODY` && e.target.tagName !== `HTML`) {
                id = counter;
                counter++;
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
            e.target.style.backgroundColor = ``;
            e.target.style.outline = ``;
            if (e.target.tagName !== `HTML`) {
                if (dragged !== null && typeof e.target.style !== `undefined`) { // * ensure some stray text wasn't dragged
                    // * An existing element has been dropped and was moved from another location within the iframe:
                    if (e.target.tagName !== `BODY` && dragged.tagName !== `BODY`) {
                        let id = parseInt(e.target.getAttribute(`data-id`));
                        if (id === null) {
                            id = counter;
                            counter++;
                            e.target.setAttribute(`data-id`, id);
                        }
                        moveComponent(doc, parseInt(dragged.getAttribute(`data-id`)), id, e.screenY);
                        doc.activeElement.blur();
                        dragged.click();
                        dragged.focus();
                    }
                } else if (tagName !== null) {
                    // * A new element has been dropped:
                    let targetId = -1;
                    if (e.target.tagName !== `BODY`) {
                        targetId = parseInt(e.target.getAttribute(`data-id`));
                    }
                    // * If the dropped element came from the sidebar:
                    switch (tagName) {
                        // * These are some special cases for creating "exception" elements:
                        case `container`:
                            createComponent(doc, body, `div`, { className: `container`, }, true);
                            break;
                        case `item`:
                            createComponent(doc, body, `div`, { className: `item`, }, true);
                            break;
                        case `ul`:
                            createComponent(doc, createComponent(doc, body, `ul`, {}, true), `li`, { contentEditable: true, textContent: `This is some dummy text.`, }, true);
                            break;
                        case `markdown`:
                            createComponent(doc, body, `div`, { contentEditable: true, classList: `markdown`, }, true);
                            break;
                        case `rich-text`:
                            createComponent(doc, body, `div`, { contentEditable: true, classList: `rich-text`, }, true);
                            break;
                        case `details`:
                            createComponent(doc, createComponent(doc, body, `details`, { contentEditable: true, textContent: `This is some dummy text.`, }, true), `summary`, { contentEditable: true, textContent: `Dropdown`, }, true);
                            break;
                        case `img`:
                            createComponent(doc, body, `img`, { alt: `Undescribed image`, height: `100%`, src: ``, width: `100%`, }, true);
                            break;
                        case `video`:
                            alert(`This component is still in the works! Sorry.`);
                            break;
                        case `audio`:
                            alert(`This component is still in the works! Sorry.`);
                            break;
                        default:
                            // * This is the "catch-all" for creating any other kind of element:
                            createComponent(doc, body, tagName, { contentEditable: true, textContent: `This is some dummy text.`, }, true);
                    }
                    moveComponent(doc, counter - 1, targetId, e.screenY);
                }
            }
        }, false);

        doc.addEventListener(`selectionchange`, () => {
            shortcutMenu.selectedText = doc.getSelection();
            if (shortcutMenu.selectedText.anchorNode.data !== ``) {
                // TODO: Show options for bold/underline/linking/etc.
            }
        });

        createComponent(doc, body, `style`, { type: `text/css`, innerHTML: ``, }, false);
        createComponent(doc, body, `style`, { type: `text/css`, innerHTML: $css.trim(), }, false);
        createComponent(doc, body, `style`, { type: `text/css`, innerHTML: contextMenu.menuStyles.trim(), }, false);
        createComponent(doc, body, `nav`, { class: `append-contextMenu`, innerHTML: contextMenu.menuMarkup.trim(), }, false);

        contextMenu.menu = doc.querySelector(`.append-contextMenu`);
        contextMenu.hide();
        doc.addEventListener(`click`, (e) => {
            if (e.target.tagName === `BODY`) {
                let newComponents = $components;
                const componentIndex = newComponents.indexOf(newComponents.find((component) => component.id === selection));
                if (componentIndex > -1) {
                    doc.querySelector(`[data-id="${selection}"]`).blur();
                    doc.querySelector(`[data-id="${selection}"]`).style.cursor = `pointer`;
                    doc.querySelector(`[data-id="${selection}"]`).style.outline = ``;
                    doc.querySelector(`[data-id="${selection}"]`).style.boxShadow = ``;
                    selection = -1;
                    newComponents[componentIndex].element.contentEditable !== `inherit` && (newComponents[componentIndex].element.contentEditable = false);
                    element.update(() => false);
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

        ($websites.length > 0 && $website > -1 && $pages.length > -1 && $page > -1) && (components.update(() => $pages[$pages.indexOf($pages.find((e) => e.id === currentPage))].components));
        let newComponents = $components;
        $components.forEach((component) => {
            // TODO cleanup
            let componentId;
            // * Here, we do not increment the counter. That is done inside createComponent, because component.id and component.el.getAttribute(`data-id`) should be the same.
            // componentId = component.id === null ? counter : parseInt(component.id);
            componentId = counter;
            newComponents[newComponents.indexOf(component)].id = componentId;
            let options = component.options || {};
            createComponent(doc, body, component.tag, options, false);
            $components[$components.indexOf($components.find((e) => e.id === componentId))].element === null && (newComponents[newComponents.indexOf(newComponents.find((e) => e.id === componentId))].element = doc.querySelector(`[data-id="${componentId}"]`));
        });
        components.update(() => newComponents);
        let generatedStyles = ``;
        $components.forEach((component) => {
            if (component.styles !== []) {
                let rules = ``;
                component.styles.forEach((rule) => rules += `${rule.key}: ${rule.val}; `);
                generatedStyles += `[data-id="${component.id}"] { ${rules}}`;
            }
        });
        body.getElementsByTagName(`style`)[0].innerHTML = generatedStyles.trim();
        hasLoaded = true;
    };

    // * If changes have been made but not saved, alert the user before they close the page:
    const beforeunload = (e) => {
        if ($isModified === false) return null;
        e = e || window.event;
        e && (e.returnValue = `Are you sure?`);
        return `Are you sure?`;
    };

    // * If the custom context menu is showing and the escape key has been pressed, then hide it:
    const keyup = (e) => (e.keyCode === 27 && contextMenu.menu && contextMenu.menuVisible) && (contextMenu.hide());

    // * Automatically set the width of the iframe based on whether the left menu is expanded:
    const tabUnsubscribe = tab.subscribe((val) => classList = val !== false ? `shrink` : ``);

    // * Automatically update the iframe with user-generated, custom CSS as it is being typed:
    const cssUnsubscribe = css.subscribe((val) => body && (body.getElementsByTagName(`style`)[1].innerHTML = $css.trim()));

    const componentsUnsubscribe = components.subscribe((val) => {
        let generatedStyles = ``;
        val.forEach((component) => {
            if (component.styles !== []) {
                let rules = ``;
                component.styles.forEach((rule) => rules += `${rule.key}: ${rule.val}; `);
                generatedStyles += `[data-id="${component.id}"] { ${rules}}`;
            }
        });
        body && (body.getElementsByTagName(`style`)[0].innerHTML = generatedStyles.trim());
        doc && (reactive());
    });

    // * Automatically update the page when it's been changed by another component:
    const pageUnsubscribe = page.subscribe((val) => {
        if (doc) {
            if (currentPage !== val && canvas !== null) {
                reactive();
                element.update(() => false);
                currentPage = val;
                components.update(() => $pages[$pages.indexOf($pages.find((e) => e.id === currentPage))].components);
                canvas.contentWindow.location.reload();
            }
        }
    });

    // * Determines whether the following reactive statement has been executed for the first time or any subsequent time:
    let isFirstLoad = false;

    // * Inform that some part of the project has been modified, and updates the page store with the latest data:
    const reactive = () => {
        const pageIndex = $pages.indexOf($pages.find((e) => e.id === currentPage));
        const websiteIndex = $websites.indexOf($websites.find((e) => e.id === $website));
        if (pageIndex !== -1 && websiteIndex !== -1) {
            let newPages = $pages;
            newPages[pageIndex].body = `<!DOCTYPE html>${doc.getElementsByTagName(`html`)[0].outerHTML}`;
            newPages[pageIndex].components = $components;
            pages.update(() => newPages);
            let newWebsites = $websites;
            newWebsites[websiteIndex].pages = $pages;
            newWebsites[websiteIndex].css = $css.trim();
            websites.update(() => newWebsites);
            $isModified !== true && (isFirstLoad ? isModified.update(() => true) : isFirstLoad = true);
        }
    };

    onDestroy(() => {
        tabUnsubscribe();
        cssUnsubscribe();
        componentsUnsubscribe();
        pageUnsubscribe();
    });
</script>

<svelte:window on:sveltekit:start={start} on:beforeunload={beforeunload} on:keyup={keyup} />

<svelte:head>
    <title>Editor - Append</title>
    <link rel="canonical" href="https://tryappend.com/editor/">
</svelte:head>

<iframe bind:this={canvas} id={name} class={classList} {name} {src} title={name} on:load={load} />

<style>
    iframe {
        background-color: #fff;
        border: 0;
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
