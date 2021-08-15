import { writable } from 'svelte/store';

export default writable({
    baseURL: `/`,
    siteTitle: `My Website`,
    siteDomains: [],
    lastHash: null,
    defaultLang: `en`,
    defaultDirection: `ltr`,
    webmanifest: {
        short_name: ``,
        categories: [],
        description: ``,
        display: `minimal-ui`,
        lang: `English`,
        orientation: `portrait-primary`,
        background_color: ``,
        theme_color: ``,
        related_applications: [],
        prefer_related_applications: false,
        icons: [],
    },
});
