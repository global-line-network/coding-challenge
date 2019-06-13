# Overview:
Thank you for the assessment. It has been fun done. I used Vue, Laravel and Mysql for this project. It can be much improved in terms of frontend and backend.
However, I think I misunderstood the mock up design a little, I might have improvised :D I hope you like it. 

### Prerequisites

- npm (https://nodejs.org/en/)
- xampp/laragon/wampp (Contains Apache/Nginx, Php, Mysql)
- composer (https://getcomposer.org/download/)

# Installation Steps:

- Clone project in local server's directory (Xampp -> htdocs)
- cd  /path/to/code-challenge
- Run in your command line `composer install` 
- Run in your command line `npm install`
- Run in your command line `npm watch` (Don't close console)
- Run in your command line `php artisan key:generate`
- Open up Phpmyadmin to setup database 
- Create database 
- Open the file .env to setup database credentials
- Change the values to your database values
  
          DB_DATABASE=databaseName
          DB_USERNAME=PhpmyAdminUsername
          DB_PASSWORD=PhpmyAdminPassword
- Run in your command line ' php artisan migrate --seed ' 
(This command will generate fake users in the users table and will migrate the User table to the database)



# Usage:

Visit http://localhost/

# Testing:

Unit tests have been made to test that the APIs are working.

###Windows:

- cd  /path/to/code-challenge
- Run this command using quotes:
-     "./vendor/bin/phpunit"


###Mac:

- cd  /path/to/code-challenge
- Run this command:
-     ./vendor/bin/phpunit

# Questions? 

info@yousseftharwat.me 




  
