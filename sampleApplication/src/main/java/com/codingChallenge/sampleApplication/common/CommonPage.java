package com.codingChallenge.sampleApplication.common;

import com.github.pagehelper.PageInfo;
import lombok.Data;

import java.util.List;

@Data
public class CommonPage<T> {
    private Integer page;
    private Integer perPage;
    private Integer totalPages;
    private Long total;
    private List<T> list;

    public static <T> CommonPage<T> restPage(List<T> list) {
        CommonPage<T> result = new CommonPage<T>();
        PageInfo<T> pageInfo = new PageInfo<T>(list);
        result.setTotalPages(pageInfo.getPages());
        result.setPage(pageInfo.getPageNum());
        result.setPerPage(pageInfo.getPageSize());
        result.setTotal(pageInfo.getTotal());
        result.setList(pageInfo.getList());
        return result;
    }
}
