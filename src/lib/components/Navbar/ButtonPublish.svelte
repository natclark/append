<script>
    import { wallet, builtin, chain, flow, fallback } from '$lib/stores/wallet';
    let walletButton;

    const refresh = () => $wallet.address !== undefined && (walletButton.classList.add(`connected`));

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
                            if (res === true) close(true);
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
            alert(`This feature is still in the works!`);
        }
    };
</script>

<button bind:this={walletButton} class="button primary{$wallet.address === undefined ? `` : ` connected`}" on:click={click}>
    {typeof $wallet.address === `undefined` ? `Connect Wallet` : `Publish (Coming Soon!)`}
</button>
