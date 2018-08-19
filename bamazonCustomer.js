var mysql = require("mysql");
var inquirer = require("inquirer");
var consTAble = require("console.table");

//create connection info for sql database
var connection = mysql.createConnection({
host: "localhost",
port:3306,
user: "root",
password: "root",
databse: "bamazon_DB"
});

//connect to the mysql server and database
connection.connect(function(err){
    if (err) throw err;
    console.log("Connected");
    start();
});

function start(){
    connection.query("SELECT * FROM bamazon_DB.products", function(err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
        inquirer
        
        .prompt ([
            {
            name: "productID",
            type: "input",
            message: "What is the ID of the product you would like to buy?"
        },
        {
            name: "units",
            type: "input",
            message: "How many units would you like to buy?"
        }
    ])
    .then(function(answer){
        console.log("Product ID: " + answer.productID);
        console.log("Units: " + answer.units);
    })
})}

