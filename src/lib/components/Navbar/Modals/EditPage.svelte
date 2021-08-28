<script>
    import pages from '$lib/stores/pages';
    import redirects from '$lib/stores/redirects';
    import page from '$lib/stores/page';
    import Breaker from '$lib/components/Layout/Breaker.svelte';

    export let path;
    const oldPath = path;

    const p = $pages[$pages.indexOf($pages.find((e) => e.path === path))];
    let title = p.title;
    let description = p.description;

    const submit = () => {
        if (title.length > 0 && path.length > 0) { // TODO: Warn when (title.length > 70)
            path[0] !== `/` && (path = `/${path}`);
            path[path.length + 1] !== `/` && (path = `${path}/`);
            path = path.replace(/\/+/g, `/`); // * Replaces multiple consecutive slashes (2 or more) with a single slash
            if ($pages.indexOf($pages.find((e) => e.path === `${path}index.html`)) === -1 && $redirects.indexOf($redirects.find((e) => e.file === `${path}index.html`)) === -1) {
                let newPages = $pages;
                newPages.splice(newPages.indexOf(newPages.find((e) => e.path === oldPath)), 1);
                newPages.push({
                    id: newPages.length,
                    type: `page`,
                    title,
                    description,
                    canonical: `${path}`,
                    path: `${path}index.html`,
                    file: `index.html`,
                    body: ``,
                    components: [],
                    mime: `text/html`,
                });
                pages.update(() => newPages);
                page.update(() => $pages.indexOf($pages.find((e) => e.path === `${path}index.html`)));
            } else {
                alert(`There is already a page or redirect with that same path!`);
            }
        } else {
            alert(`Please enter a valid title and path!`);
        }
    };
</script>

<h2>Edit Page</h2>
<form on:submit|preventDefault={submit}>
    <div class="flex">
        <label for="title">Title</label>
        <input bind:value={title} id="title" type="text" placeholder="About" autofocus required aria-placeholder="About" aria-required="true">
    </div>
    <Breaker />
    <div class="flex">
        <label for="path">Path</label>
        <input bind:value={path} id="path" type="text" placeholder="/about" required aria-placeholder="/about" aria-required="true">
    </div>
    <Breaker />
    <div class="flex">
        <label for="description">Description</label>
        <input bind:value={description} id="description" type="text" placeholder="This is an example description."
            aria-required="false" aria-placeholder="This is an example description.">
    </div>
    <Breaker />
    <div class="flex flex--end">
        <input class="primary" type="submit" value="Edit">
    </div>
</form>

<style>
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
    .flex--end {
        justify-content: flex-end;
    }
</style>
