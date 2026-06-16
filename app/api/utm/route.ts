import { supabase } from "@/utils/supabase";

export async function POST(req: Request) {
  const source = await req.json();
  const { utm, referer, lastAccessId } = source;

  try {
    const { error } = await supabase
      .from("solidsnk_collection_utm")
      .insert([{ source: utm, referer, solidsnk_collection_id: lastAccessId }]);
    if (error) throw new Error(error.message);
    return Response.json({ message: "Enviado" });
  } catch (error) {
    return Response.json({ message: "Error", error });
  }
}
