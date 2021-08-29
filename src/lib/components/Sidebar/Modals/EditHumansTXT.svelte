<script>
    import pages from '$lib/stores/pages';
    import Breaker from '$lib/components/Layout/Breaker.svelte';

    let value = $pages[$pages.indexOf($pages.find((e) => e.path === `/humans.txt`))].body;

    const update = () => {
        let newPages = $pages;
        newPages[newPages.indexOf(newPages.find((e) => e.path === `/humans.txt`))].body = value;
        pages.update(() => newPages);
    };

    const unset = () => {};
</script>

<h2>Edit Humans.txt File</h2>
<p>The <code>humans.txt</code> is a standard for providing more information about the author(s) of a site. More info is available here: <a class="link" href="https://humanstxt.org/" rel="external noopener nofollow" target="_blank">https://humanstxt.org/</a></p>
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
        width: 100%;
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
