package net.kdigital.web_project.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.kdigital.web_project.dto.SubheadingDTO;
import net.kdigital.web_project.entity.HeadingEntity;
import net.kdigital.web_project.entity.SubheadingEntity;
import net.kdigital.web_project.repository.HeadingRepository;
import net.kdigital.web_project.repository.SubheadingRepository;

@Service
@Slf4j
@RequiredArgsConstructor
public class SubheadingService {

    private final SubheadingRepository subheadingRepository;
    private final HeadingRepository headingRepository;

    public List<SubheadingDTO> selectDetail(String hs4digit) {

        // 전달받은 hscode 4자리로 headingEntity찾기
        HeadingEntity entity = headingRepository.findById(hs4digit).get();
        // 찾은 headingEntity로 해당하는 subheadingEntity 모두 찾기
        List<SubheadingEntity> subheadingEntityList = subheadingRepository.findAllByHeadingEntity(entity);

        // EntityList -> DTOList
        List<SubheadingDTO> subheadingDTOList = new ArrayList<>();
        subheadingEntityList.forEach((item) -> subheadingDTOList.add(SubheadingDTO.toDTO(item, hs4digit)));

        return subheadingDTOList;
    }



}
