module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'standard-with-typescript',
    'plugin:@typescript-eslint/recommended', // 型を必要としないプラグインの推奨ルールをすべて有効
    'plugin:@typescript-eslint/recommended-requiring-type-checking', // 型を必要とするプラグインの推奨ルールをすべて有効
    'prettier', // 追加 ESLintの情報に沿ってフォーマット
  ],
  overrides: [],
  parser: '@typescript-eslint/parser', // 追加
  parserOptions: {
    ecmaFeatures: {
      // 追加
      jsx: true,
    },
    ecmaVersion: 12, // latestから12に変更
    sourceType: 'module',
    tsconfigRootDir: __dirname, // 追加 tsconfig.jsonがある相対パスを指定
    project: ['./tsconfig.json'], // 追加  tsconfig.jsonを指定
  },
  plugins: [
    'react',
    '@typescript-eslint', // 追加
    'unused-imports', // 追加 使っていないimportを自動で削除用
  ],
  ignorePatterns: ['build'], // 追加 .eslintignoreに対象外にしているが無いとコンパイルに時間がかかる
  rules: {
    'no-use-before-define': 'off', // 関数や変数が定義される前に使われているとエラーになるデフォルトの機能をoff
    '@typescript-eslint/no-use-before-define': ['error'], // typescript側のno-use-before-defineを使うようにする
    'import/prefer-default-export': 'off', // named exportがエラーになるので使えるようにoff
    '@typescript-eslint/no-unused-vars': 'off', // unused-importsを使うため削除
    'unused-imports/no-unused-imports': 'error', // 不要なimportの削除
    'unused-imports/no-unused-vars': [
      // unused-importsでno-unused-varsのルールを再定義
      'warn',
      { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
    ],
    'react/function-component-definition': [
      // アロー関数以外受け付けない設定
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'no-param-reassign': [2, { props: false }], // パラメーターのプロパティ変更を許可
    'import/extensions': [
      // importのときに以下の拡張子を記述しなくてもエラーにしない
      'error',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'react/jsx-filename-extension': [
      // jsx形式のファイル拡張子をjsxもしくはtsxに限定
      'error',
      {
        extensions: ['.jsx', '.tsx'],
      },
    ],
    'react/react-in-jsx-scope': 'off', // import React from 'react'が無くてもエラーを無くす
    'react/prop-types': 'off', // TypeScriptでチェックしているから不要。offにする
    'no-void': [
      // void演算子の許可
      'error',
      {
        allowAsStatement: true,
      },
    ],
  },
  settings: {
    'import/resolver': {
      // importするファイルをjsだけではなく、tsを含むファイルを許可する
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
    react: {
      createClass: 'createReactClass', // Regex for Component Factory to use,
      // default to "createReactClass"
      pragma: 'React', // Pragma to use, default to "React"
      fragment: 'Fragment', // Fragment to use (may be a property of <pragma>), default to "Fragment"
      version: 'detect', // React version. "detect" automatically picks the version you have installed.
      // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
      // It will default to "latest" and warn if missing, and to "detect" in the future
      flowVersion: '0.53', // Flow version
    },
    propWrapperFunctions: [
      // The names of any function used to wrap propTypes, e.g. `forbidExtraProps`. If this isn't set, any propTypes wrapped in a function will be skipped.
      'forbidExtraProps',
      { property: 'freeze', object: 'Object' },
      { property: 'myFavoriteWrapper' },
      // for rules that check exact prop wrappers
      { property: 'forbidExtraProps', exact: true },
    ],
    componentWrapperFunctions: [
      // The name of any function used to wrap components, e.g. Mobx `observer` function. If this isn't set, components wrapped by these functions will be skipped.
      'observer', // `property`
      { property: 'styled' }, // `object` is optional
      { property: 'observer', object: 'Mobx' },
      { property: 'observer', object: '<pragma>' }, // sets `object` to whatever value `settings.react.pragma` is set to
    ],
    formComponents: [
      // Components used as alternatives to <form> for forms, eg. <Form endpoint={ url } />
      'CustomForm',
      { name: 'Form', formAttribute: 'endpoint' },
    ],
    linkComponents: [
      // Components used as alternatives to <a> for linking, eg. <Link to={ url } />
      'Hyperlink',
      { name: 'Link', linkAttribute: 'to' },
    ],
  },
};
