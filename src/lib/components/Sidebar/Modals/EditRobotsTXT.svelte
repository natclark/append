<script>
    let value;

    const unset = () => {};
</script>

<h2>Edit Robots.txt File</h2>
<p>Coming Soon!</p>
<!--
TODO
<p>The <code>robots.txt</code> file is a widely recognized standard that helps webmasters disallow web scrapers from crawling certain parts of their sites.</p>
<textarea bind:{value} class="editor" rows="32" autofocus></textarea>
<div class="flex flex--reverse">
    <!- This is reversed so that the delete button is at the bottom of the tab index order ->
    <input class="primary" type="submit" value="Edit">
    <button class="primary error" on:click={unset}>Delete</button>
</div>
-->

<style>
    .flex {
        display: flex;
        justify-content: flex-end;
    }
    .flex {
        align-items: center;
        display: flex;
        justify-content: space-between;
        width: 100%;
        input[type="text"] {
            font-size: 18px;
            width: 50%;
        }
        &.flex--reverse {
            flex-direction: row-reverse;
        }
    }
    textarea.editor {
        background-color: #333;
        border: 1px solid #777;
        color: #fafafa;
        font-family: monospace, BlinkMacSystemFont, -apple-system, system-ui, sans-serif;
        font-size: 14px;
        outline: 0;
        width: 100%;
    }
</style>
