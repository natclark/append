<script>
    import pages from '$lib/stores/pages';
    import Breaker from '$lib/components/Layout/Breaker.svelte';

    let path;
    let to;

    const submit = () => {
        if (path.length > 0 && to.length > 0) {
            path[0] !== `/` && (path = `/${path}`);
            to[0] !== `/` && (to = `/${to}`);
            path[path.length + 1] !== `/` && (path = `${path}/`); // TODO: Further URL sanitization (ex: no double slashes)
            to[to.length + 1] !== `/` && (to = `${to}/`);
            let newPages = $pages;
            newPages.push({
                type: `redirect`,
                path,
                file: `${path.substring(path.lastIndexOf(`/`), path.length - 1)}.html`,
                to,
                mime: `text/html`,
            });
            pages.update(() => newPages);
        } else {
            alert(`Please enter a valid paths!`);
        }
    };
</script>

<h2>Create Redirect</h2>
<form on:submit|preventDefault={submit}>
    <div class="flex">
        <label for="path">Path</label>
        <input bind:value={path} id="path" type="text" required aria-required="true">
    </div>
    <Breaker />
    <div class="flex">
        <label for="to">To</label>
        <input bind:value={to} id="to" type="text" required aria-required="true">
    </div>
    <Breaker />
    <div class="flex">
        <span></span>
        <input class="primary" type="submit" value="Create Redirect">
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