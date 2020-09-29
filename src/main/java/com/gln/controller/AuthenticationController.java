package com.gln.controller;

import com.gln.model.User;
import com.gln.payload.*;
import com.gln.security.PBKDF2Encoder;
import com.gln.security.TokenUtils;
import com.gln.service.UserService;
import org.eclipse.microprofile.config.inject.ConfigProperty;

import javax.annotation.security.PermitAll;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.validation.ConstraintViolationException;
import javax.validation.Valid;
import javax.validation.ValidationException;
import javax.validation.Validator;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Optional;

@Path("/api")
public class AuthenticationController {

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
    @Path("/login") @Produces(MediaType.APPLICATION_JSON)
    public Response login(AuthRequest authRequest) throws ValidationException {

        try{
            validator.validate(authRequest);
        } catch (ConstraintViolationException e) {
            return Response.status(Response.Status.BAD_REQUEST).entity(new ErrorResponse("Missing password")).build();
        }

        Optional<User> user = userService.findByEmail(authRequest.getEmail());
        if (user.isPresent() && user.get().getPassword().equals(passwordEncoder.encode(authRequest.getPassword()))) {
            try {
                return Response.ok(new AuthResponse(TokenUtils.generateToken(user.get().getEmail(), duration, issuer))).build();
            } catch (Exception e) {
                return Response.status(Response.Status.UNAUTHORIZED).build();
            }
        } else {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
    }

    @PermitAll
    @Transactional
    @POST @Path("/register") @Produces(MediaType.APPLICATION_JSON)
    public Response signup(@Valid SignUpRequest signUpRequest) throws Exception {

        try{
            validator.validate(signUpRequest);
        } catch (ConstraintViolationException e) {
            return Response.status(Response.Status.BAD_REQUEST).entity(new ErrorResponse("Missing password")).build();
        }

        Optional<User> u = userService.findByEmail(signUpRequest.getEmail());
        if (u.isPresent()){
            return Response.ok(new ErrorResponse("User Already Exist")).build();
        }else {
            User userData = new User(signUpRequest.getEmail(), passwordEncoder.encode(signUpRequest.getPassword()));
            userService.addUser(userData);
            if (userService.isUserPersistent(userData)){
                Optional<User> userResponse = userService.findByEmail(signUpRequest.getEmail());
                return Response.ok(new SignUpResponse(userResponse.get().getId(), TokenUtils.generateToken(userResponse.get().getEmail(), duration, issuer))).build();
            }else {
                return Response.status(Response.Status.BAD_REQUEST).build();
            }
        }
    }


}
