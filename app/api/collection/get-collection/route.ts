import { supabase } from "@/utils/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("solidsnk_collection")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1)
      .single();
    if (error) throw new Error(error.message);
    return Response.json({ data }, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "Error en el servidor", error, data: location },
      { status: 500 },
    );
  }
}
