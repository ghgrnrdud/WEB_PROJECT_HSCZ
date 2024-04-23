package net.kdigital.web_project.repository;

import java.util.Optional;

<<<<<<< HEAD
import org.springframework.data.jpa.repository.JpaRepository;
=======
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
>>>>>>> 8b277429deb5ae23f967cc85ba9c1cfbc4beec27

import net.kdigital.web_project.entity.CustomerEntity;

public interface CustomerRepository extends JpaRepository<CustomerEntity, String> {

	Optional<CustomerEntity> findByUserId(String id);
<<<<<<< HEAD
}
=======
	@Query("SELECT c FROM CustomerEntity c WHERE c.userRole = 'ROLE_CCA' ORDER BY c.likeTotal DESC")
	Page<CustomerEntity> findAllUserCCA(Pageable pageable);

}
>>>>>>> 8b277429deb5ae23f967cc85ba9c1cfbc4beec27
