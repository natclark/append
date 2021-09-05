<script context="module">
    import { browser, dev } from '$app/env';
    export const hydrate = dev;
    export const router = browser;
    export const prerender = true;
</script>

<svelte:head>
    <link rel="stylesheet" type="text/css" href="/css/static.css">
</svelte:head>

<div class="container">
    <nav class="navbar">
        <a class="navbar__logo" href="/" draggable="false" sveltekit:prefetch>
            <img src="/logo.svg" height="32px" width="32px" alt="Append" draggable="false">
            <span>Append</span>
        </a>
        <div class="navbar__right">
            <a class="navbar__link" href="/docs/" draggable="false" sveltekit:prefetch>Docs</a>
            <a class="navbar__link" href="/faq/" draggable="false" sveltekit:prefetch>FAQ</a>
            <a class="navbar__button" href="/websites/" draggable="false" sveltekit:prefetch>Launch App</a>
        </div>
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
        .navbar__right {
            align-items: center;
            display: inline-flex;
            flex-wrap: wrap;
            gap: 22px;
            justify-content: flex-end;
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
    }
    section {
        h1 {
            font-size: 24px;
            line-height: 1.3;
            margin-bottom: 60px;
        }
        .cta {
            background-color: rgba(65, 105, 225, .1);
            border-radius: 1px;
            color: #4169e1;
            font-size: 16px;
            font-weight: 600;
            line-height: 1.5;
            padding: 9px 18px;
            &:hover {
                opacity: .9;
            }
        }
        h2 {
            font-size: 18px;
            margin-top: 60px;
        }
        p {
            font-size: 14px;
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
        .social svg {
            height: 96px;
            width: 96px;
        }
    }
    .columns {
        display: block;
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
        &.columns--mobile {
            display: flex;
            justify-content: space-between;
        }
    }
    .text-center {
        text-align: center;
    }
    footer {
        margin-top: 200px;
    }
    @media screen and (min-width: 1024px) {
        section {
            h1 {
                font-size: 48px;
            }
            .cta {
                font-size: 22px;
                padding: 18px 36px;
            }
            h2 {
                font-size: 36px;
            }
            p {
                font-size: 18px;
            }
            .social svg {
                height: 192px;
                width: 192px;
            }
        }
        .columns {
            display: flex;
            justify-content: space-between;
        }
    }
</style>
