# WhatToWatch 
[![License](https://img.shields.io/github/license/koticcat/WhatToWatch.svg?style=flat-square)]()
[![Node](https://img.shields.io/badge/Node-10.15.2-yellow.svg)]()
[![Webpack](https://img.shields.io/badge/Webpack-4.30.0-red.svg)]()
Deployed at:
https://koticcat.github.io/WhattoWatch.io/
<br />
<p align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="src/img/logo_transparent.png" alt="Logo" width="20%" height="20%">
  </a>
</p>


## About The Project
WhatToWatch is  node Applicaiton that pulls a random movie, and displays its information each time the page is loaded, one can also filter and re-request movies at the users command.

### Built With
  * [Node](https://nodejs.org/en/)
  * [JQuery](https://jquery.com)
  * [Webpack](https://webpack.js.org/)
  * [Animate.css](https://daneden.github.io/animate.css/)
  

### API's used
[![TMDB](https://img.shields.io/badge/TMDB-v2%20-yellowgreen.svg)]()
[![OMDB](https://img.shields.io/badge/OMDB-v1-yellow.svg)]()
  * [TMDB](https://developers.themoviedb.org)
  * [OMDB](http://omdbapi.com)
  
## Getting Started
Make Sure You have npm and Node isntalled as well as new api keys, then:
1.Clone the Repo:
```sh
  git clone https://github.com/koticcat/WhatToWatch-git
```
2.Install npm packages:
 ```sh
  npm install
``` 
3.Change the API keys to your API keys in the /model/getmovie.js file.

4.Run the webpack script, to lauch the app in the localhost
 ```sh
  npm run start
``` 
5.To bundle the js files and build the dist folder, use script
 ```sh
  npm run build  OR npm run dev (for bypassing webpack optimization)
```
## License

Distributed under the MIT License. See `LICENSE` for more information.



