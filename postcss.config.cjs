`use strict`;
const postcssNested = require(`postcss-nested`);
const autoprefixer = require(`autoprefixer`);
const cssnano = require(`cssnano`);

module.exports = {
    plugins: [
        autoprefixer,
        process.env.NODE_ENV !== `development` && cssnano({
            preset: `default`,
        }),
        postcssNested
    ],
};
