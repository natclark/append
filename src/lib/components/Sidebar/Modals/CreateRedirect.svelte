<script>
    import pages from '$lib/stores/pages';
    import redirects from '$lib/stores/redirects';
    import Breaker from '$lib/components/Layout/Breaker.svelte';

    let path;
    let to;

    const submit = () => {
        if (path.length > 0 && to.length > 0) {
            path[0] !== `/` && (path = `/${path}`);
            path[path.length - 1] !== `/` && (path = `${path}/`);
            path = path.replace(/\/+/g, `/`); // * Replaces multiple consecutive slashes (2 or more) with a single slash
            (!to.includes(`://`) && to[0] !== `/`) && (to = `/${to}`);
            let file = `${path}index.html`;
            if ($pages.indexOf($pages.find((e) => e.path === file)) === -1 && $redirects.indexOf($redirects.find((e) => e.file === file)) === -1) {
                let newRedirects = $redirects;
                newRedirects.push({
                    type: `redirect`,
                    path,
                    file,
                    to,
                    mime: `text/html`,
                });
                redirects.update(() => newRedirects);
            } else {
                alert(`There is already a page or redirect with that same path!`);
            }
        } else {
            alert(`Please enter a valid paths!`);
        }
    };
</script>

<h2>Create Redirect</h2>
<p>You can redirect paths to external pages or other pages on your site.</p>
<form on:submit|preventDefault={submit}>
    <div class="flex">
        <label for="path">Path <span class="required">*</span></label>
        <input bind:value={path} id="path" type="text" placeholder="/example" autofocus required aria-placeholder="placeholder" aria-required="true">
    </div>
    <Breaker />
    <div class="flex">
        <label for="to">Destination <span class="required">*</span></label>
        <input bind:value={to} id="to" type="text" placeholder="http://example.com" required aria-placeholder="http://example.com" aria-required="true">
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