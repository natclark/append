<script>
    import websites from '$lib/stores/websites';
    import { Web3Storage } from 'web3.storage';
    import confetti from 'canvas-confetti';
    import { onMount } from 'svelte';
    import init from '$lib/stores/init';
    import Tabs from '$lib/components/Dashboard/Tabs.svelte';
    import Button from '$lib/components/Dashboard/Button.svelte';
    import Website from '$lib/components/Dashboard/Website.svelte';
    import Input from '$lib/components/Dashboard/Input.svelte';
    import Theme from '$lib/components/Dashboard/Theme.svelte';
    import ripple from '$lib/services/ripple';

    // * Determines whether a new website being created:
    let create = false;

    // * The "Create" button element binding:
    let button;

    // * The title of the new website:
    let value;

    // * The theme of the new website:
    let theme = `blank`;

    // * Triggers when the theme of the new website is changed:
    const changeTheme = (newTheme) => {
        try {
            theme = newTheme;
            document.querySelectorAll(`.theme`).forEach((theme) => theme.setAttribute(`aria-checked`, `false`));
            document.querySelector(`[data-id="${newTheme}"]`).setAttribute(`aria-checked`, `true`);
        } catch (e) {}
    };

    // * Alias for browser localStorage:
    let ls;

    // * Triggers when a new website is created:
    const newWebsite = async () => {
        if (theme === `blank`) {
            button.disabled = true;
            button.innerText = `Creating...`;
            let newWebsites = $websites;
            newWebsites.push({
                id: $websites.length,
                title: value || `Unnamed Website`,
                css: `html {\n    height: 100%;\n}\n\nbody {\n    font-family: "Segoe UI", Arial, sans-serif;\n    margin: 0;\n    min-height: 100%;\n}\n\n.container {\n    display: flex;\n    min-height: 40px;\n    padding: 8px 0;\n    width: 100%;\n}\n\n.item {\n    min-height: 100%;\n    width: 100%;\n}\n\n.markdown {\n    min-height: 40px;\n    width: 100%;\n}`,
                template: ``,
                products: [],
                files: [],
                globals: [],
                prices: [],
                plugins: [],
                templates: [],
                metadata: [],
                publications: [],
                pages: [
                    {
                        id: 0,
                        type: `page`,
                        title: `Home`,
                        description: `This is a home page.`,
                        canonical: `/`,
                        path: `/index.html`,
                        file: `index.html`,
                        body: ``,
                        components: [
                            {
                                id: null,
                                element: null,
                                parent: null,
                                tag: `h1`,
                                options: {
                                    contentEditable: true,
                                    textContent: `Hello World`,
                                },
                                styles: [],
                                globals: [],
                            },
                            {
                                id: null,
                                element: null,
                                parent: null,
                                tag: `p`,
                                options: {
                                    contentEditable: true,
                                    textContent: `Welcome to YOUR very own unstoppable website.`,
                                },
                                styles: [],
                                globals: [],
                            },
                            {
                                id: null,
                                element: null,
                                parent: null,
                                tag: `p`,
                                options: {
                                    contentEditable: true,
                                    textContent: `WARNING: Please don't try to build a full site for now, because it may be a very frustrating experience. This is NOT a stable release, and this is just for testing purposes!`,
                                },
                                styles: [],
                                globals: [],
                            },
                            {
                                id: null,
                                element: null,
                                parent: null,
                                tag: `p`,
                                options: {
                                    contentEditable: true,
                                    textContent: `Anyway, have fun playing with this!`,
                                },
                                styles: [],
                                globals: [],
                            }
                        ],
                        mime: `text/html`,
                    },
                    {
                        id: 1,
                        type: `stylesheet`,
                        path: `/style.css`,
                        file: `style.css`,
                        body: ``,
                        mime: `text/css`,
                    },
                    {
                        id: 2,
                        type: `ipfs-404`,
                        path: `/ipfs-404.html`,
                        file: `ipfs-404.html`,
                        to: `/`,
                        mime: `text/html`,
                    },
                    {
                        id: 3,
                        type: `security`,
                        path: `/.well-known/security.txt`,
                        file: `security.txt`,
                        body: ``,
                        mime: `text/plain`,
                    },
                    {
                        id: 4,
                        type: `ads`,
                        path: `/ads.txt`,
                        file: `ads.txt`,
                        body: `placeholder.example.com, placeholder, DIRECT, placeholder`,
                        mime: `text/plain`,
                    },
                    {
                        id: 5,
                        type: `browserconfig`,
                        path: `/browserconfig.xml`,
                        file: `browserconfig.xml`,
                        body: ``,
                        mime: `application/xml`,
                    },
                    {
                        id: 6,
                        type: `humans`,
                        path: `/humans.txt`,
                        file: `humans.txt`,
                        body: ``,
                        mime: `text/plain`,
                    },
                    {
                        id: 7,
                        type: `webmanifest`,
                        path: `/manifest.webmanifest`,
                        file: `manifest.webmanifest`,
                        body: ``,
                        mime: `application/manifest+json`,
                    },
                    {
                        id: 8,
                        type: `robots`,
                        path: `/robots.txt`,
                        file: `robots.txt`,
                        body: ``,
                        mime: `text/plain`,
                    },
                    {
                        id: 9,
                        type: `feed`,
                        path: `/rss.xml`,
                        file: `rss.xml`,
                        body: ``,
                        mime: `application/rss+xml`,
                    },
                    {
                        id: 10,
                        type: `sitemap`,
                        path: `/sitemap.xml`,
                        file: `sitemap.xml`,
                        body: ``,
                        mime: `application/xml`,
                    }
                ],
            });
            websites.update(() => newWebsites);
            // * The below method is TEMPORARY. Yes, of course this is bad practice. If someone abuses the below API key before I switch to something else, I'll add a new default one ASAP.
            const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGI0MEIzZGU3Y0Y2Mjk3MTZBNDM2NGQ2NWY2NTJBMzNCOTU5N2E0QzEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Mjc1OTAzMTc0MzMsIm5hbWUiOiJFVEhHbG9iYWwgVGVzdCJ9.wpGMGBuvu4n2f4hXTYyU7n13u-gMe6I_KOCTtHkQ280`;
            const client = new Web3Storage({ token, });
            const blob = new Blob([JSON.stringify($websites)], { type: `application/json`, });
            const files = [new File([blob], `websites.json`)];
            const cid = await client.put(files);
            ls && (ls.setItem(`append::v0`, cid));
            button.disabled = false;
            button.innerText = `Create`;
            create = false;
            confetti({
                origin: {
                    y: .6,
                },
                particleCount: 100,
                spread: 70,
            });
        } else {
            alert(`Sorry, but that theme is still a work in progress. Please choose another in the meantime!`);
        }
    };

    // * The current tab:
    let tab = `websites`;

    // * A new tab has been selected:
    const changeTab = (e) => {
        tab = e.detail.text;
    };

    onMount(() => {
        if ($init === false) {
            if (typeof localStorage !== `undefined`) {
                ls = localStorage;
                if (ls.getItem(`append::v0`) !== null) {
                    const xhr = new XMLHttpRequest();
                    xhr.onload = () => {
                        websites.update(() => JSON.parse(xhr.response));
                        init.update(() => true);
                    };
                    xhr.onerror = () => console.log(`Request failed.`);
                    // ! Fallback gateways should be added in the future. This is a serious single point of failure.
                    xhr.open(`GET`, `https://cloudflare-ipfs.com/ipfs/${ls.getItem(`append::v0`)}/websites.json`);
                    xhr.send();
                } else {
                    init.update(() => true);
                }
            } else {
                alert(`Your browser must support localStorage, and Append will not function properly otherwise.`);
            }
        }
    });
