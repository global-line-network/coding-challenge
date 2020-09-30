package com.gln.repository;

import com.gln.model.UserAccount;
import io.quarkus.hibernate.orm.panache.PanacheRepository;

import javax.enterprise.context.ApplicationScoped;
import java.util.Optional;

@ApplicationScoped
public class UserAccountRepository implements PanacheRepository<UserAccount> {

    public Optional<UserAccount> findByIdOptionalInt(int id){
        return find("id",id).firstResultOptional();
    }
}
