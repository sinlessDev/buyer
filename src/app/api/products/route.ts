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
      image:
        "https://prod-files-secure.s3.us-west-2.amazonaws.com/fbaa6ef9-ee58-40dc-849c-dab40581e35b/c53135af-36d3-48df-a060-62cc2ac72d18/A6MPS001-hero.webp?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20231224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20231224T194515Z&X-Amz-Expires=3600&X-Amz-Signature=7dbb0d554e8db88c4285d787f7e2a5d47a0f3045e32879fe7edba53017922b06&X-Amz-SignedHeaders=host&x-id=GetObject",
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
