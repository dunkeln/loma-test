<script lang="ts">
    import { formatTimer } from '../utils/utils';
    export let record;

//  type Record = {
//      board: string,
//      size: number,
//      time: number,
//      mistakes: number
//  };
    const header = [ "board", "size", "time", "mistakes" ];
</script>

<table>
    <tr>
    {#each header as h}
        <th>{h}</th>
    {/each}
    </tr>
    {#each record as rec}
        <tr>
            <td>{rec.board}</td>
            <td>{rec.size}</td>
            <td>{formatTimer(rec.time)}</td>
            <td>{rec.mistakes}</td>
        </tr>
    {/each}
</table>

<style>
table {
    width: 40%;
    color: whitesmoke;
}

th {
    text-align: center;
    background-color: #343443;
    font-weight: normal;
}

td {
    text-align: center;
    border: 1px solid #343443;
}
</style>
