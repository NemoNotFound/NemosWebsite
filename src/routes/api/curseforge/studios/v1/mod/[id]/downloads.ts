import type { APIEvent } from "@solidjs/start/server";
import { GET as IndexGET, CFMod } from ".";

export const GET = async ({ params }: APIEvent) => {
  const modId = Number.parseInt(params.id);
  const mod: CFMod = await IndexGET({ params } as APIEvent).then((res) => {
    if (res.ok) return res.json();
  });

  return mod.downloads.toLocaleString("en-US", {
    notation: "compact",
    compactDisplay: "short",
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  });
};
