<script>
    export let website;
</script>

<a class="website" href="/editor/">
    <h2 class="website__title">{website.title}</h2>
</a>

<style>
    .website {
        background-color: #000;
        border: 1px solid #222;
        border-radius: 6px;
        text-decoration: none;
        .website__title {
            color: #f8f8f8;
            font-size: 16px;
            font-weight: 400;
        }
        &:hover {
            border-color: #444;
        }
        &:focus {
            outline: 0;
        }
    }
</style>
