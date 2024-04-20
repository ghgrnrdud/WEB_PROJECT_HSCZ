package net.kdigital.web_project.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import net.kdigital.web_project.dto.BycounImExPriceDTO;
import net.kdigital.web_project.entity.BycounImExPriceEntity;
import net.kdigital.web_project.repository.BycounImExPriceRepository;

@Service
@RequiredArgsConstructor
public class BycounImExPriceService {

	private final BycounImExPriceRepository imexRepository;
	public List<BycounImExPriceDTO> bycounImExPrice(String country) {
		List<BycounImExPriceEntity> entityList = imexRepository.findAllByCountryOrderBySeq6Desc(country);
		
		List<BycounImExPriceDTO> dtoList = new ArrayList<>();
		
		for(BycounImExPriceEntity temp : entityList) {
			dtoList.add(BycounImExPriceDTO.toDTO(temp));}
		return dtoList;
	}

}
