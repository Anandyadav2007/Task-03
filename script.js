const usersContainer = document.getElementById("users");
const searchInput = document.getElementById("search");
const statusDiv = document.getElementById("status");

let allUsers = [];

async function fetchUsers() {
    try {
        statusDiv.textContent = "Loading users...";

        const response = await fetch(
            "https://randomuser.me/api/?results=20"
        );

        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        const data = await response.json();

        allUsers = data.results;

        displayUsers(allUsers);

        statusDiv.textContent = "";
    }
    catch (error) {
        statusDiv.textContent =
            "Error loading users. Please try again.";
    }
}

function displayUsers(users) {
    usersContainer.innerHTML = "";

    if (users.length === 0) {
        usersContainer.innerHTML =
            "<p>No users found.</p>";
        return;
    }

    users.forEach(user => {
        const card = document.createElement("div");

        card.classList.add("card");

        card.innerHTML = `
            <img src="${user.picture.large}" alt="User">
            <h3>${user.name.first} ${user.name.last}</h3>
            <p>${user.email}</p>
            <p>${user.phone}</p>
        `;

        usersContainer.appendChild(card);
    });
}

searchInput.addEventListener("input", () => {
    const value =
        searchInput.value.toLowerCase();

    const filteredUsers =
        allUsers.filter(user =>
            `${user.name.first} ${user.name.last}`
                .toLowerCase()
                .includes(value)
        );

    displayUsers(filteredUsers);
});

fetchUsers();