<template>
  <Tutorial />
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  useContext,
  ref,
} from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const { $axios } = useContext()
    const articles = ref([])
    onMounted(async () => {
      const res = await $axios.$get('/get-articles', {
        params: {
          filter: {
            property: 'Tags',
            multi_select: {
              contains: 'JAM Stack',
            },
          },
        },
      })
      articles.value = res.results
    })

    return { articles }
  },
})
</script>
