package id.globallinenetwork.api.resource;

import id.globallinenetwork.api.utility.GetSingleData;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ResourceController {

    private final ResourcesService resourcesService;

    public ResourceController(ResourcesService resourcesService) {
        this.resourcesService = resourcesService;
    }

    @GetMapping(value = "/unknown/{page}")
    public ResponseEntity<ListAllResourceDto> getAllResources(@PathVariable Integer page) {
        ListAllResourceDto allResourceDto = resourcesService.getAllResources(page);
        List<Resource> resources = resourcesService.getResources();
        if (resources.isEmpty()) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(allResourceDto, HttpStatus.OK);
    }

    @GetMapping(value = "/unknown/{id}")
    public ResponseEntity<?> getSingleResource(@PathVariable Integer id) {
        Map<String, Object> resource = resourcesService.getSingleResource(id);
        return GetSingleData.getResponseEntity(resource);
    }


}