</script>

{#if $init === true}
    {#if !create}
        <h1>My Websites</h1>
        <p>Append is currently in beta. There are still some serious bugs. Use at your own risk.</p>
        <p><strong>You can save your progress, but currently, the method for doing so is very crude. Your progress may be lost.</strong></p>
        <p><strong>Do not upload any private information, because data is currently unencrypted and pinned on IPFS.</strong></p>
        <div class="flex flex--between">
            <Tabs tabs={[`Websites`, `Domains`, `Analytics`, `Settings`]} on:change={changeTab} />
            <Button on:click={() => create = true}>
                <svg version="1.1" x="0px" y="0px" width="18px" height="18px" viewBox="0 0 122.881 122.88" enable-background="new 0 0 122.881 122.88" xml:space="preserve">
                    <g>
                        <path fill="#f8f8f8" d="M56.573,4.868c0-0.655,0.132-1.283,0.37-1.859c0.249-0.6,0.61-1.137,1.056-1.583C58.879,0.545,60.097,0,61.44,0 c0.658,0,1.287,0.132,1.863,0.371c0.012,0.005,0.023,0.011,0.037,0.017c0.584,0.248,1.107,0.603,1.543,1.039 c0.881,0.88,1.426,2.098,1.426,3.442c0,0.03-0.002,0.06-0.006,0.089v51.62l51.619,0c0.029-0.003,0.061-0.006,0.09-0.006 c0.656,0,1.285,0.132,1.861,0.371c0.014,0.005,0.025,0.011,0.037,0.017c0.584,0.248,1.107,0.603,1.543,1.039 c0.881,0.88,1.428,2.098,1.428,3.441c0,0.654-0.133,1.283-0.371,1.859c-0.248,0.6-0.609,1.137-1.057,1.583 c-0.445,0.445-0.98,0.806-1.58,1.055v0.001c-0.576,0.238-1.205,0.37-1.861,0.37c-0.029,0-0.061-0.002-0.09-0.006l-51.619,0.001 v51.619c0.004,0.029,0.006,0.06,0.006,0.09c0,0.656-0.133,1.286-0.371,1.861c-0.006,0.014-0.012,0.025-0.018,0.037 c-0.248,0.584-0.602,1.107-1.037,1.543c-0.883,0.882-2.1,1.427-3.443,1.427c-0.654,0-1.283-0.132-1.859-0.371 c-0.6-0.248-1.137-0.609-1.583-1.056c-0.445-0.444-0.806-0.98-1.055-1.58h-0.001c-0.239-0.575-0.371-1.205-0.371-1.861 c0-0.03,0.002-0.061,0.006-0.09V66.303H4.958c-0.029,0.004-0.059,0.006-0.09,0.006c-0.654,0-1.283-0.132-1.859-0.371 c-0.6-0.248-1.137-0.609-1.583-1.056c-0.445-0.445-0.806-0.98-1.055-1.58H0.371C0.132,62.726,0,62.097,0,61.44 c0-0.655,0.132-1.283,0.371-1.859c0.249-0.6,0.61-1.137,1.056-1.583c0.881-0.881,2.098-1.426,3.442-1.426 c0.031,0,0.061,0.002,0.09,0.006l51.62,0l0-51.62C56.575,4.928,56.573,4.898,56.573,4.868L56.573,4.868z"></path>
                    </g>
                </svg>
                &nbsp;&nbsp;Create New
            </Button>
        </div>
        {#if tab === `websites`}
            <div class="grid">
                {#each $websites as website}
                    <Website id={website.id} />
                {/each}
                <!--
                    * These divs add an invisible row so that the grid's height can be increased to n + 1 rows.
                    * It ensures that tooltips which overflow beyond their grid item do not get cut off.
                    * There is likely a better way to do this.
                -->
                <div></div>
                <div></div>
                <div></div>
            </div>
        {:else if tab === `domains`}
            <p>Register, renew, and manage blockchain domains with no markup or extra fees!</p>
            <p><em>Coming soon!</em></p>
        {:else if tab === `analytics`}
            <p>Track sales and manage orders across your websites.</p>
            <p><em>Coming soon!</em></p>
        {:else if tab === `settings`}
            <p>You can set various preferences here.</p>
            <p><em>Coming soon!</em></p>
        {/if}
    {:else}
        <h1>New Website</h1>
        <label for="name">Name</label>
        <Input bind:value placeholder="My Epic Blog" />
        <fieldset>
            <legend>Theme</legend>
            <div class="grid grid--small">
                <Theme text="Blank" on:click={() => changeTheme(`blank`)} />
            </div>
            <h2 class="small">Default Themes</h2>
            <div class="grid grid--small">
                <Theme text="Bio" on:click={() => changeTheme(`bio`)} />
                <Theme text="Blog" on:click={() => changeTheme(`blog`)} />
                <Theme text="NFT Store" on:click={() => changeTheme(`nft-store`)} />
                <Theme text="NFT Gallery" on:click={() => changeTheme(`nft-gallery`)} />
            </div>
            <p><em>More are coming soon!</em></p>
            <h2 class="small">Custom Themes</h2>
            <p><em>Coming soon!</em></p>
        </fieldset>
        <div class="flex flex--start">
            <button bind:this={button} class="submit" on:mousedown={(e) => ripple(e, document)} on:click={newWebsite}>Create</button>
            <button class="cancel" on:mousedown={(e) => ripple(e, document)} on:click={() => create = false}>Cancel</button>
        </div>
    {/if}
{/if}

<style>
    h1, p, .create, label, input, legend, .theme {
        color: #f8f8f8;
    }
    .flex {
        align-items: center;
        display: flex;
        justify-content: center;
        &.flex--between {
            display: block;
            margin-bottom: 24px;
        }
        &.flex--start {
            justify-content: flex-start;
        }
    }
    svg {
        height: 18px !important;
        margin: 0 !important;
        width: 18px !important;
    }
    .grid {
        display: grid;
        grid-gap: 22px;
        grid-template-columns: repeat(auto-fill, minmax(318px, 1fr));
        &.grid--small {
            grid-gap: 12px;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        }
    }
    label, legend {
        font-size: 18px;
        margin-bottom: 12px;
    }
    fieldset {
        margin-bottom: 18px;
    }
    h2.small {
        color: #eee;
        letter-spacing: 1px;
        font-size: 14px;
        font-weight: 400;
        text-transform: uppercase;
    }
    p {
        color: #ccc;
        margin-bottom: 18px;
    }
    button.submit, button.cancel {
        border: 0;
        border-radius: 4px;
        cursor: pointer !important;
        font-size: 16px;
        overflow: hidden;
        padding: 6px 16px;
        position: relative;
        transition: all .06s;
        will-change: background-color, opacity;
        &:focus {
            outline: 0;
        }
    }
    button.submit {
        background-color: #222;
        color: #f8f8f8;
        margin-right: 8px;
        &:hover {
            background-color: #333;
            opacity: .95;
        }
    }
    button.cancel {
        background-color: inherit;
        color: #f8f8f8;
        &:hover {
            background-color: #111;
            opacity: .95;
        }
    }
    @media screen and (min-width: 768px) {
        .flex.flex--between {
            display: flex;
            justify-content: space-between;
        }
    }
</style>
