const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5ZW55Z3dndGhzeXVxZG9scm5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk4NDI4ODIsImV4cCI6MjAwNTQxODg4Mn0.GvUVstXsgAMq8Jl1EoW1fYXttlxDhKAvLDefaAvlQd4";

const url = "https://lyenygwgthsyuqdolrnj.supabase.co";

const database = supabase.createClient(url, key);

let save = document.querySelector("#save");
save.addEventListener("click", async (e) => {
    e.preventDefault();
    let name = document.querySelector("#name").value;
    let age = document.querySelector("#age").value;
    save.innerText = "Saving....";
    save.setAttribute("disabled", true);
    let res = await database.from("residents").insert({
        name: name,
        age: age,
    })
    if (res) {
        alert("New Resident Added Successfully")
        save.innerText = "Saved"
        save.setAttribute("disabled", false);
        name = "";
        age = "";
        getResident();
        getTotalCount();

    } else {
        alert("New Resident Added Unsuccessfully")
        save.innerText = "Save"
        save.setAttribute("disabled", false);
    }
})

const getResident = async () => {
    let tbody = document.getElementById("tbody");
    let loading = document.getElementById("loading");
    let tr = "";
    loading.innerText = "Loading...."
    const res = await database.from("residents").select("*");
    if (res) {
        for (var i in res.data) {
            tr += `<tr>
         <td>${parseInt(i) + 1}</td>
         <td>${res.data[i].name}</td>
         <td>${res.data[i].age}</td>
         <td><button class="btn btn-primary" data-bs-toggle="modal"
         onclick='editResident(${res.data[i].id})' data-bs-target="#editModel">Update</button></td>
         <td><button onclick='deleteResident(${res.data[i].id})' class="btn btn-danger">Delete</button></td>
         </tr>`;
        }
        tbody.innerHTML = tr;
        loading.innerText = ""

    }

}

getResident();

const getTotalCount = async () => {
    let total = document.querySelector("#total");
    const res = await database.from("residents").select("*", { count: "exact" });
    total.innerText = res.data.length;
}

getTotalCount();

const editResident = async (id) => {


    const res = await database.from("residents").select("*").eq("id", id);
    if (res) {
        document.getElementById("id").value = res.data[0].id;
        document.getElementById("edit-name").value = res.data[0].name;
        document.getElementById("edit-age").value = res.data[0].age;
    }
}

const update = document.getElementById("update");

update.addEventListener("click", async () => {
    let id = document.getElementById("id").value;
    let name = document.getElementById("edit-name").value
    let age = document.getElementById("edit-age").value;
    update.innerText = "Updating...."
    update.setAttribute("disabled", true);
    const res = await database.from("residents").update({
        name, age
    }).eq("id", id)

    if (res) {
        alert("Resident Update Successfully")
        update.innerText = "Update"
        update.setAttribute("disabled", false);
        name = "";
        age = "";
        getResident();
        getTotalCount();

    } else {
        alert("Resident Update Unsuccessfully")
        update.innerText = "Update"
        update.setAttribute("disabled", false);
    }
})


const deleteResident = async (id) => {
    const res = await database.from("residents").delete().eq("id", id)

    if (res) {
        alert("Delete successfully")
        getResident();
        getTotalCount();

    } else {
        alert("Delete successfully")
    }
}