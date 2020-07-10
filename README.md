# Laravel Vue Social Media

This app was created by using Laravel and Vue.js.

## Installation

Clone the repository

```bash
git clone https://github.com/rasitiri/laravel-vue-socialmedia.git
```

Switch to the repo folder

```bash
cd laravel-vue-socialmedia
```

Install all the dependencies using composer

```bash
composer install
```
Copy the example env file and make the required configuration changes in the .env file

```bash
cp .env.example .env
``` 

Generate a new application key

```bash
php artisan key:generate
```

Generate a new oauth private key. [Laravel Passport Official Documentation](https://laravel.com/docs/7.x/passport)

```bash
php artisan passport:install
```

Run the database migrations (**Set the database connection in .env before migrating**)

```bash
php artisan migrate
```

Install dependencies for Vue.js

```bash
npm install
```

Start the local development server

```bash
php artisan serve
```

Start Vue development environment

```bash
npm run watch
```

You can now access the server at [http://localhost:8000](http://localhost:8000)
