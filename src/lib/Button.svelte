<script>
    export let options;
    export let flag;
</script>


<button on:click={() => flag = !flag}>
    {#if flag}
        {options[0]}
    {:else}
        {options[1]}
    {/if}
</button>
