<script lang="ts">
    import makeBoard, { generateArr, shuffle } from '../utils/utils';
    import Table from './Table.svelte';
    export let size: number;
    export let color = true;
    export let numbers: boolean;
    let start;
    start = startStore.subscribe(x => start = x);

    import { startStore, time } from '../utils/store';
    const bgColor = [
        "#9da1f1",
        "#ef7c8e",
        "#99bfb2",
        "#8c6c9ae8",
        "#5488A5",
        "#4D5264",
        "#ff926e"
    ];

    type Record = {
        board: string,
        size: number,
        time: number,
        mistakes: number
    };

    let record = [];
    let mistakes = 0;

    // const red = "#e31818c7";
    // const black = "#000000d9";

    $: stack = generateArr(size, !numbers).reverse();
    $: matrix = makeBoard(shuffle(generateArr(size, !numbers)), size);
    $: schulteColor = () => color
        ? shuffle(shuffle(shuffle(bgColor)))[0]
        : "#5a81aced";  // for b&w

    $: checkStack = (data: Number | String) => {
        data === stack[stack.length - 1]
            ? stack.pop()
            : mistakes++;
        if (stack.length === 0) {
            let timer;
            time.subscribe(x => timer = x);
            record.push({
                    board: "schaub",
                    size: size,
                    time: timer,
                    mistakes: mistakes,
                });
            record = record;
            
            time.set(0);
            startStore.set(false);
            matrix = makeBoard(shuffle(generateArr(size, !numbers)), size);
            stack = generateArr(size, !numbers).reverse();
            console.info(record);
            start = false;
        }
        stack = stack;
    };

</script>

<div id="board">

    <div class="board">
    <table>
    {#each matrix as row}
        <tr>
        {#each row as data}
            <td 
                style:background-color={schulteColor()}
                on:keydown={()=>{}}
                on:click={() => start && checkStack(data)}>
                {data}
            </td>
        {/each}
        </tr>
    {/each}
    <th colspan={size}>
        {#if stack.length !== 0}
        find <span> 
                { stack[stack.length - 1] }
            </span>
        {:else}
            completed 🏆
        {/if}
    </th>
    </table>
    </div>

    <div class="board">
    {#if record.length !== 0}
        <Table record={record}/>
    {/if}
    </div>
</div>

<style>
    td {
        text-shadow: 0px 0px 3px #000000a8;
        color: #ebecf0;
        padding: .4rem;
        align-items: center;
        justify-content: center;
        border-radius: .1rem;
        border: 1px solid black;
        font-size: 1.8rem;
        width: 55px;
        height: 55px;
        text-align: center;
        user-select: none;
    }

    td:hover {
        filter: grayscale(60%);
        font-size: 1.7rem;
    }

    table {
        font-family: 'PT Mono';
        background-color: #ebecf0;
        border-radius: .3rem;
        padding: .5rem;
        margin: 1.1rem;
        border: 1px solid black;
        box-shadow: 0px 1px 20px 0px black;
        text-align: center;
    }
    th {
        color: black;
        padding-top: 0.6rem;
        padding-bottom: 0.6rem;
    }

    #board {
        display: flex;
        flex-direction: column;
    }
</style>
