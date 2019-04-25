"use strict";
(function () {
	const OK_HTTP_STATUS = 200;
	const MULTCHOICES_HTTP_STATUS = 300;
	const NOT_FOUND_HTTP_STATUS = 410;
	const FILE_GONE_HTTP_STATUS = 404;
	const NO_CHANGE = 304;

	let username = "";
	window.onload = function () {
		getMessages();
	};

	function getMessages() {
		let url = "http://localhost:3000/messages";
		fetch(url)
			.then(checkStatus)
			.then(function (response) {
				let responseJSON = JSON.parse(response);
				console.log(responseJSON);
				
				if (responseJSON.success) {
					clearError();

					let messages = document.getElementById("messages");
					clearChildren(messages);

					let messageData = responseJSON.messageData;

					for (let i = 0; i < messageData.length; i++) {
						let newMessage = document.createElement("div");
						if (messageData[i].username === username) {
							newMessage.className = "user";
						} else {
							newMessage.className = "other";
						}
					}
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
		if ((response.status >= OK_HTTP_STATUS && response.status < MULTCHOICES_HTTP_STATUS) || response.status === NO_CHANGE) {
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

	function clearChildren(node) {
		while (node.firstChild) {
			node.removeChild(node.firstChild);
		}
	}
})();