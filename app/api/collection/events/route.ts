import { supabase } from "@/utils/supabase";

export async function POST(req: Request) {
  const payload = await req.json();
  if (!payload)
    return Response.json({ message: "Falta payload" }, { status: 400 });
  try {
    const { error } = await supabase
      .from("solidsnk_collection_events")
      .insert([payload]);
    if (error) throw new Error(error.message);
    return Response.json({}, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Server error: " + (error as TypeError).message }, { status: 500 });
  }
}
