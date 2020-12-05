"use strict";
const seccamp_redos_1 = require("seccamp-redos");
const check = (source, flags) => {
    let msg = seccamp_redos_1.detectReDoS(source, flags);
    return msg.status === "Vulnerable";
};
const rule = {
    create: (context) => {
        return {
            Literal: (node) => {
                if (node.value instanceof RegExp) {
                    const source = node.value.source;
                    const flags = node.value.flags;
                    const result = check(source, flags);
                    console.log("regular expression found -> " + source);
                    if (result) {
                        context.report({
                            message: "ReDoSかも -> " + source,
                            node,
                        });
                    }
                }
                // new RegExp()
                if ("callee" in node.parent) {
                    if ("name" in node.parent.callee) {
                        if (node.parent.callee.name == 'RegExp') {
                            let reg = String(node.value);
                            let flags = "u"; // デフォルトでは"u"
                            if (node.parent.arguments.length > 1) { // 引数が2つ以上なら
                                flags = node.parent.arguments[1].value; // 第二引数を取得
                            }
                            if (reg.length > 2)
                                console.log("regular expression found -> " + reg);
                            if (check(reg, flags)) {
                                context.report({
                                    message: "ReDoSかも -> " + reg,
                                    node,
                                });
                            }
                        }
                    }
                }
            },
        };
    }
};
module.exports = rule;
//# sourceMappingURL=no-literal.js.map