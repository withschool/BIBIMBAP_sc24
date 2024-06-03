package com.withSchool.service.user;

import com.withSchool.entity.user.User;
import com.withSchool.service.mapping.StudentParentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.nurigo.java_sdk.api.Message;
import net.nurigo.java_sdk.exceptions.CoolsmsException;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class NotificationService {

    private final StudentParentService studentParentService;

    @Value("${coolsms-API-KEY}")
    String apiKey;

    @Value("${coolsms-API-SECRET}")
    String apiSecret;

    @Value("${coolsms-phone}")
    String apiPhone;

    public void sendSMSGroup(List<User> userList, String type, String title, boolean onlyStudent) {
        for (User user : userList) {
            sendSMS(user, type, title, onlyStudent );
        }
    }
    public void sendSMS(User user, String type, String title, boolean onlyStudent) {
        if (!onlyStudent) { // 학생+학부모
            User parent = studentParentService.findParentByStudent(user);
            if (parent != null) {
                sendSMS(parent, type, title, true);
            }
        }
        Message message = new Message(apiKey, apiSecret);
        HashMap<String, String> params = new HashMap<>();
        params.put("to", user.getPhoneNumber());
        params.put("from", apiPhone);
        params.put("type", "SMS");
        params.put("text", "안녕하세요. " + user.getName() + "님, " + type + "이(가) 등록되었습니다. \n제목: " + title);
        try {
            message.send(params);
        } catch (CoolsmsException e) {
            throw new RuntimeException(e);
        }
    }
}
