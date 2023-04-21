const fs = require("fs")
const path = require("path")

module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ["standard", "prettier"],
	plugins: ["prettier"],
	overrides: [],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	rules: {
		"comma-dangle": ["error", "always-multiline"],
		indent: "off",
		"no-tabs": 0,
		"prettier/prettier": ["error", JSON.parse(fs.readFileSync(path.join(__dirname, ".prettierrc"), "utf8"))],
		quotes: [
			"error",
			"double",
			{
				avoidEscape: true,
			},
		],
	},
}
