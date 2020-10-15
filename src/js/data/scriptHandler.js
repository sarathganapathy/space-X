/**
 * Fetch xml http request
 * @param {String} url - url for request
 * @param {Boolean} isAsync - asynchronous indicator
 * @returns {Promise<Object>} - promise containing results
 */
export const fetchRequest = (url = "", isAsync = true) => new Promise((res, rej) => {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                res({ status: "success", data: JSON.parse(this.responseText) });
            } else {
                rej({ status: "failure", data: null })
            }
        }
    };
    xmlHttp.open("GET", url, isAsync);
    xmlHttp.send();
});