import { Client } from "@notionhq/client";
import { NextResponse } from "next/server";

const notionSecret = process.env.NOTION_SECRET!;
const notionDatabaseId = process.env.NOTION_DATABASE_ID!;

if (!notionSecret || !notionDatabaseId) {
  throw new Error("Missing Notion secret or database ID.");
}

const notion = new Client({ auth: notionSecret });

export async function GET() {
  try {
    const query = await notion.databases.query({
      database_id: notionDatabaseId,
    });
    //@ts-ignore
    const rows = query.results.map((res) => res.properties);
    const rowStructured = rows.map((row) => ({
      title: row.Title.title[0].text.content,
      brand: row.Brand.multi_select[0].name,
      desctiption: row.Description.rich_text[0].text.content,
      link: row.Link.rich_text[0].text.content,
      image: row.Image.files[0].file.url,
      price: row.Price.number,
    }));

    return NextResponse.json({
      data: rowStructured,
    });
  } catch (error) {
    return NextResponse.json({
      error: error,
    });
  }
}
