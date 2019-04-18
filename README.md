# rudget

## Project setup

```
yarn install
```

## VSCode Settings

```json
{
  "editor.formatOnSave": true,
  "eslint.alwaysShowStatus": true,
  "eslint.autoFixOnSave": true,
  "eslint.run": "onType",
  "eslint.validate": [
    {
      "language": "vue",
      "autoFix": true
    },
    {
      "language": "html",
      "autoFix": true
    },
    {
      "language": "javascript",
      "autoFix": true
    },
    {
      "language": "typescript",
      "autoFix": true
    }
  ],
  "prettier.eslintIntegration": true,
  "prettier.singleQuote": true,
  "prettier.htmlWhitespaceSensitivity": "ignore",
  "vetur.format.defaultFormatter.html": "none",
  "vetur.format.defaultFormatterOptions": {
    "prettier": {
      "htmlWhitespaceSensitivity": "ignore",
      "singleQuote": true
    }
  }
}
```

### Compiles and hot-reloads for development

```
yarn run serve
```

### Compiles and minifies for production

```
yarn run build
```

### Run your tests

```
yarn run test
```

### Lints and fixes files

```
yarn run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
