<script>
    export let text;

    let items = [
        {
            id: 1,
            text,
        }
    ];
</script>

<button>
    <div>{text}</div>
</button>

<style>
    button {
        border-color: #777;
        color: #eee;
        height: 60px;
        outline: 0;
    }
</style>
