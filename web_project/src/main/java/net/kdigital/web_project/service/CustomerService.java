package net.kdigital.web_project.service;



import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.kdigital.web_project.dto.CustomerDTO;
import net.kdigital.web_project.entity.CustomerEntity;
import net.kdigital.web_project.repository.CustomerRepository;

@Service
@RequiredArgsConstructor
@Slf4j
public class CustomerService {
	public final CustomerRepository customerRepository;
	public final BCryptPasswordEncoder bCryptPasswordEncoder;

	/** 회원가입
	 * 
	 */
	public boolean joinProc(CustomerDTO customerDTO) {
		boolean isExistCustomer = customerRepository.existsById(customerDTO.getUserId());
		if(isExistCustomer) return false;

		// 비번을 암호화
		customerDTO.setUserPwd(bCryptPasswordEncoder.encode(customerDTO.getUserPwd()));
		
		// DTO를 Entity로 변경
		CustomerEntity customerEntity = CustomerEntity.toEntity(customerDTO);
		log.info("{}", customerEntity.toString());
		customerRepository.save(customerEntity);
		 return true;
	}
}
