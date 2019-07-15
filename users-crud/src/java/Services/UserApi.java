/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Services;

import entities.Users;
import java.util.List;
import javax.ejb.EJB;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import sessions.UsersFacade;

/**
 *
 * @author Mohammad
 */

@Path("/users")
public class UserApi {
    
    @EJB
    private UsersFacade uf;
    
    @GET
    @Path("")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Users> all(){
        List<Users> users = uf.findAll();
        if(users != null)
            return users;
        return null;
    }
    
    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Users show(@PathParam("id") int id){
        //return String.valueOf(id);
        Users user = uf.find(id);
        if(user != null)
            return user;
        return null;
    }    
    
    @DELETE
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response delete(@PathParam("id") int id){
        Users user = uf.find(id);
        if(user != null){
            uf.remove(user);
            return Response.status(Response.Status.NO_CONTENT).build();
        }
        return Response.status(Response.Status.NOT_FOUND).build();
    }    
    
    @PUT
    @Path("/{id}/update/{name}/{date}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response update(@PathParam("id") int id, @PathParam("name") String name, @PathParam("date") String date){
        Users user = uf.find(id);
        if(user != null){
            user.setName(name);
            user.setDate(date);
            uf.edit(user);
            return Response.ok(user).build();
        }
        return Response.status(Response.Status.NOT_FOUND).build();
    }
    
}
