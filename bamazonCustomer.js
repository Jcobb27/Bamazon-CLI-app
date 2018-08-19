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

function start() {
    connection.query("SELECT * FROM bamazon_DB.products", function (err, res) {
        if (err) throw err;
        // console log table
        console.table(res);

        inquirer
            .prompt([
                {
                    name: "productID",
                    type: "input",
                    message: "What is the ID of the product you would like to buy?"
                },
                {
                    name: "units",
                    type: "input",
                    message: "How many would you like to buy?"
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
           
                //determine if enough items are in stock
                //if insufficient quantity, display message and restart
                if (parseInt(answer.units) > chosenItem.stock_quantity) {
                    console.log("Insufficient quantity!");
                    start();
                }
                else {
                    //calculate price for x number of items at y price
                    var totalPrice = parseInt(answer.units) * chosenItem.price;
                    //calculate updated quantity after purchase
                    var newQuantity = chosenItem.stock_quantity - answer.units;

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
                            //console log successful purchase and restart
                            console.log("You have successfully purchased " + answer.units + " " + chosenItem.product_name + " for " + totalPrice + " dollars.");
                            start();
                        }
                    );
                }
            })
    })
}

