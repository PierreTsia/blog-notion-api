<template>
  <div class="min-w-full bg-gray-900 w-full md:max-w-3xl mx-auto">
    <img
      v-if="cover"
      alt="page-cover"
      class="object-none object-left-top w-full h-32"
      :src="cover"
    />
    <div
      class="
        lg:max-w-3xl
        mx-auto
        px-4
        md:px-0
        text-xl text-gray-300
        leading-normal
      "
    >
      <div class="font-sans">
        <span class="text-base md:text-sm text-green-500 font-bold">
          <nuxt-link
            to="/"
            class="
              text-base
              md:text-sm
              text-green-500
              font-bold
              no-underline
              hover:underline
            "
            >BACK TO BLOG</nuxt-link
          >
        </span>
        <h1
          class="
            font-bold font-sans
            break-normal
            text-gray-200
            pt-6
            pb-2
            text-3xl
            md:text-4xl
          "
        >
          {{ title }}
        </h1>
        <p class="text-sm md:text-base font-normal text-gray-600">
          Published {{ date }}
        </p>
      </div>

      <!--Post Content-->

      <!--Lead Para-->
      <p class="py-6">
        👋 Welcome fellow
        <a
          class="text-green-500 no-underline hover:underline"
          href="https://www.tailwindcss.com"
          >Tailwind CSS</a
        >
        and miminal monochrome blog fan. This starter template provides a
        starting point to create your own minimal monochrome blog using Tailwind
        CSS and vanilla Javascript.
      </p>

      <p class="py-6">
        The basic blog page layout is available and all using the default
        Tailwind CSS classes (although there are a few hardcoded style tags). If
        you are going to use this in your project, you will want to convert the
        classes into components.
      </p>

      <h1 class="py-2 font-sans">Heading 1</h1>
      <h2 class="py-2 font-sans">Heading 2</h2>
      <h3 class="py-2 font-sans">Heading 3</h3>
      <h4 class="py-2 font-sans">Heading 4</h4>
      <h5 class="py-2 font-sans">Heading 5</h5>
      <h6 class="py-2 font-sans">Heading 6</h6>

      <p class="py-6">
        Sed dignissim lectus ut tincidunt vulputate. Fusce tincidunt lacus
        purus, in mattis tortor sollicitudin pretium. Phasellus at diam posuere,
        scelerisque nisl sit amet, tincidunt urna. Cras nisi diam, pulvinar ut
        molestie eget, eleifend ac magna. Sed at lorem condimentum, dignissim
        lorem eu, blandit massa. Phasellus eleifend turpis vel erat bibendum
        scelerisque. Maecenas id risus dictum, rhoncus odio vitae, maximus
        purus. Etiam efficitur dolor in dolor molestie ornare. Aenean pulvinar
        diam nec neque tincidunt, vitae molestie quam fermentum. Donec ac
        pretium diam. Suspendisse sed odio risus. Nunc nec luctus nisi. Class
        aptent taciti sociosqu ad litora torquent per conubia nostra, per
        inceptos himenaeos. Duis nec nulla eget sem dictum elementum.
      </p>

      <ol>
        <li class="py-3">
          Maecenas accumsan lacus sit amet elementum porta. Aliquam eu libero
          lectus. Fusce vehicula dictum mi. In non dolor at sem ullamcorper
          venenatis ut sed dui. Ut ut est quam. Suspendisse quam quam, commodo
          sit amet placerat in, interdum a ipsum. Morbi sit amet tellus
          scelerisque tortor semper posuere.
        </li>
        <li class="py-3">
          Morbi varius posuere blandit. Praesent gravida bibendum neque eget
          commodo. Duis auctor ornare mauris, eu accumsan odio viverra in. Proin
          sagittis maximus pharetra. Nullam lorem mauris, faucibus ut odio
          tempus, ultrices aliquet ex. Nam id quam eget ipsum luctus hendrerit.
          Ut eros magna, eleifend ac ornare vulputate, pretium nec felis.
        </li>
        <li class="py-3">
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
          posuere cubilia Curae; Nunc vitae pretium elit. Cras leo mauris,
          tristique in risus ac, tristique rutrum velit. Mauris accumsan tempor
          felis vitae gravida. Cras egestas convallis malesuada. Etiam ac ante
          id tortor vulputate pretium. Maecenas vel sapien suscipit, elementum
          odio et, consequat tellus.
        </li>
      </ol>

      <blockquote class="border-l-4 border-green-500 italic my-8 pl-8 md:pl-12">
        Example of blockquote - Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Aliquam at ipsum eu nunc commodo posuere et sit amet
        ligula.
      </blockquote>

      <p class="py-6">Example code block:</p>

      <!--/ Post Content-->
    </div>

    <!--Tags -->

    <!--/Next & Prev Links-->
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  useContext,
  useRoute,
  ref,
  useFetch,
  computed,
} from '@nuxtjs/composition-api'
import { format } from 'date-fns'

export default defineComponent({
  setup() {
    const route = useRoute()
    const { $axios } = useContext()
    const state = ref({ page: {} as any, blocks: [] })

    useFetch(async () => {
      state.value = await $axios
        .$get('/get-article', {
          params: { articleId: route.value.params.pageId },
        })
        .then((res) => ({
          blocks: res.blocks.results,
          page: res.page,
        }))
    })

    const title = computed(
      () => state.value.page?.properties?.Name?.title?.[0]?.plain_text ?? ''
    )

    const date = computed(
      () =>
        (state.value.page?.created_time &&
          format(new Date(state.value.page?.created_time), 'PP')) ||
        ''
    )

    const cover = computed(() => state.value.page?.cover?.external?.url)

    return { title, state, date, cover }
  },
})
</script>
