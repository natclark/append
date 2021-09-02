<script>
    export let text;
</script>

<div class="spacing">
    <div class="spacing__input spacing__input--top">
        <p>0</p>
    </div>
    <div class="spacing__input spacing__input--right">
        <p>0</p>
    </div>
    <div class="spacing__input spacing__input--bottom">
        <p>0</p>
    </div>
    <div class="spacing__input spacing__input--left">
        <p>0</p>
    </div>
    <p>{text}</p>
</div>

<style>
    .spacing {
        height: 100px;
        margin: 0 auto;
        outline: 2px solid #111;
        width: 280px;
        .spacing__input {
            align-items: center;
            background-color: #444;
            display: flex;
            justify-content: center;
            position: relative;
            text-align: center;
            p {
                cursor: default;
                margin: 0;
            }
            &.spacing__input--top, &.spacing__input--bottom {
                height: 30px;
                width: 100%;
                top: 0;
            }
            &.spacing__input--right, &.spacing__input--left {
                height: 40px;
                width: 40px;
            }
            &.spacing__input--right {
                left: 240px;
            }
            &.spacing__input--left {
                left: 0;
                top: -70px;
            }
            &:hover {
                background-color: #333;
            }
        }
        > p {
            border: 2px solid #222;
            font-size: 18px;
            left: 40px;
            padding: 6px 0;
            position: relative;
            top: -128px;
            width: 200px;
        }
    }
</style>
