<script>
    export let text;
    export let selected;
</script>

<div role="tab" aria-selected="{selected}" data-class="tab" on:click>
    {text}
</div>

<style>
    div {
        color: #ddd;
        cursor: pointer;
        font-size: 10px;
        letter-spacing: 1px;
        overflow: hidden;
        padding: 4px;
        position: relative;
        text-align: center;
        text-transform: uppercase;
        transition: all .09s;
        width: 75px;
        &[aria-selected="true"] {
            background-color: #222 !important;
            border-bottom: 1px solid #4169e1;
        }
        &:hover {
            background-color: #111;
        }
    }
    @media screen and (min-width: 768px) {
        div {
            font-size: 16px;
            padding: 8px 16px;
            width: 132px;
        }
    }
</style>
