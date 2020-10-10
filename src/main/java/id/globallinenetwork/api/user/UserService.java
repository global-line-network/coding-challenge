package id.globallinenetwork.api.user;

import id.globallinenetwork.api.company.Company;
import id.globallinenetwork.api.utility.PasswordGenerator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.security.SecureRandom;
import java.time.Instant;
import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@Service
public class UserService implements IUser {

    private static final String EMAIL_DOMAIN = "@globallinenetwork.com";
    private static final Logger LOG = LoggerFactory.getLogger(Logger.class);
    private final List<User> users = new ArrayList<>();
    private SecureRandom secureRandom = null;
    private Company company;

    public void initializeData() {
        int companyId = 0;
        int userId = 0;

        try {
            secureRandom = SecureRandom.getInstance("SHA1PRNG", "SUN");
            companyId = secureRandom.nextInt(1000);

            ++userId;
            User user1 = new User(1, "Muhammad Thobroni", "CEO", "muhammad" +
                    "@globallinenetwork.com", "fur7jf89",
                    "https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128" +
                            ".jpg",Instant.now().toString(), Instant.now().toString());
            ++userId;
            User user2 = new User(2, "Abu Bakar", "CTO", "abu.bakar@globallinenetwork.com", "fur7jf89",
                    "https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128" +
                            ".jpg",Instant.now().toString(), Instant.now().toString());

            ++userId;
            User user3 = new User(3, "Muhammad Umar", "Software Engineer", "umar" +
                    "@globallinenetwork.com", "fur7jf89",
                    "https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128" +
                            ".jpg",Instant.now().toString(), Instant.now().toString());

            ++userId;
            User user4 = new User(4, "Muhammad Usman", "FrontEnd Engineer", "usman" +
                    "@globallinenetwork.com", "fur7jf89",
                    "https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128" +
                            ".jpg",Instant.now().toString(), Instant.now().toString());

            ++userId;
            User user5 = new User(5, "Muhammad Ali", "Security Engineer", "ali" +
                    "@globallinenetwork.com", "fur7jf89",
                    "https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128" +
                            ".jpg",Instant.now().toString(), Instant.now().toString());

            ++userId;
            User user6 = new User(6, "Eve Holt", "Security Engineer", "eve.holt@reqres.in", "pistol"
                    , "https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128" +
                    ".jpg",Instant.now().toString(), Instant.now().toString());

            ++userId;
            User user7 = new User(7, "Janet Weaver", "QA", "janet.weaver@reqres.in", "cityslicka",
                    "https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128" +
                            ".jpg",Instant.now().toString(), Instant.now().toString());
            ++userId;
            User user8 = new User(8, "Michael Lawson", "Scrum Master", "michael.lawson@reqres.in",
                    "pistol",
                    "https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128" +
                            ".jpg",Instant.now().toString(), Instant.now().toString());

            ++userId;
            User user9 = new User(9, "Lindsay Ferguson", "Software Engineer", "lindsay" +
                    ".ferguson@reqres" +
                    ".in",
                    "pistol",
                    "https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128" +
                            ".jpg",Instant.now().toString(), Instant.now().toString());

            ++userId;
            User user10 = new User(10, "Tobias Funke", "Senior Software Engineer",
                    "tobias.funke@reqres.in",
                    "pistol",
                    "https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128" +
                            ".jpg",Instant.now().toString(), Instant.now().toString());

            ++userId;
            User user11 = new User(11, "Byron Fields", "Senior Software Engineer",
                    "byron.fields@reqres.in",
                    "pistol",
                    "https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128" +
                            ".jpg",Instant.now().toString(), Instant.now().toString());

            ++userId;
            User user12 = new User(12, "George Edwards", "Senior Software Engineer",
                    "george.edwards@reqres.in",
                    "pistol",
                    "https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128" +
                            ".jpg",Instant.now().toString(), Instant.now().toString());

            users.add(user1);
            users.add(user2);
            users.add(user3);
            users.add(user4);
            users.add(user5);
            users.add(user6);
            users.add(user7);
            users.add(user8);
            users.add(user9);
            users.add(user10);
            users.add(user11);
            users.add(user12);

            company = new Company(companyId, "StatusCode " +
                    "Weekly", "http://statuscode.org/",
                    "A weekly newsletter focusing on software development, " +
                            "infrastructure, the server, performance, and the stack end of things.");
        } catch (NoSuchAlgorithmException | NoSuchProviderException e) {
            e.printStackTrace();
        }
    }

    public List<User> getUsers() {
        return users;
    }

