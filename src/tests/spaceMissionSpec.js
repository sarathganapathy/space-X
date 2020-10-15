import SpaceMission from "../js/SpaceMission";

describe("SpaceMission js file", () => {
    // All the spies and global declaration goes here
    let spaceMission;
    let mock;
    beforeEach(() => {
        mock = {
            flightNumber: 1,
            missionName: "test",
            ids: [1, 2],
            launchYear: "2004",
            isLaunchSuccessful: true,
            isLandingSuccessful: true,
            imageURL: "temp.jpg"
        }
        spaceMission = new SpaceMission(mock);
    })
    describe("SpaceMission Class", () => {
        describe("Space mission constructor", () => {
            it("initialize constructor variables", () => {
                expect(spaceMission._flightNumber).toBe(1);
                expect(spaceMission._missionName).toBe("test");
                expect(spaceMission._ids).toEqual([1, 2]);
                expect(spaceMission._launchYear).toBe("2004");
                expect(spaceMission._isLaunchSuccessful).toBe(true);
                expect(spaceMission._isLandingSuccessful).toBe(true);
                expect(spaceMission._imageURL).toBe("temp.jpg");
            });
        });
        describe("Space mission getFlightNumber", () => {
            it("get the flight number", () => {
                expect(spaceMission.getFlightNumber()).toBe(1);
            });
        });
        describe("Space mission getMissionIds", () => {
            it("get the mission ids", () => {
                expect(spaceMission.getMissionIds()).toEqual([1, 2]);
            });
        });
        describe("Space mission getMissionName", () => {
            it("get the mission name", () => {
                expect(spaceMission.getMissionName()).toBe("test");
            });
        });
        describe("Space mission getLaunchYear", () => {
            it("get the launch year", () => {
                expect(spaceMission.getLaunchYear()).toBe("2004");
            });
        });
        describe("Space mission isLaunchSuccessful", () => {
            it("is launch successful", () => {
                expect(spaceMission.isLaunchSuccessful()).toBe(true);
            });
        });
        describe("Space mission isLandingSuccessful", () => {
            it("is landing successful", () => {
                expect(spaceMission.isLandingSuccessful()).toBe(true);
            });
        });
        describe("Space mission getImageURL", () => {
            it("get image url", () => {
                expect(spaceMission.getImageURL()).toBe("temp.jpg");
            });
        });
    });
});