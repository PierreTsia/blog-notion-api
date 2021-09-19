<template>
  <span
    :class="`bg-${color}-500`"
    class="text-xxs px-3 font-medium text-base text-white rounded-full py-1.5 whitespace-nowrap"
  >
    <slot />
  </span>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    color: {
      type: String,
      default: 'yellow',
    },
  },
})
</script>
