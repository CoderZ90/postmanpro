// Hiding ParameterBox
let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = 'none';

// Utilies Function
// 1. Function to get DOM element from string
function getElementFromString(string) {
	let div = document.createElement('div');
	div.innerHTML = string;
	return div.firstElementChild;
}

// Initialize No. of parameters
let addedParamsCount = 0;

// If the user parameter box hide the json box
let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
	document.getElementById('requestJsonBox').style.display = 'none';
	document.getElementById('parametersBox').style.display = 'block';
});

// If the user json box hide the params box
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
	document.getElementById('parametersBox').style.display = 'none';
	document.getElementById('requestJsonBox').style.display = 'block';
});

// if the user click on the add button
let addParam = document.getElementById('addParam');
addParam.addEventListener('click', () => {
	let params = document.getElementById('parameters');
	let string = `<div class="flex flex-wrap ml-16">
			<div class="p-2 w-1/2">
				<div class="relative">
					<label for="parameterKey${addedParamsCount + 2}" class="leading-7 text-md text-gray-400">Parameter ${addedParamsCount + 2}</label>
					<input type="text" id="parameterKey${addedParamsCount + 2}" class="w-full bg-gray-600 bg-opacity-40 rounded border border-gray-600 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-10 transition-colors duration-200 ease-in-out"
						placeholder="Enter Parameter ${addedParamsCount + 2} Key" autocomplete="off">
				</div>
			</div>
			<div class="p-2 w-1/2">
				<div class="relative">
					<label for="parameterValue${addedParamsCount + 2}" class="leading-7 text-md text-gray-400">Parameter ${addedParamsCount + 2} Value</label>
					<input type="text" id="parameterValue${addedParamsCount + 2}" name="email"
						class="w-full bg-gray-600 bg-opacity-40 rounded border border-gray-600 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-10 transition-colors duration-200 ease-in-out"
						placeholder="Enter Parameter ${addedParamsCount + 2} Value" autocomplete="off">
				</div>
			</div>
				<div class="addBtnContainer">
					<button class="deleteParam addBtn rounded">Delete</button>
				</div>
			</div>`;
	// Converting The Element to DOM Node
	let paramsDiv = document.getElementById('params');
	let paramElement = getElementFromString(string);
	paramsDiv.appendChild(paramElement);
	// EventLister for delete button
	let deleteParam = document.getElementsByClassName('deleteParam');
	for (item of deleteParam) {
		item.addEventListener('click', (e) => {
			// Todo: Add a confirmation Box to confirm Deletion
			e.target.parentElement.parentElement.remove();
		});
	}

	addedParamsCount++;
});

// if the user click on the send button
let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
	// Showing Loading... In Textarea
	document.getElementById('responseJsonText').placeholder = 'Please Wait Fetching response...';
	// Fetch All The Value Entered By User
	let url = document.getElementById('url').value;
	let requestType = document.querySelector("input[name='requestType']:checked").value;
	let contentType = document.querySelector("input[name='contentType']:checked").value;

	// If user has used params option, Collect Data from Parameter
	if (contentType == 'params') {
		data = {};
		for (let i = 0; i < addedParamsCount + 1; i++) {
			if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
				let key = document.getElementById('parameterKey' + (i + 1)).value;
				let value = document.getElementById('parameterValue' + (i + 1)).value;
				data[key] = value;
			}
		}
		data = JSON.stringify(data);
	} else {
		data = document.getElementById('requestJsonText').value;
	}

	// Log all the values in the console
	console.log("URL is ", url);
	console.log("requestType is ", requestType);
	console.log("contentType is ", contentType);
	console.log("data is ", data);

	// Fetching the response from the server
	if (requestType == 'GET') {
		fetch(url, {
			method: 'GET'
		})
			.then(response => response.text())
			.then((text) => {
				document.getElementById('responseJsonText').value = text;
			});
	} else {
		fetch(url, {
			method: 'POST',
			body: data,
			headers: {
				"Content-Type": 'application/json; charset=UTF-8'
			}
		})
			.then(response => response.text())
			.then((text) => {
				document.getElementById('responseJsonText').value = text;
			});
	}

});