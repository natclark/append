export default class ShortcutMenu {
    constructor() {
        // * The text currently selected by the user:
        this.selectedText = ``;

        // * Styling for the shortcut menu:
        this.shortcutStyles = `
            .append-shortcutMenu {
                /*TODO*/
            }

            .append-shortcutMenu.append-shortcutMenu--active {
                /*TODO*/
            }

            .append-shortcutMenu__items {
                list-style: none;
                margin: 0;
                padding: 0;
                /*TODO*/
            }

            .append-shortcutMenu__item {
                /*TODO*/
            }

            .append-shortcutMenu__item:last-child {
                /*TODO*/
            }
        `;

        // * Markup for the shortcut menu:
        this.shortcutMarkup = `
            <ul class="append-shortcutMenu__items">
                <li class="append-shortcutMenu__item">Bold</li>
                <li class="append-shortcutMenu__item">Italic</li>
                <li class="append-shortcutMenu__item">Underline</li>
                <li class="append-shortcutMenu__item">Strike</li>
                <li class="append-shortcutMenu__item">Highlight</li>
                <li class="append-shortcutMenu__item">Link</li>
            </ul>
        `;
    }
};
