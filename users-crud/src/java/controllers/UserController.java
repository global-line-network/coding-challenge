/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controllers;

import entities.Users;
import java.util.List;
import javax.ejb.EJB;
import javax.ejb.EJBException;
import javax.enterprise.context.RequestScoped;
import javax.inject.Named;
import sessions.UsersFacade;

/**
 *
 * @author Mohammad
 */

@Named
@RequestScoped
public class UserController {
    
    @EJB
    private UsersFacade uf;
    
    private Users user;
    private Users selectedUser;
    
    private int id;
    private String name;
    private String date;
    private String image;
    
    public UserController(){
        user = new Users();
        selectedUser = new Users();
    }

    public Users getSelectedUser() {
        return selectedUser;
    }

    public void setSelectedUser(Users selectedUser) {
        this.selectedUser = selectedUser;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
    
    public List<Users> all(){
        List<Users> users = uf.findAll();
        if(users != null)
            return users;
        return null;
    }
    
    public void create(){
        user.setId(id);
        user.setName(name);
        user.setDate(date);
        user.setImage(image);
        
        try{
            uf.create(user);    
        }catch(Exception ex){
            throw new EJBException(ex.toString());
        }        
    }
    
    public void update(){
        uf.edit(selectedUser);
    }
    
    public void delete(Users user){
        uf.remove(user);       
    }    
    
}
