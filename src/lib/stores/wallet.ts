import WalletStores from 'web3w';
import { finality, nodeUrl } from '$lib/config';
import { base } from '$app/paths';

const walletStores = ((WalletStores as any).default || WalletStores)({
    autoSelectPrevious: true,
    builtin: {
        autoProbe: true,
    },
    fallbackNode: nodeUrl,
    flow: {
        autoUnlock: true,
    },
    localStoragePrefix: base.startsWith(`/ipfs/`) || base.startsWith(`/ipns/`) ? base.slice(6) : undefined,
    options: [`builtin`],
    transactions: {
        autoDelete: false,
        finality,
    },
});

export const { wallet, transactions, builtin, chain, balance, flow, fallback } = walletStores;

if (typeof window !== `undefined`) (window as any).walletStores = walletStores;
