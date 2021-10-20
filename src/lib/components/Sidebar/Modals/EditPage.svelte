<script>
    import pages from '$lib/stores/pages';
    import redirects from '$lib/stores/redirects';
    import page from '$lib/stores/page';
    import { onDestroy } from 'svelte';
    import Breaker from '$lib/components/Layout/Breaker.svelte';

    export let path;
    const oldPath = path;

    const p = $pages[$pages.indexOf($pages.find((e) => e.path === path))];
    let title = p.title;
    let description = p.description;
    const body = p.body;
    const components = p.components;
    const mime = p.mime;

    // * The previous page visited by the user:
    let lastPage = 0;

    // * The current page:
    let currentPage = $page;

    const submit = () => {
        if (title.length > 0 && path.length > 0) { // TODO: Warn when (title.length > 70)
            path[0] !== `/` && (path = `/${path}`);
            !!path.endsWith(`/index.html`) && (path = path.slice(0, -10));
            path[path.length + 1] !== `/` && (path = `${path}/`);
            path = path.replace(/\/+/g, `/`); // * Replaces multiple consecutive slashes (2 or more) with a single slash
            if (
                (
                    $pages.indexOf($pages.find((e) => e.path === `${path}index.html`)) === -1
                    || `${path}index.html` === oldPath
                )
                && $redirects.indexOf($redirects.find((e) => e.file === `${path}index.html`)) === -1
            ) {
                let newPages = $pages;
                const oldIndex = newPages.indexOf(newPages.find((e) => e.path === oldPath));
                const oldId = newPages[oldIndex].id;
                newPages.splice(oldIndex, 1);
                newPages.push({
                    id: oldId,
                    type: `page`,
                    title,
                    description,
                    canonical: path,
                    path: `${path}index.html`,
                    file: `index.html`,
                    body,
                    components,
                    mime,
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

    const unset = (e) => {
        e.preventDefault();
        page.update(() => lastPage);
        let newPages = $pages;
        console.log(oldPath, newPages[0].path);
        newPages.splice(newPages.indexOf(newPages.find((e) => e.path === oldPath)), 1);
        pages.update(() => newPages);
    };

    const unsubscribe = page.subscribe((val) => {
        lastPage = currentPage;
        currentPage = val;
    });

    onDestroy(() => unsubscribe);
</script>

<h2>Edit Page</h2>
<form on:submit|preventDefault={submit}>
    <div class="flex">
        <label for="title">Title <span class="required">*</span></label>
        <input bind:value={title} id="title" type="text" placeholder="About" autofocus required aria-required="true" aria-placeholder="About">
    </div>
    <Breaker />
    <div class="flex">
        <label for="path">Path <span class="required">*</span></label>
        <input bind:value={path} id="path" type="text" placeholder="/about" required aria-required="true" aria-placeholder="/about">
    </div>
    <Breaker />
    <div class="flex">
        <label for="description">Description</label>
        <input bind:value={description} id="description" type="text" placeholder="This is an example description." aria-required="false" aria-placeholder="This is an example description.">
    </div>
    <Breaker />
    <div class="flex flex--reverse">
        <!-- This is reversed so that the delete button is at the bottom of the tab index order -->
        <input class="primary" type="submit" value="Edit">
        <button class="primary error" on:click={unset}>Delete</button>
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
        &.flex--reverse {
            flex-direction: row-reverse;
        }
    }
</style>
