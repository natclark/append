<script>
    export let attributes;
</script>

<p class="normal">Font Size</p>
<div class="flex">
    <input type="number" value={attributes.font_size !== null && (attributes.font_size.replace(/[^\d.-]/g, ``))}>
    <select value={attributes.font_size !== null && (attributes.font_size.replace(/[0-9]/g, ``))}>
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
