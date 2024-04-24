package net.kdigital.web_project.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import lombok.RequiredArgsConstructor;
import net.kdigital.web_project.handler.CustomFailureHandler;

@Configuration	// SecurityConfig 클래스가 설정 클래스임을 나타내는 Annotation
@EnableWebSecurity	// 웹 보안은 모두 여기서
@RequiredArgsConstructor
public class SecurityConfig {

	private final CustomFailureHandler failureHandler;
	
	@Bean
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		// 웹 요청에 대한 접근권한 설정
		http
		.authorizeHttpRequests((auth) -> auth.requestMatchers(
				"/"	// ************************ 다시 설정 필요 
				, "/user/join"
				, "/user/login"
				, "/user/joinProc"
				, "/user/loginProc"
				, "/trade/showStat"
				, "/trade/stringChart"
				, "/trade/pieChart"
				, "/trade/xyCluster"
				, "/trade/StackCluster"
				, "/trade/Exbarchart"
				, "/trade/Ixbarchart"
				, "/assets/**"
				, "/images/**"
				, "/script/**"
				,"/cca/boardList"
				,"/cca/ccaList"
				,"/cca/ccaWrite"
				,"/cca/detail"
				,"/cca/replyUpdate"
				,"/cca/replyWrite"
				,"/cca/update"
				).permitAll()
				.requestMatchers("/admin/**").hasRole("ADMIN")
				.requestMatchers("/my/**").hasAnyRole("ADMIN", "USER", "CCA") // *********** 이게 맞나????
				.anyRequest().authenticated());
		
		// Custom Login 설정
		http
		.formLogin((auth) -> auth
				.loginPage("/user/login")
				.failureHandler(failureHandler)
				.usernameParameter("userId")
				.passwordParameter("userPwd")
				.loginProcessingUrl("/user/loginProc")
				.defaultSuccessUrl("/").permitAll());
		
		// 로그아웃 설정
		http
		.logout((auth) -> auth
				.logoutUrl("/user/logout")
				.logoutSuccessUrl("/")
				.invalidateHttpSession(true)
				.deleteCookies("JSESSIONID"));
		
		http
		.csrf((auth) -> auth.disable());
		return http.build();
	}
	
	@Bean
	BCryptPasswordEncoder bCryptPasswordEncoder () {
		return new BCryptPasswordEncoder();
	};
}
