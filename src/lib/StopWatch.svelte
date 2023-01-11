<script lang="ts">
    import { onMount } from 'svelte';
    import { formatTimer } from '../utils/utils';
    import { startStore, time } from '../utils/store';

    let timer;
    let start;
    time.subscribe((x) => timer = x);
    startStore.subscribe(x => start = x);


    onMount(() => setInterval(() => start && time.update(x => x + 1), 1_000));


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
        padding: .6rem .7rem;
        border-radius: .4rem;
        border: none;
        box-shadow: 0px 1px 7px 0px #1a1a1db8;
        margin: .8rem;
        display: inline;
    }

</style>
