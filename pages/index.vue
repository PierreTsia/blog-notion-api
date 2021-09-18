<template>
  <Tutorial />
</template>

<script lang="ts">
import {
  defineComponent,
  useContext,
  useFetch,
  ref,
} from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const { $axios } = useContext()
    const articles = ref([])

    const params = {
      filter: {
        property: 'Tags',
        multi_select: {
          contains: 'JAM Stack',
        },
      },
    }

    const { fetch, fetchState } = useFetch(async () => {
      const res = await $axios.$get('/get-articles', { params })
      articles.value = res.results
    })

    fetch()

    return { articles, fetchState }
  },
})
</script>
