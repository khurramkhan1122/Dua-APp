
// var postss = document.getElementById("nameRow");
// var currentUser = JSON.parse(localStorage.getItem('currentUser'));
// postss.innerHTML = currentUser.name;
// // coomment like code
// function addone(field) {
//     field.value = Number(field.value) + 1;
//     }
    
//     function subtractone(field) {
//     field.value = Number(field.value) - 1;
//     }

// var database = firebase.database().ref();
// var posts = document.getElementById("posts");
// var currentUser = JSON.parse(localStorage.getItem('currentUser'));

// database.child("posts").on("child_added", function(snapshot){
//     var obj = snapshot.val();
//     obj.id = snapshot.key;
//     render(obj);
// })
// database.child("comments").on("child_added", function(snapshot){
//     var obj = snapshot.val();
//     renderComment(obj);
// })

// function render(dua){
//     var mainDiv = document.createElement("DIV");
//     mainDiv.setAttribute("id", dua.id);
//     mainDiv.setAttribute("class", "card dua table-striped");
    
//     var div = document.createElement("DIV");
//     div.setAttribute("class", "card-body p-3 mb-2 bg-info text-black");

    
//     var span = document.createElement("SPAN");
//     var senderTag = document.createElement("H4");
//     senderTag.setAttribute("class", "card-title font-italic");
//     var sender = document.createTextNode(dua.sender);
//     senderTag.appendChild(sender);

//     var duaTag = document.createElement("H5");
//     duaTag.setAttribute("class", "card-text font-italic");    
//     var duaText = document.createTextNode(dua.dua);
//     duaTag.appendChild(duaText);

//     span.appendChild(senderTag);
//     span.appendChild(duaTag);
//     div.appendChild(span);

//     var commentBox = document.createElement("INPUT");
//     commentBox.setAttribute("class", "form-control");
//     commentBox.setAttribute("id", "comment" + dua.id);
    
//     var btn = document.createElement("BUTTON");
//     btn.setAttribute("class", "btn btn-primary");
//     var btnText = document.createTextNode("Comment");
//     btn.onclick = function(){
//         submitComment(dua.id);
//     }

//     div.appendChild(commentBox);
//     div.appendChild(btn);

//     btn.appendChild(btnText);
//     var commentsDiv = document.createElement("DIV");
//     mainDiv.appendChild(commentsDiv);
//     mainDiv.appendChild(div);
//     posts.appendChild(mainDiv);
// }
// function submitComment(duaId){
//     var commentInput = document.getElementById("comment" + duaId);
//     var commentObj = {
//         sender: currentUser.name,
//         comment: commentInput.value,
//         duaId: duaId
//     }
//     database.child("comments").push(commentObj);
//     commentInput.value = '';
// }

// function renderComment(comment){
//     var duaDiv = document.getElementById(comment.duaId);
//     var commentsDiv = duaDiv.lastElementChild;
    
//     var card = document.createElement("DIV");
//     card.setAttribute("class", "card");
    
//     var cardBody = document.createElement("DIV");
//     cardBody.setAttribute("class", "card-body");

//     var senderTag = document.createElement("H5");
//     senderTag.setAttribute("class", "font-italic card-title text-primary");
//     var sender = document.createTextNode(comment.sender);
//     senderTag.appendChild(sender);
//     var commentTag = document.createElement("H6");
//     commentTag.setAttribute("class", "font-italic text-info");
//     var commentText = document.createTextNode(comment.comment);
//     commentTag.appendChild(commentText);

//     cardBody.appendChild(senderTag);
//     cardBody.appendChild(commentTag);

//     card.appendChild(cardBody);

//     commentsDiv.appendChild(card);
// }

