# ESLint plugin for ReDoS

## What's this?
This is a tool for identifying and reporting on regular expressions where 
there is a risk of ReDoS (the regular expression denial of service) attack.<br>
for example: "/^(a|a)*$/", "/^(\w|\d)+$/", "/^(.*)="(.*)"$/"

# Usage<br>
In your project, run
```npm install eslint```
```npm install git+https://github.com/Neccolini/seccampZ3-linter.git```
Then, add this to .eslintc.js
```
module.exports = {

    "plugins": [
        "seccamp-z3"
    ],
    "rules": {
        "seccamp-z3/no-literal":"error"
    }
};
```

This repository includes:

* TypeScript setting
* Jest
* CircleCI configuration

