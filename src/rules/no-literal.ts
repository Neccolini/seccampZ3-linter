import { Rule } from "eslint";

const check = (source: string, flags: string): boolean=>{
  return source === '^(a|a)*$';
};


const rule: Rule.RuleModule = {
  create: (context) => {
    return {
      Literal: (node) => {
        if (node.value instanceof RegExp){ 
          const source=node.value.source;
          const flags=node.value.flags;
          const result=check(source,flags);
          if(result){
          context.report({
            message: "ReDoSかも",
            node,
          });
        }
      }
      },
    };
  }
};
export = rule;