<script lang="ts">

import type { IComicsResult } from "../types/ComicsType";
import ComicDetailRow from "./ComicDetailRow.svelte";


export let comic: IComicsResult
</script>

<main class="comic">
    <img width="300" height="400" src={`${comic.thumbnail.path}.jpg`} alt={comic.title} />
    <div class="comic-content">
        <div class="comic-title">
            <span>{comic.title}</span>
        </div>
        <ComicDetailRow title="Page Count" content={comic.pageCount}/>
        <ComicDetailRow title="Publish Date" content={new Date(comic.dates[0].date).toLocaleDateString()}/>
        <ComicDetailRow title="Price" content={comic.prices[0].price} />
    </div>
</main>

<style>
    .comic{
        margin: 1vmin;
        position: relative;
        width: 100%;
        height: 400px;
        display: flex;
        flex-direction: row;
        border-bottom: 1px solid #d3d3d3;
        padding-bottom: 20px;
    }
    .comic-content{
        flex: 1 1;
        padding-left: 10px;
    }
    .comic-title{
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        padding-bottom: 19px;
    }
</style>