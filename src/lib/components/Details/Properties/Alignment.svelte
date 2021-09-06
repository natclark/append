<script>
    export let attributes;
</script>

<p class="normal">Alignment</p>
<select value={attributes.align_items || `stretch` } on:change>
    <option value="center">Center</option>
    <option value="flex-start">Top</option>
    <option value="flex-end">Bottom</option>
    <option value="stretch">Stretch</option>
</select>
