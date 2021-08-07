<script>
    import element from '$lib/stores/element';
    import tab from '$lib/stores/tab';

    let currentElement;
    let currentTab;
    let classList;

    element.subscribe((val) => currentElement = val);

    tab.subscribe((val) => classList = val !== false ? `stretch` : ``);
</script>

<aside class={classList}>
    <p>This will give details about the selected element.</p>
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
        padding: 0;
        position: relative;
        right: 0;
        min-width: 20em;
    }
</style>
