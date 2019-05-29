//required dependencies 
var inquirer = require('inquirer');
var mysql = require('mysql')
var Table = require('cli-table');

var connection = mysql.createConnection ({
    host: 'localhost',
    port: 3306,

    user: 'root',

    password: '',
    database: 'bamazon_db'
});

connection.connect(function (err){
    if (err) throw err; 
    // console.log( 'connected as id' + connection.threadID);
});

//display inventory from mySQL implementing CLI TABLE
var displayInventory = function () {
    var queryDB = 'SELECT * FROM products';
    connection.query(queryDB, function (err, data){
        if (err) throw err; 
        
        var inventoryTable = new Table({
            head: ['Item ID', 'Product Name', 'Department Name', 'Price', 'Quantity'],
            colWidths: [20, 40,40,20,20]
        });
         
        // table is an Array, so you can `push`, `unshift`, `splice` and friends
        for (var i = 0; i < data.length; i++) {
            inventoryTable.push([
                data[i].item_id, data[i].name, data[i].department_name, data[i].price, data[i].stock_quantity
            ]);
        }
        console.log(inventoryTable.toString());
        userPurchase();
        
    });
}


function correctInput(value){
    var integer = Number.isInteger(parseFloat(value));
    var sign = Math.sign(value);

    if (integer && (sign === 1)) {
        return true;
    } else {
        return 'Enter a whole non-zero number.';
    }
}

//prompting user for item quantity
function userPurchase () {
inquirer
    .prompt ([
    {
        type: 'input',
        name: 'item_id',
        message: 'Please enter the ID of the item you would like to purchase.',
        filter: Number,
        validate: correctInput
    },
    {
        type: 'input',
        name: 'quantity',
        message: 'How many would you like to purchase?',
        validate: correctInput,
        filter: Number,
    }
    ]).then(function(input){
        var item = input.item_id;
        var quantity = input.stock_quantity;

        var queryID = 'SELECT * FROM products WHERE ?';

        connection.query(queryID, {item_id: item}, function (err, data) {
            if (err) throw err;

            if (data.length === 0) {
                console.log('Sorry, invalid item ID. Please select a valid ID.');
                displayInventory();
            } else {
                var productData = data [0];

                if (quantity <= productData.quantity) {
                    console.log ('The product you requested is in stock! Placing your order now.');

                    var updateQueryID = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + 'WHERE item_id =' + item;
                
                    connection.query(updateQueryID, function(err, data) {
                        if (err) throw err;

                        console.log ('\nYour order has been placed! Your total is $' + productData.price * quantity);
                        console.log ('\nThank you for shopping with us!');
                        console.log ('\n ----------------------------\n');

                        connection.end();
                    })
                } else {
                        console.log ('\nInsufficient! There is not enough product in stock, therefore, your order cannot be placed.');
                        console.log ('\nPlease modify your order and replace your products again.');
                        console.log('\n----------------------------------------------\n');

                        displayInventory();
                }
            }
        })
    })
}


//displaying full inventory from mySQL database and putting it into the console utilizing cli-table
// function displayInventory() {
//     var queryDB = 'SELECT * FROM products';

//     connection.query(queryDB, function (err, data){
//         if (err) throw err;

//         console.log ('Existing Inventory: ');
//         console.log('*********************\n');
        
//         var input = '';
//         for (var i = 0; i < data.length; i++) {
//             input = '';
//             input += 'Item ID: ' + data[i].item_id + ' // ';
//             input += 'Product Name: ' + data[i].name + ' // ';
//             input += 'Department: ' + data[i].department_name + ' // ';
//             input += 'Price: $' + data[i].price + ' // ';
//             input += 'Quantity: ' + data[i].stock_quantity;

//             console.log(input);
//         }

//         console.log('----------------------------------------\n');

//         userPurchase();

//     })
// }

function runBamazon () {
    displayInventory();
}


runBamazon();