import { supabase } from "@/utils/supabase";

export async function POST(req: Request) {
  try {
    const { userId: user_id, messages } = await req.json();
    
    if (!user_id) {
      return Response.json({ message: "Falta userId" }, { status: 400 });
    }

    const { error } = await supabase
      .from("assistant_history")
      .insert([{ user_id, messages }]);

    if (error) {
      throw new Error(error.message);
    }

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return Response.json(
      { message: "Server error: " + errorMessage, success: false },
      { status: 500 }
    );
  }
}
