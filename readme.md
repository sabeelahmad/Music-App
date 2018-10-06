# Music App 

This is a web app for music lovers, the functionalites of the web app include:
* Searching for Music on basis of 3 categories
    * Top charts
    * Hot charts
    * Weekly top charts
* The search is carried out on the basis of countries, the web app currently offers 4 countries to search by:
    * USA
    * UK
    * India
    * Italy
* There is also a feature to limit the number of results you want from the search, this parameter is important and doesn't have any default value
* Another feature is viewing a snippet of the lyrics of the songs.

The Web app uses the *MusixMatch* API.
The Web app uses Vanilla JS to make AJAX requests using the XMLHttpRequest object. Two methods of the API are put into use:
* chart.tracks.get
* track.lyrics.get

The code uses a Free API Key and hence the *track.lyrics.get* method only returns 30% of the lyrics of a particular song.

The design of the site has been kept pretty minimalistic by me, as I mainly wanted to this as a small project particulary to make a project demonstrating AJAX using Vanilla JS.

Anyone may contribute to the project, if they feel that they can make the code better or add any other feature.