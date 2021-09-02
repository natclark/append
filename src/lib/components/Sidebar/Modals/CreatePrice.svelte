<script>
    import prices from '$lib/stores/prices';
    import websites from '$lib/stores/websites';
    import website from '$lib/stores/website';
    import Breaker from '$lib/components/Layout/Breaker.svelte';

    let id;
    let currency;
    let price;

    const submit = () => {
        if (id.length > 0 && price.length > 0) {
            if ($prices.indexOf($prices.find((e) => e.id === id)) === -1) {
                let newPrices = $prices;
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
                alert(`There is already a price with that same ID!`);
            }
        } else {
            alert(`Please enter a valid ID and at least one valid currency and price!`)
        }
    };
</script>

<h2>Create Price</h2>
<form on:submit|preventDefault={submit}>
    <div class="flex">
        <label for="id">ID <span class="required">*</span></label>
        <input bind:value={id} id="id" type="text" placeholder="main-price" autofocus required aria-placeholder="main-price" aria-required="true">
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
        <input bind:value={price} id="price" type="text" placeholder="0.1" required aria-placeholder="0.1" aria-required="true">
    </div>
    <Breaker />
    <div class="flex">
        <span></span>
        <input class="primary" type="submit" value="Create Price">
    </div>
</form>

<style>
    .flex {
        align-items: center;
        display: flex;
        justify-content: space-between;
        width: 100%;

        input[type="text"],
        select {
            font-size: 18px;
            width: 50%;
        }
    }
</style>
