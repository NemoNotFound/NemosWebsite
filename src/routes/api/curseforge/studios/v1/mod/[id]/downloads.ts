import type { APIEvent } from "@solidjs/start/server";
import { CFMod } from "../[id]";

export const GET = async ({ params }: APIEvent) => {
  const modId = Number.parseInt(params.id);
  const mod: CFMod = await fetch(
    `https://devnemo.com/api/curseforge/studios/v1/mod/${modId}`
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
