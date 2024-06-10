/** @type {import("eslint").Linter.Config} */
module.exports = {
	extends: ["./.eslintrc.base.cjs", "./.eslintrc.typescript.cjs", "plugin:node/recommended"],
	rules: {
		"node/prefer-promises/fs": "error",
		"node/no-missing-import": "off",
	},
	env: {
		node: true,
	},
};
