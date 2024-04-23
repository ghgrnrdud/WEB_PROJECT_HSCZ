package net.kdigital.web_project.service;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.kdigital.web_project.dto.BoardDTO;
import net.kdigital.web_project.entity.BoardEntity;
import net.kdigital.web_project.repository.CCARepository;

@Service
@Slf4j
@RequiredArgsConstructor
public class CCAService {
    @Value("${user.board.pageLimit}")
    int pageLimit;
    
    private final CCARepository ccaRepository;

    public Page<BoardDTO> findAllConsultsbySearch(Pageable pageable, String searchBy, String searchItem) {
		int page = pageable.getPageNumber() - 1; 
		// -1을 한 이유: page 위치의 값은 0부터 시작함
		// 사용자가 1페이지를 요청하면 DB에서는 0페이지를 가져와야 함
		
		// Java Reflection 기능을 이용할 수도 있다.
		// List<BoardEntity> entityList = null;
		Page<BoardEntity> entityList = null;
		
		switch(searchBy) {
		
		case "productCategory":
			entityList = ccaRepository.findAllByProductCategory(
					searchItem, 
					PageRequest.of(page, pageLimit, Sort.by(Sort.Direction.DESC, "consult_num")));
			break;
		
		}
		log.info("{}",entityList.get());
		Page<BoardDTO> dtoList = null;  // DTO 생성자 추가

		// entity를 dto로 변환하여 List에 담는 작업
		// entityList.forEach((entity) -> dtoList.add(BoardDTO.toDTO(entity)));
		// 앞단으로 가져갈 내용만 간추림
		dtoList = entityList.map(board -> 
		new BoardDTO(
				board.getConsultNum(),
				board.getConsultWriter(),
				board.getConsultTitle(),
				board.getConsultDate(),
				board.getProductCategory()
				
			
				)
			);
		
		return dtoList;
    }	

    @Transactional
    public void insertConsult(BoardDTO boardDTO) {
        BoardEntity boardEntity = BoardEntity.toEntity(boardDTO);
    
        ccaRepository.save(boardEntity);
    }

    public BoardDTO selectOneConsult(Long consultNum) {
        Optional<BoardEntity> entity = ccaRepository.findById(consultNum);

        if(entity.isPresent()) {
            BoardEntity boardEntity = entity.get();
            return BoardDTO.toDTO(boardEntity);
        }

        return null;
    }

    @Transactional
    public void deleteOneConsult(Long consultNum) {
        Optional<BoardEntity> entity = ccaRepository.findById(consultNum);

        if(entity.isPresent()) {
            ccaRepository.deleteById(consultNum);
        }
    }

    @Transactional
    public void updateOneConsult(BoardDTO boardDTO) {
        Optional<BoardEntity> entityOptional = ccaRepository.findById(boardDTO.getConsultNum());

        if (entityOptional.isPresent()) {
            BoardEntity boardEntity = entityOptional.get();
            boardEntity.setConsultTitle(boardDTO.getConsultTitle());
            boardEntity.setConsultContent(boardDTO.getConsultContent());
            boardEntity.setConsultDate(LocalDateTime.now());
            boardEntity.setProductCategory(boardDTO.getProductCategory());
            boardEntity.setConsultWriter(boardDTO.getConsultWriter());
            ccaRepository.save(boardEntity); // 수정된 엔터티를 저장
        }
    }
    public Page<BoardDTO> findAllConsults(Pageable pageable) {
        int page = pageable.getPageNumber() - 1; 

        Page<BoardEntity> entityList = ccaRepository.findAll(
                PageRequest.of(page, pageLimit, Sort.by(Sort.Direction.DESC, "consultNum")));

        Page<BoardDTO> dtoList = entityList.map(board -> 
            new BoardDTO(
                    board.getConsultNum(),
                    board.getConsultWriter(),
                    board.getConsultTitle(),
                    board.getConsultDate(),
                    board.getProductCategory()
                )
        );
        return dtoList;
    }

    
}
