import createCard from "./card";
import {
    createTextNode,
    createElement
} from "../helpers/elementHelper";

/**
 * @desc This functions returns label saying there is no results available.
 * @returns {HTMLElement} return no results found element.
 */
const createNoResultLabel = () => createElement(
    "div", {
        class: "card-layout-body-content-no-results util-header-text"
    },
    createTextNode("No Results Found")
);

/**
 * @desc This functions returns card layout.
 * @param {Array} cards - array of card
 * @returns {HTMLElement} return card layout.
 */
const createCardLayout = (cards) => createElement(
    "div", {
        class: "util-flex-wrap  card-layout"
    },
    cards.length ? cards.map(createCard) : createNoResultLabel()
)

export default createCardLayout;