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
    const query2 = await notion.databases.retrieve({
      database_id: notionDatabaseId,
    });
    //@ts-ignore
    const brands = query2.properties.brand.select.options.map(
      (item: any) => item.name
    );
    return NextResponse.json({
      data: brands,
    });
  } catch (error) {
    return NextResponse.json({
      error: error,
    });
  }
}
