require("dotenv").config();
const axios = require("axios");
const fs = require("fs");
var Spotify = require('node-spotify-api');

//Required Things^

// Command Line Variables

const action = process.argv[2];
const value = process.argv[3];


//Super Switch

switch (action) {
    case "concert-this":
        concertThis();
        break;

    case "spotify-this-song":
        spotifyThisSong();
        break;

    case "movie-this":
        movieThis();
        break;

    case "do-what-it-says":
        doWhatItSays();
        break;

};

// `concert-this`
//`node liri.js concert-this <artist/band name here>`
// Date of the Event (use moment to format this as "MM/DD/YYYY")

function concertThis() {

    axios.get(`https://rest.bandsintown.com/artists/${value}/events?app_id=${process.env.BANDS_IN_TOWN_APP_ID}`).then(

        function (response) {

            console.log("The next concert is at " + response.data[0].venue.name + " in " + response.data[0].venue.country + " on " + response.data[0].datetime)

        });

};


// `spotify-this-song`
//`node liri.js spotify-this-song '<song name here>'`
// If no song is provided then your program will default to "The Sign" by Ace of Base.

function spotifyThisSong() {

    var spotify = new Spotify({
        id: process.env.SPOTIFY_ID,
        secret: process.env.SPOTIFY_SECRET
    });

    if (process.argv.length > 3) {

        spotify.search({
            type: 'track',
            query: `${value}`

        }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            console.log("Song: " + data.tracks.items[0].name);
            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            console.log("Album: " + data.tracks.items[0].album.name);
            console.log(data.tracks.items[0].external_urls.spotify);


        });


    } else if (process.argv.length < 4) {

        spotify.search({
            type: 'track',
            query: `the+sign`,
            year: '1993'

        }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            console.log("Song: " + data.tracks.items[0].name);
            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            console.log("Album: " + data.tracks.items[0].album.name);


        });


    };



};


// `movie-this`
//node liri.js movie-this '<movie name here>'`
// If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

function movieThis() {

    if (process.argv.length > 3) {

        axios.get(`http://www.omdbapi.com/?t=${value}&y=&plot=short&apikey=${process.env.OMDB_API_KEY}`).then(
            function (response) {

                console.log(response.data.Title + " came out on " + response.data.Released + ".");
                console.log("The movie's rating is " + response.data.imdbRating + " on IMDB and the Rotten Tomatoes Rating is " + response.data.Ratings[2].Value + ".");
                console.log("The movie was produced in " + response.data.Country + " in " + response.data.Language + ".");
                console.log("Plot: " + response.data.Plot);
                console.log("Cast: " + response.data.Actors);

            })

    } else if (process.argv.length < 4) {

        defaultValue = 'Mr. Nobody';

        axios.get(`http://www.omdbapi.com/?t=${defaultValue}&y=&plot=short&apikey=${process.env.OMDB_API_KEY}`).then(
            function (response) {
                console.log(response.data.Title + " came out on " + response.data.Released + ".");
                console.log("The movie's rating is " + response.data.imdbRating + " on IMDB and the Rotten Tomatoes Rating is " + response.data.Ratings[2].Value + ".");
                console.log("The movie was produced in " + response.data.Country + " in " + response.data.Language + ".");
                console.log("Plot: " + response.data.Plot);
                console.log("Cast: " + response.data.Actors);

            })

    }
};


//do -what - it - says `
//node liri.js do-what-it-says `
//spotify - this - song ` for "I Want it That Way," as follows the text in `random.txt `.


function doWhatItSays() {

    fs.readFile("random.txt", "utf8", function (err, data) {

        

        var spotify = new Spotify({
            id: process.env.SPOTIFY_ID,
            secret: process.env.SPOTIFY_SECRET
        });

        spotify.search({
            type: 'track',
            query: `${data}`

        }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            console.log("Song: " + data.tracks.items[0].name);
            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            console.log("Album: " + data.tracks.items[0].album.name);
            console.log(data.tracks.items[0].external_urls.spotify);

            getNewSong();


        });


    })

    //Loop through random songs(buggy)

        function getNewSong(){

        const randomSongs = ["i+want+it+that+way", "anaconda", "single+ladies" , "money+for+nothing"]
        let randomCounter = 0;

        randomCounter ++;
        newSong = randomSongs[randomCounter];
        
        fs.writeFile("random.txt", newSong , function (err, data){
    
        });
    
    
    }
    

};