<script>
    import pages from '$lib/stores/pages';
    import redirects from '$lib/stores/redirects';
    import Breaker from '$lib/components/Layout/Breaker.svelte';

    let path;
    let file;

    const updateFile = (e) => {
        const reader = new FileReader();

        reader.onload = ((theFile) => {
            return (e) => {
                const blob = new Blob([e.target.result], { type: null, });
                file = new File([blob], path);
            };
        })(e.target.files[0]);

        reader.readAsText(e.target.files[0]);
    };

    const submit = () => {};
</script>

<h2>Upload Page</h2>
<p>You can upload any kind of file and serve it from a page on your site!</p>
<form on:submit|preventDefault={submit}>
    <div class="flex">
        <label for="path">Path <span class="required">*</span></label>
        <input bind:value={path} id="path" type="text" placeholder="/example.txt" autofocus required aria-placeholder="placeholder" aria-required="true">
    </div>
    <Breaker />
    <div class="flex">
        <label for="file">File <span class="required">*</span></label>
        <input id="to" class="primary" type="file" required aria-required="true" on:change={updateFile}>
    </div>
    <Breaker />
    <div class="flex">
        <span></span>
        <input class="primary disabled" type="submit" value="Upload Page (Coming Soon)" disabled>
    </div>
</form>

<style>
    .flex {
        align-items: center;
        display: flex;
        justify-content: space-between;
        width: 100%;
        input:not(input[type="submit"]) {
            font-size: 18px !important;
            width: 50% !important;
            &[type="file"] {
                font-size: 16px !important;
            }
        }
    }
</style>
