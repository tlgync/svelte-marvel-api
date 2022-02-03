<script lang="ts">
import {fly} from 'svelte/transition'
import type {IResult}  from "../types/CharactersType";
import {GetAllCharacters, SearchCharacter} from '../slices/charactersSlice'
import {store} from '../store'

export let characters: IResult[];

let active;
let value;

$: if(value === undefined || value === ''){
    store.dispatch(GetAllCharacters())
}


const handleChange = (e) => {
    if((e.target as HTMLInputElement).value) {
        store.dispatch(SearchCharacter(characters.filter( f=> f.name.toLocaleLowerCase().includes(e.target.value))))
    }
}

</script>

<div class="search-container">
    {#if !active && !value}
        <label in:fly={{y: -10, duration:500}} out:fly={{ y:-10, duration:500}} for="search-movie">Search..</label>
    {/if}
    <input 
        on:input={handleChange}
        bind:value={value}
        on:blur={() => active = false}
        on:focus={() => active = true} 
        class="inpt" 
        type="text" />
</div>

<style>
.search-container{
    position: relative;
}
.inpt{
    width: 250px;
    height: 25px;
    margin-top:70px;
    margin-left: 43px;
    outline: none;
}
label{
    position: absolute;
    top: 77px;
    left: 50px;
    color: gray;
}
</style>