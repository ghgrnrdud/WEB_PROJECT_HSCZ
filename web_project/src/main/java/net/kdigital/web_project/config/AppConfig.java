package net.kdigital.web_project.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class AppConfig {
	
	@Bean
	RestTemplate restTemplate() {
		return new RestTemplate();
	}
<<<<<<< HEAD
=======

>>>>>>> b634b614a84a70067bd50b394571f1357a1e9821
}
