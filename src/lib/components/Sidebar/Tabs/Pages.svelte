<script>
    import Dropdown from '$lib/components/Layout/Dropdown.svelte';
    import Center from '$lib/components/Layout/Center.svelte';
    import Breaker from '$lib/components/Layout/Breaker.svelte';
    import Modal from 'svelte-simple-modal';
    import CreatePage from '../Buttons/CreatePage.svelte';
    import UploadPage from '../Buttons/UploadPage.svelte';
    import EditPage from '../Buttons/EditPage.svelte';
    import EditRedirect from '../Buttons/EditRedirect.svelte';
    import CreateRedirect from '../Buttons/CreateRedirect.svelte';
    import EditStylesheet from '../Buttons/EditStylesheet.svelte';
    import Edit404 from '../Buttons/Edit404.svelte';
    import EditSecurityTXT from '../Buttons/EditSecurityTXT.svelte';
    import EditAdsTXT from '../Buttons/EditAdsTXT.svelte';
    import EditBrowserconfig from '../Buttons/EditBrowserconfig.svelte';
    import EditHumansTXT from '../Buttons/EditHumansTXT.svelte';
    import EditManifest from '../Buttons/EditManifest.svelte';
    import EditRobotsTXT from '../Buttons/EditRobotsTXT.svelte';
    import EditFeed from '../Buttons/EditFeed.svelte';
    import EditSitemap from '../Buttons/EditSitemap.svelte';
    import CreateFeed from '../Buttons/CreateFeed.svelte';
    import CreateSitemap from '../Buttons/CreateSitemap.svelte';
    import pages from '$lib/stores/pages';
    import page from '$lib/stores/page';
    import redirects from '$lib/stores/redirects';

    const viewPage = (id) => page.update(() => id);
</script>

<Dropdown text="Create Page">
    <Center>
        <Modal>
            <CreatePage />
        </Modal>
    </Center>
    <Breaker />
    <Center>
        <Modal>
            <UploadPage />
        </Modal>
    </Center>
</Dropdown>
<Dropdown text="My Pages">
    {#each $pages as page}
        {#if page.type === `page`}
            <div class="page">
                <div class="flex">
                    <div>
                        <p class="title">{page.title}</p>
                        <p class="faint">{page.path}</p>
                    </div>
                    <div>
                        <button class="primary" on:click={() => viewPage(page.id)}>View</button>
                        <Modal>
                            <EditPage path={page.path} />
                        </Modal>
                    </div>
                </div>
            </div>
        {/if}
    {/each}
</Dropdown>
<Dropdown text="My Redirects">
    {#each $redirects as redirect}
        <div class="page">
            <div class="flex">
                <div>
                    <p class="title">{redirect.to}</p>
                    <p class="faint">{redirect.file}</p>
                </div>
                <Modal>
                    <EditRedirect path={redirect.path} />
                </Modal>
            </div>
        </div>
    {/each}
    {#if $redirects.length > 0}
        <Breaker />
    {/if}
    <Center>
        <Modal>
            <CreateRedirect />
        </Modal>
    </Center>
</Dropdown>
<Dropdown text="Special Pages">
    {#each $pages as page}
        {#if page.type !== `page`}
            <div class="page">
                {#if page.type === `stylesheet`}
                    <div class="flex">
                        <div>
                            <p class="title">Stylesheet</p>
                            <p class="faint">{page.path}</p>
                        </div>
                        <Modal>
                            <EditStylesheet path={page.path} />
                        </Modal>
                    </div>
                {:else if page.type === `redirect`}
                    <div class="flex">
                        <div>
                            <p class="title">IPFS 404</p>
                            <p class="faint">{page.path}</p>
                        </div>
                        <Modal>
                            <Edit404 path={page.path} />
                        </Modal>
                    </div>
                {:else if page.type === `security`}
                    <div class="flex">
                        <div>
                            <p class="title">Security.txt File</p>
                            <p class="faint">{page.path}</p>
                        </div>
                        <Modal>
                            <EditSecurityTXT path={page.path} />
                        </Modal>
                    </div>
                {:else if page.type === `ads`}
                    <div class="flex">
                        <div>
                            <p class="title">Ads.txt File</p>
                            <p class="faint">{page.path}</p>
                        </div>
                        <Modal>
                            <EditAdsTXT path={page.path} />
                        </Modal>
                    </div>
                {:else if page.type === `browserconfig`}
                    <div class="flex">
                        <div>
                            <p class="title">Browserconfig.xml File</p>
                            <p class="faint">{page.path}</p>
                        </div>
                        <Modal>
                            <EditBrowserconfig path={page.path} />
                        </Modal>
                    </div>
                {:else if page.type === `humans`}
                    <div class="flex">
                        <div>
                            <p class="title">Humans.txt File</p>
                            <p class="faint">{page.path}</p>
                        </div>
                        <Modal>
                            <EditHumansTXT path={page.path} />
                        </Modal>
                    </div>
                {:else if page.type === `webmanifest`}
                    <div class="flex">
                        <div>
                            <p class="title">Web app manifest</p>
                            <p class="faint">{page.path}</p>
                        </div>
                        <Modal>
                            <EditManifest path={page.path} />
                        </Modal>
                    </div>
                {:else if page.type === `robots`}
                    <div class="flex">
                        <div>
                            <p class="title">Robots.txt File</p>
                            <p class="faint">{page.path}</p>
                        </div>
                        <Modal>
                            <EditRobotsTXT path={page.path} />
                        </Modal>
                    </div>
                {:else if page.type === `feed`}
                    <div class="flex">
                        <div>
                            <p class="title">RSS/Atom Feed</p>
                            <p class="faint">{page.path}</p>
                        </div>
                        <Modal>
                            <EditFeed path={page.path} />
                        </Modal>
                    </div>
                {:else if page.type === `sitemap`}
                    <div class="flex">
                        <div>
                            <p class="title">Sitemap</p>
                            <p class="faint">{page.path}</p>
                        </div>
                        <Modal>
                            <EditSitemap path={page.path} />
                        </Modal>
                    </div>
                {/if}
            </div>
        {/if}
    {/each}
    {#if $pages.length > 0}
        <Breaker />
    {/if}
    <Center>
        <Modal>
            <CreateFeed />
        </Modal>
    </Center>
    <Breaker />
    <Center>
        <Modal>
            <CreateSitemap />
        </Modal>
    </Center>
</Dropdown>

<style>
    p {
        color: #f8f8f8;
        font-size: 14px;
        font-weight: 600;
        padding: 0 8px;
    }
    .page {
        padding: 4px 0;
        .flex {
            align-items: center;
            display: flex;
            justify-content: space-between;
            p {
                margin: 0 0 4px 0;
                &.title {
                    color: #fff;
                    font-weight: 700;
                }
                &.faint {
                    font-weight: 400;
                }
            }
        }
        &:hover {
            background-color: #444;
        }
    }
    :global(.page .flex button) {
        margin-right: 4px;
    }
</style>
