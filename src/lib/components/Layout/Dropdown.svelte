<script>
    import dropdowns from '$lib/stores/dropdowns';
    export let text;

    let details;

    // * Prevents toggling the first time the component is mounted, to prevent an unwanted flickering effect:
    let first = true;
    let open = true;

    const index = $dropdowns.indexOf($dropdowns.find((e) => e.text === text));
    if (index === -1) {
        let newDropdowns = $dropdowns;
        newDropdowns.push({ text, open, });
        dropdowns.update(() => newDropdowns);
    } else {
        open = $dropdowns[index].open;
    }

    const toggle = () => {
        if (!first || !open) {
            let newDropdowns = $dropdowns;
            newDropdowns[newDropdowns.indexOf(newDropdowns.find((e) => e.text === text))].open = !open;
            dropdowns.update(() => newDropdowns);
            open = !open;
        }
        first = false;
    };
</script>

<details {open} on:toggle={toggle}>
    <summary>
        <p>{text}</p>
        {#if open}
            <svg version="1.1" x="0px" y="0px" viewBox="0 0 122.88 63.9" style="enable-background:new 0 0 122.88 63.9" xml:space="preserve" aria-hidden="true">
                <g>
                    <polygon fill="#ddd" clip-rule="evenodd" fill-rule="evenodd" points="61.44,63.9 122.88,0 0,0 61.44,63.9" />
                </g>
            </svg>
        {:else}
            <svg version="1.1" x="0px" y="0px" viewBox="0 0 122.88 63.9" style="enable-background:new 0 0 122.88 63.9" xml:space="preserve" aria-hidden="true" width="16px" height="16px">
                <g>
                    <polygon fill="#ddd" clip-rule="evenodd" fill-rule="evenodd" points="61.44,0 122.88,63.9 0,63.9 61.44,0" />
                </g>
            </svg>
        {/if}
    </summary>
    <slot />
</details>

<style>
    summary {
        align-items: center;
        background-color: #333;
        display: flex;
        justify-content: space-between;
        list-style: none;
        margin: 14px 0;
        p {
            color: #f8f8f8;
            font-size: 14px;
            font-weight: 600;
            margin: 0;
            padding: 4px 8px;
        }
        svg {
            height: 16px;
            margin-right: 8px;
            width: 16px;
        }
        &::-webkit-details-marker {
            display: none;
        }
        &:hover polygon {
            fill: #f8f8f8;
        }
        &:focus {
            outline: none;
        }
    }
</style>
