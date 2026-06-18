import { supabase } from "@/utils/supabase";

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    
    if (!payload) {
      return Response.json({ message: "Falta payload" }, { status: 400 });
    }

    const { error } = await supabase
      .from("solidsnk_collection_events")
      .insert([payload]);

    if (error) {
      throw new Error(error.message);
    }

    return Response.json({ message: "Evento guardado" }, { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return Response.json(
      { message: "Server error: " + errorMessage },
      { status: 500 }
    );
  }
}
