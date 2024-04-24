package net.kdigital.web_project.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {
	
	@GetMapping({"/",""})
	public String index(){
		
<<<<<<< HEAD
		// return "index";
		return "index_jh";
	}

	@GetMapping("/layout")
	public String layout() {
		return "layout";
=======
		return "index";
>>>>>>> b634b614a84a70067bd50b394571f1357a1e9821
	}

}
