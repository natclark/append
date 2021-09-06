<script>
    export let attributes;
</script>

<p class="normal">Structure</p>
<select value={attributes.display || `columns`} on:change>
    <option value="columns">Columns</option>
    <option value="grid">Grid</option>
</select>
