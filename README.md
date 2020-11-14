# ESLint plugin for ReDoS

## What's this?
This is a tool for identifying and reporting on regular expressions where 
there is a risk of ReDoS (the regular expression denial of service) attack.<br>
for example: "/^(a|a)*$/", "/^(\w|\d)+$/", /^(.*)="(.*)"$/



This repository includes:

* TypeScript setting
* Jest
* CircleCI configuration

