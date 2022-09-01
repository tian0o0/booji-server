/* eslint-disable prettier/prettier */
import { t } from "i18next";

export interface ConfigItem {
  title: string;
  code: string;
}

const js: ConfigItem[] = [
  {
    title: t("importJS"),
    code: 
`<head>
  <script src="https://unpkg.com/@booji/browser@latest/dist/browser.min.js"></script>
</head>`,
  },
  {
    title: t("init"),
    code: 
`<script>
  Booji.init({
    debug: true,
    dsn: 'https://qingtian.life/booji',
    appKey: '9663a0fa-aec3-441e-85eb-461d66ae1ec3',
  });
</script>`,
  },
];

const react: ConfigItem[] = [
  {
    title: t("install"),
    code: 
`npm install @booji/react

// or

pnpm install @booji/react`,
  },
  {
    title: t("init"),
    code: 
`import React from "react"
import ReactDOM from "react-dom";
import { init } from "@booji/react"

init({
  debug: true,
  dsn: "https://qingtian.life/booji",
  appKey: "9663a0fa-aec3-441e-85eb-461d66ae1ec3"
})

ReactDOM.render(<App />, document.getElementById('root'));`,
  },
  {
    title: "ErrorBoundary",
    code: 
`
// https://reactjs.org/docs/error-boundaries.html

import { ErrorBoundary } from '@booji/react'

export default function FunctionalComponent() {
  const onError = (error: Error, componentStack: string) => {
    // 处理错误
  }
  const fallbackView = <p>出错啦，现在加载的是兜底视图</p>;
  return (
    <>
      <ErrorBoundary onError={onError} fallback={fallbackView}>
        <ComponentWithError />
      </ErrorBoundary>
    </>
  )
}`,
  },
];

const vue: ConfigItem[] = [
  {
    title: t("install"),
    code: 
`npm install @booji/vue

// or

pnpm install @booji/vue`,
  },
  {
    title: t("init"),
    code: 
`// Vue2.x

import Vue from "vue"
import { init } from "@booji/vue"

init({
  Vue,
  debug: true,
  dsn: "https://qingtian.life/booji",
  appKey: "9663a0fa-aec3-441e-85eb-461d66ae1ec3"
})

new Vue({
  // ...
})




// Vue3.x

import { init } from "@booji/vue"

const app = createApp({ //... })

init({
  app,
  debug: true,
  dsn: "https://qingtian.life/booji",
  appKey: "9663a0fa-aec3-441e-85eb-461d66ae1ec3"
})`,
  },
];

const angular: ConfigItem[] = [
  {
    title: t("install"),
    code: 
`npm install @booji/angular

// or

pnpm install @booji/angular`,
  },
  {
    title: t("init"),
    code: 
`import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { init } from '@booji/angular';

import { AppModule } from './app/app.module';

init({
  debug: true,
  dsn: "https://qingtian.life/booji",
  appKey: "9663a0fa-aec3-441e-85eb-461d66ae1ec3"
});

// ...

enableProdMode();
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then(success => console.log("Bootstrap success"))
  .catch(err => console.error(err));`,
  },
  {
    title: "ErrorHandler",
    code: 
`import { NgModule, ErrorHandler } from '@angular/core';
import { createBoojiErrorHandler } from '@booji/angular';

@NgModule({
  // ...
  providers: [
    {
      provide: ErrorHandler,
      useValue: createBoojiErrorHandler(),
    },
  ],
  // ...
})`,
  },
];

export { js, react, vue, angular };
