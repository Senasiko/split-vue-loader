"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const loader_utils_1 = require("loader-utils");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const templateReg = /\/\/ split-vue\(template\): ['"](.+?\_vue\..+?)['"]\n/;
const styleReg = /\/\/ split-vue\(style\): ['"](.+?\_vue\..+?)['"]\n/;
function default_1(content) {
    if ((this.resourceQuery && loader_utils_1.parseQuery(this.resourceQuery)['vue']) || this.request.match(/vue-loader/)) {
        if (content.match(/<template>/)) {
            return content;
        }
        const { blockContent: template, lang: templateLang } = parseBlock(templateReg, content, this);
        const { blockContent: style, lang: styleLang } = parseBlock(styleReg, content, this);
        let vueContent = '';
        if (template)
            vueContent += `<template lang="${templateLang}">${template}</template>`;
        vueContent += `<script lang="ts">${content}</script>`;
        if (style)
            vueContent += `<style lang="${styleLang}" scoped>${style}</style>`;
        return vueContent;
    }
    if (this.request.match(/ts-loader/))
        return content;
    const request = `vue-loader!${this.resourcePath}`;
    return `import mod from '${request}'; export default mod; export * from '${request}'`;
}
exports.default = default_1;
function parseBlock(reg, content, context) {
    const mathResult = content.match(reg);
    if (!mathResult)
        return { blockContent: '', lang: '' };
    const filePath = path.resolve(context.context, mathResult[1]);
    context.addDependency(filePath);
    const blockContent = fs.readFileSync(filePath, 'utf-8');
    filePath.match(/\.(.+)?$/);
    return { blockContent, lang: RegExp.$1 };
}
