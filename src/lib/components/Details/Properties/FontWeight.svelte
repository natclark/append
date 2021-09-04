<script>
    export let attributes;
</script>

<p class="normal">Font Weight</p>
<select value={attributes.font_weight || `400`} on:change>
    <option value="inherit">Inherit</option>
    <option value="100">100</option>
    <option value="200">200</option>
    <option value="300">300</option>
    <option value="400">400 (Normal)</option>
    <option value="500">500</option>
    <option value="600">600</option>
    <option value="700">700 (Bold)</option>
    <option value="800">800</option>
    <option value="900">900</option>
</select>
