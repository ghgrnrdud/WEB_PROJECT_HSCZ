package net.kdigital.web_project.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.kdigital.web_project.dto.CustomerDTO;
import net.kdigital.web_project.service.CustomerService;

@Controller
@RequiredArgsConstructor
@Slf4j
public class MainController {

	private final CustomerService customerService;

	@GetMapping({ "/", "" })
	public String index(
			Model model) {
		List<CustomerDTO> ccaList = customerService.selectTop3CCA();

		log.info("====== ccaList: {}", ccaList);
		model.addAttribute("ccaList", ccaList);

		return "index_jh";
	}

	@GetMapping("/layout")
	public String layout() {
		return "layout";
	}

	@GetMapping("/exchangeRate")
	public String exchangeRate() {
		return "exchangeRate";
	}

}
