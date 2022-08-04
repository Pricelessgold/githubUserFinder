function getUserProfile() {
  username = document.getElementById("username").value; //Retrieves the Username in the text field
  fetch('https://api.github.com/users/' + username)
    .then(response => response.json())
    .then(data => {
      if (data.login == null) {
        alert("Username Not Found. Please Search With Another Username"); // Triggers an alert for an invalid username
      } else {
        //If user exists, the details retrieved from API are appended to the html ids
        document.getElementById('bio').innerHTML = "<b>Bio</b>: " + data.bio
        document.getElementById('url').innerHTML = data.blog
        document.getElementById('url').setAttribute('href', data.blog);
        document.getElementById('name').innerHTML = "<b>Full Name</b>: " + data.name + " (" + data.login + ")";
        document.getElementById('location').innerHTML = "<b>Location</b>: " + data.location
        document.getElementById('repos').innerHTML = " <b>No. of Repos</b>: " + data.public_repos
        document.getElementById('avatar_url').setAttribute('src', data.avatar_url);
        document.getElementById('title').innerHTML = data.name + "'s Repos";
        document.getElementById('profileTitle').innerHTML = "Profile";
        getRepos(data.login);
      }
    })

}



function getRepos(username) {
  var info = '';
  fetch('https://api.github.com/users/' + username + '/repos')
    .then(response => response.json())
    .then(data => {
      for (i = 0; i < data.length; i++) { //Loops through the retrieved repolist and start assigning them to the HTML elements
        info += '<tr>';
        info += '<td> <a target="_blank" title=" Description:  ' + data[i].description + ' ___Last Update: ' + data[i].updated_at + ' " href="' + data[i].html_url + '">' + data[i].name + '</a>' + '</td>';
        info += '<td>' + data[i].language + '</td>';
        info += '</tr>';
      }
      document.getElementById("tableBody").innerHTML=info
    })
}