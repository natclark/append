<script>
    import tab from '$lib/stores/tab';
    import iframe from '$lib/stores/iframe';
    import element from '$lib/stores/element';

    let currentTab;
    let classList;

    let currentElement;

    let tag = ``;

    const init = (doc) => {
        
    };

    tab.subscribe((val) => classList = val !== false ? `stretch` : ``);

    iframe.subscribe((val) => typeof val.document !== `undefined` && (init(val.document)));

    element.subscribe((val) => typeof val !== `undefined` && (currentElement = val));
</script>

<aside class={classList}>
    {#if typeof currentElement.el !== `undefined`}
        {#if currentElement.el.tagName === `H1` || currentElement.el.tagName === `H2` || currentElement.el.tagName === `H3` || currentElement.el.tagName === `H4` || currentElement.el.tagName === `H5` || currentElement.el.tagName === `H6`}
            <h2>Header</h2>
        {:else if currentElement.el.tagName === `P`}
            <h2>Paragraph</h2>
        {:else}
            <p>Customization for this element is still being implemented.<br><br>Thank you for your patience!</p>
        {/if}
    {:else}
        <p>No element selected.</p>
    {/if}
</aside>

<style>
    aside {
        align-items: center;
        background-color: #444;
        color: #fff;
        display: inline-flex;
        flex-flow: column wrap;
        flex-direction: column;
        height: calc(100vh - 40px);
        min-width: 20em;
        padding: 0;
        position: relative;
        right: 0;
        text-align: center;
        z-index: -1;
    }
</style>
