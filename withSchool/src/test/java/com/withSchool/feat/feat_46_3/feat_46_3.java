package com.withSchool.feat.feat_46_3;

import com.withSchool.dto.subject.ReqQuestionPostModifyDTO;
import com.withSchool.dto.subject.ReqQuestionPostQuestionerPostDTO;
import com.withSchool.dto.subject.ResSubjectQuestionPostDefaultDTO;
import com.withSchool.entity.classes.ClassInformation;
import com.withSchool.entity.school.SchoolInformation;
import com.withSchool.entity.subject.Subject;
import com.withSchool.entity.user.User;
import com.withSchool.repository.classes.ClassRepository;
import com.withSchool.repository.school.SchoolInformationRepository;
import com.withSchool.repository.subject.SubjectRepository;
import com.withSchool.repository.user.UserRepository;
import com.withSchool.service.subject.SubjectQuestionPostService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@SpringBootTest
@Transactional
public class feat_46_3 {

    SchoolInformation schoolInformation;
    Subject subject;
    ClassInformation classInformation;
    User student;
    User teacher;

    @Autowired
    private SchoolInformationRepository schoolInformationRepository;
    @Autowired
    private SubjectRepository subjectRepository;
    @Autowired
    private ClassRepository classRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @BeforeEach
    public void init() {
        System.out.println("""
                ----------------------------------
                ---        테스트 초기화        ---
                ----------------------------------""");
        schoolInformation = schoolInformationRepository.save(SchoolInformation.builder().schulNm("아주고등학교").build());
        subject = subjectRepository.save(Subject.builder().subjectName("수학").grade("3").semester("1").year("2024").schoolInformation(schoolInformation).build());
        classInformation = classRepository.save(ClassInformation.builder().grade(1).year(2024).inClass(8).schoolInformation(schoolInformation).build());
        student = userRepository.save(User.builder().id("student").password(passwordEncoder.encode("dd1")).name("student").accountType(0).schoolInformation(schoolInformation).classInformation(classInformation).build());
        teacher = userRepository.save(User.builder().id("teacher").password(passwordEncoder.encode("dd1")).name("teacher").accountType(1).schoolInformation(schoolInformation).classInformation(classInformation).build());
        SecurityContext context = SecurityContextHolder.getContext();
        context.setAuthentication(new UsernamePasswordAuthenticationToken(student, student.getPassword()));
    }

    @Autowired
    private SubjectQuestionPostService subjectQuestionPostService;

    @Test
    @DisplayName("CREATE 학생의 질문 작성")
    public void testCreateQuestion() {
        System.out.println("""
                ----------------------------------
                --- 학생의 질문 작성 테스트 시작  ---
                ----------------------------------""");
        // given
        String questionContent = "question 1";

        ReqQuestionPostQuestionerPostDTO reqQuestionPostQuestionerPostDTO = ReqQuestionPostQuestionerPostDTO.builder()
                .questionContent(questionContent)
                .subjectId(subject.getSubjectId())
                .build();

        // when
        ResSubjectQuestionPostDefaultDTO q = subjectQuestionPostService.save(reqQuestionPostQuestionerPostDTO);

        // then
        Assertions.assertEquals(questionContent, q.getQuestionContent());
        Assertions.assertEquals(student.getUserId(), q.getQuestioner().getUserId());
    }

    @Test
    @DisplayName("READ 특정 과목에 대한 학생 본인이 작성한 질문 조회")
    public void testReadQuestion() {
        System.out.println("""
                ----------------------------------
                --- 학생의 질문 조회 테스트 시작  ---
                ----------------------------------""");
        // given
        String questionContent = "question 1";

        ReqQuestionPostQuestionerPostDTO reqQuestionPostQuestionerPostDTO = ReqQuestionPostQuestionerPostDTO.builder()
                .questionContent(questionContent)
                .subjectId(subject.getSubjectId())
                .build();

        // when
        subjectQuestionPostService.save(reqQuestionPostQuestionerPostDTO);
        Long subjectId = subject.getSubjectId();

        // when
        List<ResSubjectQuestionPostDefaultDTO> defaultDTOS = subjectQuestionPostService.findAllBySubject(subjectId);

        // then
        Assertions.assertEquals(1, defaultDTOS.size());
        Assertions.assertEquals("student", defaultDTOS.get(0).getQuestioner().getName());
    }

    @Test
    @DisplayName("READ PK로 질문 조회")
    public void showOneQuestion(){
        // given
        String questionContent = "question 1";

        ReqQuestionPostQuestionerPostDTO reqQuestionPostQuestionerPostDTO = ReqQuestionPostQuestionerPostDTO.builder()
                .questionContent(questionContent)
                .subjectId(subject.getSubjectId())
                .build();

        ResSubjectQuestionPostDefaultDTO q = subjectQuestionPostService.save(reqQuestionPostQuestionerPostDTO);
        Long questionId = q.getSubjectQuestionPostId();

        // when
        ResSubjectQuestionPostDefaultDTO dto = subjectQuestionPostService.findById(questionId);

        // then
        Assertions.assertEquals(questionContent, dto.getQuestionContent());

    }

    @Test
    @DisplayName("UPDATE 질문 수정")
    public void testModifyQuestion(){
        // given
        String questionContent = "question 1";


        ReqQuestionPostQuestionerPostDTO reqQuestionPostQuestionerPostDTO = ReqQuestionPostQuestionerPostDTO.builder()
                .questionContent(questionContent)
                .subjectId(subject.getSubjectId())
                .build();

        ResSubjectQuestionPostDefaultDTO q = subjectQuestionPostService.save(reqQuestionPostQuestionerPostDTO);
        Long questionId = q.getSubjectQuestionPostId();

        ResSubjectQuestionPostDefaultDTO dto = subjectQuestionPostService.findById(questionId);
        Assertions.assertEquals(questionContent, dto.getQuestionContent());

        String modifiedQuestionContent = "modified question 1";

        ReqQuestionPostModifyDTO reqQuestionPostModifyDTO = ReqQuestionPostModifyDTO.builder()
                .questionContent(modifiedQuestionContent)
                .build();

        // when
        Assertions.assertEquals(questionContent, q.getQuestionContent());
        q = subjectQuestionPostService.updateQuestion(questionId, reqQuestionPostModifyDTO);

        // then
        Assertions.assertEquals(modifiedQuestionContent, q.getQuestionContent());

    }

    @Test
    @DisplayName("DELETE 질문 삭제")
    public void testDeleteQuestion(){
        // given
        String questionContent = "question 1";

        ReqQuestionPostQuestionerPostDTO reqQuestionPostQuestionerPostDTO = ReqQuestionPostQuestionerPostDTO.builder()
                .questionContent(questionContent)
                .subjectId(subject.getSubjectId())
                .build();

        ResSubjectQuestionPostDefaultDTO q = subjectQuestionPostService.save(reqQuestionPostQuestionerPostDTO);
        Long questionId = q.getSubjectQuestionPostId();

        // when
        Assertions.assertEquals(1, subjectQuestionPostService.findAllBySubject(subject.getSubjectId()).size());
        subjectQuestionPostService.deleteById(questionId);

        // then
        Assertions.assertEquals(0, subjectQuestionPostService.findAllBySubject(subject.getSubjectId()).size());
    }
}
