package crud;

public class UsersNotFoundException extends RuntimeException {

    UsersNotFoundException(Long id) {
        super("Not found: User with ID " + id);
    }
}
