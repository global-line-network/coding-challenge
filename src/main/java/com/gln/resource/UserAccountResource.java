package com.gln.resource;

import com.gln.model.UserAccount;
import com.gln.repository.UserAccountRepository;
import com.gln.resource.support.PageRequest;
import com.gln.resource.support.ResourceSupport;
import com.gln.security.Roles;

import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.validation.Valid;
import javax.validation.ValidationException;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

@Path(UserAccountResource.RESOURCE_PATH)
@RolesAllowed(Roles.USER)
@Produces(MediaType.APPLICATION_JSON)
public class UserAccountResource {

    public static final String RESOURCE_PATH = "/api/users";

    @Context
    UriInfo uriInfo;

    @Inject
    UserAccountRepository repository;

    @POST
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    public Response createUserAccount(@Valid UserAccount request) throws ValidationException {
        return ResourceSupport.create(request, repository, uriInfo);
    }

    @PUT
    @Path("{id}")
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateUserAccount(@PathParam("id") Long id,UserAccount request){
        var toUpdateOptional = repository.findByIdOptional(id);
        if (toUpdateOptional.isPresent()) {
            var toUpdate = toUpdateOptional.get();
            toUpdate.setName(request.getName());
            toUpdate.setJob(request.getJob());
            return ResourceSupport.update(toUpdate, repository, uriInfo);
        }
        return Response.status(Response.Status.NOT_FOUND).build();
    }

    @DELETE
    @Transactional
    @Path("/{id}")
    public Response deleteUserAccount(@PathParam("id") long id){
        var userAccount = repository.findByIdOptional(id);
        userAccount.ifPresent(v -> repository.delete(v));
        return Response.noContent().build();
    }

    @GET
    @Path("/{id}")
    public Response getUserById(@PathParam("id") long id){
       return ResourceSupport.getOne(id, repository);
    }

    @GET
    public Response getAllUserAccount(@BeanParam PageRequest pageRequest){
        return ResourceSupport.getAll(pageRequest, repository);
    }

}
