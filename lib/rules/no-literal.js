"use strict";
const check = (source, flags) => {
    return source === '^(a|a)*$';
};
const rule = {
    create: (context) => {
        return {
            Literal: (node) => {
                if (node.value instanceof RegExp) {
                    const source = node.value.source;
                    const flags = node.value.flags;
                    const result = check(source, flags);
                    if (result) {
                        context.report({
                            message: "ReDoSかも",
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
                            if (check(reg, flags)) {
                                context.report({
                                    message: "ReDoSかも",
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