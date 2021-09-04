<script>
    import { createEventDispatcher, onMount } from 'svelte';

    export let attributes;
    export let text;

    const attribute = text === `Margin` ? `margin_` : `padding_`;

    let top = null;
    let topToggle = null;
    let topInput = null;
    let topSelect = null;

    let right = null;
    let rightToggle = null;
    let rightInput = null;
    let rightSelect = null;

    let bottom = null;
    let bottomToggle = null;
    let bottomInput = null;
    let bottomSelect = null;

    let left = null;
    let leftToggle = null;
    let leftInput = null;
    let leftSelect = null;

    const dispatch = createEventDispatcher();

    const topChange = () => {
        const value = `${topInput.value ? topInput.value.replace(/[^\d.-]/g, ``) : `0`}${topSelect.value !== null ? topSelect.value.replace(/[0-9]/g, ``) : `px`}`;
        dispatch(`change`, {
            direction: `top`,
            value,
        });
    };

    const rightChange = () => {
        const value = `${rightInput.value ? rightInput.value.replace(/[^\d.-]/g, ``) : `0`}${rightSelect.value !== null ? rightSelect.value.replace(/[0-9]/g, ``) : `px`}`;
        dispatch(`change`, {
            direction: `right`,
            value,
        });
    };

    const bottomChange = () => {
        const value = `${bottomInput.value ? bottomInput.value.replace(/[^\d.-]/g, ``) : `0`}${bottomSelect.value !== null ? bottomSelect.value.replace(/[0-9]/g, ``) : `px`}`;
        dispatch(`change`, {
            direction: `bottom`,
            value,
        });
    };

    const leftChange = () => {
        const value = `${leftInput.value ? leftInput.value.replace(/[^\d.-]/g, ``) : `0`}${leftSelect.value !== null ? leftSelect.value.replace(/[0-9]/g, ``) : `px`}`;
        dispatch(`change`, {
            direction: `left`,
            value,
        });
    };

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
            <p>{attributes[`${attribute}top`] !== null ? attributes[`${attribute}top`].replace(/[^\d.-]/g, ``) : `0`}{attributes[`${attribute}top`] !== null ? attributes[`${attribute}top`].replace(/[0-9]/g, ``) : `px`}</p>
        </summary>
        <div class="spacing__dropdown">
            <p>Top {text}</p>
            <input bind:this={topInput} type="number" value={attributes[`${attribute}top`] !== null ? attributes[`${attribute}top`].replace(/[^\d.-]/g, ``) : `0`} on:change={topChange}>
            <select bind:this={topSelect} value={attributes[`${attribute}top`] !== null ? attributes[`${attribute}top`].replace(/[0-9]/g, ``) : `px`} on:change={topChange}>
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
            <p>{attributes[`${attribute}right`] !== null ? attributes[`${attribute}right`].replace(/[^\d.-]/g, ``) : `0`}{attributes[`${attribute}right`] !== null ? attributes[`${attribute}right`].replace(/[0-9]/g, ``) : `px`}</p>
        </summary>
        <div class="spacing__dropdown">
            <p>Right {text}</p>
            <input bind:this={rightInput} type="number" value={attributes[`${attribute}right`] !== null ? attributes[`${attribute}right`].replace(/[^\d.-]/g, ``) : `0`} on:change={rightChange}>
            <select bind:this={rightSelect} value={attributes[`${attribute}right`] !== null ? attributes[`${attribute}right`].replace(/[0-9]/g, ``) : `px`} on:change={rightChange}>
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
            <p>{attributes[`${attribute}bottom`] !== null ? attributes[`${attribute}bottom`].replace(/[^\d.-]/g, ``) : `0`}{attributes[`${attribute}bottom`] !== null ? attributes[`${attribute}bottom`].replace(/[0-9]/g, ``) : `px`}</p>
        </summary>
        <div class="spacing__dropdown">
            <p>Bottom {text}</p>
            <input bind:this={bottomInput} type="number" value={attributes[`${attribute}bottom`] !== null ? attributes[`${attribute}bottom`].replace(/[^\d.-]/g, ``) : `0`} on:change={bottomChange}>
            <select bind:this={bottomSelect} value={attributes[`${attribute}bottom`] !== null ? attributes[`${attribute}bottom`].replace(/[0-9]/g, ``) : `px`} on:change={bottomChange}>
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
            <p>{attributes[`${attribute}left`] !== null ? attributes[`${attribute}left`].replace(/[^\d.-]/g, ``) : `0`}{attributes[`${attribute}left`] !== null ? attributes[`${attribute}left`].replace(/[0-9]/g, ``) : `px`}</p>
        </summary>
        <div class="spacing__dropdown spacing__dropdown--left">
            <p>Left {text}</p>
            <input bind:this={leftInput} type="number" value={attributes[`${attribute}left`] !== null ? attributes[`${attribute}left`].replace(/[^\d.-]/g, ``) : `0`} on:change={leftChange}>
            <select bind:this={leftSelect} value={attributes[`${attribute}left`] !== null ? attributes[`${attribute}left`].replace(/[0-9]/g, ``) : `px`} on:change={leftChange}>
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
    <p>{text}</p>
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