    @Override
    public Map<String, Object> registration(RegisterDto registerDto) {
        Map<String, Object> data = new HashMap<>();
        if (registerDto.getPassword() == null || registerDto.getPassword().equals("")) {
            data.put("error", "Missing password");
            return data;
        }

        List<User> listUser = users
                .stream()
                .filter(user ->
                        user.getEmail().equals(registerDto.getEmail()) && user.getPassword().equals(registerDto.getPassword()))
                .collect(Collectors.toList());

        if (!listUser.isEmpty()){
            data.put("id", listUser.get(0).getId());
            data.put("token", "QpwL5tke4Pnpja7X4");
        }else{
            return null;
        }

        return data;
    }

    @Override
    public Map<String, Object> login(LoginDto loginDto) {
        Map<String, Object> data = new HashMap<>();
        if (loginDto.getPassword() == null || loginDto.getPassword().equals("")) {
            data.put("error", "Missing password");
            return data;
        } else {
            LOG.info("Email: "+loginDto.getEmail());
            LOG.info("Password: "+loginDto.getPassword());

            List<User> optionalUser = users
                    .stream()
                    .filter(user ->
                            user.getEmail().equals(loginDto.getEmail()) && user.getPassword().equals(loginDto.getPassword()))
                    .collect(Collectors.toList());

            LOG.info("Optional size => "+optionalUser.size());
            if (optionalUser.size() > 0) {
                data.put("token", "QpwL5tke4Pnpja7X4");
                return data;
            }
        }
        return null;
    }

    @Override
    public User createUser(CreateUserDto createUserDto) throws NoSuchAlgorithmException {
        int id = secureRandom.nextInt(1000);
        String email = createUserDto.getName() + EMAIL_DOMAIN;
        User createUser = new User(id, createUserDto.getName(), createUserDto.getJob(), email,
                PasswordGenerator.generateRandomPassword(),"https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128" +
                ".jpg", Instant.now().toString(), Instant.now().toString());
        users.add(createUser);

        return users.get(users.size() - 1);
    }

    @Override
    public User updateUser(Integer id, CreateUserDto createUserDto) {

        if (id != null) {
            Optional<User> optionalUser = users.stream().filter(user -> user.getId().equals(id)).findFirst();
            if (optionalUser.isPresent()) {
                User currentUser = optionalUser.get();
                currentUser.setUpdateAt(Instant.now().toString());
                return currentUser;
            }
        }
        return null;
    }

    @Override
    public boolean deleteUser(Integer id) {
        return users.removeIf(user -> user.getId().equals(id));
    }

    @Override
    public Map<String, Object> getSingleUser(Integer id) {
        Map<String, Object> data = new HashMap<>();
        if (id == null) {
            data.put("error", "Missing id");
            return data;
        }

        Optional<User> optionalUser = users.stream().filter(user -> user.getId().equals(id)).findFirst();
        if (optionalUser.isPresent()) {
            User currentUser = optionalUser.get();
            ResponseSingleUser singleUser = populateUser(currentUser);

            data.put("data", singleUser);
            data.put("ad", company);
            return data;
        }

        return null;
    }

    @Override
    public ListAllUserDto getListUser(int page) {

        return populateListAllUserDto(page);
    }

    private ListAllUserDto populateListAllUserDto(int page){
        Map<String, List<ResponseSingleUser>> data = new HashMap<>();
        Map<String, Company> companyMap = new HashMap<>();
        ListAllUserDto allUserDto = new ListAllUserDto();
        final int perPage = 6;

        allUserDto.setPage(page);
        allUserDto.setPerPage(perPage);
        allUserDto.setTotalData(users.size());
        allUserDto.setTotalPage(users.size()/perPage);

        List<ResponseSingleUser> userList = new ArrayList<>();
        for (int i = (page-1)*perPage; i < perPage*page; i++) {
            User user = users.get(i);
            ResponseSingleUser responseSingleUser = populateUser(user);
            userList.add(responseSingleUser);
        }
        data.put("data", userList);
        allUserDto.setData(data);
        companyMap.put("ad", company);
        allUserDto.setCompanyMap(companyMap);

        return allUserDto;
    }

    @Override
    @Async("asyncExecutor")
    public CompletableFuture<ListAllUserDto> getAsyncAllUser(int delay, int page) throws InterruptedException {
        long sleepDelay = Long.parseLong(delay+"000");
        Thread.sleep(sleepDelay);
        return

        CompletableFuture.completedFuture(populateListAllUserDto(page));
    }

    private ResponseSingleUser populateUser(User currentUser){
        String firstName = "";
        String lastName = "";
        String[] arrayName = currentUser.getName().split(" ");

        if (arrayName.length>1) {
            firstName = arrayName[0];
            lastName = arrayName[1];
        }

        firstName = arrayName[0];
        lastName = arrayName[0];
        ResponseSingleUser singleUser = new ResponseSingleUser();
        singleUser.setId(currentUser.getId());
        singleUser.setFirstName(firstName);
        singleUser.setLastName(lastName);
        singleUser.setEmail(currentUser.getEmail());
        singleUser.setAvatar(currentUser.getAvatar());
        return singleUser;
    }
}
