import { featuredProjects } from "@/components/projects";

export async function GET() {
  try {
    return Response.json(featuredProjects);
  } catch (error) {
    return Response.json({ message: `Error: ${(error as TypeError).message}` })
  }
}
