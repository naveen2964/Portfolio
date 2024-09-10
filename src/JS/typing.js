// typing.js
function typeEffect(element, text, speed, callback) {
    let index = 0;
    element.innerHTML = ''; // Clear previous content

    function type() {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            index++;
            setTimeout(type, speed);
        } else if (callback) {
            callback();
        }
    }

    type();
}
