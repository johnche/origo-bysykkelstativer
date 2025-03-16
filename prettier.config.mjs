export default {
	useTabs: true,
	singleQuote: true,
	trailingComma: 'all',
	printWidth: 100,
	plugins: ['prettier-plugin-svelte'],
	overrides: [
		{
			files: '*.svelte',
			options: {
				parser: 'svelte',
				htmlWhitespaceSensitivity: 'ignore',
			},
		},
	],
};
