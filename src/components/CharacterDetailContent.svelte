<script lang="ts">
    export let path: string;
    export let name: string;
</script>

<div class="detail-container">
    {#if path && name}
        <img class="character-detail-img" src={`${path}.jpg`} alt={name}/>        
        <span class="character-detail-name">{name}</span>
    {/if}
</div>

<style>
    .detail-container{
        width: 100%;
        background-color: #a6a6a6;
        padding-top: 20px;
        border: 2px solid #3a3939;
        box-shadow: 0 6px 6px -6px #000;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-top: 100px; 
    }
    .character-detail-img{
        border: 2px solid #3a3939;
        box-shadow: 0 6px 6px -6px #000;
        max-width: 300px;
    }
    .character-detail-name{
        color: #fff;
        font-size: 54px;
        text-align: center;
    }
</style>