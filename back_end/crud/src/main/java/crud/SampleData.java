package crud;

import lombok.extern.slf4j.Slf4j;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@Slf4j
public class SampleData {
    @Bean
    CommandLineRunner initDatabase(UsersRepository repository) {
        return args -> {
            log.info("Preloading " + repository.save(new Users("Developer", "Password1",
                    "Spongebob","Squarepants", "spongebob@abc.com",
                    "http://thriving.childrenshospital.org/wp-content/uploads/2011/09/spongebob3.jpg",
                    "1ke9rjabKJHaelk")));
            log.info("Preloading " + repository.save(new Users("Developer", "Password1",
                    "Patrick", "Star", "patrick@abc.com",
                    "https://images-na.ssl-images-amazon.com/images/I/51q4JlgqJBL._SY355_.jpg",
                    "MLwiff(&KJHDSus")));
        };
    }
}
