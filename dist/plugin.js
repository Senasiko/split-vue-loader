"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SplitVuePlugin {
    apply(compiler) {
        const { rules } = compiler.options.module;
        if (compiler.options.module)
            compiler.options.module.rules = [
                ...rules,
                {
                    test: /_vue\.ts$/,
                    use: require.resolve('./loader'),
                    resourceQuery(query) {
                        return !query.match(/vue/);
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
            ];
    }
}
exports.SplitVuePlugin = SplitVuePlugin;
