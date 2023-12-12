<script lang="ts">
  import { onMount } from "svelte";
  import type { Part, PartResult } from "../core";

  export let part: Part;
  export let input: string | undefined;
  export let resultPromise: Promise<PartResult> | undefined;

  let showCode = false;

  $: id = `/years/${part.day.year?.value}/days/${part.day.value}/parts/${part.value}`;

  onMount(() => {
    if (part.config?.autoStart) {
      resultPromise = part.execute(input);
    }
  });
</script>

<div {id} class="part flex flex-col" data-result={!!resultPromise}>
  <div class="header flex justify-between bg-primary text-background px-4 py-2">
    <a href={`#${id}`}><h3>Part {part.value}</h3></a>

    <div class="flex items-center gap-4">
      <button
        on:click={() => {
          showCode = !showCode;
        }}>{showCode ? "Hide" : "Show"} code</button
      >

      <button
        on:click={() => {
          resultPromise = part.execute(input);
        }}>Start</button
      >
    </div>
  </div>

  <div class="body">
    {#if showCode}
      <pre class="px-4 py-2 bg-white text-xs"><code>{part.callback.toString()}</code></pre>
    {:else if resultPromise}
      <div class="px-4 py-2">
        {#await resultPromise}
          Loading...
        {:then result}
          Result: {result}
        {:catch error}
          Error: {(error instanceof Error ? error : new Error(error)).message}
        {/await}
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  .part {
    &:not(:last-of-type) {
      & > .header {
        border-bottom: 1px solid theme("colors.foreground");
      }

      & > .body > *:first-child {
        border-bottom: 1px solid theme("colors.foreground");
      }
    }

    &:last-of-type {
      & > .body > *:first-child {
        border-top: 1px solid theme("colors.foreground");
      }
    }
  }
</style>
