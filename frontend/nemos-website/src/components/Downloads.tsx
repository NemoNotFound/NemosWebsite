export default function Downloads({title, downloadLink, downloads}: { title: string, downloadLink: string, downloads: string }) {
    const imagePath = `/${title.toLowerCase()}.svg`

    return (
        <div className="flex items-center gap-2">
            <a href={downloadLink} target="_blank" rel="noopener noreferrer">
                <img className="minecraft-platform-icon w-6 h-6" alt={title} src={imagePath}/>
            </a>
            <p>{downloads}</p>
        </div>
    )
}