package id.globallinenetwork.api.resource;

import java.util.List;
import java.util.Map;

public interface IResource {
    ListAllResourceDto getAllResources(int page);
    Map<String, Object> getSingleResource(Integer id);
}
