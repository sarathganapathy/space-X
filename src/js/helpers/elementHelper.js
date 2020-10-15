/**
 * Function to create text node
 * @param {String} display - display value
 * @param {Object} attrs - attributes
 * @returns {Node} text node
 */
const createTextNode = (displayValue, { handlers = {}, ...attrs } = {}) => {
    const textNode = document.createTextNode(displayValue);
    for (let item in attrs) {
        element.setAttribute(item, attrs[item]);
    }
    for (let item in handlers) {
        element.addEventListener(item, handlers[item]);
    }
    return textNode;
}

/**
 * Function to create fragment
 * @param {HTMLElement | Array} child - child element
 * @returns {Node} fragment node
 */

const createFragment = (child) => {
    const fragment = document.createDocumentFragment();
    if (child) {
        if (Array.isArray(child)) {
            child.forEach(item => {
                fragment.appendChild(item);
            })
        } else {
            fragment.appendChild(child);
        }
    }
    return fragment;
};


/**
 * Function to create an element
 * @param {String} type - type of element
 * @param {Object} attrs - attributes
 * @param {HTMLElement | Array} child - child element
 * @returns {HTMLElement} element
 */
const createElement = (type, { handlers = {}, ...attrs } = {}, child) => {
    const element = document.createElement(type);
    for (let item in attrs) {
        element.setAttribute(item, attrs[item]);
    }
    for (let item in handlers) {
        element.addEventListener(item, handlers[item]);
    }
    if (child) {
        if (Array.isArray(child)) {
            child.forEach(item => {
                element.appendChild(item);
            })
        } else {
            element.appendChild(child);
        }
    }
    return element;
}

/**
 * Set the attribute to an element
 * @param {HTMLElement} element 
 * @param {String} attribute - attribute of an element
 * @param {String} value - attribute value
 * @returns { undefined } does not return any value
 */
const setAttribute = (element, attribute, value) => {
    element.setAttribute(attribute, value);
}

export {
    createTextNode,
    createElement,
    createFragment,
    setAttribute
}