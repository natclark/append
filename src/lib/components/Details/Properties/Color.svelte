<script>
    import iro from '../../../../../node_modules/@jaames/iro/dist/iro.es.js';
    import { createEventDispatcher } from 'svelte';

    export let attributes;
    export let text;

    let colorModal;
    let colorButton;
    let color;
    let colorInput;

    const attribute = text === `Color` ? `color` : `background_color`;
    let isMounted = false;

    const dispatch = createEventDispatcher();

    const mountPickers = () => {
        try {
            const colorPicker = new iro.ColorPicker(color, {
                color: attributes[attribute] || (text === `Color` ? `#000000` : `#FFFFFF`),
                layout: [
                    {
                        component: iro.ui.Box,
                    },
                    {
                        component: iro.ui.Slider,
                        options: {
                            sliderType: `hue`,
                        },
                    }
                ],
                width: 200,
            });
            colorPicker.on([`color:init`, `color:change`], (color) => {
                let obj = new Object();
                obj[text === `Color` ? `color` : `backgroundColor`] = color.hexString;
                dispatch(`change`, obj);
                colorInput.value = color.hexString;
                colorButton.style.backgroundColor = color.hexString;
            });
           isMounted = true;
        } catch (e) {}
        colorModal.addEventListener(`click`, () => {
            document.querySelectorAll(`.picker__dropdown`).forEach((dropdown) => dropdown !== colorModal && (dropdown.removeAttribute(`open`)));
        });
    };

    $: (colorModal && colorButton && color && colorInput && !isMounted && document) && (mountPickers());
</script>

<p class="normal">{text === `Color` ? `Text Color` : `Background`}</p>
<div class="flex picker">
    <details bind:this={colorModal} class="picker__dropdown">
        <summary class="picker__toggle">
            <div bind:this={colorButton} class="picker__button" style="background-color: {attributes[attribute] || (text === `Color` ? `#000000` : `#FFFFFF`)};"></div>
        </summary>
        <div bind:this={color} class="picker__modal"></div>
    </details>
    <input bind:this={colorInput} class="picker__input" type="text" value={attributes[attribute] || (text === `Color` ? `#FFFFFF` : `#000000`)} on:change>
</div>

<style>
    .picker {
        .picker__toggle {
            height: 100%;
            list-style-type: none;
            .picker__button {
                background-color: #000;
                border-radius: 4px;
                cursor: pointer;
                display: block;
                height: 23px;
                margin-right: -1px;
                width: 20px;
            }
            &::-webkit-details-marker {
                display: none;
            }
            &:focus {
                outline: none;
            }
        }
        .picker__modal {
            background-color: #181818;
            border: 1px solid #000;
            border-radius: 6px;
            box-shadow: rgba(0, 0, 0, .25) 0 54px 55px, rgba(0, 0, 0, .12) 0 -12px 30px, rgba(0, 0, 0, .12) 0 4px 6px, rgba(0, 0, 0, .17) 0 12px 13px, rgba(0, 0, 0, .09) 0 -3px 5px;
            height: 300px;
            padding: 25px;
            position: fixed;
            right: 22px;
            width: 250px;
            z-index: 999;
        }
        .picker__input {
            text-transform: uppercase;
        }
    }
</style>
