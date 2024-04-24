package net.kdigital.web_project.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/my")
public class MypageController {

	@GetMapping("/userpage")
	public String userpage() {
		
		return "/user/userprofile";
	}
	
	@GetMapping("/ccapage")
	public String ccapage() {
		
		return "/user/userprofile";
	}
}
