<script>
    import Center from '$lib/components/Layout/Center.svelte';
    import Breaker from '$lib/components/Layout/Breaker.svelte';
    import css from '$lib/stores/css'

    let wrap = false;
</script>

<p>If you'd like, you can write custom CSS below.</p>
<p>This will override your other styles.</p>
<Center>
    <textarea bind:value={$css} class="editor" rows="32" wrap={wrap ? "on" : "off" }></textarea>
</Center>
<Breaker />
<Center>
    <div class="checkbox">
        <input id="wrap" name="wrap" type="checkbox" bind:checked={wrap}>
        <label for="wrap">Enable word wrap</label>
    </div>
</Center>

<style>
    p {
        color: #f8f8f8;
        font-size: 14px;
        font-weight: 600;
        padding: 0 8px;
    }
    textarea.editor {
        background-color: #333;
        border: 1px solid #777;
        color: #fafafa;
        font-family: monospace, BlinkMacSystemFont, -apple-system, system-ui, sans-serif;
        font-size: 14px;
        margin: 0 8px;
        outline: 0;
        scrollbar-color: #999 #333;
        scrollbar-face-color: #999;
        scrollbar-track-color: #333;
        scrollbar-width: thin;
        width: 100%;
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
    .checkbox {
        input {
            filter: hue-rotate(340deg);
        }
        label {
            color: #fafafa;
            cursor: pointer;
            
        }
    }
</style>
