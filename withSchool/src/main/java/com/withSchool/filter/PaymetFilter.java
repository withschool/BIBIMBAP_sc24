package com.withSchool.filter;

import com.withSchool.entity.school.SchoolInformation;
import com.withSchool.entity.user.User;
import com.withSchool.service.school.SchoolInformationService;
import com.withSchool.service.user.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class PaymetFilter extends OncePerRequestFilter {
    private final UserService userService;
    private final SchoolInformationService schoolInformationService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        User user = userService.getCurrentUser();
        if(user.getAccountType() == 1 || user.getAccountType() == 4) filterChain.doFilter(request, response);
        else{
            Long schoolId = user.getSchoolInformation().getSchoolId();
            SchoolInformation schoolInformation = schoolInformationService.dtoToEntity(schoolInformationService.findById(schoolId));

            // 결제 검증 로직 바뀌면 여기 조건문 수정해야 함
            if(schoolInformation.getPaymentState() == 0){
                response.setStatus(HttpServletResponse.SC_PAYMENT_REQUIRED);
                response.getWriter().write("Payment required");
                return;
            }

            filterChain.doFilter(request, response);
        }
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        // 제외할 URL 패턴을 정의
        String path = request.getRequestURI();
        return path.startsWith("/basic") || path.startsWith("/api") || path.startsWith("/swagger-ui");
    }
}
