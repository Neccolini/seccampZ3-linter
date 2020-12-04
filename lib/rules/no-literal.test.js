"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const eslint_1 = require("eslint");
const no_literal_1 = __importDefault(require("./no-literal"));
const tester = new eslint_1.RuleTester({ parserOptions: { ecmaVersion: 2015 } });
tester.run("no-literal", no_literal_1.default, {
    valid: [
        { code: `const x=1` },
    ],
    invalid: [
        {
            code: `var str = new RegExp('^(a|a)*$','u');`,
            errors: [{ message: "😿" }],
        }
    ],
});
//# sourceMappingURL=no-literal.test.js.map