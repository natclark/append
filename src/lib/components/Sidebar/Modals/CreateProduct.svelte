<script>
    import products from '$lib/stores/products';
    import Breaker from '$lib/components/Layout/Breaker.svelte';

    let id;
    let title;
    let price;
    let description;

    const submit = () => {
        if (id.length > 0 && title.length > 0 && price.length > 0) {
            if ($products.indexOf($products.find((e) => e.id === id)) === -1) {
                let newProducts = $products;
                newProducts.push({
                    id,
                    title,
                    price,
                    description,
                });
                products.update(() => newProducts);
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
        <input bind:value={price} id="price" type="text" placeholder="0.1" required aria-placeholder="0.1" aria-required="true">
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
        input[type="text"] {
            font-size: 18px;
            width: 50%;
        }
    }
</style>
