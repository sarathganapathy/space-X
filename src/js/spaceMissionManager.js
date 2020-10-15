import SpaceMission from "./SpaceMission";
import { fetchRequest } from "./data/scriptHandler";
import AppLayout from "./uiControls/AppLayout";

/**
 * @constant
 * @def // Space mission manager to manage space missions
 * Used Modular design pattern using IIFE
 */
const spaceMissionManager = (() => {
    // @private variables
    let missions = [];
    let appLayout = null;
    let launchYear;
    let landingStatus;
    let launchingStatus;

    /**
     * @private
     * @def Function to create mission objects
     * @param {Object} mission - mission object
     * @returns { SpaceMission } instance of space mission
     */
    const createMission = (mission) =>
        new SpaceMission({
            flightNumber: mission.flight_number,
            missionName: mission.mission_name,
            ids: mission.mission_id,
            launchYear: mission.launch_year,
            isLaunchSuccessful: mission.launch_success,
            isLandingSuccessful: landingStatus === "true",
            imageURL: mission.links.mission_patch
        })

    /**
     * @private
     * @def Function to get the data from AJAX request
     * @param {String} year - year of launch
     * @param {String} launchStatus - launch status
     * @param {Boolean} landingStatus - landing status
     * @returns { Array } Array of space missions
     */
    const getData = async(year, launchStatus, landingStatus) => {
        const url = "https://api.spacexdata.com/v3/launches?limit=100"
            .concat(year !== undefined ? `&launch_year=${year}` : "")
            .concat(launchStatus !== undefined ? `&launch_success=${launchStatus}` : "")
            .concat(landingStatus !== undefined ? `&land_year=${landingStatus}` : "");
        try {
            const { data } = await fetchRequest(url);
            return data.map(createMission);
        } catch (error) {
            console.log("error retrieving" + error.toString());
            return [];
        }
    }

    /**
     * @private
     * @def Launch year click handler
     * @param {Object} event - html event
     * @param {String} year - year of launch
     * @param {Boolean} isSelected - selection status
     * @returns { undefined } does not return any value
     */
    const yearClickHandler = async(event, year, isSelected) => {
        launchYear = isSelected ? year : undefined;
        const data = await getData(launchYear, launchingStatus, landingStatus);
        missions = data;
        renderMissions(data);
    }

    /**
     * @private
     * @def Click handler for launch and landing status
     * @param {Object} event - html event
     * @param {Boolean} status - selected status button
     * @param {Boolean} isSelected - selection status
     * @returns { undefined } does not return any value
     */
    const statusClickHandler = (type = "launch") => async(event, status, isSelected) => {
        if (type === "launch") {
            launchingStatus = isSelected ? status : undefined;
        } else {
            landingStatus = isSelected ? status : undefined;
        }
        const data = await getData(launchYear, launchingStatus, landingStatus);
        missions = data;
        renderMissions(data);
    }

    /**
     * @private
     * @def Function to render the application layout at initial load
     * @returns { undefined } does not return any value
     */
    const renderApplication = () => {
        appLayout = new AppLayout({
            handlers: {
                yearClickHandler,
                launchClickHandler: statusClickHandler("launch"),
                landingClickHandler: statusClickHandler("landing")
            }
        });
        document.getElementById("root").appendChild(appLayout.render());
    }

    /**
     * @private
     * @def Function to render the space mission cards initially and on AJAX request
     * @returns { undefined } does not return any value
     */
    const renderMissions = (missions) => {
        appLayout.replaceCards(missions)
    }

    return {
        /**
         * @def function to get the space mission from flight number
         * @param {Number} flightNumber - flight number
         * @returns {Object|undefined} return matched space mission
         */
        getSpaceMission: (flightNumber) => missions.find(mission => mission.getFlightNumber() === parseInt(flightNumber, 10)),
        /**
         * @def function to get all space missions
         * @returns {Array} return all the missions
         */
        getSpaceMissions: () => missions,
        /**
         * @def function to for initial load to render application layout
         * @returns {undefined} does not return anything
         */
        init: renderApplication,
        /**
         * @def function to render initial cards
         * @returns {undefined} does not return anything
         */
        renderInitialCards: async() => {
            const data = await getData();
            missions = data;
            renderMissions(data);
        }
    }
})()

export default spaceMissionManager;