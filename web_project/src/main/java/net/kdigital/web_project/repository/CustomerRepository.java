package net.kdigital.web_project.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import net.kdigital.web_project.entity.CustomerEntity;

public interface CustomerRepository extends JpaRepository<CustomerEntity, String> {

	Optional<CustomerEntity> findByUserId(String id);
}
