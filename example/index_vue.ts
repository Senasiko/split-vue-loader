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

export const test = 1;
