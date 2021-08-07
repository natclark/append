let canvas;
let name = `canvas`;
let classList = ``;
const src = `/preview.html`;

const preview = (e) => {
    e.target.style.boxShadow = `rgb(85, 91, 255) 0px 0px 2px`;
};

const reset = (e) => {
    e.target.style.boxShadow = ``;
};

const select = (e) => {
    e.target.style.boxShadow = `rgb(0, 8, 255) 0px 0px 4px`;
};

let items = [
    {
        id: 1,
        text: `Hello World`,
        type: `header`,
    },
    {
        id: 2,
        text: `This is my unstoppable blog.`,
        type: `paragraph`,
    },
];

const load = (e) => {
    var html = window.frames[`canvas`].document.getElementsByTagName(`html`)[0];
    var head = window.frames[`canvas`].document.getElementsByTagName(`head`)[0];
    var body = window.frames[`canvas`].document.getElementsByTagName(`body`)[0];
    let el = null;
    items.forEach((item) => {
        switch (item.type) {
            case `header`:
                el = document.createElement(`h1`);
                el.textContent = item.text;
                break;
            case `paragraph`:
                el = document.createElement(`p`);
                el.textContent = item.text;
                break;
        }
        body.appendChild(el);
    });
};
