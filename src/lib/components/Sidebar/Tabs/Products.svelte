<script>
    import Dropdown from '$lib/components/Layout/Dropdown.svelte';
    import Center from '$lib/components/Layout/Center.svelte';
    import Breaker from '$lib/components/Layout/Breaker.svelte';
    import Modal from 'svelte-simple-modal';
    import CreateProduct from '../Buttons/CreateProduct.svelte';
    import EditProduct from '../Buttons/EditProduct.svelte';
    import products from '$lib/stores/products';

    const viewPage = (id) => page.update(() => id);
</script>

<Dropdown text="Create Product">
    <Center>
        <Modal>
            <CreateProduct />
        </Modal>
    </Center>
</Dropdown>
<Dropdown text="My Products">
    {#each $products as product}
        <div class="product">
            <div class="flex">
                <div>
                    <p class="title">{product.title}</p>
                    <p class="faint">{product.id}</p>
                </div>
                <div>
                    <Modal>
                        <EditProduct id={product.id} />
                    </Modal>
                </div>
            </div>
        </div>
    {/each}
</Dropdown>

<style>
    p {
        color: #f8f8f8;
        font-size: 14px;
        font-weight: 600;
        padding: 0 8px;
    }
    .product {
        padding: 4px 0;
        .flex {
            align-items: center;
            display: flex;
            justify-content: space-between;
            p {
                margin: 0 0 4px 0;
                &.title {
                    color: #fff;
                    font-weight: 700;
                }
                &.faint {
                    font-weight: 400;
                }
            }
        }
        &:hover {
            background-color: #444;
        }
    }
    :global(.product .flex button) {
        margin-right: 4px;
    }
</style>
