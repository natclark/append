<script>
    import { createEventDispatcher, onMount } from 'svelte';
    import ripple from '$lib/services/ripple';

    export let callback;

    let doc;

    const dispatch = createEventDispatcher();

    const click = (e) => {
        ripple(e, doc);
        dispatch(`click`);
    };

    onMount(() => doc = document);
</script>

<button on:mousedown={(e) => ripple(e, doc)} on:click={click}>
    <slot />
</button>

<style>
    button {
        align-items: center;
        background-color: #222;
        border: 0;
        border-radius: .5rem;
        color: #f8f8f8;
        cursor: pointer !important;
        display: flex;
        font-size: 16px;
        justify-content: center;
        overflow: hidden;
        padding: 12px 20px;
        position: relative;
        transition: .06s all;
        &:hover {
            background-color: #333;
            opacity: .95;
        }
        &:focus {
            outline: 0;
        }
    }
</style>
