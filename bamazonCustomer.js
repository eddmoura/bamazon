var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  displaytable();
});

var displaytable = function() {
connection.query("SELECT * FROM products", function(err, res) {
   if (err) throw err;
  
   var table = new Table({
    head:["item_id", "product_name", "department_name", "price", "stock_quantity"],
    colWidths: [10, 50, 25, 10, 20]
   });

    for(var i = 0; i < res.length; i++){
      var bamazonProducts = [res[i].item_id, res[i].product_name, res[i].department_name, "$ " + res[i].price, res[i].stock_quantity];
      table.push(bamazonProducts);
    }
    console.log(table.toString());

  });

};