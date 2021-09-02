<script>
    import tab from '$lib/stores/tab';
    import pages from '$lib/stores/pages';
    import page from '$lib/stores/page';
    import components from '$lib/stores/components';
    import iframe from '$lib/stores/iframe';
    import element from '$lib/stores/element';
    import iro from '../../../../node_modules/@jaames/iro/dist/iro.es.js';
    import { onDestroy } from 'svelte';
    import Dropdown from '$lib/components/Layout/Dropdown.svelte';
    import Breaker from '$lib/components/Layout/Breaker.svelte';
    import Spacing from './Spacing.svelte';

    let currentTab;
    let classList;

    const elements = [
        { tag: `H1`, name: `Header`, },
        { tag: `H2`, name: `Header`, },
        { tag: `H3`, name: `Header`, },
        { tag: `H4`, name: `Header`, },
        { tag: `H5`, name: `Header`, },
        { tag: `H6`, name: `Header`, },
        { tag: `P`, name: `Paragraph`, },
        { tag: `LI`, name: `List Item`, },
        { tag: `BLOCKQUOTE`, name: `Blockquote`, },
        { tag: `A`, name: `Link`, },
        { tag: `CODE`, name: `Code`, },
        { tag: `BUTTON`, name: `Button`, },
        { tag: `SUMMARY`, name: `Dropdown Toggle`, },
        { tag: `DETAILS`, name: `Dropdown`, },
        { tag: `IMG`, name: `Image`, },
        { tag: `VIDEO`, name: `Video`, },
        { tag: `AUDIO`, name: `Audio`, }
    ];

    let currentElement = null;

    let tag = ``;

    let doc = null;

    const headerChange = (e) => { // TODO
        const val = e.target.value;
        if (val === `H1` || val === `H2` || val === `H3` || val === `H4` || val === `H5` || val === `H6` && doc !== null) {
            let oldHeader = doc.querySelector(`[data-id="${currentElement.id}"]`);
            let newHeader = doc.createElement(val.toLowerCase());

            while (oldHeader.firstChild) newHeader.appendChild(oldHeader.firstChild);

            for (let i = oldHeader.attributes.length - 1; i >= 0; --i) newHeader.attributes.setNamedItem(oldHeader.attributes[i].cloneNode());

            oldHeader.parentNode.replaceChild(newHeader, oldHeader);
        }
    };

    const newStyle = (key, val) => {
        attributes[key.replaceAll(`-`, `_`)] = val;
        let newComponents = $components;
        let generated = newComponents[newComponents.indexOf(newComponents.find((e) => e.id === currentElement.id))].styles;
        const ruleIndex = generated.indexOf(generated.find((e) => e.key === key));
        ruleIndex !== -1 ? generated[ruleIndex] = { key, val, } : generated.push({ key, val, });
        newComponents[newComponents.indexOf(newComponents.find((e) => e.id === currentElement.id))].styles = generated;
        components.update(() => newComponents);
    };

    const getStyle = (key) => {
        let generated = $components[$components.indexOf($components.find((e) => e.id === currentElement.id))].styles;
        const ruleIndex = generated.indexOf(generated.find((e) => e.key === key));
        return ruleIndex !== -1 ? generated[ruleIndex].val : null;
    };

    const typeChange = (e) => {
        // TODO
    };

    const alignItemsChange = (e) => newStyle(`align-items`, e.target.value);

    const justifyContentChange = (e) => newStyle(`justify-content`, e.target.value);

    const colorChange = (e) => {
        newStyle(`color`, e.target.value);
        colorButton.style.backgroundColor = e.target.value;
    };

    const backgroundColorChange = (e) => {
        newStyle(`background-color`, e.target.value);
        backgroundButton.style.backgroundColor = e.target.value;
    };

    const marginTopChange = (e) => newStyle(`margin-top`, e.target.value);
    const marginRightChange = (e) => newStyle(`margin-right`, e.target.value);
    const marginBottomChange = (e) => newStyle(`margin-bottom`, e.target.value);
    const marginLeftChange = (e) => newStyle(`margin-left`, e.target.value);

    const paddingTopChange = (e) => newStyle(`padding-top`, e.target.value);
    const paddingRightChange = (e) => newStyle(`padding-right`, e.target.value);
    const paddingBottomChange = (e) => newStyle(`padding-bottom`, e.target.value);
    const paddingLeftChange = (e) => newStyle(`padding-left`, e.target.value);

    const textAlignChange = (e, alignment) => newStyle(`text-align`, alignment);

    const fontFamilyChange = (e) => newStyle(`font-family`, e.target.value);

    const fontSizeChange = (e) => newStyle(`font-size`, e.target.value);

    const fontWeightChange = (e) => newStyle(`font-weight`, e.target.value);

    const fontStyleChange = (e) => newStyle(`font-style`, e.target.value);

    const lineHeightChange = (e) => newStyle(`line-height`, e.target.value);

    const letterSpacingChange = (e) => newStyle(`letter-spacing`, e.target.value);

    const unsetComponent = () => {
        let newComponents = $components;
        newComponents.splice(newComponents.indexOf(newComponents.find((e) => e.id === currentElement.id)), 1);
        components.update(() => newComponents);
        $pages[$page].components = $components; // ? What other state changes from this componenet should this var be updated for?
        doc.querySelector(`[data-id="${currentElement.id}"]`).remove();
        currentElement = null;
    }

    const tabUnsubscribe = tab.subscribe((val) => classList = val !== false ? `stretch` : ``);

    const iframeUnsubscribe = iframe.subscribe((val) => typeof val.document !== `undefined` && (doc = val.document));

    const elementUnsubscribe = element.subscribe((val) => typeof val !== `undefined` && (currentElement = val));

    let colorModal = null;
    let color = null;
    let colorButton = null;
    let colorInput = null;
    let backgroundModal = null;
    let background = null;
    let backgroundButton = null;
    let backgroundInput = null;
    let isMounted = false;

    const mountPickers = () => {
        try {
            isMounted = true;
            const colorPicker = new iro.ColorPicker(color, {
                color: attributes.color || `#000000`,
                layout: [
                    {
                        component: iro.ui.Box,
                    },
                    {
                        component: iro.ui.Slider,
                        options: {
                            sliderType: `hue`,
                        },
                    }
                ],
                width: 200,
            });
            colorPicker.on([`color:init`, `color:change`], (color) => {
                newStyle(`color`, color.hexString);
                colorInput.value = color.hexString;
                colorButton.style.backgroundColor = color.hexString;
            });
            const backgroundPicker = new iro.ColorPicker(background, {
                color: attributes.background_color || `#ffffff`,
                layout: [
                    {
                        component: iro.ui.Box,
                    },
                    {
                        component: iro.ui.Slider,
                        options: {
                            sliderType: `hue`,
                        },
                    }
                ],
                width: 200,
            });
            backgroundPicker.on([`color:init`, `color:change`], (color) => {
                newStyle(`background-color`, color.hexString);
                backgroundInput.value = color.hexString;
                backgroundButton.style.backgroundColor = color.hexString;
            });
        } catch (e) {}
        colorModal.addEventListener(`click`, () => {
            backgroundModal.removeAttribute(`open`);
        });
        backgroundModal.addEventListener(`click`, () => {
            colorModal.removeAttribute(`open`);
        });
        const pickers = document.querySelectorAll(`.picker`);
        const contains = (child) => {
            let res = false;
            pickers.forEach((picker) => picker === child || picker.contains(child) && (res = true));
            return res;
        };
        document.addEventListener(`click`, (e) => {
            if (e.target.className !== `picker__modal` && !contains(e.target)) {
                try {
                    backgroundModal.removeAttribute(`open`);
                    colorModal.removeAttribute(`open`);
                } catch (e) {}
            }
        });
    };

    let attributes = {
        type: null,
        align_items: null,
        justify_content: null,
        color: null,
        background_color: null,
        margin_top: null,
        margin_right: null,
        margin_bottom: null,
        margin_left: null,
        padding_top: null,
        padding_right: null,
        padding_bottom: null,
        padding_left: null,
        text_align: null,
        font_family: null,
        font_size: null,
        font_weight: null,
        font_style: null,
        line_height: null,
        letter_spacing: null,
    };

    onDestroy(() => {
        tabUnsubscribe();
        iframeUnsubscribe();
        elementUnsubscribe();
    });

    $: {
        (currentElement !== null && typeof currentElement.el !== `undefined`) && (Object.keys(attributes).forEach((key) => attributes[key] = getStyle(key.replaceAll(`_`, `-`))));
        (color && background && colorModal && backgroundModal && !isMounted) && (mountPickers());
    }
