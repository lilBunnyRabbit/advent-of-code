<script lang="ts">
  import type { Day, PartResult } from "../core";
  import Part from "./Part.svelte";

  export let day: Day;

  let input = day.input;
  let partsExecute: Array<() => Promise<void>> = [];

  $: id = `/years/${day.year?.value}/days/${day.value}`;
</script>

<div {id} class="flex flex-col gap-[3px] w-full">
  <div class="flex justify-between bg-foreground text-background px-4 py-2">
    <a href={`#${id}`}><h2>Day {day.value}</h2></a>

    <button on:click={() => partsExecute.forEach((execute) => execute())}> Start </button>
  </div>

  <div class="grid grid-cols-[2fr,1fr] gap-x-[3px] max-h-fit">
    <div class="flex flex-col gap-[3px] overflow-hidden">
      {#each day.parts as part, i}
        <Part {part} {input} bind:execute={partsExecute[i]} />
      {/each}
    </div>

    <div class="border">
      <textarea
        class="resize-y focus:outline-none min-h-full p-2 bg-white w-full overflow-auto whitespace-nowrap"
        bind:value={input}
      />
    </div>
  </div>
</div>

<style lang="scss">
  textarea {
    &::-webkit-scrollbar {
      width: 0.5rem;
      height: 0.5rem;
    }

    &::-webkit-scrollbar-track {
      background-color: theme("colors.white");
    }

    &::-webkit-scrollbar-thumb {
      background-color: theme("colors.white");
    }
  }
</style>
