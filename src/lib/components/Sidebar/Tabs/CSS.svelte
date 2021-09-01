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
        outline: 0;
        margin: 0 8px;
        width: 100%;
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
