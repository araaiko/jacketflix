# JACKETFLIXの環境およびディレクトリ構成について

本件はcreate-react-appで構築しました。(https://github.com/facebook/create-react-app). \
主な環境は以下の通りです。\
・React　^18.2.0\
・TypeScript　^4.9.4\
・Firebase　^9.17.1\
・axios　1.2.3\
・styled-components　^5.3.6\
その他についてはpackage.jsonをご確認ください。

## ディレクトリ構成について

### Atomic Design

本件はAtomic Designを採用しています。\
主なルールは以下を参考にしています。\
https://info.drobe.co.jp/blog/engineering/react-component-atomic-design \

その他の独自ルールは以下の通りです。

#### 外部データとのやり取りについて

外部データについてはPagesかOrganismsにまとめています。\
基本はPagesにまとめるようにしていますが、一部、Organismsに記載したほうが見通しが良いもの（onClick等のイベントリスナー経由で外部データとやり取りする場合など）に限ってはOrganismsにまとめました。

#### コンポーネント分割について

・ul, liなど、HTMLの都合上切り分けずにまとめておいた方が使い勝手が良い、ミスが起こりにくい要素については、ulとliで分割せず、1セットのコンポーネントとしてまとめています。\

・map関数を使用している都合上、どうしても汎用的にできない要素については、無理にAtomsにせず、Organismsに格納しています。

### Atomic Design以外のディレクトリ構成について

#### api

axiosの設定やrequest URLをまとめています。

#### firebase

Firebaseのconfigをまとめています。

#### function

複数のファイルで使用する、汎用的な関数をまとめています。\
※本件でのみ使うものに限る

#### img

画像を格納しています。

#### lib

本件に限らず、どのプロジェクトでも使える関数をまとめています。

#### providers

後述するContextの各設定をまとめています。

#### router

React Routerの設定をまとめています。

#### style

リセットCSSや共通CSSを記述したGlobalStyleを格納しています。\
また、z-indexやカラー変数もまとめています。

#### types

複数のファイルで使用する、共通の型定義をまとめています。

## グローバルStateについて

グローバルStateには、Contextを使用しています。\
現在はユーザー情報のみ保持しています。

## styled-componentsについて

本件ではstyled-componentsを使用しています。\
styled-componentsは先頭にSを付けて区別できるようにしています。\
例) `const STextWrapper = styled.div``;`

## 使用アイコンについて

ヘッダー等で使用している各アイコンはRadix Iconsをお借りしています。（https://icons.radix-ui.com/）



## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
