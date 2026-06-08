import { supabase } from "@/utils/supabase";

export async function GET() {
  try {
    const { error, count: geoRequests } = await supabase
      .from("geo_api_visitor")
      .select("host_url", { count: "exact" });

    if (error) {
      return Response.json({
        message: "Error al requerir datos: " + error.message,
      });
    }

    const { data: neoWifiUsers } = await supabase
      .from("neo_wifi_visitors")
      .select("id")
      .limit(1)
      .order("created_at", { ascending: false });

    const { data: downloadCount } = await supabase
      .from("downloads")
      .select("download_count")
      .limit(1)
      .order("created_at", { ascending: false });

    const { data: apkDownloadsCount } = await supabase
      .from("apk_downloads")
      .select("id")
      .order("created_at", { ascending: false })
      .limit(1);

    return Response.json({
      geoRequests,
      neoWifiUsers: neoWifiUsers?.[0].id,
      downloadCount: downloadCount?.[0].download_count,
      apkDownloadsCount: apkDownloadsCount?.[0].id
    });
  } catch (error) {
    return Response.json({ message: "Error", error });
  }
}
