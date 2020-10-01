package com.example.azwarakbar.components.factory;

import com.example.azwarakbar.components.UserProviderImp;
import io.ebean.EbeanServer;
import io.ebean.EbeanServerFactory;
import io.ebean.config.ServerConfig;
import org.springframework.beans.factory.FactoryBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class EbeanFactoryBean implements FactoryBean<EbeanServer> {

    @Autowired
    UserProviderImp currentUser;

    @Override
    public EbeanServer getObject() throws Exception {
        ServerConfig config = new ServerConfig();

        config.setName("db");
        config.setCurrentUserProvider(currentUser);
        config.loadFromProperties();
        config.loadTestProperties();
        config.setDdlGenerate(true);
        config.setDdlRun(true);

        return EbeanServerFactory.create(config);
    }

    @Override
    public Class<?> getObjectType() {
        return EbeanServer.class;
    }

    @Override
    public boolean isSingleton() {
        return true;
    }
}
