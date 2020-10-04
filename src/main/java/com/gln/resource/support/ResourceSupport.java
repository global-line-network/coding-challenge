package com.gln.resource.support;

import com.gln.model.Advertising;
import com.gln.model.BaseEntity;
import com.gln.model.UserAccount;
import com.gln.payload.AllUserInfo;
import com.gln.payload.UserInfo;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import io.quarkus.panache.common.Page;


import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import java.net.URI;
import java.util.List;
import java.util.function.Function;

public final class ResourceSupport {

    static final Advertising advertising = new Advertising("StatusCode Weekly",
            "http://statuscode.org/",
            "A weekly newsletter focusing on software development, infrastructure, the server, performance, and the stack end of things.");

    public static Response getAll(PageRequest pageRequest, PanacheRepository repository) {
        if (pageRequest.getPageSize()> 0 && pageRequest.getPageNum() >= 0){
            List<UserAccount> userAccountList = repository.findAll()
                    .page(Page.of(pageRequest.getPageNum(), pageRequest.getPageSize()))
                    .list();
            AllUserInfo allUserInfo = new AllUserInfo(advertising, userAccountList,
                    pageRequest.getPageSize(), userAccountList.size(),
                    pageRequest.getPageNum(),
                    Math.abs(userAccountList.size()/pageRequest.getPageSize()));
            return Response.ok(allUserInfo).build();
        }
        return Response.status(Response.Status.NO_CONTENT).build();
    }

    public static Response getOne(Long id, PanacheRepository repository) {
       return getItem(id, repository, Function.identity());
    }

    public static Response getItem(Long id, PanacheRepository repository, Function itemExtractor) {
        var optional = repository.findByIdOptional(id);
        if (optional.isEmpty()) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        UserInfo userInfo = new UserInfo(advertising, (UserAccount) optional.get());
        return Response.ok(itemExtractor.apply(userInfo)).build();
    }

    public static <T extends BaseEntity> Response create(T entity, PanacheRepository<T> repository, UriInfo uriInfo) {

        repository.persist(entity);
        URI location = uriInfo.getAbsolutePathBuilder()
                .path("{id}")
                .resolveTemplate("id", entity.getId())
                .build();

        T userAccount = repository.findById(entity.getId());
        return Response.created(location).entity(userAccount).build();
    }

    public static <T extends BaseEntity> Response update(T entity, PanacheRepository<T> repository, UriInfo uriInfo) {
        repository.persist(entity);
        return Response.ok(entity).build();
    }
}
