<script>
    import pages from '$lib/stores/pages';
    import Breaker from '$lib/components/layout/Breaker.svelte';

    let value = $pages[$pages.indexOf($pages.find((e) => e.path === `/.well-known/security.txt`))].body;

    const update = () => {
        let newPages = $pages;
        newPages[newPages.indexOf(newPages.find((e) => e.path === `/.well-known/security.txt`))].body = value;
        pages.update(() => newPages);
    };

    const unset = () => { };
</script>

<h2>Edit Security.txt File</h2>
<p>The <code>security.txt</code> file is a standard that allows websites to implement a policy and/or contact method for vulnerability reports. More info is available here: <a class="link" href="https://securitytxt.org/" rel="external noopener nofollow" target="_blank">https://securitytxt.org/</a></p>
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
