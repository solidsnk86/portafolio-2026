import { featuredProjects } from "@/components/projects";

export async function GET() {
  try {
    return Response.json(JSON.stringify(featuredProjects, null, 2));
  } catch (error) {
    return Response.json({ message: `Error: ${(error as TypeError).message}` })
  }
}
