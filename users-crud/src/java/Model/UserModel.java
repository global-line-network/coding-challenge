/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Model;

import POJO.User;
import java.sql.PreparedStatement;
import java.sql.SQLException;
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
}
