import type { APIEvent } from "@solidjs/start/server";
import { CFMod } from ".";

export const GET = async ({ params }: APIEvent) => {
  const modId = Number.parseInt(params.id);
  const mod: CFMod = await fetch(
    `https://devnemo.com/api/curseforge/studios/v1/mod/${modId}`
  ).then((res) => {
    if (res.ok) return res.json();
  });

  return mod.downloads.toLocaleString("en-US", {
    notation: "compact",
    compactDisplay: "short",
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  });
};
