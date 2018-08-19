var mysql = require("mysql");
var inquirer = require("inquirer");
var consTAble = require("console.table");

//create connection info for sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    databse: "bamazon_DB"
});

//connect to the mysql server and database
connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected");
    start();
});

//at start up, list menu options
function start() {
    inquirer
        .prompt([
            {
                name: "choice",
                type: "list",
                choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Quit"],
                message: "Menu Options:"
            }
        ])

        //case switch for different menu option actions
        .then(function (answer) {
            switch (answer.choice) {
                case "View Products for Sale":
                    viewProducts();
                    break;

                case "View Low Inventory":
                    lowInventory();
                    break;

                case "Add to Inventory":
                    addToInventory();
                    break;

                case "Add New Product":
                    newProduct();
                    break;

                case "Quit":
                    connection.end();
                    break;
            }
        })
}

//display products as a table
function viewProducts() {
    connection.query("SELECT * FROM bamazon_DB.products", function (err, res) {
        if (err) throw err;
        // console log table
        console.table(res);
        start();
    })
}

//check if inventory is lower than 5, and display that product
function lowInventory() {
    connection.query("SELECT * FROM bamazon_DB.products", function (err, res) {
        if (err) {
            console.log(err);
            throw err;
        }
        var lowStock = [];
        for (var i = 0; i < res.length; i++) {
            if (res[i].stock_quantity < 5) {
                lowStock.push(res[i]);
                console.table(lowStock);
            }
        }
        if (lowStock.length < 1) {
            console.log("No products have low inventory");
        }
        start();
    })
}

//add to inventory function
function addToInventory() {

    connection.query("SELECT * FROM bamazon_DB.products", function (err, res) {
        if (err) throw err;
        // console log table
        console.table(res);

        inquirer
            //Ask for product ID number and quantity
            .prompt([
                {
                    name: "productID",
                    type: "input",
                    message: "What is the ID of the product you would like to add inventory to?"
                },
                {
                    name: "units",
                    type: "input",
                    message: "How many would you like to add?"
                }
            ])
            .then(function (answer) {
                console.log("Product ID: " + answer.productID);
                console.log("Units: " + answer.units);
                //get the info of the chosen item
                var chosenItem;
                for (var i = 0; i < res.length; i++) {
                    if (res[i].item_id === parseInt(answer.productID)) {
                        chosenItem = res[i];
                    }
                }
                console.log(chosenItem);

                //calculate updated quantity 
                var newQuantity = chosenItem.stock_quantity + parseInt(answer.units);

                //update products table
                connection.query(
                    "UPDATE bamazon_DB.products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: newQuantity
                        },
                        {
                            item_id: chosenItem.item_id
                        }
                    ],
                    function (error) {
                        if (error) throw err;
                        //console log successful update and call viewProducts function (which will then restart)
                        console.log("You have successfully added " + answer.units + " " + chosenItem.product_name + " to the inventory");
                        viewProducts();
                    }
                );
            })
    })
}

function newProduct() {
    inquirer
        .prompt([
            {
                name: "productName",
                type: "input",
                message: "What is the name of the product you're adding?"
            },
            {
                name: "deptName",
                type: "input",
                message: "What department is the product in?"
            },
            {
                name: "price",
                type: "input",
                message: "What is the price of the product?"
            },
            {
                name: "stock",
                type: "input",
                message: "How many units of the product are you adding?"
            }
        ])
        .then(function (answer) {
            var query = "INSERT INTO bamazon_DB.products (product_name, department_name, price, stock_quantity) VALUES (?, ?, ?, ?)"
            //update products table
            connection.query(query, [answer.productName, answer.deptName, answer.price, answer.stock], function (error) {
                    if (error) throw err;
                    //console log success message
                    console.log("You have successfully added " + answer.stock + " " + answer.productName);
                    viewProducts();
                }
            );
        })
}
