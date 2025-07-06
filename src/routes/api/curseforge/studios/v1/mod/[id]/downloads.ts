import type { APIEvent } from "@solidjs/start/server";
import { GET as IndexGET, CFMod } from ".";

export const GET = async ({ params }: APIEvent) => {
  const mod: CFMod = await IndexGET({ params } as APIEvent).then((res) => {
    if (res.ok) return res.json();
  });

  /*
    i don't know how this maths works, but i know it does.
  */
  const floor_amount =
    1000 ** Math.floor(mod.downloads.toString().length / 3) / 100;
  const floored_downloads =
    Math.floor(mod.downloads / floor_amount) * floor_amount;

  const downloads = floored_downloads.toLocaleString("en-US", {
    notation: "compact",
    compactDisplay: "short",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  return new Response(JSON.stringify(downloads), { status: 200 });
};
