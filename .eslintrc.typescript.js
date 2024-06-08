/** @type {import("eslint").Linter.Config} */
module.exports = {
	parser: "@typescript-eslint/parser",
	parserOptions: {
		project: "./tsconfig.json",
	},
	extends: [
		"plugin:@typescript-eslint/recommended",
		"plugin:@typescript-eslint/recommended-requiring-type-checking",
		"plugin:import/typescript",
	],
	rules: {
		"@typescript-eslint/no-empty-function": "off",
		"@typescript-eslint/no-namespace": "off",
		"@typescript-eslint/no-misused-promises": [
			"error",
			{
				checksVoidReturn: {
					attributes: false,
				},
			},
		],
	},
	settings: {
		"import/resolver": {
			typescript: {
				project,
			},
		},
	},
};

