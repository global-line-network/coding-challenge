package id.globallinenetwork.api.user;

import id.globallinenetwork.api.company.Company;
import id.globallinenetwork.api.utility.PasswordGenerator;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.security.SecureRandom;
import java.time.Instant;
import java.util.*;
import java.util.concurrent.CompletableFuture;

@Service
public class UserService implements IUser {

    private static final String EMAIL_DOMAIN = "@globallinenetwork.com";
    private final List<User> users = new ArrayList<>();
    private SecureRandom secureRandom = null;
    private Company company;

    public UserService() {
        int id = 0;

        try {
            secureRandom = SecureRandom.getInstance("SHA1PRNG", "SUN");
            id = secureRandom.nextInt(1000);
            User user1 = new User(1, "Muhammad Thobroni", "CEO", "muhammad" +
                    "@globallinenetwork.com", "fur7jf89",
                    "https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128" +
                            ".jpg",Instant.now().toString(), Instant.now().toString());
            User user2 = new User(2, "Abu Bakar", "CTO", "abu.bakar@globallinenetwork.com", "fur7jf89",
                    "https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128" +
                            ".jpg",Instant.now().toString(), Instant.now().toString());
            User user3 = new User(3, "Muhamamd Umar", "Software Engineer", "umar" +
                    "@globallinenetwork.com", "fur7jf89",
                    "https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128" +
                            ".jpg",Instant.now().toString(), Instant.now().toString());
            User user4 = new User(4, "Muhammad Usman", "FrontEnd Engineer", "usman" +
                    "@globallinenetwork.com", "fur7jf89",
                    "https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128" +
                            ".jpg",Instant.now().toString(), Instant.now().toString());
            User user5 = new User(5, "Muhammad Ali", "Security Engineer", "ali" +
                    "@globallinenetwork.com", "fur7jf89",
                    "https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128" +
                            ".jpg",Instant.now().toString(), Instant.now().toString());
            User user6 = new User(6, "Eve Holt", "Security Engineer", "eve.holt@reqres.in", "pistol"
                    , "https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128" +
                    ".jpg",Instant.now().toString(), Instant.now().toString());
            User user7 = new User(7, "Janet Weaver", "QA", "janet.weaver@reqres.in", "pistol",
                    "https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128" +
                            ".jpg",Instant.now().toString(), Instant.now().toString());
            User user8 = new User(8, "Michael Lawson", "Scrum Master", "michael.lawson@reqres.in",
                    "pistol",
                    "https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128" +
                            ".jpg",Instant.now().toString(), Instant.now().toString());
            User user9 = new User(7, "Lindsay Ferguson", "Software Engineer", "lindsay" +
                    ".ferguson@reqres" +
                    ".in",
                    "pistol",
                    "https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128" +
                            ".jpg",Instant.now().toString(), Instant.now().toString());
            User user10 = new User(7, "Tobias Funke", "Senior Software Engineer", "tobias.funke@reqres.in",
                    "pistol",
                    "https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128" +
                            ".jpg",Instant.now().toString(), Instant.now().toString());
            User user11 = new User(7, "Byron Fields", "Senior Software Engineer", "byron.fields@reqres.in",
                    "pistol",
                    "https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128" +
                            ".jpg",Instant.now().toString(), Instant.now().toString());
            User user12 = new User(7, "George Edwards", "Senior Software Engineer", "george.edwards@reqres.in",
                    "pistol",
                    "https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128" +
                            ".jpg",Instant.now().toString(), Instant.now().toString());

            company = new Company(secureRandom.nextInt(1000), "StatusCode " +
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
        if (registerDto.getPassword().equals("") || registerDto.getPassword() == null) {
            data.put("error", "Missing password");
            return data;
        }

        data.put("id", 4);
        data.put("token", "QpwL5tke4Pnpja7X4");

        return data;
    }

    @Override
    public Map<String, Object> login(LoginDto loginDto) {
        Map<String, Object> data = new HashMap<>();
        if (loginDto.getPassword().equals("") || loginDto.getPassword() == null) {
            data.put("error", "Missing password");
            return data;
        } else {
            Optional<User> optionalUser = users.stream().filter(user -> user.getEmail().equals(loginDto.getEmail()) &&
                    user.getPassword().equals(loginDto.getPassword())).findFirst();
            if (optionalUser.isPresent()) {
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
        for (int i = (perPage-1)*page; i < perPage*page; i++) {
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
