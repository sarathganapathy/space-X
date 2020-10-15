import Component from "./Component";
import ActionButton from "./ActionButton";
import {
    createTextNode,
    createElement
} from "../helpers/elementHelper";

/**
 * @desc Function to generate years from range
 * @param {Number} start - starting year
 * @param {Number} end - ending year
 * @returns {Array} array of years
 */
const generateYearsFromRange = (start, end) =>
    Array.from({ length: (end - start) }, (_, index) => index + start);

/**
 * @desc This functions returns launch year buttons.
 * @param {Function} clickHandlerCallback - callback for button click handler
 * @returns {Array<HTMLElement>} return array of buttons.
 */
const getLaunchYearOptions = (clickHandlerCallback) => generateYearsFromRange(2006, 2021)
    .map(year =>
        new ActionButton({ display: year, key: year, clickHandlerCallback })
    );

/**
 * @desc This functions returns successful launch / landing  options status in form of button.
 * @param {Function} clickHandlerCallback - callback for button click handler
 * @returns {Array<HTMLElement>} return array of buttons.
 */
const getStatusOptions = (clickHandlerCallback) => ["true", "false"]
    .map(status =>
        new ActionButton({ display: status, key: status, clickHandlerCallback })
    );

/**
 * @desc This functions deselect previous selected button.
 * @param {Array} buttons - array of buttons
 * @param {String} selectedButtonKey - selected button key
 * @param {Boolean} isSelected - is button selected
 * @returns {undefined} return array of buttons.
 */
const deselectOtherButtons = (buttons, selectedButtonKey, isSelected) => {
    buttons.forEach((button => {
        button.setIsSelected(button.getProp("key") === selectedButtonKey && isSelected)
    }));
}

/**
 * Function to create launch year layout
 * @param {Array} launchYearFilters - array of action button containing details of launch year filters
 * @returns { HTMLElement } element containing launch year sub layout
 */
const createLaunchYearLayout = (launchYearFilters) => createElement(
    "section", {
        class: "action-layout-sub-layout"
    }, [
        createElement(
            "h4", {
                class: "action-layout-sub-layout-header"
            },
            createTextNode("Launch Year")
        ),
        createElement("hr"),
        createElement(
            "div", {
                class: "action-layout-sub-layout-body",
                role: "group",
                "aria-label": "Launch year selection"
            },
            launchYearFilters.map(year => year.render())
        )
    ]
)

/**
 * Function to create launch status layout
 * @param {Array} launchStatusFilters - array of action button containing details of launch status filters
 * @returns { HTMLElement } element containing launch status sub layout
 */
const createLaunchStatusLayout = (launchStatusFilters) => createElement(
    "section", {
        class: "action-layout-sub-layout"
    }, [
        createElement(
            "h4", {
                class: "action-layout-sub-layout-header"
            },
            createTextNode("Successful Launch")
        ),
        createElement("hr"),
        createElement(
            "div", {
                class: "action-layout-sub-layout-body",
                role: "group",
                "aria-label": "Successful launching selection"
            },
            launchStatusFilters.map(year => year.render())
        )
    ]
)

/**
 * Function to create landing status layout
 * @param {Array} landingStatusFilters - array of action button containing details of landing status filters
 * @returns { HTMLElement } element containing landing status sub layout
 */
const createLandingStatusLayout = (landingStatusFilters) => createElement(
    "section", {
        class: "action-layout-sub-layout"
    }, [
        createElement(
            "h4", {
                class: "action-layout-sub-layout-header"
            },
            createTextNode("Successful Landing")
        ),
        createElement("hr"),
        createElement(
            "div", {
                class: "action-layout-sub-layout-body",
                role: "group",
                "aria-label": "Successful landing selection"
            },
            landingStatusFilters.map(year => year.render())
        )
    ]
)

/**
 * @class ActionLayout
 * @desc Class for handling the action layout.
 */
export default class ActionLayout extends Component {
    /**
     * @static
     * @def default props
     */
    static defaultProps = {
        yearClickHandler: () => {},
        launchClickHandler: () => {},
        landingClickHandler: () => {}
    };

    /**
     * @override
     */
    init() {
        this.yearClickHandler = this.yearClickHandler.bind(this);
        this.launchClickHandler = this.launchClickHandler.bind(this);
        this.landingClickHandler = this.landingClickHandler.bind(this);

        this._launchYearFilters = getLaunchYearOptions(this.yearClickHandler);
        this._launchStatusFilters = getStatusOptions(this.launchClickHandler);
        this._landingStatusFilters = getStatusOptions(this.landingClickHandler);
    }

    /**
     * @def function to handle year click
     * @param {Event} event - event object
     * @param {String} key - key
     * @param {Boolean} isSelected - is button selected
     * @returns {undefined} - returns undefined
     */
    yearClickHandler(event, key, isSelected) {
        deselectOtherButtons(this._launchYearFilters, key, isSelected);
        this.getProp("yearClickHandler")(event, key, isSelected);
    }

    /**
     * @def function to handle launch status click
     * @param {Event} event - event object
     * @param {String} key - key
     * @param {Boolean} isSelected - is button selected
     * @returns {undefined} - returns undefined
     */
    launchClickHandler(event, key, isSelected) {
        deselectOtherButtons(this._launchStatusFilters, key, isSelected);
        this.getProp("launchClickHandler")(event, key, isSelected);
    }

    /**
     * @def function to handle landing status click
     * @param {Event} event - event object
     * @param {String} key - key
     * @param {Boolean} isSelected - is button selected
     * @returns {undefined} - returns undefined
     */
    landingClickHandler(event, key, isSelected) {
        deselectOtherButtons(this._landingStatusFilters, key, isSelected)
        this.getProp("landingClickHandler")(event, key, isSelected);
    }

    /**
     * @override
     */
    render() {
        return createElement(
            "div", {
                class: "util-background-container action-layout"
            }, [
                createElement(
                    "h3", {
                        class: "action-layout-header"
                    },
                    createTextNode("Filters")
                ),
                createLaunchYearLayout(this._launchYearFilters),
                createLaunchStatusLayout(this._launchStatusFilters),
                createLandingStatusLayout(this._landingStatusFilters)
            ]
        )
    }
}