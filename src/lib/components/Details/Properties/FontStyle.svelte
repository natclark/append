<script>
    export let attributes;
</script>

<p class="normal">Font Style</p>
<select value={attributes.font_style || `normal`} on:change>
    <option value="normal">Normal</option>
    <option value="italic">Italic</option>
    <option value="oblique">Oblique</option>
</select>
