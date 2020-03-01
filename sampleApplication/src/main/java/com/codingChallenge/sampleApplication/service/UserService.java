package com.codingChallenge.sampleApplication.service;

import com.codingChallenge.sampleApplication.dto.UserInfoDto;
import com.codingChallenge.sampleApplication.enums.ErrorStatus;
import com.codingChallenge.sampleApplication.exception.ServiceException;
import com.codingChallenge.sampleApplication.mapper.UserMapper;
import com.github.pagehelper.PageHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserMapper userMapper;

    public List<UserInfoDto> getUserList(int page, int limit) {
        PageHelper.startPage(page, limit);
        // Following Mapper call fetch the usr list from DB
        //List<UserInfoDto> userList = userMapper.getList();
        // Sample output
        List<UserInfoDto> userList = getUserSampleList();
        if (userList.size() == 0) {
            throw new ServiceException(ErrorStatus.DATA_NOT_FOUND);
        }
        return userList;

    }


    private List<UserInfoDto> getUserSampleList() {
        List<UserInfoDto> list = new ArrayList<>();
        UserInfoDto usr1 = new UserInfoDto();
        usr1.setId(7L);
        usr1.setEmail("michael.lawson@reqres.in");
        usr1.setFirst_name("Michael");
        usr1.setLast_name("Lawson");
        usr1.setAvatar("https://s3.amazonaws.com/uifaces/faces/twitter/follettkyle/128.jpg");
        list.add(usr1);

        UserInfoDto usr2 = new UserInfoDto();
        usr2.setId(8L);
        usr2.setEmail("lindsay.ferguson@reqres.in");
        usr2.setFirst_name("Lindsay");
        usr2.setLast_name("Ferguson");
        usr2.setAvatar("https://s3.amazonaws.com/uifaces/faces/twitter/araa3185/128.jpg");
        list.add(usr2);

        UserInfoDto usr3 = new UserInfoDto();
        usr3.setId(9L);
        usr3.setEmail("tobias.funke@reqres.in");
        usr3.setFirst_name("Tobias");
        usr3.setLast_name("Funke");
        usr3.setAvatar("https://s3.amazonaws.com/uifaces/faces/twitter/vivekprvr/128.jpg");
        list.add(usr3);

        UserInfoDto usr4 = new UserInfoDto();
        usr4.setId(10L);
        usr4.setEmail("byron.fields@reqres.in");
        usr4.setFirst_name("Byron");
        usr4.setLast_name("Fields");
        usr4.setAvatar("https://s3.amazonaws.com/uifaces/faces/twitter/russoedu/128.jpg");
        list.add(usr4);

        UserInfoDto usr5 = new UserInfoDto();
        usr5.setId(11L);
        usr5.setEmail("byron.fields@reqres.in");
        usr5.setFirst_name("Byron");
        usr5.setLast_name("Fields");
        usr5.setAvatar("https://s3.amazonaws.com/uifaces/faces/twitter/russoedu/128.jpg");
        list.add(usr5);

        UserInfoDto usr6 = new UserInfoDto();
        usr6.setId(12L);
        usr6.setEmail("rachel.howell@reqres.in");
        usr6.setFirst_name("Rachel");
        usr6.setLast_name("Howell");
        usr6.setAvatar("https://s3.amazonaws.com/uifaces/faces/twitter/hebertialmeida/128.jpg");
        list.add(usr6);

        return list;
    }
}
