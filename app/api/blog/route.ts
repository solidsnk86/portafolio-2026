import { promises as fs } from "node:fs";
import path from "node:path";

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function GET() {
  try {
    const files = await fs.readdir(path.join(process.cwd(), "app", "blogs"));
    const blogArray = [];

    while (true) {
      for (const file of files) {
        const allBlogContent = await fs.readFile(
          path.join(process.cwd(), "app", "blogs", file),
          { encoding: "utf-8" },
        );

        if (allBlogContent) {
          const titles = allBlogContent.split(/\r?\n/)[2].replace("#", "");
          const dates = allBlogContent.split(/\r?\n/)[0];
          const fileName = file.replace(".md", "");
          const url = allBlogContent
            .split(/\r?\n/)
            .find(
              (txt) =>
                txt.includes("(https://") &&
                !txt.includes("https://raw.githubusercontent.com"),
            );
          const result = url?.replace(/\[(https?:\/\/[^\]\s]+)\]/g, "") || "";
          blogArray.push({
            name: fileName,
            title: titles,
            date: dates,
            author: "Gabriel Calcagni",
            url:
              result && result.split(" ").length > 2
                ? result?.split(" ").slice(2).join("").replace(/[\[\]\(\)]/g, "").replace("Blog", "").replace("Tienda", "")
                : result?.split(" ").slice(1).join("").replace(/[\[\]\(\)]/g, "").replace("Blog", "").replace("Tienda", ""),
          });
        }
      }

      return Response.json({ blog: blogArray });
    }
  } catch (error) {
    return Response.json({ message: "Server " + error }, { status: 500 });
  }
}
