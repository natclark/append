<script>
    export let value;
    export let placeholder;
</script>

<input bind:value id="name" type="text" placeholder="{placeholder}" autocomplete="off" autofocus required aria-placeholder="{placeholder}" aria-required="true">

<style>
    input {
        background-color: #000;
        border: 1px solid #333;
        border-radius: .5rem;
        color: #f8f8f8;
        font-size: 22px;
        height: 48px;
        margin-bottom: 18px;
        padding: 0 4px;
        &:hover {
            border-color: #444;
        }
        &:focus {
            border-color: #666;
            outline: 0;
        }
    }
</style>
