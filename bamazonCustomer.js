//required dependencies 
var inquirer = require('inquirer');
var mysql = require('mysql')
var table = require('cli-table');

var connection = mysql.createConnection ({
    host: 'localhost',
    port: 3306,

    user: 'homework-bamazon',

    password: '',
    database: 'bamazon_db'
});

connection.connect();


//prompting user for item quantity
function userPurchase () {
inquirer
    .prompt ([
    {
        type: 'input',
        name: 'id',
        message: 'Please enter the ID of the item you would like to purchase.',
        filter: number,
        validate: correctInput
    },
    {
        type: 'input',
        name: 'quantity',
        message: 'How many would you like to purchase?',
        filter: number,
    }
    ]).then(function(input){
        var item = input.id;
        var quantity = input.quantity;

        var queryID = 'SELECT * FROM products WHERE ?';

        connection.query(queryID, {id: item}, function (err, result) {
            if (err) throw err;

            if (result.length === 0) {
                console.log('Sorry, invalid item ID. Please select a valid ID.');
                displayInventory();
            } else {
                var productData = data [0];

                if (quantity <= productData.stock_quantity) {
                    console.log ('The product you requested is in stock! Placing your order now.');

                    var updateQueryID = 'UPDATE products SET stock_quantity =  ' + (productData.stock_quantity - quantity) + 'WHERE id = ' + item;
                
                    connection.query(updateQueryID, function(err, data) {
                        if (err) throw err;

                        console.log ('\nYour order has been placed! Your total is $' + productData.price * quantity);
                        console.log ('\nThank you for shopping with us!');
                        console.log ('\n ----------------------------\n');

                        connection.end();
                    })
                } else {
                        console.log ('\nThere is not enough product in stock, therefore, your order cannot be placed.');
                        console.log ('\nPlease modify your order and replace your products again.');
                        console.log('\n----------------------------------------------\n');

                        displayInventory();
                }
            }
        })
    })
}


