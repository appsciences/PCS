# Installation #

npm install
npm run update-webdriver
npm install -g bower
bower install



### Project structure ###

- /app/** - all application angular files
- app/&lt;component> - all angular files related to component
- app/&lt;component>/*-ctrl - controller files
- app/&lt;component>/*-service - service files
- app/&lt;component>/*-test - unit tests
- app/shared/css - css files
- app/shared/directives - directives files
- app/shared/partials - partials files
- app/shared/services - shared services

- e2e-test/* - end to end tests
- package.json - stores everything required to install node.js app
- README.md - this file
- karma.conf.js - karma config file for unit testing
- protractor.conf.js - protractor config file for end to end testing


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

## Import tool ##

### The import tool requires Java and Maven to be installed. ###

Open the file `....\tools\import\src\com\appsciences\Main.java` and set the Parse API Keys in the lines 37 and 38.

In a terminal, go to the `....\tools\import` location and run the following commands:
```
mvn compile
mvn package
```

Then run the following command setting the corresponding routes, please note that the lastest two parameters are the path for the CSV files to import.

```
java -classpath D:\Sources\PCS\tools\import\target\classes;C:\Users\guillermo\.m2\repository\org\apache\commons\commons-csv\1.0\commons-csv-1.0.jar;C:\Users\guillermo\.m2\repository\com\google\code\gson\gson\2.3.1\gson-2.3.1.jar com.appsciences.Main D:/Doctors.csv D:/Locations.csv
```