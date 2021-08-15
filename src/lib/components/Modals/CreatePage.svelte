<script>
    import pages from '$lib/stores/pages';
    import Breaker from '$lib/components/Layout/Breaker.svelte';

    let title;
    let path;
    let description;

    const submit = () => {
        if (title.length > 0 && path.length > 0) { // TODO: Warn when (title.length > 70)
            path[path.length + 1] !== `/` && (path = `${path}/`); // TODO: Further URL sanitization (ex: no double slashes)
            let newPages = $pages;
            newPages.push({
                type: `page`,
                title,
                description,
                canonical: `${path}`,
                path: `${path}index.html`,
                file: `index.html`,
                body: ``,
                mime: `text/html`,
            });
            pages.update(() => newPages);
        } else {
            alert(`Please enter a valid title and path!`);
        }
    };
</script>

<h2>Create Page</h2>
<form on:submit|preventDefault={submit}>
    <div class="flex">
        <label for="title">Title</label>
        <input bind:value={title} id="title" type="text" required aria-required="true">
    </div>
    <Breaker />
    <div class="flex">
        <label for="path">Path</label>
        <input bind:value={path} id="path" type="text" required aria-required="true">
    </div>
    <Breaker />
    <div class="flex">
        <label for="description">Description</label>
        <input bind:value={description} id="description" type="text" aria-required="false">
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
