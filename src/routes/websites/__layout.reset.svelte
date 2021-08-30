<script>
    import '$lib/websites/global.scss';
</script>

<div class="container">
    <nav class="navbar">
        <a class="navbar__logo" href="/" draggable="false" sveltekit:prefetch>
            <img src="/logo.svg" height="32px" width="32px" alt="Append" draggable="false">
            <span>Append</span>
        </a>
        <button class="navbar__button" draggable="false">Connect Wallet</button>
    </nav>
    <slot />
</div>

<style>
    .container {
        display: grid;
        grid-template-columns: 1fr min(1000px, 100%) 1fr;
        >* {
            grid-column: 2;
        }
        .break {
            grid-column: 1 / -1;
            width: 100%;
        }
    }
    a {
        text-decoration: none;
        &:focus {
            outline: 0;
        }
    }
    .navbar {
        align-items: center;
        display: flex;
        height: 100px;
        justify-content: space-between;
        .navbar__logo {
            align-items: center;
            color: #000;
            display: flex;
            span {
                color: #fff;
                font-size: 18px;
                margin-left: 8px;
            }
        }
        .navbar__button {
            background-color: rgba(65, 105, 225, .1);
            border: 0;
            border-radius: 1px;
            color: #4169e1;
            font-weight: 600;
            line-height: 1.3;
            padding: 10px 20px;
            &:hover {
                opacity: .9;
            }
        }
    }
</style>
