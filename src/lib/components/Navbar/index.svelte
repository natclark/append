<script>
    import page from '$lib/stores/page';
    import pages from '$lib/stores/pages';
    import EditPage from './Buttons/EditPage.svelte';
    import Save from './Buttons/Save.svelte';
    import Export from './Buttons/Export.svelte';
    import Modal from 'svelte-simple-modal';
    import Publish from './Buttons/Publish.svelte';
</script>

<nav class="flex">
    <div class="flex container">
        <div class="flex container__left">
            <a href="/" draggable="false" sveltekit:prefetch>
                <img src="/logo.svg" height="32px" width="32px" alt="Append" draggable="false">
            </a>
        </div>
        <div class="flex container__center">
            <div class="select">
                <select bind:value={$page}>
                    {#each $pages as p}
                        {#if p.type === `page`}
                            <option value={p.id} selected={p.id === $page ? true : false}>{p.canonical} ({p.title})</option>
                        {/if}
                    {/each}
                </select>
            </div>
            <Modal>
                <EditPage />
            </Modal>
        </div>
        <div class="flex container__right">
            <Save />
            <Export />
            <Modal>
                <Publish />
            </Modal>
        </div>
    </div>
</nav>

<style>
    nav {
        background-color: #444;
        border-bottom: 1px solid #111;
        height: 40px;
        padding: 0 8px;
        width: 100vw;
        a {
            align-items: center;
            color: #fff;
            display: flex;
            margin-left: -4px;
            text-decoration: none;
            img {
                pointer-events: none;
            }
            &:hover {
                opacity: .8;
            }
            &:focus {
                outline: 0;
            }
        }
        .flex {
            align-items: center;
            display: flex;
        }
        .container {
            height: 100%;
            justify-content: space-between;
            margin: 0;
            padding: 0;
            .container__left {
                justify-content: flex-start;
                max-width: calc((100vw - 16px) / 3);
                width: 100%;
            }
            .container__center {
                margin-top: 1px;
                max-width: calc((100vw - 16px) / 3);
                width: 100%;
                .select {
                    width: 100%;
                    select {
                        background-color: #222;
                        border: 1px solid #000;
                        color: #fff;
                        font-size: 16px;
                        width: 100%;
                        &:hover {
                            border-color: #333;
                        }
                        &:focus {
                            outline: 0;
                        }
                    }
                }
            }
            .container__right {
                justify-content: flex-end;
                max-width: calc((100vw - 16px) / 3);
                width: 100%;
            }
        }
    }
    :global(.container__right > button) {
        margin-left: 12px;
    }
</style>
