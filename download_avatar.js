//Grab the required methods and take in some arguements from the command line
var request = require('request');
var token = require('./secrets');
var fs = require('fs');
var baseurl = 'https://api.github.com/repos';
var repoOwner = process.argv[2];
var repoName = process.argv[2];
if (process.argv.length !== 4){
 console.log('Please Enter Valid arguments');
 return ;
}


console.log('Welcome to the GitHub Avatar Downloader!');

//Parse the data to make it accessible
function getRepoContributors(repoOwner, repoName, cb) {
 var options = {
   url : "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
   headers: {
     'User-Agent':'request',
   },
   'auth': {'bearer': token.GITHUB_TOKEN}
 };
 request(options, function(err, res, body) {
   var data = JSON.parse(body);
   cb(err, data);
 });
}



//For every object we have please call the download method and send it a url and filepath
getRepoContributors(repoOwner, repoName, function(err, result){
 if (err){
   console.log(err);
   return;
 }
for(var i = 0; i < result.length; i++){
  downloadImageByURL(result[i].avatar_url,'./avatars/' + result[i].login + '.jpg')
 }
})

//method for dowloading the avatars
function downloadImageByURL(url, filePath) {
 request.get(url)
 .on('error', function (err) {
   throw err;
 })
 .on('response', function (response) {
 })
 .on('complete', function(){
   console.log('complete')
 })
 .pipe(fs.createWriteStream(filePath));

}