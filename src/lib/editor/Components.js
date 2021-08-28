export default class Components {
    // * WIP
    constructor(components) {
        // * The list of all components:
        this.components = components;
    }

    // * Create a new component:
    create(dom, parent, tag, options, push) {
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
            if (el !== dom.activeElement && selection !== el.getAttribute(`data-id`)) {
                this.components.forEach((component) => {
                    if (component.element === null || typeof component.element === `undefined`) {
                        this.components[this.components.indexOf(component)].element = el;
                    }
                    if (component.element !== dom.activeElement && selection !== component.element.getAttribute(`data-id`)) {
                        component.element.style.outline = ``;
                        component.element.style.boxShadow = ``;
                    }
                });
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
            if (el !== dom.activeElement && selection !== el.getAttribute(`data-id`)) {
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
            this.components.forEach((component) => {
                if (component.element === null || typeof component.element === `undefined`) {
                    this.components[this.components.indexOf(component)].element = el;
                }
                component.element.style.outline = ``;
                component.element.style.boxShadow = ``;
            });
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
            this.components.forEach((component) => {
                component.element.style.outline = ``;
                component.element.style.boxShadow = ``;
            });
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
        push && (this.components.push({ id: el.getAttribute(`data-id`), element: el, children: [], tag, options, }));
        parent.appendChild(el);
        return el;
    }

    moveItem(array, from, to) {
        const el = array[from];
        array.splice(from, 1);
        array.splice(to, 0, el);
        return array;
    }

    // * Move an existing component:
    move(dom, from, to, mouseY) {
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
                    this.components = moveItem(this.components, this.components.indexOf(this.components.find((e) => e.id === parseInt(from))), this.components.indexOf(this.components.find((e) => e.id === parseInt(to))));
                } else {
                    // * append
                    toEl.parentElement.insertBefore(fromEl, toEl.nextSibling);
                    this.components = moveItem(this.components, this.components.indexOf(this.components.find((e) => e.id === parseInt(from))), this.components.indexOf(this.components.find((e) => e.id === parseInt(to))));
                }
        }
        reactive();
    }

    // * Remove a component:
    unset(dom, id) {
        this.components.splice(this.components.indexOf(this.components.find((e) => e.id === id)), 1);
        reactive();
        dom.querySelector(`[data-id="${id}"]`).remove();
    }
};
