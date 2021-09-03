export default (e, dom) => {
    let width = e.target.offsetWidth;
    let height = e.target.offsetHeight;

    const ripple = dom.createElement(`span`);
    e.target.appendChild(ripple);

    width >= height ? (height = width) : (width = height);

    ripple.style = `height: ${height}px !important; left: ${e.pageX - e.target.offsetLeft - width / 2}px !important; top: ${e.pageY - e.target.offsetTop - height / 2}px !important; width: ${width}px !important;`;

    ripple.classList.add(`ripple`);

    setTimeout(() => e.target.removeChild(ripple), 700);
};
