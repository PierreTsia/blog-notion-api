<template>
  <span
    class="
      text-xxs
      px-3
      font-medium
      text-base text-green-900
      rounded-full
      py-1.5
      whitespace-nowrap
      bg-green-200
    "
  >
    <slot />
  </span>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({})
</script>
