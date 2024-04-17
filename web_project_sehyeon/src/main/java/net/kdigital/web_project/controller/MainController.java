package net.kdigital.web_project.controller;

import java.beans.Statement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import ch.qos.logback.core.model.Model;

@Controller
public class MainController {
	
	@GetMapping({"/",""})
	public String index(Model model){
		
		return "sample-inner-page";
	}
}
