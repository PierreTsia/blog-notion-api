import { Handler } from '@netlify/functions'
import { Client } from '@notionhq/client'

const ARTICLES_DB_ID = process.env.ARTICLES_DB_ID as string

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

export const handler: Handler = async (event) => {
  const filter = event.queryStringParameters?.filter
  // eslint-disable-next-line camelcase
  const notionQuery: { database_id: string; filter?: any } = {
    database_id: ARTICLES_DB_ID,
    ...(filter && {
      filter: JSON.parse(event.queryStringParameters?.filter as string),
    }),
  }

  try {
    const myPage = await notion.databases.query(notionQuery)

    return {
      statusCode: 200,
      body: JSON.stringify(myPage),
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e)
    return { statusCode: 500, body: e }
  }
}
