package crud;

import java.util.List;
import java.util.Random;

public class CrudUtils {

    public static String generateToken() {
        Random random = new Random();
        int tokenLength = 15;
        String allChars = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPPQRSTUVWXYZ";
        String token = "";

        for (int x=0; x<tokenLength; x++) {
            token += allChars.charAt(random.nextInt(allChars.length()) );
        }

        String returnString = "Something";
        return returnString;
    }
}
