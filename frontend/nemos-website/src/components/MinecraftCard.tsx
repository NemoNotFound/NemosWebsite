import Downloads from "@/components/Downloads";

export default function MinecraftProjectCard({
                                                 title,
                                                 slug,
                                                 imagePath,
                                                 description,
                                                 curseForgeDownloads,
                                                 modrinthDownloads
                                             }: {
    title: string;
    slug: string;
    imagePath: string,
    description: string,
    curseForgeDownloads: string,
    modrinthDownloads: string
}) {
    const projectIcon = `https://github.com/NemoNotFound/NemoNotFound/blob/master/resources/minecraft_projects/icons/${imagePath}?raw=true`;
    const wikiLink = `https://wiki.nemonotfound.com/projects/minecraft-mods/${slug}/general`;
    const curseForgeDownloadLink = `https://www.curseforge.com/minecraft/mc-mods/${slug}`;
    const modrinthDownloadLink = `https://modrinth.com/mod/${slug}`;

    return (
        <div className="minecraft-project-card">
            <div className={"flex justify-center mb-2"}>
                <div className="w-64 h-64 bg-secondary border-2 border-black rounded-xl">
                    <img alt={title}
                         src={projectIcon}/>
                </div>
            </div>

            <div className={"mb-6"}>
                <h1>{title}</h1>
                <p>{description}</p>
            </div>

            <div className="flex justify-evenly mb-4">
                <Downloads title="CurseForge" downloadLink={curseForgeDownloadLink} downloads={curseForgeDownloads}></Downloads>
                <Downloads title="Modrinth" downloadLink={modrinthDownloadLink} downloads={modrinthDownloads}></Downloads>
            </div>

            <div className="read-more-button bg-accent text-center">
                <a className="w-full h-full flex justify-center p-2" href={wikiLink} target="_blank" rel="noopener noreferrer">
                    Read More
                </a>
            </div>
        </div>
    )
}