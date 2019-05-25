//required dependencies 
var inquirer = require('inquirer');
var mysql = require('mysql')
var table = require('cli-table');

var connection = mysql.createConnection ({
    host: 'localhost',
    port: 3306,

    user: 'homework - bamazon',

    password: '',
    database: 'bamazon_db'
});

//user input 
