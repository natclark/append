`use strict`;
/** @type {import('@sveltejs/kit').Config} */
import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import autoprefixer from 'autoprefixer';
import dotenv from 'dotenv';
import process from 'process';

dotenv.config();

export default {
    extensions: [`.svelte`],
    kit: {
        adapter: adapter({
            assets: `src/build`,
            fallback: null,
            pages: `src/build`,
        }),
        files: {
            assets: `static`,
            hooks: `src/hooks`,
            lib: `src/lib`,
            routes: `src/routes`,
            serviceWorker: `src/service-worker`,
            template: `src/app.html`,
        },
        floc: false,
        target: `body`,
        trailingSlash: `always`,
    },
    preprocess: [
        preprocess({
            defaults: { style: `scss`, },
            postcss: { plugins: [autoprefixer()], },
            replace: [[`process.env.WEB3STORAGE_TOKEN`, process.env.WEB3STORAGE_TOKEN]],
            scss: { prependData: `@charset 'UTF-8';`, },
            sourceMap: true,
        }),
    ],
};
