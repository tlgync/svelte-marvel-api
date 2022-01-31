<script lang="ts">
    export let title: string
    export let content: string
</script>

<main class="comic-row">
    <span>{title}</span>
    <span>{content}</span>
</main>

<style>
    .comic-row{
        display: flex;
        justify-content: flex-start;
        flex-direction: row;
        padding: 9px 0;
    }
</style>