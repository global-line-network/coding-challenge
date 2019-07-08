/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Model;

import POJO.User;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author Mohammad
 */
public class UserModel extends MySqlConnection{
    
    public boolean createUser(User user){
        PreparedStatement pst = null;
        boolean flag = false;
        
        try {            
            String sql = "insert into users (name, date, image) values(?, ?, ?)";
            pst = getConnection().prepareStatement(sql);
            pst.setString(1, user.getName()); 
            pst.setString(2, user.getDate()); 
            pst.setString(3, user.getImage());
            
            if(pst.executeUpdate() == 1)
                flag = true;            
           
        } catch (SQLException ex) {
            Logger.getLogger(UserModel.class.getName()).log(Level.SEVERE, null, ex);
        }finally{
            try {
                if(getConnection() != null) getConnection().close();
                if(pst != null) pst.close();
            } catch (SQLException ex) {
                Logger.getLogger(UserModel.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        return flag;
    }
    
    public List<User> getallUsers(){
        List<User> users = new ArrayList<>();
        
        Statement stmt = null;
        
        try{
            stmt = getConnection().createStatement();
            String sql = "select * from users";
            ResultSet rs = stmt.executeQuery(sql);
            
            while(rs.next()){
                int id = rs.getInt("id");
                String name = rs.getString("name");
                String date = rs.getString("date");
                String avatar = rs.getString("image");
                
                users.add(new User(id, name, date, avatar));
            }
            
        }catch(SQLException ex){
            Logger.getLogger(UserModel.class.getName()).log(Level.SEVERE, null, ex);
        }finally{
            try {
                if(getConnection() != null) getConnection().close();
                if(stmt != null) stmt.close();
            } catch (SQLException ex) {
                Logger.getLogger(UserModel.class.getName()).log(Level.SEVERE, null, ex);
            }
        }                
        
        return users;
    }
}
