/** @type {import("eslint").Linter.Config} */
module.exports = {
	extends: [
		"eslint:recommended",
		"plugin:import/recommended",
		"turbo",
		"prettier",
	],
	parserOptions: {
		ecmaVersion: "latest",
	},
	rules: {
		"prefer-const": "warn",
		"no-console": "warn",
		"no-duplicate-imports": "error",
		"spaced-comment": ["error", "always", { markers: ["/", "!", "?"] }],
		"arrow-body-style": ["warn", "as-needed"],
		"import/no-cycle": "error",
		"import/prefer-default-export": "off",
		"import/extensions": [
			"error",
			"ignorePackages",
			{ js: "never", jsx: "never", ts: "never", tsx: "never" },
		],
	},
	settings: {
		"import/resolver": {
			node: true,
		},
	},
	env: {
		es6: true,
	},
	reportUnusedDisableDirectives: true,
	ignorePatterns: ["node_modules"],
};

