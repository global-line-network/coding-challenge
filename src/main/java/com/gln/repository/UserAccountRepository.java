package com.gln.repository;

import com.gln.model.UserAccount;
import io.quarkus.hibernate.orm.panache.PanacheRepository;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class UserAccountRepository implements PanacheRepository<UserAccount> {

}
