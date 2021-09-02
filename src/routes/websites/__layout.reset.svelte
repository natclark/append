<script>
    import { wallet, builtin, chain, flow, fallback } from '$lib/stores/wallet';

    let walletButton;

    const refresh = () => $wallet.address !== undefined && (walletButton.classList.add(`navbar__button--success`));

    const click = () => {
        if (typeof $wallet.address === `undefined`) {
            try {
                if ($chain.notSupported) {
                    // TODO handle
                }
                if ($wallet.state === `Idle`) {
                    wallet.connect(`builtin`);
                    if (builtinNeedInstallation) {
                        // TODO handle
                    }
                } else if ($wallet.state === `Locked`) {
                    if ($wallet.unlocking) {
                        // TODO handle
                    } else {
                        wallet.unlock().then((res) => {
                            // TODO handle
                        });
                    }
                } else if ($chain.state === `Connected`) {
                    if ($chain.loadingData) {
                        alert(`Loading contracts...`);
                    } else {
                        // TODO handle
                    }
                } else if ($wallet.pendingUserConfirmation) {
                    // TODO handle
                } else if (executionError) {
                    if (executionError.errorCode === 4001) {
                        // TODO handle
                    } else if (executionError.message) {
                        // TODO handle
                    } else {
                        // TODO handle
                    }
                }
            } catch (e) {
                // TODO handle
            }
        } else {
            alert(`Your wallet is connected! More options will be available soon.`);
        }
    };
</script>

<svelte:head>
    <title>My Websites - Append</title>
    <link rel="canonical" href="https://tryappend.com/websites/">
    <link rel="stylesheet" type="text/css" href="/css/websites.css">
</svelte:head>

<div class="container">
    <nav class="navbar">
        <div class="navbar__left">
            <a class="navbar__logo" href="/" draggable="false" sveltekit:prefetch>
                <img src="/logo.svg" height="32px" width="32px" alt="Append" draggable="false">
                <span>Append</span>
            </a>
            <a class="navbar__link" href="/docs/" draggable="false" sveltekit:prefetch>Docs</a>
            <a class="navbar__link" href="/faq/" draggable="false" sveltekit:prefetch>FAQ</a>
        </div>
        <button bind:this={walletButton} class="{$wallet.address === undefined ? `navbar__button` : `navbar__button navbar__button--success`}" draggable="false" on:click={click}>{typeof $wallet.address === `undefined` ? `Connect Wallet` : $wallet.address}</button>
    </nav>
    <slot />
</div>

<style>
    :global {
        .container {
            display: grid;
            grid-template-columns: 1fr min(1000px, 100%) 1fr;
            > * {
                grid-column: 2;
            }
            .break {
                grid-column: 1 / -1;
                width: 100%;
            }
        }
    }
    a {
        text-decoration: none;
        &:focus {
            outline: 0;
        }
    }
    .navbar {
        align-items: center;
        display: flex;
        height: 100px;
        justify-content: space-between;
        .navbar__left {
            align-items: center;
            display: inline-flex;
            flex-wrap: wrap;
            gap: 22px;
            justify-content: flex-start;
            .navbar__logo {
                align-items: center;
                color: #000;
                display: flex;
                span {
                    color: #fff;
                    font-size: 18px;
                    margin-left: 8px;
                }
            }
            .navbar__link {
                color: #f8f8f8;
                font-size: 15px;
            }
            a:hover {
                opacity: .9;
            }
        }
        .navbar__button {
            background-color: rgba(65, 105, 225, .1);
            border: 0;
            border-radius: 1px;
            color: #4169e1;
            cursor: pointer;
            font-weight: 600;
            line-height: 1.3;
            padding: 10px 20px;
            &.navbar__button--success {
                background-color: rgba(65, 105, 225, .3);
                color: #f8f8f8;
            }
            &:hover {
                opacity: .9;
            }
            &:focus {
                outline: 0;
            }
        }
    }
</style>
