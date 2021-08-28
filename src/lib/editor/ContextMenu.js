export default class ContextMenu {
    constructor() {
        // * The custom context menu element:
        this.menu = null;

        // * Boolean based on whether the custom context menu is active:
        this.menuVisible = false;

        // * Styling for the custom context menu:
        this.menuStyles = `
            .append-contextMenu {
                background-color: #fff;
                border: 1px solid #dfdfdf;
                box-shadow: 1px 1px 2px #cfcfcf;
                display: none;
                padding: 12px 0;
                position: absolute;
                width: 240px;
                z-index: 999999 !important;
            }

            .append-contextMenu.append-contextMenu--active {
                display: block;
            }

            .append-contextMenu__items {
                list-style: none;
                margin: 0;
                padding: 0;
            }

            .append-contextMenu__item {
                display: block;
                margin-bottom: 4px;
            }

            .append-contextMenu__item:last-child {
                margin-bottom: 0;
            }
        `;

        // * Markup for the custom context menu:
        this.menuMarkup = `<ul class="append-contextMenu__items"></ul>`;

        // * Options for the custom context menu:
        this.menuOptions = [];
    }

    // * Shows the custom context menu, if there's any options available:
    show() {
        if (!!this.menuVisible) {
            this.menuVisible = true;
            let listCounter = 0;
            this.menuOptions.forEach((option) => {
                this.menu.innerHTML = option.markup;
                this.menu.querySelectorAll(`li`)[listCounter].addEventListener(`click`, option.event);
                listCounter++;
            });
            this.menuOptions.length > 0 && (this.menu.className = `append-contextMenu append-contextMenu--active`);
        }
    }

    // * Positions the custom context menu at the cursor:
    move(dom, e) {
        if (this.menu !== null) {
            let offsetX = 0;
            let offsetY = 0;

            if (e.pageX || e.pageY) {
                offsetX = e.pageX;
                offsetY = e.pageY;
            } else if (e.clientX || e.clientY) {
                offsetX = e.clientX + dom.body.scrollLeft + dom.documentElement.scrollLeft;
                offsetY = e.clientY + dom.body.scrollTop + dom.documentElement.scrollTop;
            }

            const menuWidth = this.menu.offsetWidth + 4;
            const menuHeight = this.menu.offsetHeight + 4;

            this.menu.style.left = ((window.innerWidth - offsetX) < menuWidth) ? `${window.innerWidth - menuWidth}px` : `${offsetX}px`;
            this.menu.style.top = ((window.innerHeight - offsetY) < menuHeight) ? `${window.innerHeight - menuHeight}px` : `${offsetY}px`;
        }
    }

    // * Hides the custom context menu:
    hide() {
        if (this.menu !== null) {
            this.menuVisible = false;
            this.menu.className = `append-contextMenu`;
        }
    }
};
