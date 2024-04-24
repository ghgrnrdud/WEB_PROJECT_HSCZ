package net.kdigital.web_project.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.kdigital.web_project.dto.AnswerDTO;
import net.kdigital.web_project.dto.BoardDTO;
import net.kdigital.web_project.dto.CustomerDTO;
import net.kdigital.web_project.dto.CustomerItemDTO;
import net.kdigital.web_project.entity.BoardEntity;
import net.kdigital.web_project.service.CCAService;
import net.kdigital.web_project.service.CustomerItemService;
import net.kdigital.web_project.service.CustomerService;
import net.kdigital.web_project.service.ReplyService;

@RequiredArgsConstructor
@Controller
@Slf4j
@RequestMapping("/my")
public class MypageController {

	public final CustomerService customerService;
	public final CCAService ccaService;
	public final ReplyService replyService;
	public final CustomerItemService customerItemService;
	public int boardCount;
	public int replyCount;
	
	@GetMapping("/userpage")
	public String userpage(Model model) {
		boardCount = 0;
		// 로그인한 유저 정보 가져오기
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal(); 
		UserDetails userDetails = (UserDetails)principal; 
		String username = ((UserDetails) principal).getUsername(); 
		
		CustomerDTO customerDTO = CustomerDTO.toDTO(customerService.findCustomerByUserId(username));
		
		// 유저 아이템 정보 가져오기
		CustomerItemDTO customerItemDTO = customerItemService.findItem(username);
		
		// 로그인한 유저가 작성한 글 가져오기
		List<BoardEntity> boardEntityList =  ccaService.findAllConsultsbyuserId(username);
		
		List<BoardDTO> totalBoardDTOList = new ArrayList<>();
		List<AnswerDTO> totalReplyDTOList = new ArrayList<>();
		for(BoardEntity temp : boardEntityList) {
			// 작성한 글에 해당하는 댓글 가져오기
			List<AnswerDTO> replyDTOList = replyService.selectAllReplys(temp.getConsultNum());
			for(AnswerDTO temp2 : replyDTOList) {
				totalReplyDTOList.add(temp2);
			}
			totalBoardDTOList.add(BoardDTO.toDTO(temp));
			boardCount += 1;
		}
		
		model.addAttribute("customerDTO", customerDTO);
		model.addAttribute("customerItemDTO", customerItemDTO);
		model.addAttribute("totalBoardDTOList",totalBoardDTOList);
		model.addAttribute("totalreplyDTOList", totalReplyDTOList);
		model.addAttribute("boardCount", boardCount);
		return "/user/userprofile2";
	}
	
	@GetMapping("/ccapage")
	public String ccapage(Model model) {
		// 로그인한 유저 정보 가져오기
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal(); 
		UserDetails userDetails = (UserDetails)principal; 
		String username = ((UserDetails) principal).getUsername(); 
		
		CustomerDTO customerDTO = CustomerDTO.toDTO(customerService.findCustomerByUserId(username));
		
		model.addAttribute("customerDTO",customerDTO);
		return "/user/userprofile2";
	}
	
	
}
