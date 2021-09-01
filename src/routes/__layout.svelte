<script context="module">
    import { browser, dev } from '$app/env';
    export const hydrate = dev;
    export const router = browser;
    export const prerender = true;
</script>

<div class="container">
    <nav class="navbar">
        <a class="navbar__logo" href="/" draggable="false" sveltekit:prefetch>
            <img src="/logo.svg" height="32px" width="32px" alt="Append" draggable="false">
            <span>Append</span>
        </a>
        <a class="navbar__link" href="/docs/" draggable="false" sveltekit:prefetch>Docs</a>
        <a class="navbar__button" href="/websites/" draggable="false" sveltekit:prefetch>Launch App</a>
    </nav>
    <slot />
    <footer aria-hidden="true"></footer>
</div>

<style global>
    .container {
        display: grid;
        grid-template-columns: 1fr min(1000px, 100%) 1fr;
        > * {
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
                font-size: 18px;
                margin-left: 8px;
            }
        }
        .navbar__link {
            color: #111;
        }
        a:hover {
            opacity: .8;
        }
        .navbar__button {
            background-color: rgba(65, 105, 225, .1);
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
    section {
        h1 {
            font-size: 48px;
            line-height: 1.3;
            margin-bottom: 60px;
        }
        .cta {
            background-color: rgba(65, 105, 225, .1);
            border-radius: 1px;
            color: #4169e1;
            font-size: 22px;
            font-weight: 600;
            line-height: 1.5;
            padding: 18px 36px;
            &:hover {
                opacity: .9;
            }
        }
        h2 {
            font-size: 36px;
            margin-top: 60px;
        }
        p {
            font-size: 18px;
        }
        .wrapper {
            align-items: center;
            display: flex;
            justify-content: center;
        }
        .image {
            box-shadow: rgba(50, 50, 93, .25) 0 13px 27px -5px, rgba(0, 0, 0, .3) 0 8px 16px -8px;
            margin-top: 20px;
            max-width: 1000px;
        }
    }
    .columns {
        display: flex;
        justify-content: space-between;
        .column {
            width: 100%;
            &.column--short {
                width: 65%;
            }
        }
        &.columns--center {
            align-items: center;
        }
        &.columns--reverse {
            flex-direction: reverse;
        }
    }
    .text-center {
        text-align: center;
    }
    footer {
        margin-top: 200px;
    }
</style>

