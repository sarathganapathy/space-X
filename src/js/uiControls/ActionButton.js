import Component from "./Component";
import {
    createTextNode,
    createElement,
    setAttribute
} from "../helpers/elementHelper";

/**
 * @class ActionButton
 * @desc class for action button.
 */
export default class ActionButton extends Component {
    /**
     * @static
     * @def default props
     */
    static defaultProps = {
        isSelected: false,
        display: "",
        key: "",
        clickHandlerCallback: () => {}
    };

    /**
     * @override
     */
    init() {
        this._isSelected = this.getProp("isSelected");
        this.clickHandler = this.clickHandler.bind(this);
        this._buttonElement = createElement(
            "button", { class: "action-button", "aria-selected": `${this.isSelected()}`, handlers: { click: this.clickHandler } },
            createTextNode(this.getProp("display"))
        )
    }

    /**
     * @def set the selection status of button
     * @param {Boolean} status - selection status
     * @returns {undefined} - returns undefined
     */
    setIsSelected(status) {
        this._isSelected = status;
        setAttribute(this._buttonElement, "aria-selected", status)
    }

    /**
     * @def function to check, is button selected
     * @returns {Boolean} - returns selection status
     */
    isSelected() {
        return this._isSelected;
    }

    /**
     * @def function to handle button click
     * @param {Event} event - event object
     * @returns {undefined} - returns undefined
     */
    clickHandler(event) {
        this._isSelected = !this._isSelected;
        setAttribute(this._buttonElement, "aria-selected", this._isSelected)
        this.getProp("clickHandlerCallback")(event, this.getProp("key"), this._isSelected)
    }

    /**
     * @override
     */
    render() {
        return this._buttonElement;
    }
}