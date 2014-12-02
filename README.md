# Installation #

npm install
npm install -g bower
bower install



### Project structure ###

- **/app** - all app logic
- **/<component> - all angular files related to component
- **/<component>/*-ctrl - controller files
- **/<component>/*-service - service files
- **/<component>/*-test - unit tests
- **/shared/css - css files
- **/shared/directives - directives files
- **/shared/partials - partials files
- **/directives/css - shared directives files
- **/partials/css - shared directives files
- **/partials/css - shared services

- **/e2e-test** - end to end tests
- **package.json** - stores everything required to install node.js app
- **README.md** - this file
- **karma.conf.js** - karma config file for unit testing
- **protractor.conf.js** - protractor config file for end to end testing


### Run Tests ###
WebStorm - Karma

- Run>Edit Configurations> + > Karma

Webstorm - Protractor
- Run>Edit Configurations> + > Node
- Jacascript File: .../node_modules/protractor/lib/cli.js
- Application Parameters: protractor.conf.js

Command Line:
- Who knows?

### Run Application ###

- Make sure you have internet connection to connect to Parse
- Run app/index.html from WebStorm or browser.

### It just works! Sort of...###