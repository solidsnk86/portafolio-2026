import { supabase } from "@/utils/supabase";

export async function POST(req: Request) {
  const { from: view } = await req.json();

  try {
    const { data, error } = await supabase
      .from("solidsnk_collection")
      .select("id")
      .order("created_at", { ascending: false })
      .limit(1)
      .single();
    if (error) {
      return Response.json({ message: "Error al obtener id", error });
    }
    if (!data) {
      return Response.json({ message: "No hay registros en solidsnk_collection" }, { status: 404 });
    }
    const { error: viewsError } = await supabase
      .from("cv_views")
      .insert([{ visit_id: data.id, from: view }]);

    if (viewsError) return Response.json({ message: viewsError.message });

    return Response.json({}, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "Error en el servidor", error: (error as TypeError).message },
      { status: 500 },
    );
  }
}
