package com.gln.resource;

import com.gln.model.User;
import com.gln.payload.*;
import com.gln.security.PBKDF2Encoder;
import com.gln.security.TokenUtils;
import com.gln.service.UserService;
import com.gln.util.ErrorMessages;
import org.eclipse.microprofile.config.inject.ConfigProperty;

import javax.annotation.security.PermitAll;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.validation.*;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Optional;
import java.util.Set;

@Path("/api")
public class AuthenticationResource {

    @Inject
    PBKDF2Encoder passwordEncoder;

    @Inject
    UserService userService;

    @Inject
    Validator validator;

    @ConfigProperty(name = "gln.quarkusjwt.jwt.duration") Long duration;
    @ConfigProperty(name = "mp.jwt.verify.issuer") String issuer;

    @PermitAll
    @POST
    @Path("/login")
    @Produces(MediaType.APPLICATION_JSON)
    public Response login(AuthRequest authRequest) {

        Set<ConstraintViolation<AuthRequest>> violations = validator.validate(authRequest);
        if (violations.isEmpty()) {
            Optional<User> user = userService.findByEmail(authRequest.getEmail());
            if (user.isPresent() && user.get().getPassword().equals(passwordEncoder.encode(authRequest.getPassword()))) {
                try {
                    return Response.ok(new AuthResponse(TokenUtils.generateToken(user.get().getEmail(), duration, issuer))).build();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }else{
                return Response.status(Response.Status.NOT_FOUND).entity(new ErrorResponse(ErrorMessages.ERROR_MESSAGES_USER_NOT_FOUND)).build();
            }

        }
        return Response.status(Response.Status.BAD_REQUEST).entity(new ErrorResponse(ErrorMessages.ERROR_MESSAGES_MISSING_PASSWORD)).build();

    }

    @PermitAll
    @Transactional
    @POST
    @Path("/register")
    @Produces(MediaType.APPLICATION_JSON)
    public Response signup(SignUpRequest signUpRequest) {

        Set<ConstraintViolation<SignUpRequest>> violations = validator.validate(signUpRequest);
        if (violations.isEmpty()) {
            Optional<User> u = userService.findByEmail(signUpRequest.getEmail());
            if (u.isPresent()) {
                return Response.ok(new ErrorResponse(ErrorMessages.ERROR_MESSAGES_USER_EXIST)).build();
            } else {
                User userData = new User(signUpRequest.getEmail(), passwordEncoder.encode(signUpRequest.getPassword()));
                userService.addUser(userData);
                if (userService.isUserPersistent(userData)) {
                    Optional<User> userResponse = userService.findByEmail(signUpRequest.getEmail());
                    try {
                        return Response.ok(new SignUpResponse(userResponse.get().getId(), TokenUtils.generateToken(userResponse.get().getEmail(), duration, issuer))).build();
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            }
        }
        return Response.status(Response.Status.BAD_REQUEST).entity(new ErrorResponse(ErrorMessages.ERROR_MESSAGES_MISSING_PASSWORD)).build();
    }


}
