<script>
    import { wallet, builtin, chain, flow, fallback } from '$lib/stores/wallet';
    import { getContext } from 'svelte';
    import Publish from '../Modals/Publish.svelte';

    const { open, } = getContext(`simple-modal`);

    let walletButton;

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
            open(Publish);
        }
    };
</script>

<button bind:this={walletButton} class="{$wallet.address === undefined ? `primary` : `success`}" on:click={click}>
    {typeof $wallet.address === `undefined` ? `Connect Wallet` : `Publish`}
</button>
