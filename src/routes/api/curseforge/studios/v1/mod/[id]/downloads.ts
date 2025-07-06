import type { APIEvent } from "@solidjs/start/server";
import { GET as IndexGET, CFMod } from ".";

export const GET = async ({ params }: APIEvent) => {
  const mod: CFMod = await IndexGET({ params } as APIEvent).then((res) => {
    if (res.ok) return res.json();
  });

  const headers = new Headers();
  headers.set("Access-Control-Allow-Origin", "*");
  //headers.set('Access-Control-Allow-Methods', 'GE')
  headers.set("Access-Control-Allow-Headers", "Content-Type");

  const downloads = mod.downloads.toLocaleString("en-US", {
    notation: "compact",
    compactDisplay: "short",
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  });

  return new Response(JSON.stringify(downloads));
};
