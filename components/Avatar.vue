<template>
  <span
    class="
      flex
      relative
      justify-start
      items-center
      m-1
      mr-2
      mt-2
      ml-0
      my-0
      text-xs
      rounded-full
    "
    ><img class="rounded-full w-8 h-8 mr-2" alt="A" :src="user.avatar_url" />
    <span class="mt-1 text-gray-200 text-sm"> {{ user.name }}</span>
  </span>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
})
</script>
