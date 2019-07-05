/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Controller;
import POJO.User;
import Model.UserModel;

/**
 *
 * @author Mohammad
 */
public class UserController {
    
    public boolean createUser(User user){
        UserModel userModel = new UserModel();
        return userModel.createUser(user);
    }    
}
