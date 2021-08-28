<script>
    export let text;
    export let element;
    export let disabled;

    let className = !element ? `button` : ``;
    className += disabled ? ` disabled` : ``;

    if (text === `Container`) element = `container`;
    else if (text === `Item`) element = `item`;

    const dragstart = (e) => element && (e.dataTransfer.setData(`element`, element));

    const click = (e) => !element && (alert(`This feature is still in the works. Sorry!`));
</script>

<div class={className} draggable={className === `` ? `true` : `false`} role="button" on:dragstart={dragstart} on:click={click}>
    <slot />
    <p>{text}</p>
</div>

<style>
    div {
        border-color: #777;
        cursor: grab !important;
        height: 70px;
        padding-top: 9px;
        width: auto;
        p {
            color: #fafafa;
            font-size: 14px;
            margin: 6px 0 0;
        }
        &.disabled {
            background-color: #222;
            border-color: #555;
            cursor: not-allowed !important;
        }
        &:not(.disabled):hover {
            background-color: #444;
        }
        &:not(.disabled):active {
            cursor: grabbing !important;
        }
    }
    :global {
        div[role="button"].button {
            cursor: pointer !important;
            &:active {
                cursor: pointer !important;
            }
        }
    }
</style>
