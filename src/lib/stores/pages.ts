import { writable } from 'svelte/store';

export default writable([
    {
        type: `page`,
        title: `Home`,
        description: `This is a home page.`,
        canonical: `/`,
        path: `/index.html`,
        file: `index.html`,
        body: ``,
        mime: `text/html`,
    },
    {
        type: `stylesheet`,
        path: `/style.css`,
        file: `style.css`,
        body: ``,
        mime: `text/css`,
    },
    {
        type: `redirect`,
        path: `/ipfs-404.html`,
        file: `ipfs-404.html`,
        to: `/`,
        mime: `text/html`,
    },
    {
        type: `security`,
        path: `/.well-known/security.txt`,
        file: `security.txt`,
        body: ``,
        mime: `text/plain`,
    },
    {
        type: `ads`,
        path: `/ads.txt`,
        file: `ads.txt`,
        body: `placeholder.example.com, placeholder, DIRECT, placeholder`,
        mime: `text/plain`,
    },
    {
        type: `browserconfig`,
        path: `/browserconfig.xml`,
        file: `browserconfig.xml`,
        body: ``,
        mime: `application/xml`,
    },
    {
        type: `humans`,
        path: `/humans.txt`,
        file: `humans.txt`,
        body: ``,
        mime: `text/plain`,
    },
    {
        type: `webmanifest`,
        path: `/manifest.webmanifest`,
        file: `manifest.webmanifest`,
        body: ``,
        mime: `application/manifest+json`,
    },
    {
        type: `robots`,
        path: `/robots.txt`,
        file: `robots.txt`,
        body: ``,
        mime: `text/plain`,
    },
    {
        type: `feed`,
        path: `/rss.xml`,
        file: `rss.xml`,
        body: ``,
        mime: `application/rss+xml`,
    },
    {
        type: `sitemap`,
        path: `/sitemap.xml`,
        file: `sitemap.xml`,
        body: ``,
        mime: `application/xml`,
    }
]);
