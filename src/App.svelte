<script lang="ts">
  import { onMount } from "svelte";
  import Year from "./lib/Year.svelte";
  import { Year2023 } from "./years";

  onMount(() => {
    if (location.hash) {
      setTimeout(() => {
        document
          .getElementById(location.hash.replace("#", ""))
          ?.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
      }, 250);
    }
  });
</script>

<main>
  <img class="h-[128px] w-fit" alt="Logo" src={`${import.meta.env.BASE_URL}/favicon.png`} />

  <a href="/"><h1 class="text-4xl mt-2 text-center">Advent of Code</h1></a>
  <h4 class="text-center">by <a class="underline" href="https://github.com/lilBunnyRabbit">lilBunnyRabbit</a></h4>

  <Year year={Year2023} />

  <!-- TODO: Temporary indicatior while the site is still in progress. -->
  <h2 class="fixed top-2 left-3 text-error">WIP</h2>
  <div class="fixed top-0 left-0 bottom-0 right-0 border border-error pointer-events-none"></div>
</main>

<style>
  main {
    padding: 2rem;
    max-width: 1024px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
