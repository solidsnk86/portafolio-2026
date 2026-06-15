import { supabase } from "@/utils/supabase";

export async function POST(req: Request) {
  const source = await req.json();
  const { utm, referer } = source;
  try {
    const { error } = await supabase
      .from("solidsnk_collection_utm")
      .insert([{ source: utm, referer }]);
    if (error) throw new Error(error.message);
    return Response.json({ message: "Enviado" });
  } catch (error) {
    return Response.json({ message: "Error", error });
  }
}
