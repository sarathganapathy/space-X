/**
 * Merge default props and props passed to component
 * @param {Object} defaultProps - default props
 * @param {Object} props - props
 * @returns {Object} return merged new object
 */
const mergeProps = (defaultProps, props) => Object.assign({}, defaultProps, props);

/**
 * @class Component
 * @desc Base class. All the ui control class should extend this class.
 */
export default class Component {
    /**
     * @constructor
     * @param {Object} props - properties
     */
    constructor(props = {}) {
        // private variables
        this._props = mergeProps(this.constructor.defaultProps || {}, props);
        this.init();
    }

    /**
     * Get the prop value from key
     * @param {String} key 
     * @returns {*} returns the prop value
     */
    getProp(key) {
        return this._props[key];
    }

    /**
     * @def All the initialization should be implemented in this function
     * @returns {undefined} returns does not return any value
     */
    init() {

    }

    /**
     * @def All the data loading should be implemented in this function
     * @returns {undefined} returns does not return any value
     */
    loadData() {

    }

    /**
     * @def Rendering logic should be implemented in this function
     * Overridden method should return an element
     * @returns {undefined} returns does not return any value
     */
    render() {
        throw new Error("Derived class should override render method to provide their own implementation")
    }
}