<script>
    import { createEventDispatcher, onMount } from 'svelte';
    import ripple from '$lib/services/ripple';

    export let text;

    let doc;

    const dispatch = createEventDispatcher();

    const click = (e) => {
        ripple(e, document);
        dispatch(`click`);
    };

    onMount(() => doc = document);
</script>

<div class="theme" tabindex="0" role="radio" aria-checked="{text === `Blank` ? `true` : `false`}" aria-label="Blank" data-id="{text.toLowerCase().replaceAll(` `, `-`)}" on:mousedown={(e) => ripple(e, doc)} on:click={click}>
    {text}
</div>

<style>
    .theme {
        background-color: #000;
        border: 1px solid #333;
        border-radius: .5rem;
        color: #f8f8f8;
        cursor: pointer;
        margin-bottom: 18px;
        overflow: hidden;
        padding: 12px 20px;
        position: relative;
        text-align: center;
        text-decoration: none;
        p {
            font-size: 16px;
            font-weight: 400;
        }
        &[aria-checked="true"] {
            border-color: #4169e1 !important;
        }
        &:hover {
            border-color: #444;
        }
        &:focus {
            outline: 0;
        }
    }
</style>
