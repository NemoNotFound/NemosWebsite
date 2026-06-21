import Link from "next/link";
import {curseForgeIcon, kofiIcon, modrinthIcon} from "@/util/svgIcons";

export default function NavigationBar() {
    return (
        <nav className="flex justify-around p-6 border-b">
            <div className="w-full justify-start">
                <Link href="/">
                    <img alt="Homepage"/>
                </Link>
            </div>
            <div className="flex gap-10 w-full justify-center">
                <Link className="nav-link" href="/">Home</Link>
                <div className="relative group">
                    <button>
                        Projects
                    </button>
                    <div className="absolute hidden group-hover:block border p-2 rounded bg-background">
                        <Link className="block nav-link" href={"/minecraft-mods/overview"}>Minecraft Projects</Link>
                    </div>
                </div>
                <Link className="nav-link" href="https://wiki.nemonotfound.com" target="_blank">Wiki</Link>
                <a className="nav-link">About</a>
                <a className="nav-link">Contact</a>
            </div>
            <div className="flex gap-5 w-full justify-end">
                <Link href="https://github.com/NemoNotFound" target="_blank">
                    <img alt="GitHub"/>
                </Link>
                <Link href="https://discord.gg/yxs9dga" target="_blank">
                    <img alt="Discord"/>
                </Link>
                <Link href="https://ko-fi.nemonotfound.com" target="_blank">
                    {kofiIcon()}
                </Link>
                <Link href="https://modrinth.com/user/NemoNotFound" target="_blank">
                    {modrinthIcon()}
                </Link>
                <Link href="https://www.curseforge.com/members/nemonotfound/projects" target="_blank">
                    {curseForgeIcon()}
                </Link>
                <button>Display Mode</button>
            </div>
        </nav>
    )
}