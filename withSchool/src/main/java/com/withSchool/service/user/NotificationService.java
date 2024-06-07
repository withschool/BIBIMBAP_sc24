package com.withSchool.service.user;

import com.withSchool.dto.school.ReqApplicationDefaultDTO;
import com.withSchool.entity.user.User;
import com.withSchool.service.mapping.StudentParentService;
import com.withSchool.dto.user.MailDTO;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.nurigo.java_sdk.api.Message;
import net.nurigo.java_sdk.exceptions.CoolsmsException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;


import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import java.util.List;


@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class NotificationService {

    private final StudentParentService studentParentService;
    private final JavaMailSender emailSender;

    @Value("${coolsms-API-KEY}")
    String apiKey;

    @Value("${coolsms-API-SECRET}")
    String apiSecret;

    @Value("${coolsms-phone}")
    String apiPhone;

    @Value("${spring.mail.username}")
    String fromEmail;

    public void sendSMSGroup(List<User> userList, String type, String title, boolean onlyStudent) {
        for (User user : userList) {
            sendSMS(user, type, title, onlyStudent );
        }
    }
    public void sendSMS(User user, String type, String title, boolean onlyStudent) {
        if (!onlyStudent ) { // 학생+학부모
            try {
                User parent = studentParentService.findParentByStudent(user);
                sendSMS(parent, type, title, true);
            }
            catch (Exception e) {
                NotificationService.log.error("학부모 정보를 찾을 수 없습니다. 학생: " + user.getName());
            }

        }
        Message message = new Message(apiKey, apiSecret);
        HashMap<String, String> params = new HashMap<>();
        params.put("to", user.getPhoneNumber());
        params.put("from", apiPhone);
        params.put("type", "SMS");
        params.put("text", "안녕하세요 " + user.getName() + "님.\n" + type + " 등록되었습니다. \n제목: " + title);
        try {
            message.send(params);
        } catch (CoolsmsException e) {
            throw new RuntimeException(e);
        }
    }

    public void sendSimpleMessage(MailDTO mailDTO) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(mailDTO.getAddress());
        message.setSubject(mailDTO.getTitle());
        message.setText(mailDTO.getContent());
        emailSender.send(message);
    }

    public void sendApplicationMessage(ReqApplicationDefaultDTO reqApplicationDefaultDTO, int state) {
        // state = 0 : 등록 / state = 1 : 반려
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        try {
            String title = state == 0 ? "등록 완료" : "반려 안내";
            String subtitle = state == 0 ? "등록되었습니다." : "반려되었습니다.";
            String notice = state == 0 ? "최초 신청 후 승인까지 1~2일 소요될 수 있습니다." : "신청하신 내용을 다시 확인해주세요.";
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

}
