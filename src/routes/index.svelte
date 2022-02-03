
<script lang="ts">
import { onMount } from 'svelte';
import CharacterCard from "../components/CharacterCard.svelte";
import Header from "../components/Header.svelte";
import {fly} from 'svelte/transition'

import Loader from "../components/Loader.svelte";
import Search from "../components/Search.svelte"

import {charactersSelector, GetAllCharacters} from '../slices/charactersSlice'
import {store, useSelector} from '../store'


$: newCharacters = useSelector(charactersSelector.data, newData => (newCharacters = newData) )
$: searchCharacter = useSelector(charactersSelector.search, newData => (searchCharacter = newData) )
$: newCharactersLoading = useSelector(charactersSelector.loading, newData => (newCharactersLoading = newData) )

onMount(async () => {
   store.dispatch(GetAllCharacters())
});

</script>

<main class="flex" in:fly={{y: 50, duration:500}} out:fly={{ duration:500}}>
    {#if newCharactersLoading}
        <Loader />
    {/if}
    <Header/>
    <div class="content">
        <Search characters={searchCharacter} />
    </div>
    <CharacterCard characters={newCharacters}/>
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
    @media only screen and (max-width: 900px) {
         .content {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
</style>