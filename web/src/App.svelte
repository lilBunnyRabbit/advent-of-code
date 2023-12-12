<script lang="ts">
  import Year from "./lib/Year.svelte";
  import { Year2023 } from "./years";
</script>

<main>
  <Year year={Year2023} />
</main>

<style>
  main {
    padding: 2rem;
    max-width: 1024px;
    margin: 0 auto;
  }
</style>
