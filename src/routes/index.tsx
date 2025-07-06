import { Component, createEffect, createSignal } from "solid-js";
import { CFMod } from "./api/curseforge/studios/v1/mod/[id]";

const Home: Component = () => {
  const [downloads, setDownloads] = createSignal<number>(0);
  const modId: number = 1148320;

  createEffect(async () => {
    const mod: CFMod = await fetch(
      `/api/curseforge/studios/v1/mod/${modId}`
    ).then((res) => {
      if (res.ok) return res.json();
    });

    setDownloads(mod.downloads);
  });

  return (
    <main>
      <div>
        {downloads().toLocaleString("en-US", {
          notation: "compact",
          compactDisplay: "short",
          minimumFractionDigits: 1,
          maximumFractionDigits: 1,
        })}
      </div>
    </main>
  );
};

export default Home;
