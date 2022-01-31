<script lang="ts">
import { onMount } from 'svelte';

let LottiePlayer;

    onMount(async() => {
        const module = await import ('@lottiefiles/svelte-lottie-player');
        LottiePlayer = module.LottiePlayer;
    })

</script>

<div class="loader">
    {#if LottiePlayer}
        <LottiePlayer
            src="https://assets5.lottiefiles.com/packages/lf20_av0ub7mb.json"
            autoplay="{true}"
            loop="{true}"
            background="transparent"
            height="{55}"
            width="{55}"
        />
    {/if}
</div>

<style>
    .loader{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #eee;
        z-index: 99;
    }
</style>