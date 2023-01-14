<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { formatTimer } from '../utils/utils';
    import { startStore, time } from '../utils/store';

    let timer;
    let start;
    time.subscribe((x) => timer = x);
    startStore.subscribe(x => start = x);

    let interval = setInterval(() => start && time.update(x => x + 1), 1_000)

    onMount(() => interval); 
    // onDestroy(() => clearInterval(interval));


    $: formattedTime = 
    `${formatTimer(Math.floor(timer / 60))}:${formatTimer(timer % 60)}`;
    // onDestroy(() => time.set(0));

</script>

<div>
    {formattedTime}
</div>

<style>
    div {
        color: #343a46cc;
        background: white;
        font-size: .9rem;
        font-weight: bold;
        width: fit-content;
        padding: .4rem .65rem;
        border-radius: .5rem;
        border: none;
        box-shadow: 0px 1px 7px 0px #1a1a1db8;
        margin: .8rem;
        display: inline;
    }
</style>
