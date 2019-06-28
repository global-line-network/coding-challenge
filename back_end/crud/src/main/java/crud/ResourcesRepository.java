package crud;

import org.springframework.data.jpa.repository.JpaRepository;

interface ResourcesRepository extends JpaRepository<Resources, Long> {
}
