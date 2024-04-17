package net.kdigital.web_project.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import ch.qos.logback.core.model.Model;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.kdigital.web_project.dto.BycounImExPriceDTO;
import net.kdigital.web_project.dto.BycounImMarketDTO;
import net.kdigital.web_project.service.BycounImExPriceService;
import net.kdigital.web_project.service.BycounImMarketService;

@Controller
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/trade")
public class StatController {
	private final BycounImExPriceService imexService;
	private final BycounImMarketService marketService;
	
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
	
	@GetMapping("/barChart")
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
}

