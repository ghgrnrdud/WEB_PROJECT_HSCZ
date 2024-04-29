package net.kdigital.web_project.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class MainController {
	
	@GetMapping({"/",""})
	public String index(){
		
		// return "index";
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
