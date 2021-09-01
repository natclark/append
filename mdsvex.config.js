import remarkGithub from 'remark-github';
import remarkAbbr from 'remark-abbr';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

export default {
	extensions: [`.md`],
    	rehypePlugins: [
		rehypeSlug,
		[
			rehypeAutolinkHeadings,
			{
				behavior: `wrap`,
			}
		]
	],
	remarkPlugins: [
		[
			remarkGithub,
			{
				repository: `https://github.com/natclark/append.git`,
			}
		],
		remarkAbbr
	],
    smartypants: {
		dashes: `oldschool`,
	},
};
