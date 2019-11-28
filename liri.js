require("dotenv").config();
const axios = require("axios");
const fs = require("fs");

//Required Things^

// Variables

const action = process.argv[2];
const value = process.argv[3];

switch (action) {
    case "concert-this":
        concertThis();

    case "spotify-this-song":
        spotifyThisSong();

    case "movie-this":
        movieThis();

    case "do-what-it-says":
        doWhatItSays();

}

// `concert-this`
//`node liri.js concert-this <artist/band name here>`

// This will search the Bands in Town Artist Events API (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) for an artist and render the following information about each event to the terminal:

// Name of the venue

// Venue location

// Date of the Event (use moment to format this as "MM/DD/YYYY")

function concertThis() {


}




// `spotify-this-song`
//`node liri.js spotify-this-song '<song name here>'`

//var spotify = new Spotify(keys.spotify);

// This will show the following information about the song in your terminal/bash window

// Artist(s)

// The song's name

// A preview link of the song from Spotify

// The album that the song is from

// If no song is provided then your program will default to "The Sign" by Ace of Base.

function spotifyThisSong() {


}


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

    }
    
    else if (process.argv.length < 4)  {

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
}


//do -what - it - says `
//node liri.js do-what-it-says `
// Using the `fs ` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
// It should run `
//spotify - this - song ` for "I Want it That Way," as follows the text in `
//random.txt `.
// Edit the text in random.txt to test out the feature for movie-this and concert-this.

function doWhatItSays() {

}