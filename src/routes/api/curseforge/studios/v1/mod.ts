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
  return {};
};
