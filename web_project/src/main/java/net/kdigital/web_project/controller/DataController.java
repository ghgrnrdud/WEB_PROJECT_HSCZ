package net.kdigital.web_project.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import lombok.extern.slf4j.Slf4j;
import net.kdigital.web_project.dto.XyclusterDTO;
import net.kdigital.web_project.service.XyclusterService;

@Controller
@Slf4j
public class DataController {
	
	private XyclusterService xyclusterService;
	
	//생성자 초기화
	public DataController(XyclusterService xyclusterService) {
		this.xyclusterService = xyclusterService;
	}
	
	/**
	 * 한국 top10품목 
	 * @return
	 */
	@PostMapping({"/",""})
	@ResponseBody
	public List<XyclusterDTO> xyclusterchart(
			Model model
			){
		log.info("한국 top10품목 데이터 요청");
		
		List<XyclusterDTO> dtoList = xyclusterService.selectAll();
		log.info("dtolist는 어떻게 와요? : {}", dtoList);
		
		
		for (XyclusterDTO dto : dtoList) {
	        // product 문자열을 10자씩 나누어 줄바꿈을 추가
	        String product = dto.getProductName();
	        StringBuilder refinedProduct = new StringBuilder();
	        
	        for (int i = 0; i < product.length(); i += 22) {
	            if (i + 22 < product.length()) {
	                refinedProduct.append(product.substring(i, i + 22)).append("\n");
	            } else {
	                refinedProduct.append(product.substring(i));
	            }
	        }
	        
	        dto.setProductName(refinedProduct.toString().trim());
	    }
	    log.info("새로바뀐 dto {}", dtoList);
	    return dtoList;
	}
}