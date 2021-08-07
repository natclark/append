module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    extends: [`eslint:recommended`, `prettier`],
    overrides: [
        {
            files: [`*.svelte`],
            processor: `svelte3/svelte3`,
        }
    ],
    parserOptions: {
        ecmaVersion: 2015,
        sourceType: `module`,
    },
    plugins: [`svelte3`],
    rules: {
        indent: [`error`, 4],
        quotes: [`error`, `backtick`],
    },
    root: true,
};
