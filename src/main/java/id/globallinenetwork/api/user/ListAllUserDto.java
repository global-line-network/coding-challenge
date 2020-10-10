package id.globallinenetwork.api.user;

import id.globallinenetwork.api.company.Company;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class ListAllUserDto {
    private int page;
    private int perPage;
    private int totalData;
    private int totalPage;
    private Map<String, List<ResponseSingleUser>> data;
    private Map<String, Company> companyMap;
}
