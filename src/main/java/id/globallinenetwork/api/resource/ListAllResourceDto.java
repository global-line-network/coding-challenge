package id.globallinenetwork.api.resource;

import id.globallinenetwork.api.company.Company;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class ListAllResourceDto {
    private int page;
    private int perPage;
    private int totalData;
    private int totalPage;
    private Map<String, List<Resource>> data;
    private Map<String, Company> companyMap;
}
