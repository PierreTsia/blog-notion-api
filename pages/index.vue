<template>
  <div class="min-h-screen text-gray-400 bg-gray-900">
    <ArticlesList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import ArticlesList from '@/components/ArticlesList.vue'

export default defineComponent({
  components: { ArticlesList },
})
</script>
