// Dealing with Ajax on search

let srcbtn = document.getElementById('search-btn');
let chart = document.getElementById('type-chart');
let country = document.getElementById('country');
let resSize = document.getElementById('page-size');
let headingText = document.querySelector('.heading-text');
let topTrackDiv = document.getElementById('top-tracks-result');

// Event listener for 'Find Music' button
srcbtn.addEventListener('click', loadData);

// Object for mapping of track values to their names , countries for the heading text span
let mapObj = {
    charts: {
        hot: 'Hot Music',
        top: 'Top Music',
        mxmweekly: 'Best of the week'
    },
    countries: {
        in : 'India',
        us: 'USA',
        uk: 'UK',
        it: 'Italy'
    }
};

function loadData() {
    // Array to hold ID's of tracks for each AJAX request
    let trackIDArr = [];
    // Before every new search clear previous search results
    topTrackDiv.innerHTML = "";
    

    // Make request
    let xhr = new XMLHttpRequest();
    let reqUrl = `http://api.musixmatch.com/ws/1.1/chart.tracks.get?apikey=ebdf7abb4b38a5c5748f1ef88b6bce25&page_size=${resSize.value}&country=${country.value}&chart_name=${chart.value}`;
    xhr.open('GET', reqUrl, true);

    xhr.onload = function() {
        if(this.status === 200) {
            let chartVal = chart.value;
            let countryVal = country.value;
            let resSizeVal = resSize.value;
            // Add text to header for better user experience to tell user what is being dispalyed
            headingText.innerHTML = `Displaying ${resSizeVal} results for ${mapObj.charts[chartVal]} in ${mapObj.countries[countryVal]}`;
            let res = JSON.parse(this.responseText);
            let cardToBeAdded = '';
            let trackArray = res.message.body.track_list;
            for(data in trackArray) {
                // Store track id in array
                trackIDArr.push(trackArray[data].track.track_id);
                cardToBeAdded += 
                `<div class="col-md-6 col-lg-4">
                <div class="card" id="res-${data}">
                <div class="card-body">
                  <h5 class="card-title">Track Title: ${trackArray[data].track.track_name}</h5>
                  <p class="card-text">
                    Album : ${trackArray[data].track.album_name} <br>
                    Artist : ${trackArray[data].track.artist_name}
                  </p>
                  <button class="btn btn-primary snippet-btn" type="button" id="${data}" data-toggle="modal" data-target="#exampleModal">Get Lyrics Snippet!</button>
                </div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">Rating: ${trackArray[data].track.track_rating}</li>
                  <li class="list-group-item">Favourites: ${trackArray[data].track.num_favourite}</li>
                </ul>
              </div>
              </div>`;
            }
            topTrackDiv.innerHTML += cardToBeAdded;
        }
        // Dealing with AJAX on getting lyrics snippet, and then redirecting to new page
        let getSnippetBtn = document.querySelectorAll('.snippet-btn');
        for(let i = 0; i < getSnippetBtn.length; i++) {
            getSnippetBtn[i].addEventListener('click', loadLyrics);
        }

        function loadLyrics() {
            // document.querySelector('.modal-container').innerHTML += '';
            let btnid = this.getAttribute('id');
            // Make AJAX request to MusixMatch API
            let xhr = new XMLHttpRequest();
            let LyricURL = `http://api.musixmatch.com/ws/1.1/track.lyrics.get?apikey=ebdf7abb4b38a5c5748f1ef88b6bce25&track_id=${trackIDArr[btnid]}` ;
            xhr.open('GET', LyricURL, true);

            xhr.onload = function() {
                let lyricRes = JSON.parse(this.responseText);
                let lyricObj = lyricRes.message.body.lyrics;
                // Add Script Tracking URL src.
                document.querySelector('.tracking-url').setAttribute("src", lyricObj.script_tracking_url);
                //Change modal contents
                console.log(lyricObj);
                let modalTitle = document.querySelector('.modal-title');
                modalTitle.innerText = 'Lyrics';
                let modalBody = document.querySelector('.modal-body');
                modalBody.innerText = lyricObj.lyrics_body;
                let modalCopyrightSpan = document.querySelector('.cpy');
                modalCopyrightSpan.innerText = lyricObj.lyrics_copyright;

            }

            xhr.onerror = function() {
                console.log(this.responseText);
            }

            xhr.send();
        }
    }

    xhr.onerror = function() {
        console.log(xhr.responseText);
    }

    xhr.send();
}

