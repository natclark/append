<script>
    import Banner from './Banner.svelte';
    import Elements from './Tabs/Elements.svelte';
    import Pages from './Tabs/Pages.svelte';
    import Products from './Tabs/Products.svelte';
    import Files from './Tabs/Files.svelte';
    import Globals from './Tabs/Globals.svelte';
    import Plugins from './Tabs/Plugins.svelte';
    import CSS from './Tabs/CSS.svelte';
    import tab from '$lib/stores/tab';
    import { onDestroy } from 'svelte';

    export let text;

    let classList = ``;
    let show = false;
    let active = false;
    let currentTab;

    const showBanner = () => !active && (show = true);

    const hideBanner = () => show = false;

    const toggleMenu = () => !active ? tab.update(() => text) : tab.update(() => false);

    const tabs = [
        { text: `Elements`, component: Elements, },
        { text: `Pages`, component: Pages, },
        { text: `Products`, component: Products, },
        { text: `Files`, component: Files, },
        { text: `Globals`, component: Globals, },
        { text: `Plugins`, component: Plugins, },
        { text: `CSS`, component: CSS, }
    ];

    const unsubscribe = tab.subscribe((val) => {
        currentTab = val;
        active = currentTab === text ? true : false;
        classList = active ? `active` : ``;
        active && (hideBanner());
    });

    onDestroy(unsubscribe);
</script>

<div class="container">
    <button class={classList} aria-label={text} on:mouseover={showBanner} on:focus={showBanner} on:blur={hideBanner} on:mouseout={hideBanner} on:click={toggleMenu}>
        <slot />
    </button>
    <Banner {text} {show} />
    {#if currentTab === text}
        <div class="menu">
            <h2>{text}</h2>
            <svelte:component this={tabs[tabs.indexOf(tabs.find((e) => e.text === text))].component} />
        </div>
    {/if}
</div>

<style>
    .container {
        align-items: center;
        display: flex;
        button:not(.primary) {
            align-items: center;
            border-color: #000;
            display: flex;
            height: 3.5em;
            justify-content: center;
            max-width: 40px;
            position: relative;
            width: 100%;
        }
        .menu {
            background-color: #555;
            height: calc(100vh - 40px);
            left: 40px;
            overflow-y: auto;
            padding-bottom: 24px;
            position: fixed;
            top: 40px;
            width: 20em;
            z-index: 2;
            h2 {
                color: #eee;
                font-weight: 400;
                margin: 0;
                padding: 8px 8px 0 8px;
            }
        }
    }
    :global {
        .container button, .container div[role="button"] {
            &.active {
                background-color: #555;
            }
            svg {
                height: 24px;
                margin: 0 8px;
                width: 24px;
            }
            &:hover {
                cursor: default;
                svg path, svg polygon {
                    fill: #f8f8f8;
                }
            }
        }
    }
</style>
