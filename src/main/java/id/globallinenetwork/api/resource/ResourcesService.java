package id.globallinenetwork.api.resource;

import id.globallinenetwork.api.company.Company;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ResourcesService implements IResource {
    private List<Resource> resources = null;
    private Company company = null;

    public void initializeData(){
        resources = new ArrayList<>();
        int id = 0;
        int year = 2000;

        resources.add(new Resource(++id, "cerulean", 2000, "#98B2D1", "15-4020"));
        resources.add(new Resource(++id, "fuchsia rose", ++year, "#C74375", "17-2031"));
        resources.add(new Resource(++id, "true read", ++year, "#BF1932", "19-1664"));
        resources.add(new Resource(++id, "aqua sky", ++year, "#7BC4C4", "17-2031"));
        resources.add(new Resource(++id, "tigerlily", ++year, "#E2583E", "17-1456"));
        resources.add(new Resource(++id, "blue turquoise", ++year, "#53B0AE", "15-5217"));

        company = new Company(1, "StatusCode " +
                "Weekly", "http://statuscode.org/",
                "A weekly newsletter focusing on software development, " +
                        "infrastructure, the server, performance, and the stack end of things.");
    }

    public List<Resource> getResources(){
        return resources;
    }

    @Override
    public ListAllResourceDto getAllResources(int page) {
        Map<String, List<Resource>> data = new HashMap<>();
        Map<String, Company> companyMap = new HashMap<>();
        ListAllResourceDto allResourceDto = new ListAllResourceDto();

        final int perPage = 6;
        allResourceDto.setPage(page);
        allResourceDto.setPerPage(perPage);
        allResourceDto.setTotalData(resources.size());
        allResourceDto.setTotalPage(resources.size()/perPage);

        List<Resource> resourceList = new ArrayList<>();
        for (int i = (perPage-1)*page; i < perPage*page; i++) {
            Resource resource = resources.get(i);
            resourceList.add(resource);
        }
        data.put("data", resourceList);
        allResourceDto.setData(data);
        companyMap.put("ad", company);
        allResourceDto.setCompanyMap(companyMap);

        return allResourceDto;
    }

    @Override
    public Map<String, Object> getSingleResource(Integer id) {
        Map<String, Object> data = new HashMap<>();
        if (id == null) {
            data.put("error", "Missing id");
            return data;
        }

        Optional<Resource> optionalResource =
                resources.stream().filter(user -> user.getId().equals(id)).findFirst();
        if (optionalResource.isPresent()) {
            Resource currentResource = optionalResource.get();
            data.put("data", currentResource);
            data.put("ad", company);
            return data;
        }

        return null;
    }
}
