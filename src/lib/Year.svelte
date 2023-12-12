<script lang="ts">
  import type { Year } from "../core";
  import Day from "./Day.svelte";

  export let year: Year;

  $: id = `/years/${year.value}`;
</script>

<div {id} class="year">
  <a href={`#${id}`}><h1>Year {year.value}</h1></a>

  {#each year.days as day}
    <Day {day} />
  {/each}
</div>

<style lang="scss">
  .year {
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;

    width: 100%;

    & h1 {
      border-bottom: 1px solid currentColor;
    }
  }
</style>
