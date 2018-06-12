//Load the request module as well as the secrets folder
var secrets = require('./secrets');
var request = require('request') ;
var fs = require('fs');
console.log("welcome to the Github Avatar Downloader!");
console.log(secrets)

//declare a function to take in paramters such as name , repoName and callback function
function getRepoContributors(repoOwner , repoName , cb) {

  var options = {
    url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
    headers:{
      'User-Agent': 'request',

    }, 'auth' :{'bearer': secrets.GITHUB_TOKEN }
  };
  request(options, function(err , res , body){
    var data = JSON.parse(body)
    cb(err, data);
  })
}

getRepoContributors ("jquery" , "jquery" , function(err, result){
  //console.log("Errors: " , err);
  //console.log("Result: " , result);
   for(var i = 0; i < result.length; i++){
  downloadImageByURL(result[i].avatar_url,'./avatars/' + result[i].login + '.jpg')

 }


})

function cb(err,data) {
  if(err) {
  console.log("We are so sorry, but there seems to be an error")
  return;
  }
 for(var i = 0; i < data.length; i++){
  downloadImageByURL(data[i].avatar_url,'./avatars/' + data[i].login + '.jpg')

 }


}

function downloadImageByURL(url , filepath){

request.get(url)
        .on('error', function(err){
          throw err ;
        })
        .on('response', function (response){
          console.log('Response Status Code: ', response.statusMessage) ;
          console.log("Content type : " + response.headers['content-type'] )

        })
        .pipe(fs.createWriteStream(filepath))


}






