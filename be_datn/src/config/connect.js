import mysql from "mysql"

export const dtb = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"",
  database:"foodsystem"
})