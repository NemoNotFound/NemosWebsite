import type { APIEvent } from "@solidjs/start/server";
import { GET as IndexGET, CFMod } from ".";
import { ftsd } from "~/util/maths";

export const GET = async ({ params }: APIEvent) => {
  const mod: CFMod = await IndexGET({ params } as APIEvent).then((res) => {
    if (res.ok) return res.json();
  });

  const downloads = ftsd(mod.downloads, 3).toLocaleString("en-US", {
    notation: "compact",
    compactDisplay: "short",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  const headers = new Headers();
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Access-Control-Allow-Methods", "GET, PUT, DELETE, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type");

  return new Response(JSON.stringify(downloads), {
    status: 200,
    headers: headers,
  });
};
