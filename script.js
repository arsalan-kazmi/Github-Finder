"use strict";
let userName = document.querySelector("#user-name");
let profile = document.querySelector("#profile-pic");

let name = document.querySelector(".name");
let bio = document.querySelector(".bio");
let repos = document.querySelector(".repos");
let notFound = document.querySelector(".not-found");
let following = document.querySelector(".following");
let followers = document.querySelector(".followers");
let userLocation = document.querySelector(".location");
let searchBtn = document.querySelector("button");
let githubLink = document.querySelector(".github-link");
let hide = document.querySelector(".hidden");

async function getprofile(userName) {
  let response = await fetch(`https://api.github.com/users/${userName}`);
  let data = await response.json();
  console.log(data);

  if (data.message == "Not Found") {
    notFound.innerText = `${userName} not found`;
    setInterval(function () {
      notFound.innerText = "";
    }, 3000);
    hide.classList.add("hidden");
    profile.src = "";
    return;
  }

  hide.classList.remove("hidden");

  profile.src = data.avatar_url;
  // here  i am adding this line because it is showing  null on some users insted of there names . so do a quick review on it 
  
  if(data.name!=="null"){ // from
    
  name.innerText = `Name: ${data.name}`;
  }   //to
  bio.innerText = data.bio;
  repos.innerText = `Repositories: ${data.public_repos}`;
  following.innerText = `Following: ${data.following}`;
  followers.innerText = `Followers: ${data.followers} `;
  let showLocation = data.location;
  if (showLocation !== "null") {
    userLocation.innerText = data.location;
  }
  githubLink.innerHTML = `<a href="${data.html_url}"> Visit GitHub </a> `;
}

searchBtn.addEventListener("click", () => {
  getprofile(userName.value);
});
