import { supabase } from "@/utils/supabase";

export async function POST(req: Request) {
  try {
    const { messages, cityName: city_name, countryName: country_name, ip } = await req.json();
    
    if (!messages) {
      return Response.json({ message: "No messages" }, { status: 400 });
    }

    const { error } = await supabase
      .from("assistant_history")
      .insert([{ messages, city_name, country_name, ip }]);

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
