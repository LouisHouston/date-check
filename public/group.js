const groupDiv = document.getElementById("group");
const buttonName = document.getElementById("group-button");
const groupNameField = document.getElementById("createGroupName");
const groupNameSubmit = document.getElementById("submitGroupName");

groupNameField.addEventListener("click", () => {
    groupNameField.value = "";
})
//TODO: make it so you create the name and it creates a random string and moves you to another link with that
// string in the link like /asdf1234



groupNameSubmit.addEventListener("click", createGroup);

function createGroup () {
    console.log("working")
}
