
const url = "https://66711714e083e62ee439fd7d.mockapi.io/api/v1/taskdata";

window.addEventListener('load', loadtask());

let form = document.getElementById("form");

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let taskname = document.querySelector("#task").value;
    let taskdesc = document.querySelector("#desc").value;
    let duedate = document.querySelector("#due").value;
    todojson = {
        taskname,
        taskdesc,
        duedate
    }
    postdata(todojson);
    loadtask();
})

function postdata(todojson) {
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(todojson),
        redirect: "follow"
    }
    fetch(url, requestOptions);
    window.alert("Task added successfully")
}

async function loadtask() {
    let tasks = await fetch(url);
    let taskjson = await tasks.json();
    let taskdisplay = document.querySelector(".taskdisplay");

    taskdisplay.innerHTML = "";

    let cardgrid = document.createElement("div");
    cardgrid.classList.add("row", "row-cols-1", "row-cols-md-2", "row-cols-lg-3", "g-4");
    taskdisplay.appendChild(cardgrid)
    taskjson.forEach(task => {

        console.log(task);

        let carddiv = document.createElement("div");
        carddiv.classList.add("col");
        cardgrid.appendChild(carddiv);

        let card = document.createElement("div");
        card.classList.add("card", "h-100");
        carddiv.appendChild(card);

        let cardbody = document.createElement("div");
        cardbody.classList.add("card-body");
        card.appendChild(cardbody)

        let cardheader = document.createElement("p");
        cardheader.classList.add("card-header", "text-center", "border", "border-dark", "rounded");
        cardheader.innerText = task.taskname;
        cardbody.appendChild(cardheader);

        let cardtext = document.createElement("p");
        cardtext.classList.add("card-text","py-1");
        cardtext.innerText = task.taskdesc;
        cardbody.appendChild(cardtext)

        let cardfooter = document.createElement("div");
        cardfooter.classList.add("card-footer","d-flex","justify-content-between")

        let carddue = document.createElement("p");
        carddue.classList.add("card-text");
        let taskdue = new Date(task.taskdue * 1000);
        carddue.innerText = "Due On : "+taskdue.toLocaleDateString();
        cardbody.appendChild(carddue);

        
    })
}

