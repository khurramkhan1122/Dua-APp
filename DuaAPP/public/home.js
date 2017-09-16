var user = JSON.parse(localStorage.getItem('currentUser'));
var nameRow = document.getElementById('nameRow');
// var emailRowail = document.getElementById('emailRow');
var sender = document.getElementById('sender');
var comment = document.getElementById('commentBox');

var username = document.getElementById('username');
var adress = document.getElementById('areaAdress');
var emailAddress = document.getElementById('emailAddress');


username.innerHTML=user.name;
emailAddress.innerHTML=user.email;
adress.innerHTML=user.add;







var database = firebase.database().ref();

nameRow.innerHTML = user.name;
// emailRow.innerHTML = user.email;


function submit(){
    if(sender.value == "" || comment.value == ""){
        alert("please fill all fields")
       
    }
    else{
    var post = {
        sender: sender.value,
        dua: comment.value
       
    }

sender.value = '';
comment.value = '';
    database.child('posts').push(post);
    
}}