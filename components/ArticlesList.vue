<template>
  <div>
    <section class="font-sans overflow-hidden">
      <div v-if="articles.length" class="container px-5 py-24 mx-auto">
        <ArticlePreview
          v-for="(article, i) in articles"
          :key="i"
          :article="article"
          :class="i > 0 ? ['border-t-2 border-gray-800'] : null"
        />
      </div>
    </section>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  useContext,
  useFetch,
  ref,
} from '@nuxtjs/composition-api'
import ArrowRight from '~/components/ArrowRight.vue'
import ArticlePreview from '~/components/ArticlePreview.vue'

export default defineComponent({
  components: { ArrowRight, ArticlePreview },
  setup() {
    const { $axios } = useContext()
    const articles = ref([])

    const params = {
      filter: {
        property: 'Status',
        select: {
          equals: 'Published',
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
