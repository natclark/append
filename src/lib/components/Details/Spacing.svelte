<script>
    import { createEventDispatcher, onMount } from 'svelte';
    import element from '$lib/stores/element';

    export let text;
    export let topValue;
    export let rightValue;
    export let bottomValue;
    export let leftValue;

    let top = null;
    let topToggle = null;
    let topVal = topValue.replace(/[^\d.-]/g, ``);
    let topUnit = topValue.replace(/[0-9]/g, ``);

    let right = null;
    let rightToggle = null;
    let rightVal = rightValue.replace(/[^\d.-]/g, ``);
    let rightUnit = rightValue.replace(/[0-9]/g, ``);

    let bottom = null;
    let bottomToggle = null;
    let bottomVal = bottomValue.replace(/[^\d.-]/g, ``);
    let bottomUnit = bottomValue.replace(/[0-9]/g, ``);

    let left = null;
    let leftToggle = null;
    let leftVal = leftValue.replace(/[^\d.-]/g, ``);
    let leftUnit = leftValue.replace(/[0-9]/g, ``);

    const dispatch = createEventDispatcher();

    const topChange = () => {
        const value = `${topVal || 0}${topUnit}`;
        dispatch(`change`, {
            direction: `top`,
            text,
            value,
        });
    };

    const rightChange = () => {
        const value = `${rightVal || 0}${rightUnit}`;
        dispatch(`change`, {
            direction: `right`,
            text,
            value,
        });
    };

    const bottomChange = () => {
        const value = `${bottomVal || 0}${bottomUnit}`;
        dispatch(`change`, {
            direction: `bottom`,
            text,
            value,
        });
    };

    const leftChange = () => {
        const value = `${leftVal || 0}${leftUnit}`;
        dispatch(`change`, {
            direction: `left`,
            text,
            value,
        });
    };

    element.subscribe((val) => {
        topVal = topValue.replace(/[^\d.-]/g, ``);
        topUnit = topValue.replace(/[0-9]/g, ``);

        rightVal = rightValue.replace(/[^\d.-]/g, ``);
        rightUnit = rightValue.replace(/[0-9]/g, ``);

        bottomVal = bottomValue.replace(/[^\d.-]/g, ``);
        bottomUnit = bottomValue.replace(/[0-9]/g, ``);

        leftVal = leftValue.replace(/[^\d.-]/g, ``);
        leftUnit = leftValue.replace(/[0-9]/g, ``);
    });

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
            <p>{topVal || 0}{topUnit}</p>
        </summary>
        <div class="spacing__dropdown">
            <p>Top {text}</p>
            <input bind:value={topVal} type="number" on:change={topChange}>
            <select bind:value={topUnit} on:change={topChange}>
                <option value="px">px</option>
                <option value="%">%</option>
                <option value="em">em</option>
                <option value="rem">rem</option>
                <option value="vw">vw</option>
                <option value="vh">vh</option>
                <option value="ch">ch</option>
                <option value="fr">fr</option>
            </select>
        </div>
    </details>
    <details bind:this={right} class="spacing__details">
        <summary bind:this={rightToggle} class="spacing__input spacing__input--right">
            <p>{rightVal || 0}{rightUnit}</p>
        </summary>
        <div class="spacing__dropdown">
            <p>Right {text}</p>
            <input bind:value={rightVal} type="number" on:change={rightChange}>
            <select bind:value={rightUnit} on:change={rightChange}>
                <option value="px">px</option>
                <option value="%">%</option>
                <option value="em">em</option>
                <option value="rem">rem</option>
                <option value="vw">vw</option>
                <option value="vh">vh</option>
                <option value="ch">ch</option>
                <option value="fr">fr</option>
            </select>
        </div>
    </details>
    <details bind:this={bottom} class="spacing__details">
        <summary bind:this={bottomToggle} class="spacing__input spacing__input--bottom">
            <p>{bottomVal || 0}{bottomUnit}</p>
        </summary>
        <div class="spacing__dropdown">
            <p>Bottom {text}</p>
            <input bind:value={bottomVal} type="number" on:change={bottomChange}>
            <select bind:value={bottomUnit} on:change={bottomChange}>
                <option value="px">px</option>
                <option value="%">%</option>
                <option value="em">em</option>
                <option value="rem">rem</option>
                <option value="vw">vw</option>
                <option value="vh">vh</option>
                <option value="ch">ch</option>
                <option value="fr">fr</option>
            </select>
        </div>
    </details>
    <details bind:this={left} class="spacing__details">
        <summary bind:this={leftToggle} class="spacing__input spacing__input--left">
            <p>{leftVal || 0}{leftUnit}</p>
        </summary>
        <div class="spacing__dropdown spacing__dropdown--left">
            <p>Left {text}</p>
            <input bind:value={leftVal} type="number" on:change={leftChange}>
            <select bind:value={leftUnit} on:change={leftChange}>
                <option value="px">px</option>
                <option value="%">%</option>
                <option value="em">em</option>
                <option value="rem">rem</option>
                <option value="vw">vw</option>
                <option value="vh">vh</option>
                <option value="ch">ch</option>
                <option value="fr">fr</option>
            </select>
        </div>
    </details>
    <p>{text} (WIP)</p>
</div>

<style>
    .spacing {
        border: 2px solid #111;
        height: 104px;
        margin: 0 auto;
        width: 280px;
        .spacing__input {
            align-items: center;
            background-color: #444;
            display: flex;
            justify-content: center;
            list-style: none;
            position: relative;
            text-align: center;
            p {
                cursor: default;
                margin: 0;
            }
            &::-webkit-details-marker {
                display: none;
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
            height: 100px;
            margin-right: 12px;
            position: absolute;
            width: 280px;
            z-index: 998; // The color picker dropdown is set to 999
            select, input {
                background-color: #444;
                border: 1px solid #222;
                border-radius: 4px;
                color: #fff;
                font-size: 16px;
                &:hover {
                    border-color: #000;
                }
                &:focus {
                    outline: 2px solid #40c9ff;
                }
            }
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
