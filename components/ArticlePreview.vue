<template>
  <div class="py-8 flex flex-wrap md:flex-nowrap">
    <div class="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
      <div class="flex flex-wrap justify-items-start">
        <Chip
          v-for="tag in tags"
          :key="tag.id"
          :color="tag.color"
          class="m-1"
          >{{ tag.name }}</Chip
        >
      </div>
      <span class="mt-2 pl-2 text-gray-500 text-md">{{ articleDate }}</span>
      <div>
        <Avatar v-if="author" :user="author" />
      </div>
    </div>
    <div class="md:flex-grow">
      <h2 class="text-2xl font-medium text-white title-font mb-2">
        {{ title }}
      </h2>
      <p class="leading-relaxed">
        {{ description }}
      </p>
      <nuxt-link
        :to="articleRoute(article)"
        class="text-green-500 inline-flex items-center mt-4"
        >Read More
        <Arrow-Right />
      </nuxt-link>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'
import { format } from 'date-fns'
import Chip from '~/components/Chip.vue'
import Avatar from '~/components/Avatar.vue'

export default defineComponent({
  components: { Chip, Avatar },
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const articleDate = computed(() =>
      props.article?.created_time
        ? format(new Date(props.article?.created_time), 'PP')
        : null
    )

    const title = computed(
      () => props.article.properties?.Name?.title?.[0]?.plain_text ?? ''
    )

    const description = computed(
      () =>
        props.article.properties?.Description?.rich_text[0]?.plain_text ?? ''
    )

    const slug = computed(
      () => props.article.properties?.Slug.rich_text[0]?.plain_text ?? ''
    )

    const tags = computed(
      () => props.article.properties?.Tags?.multi_select ?? []
    )

    const author = computed(() => props.article.properties?.Author?.people?.[0])

    const articleRoute = (article: any) => {
      return { name: 'page', params: { pageId: article.id, slug: slug.value } }
    }

    return { articleDate, title, description, articleRoute, tags, author }
  },
})
</script>
