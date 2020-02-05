import { parseQuery } from 'loader-utils';
import * as path from 'path';
import * as fs from 'fs';
import * as webpack from 'webpack';

const templateReg = /\/\/ split-vue\(template\): ['"](.+?\_vue\..+?)['"]\n/
const styleReg = /\/\/ split-vue\(style\): ['"](.+?\_vue\..+?)['"]\n/

export default function (this: webpack.loader.LoaderContext, content: string) {
  if ((this.resourceQuery && parseQuery(this.resourceQuery)['vue']) || this.request.match(/vue-loader/)) {
    if (content.match(/<template>/)) {
      return content;
    }
    const { blockContent: template, lang: templateLang } = parseBlock(templateReg, content, this);
    const { blockContent: style, lang: styleLang } = parseBlock(styleReg, content, this);
    let vueContent = '';
    if (template) vueContent += `<template lang="${templateLang}">${template}</template>`;
    vueContent += `<script lang="ts">${content}</script>`;
    if (style) vueContent += `<style lang="${styleLang}" scoped>${style}</style>`;
    return vueContent
  }
  if (this.request.match(/ts-loader/)) return content;
  const request = `vue-loader!${this.resourcePath}`;
  return `import mod from '${request}'; export default mod; export * from '${request}'`
}

function parseBlock(reg: RegExp, content: string, context: webpack.loader.LoaderContext): { blockContent: string, lang: string } {
  const mathResult = content.match(reg);
  if (!mathResult) return { blockContent: '', lang: '' };
  const filePath = path.resolve(context.context, mathResult[1]);
  context.addDependency(filePath);
  const blockContent = fs.readFileSync(filePath, 'utf-8');
  filePath.match(/\.(.+)?$/)
  return { blockContent, lang: RegExp.$1 };
}
