package net.kdigital.web_project.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {
	
<<<<<<< HEAD
	@GetMapping({"","/"})
	public String sample(){
=======
	@GetMapping({"/",""})
	public String index(){
>>>>>>> d23e6147fd1e845ed68918b3c039f681e9cfae96
		
		// return "index";
		return "index_jh";
	}

	@GetMapping("/layout")
	public String layout() {
		return "layout";
	}

}
