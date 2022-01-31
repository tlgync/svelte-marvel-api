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

    let id = $page.params.id;
    let characterDetail: IResult = {} as IResult
    let comics: IComicsResult[] = []

    onMount(async () => {
        $loader = true
        const res = await fetch(`${BaseConfig.api.release.user}characters/${id}?limit=10&offset=0&ts=1&apikey=${BaseConfig.utilities.marvelPublicKey}&hash=${BaseConfig.utilities.hash}`)
        if(res){
            const resJson = await res.json();
            characterDetail = resJson.data.results[0];
        }

        const comicsRes = await fetch(`${BaseConfig.api.release.user}characters/${id}/comics?limit=10&offset=0&ts=1&apikey=${BaseConfig.utilities.marvelPublicKey}&hash=${BaseConfig.utilities.hash}&orderBy=-onsaleDate`)
        if(comicsRes){
            const comicsResJson = await comicsRes.json()
            comics = comicsResJson.data.results;
        }
        $loader = false
    })

    console.log($loader);

</script>

{#if $loader}
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