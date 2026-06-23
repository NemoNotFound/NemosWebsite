import {curseForgeIcon, modrinthIcon} from "@/util/svgIcons";

export function CurseForgeDownloads({downloadLink, downloads}: {downloadLink: string, downloads: string}) {
    return (
        <div className="flex items-center gap-2">
            <a href={downloadLink} target="_blank" rel="noopener noreferrer">
                {curseForgeIcon()}
            </a>
            <p className="font-bold">{downloads}</p>
        </div>
    )
}

export function ModrinthDownloads({downloadLink, downloads}: {downloadLink: string, downloads: string}) {
    return (
        <div className="flex items-center gap-2">
            <a href={downloadLink} target="_blank" rel="noopener noreferrer">
                {modrinthIcon()}
            </a>
            <p className="font-bold">{downloads}</p>
        </div>
    )
}