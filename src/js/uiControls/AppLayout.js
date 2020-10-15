import ActionLayout from "./ActionLayout";
import cardLayout from "./cardLayout";
import Component from "./Component";

import {
    createTextNode,
    createElement
} from "../helpers/elementHelper";

/**
 * @desc Function to create the header.
 * @returns {HTMLElement} return header element.
 */
const createHeader = () => createElement(
    "header", {},
    createElement("h3", { class: "app-header" }, createTextNode("SpaceX Launch Programs"))
);

/**
 * @desc Function to create the footer.
 * @returns {HTMLElement} return footer element.
 */
const createFooter = () => createElement(
    "footer", { class: "app-footer" }, [
        createElement("h3", { class: "app-footer-label" }, createTextNode("Developed By:")),
        createElement("h3", { class: "app-footer-display" }, createTextNode("Ganapathy PM"))
    ]
);

/**
 * @desc Function to create body.
 * @param { ActionLayout } actionLayout - instance of action layout
 * @param { HTMLElement } cardLayoutElementContainer - card layout element container
 * @returns {HTMLElement} return body element.
 */
const createBody = (actionLayout, cardLayoutElementContainer) => createElement(
    "main", { class: "app-body" }, [
        createElement(
            "section", { class: "app-body-action-container" },
            actionLayout.render()
        ),
        cardLayoutElementContainer
    ],
);

/**
 * @desc Function to create card layout container.
 * @returns {HTMLElement} return card container.
 */
const createCardContainer = () => createElement(
    "section", { class: "app-body-card-container util-background-container" }, createElement(
        "h1", { class: "app-body-card-container-loader" }, createTextNode("Loading....")
    )
);

/**
 * @class AppLayout
 * @desc class for handling application layout.
 */
export default class AppLayout extends Component {
    /**
     * @static
     * @def default props
     */
    static defaultProps = {
        handlers: {
            yearClickHandler: () => {},
            launchClickHandler: () => {},
            landingClickHandler: () => {}
        }
    };

    /**
     * @override
     */
    init() {
        this._actionLayout = new ActionLayout(this.getProp("handlers"))
        this._cardsLayout = createCardContainer();
    }

    /**
     * Function to replace the cards from card layout
     * @param {Array} cards - array of cards
     * @returns {undefined} returns undefined
     */
    replaceCards(cards) {
        this._cardsLayout.innerHTML = "";
        this._cardsLayout.appendChild(cardLayout(cards));
    }

    /**
     * @override
     */
    render() {
        return createElement(
            "div", {
                class: "app-root util-background-root-container"
            }, [
                createHeader(),
                createBody(this._actionLayout, this._cardsLayout),
                createFooter()
            ]
        )
    }
};