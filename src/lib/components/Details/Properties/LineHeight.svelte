<script>
    export let attributes;
</script>

<p class="normal">Line Height</p>
<input type="text" value={attributes.line_height || `1`} on:change>
