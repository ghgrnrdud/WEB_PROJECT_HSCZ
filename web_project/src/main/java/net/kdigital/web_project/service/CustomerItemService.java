package net.kdigital.web_project.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import net.kdigital.web_project.dto.CustomerItemDTO;
import net.kdigital.web_project.entity.CustomerEntity;
import net.kdigital.web_project.entity.CustomerItemEntity;
import net.kdigital.web_project.repository.CustomerItemRepository;
import net.kdigital.web_project.repository.CustomerRepository;

@Service
@RequiredArgsConstructor
public class CustomerItemService {
	private final CustomerRepository customerRepository;
	private final CustomerItemRepository customerItemRepository;
	
	public void insertItem(CustomerItemDTO customerItemDTO) {
		Optional<CustomerEntity> customerEntity = customerRepository.findById(customerItemDTO.getUserId());
		
		if(customerEntity.isPresent()) {
			CustomerEntity entity = customerEntity.get();
			CustomerItemEntity itemEntity = CustomerItemEntity.toEntity(customerItemDTO, entity);
			
			customerItemRepository.save(itemEntity);
		}
		
	}

	public CustomerItemDTO findItem(String username) {
		Optional<CustomerEntity> customerEntity = customerRepository.findById(username);
		CustomerItemEntity customerItemEntity =  customerItemRepository.findByCustomerEntity(customerEntity.get());
		
		return CustomerItemDTO.toDTO(customerItemEntity, username);
	}
	

}
