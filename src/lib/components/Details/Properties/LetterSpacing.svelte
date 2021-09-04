<script>
    export let attributes;
</script>

<p class="normal">Letter Spacing</p>
<input type="text" value={attributes.letter_spacing || `0`} on:change>
