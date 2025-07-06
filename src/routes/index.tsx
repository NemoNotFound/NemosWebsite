import { Component, createEffect, createSignal } from "solid-js";
import { CFMod } from "./api/curseforge/studios/v1/mod/[id]";

const Home: Component = () => {
  const [downloads, setDownloads] = createSignal<string>("0");
  const modId: number = 1148320;

  createEffect(async () => {
    const downloads: string = await fetch(
      `/api/curseforge/studios/v1/mod/${modId}/downloads`
    ).then((res) => {
      if (res.ok) return res.json();
    });

    setDownloads(downloads);
  });

  return (
    <main>
      <div>{downloads()}</div>
    </main>
  );
};

export default Home;
