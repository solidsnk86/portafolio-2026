import { BlogClient } from "../blog-client";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const blogName = (await params)?.name;

  return (
    <section>
      <BlogClient blog={blogName} />
    </section>
  );
}