var database = firebase.database().ref();
var CurrentUser=localStorage.getItem('currentUser');
CurrentUser=JSON.parse(CurrentUser);
document.getElementById('Username').innerHTML=CurrentUser.name;
var Allposts=document.getElementById('allposts');
database.child("posts").on("child_added", function(snapshot){
var obj=snapshot.val();
obj.id=snapshot.key;
var div=document.createElement('DIV');
div.setAttribute('id',obj.id);
var span=document.createElement('SPAN');
var senderName=document.createTextNode('Sender: '+obj.sender);
var para=document.createElement('P');
var breakline=document.createElement('BR');
var Duatxt=document.createTextNode('Dua: \n\n'+obj.dua);
var input=document.createElement('INPUT');
input.setAttribute('placeholder','Enter Comment');
input.setAttribute('class','form-control form-control-sm col-md-8 col-xs-8 col-sm-8 col-lg-8 commentbox');
input.setAttribute('id','comment'+obj.id);
var Btn=document.createElement('BUTTON');
Btn.onclick=function(){
Commentsubmit(obj);
}
var btntxt=document.createTextNode('Comment');
Btn.setAttribute('class','btn');
Btn.appendChild(btntxt);
span.appendChild(senderName);
para.appendChild(Duatxt);
para.appendChild(breakline);
para.appendChild(breakline);
para.appendChild(breakline);
para.appendChild(input);
para.appendChild(Btn);
div.appendChild(span);
div.appendChild(para);

div.setAttribute('class','Dua_design form-control font-italic bg-secondary card-title card text-light mb-3');
var divlist=document.createElement('DIV');
divlist.setAttribute('id','list');
div.appendChild(divlist);
Allposts.appendChild(div);

});

function Commentsubmit(obj){
  var commentinput=document.getElementById('comment'+obj.id);
  if(commentinput!=''){
var Comment={
  comment:commentinput.value,
  duaid:obj.id,
  user:CurrentUser.name,
  like:0
};
if(commentinput.value==""){
  alert("Comment Required"); } 
 else{
  database.child('Comment').push(Comment)
}
commentinput.value='';
// database.child('Comment').push(Comment);
}
else{
  var message=document.createElement('DIV');
message.innerHTML=" <div class='alert alert-success Profile' role='alert'> <button type='button' class='close' data-dismiss='alert' aria-label='Close'>  <span aria-hidden='true'>&times;</span>  </button> <h4 class='alert-heading'>Error</h4> <hr>  <p class='mb-0'>Please Write Anything First</p></div>"  ;
document.getElementById(obj.duaid).appendChild(message);
}
}


database.child('Comment').on('child_added',function(snapshot){
var obj=snapshot.val();
obj.id=snapshot.key;
var div=document.createElement('DIV');
var span=document.createElement('SPAN');
var Likebtn=document.createElement('BUTTON');
Likebtn.setAttribute('class','btn')
var Likebtntxt=document.createTextNode('Like');
likespan=document.createElement('SPAN');
likespan.setAttribute('id',obj.id);
likespan.setAttribute('class','badge badge-info font-italic'); 
// console.log(obj.id);
likespantxt=document.createTextNode(obj.like);
likespan.appendChild(likespantxt);

Likebtn.appendChild(Likebtntxt);
Likebtn.onclick=function(){
  Likeupdate(obj);
  // console.log(obj);
}
Likebtn.appendChild(likespan);

var username=document.createTextNode(obj.user+': ');
var commenttxt=document.createTextNode(obj.comment);
span.appendChild(username);
span.appendChild(commenttxt);
span.appendChild(Likebtn);
div.appendChild(span);
var maindiv=document.getElementById(obj.duaid);
maindiv.lastChild.appendChild(div);
});

function Likeupdate(obj){
obj.like=++obj.like;
// console.log(obj.like);
database.child('Comment/'+obj.id).update(obj);

}
database.child('Comment').on('child_changed',function(ob){
obj=ob.val();
document.getElementById(obj.id).innerHTML=obj.like;
console.log( obj.id);
});
function Logout(){
localStorage.removeItem('currentUser');
location.assign('index.html');
}



