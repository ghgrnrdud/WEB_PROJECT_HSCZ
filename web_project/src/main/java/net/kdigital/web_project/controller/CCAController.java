package net.kdigital.web_project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import net.kdigital.web_project.dto.AnswerDTO;
import net.kdigital.web_project.dto.BoardDTO;
import net.kdigital.web_project.dto.CCAListDTO;
import net.kdigital.web_project.dto.CustomerDTO;
import net.kdigital.web_project.entity.CustomerEntity;
import net.kdigital.web_project.service.CCAListService;
import net.kdigital.web_project.service.CCAService;
import net.kdigital.web_project.service.CustomerService;
import net.kdigital.web_project.service.ReplyService;
import net.kdigital.web_project.util.PageNavigator;

@Slf4j
@Controller
@RequestMapping("/cca")
public class CCAController {
    private final CCAService ccaService;
    private final ReplyService replyService;
    private final int pageLimit; // 한 페이지에 보여줄 글의 개수
    private final CCAListService ccaListService;
    private final CustomerService customerService;
    
    public CCAController(CCAService ccaService, ReplyService replyService, @Value("${user.board.pageLimit}") int pageLimit,CCAListService ccaListService,CustomerService customerService) {
        this.ccaService = ccaService;
        this.replyService = replyService;
        this.pageLimit = pageLimit;
        this.ccaListService = ccaListService;
        this.customerService = customerService;
    }
    
    /**]
     * 상담목록
     * @param pageable
     * @param searchBy
     * @param searchItem
     * @param model
     * @return
     */
    @GetMapping("/boardList")
    public String boardList(
            @PageableDefault(page = 1) Pageable pageable,
            @RequestParam(name = "searchBy",defaultValue="productCategory") String searchBy,
            @RequestParam(name = "searchItem",defaultValue="") String searchItem,
            Model model) {

        Page<BoardDTO> dtoList;

        if (searchItem.isEmpty()) {
            dtoList = ccaService.findAllConsults(pageable);        
        } else {
            dtoList = ccaService.findAllConsultsbySearch(pageable, searchBy, searchItem);
        }
    
        int totalPages = dtoList.getTotalPages();
        int page = pageable.getPageNumber();

        PageNavigator navi = new PageNavigator(pageLimit, page, totalPages);
        System.out.println(searchBy);
        System.out.println(searchItem);
    
        System.out.println(dtoList.toString());
        model.addAttribute("consultList", dtoList);
        model.addAttribute("searchItem", searchItem);
        model.addAttribute("searchBy", searchBy);
        model.addAttribute("navi", navi);
        
        return "/cca/boardList";
    }

    @GetMapping("/ccaWrite")
    public String ccaWrite() {
        log.info("글쓰기 화면 요청");
    
        return "/cca/ccaWrite";
    }

    @PostMapping("/ccaWrite")
    public String ccaWrite(@ModelAttribute BoardDTO boardDTO) {
        ccaService.insertConsult(boardDTO);
        return "redirect:/cca/boardList";
    }

    @GetMapping("/detail")
    public String ccaDetail(
            @RequestParam(name = "consultNum") Long consultNum,
            @RequestParam(name = "searchBy", defaultValue="") String searchBy,
            @RequestParam(name = "searchItem", defaultValue = "") String searchItem,
            HttpServletRequest request,
            Model model) {

        String contextPath = request.getContextPath();
        BoardDTO boardDTO = ccaService.selectOneConsult(consultNum);
        List<AnswerDTO> replyList = replyService.selectAllReplys(consultNum); // 예시일 뿐, 해당 메서드가 실제로 존재한다고 가정
 
        model.addAttribute("consult", boardDTO);
        model.addAttribute("searchItem", searchItem);
        model.addAttribute("searchBy",searchBy);
        model.addAttribute("contextPath", contextPath);
        model.addAttribute("replyList", replyList); // 답변 DTO도 Model에 추가

        return "cca/detail";
    }


    @GetMapping("/delete")
    public String boardDelete(
            @RequestParam(name = "consultNum") Long consultNum,
            @RequestParam(name = "searchBy") String searchBy,
            @RequestParam(name = "searchItem", defaultValue = "") String searchItem,
            RedirectAttributes rttr) {

        ccaService.deleteOneConsult(consultNum);
    
        rttr.addAttribute("searchItem", searchItem);
        rttr.addAttribute("searchBy",searchBy);
        return "redirect:/cca/boardList";
    }

