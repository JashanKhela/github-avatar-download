//Load the request module as well as the secrets folder
var secrets = require('./secrets')
var request = require('request') ;
console.log("welcome to the Github Avatar Downloader!");
console.log(secrets)

//declare a function to take in paramters such as name , repoName and callback function
function getRepoContributors(repoOwner , repoName , cb) {
  var options = {
    url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
    headers:{
      'User-Agent': 'request',
      'Authorization' : secrets

    }
  };
  request(options, function(err , res , body){
    cb(err, body);
  })
}

getRepoContributors ("jquery" , "jquery" , function(err, result){
  console.log("Errors: " , err);
  console.log("Result: " , result);

})