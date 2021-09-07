<script>
    import Editor from 'cl-editor';

    export let html;

    const actions = [`b`, `i`, `u`, `undo`, `redo`, `strike`, `ul`, `ol`, `h1`, `h2`, `p`, `left`, `center`, `right`, `justify`, `forecolor`];
</script>

<div class="cl-wrapper">
    <Editor {content} {html} {actions} on:change on:keydown />
</div>

<style global>
    .cl-wrapper {
        padding: 0 8px;
        .cl-content {
            color: #000;
        }
    }
</style> 
