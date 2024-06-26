package com.withSchool.config;

import com.withSchool.JWT.JwtAuthenticationFilter;
import com.withSchool.JWT.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer;
import org.springframework.security.config.annotation.web.configurers.HttpBasicConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final JwtTokenProvider jwtTokenProvider;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity.httpBasic(HttpBasicConfigurer::disable)
                .csrf(CsrfConfigurer::disable)
                .cors()
                .and()
                // jwt를 사용하기 때문에 session을 사용하지 않는다.
                .sessionManagement(configurer -> configurer.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(
                        authorize -> authorize
                                .requestMatchers("/basic/**", "/swagger-ui/**", "/api/**").permitAll()
                                .requestMatchers("/test").hasAnyRole("ADMIN", "SUPER", "TEACHER")
                                .requestMatchers("/super/**").hasRole("SUPER")
                                .requestMatchers("/admin/**").hasAnyRole("ADMIN", "SUPER")
                                .requestMatchers(HttpMethod.POST,"/classes/notices").hasRole("TEACHER")
                                .requestMatchers(HttpMethod.PATCH,"/classes/notices/**").hasRole("TEACHER")
                                .requestMatchers(HttpMethod.DELETE,"/classes/notices/**").hasRole("TEACHER")
                                .requestMatchers(HttpMethod.POST,"/subjects/notices").hasRole("TEACHER")
                                .requestMatchers(HttpMethod.PATCH,"/subjects/notices/**").hasRole("TEACHER")
                                .requestMatchers(HttpMethod.DELETE,"/subjects/notices/**").hasRole("TEACHER")
                                .requestMatchers(HttpMethod.POST,"/subjects/homeworks").hasRole("TEACHER")
                                .requestMatchers(HttpMethod.PATCH,"/subjects/homeworks/**").hasRole("TEACHER")
                                .requestMatchers(HttpMethod.DELETE,"/subjects/homeworks/**").hasRole("TEACHER")
                                .requestMatchers(HttpMethod.POST,"/classes/homeworks").hasRole("TEACHER")
                                .requestMatchers(HttpMethod.PATCH,"/classes/homeworks/**").hasRole("TEACHER")
                                .requestMatchers(HttpMethod.DELETE,"/classes/homeworks/**").hasRole("TEACHER")

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