    @GetMapping("/update")
    public String boardUpdate(
            @RequestParam(name = "consultNum") Long consultNum,
            @RequestParam(name = "searchBy") String searchBy,
            @RequestParam(name = "searchItem", defaultValue = "") String searchItem,
            Model model) {

        BoardDTO boardDTO = ccaService.selectOneConsult(consultNum);
        model.addAttribute("consult", boardDTO);
        model.addAttribute("searchItem", searchItem);
        model.addAttribute("searchBy",searchBy);
        return "cca/update";
    }

    @PostMapping("/update")
    public String boardUpdate(
            @ModelAttribute BoardDTO boardDTO,
            @RequestParam(name = "searchBy") String searchBy,
            @RequestParam(name = "searchItem", defaultValue = "") String searchItem,
            RedirectAttributes rttr) {

        ccaService.updateOneConsult(boardDTO);
        rttr.addAttribute("consultNum", boardDTO.getConsultNum());
        rttr.addAttribute("searchItem", searchItem);
        rttr.addAttribute("searchBy",searchBy);
        return "redirect:/cca/detail";
    }

    @GetMapping("/replyWrite")
    public String replyWritePage(Model model, @RequestParam("consultNum") Long consultNum) {
        model.addAttribute("consultNum", consultNum);
        return "cca/replyWrite"; // replyWrite.html로 이동
    }


    @PostMapping("/replyWrite")
    public String replyWrite(
        @ModelAttribute AnswerDTO answerDTO, @RequestParam("consultNum") Long consultNum,
        @RequestParam("searchBy") String searchBy, @RequestParam("searchItem") String searchItem) {
    
        System.out.println(consultNum);
        System.out.println(searchBy);
        answerDTO.setConsultNum(consultNum);
        
        replyService.insertAnswer(answerDTO);
        
        // searchBy와 searchItem을 포함하여 상세 페이지로 리다이렉트
        return "redirect:/cca/detail?consultNum=" + consultNum + "&searchBy=" + searchBy + "&searchItem=" + searchItem;
    }



    @GetMapping("/replyUpdate")
    public String replyUpdate(
            @RequestParam(name = "consultNum") Long consultNum,
            @RequestParam(name = "replyNum") Long replyNum,
            @RequestParam(name = "searchBy") String searchBy,
            @RequestParam(name = "searchItem", defaultValue = "") String searchItem,
            Model model) {
        System.out.println("업데이트 확인");
        System.out.println(consultNum);
        System.out.println(replyNum);
        AnswerDTO answerDTO = replyService.selectOneAnswer(replyNum,consultNum);
        BoardDTO boardDTO = ccaService.selectOneConsult(consultNum);
        System.out.println(answerDTO.toString());
        model.addAttribute("reply", answerDTO);
        model.addAttribute("consult",boardDTO);
        model.addAttribute("searchItem", searchItem);
        model.addAttribute("searchBy", searchBy);
        return "cca/replyUpdate";
    }

    @PostMapping("/replyUpdate")
    public String replyUpdate(
            @ModelAttribute AnswerDTO answerDTO,
            @RequestParam(name="replyNum") Long replyNum,
            @RequestParam(name="consultNum") Long consultNum,
            @RequestParam(name = "searchBy") String searchBy,
            @RequestParam(name = "searchItem", defaultValue = "") String searchItem,
            RedirectAttributes rttr) {

        AnswerDTO updatedAnswer=replyService.updateOneAnswer(replyNum,answerDTO);
        System.out.println("답변컨트롤러 옴");
        System.out.println(replyNum);
        System.out.println(consultNum);
        
        System.out.println(updatedAnswer.toString());
        rttr.addAttribute("replyNum", answerDTO.getReplyNum());
        rttr.addAttribute("searchItem", searchItem);
        rttr.addAttribute("searchBy",searchBy);
        return "redirect:/cca/detail?consultNum=" + consultNum + "&searchBy=" + searchBy + "&searchItem=" + searchItem;
    }

