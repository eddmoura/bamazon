var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

 
  user: "root",

  
  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  displaytable();
});
// npm "cli-table" is used here for a better view of the table in the Terminal.
var displaytable = function() {
connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
  // creation of the head of the row with their dimension
   var table = new Table({
    head:["item_id", "product_name", "department_name", "price", "stock_quantity"],
    colWidths: [10, 50, 25, 10, 20]
   });
  // var bamazonProducts takes each value from database and creates the table.
    for(var i = 0; i < res.length; i++){
      var bamazonProducts = [res[i].item_id, res[i].product_name, res[i].department_name, "$ " + res[i].price, res[i].stock_quantity];
      table.push(bamazonProducts);
    }
    // display the thable ate the terminal.
    console.log(table.toString());
    //starts shoppingCart function.
shoppingCart();
  });

};


var shoppingCart = function(){
      inquirer.prompt([{
       //e
        name: "Item_id",
        type: "input",
        message: "Please, enter the ID number of the item you would like to purchase."

      },
      {
      name:"Quantity",
      type: "input",
      message: "How many would you like to buy?"

  }]).then(function (answers) {

    var select = "SELECT * FROM products WHERE item_id=" + answers.Item_id;
     
     
    
    
    connection.query(select, function(err, res){
       
      if (err) throw err;
      //if quantity selected by user is greater than the available in stock will show the the warning and the table will be display for another try.
      if (answers.Quantity > res[0].stock_quantity){ 
      console.log("Sorry, Insufficient quantity!")
      displaytable();} 
     //update the stock quantity 
      else{
          connection.query("UPDATE products SET? WHERE?", [{stock_quantity: res[0].stock_quantity - answers.Quantity},
          
          {item_id: answers.Item_id}],

          function(err, res){
            
            if(err) throw err;

          });
        // calculate the price of the specify ID times the quantity selected by the user.
        var total = res[0].price * answers.Quantity;
        console.log("Your total is: $ " + total);

        // Ask if customer would like to keep shopping
         inquirer.prompt({

         name: "keepshoppimg",
         type: "confirm",
         message: "Would you like to keep shopping?"

        }).then(function(answer){
           //Display table if prompt Y
           if(answer.keepshoppimg === true){
           displaytable();} 
           // end the connection if prompt N
           else{
           console.log("Thanks for shopping with us!");
           connection.end();
         };

        });

      };

    });
         
  });

};





