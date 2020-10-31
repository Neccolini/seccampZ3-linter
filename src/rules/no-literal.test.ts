import { RuleTester } from "eslint";

import rule from "./no-literal";



const tester = new RuleTester({ parserOptions: { ecmaVersion: 2015 } });

tester.run("no-literal", rule, {
    valid: [
        { code: `^(a|a)*$` },
    ],
    invalid: [
        {
            code: `^(a|a)*$`,
            errors: [{ message: "😿" }],
        }
    ],
});