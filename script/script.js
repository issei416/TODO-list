
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
        duedate,
        "status": "pending"
    }
    postdata(todojson);
    loadtask();
    form.reset();
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
    fetch(url, requestOptions).then(loadtask);
    window.alert("Task added successfully")
}

function deletedata(taskid) {
    return function(){

        fetch(url + `/${taskid}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(loadtask)
        window.alert("task deleted successfully");
        
    }
}

function updatedata(taskid,status){
    return function() {
        if(status == "pending"){
            status = "ongoing";
        }else if(status == "ongoing"){
            status = "completed";
        }else if(status == "completed"){
            status = "pending";
        }
        fetch(url +`/${taskid}`, {
            method:"PUT",
            headers : {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                status: status 
            }),
            redirect :"follow"
        }).then(loadtask);
    }
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
        cardheader.classList.add("card-header", "text-center", "border", "border-dark", "rounded",);
        cardheader.style.background = "rgb(245, 234, 245)";
        cardheader.innerText = task.taskname;
        cardbody.appendChild(cardheader);

        let cardtext = document.createElement("p");
        cardtext.classList.add("card-text", "py-1");
        cardtext.innerText = task.taskdesc;
        cardbody.appendChild(cardtext)

        let carddue = document.createElement("p");
        carddue.classList.add("card-text");
        let taskdue = new Date(task.taskdue * 1000);
        carddue.innerText = "Due On : " + taskdue.toLocaleDateString();
        cardbody.appendChild(carddue);

        let cardfooter = document.createElement("div");
        cardfooter.classList.add("card-footer", "text-center", "d-flex")
        card.appendChild(cardfooter)

        let statusbtn = document.createElement("button");
        let status = task.status;
        statusbtn.id = task.id;
        if (status == "pending") {
            statusbtn.classList.add("bg-red", "rounded", "col-10","text-dark");
            statusbtn.innerHTML = `<img src="./public/pending.png"></img><span>pending</span>`
        }else if(status == "completed") {
            statusbtn.classList.add("bg-success","rounded", "col-10");
            statusbtn.innerHTML = `<img src="./public/completed.png"></img><span>completed</span>`
        }else {
            statusbtn.classList.add("bg-warning","rounded","col-10");
            statusbtn.innerHTML = `<img src="./public/ongoing.png"></img><span>ongoing</span>`
        }
        cardfooter.appendChild(statusbtn);
        statusbtn.addEventListener("click",updatedata(statusbtn.id,status));


        let deletebtn = document.createElement("div");
        deletebtn.classList.add("col-2", "btn", "deletebtn", "ms-2", "d-flex", "justify-content-center", "align-items-center");
        deletebtn.innerHTML = `<img src="./public/delete.png"></img>`;
        deletebtn.id = task.id;
        deletebtn.addEventListener("click",deletedata(deletebtn.id));
        cardfooter.appendChild(deletebtn);

    })
}




