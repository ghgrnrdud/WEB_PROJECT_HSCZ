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
>>>>>>> 8b277429deb5ae23f967cc85ba9c1cfbc4beec27
}
