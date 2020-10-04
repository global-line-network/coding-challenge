package com.gln.payload;

import com.gln.model.Advertising;
import com.gln.model.UserAccount;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class AllUserInfo {

    Advertising ad;
    List<UserAccount> data;
    int per_page;
    int total;
    int page;
    int total_pages;

}
