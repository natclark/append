<script>
    import pages from '$lib/stores/pages';
    import Breaker from '$lib/components/layout/Breaker.svelte';

    let value = $pages[$pages.indexOf($pages.find((e) => e.path === `/robots.txt`))].body;

    const update = () => {
        let newPages = $pages;
        newPages[newPages.indexOf(newPages.find((e) => e.path === `/robots.txt`))].body = value;
        pages.update(() => newPages);
    };

    const unset = () => {};
</script>

<h2>Edit Robots.txt File</h2>
<p>The <code>robots.txt</code> file is a widely recognized standard that helps webmasters disallow web scrapers from crawling certain parts of their sites.</p>
<textarea bind:value class="editor" rows="32" autofocus on:input={update}></textarea>
<Breaker />
<Breaker />
<div class="flex">
    <button class="primary error" on:click={unset}>Delete</button>
</div>

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
