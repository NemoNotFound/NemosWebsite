import type { APIEvent } from "@solidjs/start/server";
import { GET as IndexGET, CFMod } from ".";
import { floorToSignificantDigits } from "~/util/maths";
import { headers } from "~/util/default-headers";

export const GET = async ({ params }: APIEvent) => {
  const mod: CFMod = await IndexGET({ params } as APIEvent).then((res) => {
    if (res.ok) return res.json();
  });

  const downloads = floorToSignificantDigits(mod.downloads, 3).toLocaleString(
    "en-US",
    {
      notation: "compact",
      compactDisplay: "short",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }
  );

  return new Response(JSON.stringify(downloads), {
    status: 200,
    headers: headers(),
  });
};
