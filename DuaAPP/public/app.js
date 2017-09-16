var emailInput = document.getElementById("email");
var passwordInput = document.getElementById("password");
var nameInput = document.getElementById("name");
var addressInput = document.getElementById("inputAddress");
var database = firebase.database();
var auth = firebase.auth();

function signup() {
   
    var email = emailInput.value;
    var password = passwordInput.value;
    var name = nameInput.value;
    var address =addressInput.value;

   
    


    auth.createUserWithEmailAndPassword(email, password)
        .then(function (user) {
            var currentUser = {
                name: name,
                email: email,
                add : address
                
            }
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
           
            // alert("Succusfully signup")
            location = 'login.html';
        })
        .catch(function (error) {
           
            if(addressInput.value == "" || nameInput.value == "" || emailInput.value == ""  || passwordInput.value == ""){
                alert("please fill all fields")
               
            }
            else{
                alert(error.message);
            }
            // console.log(error.message);
        })


}

function login() {
    var email = emailInput.value;
    var password = passwordInput.value;

    auth.signInWithEmailAndPassword(email, password)
        .then(function(user){
            // alert("Login Succusfully")
            location = 'home.html';
        })
        .catch(function(error){
            if(emailInput.value == ""  || passwordInput.value == ""){
                alert("please fill all fields")
               
            }
            else{
                alert(error.message);
            }
        })
}