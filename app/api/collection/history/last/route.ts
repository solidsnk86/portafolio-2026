import { supabase } from "@/utils/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("assistant_history")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1)
      .single()
  

    if (error) {
      throw new Error(error.message);
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
