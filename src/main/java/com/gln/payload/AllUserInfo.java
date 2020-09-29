package com.gln.payload;

import com.gln.model.Advertising;
import com.gln.model.UserAccount;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class AllUserInfo extends UserInfo{

    int per_page;
    int total;
    int page;
    int total_pages;

    public AllUserInfo(Advertising ad, List<UserAccount> data, int per_page, int total, int page, int total_pages) {
        super(ad, data);
        this.per_page = per_page;
        this.total = total;
        this.page = page;
        this.total_pages = total_pages;
    }

}
