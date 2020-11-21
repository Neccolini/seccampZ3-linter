# eslint-plugin-tutorial

...

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-tutorial`:

```
$ npm install eslint-plugin-tutorial --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-tutorial` globally.

## Usage

Add `tutorial` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "tutorial"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "tutorial/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here





