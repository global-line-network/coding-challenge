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
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@QuarkusTest
public class UserAccountResourceTest {

    @InjectMock
    UserAccountRepository mockRepository;

    @Test
    void getUserIdWithoutAuthenticationTest() {
        long userAccountID  = 2;
        given()
                .when().get("/api/users/"+userAccountID)
                .then()
                .statusCode(401);
        verify(mockRepository, times(0)).findByIdOptional(userAccountID);
    }

    @Test
    @TestSecurity(authorizationEnabled = false)
    void getUserByIdTest() {
        long userAccountID  = 2;
        Mockito.when(mockRepository.findByIdOptional(userAccountID)).thenReturn(createSampleUser());

        given()
                .when().get("/api/users/"+userAccountID)
                .then()
                .statusCode(200)
                .body("ad.company", is("StatusCode Weekly"))
                .body("data.name", is("Ramsey"));
        verify(mockRepository, times(1)).findByIdOptional(userAccountID);
    }

    private static Optional<UserAccount> createSampleUser(){
        var newUser = new UserAccount();
        newUser.setJob("Tester");
        newUser.setName("Ramsey");
        return Optional.ofNullable(newUser);
    }

}