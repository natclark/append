<script>
    export let content;
</script>

<textarea class="editor" rows="32" wrap="off" on:change on:keydown>{content}</textarea>

<style>
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
</style>
