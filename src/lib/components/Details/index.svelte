<script>
    import tab from '$lib/stores/tab';
    import css from '$lib/stores/css';
    import iframe from '$lib/stores/iframe';
    import element from '$lib/stores/element';
    import { onMount, tick } from 'svelte';
    import '@eastdesire/jscolor/jscolor.js';
    import Breaker from '$lib/components/Layout/Breaker.svelte';

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
        let generated = $css.generated;
        const selectorIndex = generated.indexOf(generated.find((e) => e.id === currentElement.id));
        if (selectorIndex !== -1) {
            const ruleIndex = generated[selectorIndex].rules.indexOf(generated[selectorIndex].rules.find((e) => e.key === key));
            ruleIndex !== -1 ? generated[selectorIndex].rules[ruleIndex] = { key, val, } : generated[selectorIndex].rules.push({ key, val, });
        } else {
            generated.push({ id: currentElement.id, rules: [{ key, val, }], });
        }
        const obj = { custom: $css.custom, generated, };
        css.update(() => obj);
    };

    const getStyle = (key) => {
        const generated = $css.generated;
        const selectorIndex = generated.indexOf(generated.find((e) => e.id === currentElement.id));
        if (selectorIndex !== -1) {
            const ruleIndex = generated[selectorIndex].rules.indexOf(generated[selectorIndex].rules.find((e) => e.key === key));
            return ruleIndex !== -1 ? generated[selectorIndex].rules[ruleIndex].val : null;
        } else {
            return null;
        }
    };

    const removeSelector = () => {
        let generated = $css.generated;
        const selectorIndex = generated.indexOf(generated.find((e) => e.id === currentElement.id));
        if (selectorIndex !== -1) {
            generated.splice(selectorIndex, 1);
            const obj = { custom: $css.custom, generated, };
            css.update(() => obj);
        }
    };

    const colorChange = (e) => newStyle(`color`, e.target.getAttribute(`data-current-color`));

    const backgroundColorChange = (e) => newStyle(`background-color`, e.target.getAttribute(`data-current-color`));

    const marginChange = (e) => newStyle(`margin`, e.target.value);

    const paddingChange = (e) => newStyle(`padding`, e.target.value);

    const textAlignChange = (alignment) => newStyle(`text-align`, alignment);

    const fontFamilyChange = (e) => newStyle(`font-family`, e.target.value);

    const fontSizeChange = (e) => newStyle(`font-size`, e.target.value);

    const fontWeightChange = (e) => newStyle(`font-weight`, e.target.value);

    const fontStyleChange = (e) => newStyle(`font-style`, e.target.value);

    const lineHeightChange = (e) => newStyle(`line-height`, e.target.value);

    const letterSpacingChange = (e) => newStyle(`letter-spacing`, e.target.value);

    const unsetComponent = () => {
        removeSelector();
        doc.querySelector(`[data-id="${currentElement.id}"]`).remove();
        currentElement = null;
    }

    tab.subscribe((val) => classList = val !== false ? `stretch` : ``);

    iframe.subscribe((val) => typeof val.document !== `undefined` && (doc = val.document));

    element.subscribe((val) => typeof val !== `undefined` && (currentElement = val));

    onMount(async () => {
        await tick();
        jscolor.install(); // TODO - fix bug such that jscolor doesn't work immediately.
    });

    let attributes = {
        color: null,
        background_color: null,
        text_align: null,
        font_family: null,
        font_size: null,
        font_weight: null,
        font_style: null,
        line_height: null,
        letter_spacing: null,
    }

    $: {
        (currentElement !== null && typeof currentElement.el !== `undefined`) && (Object.keys(attributes).forEach((key) => attributes[key] = getStyle(key.replaceAll(`_`, `-`))));
        if (typeof jscolor !== `undefined`) jscolor.install();
    }
</script>

