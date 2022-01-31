<script lang="ts">
import type { IResult } from "../types/CharactersType";

    export let characters: IResult[];
    const loaded = new Map();
    let visible = true

    function lazy(node, data) {
		if (loaded.has(data.src)) {
			node.setAttribute('src', data.src);
		} else {
			// simulate slow loading network
			setTimeout(() => {
				const img = new Image();
				img.src = data.src;
				img.onload = () => {
					loaded.set(data.src, img);
					node.setAttribute('src', data.src); 
				};
			}, 2000);
		}

		return {
			destroy(){} // noop
		};
	}

</script>

<main class="content">
    {#each characters as character (character.id) }
        <a href={`/detail/${character.id}`} class="character">
            {#if visible }
            <img src={`${character.thumbnail.path}.jpg`} class="character-img" use:lazy="{{src: `${character.thumbnail.path}.jpg`}}" alt={character.name} />
            {/if}
            <div class="character-name">{character.name}</div>
        </a>
    {/each}
</main>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Indie+Flower&display=swap');
    .content{
        height: auto;
        overflow: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: row wrap;
        padding-top: 100px;
    }
    .character{
        border: 2px solid #3a3939;
        box-shadow: 0 6px 6px -6px #000;
        background-color: #fff;
        display: inline-block;
        height: 300px;
        margin: 1vmin;
        overflow: hidden;
        position: relative;
        width: 300px;
        cursor: pointer;
        text-decoration: none;
        color: black;
    }
    .character-img{
        transform-origin: 100 100;
        transition: transform .5s ease;
        flex-shrink: 0;
        min-height: 100%;
        min-width: 100%;
        max-height: 100%;
    }
    .character-img:hover {
	    -webkit-transform: scale(1.1);
	    transform: scale(1.1);
    }
    .character-name {
        background-color: #fff;
        border: 2px solid #3a3939;
        margin: 0;
        font-size: 18px;
        bottom: -2px;
        position: absolute;
        right: -6px;
        transform: skew(-15deg);
        font-weight: bold;
        padding: 0 9px;
    }
</style>