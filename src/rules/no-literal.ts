import { Rule } from "eslint";
import { join } from "path";

const check = (source: string, flags: string): boolean=>{
  return source === '^(a|a)*$';
};


const rule: Rule.RuleModule = {
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
        if("callee" in node.parent){
          if("name" in node.parent.callee){
            if(node.parent.callee.name=='RegExp'){ 
              let reg:string=String(node.value);
              let flags:string="u"; // デフォルトでは"u"
              if(node.parent.arguments.length>1){ // 引数が2つ以上なら
                flags = (<any>node.parent.arguments[1]).value; // 第二引数を取得
              }
              if(check(reg,flags)){
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
export = rule;