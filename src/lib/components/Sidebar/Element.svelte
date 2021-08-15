<script>
    export let text;
    export let element;

    let classList = !element ? `button` : ``;

    if (text === `Container`) element = `container`;
    else if (text === `Item`) element = `item`;

    let items = [
        {
            id: 1,
            text,
        }
    ];

    const dragstart = (e) => element && (e.dataTransfer.setData(`element`, element));

    const click = (e) => !element && (alert(`This feature is still in the works. Sorry!`));
</script>

<div class={classList} draggable={classList === `` ? `true` : `false`} role="button" on:dragstart={dragstart} on:click={click}>
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
        &:hover {
            background-color: #444;
        }
        &:active {
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
