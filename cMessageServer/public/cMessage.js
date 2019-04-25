"use strict";
(function() {
    const OK_HTTP_STATUS = 200;
    const MULTCHOICES_HTTP_STATUS = 300;
    const NOT_FOUND_HTTP_STATUS = 410;
    const FILE_GONE_HTTP_STATUS = 404;
        window.onload = function() {
            getMessages();
        };

        function getMessages(){
            let url = "http://localhost:3000/messages";
            fetch(url)
                .then(checkStatus)
                .then(function (res) {
                    let json = JSON.parse(res);
                    if (res.success) {
                        clearError();
                    }
                })
                .catch(postError);
        }

        /**
         * This function checks for any common errors that may have occured in fetching data
         * and returns the response text if there are none.
         * @param {Response} response
         */
        function checkStatus(response) {
            if (response.status >= OK_HTTP_STATUS && response.status < MULTCHOICES_HTTP_STATUS) {
                return response.text();
            } else if (response.status === NOT_FOUND_HTTP_STATUS) {
                return Promise.reject(new Error(response.status + ": Message not found in the database"));
            } else if (response.status === FILE_GONE_HTTP_STATUS) {
                return Promise.reject(new Error(response.status + ": File not found"));
            } else {
                return Promise.reject(new Error(response.status + ": " + response.message));
            }
        }

        function postError(error) {
            let errorBanner = document.getElementById("status");
            errorBanner.classList.add("error");
            errorBanner.innerHTML = error.name;
        }

        function clearError() {
            let errorBanner = document.getElementById("status");
            errorBanner.classList.remove("error");
            errorBanner.innerHTML = "";
        }
}) ();