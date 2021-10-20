<script>
    import pages from '$lib/stores/pages';
    import redirects from '$lib/stores/redirects';
    import page from '$lib/stores/page';
    import Breaker from '$lib/components/Layout/Breaker.svelte';

    let title;
    let path;
    let description;

    const submit = () => {
        if (title.length > 0 && path.length > 0) { // TODO: Warn when (title.length > 70) ?
            path[0] !== `/` && (path = `/${path}`);
            path[path.length - 1] !== `/` && (path = `${path}/`);
            path = path.replace(/\/+/g, `/`); // * Replaces multiple consecutive slashes (2 or more) with a single slash
            if ($pages.indexOf($pages.find((e) => e.path === `${path}index.html`)) === -1 && $redirects.indexOf($redirects.find((e) => e.file === `${path}index.html`)) === -1) {
                let newPages = $pages;
                newPages.push({
                    id: newPages.length,
                    type: `page`,
                    title,
                    description,
                    canonical: `${path}`,
                    path: `${path.endsWith(`index.html`) ? path : `${path}index.html`}`,
                    file: `index.html`,
                    body: ``,
                    template: ``,
                    templates: [],
                    globals: [],
                    components: [
                        {
                            id: null,
                            element: null,
                            parent: null,
                            children: [],
                            tag: `h1`,
                            options: {
                                contentEditable: true,
                                textContent: title,
                            },
                            styles: [],
                            globals: [],
                        },
                        {
                            id: null,
                            element: null,
                            parent: null,
                            children: [],
                            tag: `p`,
                            options: {
                                contentEditable: true,
                                textContent: `This is some dummy text.`,
                            },
                            styles: [],
                            globals: [],
                        }
                    ],
                    mime: `text/html`,
                });
                pages.update(() => newPages);
                page.update(() => $pages.indexOf($pages.find((e) => e.path === `${path.endsWith(`index.html`) ? path : `${path}index.html`}`)));
            } else {
                alert(`There is already a page or redirect with that same path!`);
            }
        } else {
            alert(`Please enter a valid title and path!`);
        }
    };
</script>

<h2>Create Page</h2>
<form on:submit|preventDefault={submit}>
    <div class="flex">
        <label for="title">Title <span class="required">*</span></label>
        <input bind:value={title} id="title" type="text" placeholder="About" autofocus required aria-placeholder="About" aria-required="true">
    </div>
    <Breaker />
    <div class="flex">
        <label for="path">Path <span class="required">*</span></label>
        <input bind:value={path} id="path" type="text" placeholder="/about" required aria-placeholder="/about" aria-required="true">
    </div>
    <Breaker />
    <div class="flex">
        <label for="description">Description</label>
        <input bind:value={description} id="description" type="text" placeholder="This is an example description." aria-placeholder="This is an example description." aria-required="false">
    </div>
    <Breaker />
    <div class="flex">
        <span></span>
        <input class="primary" type="submit" value="Create Page">
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
</style>
