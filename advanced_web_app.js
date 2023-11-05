/*
   Filename: advanced_web_app.js

   Description: This JavaScript code is a complex and sophisticated web application
   that demonstrates various advanced web development techniques. It includes
   multiple modules, event handling, Ajax requests, promise chains, and much more.

   Note: This code is purely for demonstration purposes and may not work in a real-world
   environment without proper configuration and dependencies.

   Author: Your Name
   Date: Enter the current date
*/

// Module 1: User Management
(function () {
  // Private Variables and Functions
  let users = [];
  let currentUser = null;

  function addUser(user) {
    users.push(user);
    console.log("User added:", user);
  }

  function removeUser(user) {
    users = users.filter((u) => u !== user);
    console.log("User removed:", user);
  }

  // Public API
  window.UserManagement = {
    addUser,
    removeUser
  };
})();

// Module 2: UI Interactions
(function () {
  document.getElementById("add-user-btn").addEventListener("click", function () {
    const name = document.getElementById("name-input").value;

    if (name) {
      UserManagement.addUser({ name });
      renderUserList();
    }
  });

  function renderUserList() {
    const userList = document.getElementById("user-list");
    userList.innerHTML = "";

    UserManagement.users.forEach((user) => {
      const li = document.createElement("li");
      li.textContent = user.name;
      userList.appendChild(li);
    });
  }
})();

// Module 3: Network Requests
(function () {
  function fetchData(url) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.onload = function () {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(Error("Request Failed: " + xhr.statusText));
        }
      };
      xhr.onerror = function () {
        reject(Error("Network Error"));
      };
      xhr.send();
    });
  }

  function fetchUserData(userId) {
    return fetchData("/api/users/" + userId);
  }

  function fetchPostsData(userId) {
    return fetchData("/api/posts/" + userId);
  }

  // Usage Example
  Promise.all([fetchUserData(1), fetchPostsData(1)])
    .then(([userData, postsData]) => {
      console.log("User Data:", userData);
      console.log("Posts Data:", postsData);
    })
    .catch((error) => {
      console.error(error);
    });
})();

// Module 4: Utility Functions
(function () {
  function formatDate(dateStr) {
    const date = new Date(dateStr);
    return (
      date.getDate() +
      "/" +
      (date.getMonth() + 1) +
      "/" +
      date.getFullYear()
    );
  }

  window.Utils = {
    formatDate
  };
})();

// Usage Example
console.log(Utils.formatDate("2022-01-01T00:00:00Z"));
