import { LocationProps } from "@/context/location-context";
import { supabase } from "@/utils/supabase";

export async function POST(req: Request) {
  const { data: location }: Pick<LocationProps, "data"> = await req.json();
  
  try {
    const { error } = await supabase.from("solidsnk_collection").insert([
      {
        ip: location.ip,
        city_name: location.city.name,
        country_name: location.country.name,
        timezone: location.country.timezone,
        so: location.sysInfo.system,
        browser: location.sysInfo.webBrowser.browser,
        version: location.sysInfo.webBrowser.version,
        emoji_flag: location.country.emojiFlag,
        lat: parseFloat(String(location.coords.latitude)),
        lon: parseFloat(String(location.coords.longitude)),
      },
    ]);

    if (error) {
      return Response.json(error.message);
    }

    return Response.json({ message: "Data collected" }, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "Error en el servidor", error, data: location },
      { status: 500 },
    );
  }
}
