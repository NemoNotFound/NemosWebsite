import {curseForgeIcon, modrinthIcon} from "@/util/svgIcons";

export default function Downloads({title, downloadLink, downloads}: { title: string, downloadLink: string, downloads: string }) {
    const imagePath = `/${title.toLowerCase()}.svg`

    return (
        <div className="flex items-center gap-2">
            <a href={downloadLink} target="_blank" rel="noopener noreferrer">
                <img className="scaling w-6 h-6" alt={title} src={imagePath}/>
            </a>
            <p>{downloads}</p>
        </div>
    )
}

export function CurseForgeDownloads({downloadLink, downloads}: {downloadLink: string, downloads: string}) {
    return (
        <div className="flex items-center gap-2">
            <a href={downloadLink} target="_blank" rel="noopener noreferrer">
                {curseForgeIcon()}
            </a>
            <p>{downloads}</p>
        </div>
    )
}

export function ModrinthDownloads({downloadLink, downloads}: {downloadLink: string, downloads: string}) {
    return (
        <div className="flex items-center gap-2">
            <a href={downloadLink} target="_blank" rel="noopener noreferrer">
                {modrinthIcon()}
            </a>
            <p>{downloads}</p>
        </div>
    )
}