package com.example.azwarakbar.services;

import com.example.azwarakbar.components.factory.EbeanFactoryBean;
import com.example.azwarakbar.models.ProductResource;
import com.example.azwarakbar.models.User;
import com.example.azwarakbar.models.UserJob;
import com.example.azwarakbar.response.ProductResourceFormat;
import com.example.azwarakbar.response.UserFormat;
import com.example.azwarakbar.utils.ZJson;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import io.ebean.EbeanServer;
import io.ebean.PagedList;
import io.ebean.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductResourceService {

    private static final int PAGING_SIZE = 6;

    @Autowired
    EbeanServer server;

    @Transactional
    public ProductResource save(ProductResource data) {
        server.save(data);

        return data;
    }

    public ObjectNode getList(int page) {
        int indexPage = page > 0 ? page - 1 : page;
        initDataResource();
        PagedList<ProductResource> pageUser = server.find(ProductResource.class)
                .setFirstRow(PAGING_SIZE * indexPage)
                .setMaxRows(PAGING_SIZE)
                .findPagedList();

        ObjectMapper mapper = new ObjectMapper();
        ObjectNode objNode = mapper.createObjectNode();
        ArrayNode arrayNodeUser = ZJson.toArrayNode(getFormattedList(pageUser.getList()));

        objNode.put("page", page);
        objNode.put("per_page", PAGING_SIZE);
        objNode.put("total", pageUser.getTotalCount());
        objNode.put("total_pages", pageUser.getTotalPageCount());
        objNode.set("data", arrayNodeUser);

        return objNode;
    }

    private List<ProductResourceFormat> getFormattedList(List<ProductResource> list) {
        List<ProductResourceFormat> listUserFormats = new ArrayList<>();

        for (ProductResource pr : list) {
            ProductResourceFormat prf = new ProductResourceFormat(pr.getId(), pr.getName(), pr.getYear(),
                    pr.getColor(), pr.getPantoneValue());

            listUserFormats.add(prf);
        }

        return listUserFormats;
    }

    private void initDataResource() {
        if (server.find(ProductResource.class).findCount() != 0) {
            return;
        }

        ProductResource pr1 = new ProductResource("cerulean", 2000, "#C74375", "15-4020");
        ProductResource pr2 = new ProductResource("fuchsia rose", 2001, "#C74375", "17-2031");
        ProductResource pr3 = new ProductResource("true red", 2002, "#BF1932", "19-1664");
        ProductResource pr4 = new ProductResource("aqua sky", 2003, "#7BC4C4", "14-4811");
        ProductResource pr5 = new ProductResource("tigerlily", 2004, "#E2583E", "17-1456");
        ProductResource pr6 = new ProductResource("blue turquoise", 2005, "#53B0AE", "15-5217");
        ProductResource pr7 = new ProductResource("cerulean 2", 2000, "#C74375", "15-4020");
        ProductResource pr8 = new ProductResource("fuchsia rose 2", 2001, "#C74375", "17-2031");
        ProductResource pr9 = new ProductResource("true red 2", 2002, "#BF1932", "19-1664");

        server.save(pr1);
        server.save(pr2);
        server.save(pr3);
        server.save(pr4);
        server.save(pr5);
        server.save(pr6);
        server.save(pr7);
        server.save(pr8);
        server.save(pr9);
    }

    public ProductResourceFormat getSingle(Long id) {
        ProductResource pr = server.find(ProductResource.class)
                .where()
                .eq("id", id)
                .findOne();

        if (pr == null) {
            return null;
        }

        ProductResourceFormat prf = new ProductResourceFormat(pr.getId(),
                pr.getName(), pr.getYear(), pr.getColor(), pr.getPantoneValue());

        return prf;
    }
}