<aside class={classList}>
    {#if currentElement !== null && typeof currentElement.el !== `undefined`}
        {#if elements.indexOf(elements.find((e) => e.tag === currentElement.el.tagName)) !== -1 || currentElement.el.tagName === `DIV`}
            <h2>{currentElement.el.tagName !== `DIV` ? elements[elements.indexOf(elements.find((e) => e.tag === currentElement.el.tagName))].name : `${currentElement.el.className.substring(0, 1).toUpperCase()}${currentElement.el.className.slice(1)}`}</h2>
            <!--
            TODO: Allow for changing header level
            <p>Level</p>
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
            -->
            {#if currentElement.el.tagName === `DIV`}
                <p>Flex Settings</p>
            {/if}
            {#if currentElement.el.tagName === `H1` || currentElement.el.tagName === `H2` || currentElement.el.tagName === `H3` || currentElement.el.tagName === `H4` || currentElement.el.tagName === `H5` || currentElement.el.tagName === `H6` || currentElement.el.tagName === `P` || currentElement.el.tagName === `LI`}
                <p>Color</p>
                <div class="level">
                    <p class="normal">Text Color</p>
                    <input class="jscolor" value="{attributes.color || `#000000`}" data-jscolor="" on:change={colorChange}>
                </div>
                <div class="level">
                    <p class="normal">Background Color</p>
                    <input class="jscolor jscolor-active" value="{attributes.background_color || `#ffffff`}" data-jscolor="" on:change={backgroundColorChange}>
                </div>
            {/if}
            <p>Spacing</p>
            <div class="level">
                <p class="normal">Margin</p>
                <input type="text" value="{attributes.margin || `0px`}" on:change={marginChange}>
            </div>
            <div class="level">
                <p class="normal">Padding</p>
                <input type="text" value="{attributes.padding || `0px`}" on:change={paddingChange}>
            </div>
            {#if currentElement.el.tagName === `H1` || currentElement.el.tagName === `H2` || currentElement.el.tagName === `H3` || currentElement.el.tagName === `H4` || currentElement.el.tagName === `H5` || currentElement.el.tagName === `H6` || currentElement.el.tagName === `P` || currentElement.el.tagName === `LI`}
                <p>Typography</p>
                <div class="level">
                    <p class="normal">Alignment</p>
                    <div class="flex">
                        <button on:click={() => textAlignChange(`left`)}>
                            <svg version="1.1" x="0px" y="0px" viewBox="0 0 122.88 85.36" style="enable-background:new 0 0 122.88 85.36" xml:space="preserve">
                                <g>
                                    <path fill="#ddd" d="M6.12,12.23C2.74,12.23,0,9.49,0,6.12C0,2.74,2.74,0,6.12,0h110.65c3.38,0,6.12,2.74,6.12,6.12c0,3.38-2.74,6.12-6.12,6.12 H6.12L6.12,12.23z M6.12,36.61C2.74,36.61,0,33.87,0,30.49c0-3.38,2.74-6.12,6.12-6.12H76.5c3.38,0,6.12,2.74,6.12,6.12 c0,3.38-2.74,6.12-6.12,6.12H6.12L6.12,36.61z M6.12,60.99C2.74,60.99,0,58.25,0,54.87c0-3.38,2.74-6.12,6.12-6.12h110.65 c3.38,0,6.12,2.74,6.12,6.12c0,3.38-2.74,6.12-6.12,6.12H6.12L6.12,60.99z M6.12,85.36C2.74,85.36,0,82.63,0,79.25 c0-3.38,2.74-6.12,6.12-6.12H76.5c3.38,0,6.12,2.74,6.12,6.12c0,3.38-2.74,6.12-6.12,6.12H6.12L6.12,85.36z"></path>
                                </g>
                            </svg>
                        </button>
                        <button on:click={() => textAlignChange(`center`)}>
                            <svg version="1.1" x="0px" y="0px" viewBox="0 0 122.88 85.36" style="enable-background:new 0 0 122.88 85.36" xml:space="preserve">
                                <g>
                                    <path fill="#ddd" d="M6.12,12.23C2.74,12.23,0,9.49,0,6.12C0,2.74,2.74,0,6.12,0h110.65c3.38,0,6.12,2.74,6.12,6.12c0,3.38-2.74,6.12-6.12,6.12 H6.12L6.12,12.23z M26.25,85.36c-3.38,0-6.12-2.74-6.12-6.12c0-3.38,2.74-6.12,6.12-6.12h70.38c3.38,0,6.12,2.74,6.12,6.12 c0,3.38-2.74,6.12-6.12,6.12H26.25L26.25,85.36z M6.12,60.99C2.74,60.99,0,58.25,0,54.87c0-3.38,2.74-6.12,6.12-6.12h110.65 c3.38,0,6.12,2.74,6.12,6.12c0,3.38-2.74,6.12-6.12,6.12H6.12L6.12,60.99z M26.25,36.61c-3.38,0-6.12-2.74-6.12-6.12 c0-3.38,2.74-6.12,6.12-6.12h70.38c3.38,0,6.12,2.74,6.12,6.12c0,3.38-2.74,6.12-6.12,6.12H26.25L26.25,36.61z"></path>
                                </g>
                            </svg>
                        </button>
                        <button on:click={() => textAlignChange(`right`)}>
                            <svg version="1.1" x="0px" y="0px" viewBox="0 0 122.88 85.36" style="enable-background:new 0 0 122.88 85.36" xml:space="preserve">
                                <g>
                                    <path fill="#ddd" d="M6.12,12.23C2.74,12.23,0,9.49,0,6.12C0,2.74,2.74,0,6.12,0h110.65c3.38,0,6.12,2.74,6.12,6.12c0,3.38-2.74,6.12-6.12,6.12 H6.12L6.12,12.23z M46.38,85.36c-3.38,0-6.12-2.74-6.12-6.12c0-3.38,2.74-6.12,6.12-6.12h70.38c3.38,0,6.12,2.74,6.12,6.12 c0,3.38-2.74,6.12-6.12,6.12H46.38L46.38,85.36z M6.12,60.99C2.74,60.99,0,58.25,0,54.87c0-3.38,2.74-6.12,6.12-6.12h110.65 c3.38,0,6.12,2.74,6.12,6.12c0,3.38-2.74,6.12-6.12,6.12H6.12L6.12,60.99z M46.38,36.61c-3.38,0-6.12-2.74-6.12-6.12 c0-3.38,2.74-6.12,6.12-6.12h70.38c3.38,0,6.12,2.74,6.12,6.12c0,3.38-2.74,6.12-6.12,6.12H46.38L46.38,36.61z"></path>
                                </g>
                            </svg>
                        </button>
                        <button on:click={() => textAlignChange(`justify`)}>
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
            {/if}
        {:else}
            <p class="normal">Customization for this element is still being implemented.<Breaker /><Breaker />Thank you for your patience!</p>
        {/if}
        <p>Danger Zone</p>
        <button class="button error" on:click={unsetComponent}>Delete Element</button>
    {:else}
        <p class="normal">No element selected.</p>
    {/if}
</aside>

<style>
    aside {
        align-items: center;
        background-color: #555;
        color: #fff;
        display: inline-flex;
        flex-flow: column wrap;
        flex-direction: column;
        min-height: calc(100vh - 40px);
        min-width: 20em;
        overflow: hidden auto;
        padding: 0;
        position: relative;
        right: 0;
        text-align: center;
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
            select, input {
                background-color: #444;
                border: 1px solid #222;
                border-radius: 4px;
                color: #fff;
                font-size: 16px;
                width: 100%;
                &:hover {
                    border-color: #555;
                }
                &:focus {
                    outline: 0;
                }
            }
            .flex {
                align-items: center;
                display: flex;
                width: 100%;
                button {
                    width: 25%;
                    svg {
                        height: 24px;
                        width: 24px;
                    }
                    &:hover {
                        background-color: #333;
                    }
                }
            }
        }
    }
</style>
