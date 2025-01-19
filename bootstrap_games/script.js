const gamesList = [
    {
        voiture: "Ferrari LaFerrari",
        Annee: "2013",
        imageUrl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA1qA7to_t9u4rft5ZGEerb4idp0fc5IghOA&s",
        id: 1,
    },
    {
        voiture: "Bugatti Chiron",
        Annee: "2019",
        imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKkU8mmbYu0jLrf4mDCFXyVykqpf8P3crx5w&s",
        id: 2,
    },
    {
        voiture: "Porsche 911",
        Annee: "2022",
        imageUrl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbLor162H2Mrj_jO38rh3AfTNbdXiXOz1Y2Q&s",
        id: 3,
    },
    {
        voiture: "Tesla Model S",
        Annee: "2021",
        imageUrl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNeDn9K7SrSNwXayjUwTuK2lL36wEr7ooZDQ&s",
        id: 4,
    },
    {
        voiture: "Lamborghini Aventador",
        Annee: "2020",
        imageUrl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfHK5413BmTZ80-i3xyDJwLz15wU6B3NCxYw&s",
        id: 5,
    },
    {
        voiture: "McLaren P1",
        Annee: "2024",
        imageUrl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ86_6PkJm666x1sfPhYhcuchzywdj9DdUwUA&s",
        id: 6,
    },
]

function writeDom() {
    gamesList.forEach((game) => {
        const articleContainer = document.querySelector(".row")
        articleContainer.innerHTML += `<article class="col">
            <div class="card shadow-sm">
                <img src="${game.imageUrl}" class="card-img-top" alt="${game.voiture}">
                <div class="card-body">
                    <h3 class="card-title">${game.Annee}</h3>
                    <p class="card-text">${game.voiture}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="btn-group">
                                <button type="button"
                                        class="btn btn-sm btn-outline-secondary view"
                                        data-bs-toggle="modal" data-bs-target="#exampleModal"
                                        data-edit-id="${game.id}"
                                        >View
                                </button>
                                <button type="button"
                                        class="btn btn-sm btn-outline-secondary edit"
                                        data-bs-toggle="modal" data-bs-target="#exampleModal"
                                        data-edit-id="${game.id}"
                                        >Edit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </article>`
    })
}

writeDom()

let editButtons = document.querySelectorAll(".edit")
editButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        editModal(e.target.getAttribute("data-edit-id"))
    })
})

let viewButtons = document.querySelectorAll(".view")
viewButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        viewModal(e.target.getAttribute("data-edit-id"))
    })
})


function modifyModal(modalTitle, modalBody) {
    // Écrire le nom du jeu dans le titre du modal
    document.querySelector(".modal-title").textContent = modalTitle
    // Écrire dans le corps du modal
    document.querySelector(".modal-body").innerHTML = modalBody
    // Écrire dans le footer
    document.querySelector(".modal-footer").innerHTML = `
		<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
			Close
		</button>
		<button type="submit" data-bs-dismiss="modal" class="btn btn-primary">Submit</button>
</form>`
}

function viewModal(gameId) {
	// Trouvez le jeu en fonction de son identifiant
	fetch(`http://localhost:3000/api/cars/${gameId}`, {
		method: "GET",
		headers: {
			"x-api-key": "secret_phrase_here",
			"Content-Type": "application/json",
			Accept: "application/json",
		},
	})
		.then((res) => {
			if (!res.ok) {
				throw new Error("Error with the car with this id")
			}
			return res.json().then((data) => {
				const selectedCar = data
				// passer une image comme corps du modal
				const modalBody = `<img src="${selectedCar.carImage}" alt="${selectedCar.carName}" class="img-fluid" />`
				modifyModal(selectedCar.carName, modalBody)
				// edit footer
				// Écrire dans le footer
				document.querySelector(".modal-footer").innerHTML = `
		<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
			Close
		</button>
</form>`
			});
		})
		.catch((error) =>
			console.error("Erreur lors de la récupération des voitures :", error)
		)
}
/* 
function editModal(gameId) {
    // Trouvez le jeu en fonction de son identifiant
    const result = gamesList.findIndex((game) => game.id === parseInt(gameId))
    // Injectez le formulaire dans le corps du modal
    fetch("./form.html").then((data) => {
        data.text().then((form) => {
            // Modifiez le titre et le corps du modal
            const selectedGame = gamesList[result]
            modifyModal("Mode Edition", form)
            modifyFom({
                Annee: selectedGame.Annee,
                voiture: selectedGame.voiture,
                imageUrl: selectedGame.imageUrl,
            })
            document
                .querySelector('button[type="submit"]')
                //.preventDefault()
                .addEventListener("click", () =>
                    updateGames(Annee.value, voiture.value, imageUrl.value, gameId)
                )
        })
    })
} */

