package com.example.azwarakbar.utils;

import org.apache.commons.lang3.RandomStringUtils;

import java.nio.charset.Charset;
import java.util.Random;

public class ZString {

    public static String generateRandomStr() {
        int length = 24;
        boolean useLetters = true;
        boolean useNumbers = false;
        String generatedString = RandomStringUtils.random(length, useLetters, useNumbers);

        return generatedString;
    }
}