    @GetMapping("/replyDelete")
    public String replyDelete(
            @RequestParam(name = "replyNum") Long replyNum,
            @RequestParam(name="consultNum") Long consultNum,
            @RequestParam(name = "searchBy") String searchBy,
            @RequestParam(name = "searchItem", defaultValue = "") String searchItem,
            RedirectAttributes rttr) {
        
        replyService.deleteOneAnswer(replyNum,consultNum);
        System.out.println("답변 삭제됨");
        rttr.addAttribute("searchItem", searchItem);
        rttr.addAttribute("searchBy",searchBy);
        return "redirect:/cca/detail?consultNum=" + consultNum + "&searchBy=" + searchBy + "&searchItem=" + searchItem;
    }

    @GetMapping("/replyAll")
    @ResponseBody
    public List<AnswerDTO> replyAll(
            @RequestParam(name = "replyNum") Long replyNum) {

        log.info("{}", replyNum);
        List<AnswerDTO> replyList = replyService.selectAllReplys(replyNum);
        log.info("===> {}", replyList);
        
        return replyList;
    }

    /**
     * 관세사 목록
     * @param pageable
     * @param searchBy
     * @param searchItem
     * @param model
     * @return
     */
    @GetMapping("/ccaList")
    public String ccaList(
        @PageableDefault(page = 1) Pageable pageable,
        @RequestParam(name="searchBy", defaultValue="companyRegion") String searchBy,
        @RequestParam(name = "searchItem", defaultValue = "") String searchItem,
        Model model) {
            Page<CCAListDTO> dtoList;

            if (searchItem.isEmpty()) {
                dtoList = ccaListService.findAllCCA(pageable);
            } else {
                dtoList = ccaListService.findAllCCABySearch(pageable,searchBy, searchItem);
            }
  
        int totalPages = (int) dtoList.getTotalPages();
        int page = pageable.getPageNumber();
        PageNavigator navi = new PageNavigator(pageLimit, page, totalPages);
        log.info("관세사 리스트 : {}", dtoList);
        model.addAttribute("ccaList", dtoList);
        model.addAttribute("searchItem", searchItem);
        model.addAttribute("navi", navi);
        model.addAttribute("searchBy",searchBy);
        return "cca/ccaList";
    }


    @PostMapping("/setLike")
    @Transactional  // 데이터베이스 작업을 트랜잭션으로 관리
    public String setLike(Model model, 
            @RequestParam("replyNum") Long replyNum,
            @RequestParam("consultNum") Long consultNum,
            @RequestParam("searchBy") String searchBy,
            @RequestParam("searchItem") String searchItem) {
        
        // 답변 정보를 가져온다.
        AnswerDTO answer = replyService.selectOneAnswer(replyNum, consultNum);
    
        // 중복 추천을 방지한다. 답변이 존재하고, 이미 likeCount가 증가되었다면 아무 작업도 수행하지 않는다.
        if (answer != null && answer.getLikeCount() > 0) {
        
            return "redirect:/cca/detail?consultNum=" + consultNum + "&searchBy=" + searchBy + "&searchItem=" + searchItem;
        }

        // 첫 추천을 처리한다. 답변이 존재하고 likeCount가 0이라면 추천 로직을 수행한다.
        if (answer != null && answer.getLikeCount() == 0) {
            // 사용자의 likeTotal을 증가시킨다.
            CustomerEntity customer = customerService.findCustomerByUserId(answer.getReplyWriter());
            if (customer != null) {
                customerService.increaseTotalLike(customer);
            }
            
            // 답변의 likeCount를 1로 증가시킨다.
            answer.setLikeCount(1);
            replyService.updateOneAnswer(replyNum, answer);
        }
        
        // 상세 페이지로 리다이렉트한다.
        return "redirect:/cca/detail?consultNum=" + consultNum + "&searchBy=" + searchBy + "&searchItem=" + searchItem;
    }


    @GetMapping("/ccaTop10")
    public String ccaTop10(
            @PageableDefault(page = 0) Pageable pageable,
            Model model) {
    
        Page<CustomerDTO> dtoList;
        
        dtoList = customerService.findAllUserCCA(pageable);

        int totalPages = (int) dtoList.getTotalPages();
        int page = pageable.getPageNumber();
        PageNavigator navi = new PageNavigator(pageLimit, page, totalPages);

        model.addAttribute("CustomerCCAList", dtoList);
        model.addAttribute("navi", navi);
    
        return "cca/ccaTop10";
    }


}

