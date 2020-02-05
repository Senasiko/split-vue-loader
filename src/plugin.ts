import { Compiler, Module } from "webpack";

export class SplitVuePlugin {
  apply(compiler: Compiler) {
    const { rules } = compiler.options.module as Module;
    if (compiler.options.module) compiler.options.module.rules = [
      ...rules,
      {
        test: /_vue\.ts$/,
        use: require.resolve('./loader'),
        resourceQuery(query) {
          return !query.match(/vue/)
        }
      },
      {
        test: /_vue\.ts$/,
        use: ['vue-loader'],
        resourceQuery: /vue/
      },
      {
        test: /_vue\.ts$/,
        use: require.resolve('./loader'),
      },
    ]
  }
}
