package com.withSchool.config;

import com.withSchool.JWT.JwtAuthenticationFilter;
import com.withSchool.JWT.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer;
import org.springframework.security.config.annotation.web.configurers.HttpBasicConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final JwtTokenProvider jwtTokenProvider;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .httpBasic(HttpBasicConfigurer::disable)
                .csrf(CsrfConfigurer::disable)
                .cors(c -> {
                    CorsConfigurationSource source = request -> {
                        CorsConfiguration config = new CorsConfiguration();
//                        config.setAllowedOrigins(List.of("http://localhost:3000", "https://withschool.site", "https://withschool.github.io"));
                        config.setAllowedOrigins(List.of("*"));
                        config.setAllowedMethods(List.of("*"));
                        config.setAllowedHeaders(List.of("*"));
                        config.setAllowCredentials(true);

                        return config;
                    };
                    c.configurationSource(source);
                })
                // jwt를 사용하기 때문에 session을 사용하지 않는다.
                .sessionManagement(configurer -> configurer.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize ->
                        authorize
                                .requestMatchers("/sign-in", "/sign-up", "/connectionTest").permitAll()
                                .requestMatchers("/test").hasAnyRole("ADMIN", "SUPER", "TEACHER")
                                .requestMatchers("/super/**").hasRole("SUPER")
                                .requestMatchers("/admin/**").hasAnyRole("ADMIN", "SUPER")
                                .anyRequest().authenticated()
                )
                .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
