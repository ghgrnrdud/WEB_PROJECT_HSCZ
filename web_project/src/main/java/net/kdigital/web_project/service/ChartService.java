package net.kdigital.web_project.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.kdigital.web_project.dto.CountryChartDTO;
import net.kdigital.web_project.entity.CountryChartEntity;
import net.kdigital.web_project.repository.CountryChartRepository;

@Service
@Slf4j
@RequiredArgsConstructor
public class ChartService {

    private final CountryChartRepository countryChartRepository;

    public List<CountryChartDTO> selectExportRanking(String hs4digit) {

        List<CountryChartDTO> dtoList = new ArrayList<>();
        List<CountryChartEntity> entityList = countryChartRepository.findTop5ExportByHs4digit(hs4digit);

        entityList.forEach((item) -> dtoList.add(CountryChartDTO.toDTO(item)));

        return dtoList;
    }

    
    public List<CountryChartDTO> selectImportRanking(String hs4digit) {

        List<CountryChartDTO> dtoList = new ArrayList<>();
        List<CountryChartEntity> entityList = countryChartRepository.findTop5ImportByHs4digit(hs4digit);

        entityList.forEach((item) -> dtoList.add(CountryChartDTO.toDTO(item)));

        return dtoList;
    }
    


}
