<script>
    import Banner from './Banner.svelte';
    import Grid from '$lib/components/Layout/Grid.svelte';
    import Element from './Element.svelte';
    import tab from '$lib/stores/tab';

    export let text;

    let classList = ``;
    let show = false;
    let active = false;
    let currentTab;

    const showBanner = () => show = true;

    const hideBanner = () => show = false;

    const toggleMenu = () => !active ? tab.update(() => text) : tab.update(() => false);

    const unsubscribe = tab.subscribe((val) => {
        currentTab = val;
        active = currentTab === text ? true : false;
        classList = active ? `active` : ``;
    });
</script>

<div class="container">
    <button class={classList} on:mouseover={showBanner} on:focus={showBanner} on:blur={hideBanner} on:mouseout={hideBanner} on:click={toggleMenu}>
        <slot />
    </button>
    <Banner {text} {show} />
    {#if currentTab === text}
        <div class="menu">
            <h2>{text}</h2>
            {#if text === `Elements`}
                <p>Text</p>
                <Grid>
                    <Element text="Paragraph" />
                </Grid>
            {:else}
                <p>Coming soon</p>
            {/if}
        </div>
    {/if}
</div>

<style>
    .container {
        align-items: center;
        display: flex;
        button {
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
            position: absolute;
            top: 40px;
            width: 20em;
            h2 {
                color: #eee;
                font-weight: 400;
                margin: 0;
                padding: 8px 8px 0 8px;
            }
            p {
                background-color: #333;
                color: #f8f8f8;
                font-size: 14px;
                font-weight: 600;
                padding: 4px 8px;
            }
        }
    }
    :global {
        .container button {
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
                svg path {
                    fill: #f8f8f8;
                }
            }
        }
    }
</style>
