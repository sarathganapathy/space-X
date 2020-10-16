import './less/index.less';
import spaceMissionManager from "./js/spaceMissionManager";

// create initial elements
spaceMissionManager.init();
window.addEventListener("DOMContentLoaded", () => {
    spaceMissionManager.renderInitialCards();
})
