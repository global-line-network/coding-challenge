package com.gln.resource;

import com.gln.model.UserAccount;
import com.gln.repository.UserAccountRepository;
import io.quarkus.test.junit.QuarkusTest;
import io.quarkus.test.junit.mockito.InjectMock;
import io.quarkus.test.security.TestSecurity;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.Optional;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.Matchers.hasItem;

@QuarkusTest
public class UserAccountResourceTest {

    @InjectMock
    UserAccountRepository mockRepository;

    @Test
    void createUserAccount() {
    }

    @Test
    void updateUserAccount() {
    }

    @Test
    void deleteUserAccount() {
    }

    @Test
    @TestSecurity(authorizationEnabled = false)
    void getUserById() {
        int userAccountID  = 2;
        Mockito.when(mockRepository.findByIdOptionalInt(userAccountID)).thenReturn(createSampleUser());

        given()
                .when().get("/api/users/"+userAccountID)
                .then()
                .statusCode(200)
                .body("ad.company", is("StatusCode Weekly"))
                .body("data.name", hasItem("Ramsey"));
    }


    private static Optional<UserAccount> createSampleUser(){
        UserAccount newUser = new UserAccount();
        newUser.setJob("Tester");
        newUser.setName("Ramsey");
        return Optional.ofNullable(newUser);
    }


}