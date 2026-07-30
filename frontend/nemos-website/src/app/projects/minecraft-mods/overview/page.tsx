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
    },
    {
        title: "Nemo's Creatures",
        slug: "nemos-creatures",
        imagePath: "png/nemos_creatures.png",
        curseForgeId: "936231"
    },
    {
        title: "Nemo's Night Progression",
        slug: "nemos-night-progression",
        imagePath: "png/nemos_night_progression.png",
        curseForgeId: "1294916"
    },
    {
        title: "Nemo's Enchantments",
        slug: "nemos-enchantments",
        imagePath: "png/nemos_enchantments.png",
        curseForgeId: "1088345"
    },
    {
        title: "Nemo's Vertical Slabs",
        slug: "nemos-vertical-slabs",
        imagePath: "png/nemos_vertical_slabs.png",
        curseForgeId: "1095780",
    },
    {
        title: "Nemo's Upgrade Templates",
        slug: "nemos-upgrade-templates",
        imagePath: "png/nemos_upgrade_templates.png",
        curseForgeId: "1483085",
    },
    {
        title: "Nemo's Campfires",
        slug: "nemos-campfires",
        imagePath: "png/nemos_campfires.png",
        curseForgeId: "1105740"
    },
    {
        title: "Nemo's Mending",
        slug: "nemos-mending",
        imagePath: "png/nemos_mending.png",
        curseForgeId: "988402"
    },
    {
        title: "Nemo's Mossy Blocks",
        slug: "nemos-mossy-blocks",
        imagePath: "png/nemos_mossy_blocks.png",
        curseForgeId: "1008561"
    },
    {
        title: "Nemo's Progression",
        slug: "nemos-progression",
        imagePath: "png/nemos_progression.png",
        curseForgeId: "1523924",
    },
    {
        title: "Nemo's Firework Keybinding",
        slug: "nemos-firework-keybinding",
        imagePath: "png/nemos_firework_keybinding.png",
        curseForgeId: "1058074",
    },
    {
        title: "Nemo's Paintings",
        slug: "nemos-paintings",
        imagePath: "png/nemos_paintings.png",
        curseForgeId: "1085016",
    },
    {
        title: "Nemo's Quartz",
        slug: "nemos-quartz",
        imagePath: "png/nemos_quartz.png",
        curseForgeId: "1389652",
    }
]

const abandonedProjects: Project[] = [
    {
        title: "Nemo's Carpentry",
        slug: "nemos-carpentry",
        imagePath: "png/nemos_carpentry.png",
        curseForgeId: "928372"
    },
    {
        title: "Nemo's Farming",
        slug: "nemos-farming",
        imagePath: "png/nemos_farming.png",
        curseForgeId: "1076299"
    },
    {
        title: "Nemo's Ambience",
        slug: "nemos-ambience",
        imagePath: "png/nemos_ambience.png",
        curseForgeId: "917245",
    },
    {
        title: "Nemo's Mossy Vertical Slabs",
        slug: "nemos-mossy-vertical-slabs",
        imagePath: "png/nemos_mossy_vertical_slabs.png",
        curseForgeId: "1113090",
    },
    {
        title: "Nemo's Copper",
        slug: "nemos-copper",
        imagePath: "png/nemos_copper.png",
        curseForgeId: "1143923",
    },
    {
        title: "Nemo's Tags",
        slug: "nemos-tags",
        imagePath: "png/nemos_tags.png",
        curseForgeId: "1251621",
    },
]

export default async function Overview() {
    const allProjects = [...projects, ...abandonedProjects];

    const curseForgeDownloads = await fetchDownloadsMap(
        allProjects,
        (project: Project) => project.curseForgeId,
        (project: Project) => fetchCurseForgeDownloads(project.curseForgeId)
    );

    const modrinthDownloads = await fetchDownloadsMap(
        allProjects,
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

                <h2 className="abandoned-projects-title">Abandoned Projects</h2>
                <div className="abandoned-projects grid grid-cols-3 gap-5 w-fit mx-auto">
                    {
                        abandonedProjects.map(project => (
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

async function fetchDownloadsMap(projectList: Project[], keyFunction: (project: Project) => string, fetchFunction: (project: Project) => Promise<number>) {
    const downloadsArray = await Promise.all(
        projectList.map(async (project) => {
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
