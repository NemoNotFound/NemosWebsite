export type CFMod = {
  id: number;
  name: string;
  slug: string;
  summary: string;
  downloads: number;
  links: {
    website: string;
    source: string;
    issues: string;
    wiki: string;
  };
};

export const GET = async () => {
    const modId = 1;
    const apiKey = process.env.CF_API_KEY;

    try {
        const response = await fetch('https://api.curseforge.com/v1/mods/${modId}', {
            method: 'GET'
            headers: {
                'x-api-key', apiKey,
                'Accept': 'application/json'
                }
            });

        const json = await respone.json();

        return new Response(JSON.stringify(json.data.downloadCount), {
            status: 200,
             headers: {
                    'Content-Type': 'application/json'
                  }
            });
        } catch (e) {

            return new Response('Internal Server Error', { status: 500 });
            }
};
