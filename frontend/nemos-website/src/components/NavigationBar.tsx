import Link from "next/link";
import {curseForgeIcon, discordIcon, githubIcon, kofiIcon, logo, modrinthIcon} from "@/util/svgIcons";

export default function NavigationBar() {
    const iconLinkClassName = "inline-flex h-fit w-fit items-center justify-center";

    return (
        <nav className="flex justify-around p-6 border-b mb-10">
            <div className="flex w-full justify-start items-center">
                <Link className={iconLinkClassName} href="/">
                    {logo()}
                </Link>
            </div>
            <div className="flex gap-10 w-full justify-center items-center">
                <Link className="text-2xl link" href="/">Home</Link>
                <div className="relative group">
                    <Link className="text-2xl" href={"/projects/overview"}>Projects</Link>
                    <div className="absolute hidden group-hover:block border p-2 rounded bg-background">
                        <Link className="block text-2xl" href={"/projects/minecraft-mods/overview"}>Minecraft Projects</Link>
                    </div>
                </div>
                <Link className="text-2xl link" href="https://wiki.nemonotfound.com" target="_blank">Wiki</Link>
                <Link className="text-2xl link" href="/about">About</Link>
                <Link className="text-2xl link" href="/contact">Contact</Link>
            </div>
            <div className="flex gap-5 w-full justify-end items-center">
                <Link className={iconLinkClassName} href="https://github.com/NemoNotFound" target="_blank">
                    {githubIcon()}
                </Link>
                <Link className={iconLinkClassName} href="https://discord.gg/yxs9dga" target="_blank">
                    {discordIcon()}
                </Link>
                <Link className={iconLinkClassName} href="https://ko-fi.nemonotfound.com" target="_blank">
                    {kofiIcon()}
                </Link>
                <Link className={iconLinkClassName} href="https://modrinth.com/user/NemoNotFound" target="_blank">
                    {modrinthIcon()}
                </Link>
                <Link className={iconLinkClassName} href="https://www.curseforge.com/members/nemonotfound/projects" target="_blank">
                    {curseForgeIcon()}
                </Link>
                <button>Display Mode</button>
            </div>
        </nav>
    )
}
