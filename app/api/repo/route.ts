import { NextRequest } from "next/server";

const GITHUB_OWNER = process.env.GITHUB_OWNER ?? "solidsnk86";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export async function GET(req: NextRequest) {
  const repo = req.nextUrl.searchParams.get("name");

  if (!repo)
    return Response.json(
      { message: "Es necesario el parámetro [name]" },
      { status: 400 }
    );

  try {
    const [readmeResponse, repoData] = await Promise.all([
      fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${repo}/readme`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
        },
      }),
      fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${repo}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
        },
      }),
    ]);

    if (!readmeResponse.ok) throw new Error(readmeResponse.statusText);
    if (!repoData.ok) throw new Error(repoData.statusText);

    const readme = await readmeResponse.json();
    const data = await repoData.json();

    const decoded = Buffer.from(readme.content, "base64").toString("utf-8");

    return Response.json({ data, decoded }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Server " + error }, { status: 500 });
  }
}
