<script lang="ts">
  import type { Day, PartResult } from "../core";
  import Part from "./Part.svelte";

  export let day: Day;

  let input = day.input;
  let resultPromises: Array<Promise<PartResult> | undefined> = [];

  $: id = `/years/${day.year?.value}/days/${day.value}`;
</script>

<div {id} class="flex flex-col border">
  <div class="flex justify-between bg-foreground text-background px-4 py-2">
    <a href={`#${id}`}><h2>Day {day.value}</h2></a>

    <button
      on:click={() => {
        resultPromises = day.parts.map((part) => part.execute(input));
      }}
    >
      Start
    </button>
  </div>

  <div class="grid grid-cols-[2fr,1fr] max-h-fit">
    <div>
      {#each day.parts as part, i}
        <Part {part} {input} bind:resultPromise={resultPromises[i]} />
      {/each}
    </div>

    <textarea
      class="resize-y focus:outline-none border-l bg-white p-2 min-h-full overflow-auto whitespace-nowrap"
      bind:value={input}
    />
  </div>
</div>
