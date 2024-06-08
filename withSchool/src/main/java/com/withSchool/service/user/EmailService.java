package com.withSchool.service.user;

import com.withSchool.dto.school.ReqApplicationDefaultDTO;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.mail.javamail.JavaMailSender;
@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class EmailService {

    private final JavaMailSender emailSender;

    @Value("${spring.mail.username}")
    String fromEmail;

    public void sendApplicationMessage(ReqApplicationDefaultDTO reqApplicationDefaultDTO, int state) {
        // state = 1 : 등록 / state = 2 : 처리 중 / state = 3 : 반려
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        try {
            String title, subtitle, notice;
            if (state == 0) { // 신청
                title = "신청 완료";
                subtitle = "신청되었습니다.";
                notice = "최초 신청 후 승인까지 3~4일 소요될 수 있습니다.";
            }
            else if (state == 1) { // 처리 중
                title = "처리 심사 안내";
                subtitle = "처리 심사 중입니다.";
                notice = "처리 심사 후 승인까지 1~2일 소요될 수 있습니다.";
            } else if (state == 3) { // 반려
                title = "반려 안내";
                subtitle = "반려되었습니다.";
                notice = "신청하신 내용을 다시 확인해주세요.";
            } else { // 승인 (별도의 메일 전송)
                return;
            }
            helper.setFrom(fromEmail);
            helper.setTo(reqApplicationDefaultDTO.getSchoolAdminEmail());
            helper.setSubject("학교랑 서비스 신청서 " + title + "\n");
            helper.setText("학교랑 서비스 신청서가 " + subtitle + "\n" +
                    "신청하신 내용은 아래와 같습니다.\n" +
                    "이름 : " + reqApplicationDefaultDTO.getSchoolAdminName() + "\n" +
                    "이메일: " + reqApplicationDefaultDTO.getSchoolAdminEmail() + "\n" +
                    "학교 이름: " + reqApplicationDefaultDTO.getSchoolName() + "\n" +
                    "학교 코드: " + reqApplicationDefaultDTO.getSD_SCHUL_CODE() + "\n" +
                    "전화번호: " + reqApplicationDefaultDTO.getSchoolPhoneNumber() + "\n" +
                    notice + "\n감사합니다.");
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
        emailSender.send(message);
    }

    public void sendAdminMessage(String schoolName, String adminEmail, String id, String rawPassword) {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        try {
            helper.setFrom(fromEmail);
            helper.setTo(adminEmail);
            helper.setSubject("학교랑 서비스 가입 완료\n");
            helper.setText("학교랑 서비스에 가입이 완료되었습니다.\n" +
                    "가입 학교명 : " + schoolName + "\n" +
                    "어드민 아이디: " + id + "\n" +
                    "임시 비밀번호: " + rawPassword + "\n" +
                    "감사합니다.");
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
        emailSender.send(message);
    }
}
