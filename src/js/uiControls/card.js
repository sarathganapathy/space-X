import {
    createTextNode,
    createElement,
    createFragment,
    setAttribute
} from "../helpers/elementHelper";

/**
 * Function to load the original image once image object loads
 * @param { Object } event - event object
 * @returns { undefined } does not returns any value
 */
const imageLoadHandler = (event) => {
    const image = event.target;
    setAttribute(image, "src", image.getAttribute("data-src"));
};

/**
 * Function returns the card row content
 * @param {String} label - row label
 * @param {String} value - row value
 * @returns {Element} Element containing row details
 */
const createCardRow = (label, value) => createElement(
    "div", { class: "image-card-row" }, [
        createElement(
            "h4", { class: "image-card-row-label util-font-label" },
            createTextNode(label)
        ),
        createElement(
            "h4", { class: "image-card-row-value util-font-label util-text-right-align" },
            createTextNode(value)
        )
    ]
);

/**
 * Function returns the card row header content
 * @param {String} display - display value
 * @returns {Element} Element containing row details
 */
const createCardRowHeader = (display) => createElement(
    "div", { class: "image-card-row" }, [
        createElement(
            "h4", { class: "image-card-row-value util-font-label" },
            createTextNode(display)
        )
    ]
);

/**
 * Function returns the card row list content
 * @param {String} items - list items
 * @returns {Element} Element containing row details
 */
const createCardRowList = (label, items) => createElement(
    "div", { class: "image-card-row-list" }, [
        createElement(
            "h4", { class: "image-card-row-label util-font-label" },
            createTextNode(label)
        ),
        createElement(
            "ul", {},
            items.map(item => createElement(
                "li", { class: "image-card-row-value util-font-label" }, createTextNode(item)))
        )
    ]
);

/**
 * returns the card image element
 * @param {String} imageURL - show image url
 * @param {String} name - mission name
 * @returns {Element} returns the card image
 */
const createCardImage = (imageURL, name) => createElement(
    "div", { class: "image-card-media-container" },
    createElement(
        "img", {
            class: "image-card-media",
            "data-src": imageURL,
            alt: name,
            src: "./assets/loading-indicator.jpg",
            handlers: {
                load: imageLoadHandler
            }
        }
    )
);

/**
 * returns the card content element
 * @param {Object} card - card object
 * @returns {Element} returns fragment element containing card rows 
 */
const createCardContent = (card) =>
    createFragment([
        createCardRowHeader(`${card.getMissionName()} #${card.getFlightNumber()}`),
        createCardRowList("Mission ids:", card.getMissionIds()),
        createCardRow("Launch Year:", card.getLaunchYear()),
        createCardRow("Successful Launch:", card.isLaunchSuccessful()),
        createCardRow("Successful Landing:", card.isLandingSuccessful())
    ]);


/**
 * @desc This functions returns image card.
 * @param {Array} cards - array of card
 * @returns {HTMLElement} return card element.
 */
const createImageCard = (card) => createElement(
    "article", { class: "image-card-root card-layout-body-content-items", tabindex: 0 },
    createElement(
        "div", { class: "image-card-inner-layer" }, [
            createCardImage(card.getImageURL(), card.getMissionName()),
            createElement(
                "div", { class: "image-card-content" },
                createCardContent(card)
            )
        ]
    )
);

export default createImageCard;