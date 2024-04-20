package net.kdigital.web_project.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import ch.qos.logback.core.model.Model;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.kdigital.web_project.dto.BycounImExPriceDTO;
import net.kdigital.web_project.dto.BycounImMarketDTO;
import net.kdigital.web_project.dto.XyclusterDTO;
import net.kdigital.web_project.service.BycounImExPriceService;
import net.kdigital.web_project.service.BycounImMarketService;
import net.kdigital.web_project.service.XyclusterService;

@Controller
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/trade")
public class StatController {
	private final BycounImExPriceService imexService;
	private final BycounImMarketService marketService;
	private final XyclusterService xyclusterService;
	
	@GetMapping("/showStat")
	public String statShow() {
		return "sample-inner-page";
	}
	
	@GetMapping("/stringChart")
	@ResponseBody
	public List<BycounImExPriceDTO> stringChart(
			@RequestParam(name="country", defaultValue="CN") String country,
			Model model
			) {
		log.info("{}", country);
		List<BycounImExPriceDTO> list = imexService.bycounImExPrice(country);
//		log.info("==========={}", list.toString());
		return list;
	}
	
	@GetMapping("/pieChart")
	@ResponseBody
	public List<BycounImMarketDTO> barChart(
			@RequestParam(name="country", defaultValue="CN") String country,
			Model model
			) {
		log.info("{}", country);
		List<BycounImMarketDTO> list = marketService.bycounImMarketRanking(country);
		log.info("{}", list);
		return list;
	}

	/**
	 * 한국 top10품목 
	 * @return
	 */
	@GetMapping({"/xyCluster"})
	@ResponseBody
	public List<XyclusterDTO> xyCluster(
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
	    log.info("새로바뀐 dto {}", dtoList.size());
	    return dtoList;
	}


}

