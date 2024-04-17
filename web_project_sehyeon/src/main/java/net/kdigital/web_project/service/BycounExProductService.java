package net.kdigital.web_project.service;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.kdigital.web_project.dto.BycounExProductDTO;
import net.kdigital.web_project.entity.BycounExProductEntity;
import net.kdigital.web_project.repository.BycounExProductRepository;

@Service
@RequiredArgsConstructor
@Slf4j
public class BycounExProductService {
	private final BycounExProductRepository proRepository;

	public List<BycounExProductDTO> reShow(String country) {
		List<BycounExProductEntity> entity = proRepository.findAllByCountryOrderBySeq4Desc(country);
		
		for(BycounExProductEntity temp : entity) {
			log.info(temp.toString());
		}
		return null;
	}
}
