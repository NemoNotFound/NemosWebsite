import Link from "next/link";
import {floorToSignificantDigits} from "@/util/maths";
import MinecraftProjectCard from "@/components/MinecraftCard";
import {Project} from "@/types/Project";

const projects: Project[] = [
    {
        title: "Nemo's Inventory Sorting",
        slug: "nemos-inventory-sorting",
        imagePath: "png/nemos_inventory_sorting.png",
        description: "Automatically sort your inventory with just a button!",
        curseForgeId: "1148320",
    },
    {
        title: "Nemo's Backpacks",
        slug: "nemos-backpacks",
        imagePath: "png/nemos_backpacks.png",
        description: "Add colorful backpacks to Minecraft!",
        curseForgeId: "1344643",
    },
    {
        title: "Nemo's Woodcutter",
        slug: "nemos-woodcutter",
        imagePath: "gif/nemos_woodcutter.gif",
        description: "Just like a Stonecutter, but for wood!",
        curseForgeId: "914549",
    },
    {
        title: "Nemo's Blooming Blossom",
        slug: "nemos-blooming-blossom",
        imagePath: "png/nemos_blooming_blossom.png",
        description: "Generate pink petals when spawning a cherry tree!",
        curseForgeId: "907318",
    }
]

export default async function Overview() {
    const curseForgeDownloads = await fetchDownloadsMap(
        (project: Project) => project.curseForgeId,
        (project: Project) => fetchCurseForgeDownloads(project.curseForgeId)
    );

    const modrinthDownloads = await fetchDownloadsMap(
        (project: Project) => project.slug,
        (project: Project) => fetchModrinthDownloads((project.slug)),
    );

    //TODO: Add projects with downloads

    return (
        <>
            <nav className="flex justify-between items-center p-6 border-b">
                <div>
                    <Link href="/">
                        <img alt="Homepage"/>
                    </Link>
                </div>
                <div className="flex gap-10">
                    <div className="relative group">
                        <button>
                            Projects
                        </button>
                        <div className="absolute hidden group-hover:block border p-2 rounded bg-background">
                            <a className="block nav-link">Minecraft Projects</a>
                        </div>
                    </div>
                    <a className="nav-link">About</a>
                    <a className="nav-link">Contact</a>
                </div>
            </nav>
            <div>
                {
                    projects.map(project => (
                        <MinecraftProjectCard key={project.slug} title={project.title} slug={project.slug}
                                              imagePath={project.imagePath} description={project.description}
                                              curseForgeDownloads={curseForgeDownloads[project.curseForgeId]}
                                              modrinthDownloads={modrinthDownloads[project.slug]}>
                        </MinecraftProjectCard>
                    ))
                }
            </div>
        </>
    )
}

async function fetchDownloadsMap(keyFunction: (project: Project) => string, fetchFunction: (project: Project) => Promise<number>) {
    const downloadsArray = await Promise.all(
        projects.map(async (project) => {
            const downloads = await fetchFunction(project);

            function formatDownloads() {
                return floorToSignificantDigits(downloads, 3).toLocaleString(
                    "en-US",
                    {
                        notation: "compact",
                        compactDisplay: "short",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2,
                    }
                );
            }

            return {[keyFunction(project)]: formatDownloads()};
        })
    );

    return downloadsArray.reduce(
        (accumulator, currentValue) => ({...accumulator, ...currentValue}),
        {}
    );
}

//TODO: Change url
async function fetchCurseForgeDownloads(curseForgeId: string): Promise<number> {
    return fetchDownloads(`https://devnemo.com/api/curseforge/studios/v1/mod/${curseForgeId}`)
}

//TODO: Change url
async function fetchModrinthDownloads(slug: string): Promise<number> {
    return fetchDownloads(`https://devnemo.com/api/modrinth/v2/project/${slug}`)
}

async function fetchDownloads(url: string) {
    const response = await fetch(url, {cache: "force-cache"});
    const data = await response.json();

    return data.downloads
}