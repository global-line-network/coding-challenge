package com.gln.resource;

import com.gln.model.Advertising;
import com.gln.model.UserAccount;
import com.gln.payload.AllUserInfo;
import com.gln.payload.UserInfo;
import com.gln.repository.UserAccountRepository;
import com.gln.security.Roles;
import io.quarkus.hibernate.orm.panache.PanacheQuery;
import io.quarkus.panache.common.Page;
import io.quarkus.panache.common.Sort;

import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.validation.Valid;
import javax.validation.ValidationException;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Path(UserAccountResource.RESOURCE_PATH)
@RolesAllowed(Roles.USER)
@Produces(MediaType.APPLICATION_JSON)
public class UserAccountResource {

    @Inject
    UserAccountRepository repository;

    public static final String RESOURCE_PATH = "/api/users";

    Advertising advertising = new Advertising("StatusCode Weekly",
            "http://statuscode.org/",
            "A weekly newsletter focusing on software development, infrastructure, the server, performance, and the stack end of things.");

    @POST
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    public Response createUserAccount(@Valid UserAccount request) throws ValidationException {
        repository.persist(request);
        return Response.status(Response.Status.CREATED).entity(request).build();
    }


    @PUT
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateUserAccount(UserAccount request){
        repository.update("job = ?1 where name = ?2", request.job, request.name);
        return Response.status(Response.Status.OK).entity(request).build();
    }

    @DELETE
    @Transactional
    @Path("/{id}")
    public Response deleteUserAccount(@PathParam("id") long id){
        repository.deleteById(id);
        return Response.status(Response.Status.NO_CONTENT).build();
    }

    @GET
    @Path("/{id}")
    public Response getUserById(@PathParam("id") int id){
        Optional<UserAccount> userAccount = repository.findByIdOptionalInt(id);
        if (userAccount.isPresent()){
            UserInfo userInfo = new UserInfo(advertising, List.of(userAccount.get()));
            return Response.ok().entity(userInfo).build();
        }else {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }

    @GET
    public Response getAllUserAccount(@QueryParam("page") int page){
        PanacheQuery<UserAccount> userAccountList = repository.findAll(Sort.by("id"));
        int pageSize = 6;
        if (userAccountList.count()>0){
            userAccountList.page(Page.ofSize(pageSize));
            int count = (int) userAccountList.count();
            int numberOfPages = userAccountList.pageCount();
            int lastPageNumber = (int) (Math.ceil(count / pageSize));
            List<UserAccount> pageUser = new ArrayList<>();
            if (page == 1){
                pageUser = userAccountList.list();
            }else if (page <= lastPageNumber ){
                pageUser = userAccountList.nextPage().list();
            }
            AllUserInfo userInfo = new AllUserInfo(advertising, pageUser, pageUser.size(), count, page, numberOfPages);
            return Response.status(Response.Status.OK).entity(userInfo).build();
        }
        return Response.status(Response.Status.NOT_FOUND).build();

    }

}
