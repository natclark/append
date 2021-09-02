<script>
    import prices from '$lib/stores/prices';
    import websites from '$lib/stores/websites';
    import website from '$lib/stores/website';
    import Breaker from '$lib/components/Layout/Breaker.svelte';

    export let id;

    console.log(id, $prices);
    const currentPrice = $prices[$prices.indexOf($prices.find((e) => e.id === id))];
    let currency = currentPrice.currency;
    let price = currentPrice.price;

    const submit = () => {
        if (title.length > 0 && price.length > 0) {
            if (id === currentPrice.id) {
                let newPrices = $prices;
                newPrices.splice(newPrices.indexOf(newPrices.find((e) => e.id === id)), 1);
                newPrices.push({
                    id,
                    currency,
                    price,
                });
                prices.update(() => newPrices);
                let newWebsites = $websites;
                newWebsites[newWebsites.indexOf(newWebsites.find((e) => e.id === $website))].prices = $prices;
                websites.update(() => newWebsites);
            } else {
                alert(`You cannot change your product's unique ID!`);
            }
        } else {
            alert(`Please enter a valid title and price!`);
        }
    };

    const unset = (e) => {
        e.preventDefault();
        let newPrices = $prices;
        newPrices.splice(newPrices.indexOf(newPrices.find((e) => e.id === id)), 1);
        prices.update(() => newPrices);
    };
</script>

<h2>Edit Price</h2>
<form on:submit|preventDefault={submit}>
    <div class="flex">
        <label for="id">ID <span class="required">*</span></label>
        <input bind:value={id} id="id" type="text" placeholder="main-price" disabled required aria-placeholder="main-price" aria-required="true">
    </div>
    <Breaker />
    <div class="flex">
        <label for="currency">Currency <span class="required">*</span></label>
        <select bind:value={currency} id="currency" type="text" required aria-required="true">
            <option value="eth">ETH</option>
        </select>
    </div>
    <Breaker />
    <div class="flex">
        <label for="price">Price <span class="required">*</span></label>
        <input bind:value={price} id="price" type="text" placeholder="0.1" autofocus required aria-placeholder="0.1" aria-required="true">
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
