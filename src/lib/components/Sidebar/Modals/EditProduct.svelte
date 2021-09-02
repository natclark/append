<script>
    import products from '$lib/stores/products';
    import Breaker from '$lib/components/Layout/Breaker.svelte';

    export let id;

    const product = $products[$products.indexOf($products.find((e) => e.id === id))];
    let type = product.type;
    let title = product.title;
    let price = product.price;
    let description = product.description;

    const submit = () => {
        if (title.length > 0 && price.length > 0) {
            if (id === product.id) {
                let newProducts = $products;
                newProducts.splice(newProducts.indexOf(newProducts.find((e) => e.id === id)), 1);
                newProducts.push({
                    type,
                    id,
                    title,
                    price,
                    description,
                });
                products.update(() => newProducts);
            } else {
                alert(`You cannot change your product's unique ID!`);
            }
        } else {
            alert(`Please enter a valid title and price!`);
        }
    };

    const unset = (e) => {
        e.preventDefault();
        let newProducts = $products;
        newProducts.splice(newProducts.indexOf(newProducts.find((e) => e.id === id)), 1);
        products.update(() => newProducts);
    };
</script>

<h2>Edit Product</h2>
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
        <input bind:value={id} {id} type="text" placeholder="green-vase" disabled aria-placeholder="green-vase">
    </div>
    <Breaker />
    <div class="flex">
        <label for="title">Title <span class="required">*</span></label>
        <input bind:value={title} id="title" type="text" placeholder="Green Vase" autofocus required aria-placeholder="Green Vase" aria-required="true">
    </div>
    <Breaker />
    <div class="flex">
        <label for="price">Price <span class="required">*</span></label>
        <input bind:value={price} id="price" type="text" placeholder="0.1" required aria-placeholder="0.1" aria-required="true">
    </div>
    <Breaker />
    <div class="flex">
        <label for="description">Description</label>
        <input bind:value={description} id="description" type="text" placeholder="This is an example description." aria-placeholder="This is an example description." aria-required="false">
    </div>
    <Breaker />
    <div class="flex flex--reverse">
        <!-- This is reversed so that the delete button is at the bottom of the tab index order -->
        <input class="primary" type="submit" value="Edit">
        <button class="primary error" on:click={unset}>Delete</button>
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
        input[disabled] {
            background-color: #111;
            color: #ccc;
            cursor: not-allowed;
        }
        &.flex--reverse {
            flex-direction: row-reverse;
        }
    }
</style>