</script>

<aside class={classList}>
    {#if currentElement !== null && typeof currentElement.el !== `undefined`}
        {#if elements.indexOf(elements.find((e) => e.tag === currentElement.el.tagName)) !== -1 || currentElement.el.tagName === `DIV`}
            <h2>{currentElement.el.tagName !== `DIV` ? elements[elements.indexOf(elements.find((e) => e.tag === currentElement.el.tagName))].name : `${currentElement.el.className.substring(0, 1).toUpperCase()}${currentElement.el.className.slice(1)}`}</h2>
            <!--
            TODO: Allow for changing header level
            <Dropdown text="Level">
                <div class="level">
                    <p class="normal">Level</p>
                    <select value={currentElement.el.tagName} on:change={headerChange}>
                        <option value="H1">Heading 1</option>
                        <option value="H2">Heading 2</option>
                        <option value="H3">Heading 3</option>
                        <option value="H4">Heading 4</option>
                        <option value="H5">Heading 5</option>
                        <option value="H6">Heading 6</option>
                    </select>
                </div>
            </Dropdown>
            -->
            {#if currentElement.el.tagName === `DIV`}
                <Dropdown text="Type">
                    <div class="level">
                        <p class="normal">Type</p>
                        <select value={attributes.type || `columns`} on:change={typeChange}>
                            <option value="wrapper">Wrapper</option>
                            <option value="columns">Columns</option>
                            <option value="grid">Grid</option>
                        </select>
                    </div>
                    <div class="level">
                        <p class="normal">Alignment</p>
                        <select value={attributes.align_items || `stretch` } on:change={alignItemsChange}>
                            <option value="center">Center</option>
                            <option value="flex-start">Top</option>
                            <option value="flex-end">Bottom</option>
                            <option value="stretch">Stretch</option>
                        </select>
                    </div>
                    <div class="level">
                        <p class="normal">Justification</p>
                        <select value={attributes.justify_content || `flex-start`} on:change={justifyContentChange}>
                            <option value="center">Center</option>
                            <option value="flex-start">Left</option>
                            <option value="flex-end">Right</option>
                        </select>
                    </div>
                </Dropdown>
            {:else if currentElement.el.tagName === `H1` || currentElement.el.tagName === `H2` || currentElement.el.tagName === `H3` || currentElement.el.tagName === `H4` || currentElement.el.tagName === `H5` || currentElement.el.tagName === `H6` || currentElement.el.tagName === `P` || currentElement.el.tagName === `LI`}
                <Dropdown text="Color">
                    <div class="level">
                        <p class="normal">Text Color</p>
                        <div class="flex picker">
                            <details bind:this={colorModal}>
                                <summary class="picker__toggle"><div bind:this={colorButton} class="picker__button" style="background-color: {attributes.color || `#000000`};"></div></summary>
                                <div bind:this={color} class="picker__modal"></div>
                            </details>
                            <input bind:this={colorInput} class="picker__input" type="text" value={attributes.color || `#000000`} on:change={colorChange}>
                        </div>
                    </div>
                    <div class="level">
                        <p class="normal">Background</p>
                        <div class="flex picker">
                            <details bind:this={backgroundModal}>
                                <summary class="picker__toggle"><div bind:this={backgroundButton} class="picker__button" style="background-color: {attributes.background_color || `#ffffff`};"></div></summary>
                                <div bind:this={background} class="picker__modal" value={attributes.color || `#000000`}></div>
                            </details>
                            <input bind:this={backgroundInput} class="picker__input" type="text" value={attributes.background_color || `#ffffff`} on:change={backgroundColorChange}>
                        </div>
                    </div>
                </Dropdown>
            {/if}
            <Dropdown text="Spacing">
                <div class="level">
                    <Spacing text="Margin" />
                </div>
                <Breaker />
                <div class="level">
                    <Spacing text="Padding" />
                </div>
            </Dropdown>
            {#if currentElement.el.tagName === `H1` || currentElement.el.tagName === `H2` || currentElement.el.tagName === `H3` || currentElement.el.tagName === `H4` || currentElement.el.tagName === `H5` || currentElement.el.tagName === `H6` || currentElement.el.tagName === `P` || currentElement.el.tagName === `LI`}
                <Dropdown text="Typography">
                    <div class="level">
                        <p class="normal">Alignment</p>
                        <div class="flex">
                            <button class={attributes.text_align === `left` || attributes.text_align === null ? `selected` : ``} on:click={(e) => textAlignChange(e, `left`)}>
                                <svg version="1.1" x="0px" y="0px" viewBox="0 0 122.88 85.36" style="enable-background:new 0 0 122.88 85.36" xml:space="preserve">
                                    <g>
                                        <path fill="#ddd" d="M6.12,12.23C2.74,12.23,0,9.49,0,6.12C0,2.74,2.74,0,6.12,0h110.65c3.38,0,6.12,2.74,6.12,6.12c0,3.38-2.74,6.12-6.12,6.12 H6.12L6.12,12.23z M6.12,36.61C2.74,36.61,0,33.87,0,30.49c0-3.38,2.74-6.12,6.12-6.12H76.5c3.38,0,6.12,2.74,6.12,6.12 c0,3.38-2.74,6.12-6.12,6.12H6.12L6.12,36.61z M6.12,60.99C2.74,60.99,0,58.25,0,54.87c0-3.38,2.74-6.12,6.12-6.12h110.65 c3.38,0,6.12,2.74,6.12,6.12c0,3.38-2.74,6.12-6.12,6.12H6.12L6.12,60.99z M6.12,85.36C2.74,85.36,0,82.63,0,79.25 c0-3.38,2.74-6.12,6.12-6.12H76.5c3.38,0,6.12,2.74,6.12,6.12c0,3.38-2.74,6.12-6.12,6.12H6.12L6.12,85.36z"></path>
                                    </g>
                                </svg>
                            </button>
                            <button class={attributes.text_align === `center` ? `selected` : ``} on:click={(e) => textAlignChange(e, `center`)}>
                                <svg version="1.1" x="0px" y="0px" viewBox="0 0 122.88 85.36" style="enable-background:new 0 0 122.88 85.36" xml:space="preserve">
                                    <g>
                                        <path fill="#ddd" d="M6.12,12.23C2.74,12.23,0,9.49,0,6.12C0,2.74,2.74,0,6.12,0h110.65c3.38,0,6.12,2.74,6.12,6.12c0,3.38-2.74,6.12-6.12,6.12 H6.12L6.12,12.23z M26.25,85.36c-3.38,0-6.12-2.74-6.12-6.12c0-3.38,2.74-6.12,6.12-6.12h70.38c3.38,0,6.12,2.74,6.12,6.12 c0,3.38-2.74,6.12-6.12,6.12H26.25L26.25,85.36z M6.12,60.99C2.74,60.99,0,58.25,0,54.87c0-3.38,2.74-6.12,6.12-6.12h110.65 c3.38,0,6.12,2.74,6.12,6.12c0,3.38-2.74,6.12-6.12,6.12H6.12L6.12,60.99z M26.25,36.61c-3.38,0-6.12-2.74-6.12-6.12 c0-3.38,2.74-6.12,6.12-6.12h70.38c3.38,0,6.12,2.74,6.12,6.12c0,3.38-2.74,6.12-6.12,6.12H26.25L26.25,36.61z"></path>
                                    </g>
                                </svg>
                            </button>
                            <button class={attributes.text_align === `right` ? `selected` : ``} on:click={(e) => textAlignChange(e, `right`)}>
                                <svg version="1.1" x="0px" y="0px" viewBox="0 0 122.88 85.36" style="enable-background:new 0 0 122.88 85.36" xml:space="preserve">
                                    <g>
                                        <path fill="#ddd" d="M6.12,12.23C2.74,12.23,0,9.49,0,6.12C0,2.74,2.74,0,6.12,0h110.65c3.38,0,6.12,2.74,6.12,6.12c0,3.38-2.74,6.12-6.12,6.12 H6.12L6.12,12.23z M46.38,85.36c-3.38,0-6.12-2.74-6.12-6.12c0-3.38,2.74-6.12,6.12-6.12h70.38c3.38,0,6.12,2.74,6.12,6.12 c0,3.38-2.74,6.12-6.12,6.12H46.38L46.38,85.36z M6.12,60.99C2.74,60.99,0,58.25,0,54.87c0-3.38,2.74-6.12,6.12-6.12h110.65 c3.38,0,6.12,2.74,6.12,6.12c0,3.38-2.74,6.12-6.12,6.12H6.12L6.12,60.99z M46.38,36.61c-3.38,0-6.12-2.74-6.12-6.12 c0-3.38,2.74-6.12,6.12-6.12h70.38c3.38,0,6.12,2.74,6.12,6.12c0,3.38-2.74,6.12-6.12,6.12H46.38L46.38,36.61z"></path>
                                    </g>
                                </svg>
                            </button>
                            <button class={attributes.text_align === `justify` ? `selected` : ``} on:click={(e) => textAlignChange(e, `justify`)}>
                                <svg version="1.1" x="0px" y="0px" viewBox="0 0 122.88 85.32" style="enable-background:new 0 0 122.88 85.32" xml:space="preserve">
                                    <g>
                                        <path fill="#ddd" d="M6.15,12.23c-3.38,0-6.11-2.74-6.11-6.11S2.77,0,6.15,0h110.59c3.38,0,6.11,2.74,6.11,6.11s-2.74,6.11-6.11,6.11H6.15 L6.15,12.23z M6.11,85.32C2.74,85.32,0,82.58,0,79.2c0-3.38,2.74-6.11,6.11-6.11h110.65c3.38,0,6.11,2.74,6.11,6.11 c0,3.38-2.74,6.11-6.11,6.11H6.11L6.11,85.32z M6.15,60.95c-3.38,0-6.11-2.74-6.11-6.11s2.74-6.11,6.11-6.11h110.59 c3.38,0,6.11,2.74,6.11,6.11s-2.74,6.11-6.11,6.11H6.15L6.15,60.95z M6.11,36.59C2.74,36.59,0,33.85,0,30.48s2.74-6.11,6.11-6.11 h110.65c3.38,0,6.11,2.74,6.11,6.11s-2.74,6.11-6.11,6.11H6.11L6.11,36.59z"></path>
                                    </g>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="level">
                        <p class="normal">Font Family</p>
                        <select value={attributes.font_family} on:change={fontFamilyChange}>
                            <option value="Arial">Arial</option>
                        </select>
                    </div>
                    <div class="level">
                        <p class="normal">Font Size</p>
                        <input type="text" value={attributes.font_size} on:change={fontSizeChange}>
                    </div>
                    <div class="level">
                        <p class="normal">Font Weight</p>
                        <select value={attributes.font_weight || `400`} on:change={fontWeightChange}>
                            <option value="inherit">Inherit</option>
                            <option value="100">100</option>
                            <option value="200">200</option>
                            <option value="300">300</option>
                            <option value="400">400 (Normal)</option>
                            <option value="500">500</option>
                            <option value="600">600</option>
                            <option value="700">700 (Bold)</option>
                            <option value="800">800</option>
                            <option value="900">900</option>
                        </select>
                    </div>
                    <div class="level">
                        <p class="normal">Font Style</p>
                        <select value={attributes.font_style || `normal`} on:change={fontStyleChange}>
                            <option value="normal">Normal</option>
                            <option value="italic">Italic</option>
                            <option value="oblique">Oblique</option>
                        </select>
                    </div>
                    <div class="level">
                        <p class="normal">Line Height</p>
                        <input type="text" value={attributes.line_height || `1`} on:change={lineHeightChange}>
                    </div>
                    <div class="level">
                        <p class="normal">Letter Spacing</p>
                        <input type="text" value={attributes.letter_spacing} on:change={letterSpacingChange}>
                    </div>
                </Dropdown>
            {/if}
        {:else}
            <p class="normal">Customization for this element is still being implemented.<Breaker /><Breaker />Thank you for your patience!</p>
        {/if}
        <Dropdown text="Danger Zone">
            <button class="button error" on:click={unsetComponent}>Delete Element</button>
        </Dropdown>
    {:else}
        <p class="normal">No element selected.</p>
    {/if}
</aside>

<style>
    aside {
        align-items: center;
        background-color: #555;
        color: #fff;
        height: calc(100vh - 40px);
        overflow: hidden scroll;
        padding: 0 0 24px 0;
        position: fixed;
        right: 0;
        text-align: center;
        width: 20em;
        p {
            color: #f8f8f8;
            font-size: 14px;
            font-weight: 600;
            padding: 0 8px;
            width: 100%;
            &:not(.normal) {
                background-color: #333;
                text-align: left;
                padding: 4px 8px;
            }
        }
        .level {
            align-items: center;
            display: flex;
            justify-content: space-between;
            padding: 4px 8px;
            width: 100%;
            p {
                font-size: 16px;
                padding: 0;
                text-align: left;
            }
            .picker {
                .picker__toggle {
                    height: 100%;
                    list-style-type: none;
                    .picker__button {
                        background-color: #000;
                        border-radius: 4px;
                        cursor: pointer;
                        display: block;
                        height: 23px;
                        margin-right: -1px;
                        width: 20px;
                    }
                    &::-webkit-details-marker {
                        display: none;
                    }
                    &:focus {
                        outline: none;
                    }
                }
                .picker__modal {
                    background-color: #181818;
                    border: 1px solid #000;
                    border-radius: 6px;
                    box-shadow: rgba(0, 0, 0, .25) 0 54px 55px, rgba(0, 0, 0, .12) 0 -12px 30px, rgba(0, 0, 0, .12) 0 4px 6px, rgba(0, 0, 0, .17) 0 12px 13px, rgba(0, 0, 0, .09) 0 -3px 5px;
                    height: 300px;
                    padding: 25px;
                    position: fixed;
                    right: 22px;
                    width: 250px;
                }
                .picker__input {
                    text-transform: uppercase;
                }
            }
            select, input {
                background-color: #444;
                border: 1px solid #222;
                border-radius: 4px;
                color: #fff;
                font-size: 16px;
                width: 100%;
                &:hover {
                    border-color: #000;
                }
                &:focus {
                    outline: 2px solid #40c9ff;
                }
            }
            .flex {
                align-items: center;
                display: flex;
                width: 100%;
                button {
                    padding-top: 3px;
                    width: 25%;
                    svg {
                        height: 24px;
                        width: 24px;
                    }
                    &:hover {
                        background-color: #333;
                    }
                }
                button.selected {
                    background-color: #111;
                }
            }
        }
    }
</style>
