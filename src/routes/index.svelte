
<script lang="ts">
import type { IResult } from "../types/CharactersType";
import { onMount } from 'svelte';
import { BaseConfig } from "../config/index";
import CharacterCard from "../components/CharacterCard.svelte";
import Header from "../components/Header.svelte";
import {fly} from 'svelte/transition'

import { loader } from '../stores'
import Loader from "../components/Loader.svelte";


let characters: IResult[] = []



onMount(async () => {
   $loader = true
   const res = await fetch(`${BaseConfig.api.release.user}characters?limit=30&offset=0&ts=1&apikey=${BaseConfig.utilities.marvelPublicKey}&hash=${BaseConfig.utilities.hash}`);
   if(res){
       const response = await res.json()
       characters = response.data.results;
   }
   $loader = false
});



</script>

<main class="content" in:fly={{y: 50, duration:500}} out:fly={{ duration:500}}>
    {#if $loader}
        <Loader />
    {/if}
    <Header/>
    <CharacterCard characters={characters}/>
</main>


<style>
    :global(body){
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Bangers', cursive;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background-color: #fff;
        background-image: radial-gradient(circle, #f5f5f5 20%, transparent 10%), radial-gradient(circle, #f5f5f5 20%, transparent 10%);
        background-size: 10px 10px;
        background-position: 0 0, 0 0;
    }
</style>