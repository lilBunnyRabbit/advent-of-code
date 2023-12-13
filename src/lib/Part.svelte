<script lang="ts">
  import { onMount } from "svelte";
  import { Flag, type Part, type PartResult } from "../core";
  import { cx } from "../utils/class.util";

  export let part: Part;
  export let input: string | undefined;

  let resultPromise: Promise<PartResult> | undefined;
  let showCode = false;

  let status: "idle" | "loading" | "success" | "error" = "idle";

  $: id = `/years/${part.day.year?.value}/days/${part.day.value}/parts/${part.value}`;

  export async function execute() {
    status = "loading";
    resultPromise = part.execute(input);

    try {
      await resultPromise;
      status = "success";
    } catch (error) {
      status = "error";
    }
  }

  onMount(() => {
    if (part.flags.has(Flag.AUTO_START)) {
      execute();
    }
  });
</script>

<div {id} class="flex flex-col" data-result={!!resultPromise}>
  <div
    class={cx(
      "flex justify-between text-background px-4 py-2",
      {
        idle: "bg-primary",
        loading: "bg-info",
        success: "bg-success",
        error: "bg-error",
      }[status]
    )}
  >
    <a href={`#${id}`}><h3>Part {part.value}</h3></a>

    <div class="flex items-center gap-4">
      <button
        on:click={() => {
          showCode = !showCode;
        }}>{showCode ? "Hide" : "Show"} code</button
      >

      <button on:click={execute}>Start</button>
    </div>
  </div>

  <div
    class={cx(
      (showCode || resultPromise) && "px-4 py-2 border bg-opacity-20",
      {
        idle: "border-primary bg-primary",
        loading: "border-info bg-info",
        success: "border-success bg-success",
        error: "border-error bg-error",
      }[status]
    )}
  >
    {#if showCode}
      <pre class="text-xs overflow-auto"><code>{part.callback.toString()}</code></pre>
    {:else if resultPromise}
      {#await resultPromise}
        Loading...
      {:then result}
        <span class="text-success">{result}</span>
      {:catch error}
        <span class="text-error">{(error instanceof Error ? error : new Error(error)).message}</span>
      {/await}
    {/if}
  </div>
</div>
