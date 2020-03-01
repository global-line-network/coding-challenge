package com.codingChallenge.sampleApplication.mapper;

import com.codingChallenge.sampleApplication.dto.UserInfoDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserMapper {
    List<UserInfoDto> getList();
}
