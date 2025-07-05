import { Component } from "solid-js";

const Home: Component = () => {
  return (
    <main>
      <div>{process.env.TEST}</div>
    </main>
  );
};

export default Home;
