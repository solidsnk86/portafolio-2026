import { NextRequest } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";

export async function GET(req: NextRequest) {
  const name = req.nextUrl.searchParams.get("name");
  if (!name)
    return Response.json(
      { message: "Es necesario el parámetro [name]" },
      { status: 400 },
    );
  try {
    const content = await fs.readFile(
      path.join(process.cwd(), "app", "projects", `${name}.md`),
      { encoding: "utf-8" },
    );
    return Response.json({ decoded: content }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Server " + error }, { status: 500 });
  }
}
