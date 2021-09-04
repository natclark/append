<script>
    export let attributes;
</script>

<p class="normal">Font Family</p>
<select value={attributes.font_family || `Segoe UI`} on:change>
    <option value="Segoe UI">Segoe UI</option>
    <option value="Arial">Arial</option>
    <option value="Roboto">Roboto</option>
    <option value="Verdana">Verdana</option>
    <option value="sans-serif">sans-serif</option>
</select>
