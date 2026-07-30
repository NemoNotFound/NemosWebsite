import {CurseForgeDownloads, ModrinthDownloads} from "@/components/Downloads";

export default function MinecraftProjectCard(
    {
        title,
        slug,
        imagePath,
        curseForgeDownloads,
        modrinthDownloads
    }: {
        title: string;
        slug: string;
        imagePath: string,
        curseForgeDownloads: string,
        modrinthDownloads: string
    }
) {
    const projectIcon = `https://github.com/NemoNotFound/NemoNotFound/blob/master/resources/minecraft_projects/icons/${imagePath}?raw=true`;
    const wikiLink = `https://wiki.nemonotfound.com/projects/minecraft-mods/${slug}/general`;
    const curseForgeDownloadLink = `https://www.curseforge.com/minecraft/mc-mods/${slug}`;
    const modrinthDownloadLink = `https://modrinth.com/mod/${slug}`;

    return (
        <div className="minecraft-project-card">
            <div className="minecraft-project-card-component mb-4 text-center">
                <h2 className="font-bold">{title}</h2>
            </div>

            <div className={"minecraft-project-card-component minecraft-project-image flex justify-center mb-4"}>
                <div className="h-full w-full">
                    <img alt={title}
                         className="block h-full w-full object-cover"
                         src={projectIcon}/>
                </div>
            </div>

            <div className="minecraft-project-card-component">
                <div className="flex justify-evenly mb-4">
                    <CurseForgeDownloads downloadLink={curseForgeDownloadLink}
                                         downloads={curseForgeDownloads}></CurseForgeDownloads>
                    <ModrinthDownloads downloadLink={modrinthDownloadLink}
                                       downloads={modrinthDownloads}></ModrinthDownloads>
                </div>

                <div className="read-more-button">
                    <a className="w-full h-full flex justify-center p-2 font-bold" href={wikiLink} target="_blank"
                       rel="noopener noreferrer">
                        Read More
                    </a>
                </div>
            </div>
        </div>
    )
}
