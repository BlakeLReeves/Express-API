const displayChirps = (data) => {
    $(`.getChirps`).empty();
    let chirps = Object.keys(data).map(key => {
        return {
            id: key,
            user: data[key].user,
            text: data[key].text
        };
    });
    console.log(chirps);
    chirps.pop();
    chirps.reverse();
    chirps.forEach(chirp => {
        $(`.getChirps`).append(`
            <div class="card m-2">
                <div class="card-body">
                    <button onClick="deleteChirp(${chirp.id})" id="deleteChirp">X</button> 
                    <div class="card-title border border-dark border-top-0 border-left-0 border-right-0">${chirp.user} Chirped!</div>
                    <div class="card-text">${chirp.text}</div>
                    <div class="card-footer mt-2">${chirp.id}</div>
                    <button type="button" class="btn btn-primary mt-2" data-toggle="modal" data-target="#chirpModal${chirp.id}">
                        Edit Chirp
                    </button>
                </div>
            </div>
                
            <div class="modal fade" id="chirpModal${chirp.id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                        <input type="text" placeholder="Username" id="editUserInput${chirp.id}">
                        <input type="text" placeholder="What's happening?" id="editChirpInput${chirp.id}">
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button data-dismiss="modal" onClick="editChirp(${chirp.id})" type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            `);
    })
};

const deleteChirp = (id) => {
    $.ajax({
        type: "DELETE",
        url: `/api/chirps/${id}`
    })
        .then(data => displayChirps(data));
};

const editChirp = (id) => {
    let editUserInput = $(`#editUserInput${id}`).val();
    console.log(editUserInput);
    let editChirpInput = $(`#editChirpInput${id}`).val();
    console.log(editChirpInput);
    console.log(id);
    let data = {
        user: `${editUserInput}`,
        text: `${editChirpInput}`
    }
    $.ajax({
        type: "PUT",
        url: `/api/chirps/${id}`,
        data
    })
        .then(data => displayChirps(data));
};

$.ajax({
    type: "GET",
    url: "/api/chirps"
})
    .then(data => displayChirps(data));

$(`#submitChirp`).click((e) => {
    e.preventDefault();
    let userInput = $(`#userInput`).val();
    console.log(userInput);
    let chirpInput = $(`#chirpInput`).val();
    console.log(chirpInput);
    let data = {
        user: `${userInput}`,
        text: `${chirpInput}`
    }
    $.ajax({
        type: "POST",
        url: "/api/chirps",
        data
    })
        .then(data => displayChirps(data))
});