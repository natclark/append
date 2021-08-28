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
        ecmaVersion: 2019,
        sourceType: `module`,
    },
    plugins: [`svelte3`],
    rules: {
        indent: [`error`, 4, {
            SwitchCase: 1,
        }],
        quotes: [`error`, `backtick`],
    },
    root: true,
};
