const chainId = import.meta.env.VITE_CHAIN_ID as string;
let nodeUrl: string | undefined;
let finality = chainId === `1` ? 12 : 5;

if (!nodeUrl) {
    const url = import.meta.env.VITE_ETH_NODE_URI as string;
    if (url && url !== "") nodeUrl = url;
}

export {
    finality,
    nodeUrl
};
