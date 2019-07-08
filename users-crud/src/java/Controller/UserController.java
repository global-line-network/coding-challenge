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

    public String getUsersView(){
        String htmlCode = "";
        
        UserModel userModel = new UserModel();
        int i = 0;
        for (User user : userModel.getallUsers()) {
            if(i%2==0)
                htmlCode += "<div class=\"row\">";
            htmlCode += "<div class=\"col-6\">\n" +
"                <div class=\"user-info mt-4\">\n" +
"                    <img src=\"/users-crud/images/" + user.getImage() + "\" alt=\"\">\n" +
"\n" +
"                    <h2 class=\"user-name\">" + user.getName() + "</h2>\n" +
"                    <input type=\"text\" name=\"txt_name\" value=\"" + user.getName() + "\" class=\"form-control txt-edit txt-name\">\n" +
"                    <h4 class=\"user-date\">" + user.getDate() + "</h4>\n" +
"                    <input type=\"text\" name=\"txt_date\" value=\"" + user.getDate() + "\" class=\"form-control txt-edit txt-date\">\n" +
"\n" +
"                    <!-- action buttons -->\n" +
"                    <a href=\"#\" class=\"btn btn-outline-secondary action edit\"><i class=\"fa fa-pencil-alt\"></i></a>\n" +
"                    <a href=\"#\" class=\"btn btn-outline-secondary action delete\"><i class=\"fa fa-trash-alt\"></i></a>\n" +
"\n" +
"                    <!-- confirm buttons -->\n" +
"                    <a href=\"#\" class=\"btn btn-success text-white confirm send\"><i class=\"fa fa-check\"></i></a>\n" +
"                    <a href=\"#\" class=\"btn btn-danger text-white confirm cancel\"><i class=\"fa fa-times\"></i></a>\n" +
"                </div>\n" +
"            </div>";
            
            if((i+1) % 2== 0)
                htmlCode += "</div>";
            i++;
        }
        
        return htmlCode;
    }
}
