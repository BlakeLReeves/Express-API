$.ajax({
    method: "GET",
    url: "/api/chirps"
})
    .then(data => {

        let chirps = Object.keys(data).map(key => {
            return {
                id: key,
                user: data[key],
                text: data[key]
            };
        });
        console.log(chirps);
        let card = [
            `<div class="card">
                <div class="card-body">
                    <div class="card-title">${chirps.user}</div>
                    <div class="card-text">${chirps.text}</div>
                    <div class="card-footer">${chirps.id}</div>
                </div>
            </div>`
        ]
        $(`.getChirps`).append(card);
    });