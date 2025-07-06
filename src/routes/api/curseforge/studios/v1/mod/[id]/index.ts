import type { APIEvent } from "@solidjs/start/server";

export interface CFMod {
  // id: number;
  // name: string;
  // slug: string;
  // summary: string;
  downloads: number;
  // links: {
  //   website: string;
  //   source: string;
  //   issues: string;
  //   wiki: string;
  // };
}

export const GET = async ({ params }: APIEvent) => {
  const modId = Number.parseInt(params.id);
  const apiKey = process.env.CF_API_KEY;

  const response = await fetch(`https://api.curseforge.com/v1/mods/${modId}`, {
    method: "GET",
    headers: {
      "x-api-key": apiKey,
    },
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then((data) => data.data);

  const cf_mod: CFMod = {
    // id: modId || 0,
    // name: response.name || "",
    // slug: response.slug || "",
    // summary: response.summary || "",
    downloads: response.downloadCount || 0,
    // links: {
    //   website: response.links.websiteUrl || "",
    //   source: response.links.sourceUrl || "",
    //   issues: response.links.issuesUrl || "",
    //   wiki: response.links.wikiUrl || "",
    // },
  };

  const headers = new Headers();
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Access-Control-Allow-Methods", "GET, PUT, DELETE, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type");

  return new Response(JSON.stringify(cf_mod), { headers });
};
