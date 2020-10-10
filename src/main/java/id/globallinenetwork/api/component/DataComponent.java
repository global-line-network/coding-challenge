package id.globallinenetwork.api.component;

import id.globallinenetwork.api.resource.ResourcesService;
import id.globallinenetwork.api.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class DataComponent {

    private final UserService userService;
    private final ResourcesService resourcesService;

    public DataComponent(UserService userService, ResourcesService resourcesService) {
        this.userService = userService;
        this.resourcesService = resourcesService;
    }

    @PostConstruct
    public void initDataUserService(){
        userService.initializeData();
    }

    @PostConstruct
    void initDataResourceService(){
        resourcesService.initializeData();
    }
}
