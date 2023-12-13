<script lang="ts">
  import type { Year } from "../core";
  import Day from "./Day.svelte";

  export let year: Year;

  $: id = `/years/${year.value}`;
</script>

<div {id} class="flex flex-col gap-2 items-center">
  <a href={`#${id}`}><h1>Year {year.value}</h1></a>

  {#each year.days as day}
    <Day {day} />
  {/each}
</div>
