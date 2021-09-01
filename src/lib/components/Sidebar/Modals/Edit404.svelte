<script>
    import pages from '$lib/stores/pages';
    import Breaker from '$lib/components/Layout/Breaker.svelte';

    let value = $pages[$pages.indexOf($pages.find((e) => e.path === `/ipfs-404.html`))].to;

    const update = () => {
        let newPages = $pages;
        newPages[newPages.indexOf(newPages.find((e) => e.path === `/ipfs-404.html`))].to = value;
        pages.update(() => newPages);
    };

    const unset = () => {
        let newPages = $pages;
        newPages.splice(newPages.indexOf(newPages.find((e) => e.path === `/ipfs-404.html`)), 1);
        pages.update(() => newPages);
    };
</script>

<h2>Edit IPFS 404</h2>
<p>The <code>ipfs-404.html</code> is a partially recognized standard. If a user visits a page on your website that is not found, some IPFS gateways will redirect them to this "404" page. You currently only have the option to redirect this to another page. By default, we redirect it to your home page.</p>
<div class="flex">
    <label for="to">Destination <span class="required">*</span></label>
    <input bind:value id="to" type="text" placeholder="http://example.com" autofocus required aria-placeholder="http://example.com" aria-required="true" on:change={update}>
</div>
<Breaker />
<div class="flex flex--end">
    <button class="primary error" on:click={unset}>Delete</button>
</div>

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
        &.flex--end {
            justify-content: flex-end;
        }
    }
</style>
