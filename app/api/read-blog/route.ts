import { NextRequest } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";

export async function GET(req: NextRequest) {
  const name = req.nextUrl.searchParams.get("name");
  if (!name)
    return Response.json(
      { message: "Es necesario el parámetro [name]" },
      { status: 400 }
    );
  try {
    const blogContent = await fs.readFile(
      path.join(process.cwd(), "app", "blogs", `${name}.md`),
      { encoding: "utf-8" }
    );
    const blogTitle = blogContent.split("\r")[0];
    
    return Response.json({ blogTitle, blogContent }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Server " + error }, { status: 500 });
  }
}
