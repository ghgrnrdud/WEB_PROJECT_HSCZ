package net.kdigital.web_project.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import net.kdigital.web_project.entity.CustomerEntity;
import net.kdigital.web_project.entity.CustomerItemEntity;

public interface CustomerItemRepository extends JpaRepository<CustomerItemEntity, Long> {

	CustomerItemEntity findByCustomerEntity(CustomerEntity customerEntity);
}
