<script>
    import products from '$lib/stores/products';
    import websites from '$lib/stores/websites';
    import website from '$lib/stores/website';
    import Breaker from '$lib/components/Layout/Breaker.svelte';
    import prices from '$lib/stores/prices';

    let type;
    let id;
    let title;
    let price;
    let description;

    const submit = () => {
        if (id.length > 0 && title.length > 0 && price.length > 0) {
            if ($products.indexOf($products.find((e) => e.id === id)) === -1) {
                let newProducts = $products;
                newProducts.push({
                    type,
                    id,
                    title,
                    price,
                    description,
                });
                products.update(() => newProducts);
                let newWebsites = $websites;
                newWebsites[newWebsites.indexOf(newWebsites.find((e) => e.id === $website))].products = $products;
                websites.update(() => newWebsites);
            } else {
                alert(`There is already a product with that same ID!`);
            }
        } else {
            alert(`Please enter a valid ID, title, and price!`);
        }
    };
</script>

<h2>Create Product</h2>
<form on:submit|preventDefault={submit}>
    <div class="flex">
        <label for="type">Type <span class="required">*</span></label>
        <select bind:value={type} id="type" required aria-required="true">
            <option value="nft">NFT</option>
        </select>
    </div>
    <Breaker />
    <div class="flex">
        <label for="id">ID <span class="required">*</span></label>
        <input bind:value={id} id="id" type="text" placeholder="green-vase" autofocus required aria-placeholder="green-vase" aria-required="true">
    </div>
    <Breaker />
    <div class="flex">
        <label for="title">Title <span class="required">*</span></label>
        <input bind:value={title} id="title" type="text" placeholder="Green Vase" required aria-placeholder="Green Vase" aria-required="true">
    </div>
    <Breaker />
    <div class="flex">
        <label for="price">Price <span class="required">*</span></label>
        <select bind:value={price} id="price" required aria-required="true">
            {#each $prices as price}
                <option value="{price.id}">{price.id}</option>
            {/each}
        </select>
    </div>
    <Breaker />
    <div class="flex">
        <label for="description">Description</label>
        <input bind:value={description} id="description" type="text" placeholder="This is an example description." aria-placeholder="This is an example description." aria-required="false">
    </div>
    <Breaker />
    <div class="flex">
        <span></span>
        <input class="primary" type="submit" value="Create Product">
    </div>
</form>

<style>
    .flex {
        align-items: center;
        display: flex;
        justify-content: space-between;
        width: 100%;
        input[type="text"], select {
            font-size: 18px;
            width: 50%;
        }
    }
</style>