function modifyFom(gameData) {
    const form = document.querySelector("form")
    form.Annee.value = gameData.Annee
    form.voiture.value = gameData.voiture
    form.imageUrl.value = gameData.imageUrl
}

function updateGames(Annee, voiture, imageUrl, gameId) {
    // Trouvez le jeu en fonction de son identifiant
    const index = gamesList.findIndex((game) => game.id === parseInt(gameId))

    gamesList[index].Annee = Annee
    gamesList[index].voiture = voiture
    gamesList[index].imageUrl = imageUrl
    document.querySelector(".row").innerHTML = "" // Nous supprimons toutes les données des jeux dans le DOM.
    writeDom()
    editButtons = document.querySelectorAll(".edit")
    editButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            editModal(e.target.getAttribute("data-edit-id"))
        })
    })

    viewButtons = document.querySelectorAll(".view")
    viewButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            viewModal(e.target.getAttribute("data-edit-id"))
        })
    })
}
function editModal(gameId) {
	// Trouvez le jeu en fonction de son identifiant
	console.log(gameId)
	// fetch car by ID // http://localhost:3000/api/cars/1
	fetch(`http://localhost:3000/api/cars/${gameId}`, {
		method: "GET",
		headers: {
			"x-api-key": "secret_phrase_here",
			"Content-Type": "application/json",
			Accept: "application/json",
		},
	})
		.then((res) => {
			if (!res.ok) {
				throw new Error("Error with the car with this id")
			}
			res.json().then((data) => {
				console.log(data)
				const selectedCar = data

				// Injectez le formulaire dans le corps du modal
				fetch("./form.html").then((data) => {
					console.log(selectedCar)

					data.text().then((form) => {
						// Modifiez le titre et le corps du modal

						modifyModal("Mode Edition", form)
						modifyFom({
							title: selectedCar.carName,
							year: selectedCar.carYear,
							imageUrl: selectedCar.carImage,
						})
						document.querySelector(".form-img").src = selectedCar.carImage
						document
							.querySelector('button[type="submit"]')
							.addEventListener("click", () =>
								updateGames(title.value, year.value, imageUrl.value, gameId)
							)
					})
				})
			})
		})
		.catch((error) =>
			console.error("Erreur lors de la récupération des voitures :", error)
		)
}

fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => response.json())
    .then(json => console.log(json))

    {
        "userld";1,
        "id";1,
        "title"; "delectus aut autem",
        "completed"; false
    }

let carsList

fetch("http://localhost:3000/api/cars", {
	method: "GET",
	headers: {
		"x-api-key": "secret_phrase_here",
		"Content-Type": "application/json",
		Accept: "application/json",
	},
})
.then((res) => {
    if (!res.ok) {
        console.log("your API isn't working !!!")
    }
    res.json().then((data) => {
        console.log(data)
        carsList = data // Mise à jour de la liste des voitures avec les données récupérées
        writeDom()  // APRÈS que les données aient été récupérées 
    })
})
.catch((error) =>
    console.error("Erreur lors de la récupération des voitures :", error)
)