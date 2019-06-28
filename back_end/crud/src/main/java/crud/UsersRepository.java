package crud;

import org.springframework.data.jpa.repository.JpaRepository;

interface UsersRepository extends JpaRepository<Users, Long> {
}
