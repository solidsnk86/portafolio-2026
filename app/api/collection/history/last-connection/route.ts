import { supabase } from "@/utils/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("assistant_history")
      .select("id, created_at")
      .order("created_at", { ascending: false })
      .limit(1)
      .single()
  

    if (error) {
      throw new Error(error.message);
    }

    if (!data) {
      return Response.json({ success: true, message: "No hay datos" })
    }

    return Response.json({ success: true, data }, { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return Response.json(
      { message: "Server error: " + errorMessage, success: false },
      { status: 500 }
    );
  }
}
