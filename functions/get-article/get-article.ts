import { Handler } from '@netlify/functions'
import { Client } from '@notionhq/client'
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

export const handler: Handler = async (event) => {
  const articleId = event.queryStringParameters?.articleId!

  try {
    const article = await notion.blocks.children.list({
      block_id: articleId,
      page_size: 100,
    })

    return {
      statusCode: 200,
      body: JSON.stringify(article),
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e)
    return { statusCode: 500, body: e }
  }
}
