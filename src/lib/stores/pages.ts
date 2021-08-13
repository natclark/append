import { writable } from 'svelte/store';

export default writable([
    {
        type: `page`,
        title: `Home`,
        description: `This is a home page.`,
        canonical: `/`,
        path: `/index.html`,
    },
    {
        type: `redirect`,
        path: `/ipfs-404.html`,
        to: `/`,
    },
    {
        type: `special`,
        path: `/.well-known/security.txt`,
        body: ``,
    },
    {
        type: `special`,
        path: `/ads.txt`,
        body: ``,
    },
    {
        type: `special`,
        path: `/browserconfig.xml`,
        body: ``,
    },
    {
        type: `special`,
        path: `/humans.txt`,
        body: ``,
    },
    {
        type: `special`,
        path: `/manifest.webmanifest`,
        body: ``,
    },
    {
        type: `special`,
        path: `/robots.txt`,
        body: ``,
    },
    {
        type: `special`,
        path: `/rss.xml`,
        body: ``,
    },
    {
        type: `special`,
        path: `/sitemap.xml`,
        body: ``,
    }
]);
