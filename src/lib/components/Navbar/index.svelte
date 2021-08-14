<script>
    import ButtonPublish from './ButtonPublish.svelte';

    // TODO let title = `Append`;
</script>

<nav class="flex">
    <div class="flex container">
        <div class="flex container__left">
            <a href="/" draggable="false" sveltekit:prefetch>Append</a>
        </div>
        <!--
            TODO
            <div class="flex container__center">
                <div>
                    <label for="page">Page:</label>
                    <select id="page">
                        <option>/</option>
                    </select>
                </div>
                <div class="flex">
                    <h1 contenteditable="true">{title}</h1>
                    <button>
                        <svg version="1.1" x="0px" y="0px" viewBox="0 0 117.74 122.88" style="enable-background:new 0 0 117.74 122.88" xml:space="preserve" width="16px" height="16px">
                            <g>
                                <path fill="#ddd" fill-rule="evenodd" clip-rule="evenodd" d="M94.62,2c-1.46-1.36-3.14-2.09-5.02-1.99c-1.88,0-3.56,0.73-4.92,2.2L73.59,13.72l31.07,30.03l11.19-11.72 c1.36-1.36,1.88-3.14,1.88-5.02s-0.73-3.66-2.09-4.92L94.62,2L94.62,2L94.62,2z M41.44,109.58c-4.08,1.36-8.26,2.62-12.35,3.98 c-4.08,1.36-8.16,2.72-12.35,4.08c-9.73,3.14-15.07,4.92-16.22,5.23c-1.15,0.31-0.42-4.18,1.99-13.6l7.74-29.61l0.64-0.66 l30.56,30.56L41.44,109.58L41.44,109.58L41.44,109.58z M22.2,67.25l42.99-44.82l31.07,29.92L52.75,97.8L22.2,67.25L22.2,67.25z"></path>
                            </g>
                        </svg>
                    </button>
                </div>
            </div>
        -->
        <div class="flex container__right">
            <ButtonPublish />
        </div>
    </div>
</nav>

<style>
    nav {
        background-color: #444;
        border-bottom: 1px solid #111;
        height: 40px;
        padding: 0 8px;
        width: 100vw;
        a, label {
            color: #fff;
        }
        a {
            text-decoration: none;
            &:hover {
                opacity: .8;
            }
        }
        .flex {
            align-items: center;
            display: flex;
        }
        .container {
            height: 100%;
            justify-content: space-between;
            margin: 0;
            padding: 0;
            .container__left {
                justify-content: flex-start;
                max-width: calc((100vw - 16px) / 3);
                width: 100%;
            }
            .container__center {
                justify-content: space-evenly;
                max-width: calc((100vw - 16px) / 3);
                width: 100%;
                h1 {
                    color: #fff;
                    font-size: 16px;
                    font-weight: 400;
                }
                button {
                    height: 16px;
                    margin-left: 8px;
                    width: 16px;
                    svg {
                        height: 16px;
                        width: 16px;
                    }
                    &:hover svg path {
                        fill: #f8f8f8;
                    }
                }
            }
            .container__right {
                justify-content: flex-end;
                max-width: calc((100vw - 16px) / 3);
                width: 100%;
            }
        }
    }
</style>
