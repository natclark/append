<script>
    import tab from '$lib/stores/tab';
    import pages from '$lib/stores/pages';
    import page from '$lib/stores/page';
    import components from '$lib/stores/components';
    import iframe from '$lib/stores/iframe';
    import marked from 'marked';
    import element from '$lib/stores/element';
    import { onMount, onDestroy } from 'svelte';
    import Dropdown from '$lib/components/Layout/Dropdown.svelte';
    import Structure from './Properties/Structure.svelte';
    import Alignment from './Properties/Alignment.svelte';
    import Justification from './Properties/Justification.svelte';
    import Color from './Properties/Color.svelte';
    import Href from './Properties/Href.svelte';
    import Markdown from './Properties/Markdown.svelte';
    import RichText from './Properties/RichText.svelte';
    import Spacing from './Properties/Spacing.svelte';
    import Breaker from '$lib/components/Layout/Breaker.svelte';
    import TextAlign from './Properties/TextAlign.svelte';
    import FontFamily from './Properties/FontFamily.svelte';
    import FontSize from './Properties/FontSize.svelte';
    import FontWeight from './Properties/FontWeight.svelte';
    import FontStyle from './Properties/FontStyle.svelte';
    import LineHeight from './Properties/LineHeight.svelte';
    import LetterSpacing from './Properties/LetterSpacing.svelte';

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
        if (currentElement !== false) {
            let generated = $components[$components.indexOf($components.find((e) => e.id === currentElement.id))].styles;
            const ruleIndex = generated.indexOf(generated.find((e) => e.key === key));
            return ruleIndex !== -1 ? generated[ruleIndex].val : null;
        } else {
            return null;
        }
    };

    const newAttribute = (key, val) => {
        let newComponents = $components;
        newComponents[newComponents.indexOf(newComponents.find((e) => e.id === currentElement.id))].options[key] = val;
        components.update(() => newComponents);
        currentElement.el.setAttribute(key, val);
    };

    const newMarkdown = (markdown) => {
        let newComponents = $components;
        newComponents[newComponents.indexOf(newComponents.find((e) => e.id === currentElement.id))].options[`innerHTML`] = marked(markdown);
        newComponents[newComponents.indexOf(newComponents.find((e) => e.id === currentElement.id))].options[`data-markdown`] = markdown;
        components.update(() => newComponents);
        currentElement.el.innerHTML = marked(markdown);
        currentElement.el.setAttribute(`data-markdown`, markdown);
    };

    const newRichText = (richText) => {
        let newComponents = $components;
        newComponents[newComponents.indexOf(newComponents.find((e) => e.id === currentElement.id))].options[`innerHTML`] = richText;
        components.update(() => newComponents);
        currentElement.el.innerHTML = richText;
    };

    const structureChange = (e) => newStyle(`display`, e.target.value);

    const alignItemsChange = (e) => newStyle(`align-items`, e.target.value);

    const justifyContentChange = (e) => newStyle(`justify-content`, e.target.value);

    const colorChange = (e) => newStyle(`color`, typeof e.detail !== `undefined` ? e.detail.color : e.target.value);

    const backgroundColorChange = (e) => newStyle(`background-color`, typeof e.detail !== `undefined` ? e.detail.backgroundColor : e.target.value);

    const hrefChange = (e) => newAttribute(`href`, e.target.value);

    const markdownChange = (e) => newMarkdown(e.target.value);

    const richTextChange = (e) => newRichText(e.detail);

    const marginChange = (e) => newStyle(`margin-${e.detail.direction}`, e.detail.value);

    const paddingChange = (e) => newStyle(`padding-${e.detail.direction}`, e.detail.value);

    const textAlignChange = (e) => newStyle(`text-align`, e.detail.alignment);

    const fontFamilyChange = (e) => newStyle(`font-family`, e.target.value);

    const fontSizeChange = (e) => newStyle(`font-size`, e.target.value);

    const fontWeightChange = (e) => newStyle(`font-weight`, e.target.value);

    const fontStyleChange = (e) => newStyle(`font-style`, e.target.value);

    const lineHeightChange = (e) => newStyle(`line-height`, e.target.value);

    const letterSpacingChange = (e) => newStyle(`letter-spacing`, e.target.value);

    const unsetComponent = () => {
        let newComponents = $components;
        newComponents.forEach((newComponent) => {
            if (newComponent.parent === newComponents[newComponents.indexOf(newComponents.find((e) => e.id === currentElement.id))].element) {
                newComponents.splice(newComponents.indexOf(newComponent), 1);
            }
        });
        newComponents.splice(newComponents.indexOf(newComponents.find((e) => e.id === currentElement.id)), 1);
        doc.querySelector(`[data-id="${currentElement.id}"]`).remove();
        element.update(() => false);
        components.update(() => newComponents);
        $pages[$page].components = $components; // ? What other state changes from this component should this var be updated for?
        currentElement = null;
    };

    const tabUnsubscribe = tab.subscribe((val) => classList = val !== false ? `stretch` : ``);

    const iframeUnsubscribe = iframe.subscribe((val) => typeof val.document !== `undefined` && (doc = val.document));

    const elementUnsubscribe = element.subscribe((val) => typeof val !== `undefined` && (currentElement = val));

    let attributes = {
        display: null,
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

    onMount(() => {
        const pickers = document.querySelectorAll(`.picker`);
        const contains = (child) => {
            let res = false;
            pickers.forEach((picker) => picker === child || picker.contains(child) && (res = true));
            return res;
        };
        document.addEventListener(`click`, (e) => {
            if (e.target.className !== `picker__modal` && !contains(e.target)) {
                try {
                    document.querySelectorAll(`.picker__dropdown`).forEach((dropdown) => dropdown.removeAttribute(`open`));
                } catch (e) {}
            }
        });
    });

    onDestroy(() => {
        tabUnsubscribe();
        iframeUnsubscribe();
        elementUnsubscribe();
    });

    $: (currentElement !== null && typeof currentElement.el !== `undefined`) && (Object.keys(attributes).forEach((key) => attributes[key] = getStyle(key.replaceAll(`_`, `-`))));
</script>

<aside class={classList}>
    {#if currentElement !== null && typeof currentElement.el !== `undefined`}
        {#if elements.indexOf(elements.find((e) => e.tag === currentElement.el.tagName)) !== -1 || currentElement.el.tagName === `DIV`}
            <h2>{currentElement.el.tagName !== `DIV` ? elements[elements.indexOf(elements.find((e) => e.tag === currentElement.el.tagName))].name : `${currentElement.el.className.substring(0, 1).toUpperCase()}${currentElement.el.className.slice(1).replaceAll(`-`, ` `)}`}</h2>
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
            {#if currentElement.el.tagName === `DIV` && currentElement.el.className === `container`}
                <Dropdown text="Type">
                    <div class="level">
                        <Structure {attributes} on:change={structureChange} />
                    </div>
                    <div class="level">
                        <Alignment {attributes} on:change={alignItemsChange} />
                    </div>
                    <div class="level">
                        <Justification {attributes} on:change={justifyContentChange} />
                    </div>
                </Dropdown>
            {/if}
            {#if currentElement.el.tagName === `H1` || currentElement.el.tagName === `H2` || currentElement.el.tagName === `H3` || currentElement.el.tagName === `H4` || currentElement.el.tagName === `H5` || currentElement.el.tagName === `H6` || currentElement.el.tagName === `P` || currentElement.el.tagName === `LI` || (currentElement.el.tagName === `DIV` && currentElement.el.className === `markdown`)}
                <Dropdown text="Color">
                    <div class="level">
                        <Color {attributes} text="Color" on:change={colorChange} />
                    </div>
                    <div class="level">
                        <Color {attributes} text="Background" on:change={backgroundColorChange} />
                    </div>
                </Dropdown>
            {/if}
            {#if currentElement.el.tagName === `A`}
                <Dropdown text="Hyperlink">
                    <div class="level">
                        <Href href={currentElement.el.getAttribute(`href`)} on:change={hrefChange} />
                    </div>
                </Dropdown>
            {/if}
            {#if currentElement.el.tagName === `DIV` && currentElement.el.className === `markdown`}
                <Dropdown text="Content">
                    <div class="level">
                        <Markdown content={currentElement.el.getAttribute(`data-markdown`)} on:change={markdownChange} on:keyup={markdownChange} />
                    </div>
                </Dropdown>
            {/if}
            {#if currentElement.el.tagName === `DIV` && currentElement.el.className === `rich-text`}
            <Dropdown text="Content">
                <RichText html={currentElement.el.innerHTML} on:change={richTextChange} on:keyup={richTextChange} />
            </Dropdown>
            {/if}
            <Dropdown text="Spacing">
                <div class="level">
                    <Spacing {attributes} text="Margin" on:change={marginChange} />
                </div>
                <Breaker />
                <div class="level">
                    <Spacing {attributes} text="Padding" on:change={paddingChange} />
                </div>
            </Dropdown>
            {#if currentElement.el.tagName === `H1` || currentElement.el.tagName === `H2` || currentElement.el.tagName === `H3` || currentElement.el.tagName === `H4` || currentElement.el.tagName === `H5` || currentElement.el.tagName === `H6` || currentElement.el.tagName === `P` || currentElement.el.tagName === `LI` || (currentElement.el.tagName === `DIV` && currentElement.el.className === `markdown`)}
                <Dropdown text="Typography">
                    <div class="level">
                        <TextAlign {attributes} on:change={textAlignChange} />
                    </div>
                    <div class="level">
                        <FontFamily {attributes} on:change={fontFamilyChange} />
                    </div>
                    <div class="level">
                        <FontSize {attributes} on:change={fontSizeChange} />
                    </div>
                    <div class="level">
                        <FontWeight {attributes} on:change={fontWeightChange} />
                    </div>
                    <div class="level">
                        <FontStyle {attributes} on:change={fontStyleChange} />
                    </div>
                    <div class="level">
                        <LineHeight {attributes} on:change={lineHeightChange} />
                    </div>
                    <div class="level">
                        <LetterSpacing {attributes} on:change={letterSpacingChange} />
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
        background-color: #555;
        color: #fff;
        height: calc(100vh - 40px);
        overflow: hidden scroll;
        padding: 0 0 24px 0;
        position: fixed;
        right: 0;
        scrollbar-color: #999 #333;
        scrollbar-face-color: #999;
        scrollbar-track-color: #333;
        scrollbar-width: thin;
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
        }
        &::-webkit-scrollbar {
            width: 8px;
        }
        &::-webkit-scrollbar-corner, &::-webkit-scrollbar-track {
            background-color: #333;
        }
        &::-webkit-scrollbar-thumb {
            background-color: #999;
        }
    }
    :global(aside .level p) {
        color: #f8f8f8;
        font-size: 14px;
        font-weight: 600;
        padding: 0 8px;
        width: 100%;
    }
    :global(aside .level > p) {
        font-size: 16px;
        padding: 0;
        text-align: left;
    }
    :global(aside .level > input), :global(aside .level > select), :global(aside .level > .flex > input), :global(aside .level > .flex > select) {
        background-color: #444;
        border: 1px solid #222;
        border-radius: 4px;
        color: #fff;
        font-size: 16px;
        justify-content: center;
        width: 100%;
        &:hover {
            border-color: #000;
        }
        &:focus {
            outline: 2px solid #40c9ff;
        }
    }
    :global(aside .level .flex) {
        align-items: center;
        display: flex;
        width: 100%;
    }
</style>
