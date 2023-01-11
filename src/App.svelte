<script lang="ts">
// TODO:
// + shuffle on click
// + direct or reverse or random
// + gorbov(red in descending order & black in ascending order)
import Board from './lib/Board.svelte';
import StopWatch from './lib/StopWatch.svelte';
import { startStore, time } from './utils/store';

let color = true;
let size = 7;
let numbers = true;
let start;
startStore.subscribe(x => start = x);


let options = Array.from({ length: 7 }, (_, i) => i + 4);
</script>

<header>
    <span>LOMA <span id="tests">TESTS</span></span>
    <StopWatch/>
</header>

<main>

    {#if start !== true}
    <div id="selections">
        <span class="opts">
            {#each ["b&w", "colored"] as opt}
                {#if opt === "colored"}
                <button 
                    on:click={() => {
                            console.info(color);
                            color = true;
                        }}
                    >
                    {opt}
                </button>
                {:else}
                <button 
                    on:click={() => {
                            console.info(color);
                            color = false;
                        }}
                    >
                    {opt}
                </button>
                {/if}
            {/each}
        </span>

        <span class="opts">
            {#each ["numbers", "letters"] as opt}
                {#if opt === "numbers"}
                <button on:click={() => numbers = true}>
                    {opt}
                </button>
                {:else}
                <button on:click={() => numbers = false}>
                    {opt}
                </button>
                {/if}
            {/each}
        </span>

        <span class="opts">
            {#each options as opt}
                <button on:click={() => size = opt}>{opt}x{opt}</button>
            {/each}
        </span>

    </div>
    {/if}

    <Board 
        color={color}
        numbers={numbers}
        size={size}/>

    <div>
        <button on:click={() => startStore.update(x => {
                time.set(0);
                return !x;
            })} id="game-button">
            { start ? "STOP" : "START" }
        </button>
    </div>

</main>

<style>
    header {
        font-size: .9rem;
        color: #6ca0c5;
        font-weight: bolder;
        padding: 1rem;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        margin: none;
    }

    button {
        background: #343a46cc;
        font-size: .9rem;
        color: white;
        padding: .3rem .4rem;
        border-radius: .4rem;
        border: none;
        box-shadow: 0px 1px 7px 0px #1a1a1db8;
    }

    button:disabled {
        color: grey;
    }

    #tests {
        color: white;
    }

    .opts {
        background: #343a46cc;
        padding: .4rem;
        border-radius: .3rem;
    }

    .opts > button {
        margin-left: .4rem;
        margin-right: .4rem;
        border-radius: 0;
        box-shadow: none;
    }

    #selections {
        display: hidden;
        justify-content: space-around;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        box-shadow: 0px 1px 7px 0px #1a1a1db8;
    }
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    #game-button {
        padding: 0.8rem 1.2952rem;
        font-family: bolder;
    }
</style>
