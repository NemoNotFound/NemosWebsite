import {floorToSignificantDigits} from "@/util/maths";
import MinecraftProjectCard from "@/components/MinecraftCard";
import {Project} from "@/types/Project";
import NavigationBar from "@/components/NavigationBar";

const projects: Project[] = [
    {
        title: "Nemo's Inventory Sorting",
        slug: "nemos-inventory-sorting",
        imagePath: "png/nemos_inventory_sorting.png",
        curseForgeId: "1148320",
    },
    {
        title: "Nemo's Backpacks",
        slug: "nemos-backpacks",
        imagePath: "png/nemos_backpacks.png",
        curseForgeId: "1344643",
    },
    {
        title: "Nemo's Woodcutter",
        slug: "nemos-woodcutter",
        imagePath: "gif/nemos_woodcutter.gif",
        curseForgeId: "914549",
    },
    {
        title: "Nemo's Blooming Blossom",
        slug: "nemos-blooming-blossom",
        imagePath: "png/nemos_blooming_blossom.png",
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
            <NavigationBar/>
            <div className="page">
                <h1>Minecraft Projects</h1>
                <div className="grid grid-cols-3 gap-5 w-fit mx-auto">
                    {
                        projects.map(project => (
                            <MinecraftProjectCard
                                key={project.slug}
                                title={project.title}
                                slug={project.slug}
                                imagePath={project.imagePath}
                                curseForgeDownloads={curseForgeDownloads[project.curseForgeId]}
                                modrinthDownloads={modrinthDownloads[project.slug]}
                            >
                            </MinecraftProjectCard>
                        ))
                    }
                </div>
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