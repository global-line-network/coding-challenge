package crud;

public class MissingDataException extends RuntimeException {
    MissingDataException(String missingData) {
        super("Not found: " + missingData);
    }
}
