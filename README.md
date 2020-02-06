# split-vue-loader

webpack loader what split vue block to multiple file.

## what for?

the `.vue` single file is awesome. But the disadvantage is that can't use type system, especially used in Vue3.

split every vue file block to single file is useful for using type system.

##usage

`yarn add -D split-vue-loader`

> webpack.config.js

```js
const { SplitVuePlugin } = require('split-vue-loader');
module.exports = {
  module: {
    rules: [
      {
        test: /(?<!_vue)\.ts$/,
        loader: 'ts-loader',
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new SplitVuePlugin()
  ]
}
```



**SplitVuePlugin must be after for VueLoaderPlugin**

### before

```vue
<template lang="html">
  <div>
    <h1>
      count: {{ count }}
    </h1>
    <button 
    @click="addd">
      +1
    </button>
  </div>
</template>
<script lang="ts">
// index.vue
import { defineComponent, ref } from '@vue/runtime-dom';

export default defineComponent({
  setup() {
    const count = ref(1);
    const add = () => {
      count.value += 1;
    }
    return {
      count,
      add
    }
  },
})
</script>
<style lang="scss" scoped>
div {
  h1 {
    color: #00a8e9;
  }
}
```

### after

**file name is must end with _vue.(ts|html|scss)...**

> idnex_vue.ts

import template and style block file by `split-vue(...):`

```ts
// split-vue(template): './index_vue.html'
// split-vue(style): './index_vue.scss'
import { defineComponent, ref } from '@vue/runtime-dom';

export default defineComponent({
  setup() {
    const count = ref(1);
    const add = () => {
      count.value += 1;
    }
    return {
      count,
      add
    }
  },
})

```

> Index_vue.html

```html
<div>
  <h1>
    count: {{ count }}
  </h1>
  <button 
  @click="addd">
    +1
  </button>
</div>

```

> Index_vue.scss

```scss
// scoped will automatically add
div {
  h1 {
    color: #00a8e9;
  }
}

```

