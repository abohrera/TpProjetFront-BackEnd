const form = document.querySelector("form")

form.addEventListener("submit", (e) => {
	e.preventDefault()
	const email = form.email.value.trim();
	const userName = form.userName.value.trim();
	console.log('Email:', email, 'UserName:', userName);
	try {
		validateEmail(email);
		validateName(userName);
	} catch (error) {
		showError(error);
		return;
		
	}
	const formdata = {
		email,
		userName,
	};
	logIn(formdata)
	//console.log(formdata)
})
/* window.loggedIn = false
// input validation
function checkLogIn() {

} */

checkLogIn()
function validateName(input) {
	if (!input || input.trim() === "") {
		throw new Error("L'user name est vide !")
	}

	const alphanumericRegex = /^[a-zA-Z0-9]+$/
	if (!alphanumericRegex.test(input)) {
		throw new Error("L'entrée doit contenir uniquement des caractères alphanumériques.");
	}
}

function validateEmail(input) {
	if (!input || input.trim() === "") {
		throw new Error("L'addresse e-mail est vide")
	}

	const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
	if (!emailRegex.test(input)) {
		throw new Error("L'entrée doit contenir uniquement des caractères alphanumériques.");
	}
}

function showError(error) {
	document.querySelector(".alert").innerText = error
	document.querySelector(".alert").classList.remove("d-none")
	setTimeout(() => {
		document.querySelector(".alert").classList.add("d-none")
	}, 2100)
}
function logIn(formdata) {
	const url = "http://localhost:3000/api/users/login"
	fetch(url, {
		method: "POST",
		headers: {
			"x-api-key": "secret_phrase_here",
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify(formdata),
	})
		.then((res) => {
			if (!res.ok) {
				throw new Error("Identifiants incorrects")
			}
			return res.json().then((data) => {
				console.log(data)
				localStorage.setItem("_id", data._id);
				localStorage.setItem("token", data.token);
				localStorage.setItem("img", data.userImg);
				window.location.pathname = "/";
			})
		})
		.catch((error) => {
			showError(error);
		});
}