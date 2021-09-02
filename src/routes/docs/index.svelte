<svelte:head>
    <title>Append Docs</title>
    <link rel="canonical" href="https://tryappend.com/docs/">
</svelte:head>

<h1>Docs</h1>
<div class="columns text-center">
    <a class="column" href="/docs/editor/">
        <h2>Editor</h2>
        <p>Learn how to build and manage websites with Append.</p>
    </a>
    <a class="column" href="/docs/developers/">
        <h2>Developers</h2>
        <p>Learn how to create plugins and themes for Append.</p>
    </a>
</div>

<style>
    .columns {
        display: inline-flex;
        gap: 18px;
        width: 100%;
    }
    a {
        box-shadow: rgba(99, 99, 99, .2) 0 2px 8px 0;
        color: #111;
        h2 {
            margin-top: 16px;
        }
        &:hover {
            box-shadow: rgba(0, 0, 0, .2) 0 3px 8px;
        }
    }
</style>
