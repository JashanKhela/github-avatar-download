//Load the request module
var request = require('request') ;
console.log("welcome to the Github Avatar Downloader!");

//declare a function to take in paramters such as name , repoName and callback function
function getRepoContributors(repoOwner , repoName , cb) {
}

getRepoContributors ("jquery" , "jquery" , function(err, result){
  console.log("Errors: " , err);
  console.log("Result: " , result);

})