<script>
    import { onMount } from 'svelte';

    export let text;

    let top = null;
    let topToggle = null;
    let right = null;
    let rightToggle = null;
    let bottom = null;
    let bottomToggle = null;
    let left = null;
    let leftToggle = null;

    onMount(() => {
        const dropdowns = document.querySelectorAll(`.spacing__dropdowns`);
        const details = document.querySelectorAll(`.spacing__details`);

        const contains = (child) => {
            let res = false;
            details.forEach((detail) => detail === child || detail.contains(child) && (res = true));
            return res;
        };

        // TODO clean this up

        top.addEventListener(`click`, (e) => {
            if (top.getAttribute(`open`)) {
                top.removeAttribute(`open`);
            } else {
                right.removeAttribute(`open`);
                bottom.removeAttribute(`open`);
                left.removeAttribute(`open`);
            }
        });

        left.addEventListener(`click`, (e) => {
            if (left.getAttribute(`open`)) {
                left.removeAttribute(`open`);
            } else {
                top.removeAttribute(`open`);
                right.removeAttribute(`open`);
                bottom.removeAttribute(`open`);
            }
        });

        bottom.addEventListener(`click`, (e) => {
            if (bottom.getAttribute(`open`)) {
                bottom.removeAttribute(`open`);
            } else {
                top.removeAttribute(`open`);
                right.removeAttribute(`open`);
                left.removeAttribute(`open`);
            }
        });

        right.addEventListener(`click`, (e) => {
            if (right.getAttribute(`open`)) {
                right.removeAttribute(`open`);
            } else {
                top.removeAttribute(`open`);
                bottom.removeAttribute(`open`);
                left.removeAttribute(`open`);
            }
        });

        document.addEventListener(`click`, (e) => {
            if (e.target.className !== `spacing__details` && !contains(e.target)) {
                try {
                    top.removeAttribute(`open`);
                    right.removeAttribute(`open`);
                    bottom.removeAttribute(`open`);
                    left.removeAttribute(`open`);
                } catch (e) {}
            }
        });
    });
</script>

<div class="spacing">
    <details bind:this={top} class="spacing__details">
        <summary bind:this={topToggle} class="spacing__input spacing__input--top">
            <p>0</p>
        </summary>
        <div class="spacing__dropdown">
            <p>Top {text}</p>
            <p>WIP</p>
        </div>
    </details>
    <details bind:this={right} class="spacing__details">
        <summary bind:this={rightToggle} class="spacing__input spacing__input--right">
            <p>0</p>
        </summary>
        <div class="spacing__dropdown">
            <p>Right {text}</p>
            <p>WIP</p>
        </div>
    </details>
    <details bind:this={bottom} class="spacing__details">
        <summary bind:this={bottomToggle} class="spacing__input spacing__input--bottom">
            <p>0</p>
        </summary>
        <div class="spacing__dropdown">
            <p>Bottom {text}</p>
            <p>WIP</p>
        </div>
    </details>
    <details bind:this={left} class="spacing__details">
        <summary bind:this={leftToggle} class="spacing__input spacing__input--left">
            <p>0</p>
        </summary>
        <div class="spacing__dropdown spacing__dropdown--left">
            <p>Left {text}</p>
            <p>WIP</p>
        </div>
    </details>
    <p>{text}</p>
</div>

<style>
    .spacing {
        height: 104px;
        margin: 0 auto;
        border: 2px solid #111;
        width: 280px;
        summary {
            list-style: none;
            &::-webkit-details-marker {
                display: none;
            }
        }
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
                border-right: 2px solid #111;
                left: 236px;
                width: 42px;
            }
            &.spacing__input--left {
                left: 0;
                top: -70px;
            }
            &:hover {
                background-color: #333;
            }
        }
        .spacing__dropdown {
            background-color: #181818;
            border: 1px solid #000;
            border-radius: 6px;
            box-shadow: rgba(0, 0, 0, .25) 0 54px 55px, rgba(0, 0, 0, .12) 0 -12px 30px, rgba(0, 0, 0, .12) 0 4px 6px, rgba(0, 0, 0, .17) 0 12px 13px, rgba(0, 0, 0, .09) 0 -3px 5px;
            height: 200px;
            margin-right: 12px;
            position: absolute;
            width: 280px;
            z-index: 998; // The color picker dropdown is set to 999
            &.spacing__dropdown--left {
                margin-top: -70px;
            }
        }
        > p {
            border: 2px solid #222;
            font-size: 18px;
            left: 40px;
            padding: 6px 0;
            position: relative;
            top: -128px;
            width: 198px;
        }
    }
</style>
