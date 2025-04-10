import pluginMisskey from '@misskey-dev/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

//@ts-check
/** @type {import('eslint').Linter.Config[]}  */
export default [ // eslint-disable-line import/no-default-export
	...pluginMisskey.configs['recommended'],
	{
		ignores: [
			'**/node_modules',
			'built',
			'test',
		],
	},
	{
		files: ['**/*.ts', '**/*.tsx'],
		languageOptions: {
			parserOptions: {
				parser: tsParser,
				project: ['./tsconfig.json'],
				sourceType: 'module',
				tsConfigRootDir: import.meta.dirname,	
			},
		},
	},
	{
		files: ['**/*.js', '**/*.cjs'],
		rules: {
			'@typescript-eslint/no-var-requires': 'off',
		},
	},
];
