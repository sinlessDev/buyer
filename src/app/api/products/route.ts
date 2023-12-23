import { Client } from "@notionhq/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

const notionSecret = process.env.NOTION_SECRET!;
const notionDatabaseId = process.env.NOTION_DATABASE_ID!;

if (!notionSecret || !notionDatabaseId) {
  throw new Error("Missing Notion secret or database ID.");
}

const notion = new Client({ auth: notionSecret });

// Named export for the GET method
export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const query = await notion.databases.query({
      database_id: notionDatabaseId,
    });

    const rows = query.results.map((res) => res.properties);
    const rowStructured = rows.map((row) => ({
      title: row.Title.title[0].text.content,
      brand: row.Brand.multi_select[0].name,
      desctiption: row.Description.rich_text[0].text.content,
      link: row.Link.rich_text[0].text.content,
      image: row.Image.files[0].file.url,
      price: row.Price.number,
    }));

    console.log(rowStructured);

    return NextResponse.json({
      data: rowStructured,
    });
    // res.status(200).json({ name: "John Doe" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
