/**
 * @constant
 * @def default props 
 */
const defaultProps = {
    ids: [],
    launchYear: "",
    isLaunchSuccessful: false,
    isLandingSuccessful: false
}

/**
 * @class SpaceMission
 * @def class for space mission 
 */
export default class SpaceMission {
    /**
     * @constructor
     * @param {Object} props - properties 
     [
        * @param {Number} flightNumber - flightNumber
        * @param {String} missionName - mission name
        * @param {String} ids - mission id's
        * @param {String} launchYear - mission launch year
        * @param {Boolean} isLaunchSuccessful - is mission launch successful
        * @param {Boolean} isLandingSuccessful - is  mission landing successful
     ]
     
     */
    constructor({
        flightNumber,
        missionName = "",
        ids = [],
        launchYear = "",
        isLaunchSuccessful = false,
        isLandingSuccessful = false,
        imageURL = ""
    } = defaultProps) {
        this._flightNumber = flightNumber;
        this._missionName = missionName;
        this._ids = ids;
        this._launchYear = launchYear;
        this._isLaunchSuccessful = isLaunchSuccessful;
        this._isLandingSuccessful = isLandingSuccessful;
        this._imageURL = imageURL;
    }

    /**
     * @def get flight number
     * @returns {String} flight number
     */
    getFlightNumber() {
        return this._flightNumber;
    }

    /**
     * @def get mission Ids
     * @returns {String} mission ids
     */
    getMissionIds() {
        return this._ids;
    }

    /**
     * @def get mission name
     * @returns {String} mission name
     */
    getMissionName() {
        return this._missionName;
    }

    /**
     * @def get launch year
     * @returns {String} launch year
     */
    getLaunchYear() {
        return this._launchYear;
    }

    /**
     * @def is mission launch successful
     * @returns {Boolean} successful launch status
     */
    isLaunchSuccessful() {
        return this._isLaunchSuccessful;
    }

    /**
     * @def is mission landing successful
     * @returns {Boolean} successful landing status
     */
    isLandingSuccessful() {
        return this._isLandingSuccessful;
    }

    /**
     * @def function to get image URL
     * @returns {String} successful landing status
     */
    getImageURL() {
        return this._imageURL;
    }
};