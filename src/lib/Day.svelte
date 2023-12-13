<script lang="ts">
  import type { Day } from "../core";
  import Part from "./Part.svelte";

  export let day: Day;

  let input = day.input;
  let partsExecute: Array<() => Promise<void>> = [];

  let editInput = false;

  $: id = `/years/${day.year?.value}/days/${day.value}`;
</script>

<div {id} class="flex flex-col gap-[3px] w-full">
  <div class="flex justify-between bg-foreground text-background px-4 py-2">
    <a href={`#${id}`}><h2>Day {day.value}</h2></a>

    <div class="flex items-center gap-4">
      <button
        on:click={() => {
          editInput = !editInput;
        }}>{editInput ? "Save" : "Edit"} input</button
      >

      <button on:click={() => partsExecute.forEach((execute) => execute())}> Start </button>
    </div>
  </div>

  <div class="flex flex-col gap-[3px] overflow-hidden">
    {#if editInput}
      <div class="border">
        <textarea
          rows={10}
          class="resize-y focus:outline-none min-h-full p-2 bg-background w-full overflow-auto whitespace-nowrap"
          bind:value={input}
        />
      </div>
    {:else}
      {#each day.parts as part, i}
        <Part {part} {input} bind:execute={partsExecute[i]} />
      {/each}
    {/if}
  </div>
</div>

<style lang="scss">
  textarea {
    &::-webkit-scrollbar {
      width: 0.5rem;
      height: 0.5rem;
    }
  }
</style>
