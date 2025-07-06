import type { APIEvent } from "@solidjs/start/server";
import { CFMod } from "../[id]";

export const GET = async ({ params }: APIEvent) => {
  const mod: CFMod = await fetch(
    `/api/curseforge/studios/v1/mod/${params.id}`
  ).then((response) => {
    if (response.ok) return response.json();
  });

  return mod.downloads.toLocaleString("en-US", {
    notation: "compact",
    compactDisplay: "short",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
};
