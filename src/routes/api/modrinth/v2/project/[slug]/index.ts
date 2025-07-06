import type { APIEvent } from "@solidjs/start/server";

export interface ModrinthProject {
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
  const response = await fetch(
    `https://api.modrinth.com/v2/project/${params.slug}`,
    {
      method: "GET",
    }
  ).then((res) => {
    if (res.ok) return res.json();
  });

  const modrinthProject: ModrinthProject = {
    // id: modId || 0,
    // name: response.name || "",
    // slug: response.slug || "",
    // summary: response.summary || "",
    downloads: response.downloads || 0,
    // links: {
    //   website: response.links.websiteUrl || "",
    //   source: response.links.sourceUrl || "",
    //   issues: response.links.issuesUrl || "",
    //   wiki: response.links.wikiUrl || "",
    // },
  };

  return new Response(JSON.stringify(modrinthProject), { status: 200 });
};
