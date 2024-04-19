
package net.kdigital.web_project.service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.kdigital.web_project.dto.AnswerDTO;
import net.kdigital.web_project.entity.AnswerEntity;
import net.kdigital.web_project.entity.BoardEntity;
import net.kdigital.web_project.repository.AnswerRepository;
import net.kdigital.web_project.repository.CCARepository;

@Service
@Slf4j
@RequiredArgsConstructor
public class ReplyService {
    private final CCARepository ccaRepository;
    private final AnswerRepository answerRepository;

    public AnswerDTO insertAnswer(AnswerDTO answerDTO) {
        // 댓글의 부모인 게시글이 존재하는지 확인!
        Optional<BoardEntity> boardEntity = ccaRepository.findById(answerDTO.getConsultNum());

        if (boardEntity.isPresent()) {
            BoardEntity entity = boardEntity.get();
            AnswerEntity answerEntity = AnswerEntity.toEntity(answerDTO, entity);
            answerEntity.setReplyDate(LocalDateTime.now());
            AnswerEntity temp = answerRepository.save(answerEntity);

            return AnswerDTO.toDTO(temp, answerDTO.getReplyNum());
        } else {
            return null;
        }
    }

    /**
     * 댓글 전체 목록 반환
     * 
     * @param boardNum
     * @return
     */
    public List<AnswerDTO> selectAllReplys(Long consultNum) {
        log.info("{}", consultNum);
        BoardEntity entity = ccaRepository.findById(consultNum).get();
        List<AnswerEntity> answerEntityList = answerRepository.findAllByBoardEntityOrderByReplyNumDesc(entity);

        /* EntityList --> DTOList */
        List<AnswerDTO> answerDTOList = answerEntityList.stream()
        	    .map(temp -> AnswerDTO.toDTO(temp, consultNum))
        	    .collect(Collectors.toList());

        	return answerDTOList;
    }
    /**
     * 댓글 삭제
     * 
     * @param boardNum
     * @return
     */
    public boolean deleteOneAnswer(Long replyNum, Long consultNum) {
        answerRepository.deleteById(replyNum);
        return answerRepository.existsById(replyNum);
    }

    public AnswerDTO selectOneAnswer(Long replyNum, Long consultNum) {
        Optional<AnswerEntity> optionalAnswer = answerRepository.findById(replyNum);

        if (optionalAnswer.isPresent()) {
            AnswerEntity answerEntity = optionalAnswer.get();
            return AnswerDTO.toDTO(answerEntity, consultNum); // 두 번째 매개변수로 consultNum 전달
        } else {
            return null; // 해당 ID에 해당하는 댓글이 없을 경우 null 반환
        }
    }

    @Transactional
    public AnswerDTO updateOneAnswer(Long replyNum, AnswerDTO answerDTO) {
        // 댓글의 ID를 사용하여 해당 댓글을 찾음
        Optional<AnswerEntity> optionalAnswer = answerRepository.findById(replyNum);

        if (optionalAnswer.isPresent()) {
            // 해당 ID에 해당하는 댓글이 존재하는 경우
            AnswerEntity answerEntity = optionalAnswer.get();

            // 수정할 댓글의 내용을 가져와서 엔티티에 적용함
            answerEntity.setReplyContent(answerDTO.getReplyContent());
            answerEntity.setReplyDate(LocalDateTime.now());
            answerEntity.setReplyWriter(answerDTO.getReplyWriter());
        } else {
            // 해당 ID에 해당하는 댓글이 존재하지 않는 경우
            return null;
        }
        return answerDTO;
    }
} 