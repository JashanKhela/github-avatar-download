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

//getRepoContributors("jquery", "jquery", function(err, data){
getRepoContributors(repoOwner, repoName, function(err, result){
 if (err){
   console.log(err);
   return;
 }
for(var i = 0; i < result.length; i++){
  downloadImageByURL(result[i].avatar_url,'./avatars/' + result[i].login + '.jpg')

 }

})


function downloadImageByURL(url, filePath) {
 // ...
 request.get(url)               // Note 1             // Note 1
 .on('error', function (err) {                                   // Note 2
   throw err;
 })
 .on('response', function (response) {                           // Note 3
   console.log('Response Status Code: ', response.statusMessage);
   console.log('Response Header: ', response.headers['content-type']);
 })
 .on('complete', function(){
   console.log('complete')
 })
 .pipe(fs.createWriteStream(filePath));


}