<script lang="ts">
    import { page } from '$app/stores';
    import { BaseConfig } from '../../config';
    import { onMount } from 'svelte';
    import type {IResult} from '../../types/CharactersType'
    import CharacterDetailContent from '../../components/CharacterDetailContent.svelte';
    import Header from '../../components/Header.svelte';
    import type { IComicsResult } from '../../types/ComicsType';
    import ComicCard from '../../components/ComicCard.svelte';
    import {fly} from 'svelte/transition'
    import {loader} from '../../stores'
    import Loader from '../../components/Loader.svelte';
    import {charactersSelector, GetCharacterComics, GetCharacterDetail} from '../../slices/charactersSlice'
    import {store, useSelector} from '../../store'

    let id = $page.params.id;
    let characterDetail: IResult = {} as IResult
    let comics: IComicsResult[];

    $: comics = useSelector(charactersSelector.comics, newData => (comics = newData) )
    $: characterDetail = useSelector(charactersSelector.characterDetail, newData => (characterDetail = newData) )

    $: characterComicsLoading = useSelector(charactersSelector.loading, newData => (characterComicsLoading = newData) )

    onMount(async () => {
        store.dispatch(GetCharacterComics(id));
        store.dispatch(GetCharacterDetail(id));
    })
console.log(characterDetail);

</script>

{#if characterComicsLoading}
    <Loader/>
{/if}
    <main in:fly={{y: 50, duration:500}} out:fly={{ duration:500}}>
        <Header />
        <div class="column">
            <CharacterDetailContent path={characterDetail && characterDetail?.thumbnail?.path} name={characterDetail && characterDetail.name}  />
            <div class="comics">
                {#each comics as comic }
                    <ComicCard comic={comic} />
                {/each}
            </div>
        </div>
    </main>
    

<style>
    .comics{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .column{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
</style>