/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Model;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 *
 * @author Mohammad
 */
public class MySqlConnection {

    private String username = "root";
    private String password = "";
    private String hostname = "localhost";
    private String port = "3306";
    private String database = "assessment";
    private String classname = "com.mysql.jdbc.Driver";
    private String url = "jdbc:mysql://" + hostname + ":" + port + "/" + database;
    private Connection con;

    public MySqlConnection() {
        try{
            Class.forName(classname);
            con = DriverManager.getConnection(url, username, password);            
        }catch(ClassNotFoundException ex){
            System.out.println(ex.getMessage());
        }catch(SQLException ex){
            System.out.println(ex.getMessage());
        }
    }
    
    public Connection getConnection(){
        return con;
    }   
    
}
