<script>
    import { createEventDispatcher } from 'svelte';
    import ripple from '$lib/services/ripple';
    import Tab from '$lib/components/Dashboard/Tab.svelte';

    export let tabs;

    const dispatch = createEventDispatcher();

    const click = (e) => {
        ripple(e, document);
        if (e.target.getAttribute(`aria-selected`) === `false`) {
            document.querySelectorAll(`[data-class="tab"]`).forEach((tab) => tab.setAttribute(`aria-selected`, `false`));
            e.target.setAttribute(`aria-selected`, `true`);
            dispatch(`change`, {
                text: e.target.innerText.toLowerCase(),
            });
        }
    };
</script>

<div role="tablist">
    {#each tabs as text, i}
        <Tab {text} selected="{i === 0 ? `true` : `false`}" on:mousedown={(e) => ripple(e, document)} on:click={click} />
    {/each}
</div>

<style>
    div {
        align-items: center;
        display: flex;
        justify-content: space-between;
        max-width: 300px;
        width: 100%;
    }
    @media screen and (min-width: 768px) {
        div {
            max-width: 528px;
        }
    }
</style>
