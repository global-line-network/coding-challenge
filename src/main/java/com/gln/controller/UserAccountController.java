package com.gln.controller;

import com.gln.model.UserAccount;
import com.gln.security.Roles;

import javax.annotation.security.RolesAllowed;
import javax.transaction.Transactional;
import javax.validation.Valid;
import javax.validation.ValidationException;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/api/users")
@RolesAllowed(Roles.USER)
public class UserAccountController {

    @POST
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createUserAccount(@Valid UserAccount request) throws ValidationException {
        request.persist();
        return Response.status(Response.Status.CREATED).entity(request).build();
    }


    @PUT
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateUserAccount(UserAccount request){
        request.update("job = ?1 where name = ?2", request.job, request.name);
        return Response.status(Response.Status.OK).entity(request).build();
    }

    @DELETE
    @Transactional
    @Path("/{id}")
    public Response deleteUserAccount(@PathParam("id") long id){
        UserAccount.deleteById(id);
        return Response.status(Response.Status.NO_CONTENT).build();
    }

}
