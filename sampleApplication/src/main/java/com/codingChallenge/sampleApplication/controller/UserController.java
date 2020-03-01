package com.codingChallenge.sampleApplication.controller;

import com.codingChallenge.sampleApplication.common.CommonPage;
import com.codingChallenge.sampleApplication.common.CommonResponse;
import com.codingChallenge.sampleApplication.dto.UserInfoDto;
import com.codingChallenge.sampleApplication.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/users")
    public CommonResponse<CommonPage<UserInfoDto>> userList(@RequestParam(defaultValue = "1") int page,
                                                            @RequestParam(defaultValue = "12") int limit) {
        List<UserInfoDto> userList = userService.getUserList(page, limit);
        return CommonResponse.success(CommonPage.restPage(userList));
    }
}
