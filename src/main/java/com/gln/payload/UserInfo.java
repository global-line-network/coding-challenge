package com.gln.payload;

import com.gln.model.Advertising;
import com.gln.model.UserAccount;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserInfo {

    Advertising ad;
    UserAccount data;

}
