import { writable } from 'svelte/store';

export default writable({ custom: `html {\n    height: 100%;\n}\n\nbody {\n    font-family: "Segoe UI", Arial, sans-serif;\n    margin: 0;\n    min-height: 100%;\n}\n\n.container {\n    display: flex;\n    min-height: 40px;\n    width: 100%;\n}\n\n.item {\n    align-items: center;\n    display: flex;\n    height: 100%;\n   width: 100%;\n}`, generated: [], });
