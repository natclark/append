<script>
    export let text;
    export let show;
</script>

{#if show}
    <div class="banner">
        <p>{text}</p>
    </div>
{/if}

<style>
    div {
        align-items: center;
        background-color: #333;
        border-radius: 6px;
        box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
        color: #fff;
        display: flex;
        height: 2em;
        justify-content: center;
        left: 45px;
        position: absolute;
        width: 80px;
        z-index: 3;
    }
</style>
