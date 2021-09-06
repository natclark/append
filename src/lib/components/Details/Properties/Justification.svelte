<script>
    export let attributes;
</script>

<p class="normal">Justification</p>
<select value={attributes.justify_content || `flex-start`} on:change>
    <option value="center">Center</option>
    <option value="flex-start">Left</option>
    <option value="flex-end">Right</option>
</select>
