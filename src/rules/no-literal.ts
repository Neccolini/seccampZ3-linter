import { Rule } from "eslint";
import { join } from "path";
import {detectReDoS} from "seccamp-redos";
const check = (source: string, flags?: string): boolean=>{
  let msg=detectReDoS(source, flags);
  return msg.status==="Vulnerable";
};


const rule: Rule.RuleModule = {
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
              message: "ReDoSかも -> "+source,
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
              if (reg.length > 2) console.log("regular expression found -> " + reg);
              if(check(reg,flags)){
            context.report({
              message: "ReDoSかも -> "+reg,
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