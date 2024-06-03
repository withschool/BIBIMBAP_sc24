package com.withSchool.feat.feat_46_3;

import com.withSchool.dto.subject.ReqQuestionPostModifyDTO;
import com.withSchool.dto.subject.ReqQuestionPostQuestionerPostDTO;
import com.withSchool.dto.subject.ResSubjectQuestionPostDefaultDTO;
import com.withSchool.entity.classes.ClassInformation;
import com.withSchool.entity.school.SchoolInformation;
import com.withSchool.entity.subject.SubjectQuestionPost;
import com.withSchool.entity.subject.Subject;
import com.withSchool.entity.user.User;
import com.withSchool.repository.classes.ClassRepository;
import com.withSchool.repository.school.SchoolInformationRepository;
import com.withSchool.repository.subject.SubjectQuestionPostRepository;
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
public class SubjectQuestionPostServiceTest {
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
    private SubjectQuestionPostRepository subjectQuestionPostRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @BeforeEach
    public void init() {
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
    @DisplayName("학생 질문 첫 작성")
    public void testMakeQuestion(){
        // given
        String questionContent = "question 1";
        ReqQuestionPostQuestionerPostDTO reqQuestionPostQuestionerPostDTO = ReqQuestionPostQuestionerPostDTO.builder()
                .questionContent(questionContent)
                .subjectId(subject.getSubjectId())
                .build();

        // when
        ResSubjectQuestionPostDefaultDTO savedQuestion = subjectQuestionPostService.save(reqQuestionPostQuestionerPostDTO);
        System.out.println(savedQuestion);

        // then
        Assertions.assertEquals(1, subjectQuestionPostService.findAllBySubject(subject.getSubjectId()).size());

        ResSubjectQuestionPostDefaultDTO post = subjectQuestionPostService.findById(savedQuestion.getSubjectQuestionPostId());

        Assertions.assertEquals("question 1", post.getQuestionContent());
    }

    @Test
    @DisplayName("학생 자신이 작성한 질문 목록 확인하기")
    public void testShowOnesQuestionPost(){
        // given
        String questionContent = "question 1";
        ReqQuestionPostQuestionerPostDTO reqQuestionPostQuestionerPostDTO = ReqQuestionPostQuestionerPostDTO.builder()
                .questionContent(questionContent)
                .subjectId(subject.getSubjectId())
                .build();

        ResSubjectQuestionPostDefaultDTO savedQuestion = subjectQuestionPostService.save(reqQuestionPostQuestionerPostDTO);
        ResSubjectQuestionPostDefaultDTO post = subjectQuestionPostService.findById(savedQuestion.getSubjectQuestionPostId());

        // when
        List<ResSubjectQuestionPostDefaultDTO> questionPosts = subjectQuestionPostService.findAllByQuestionerId_UserId(student.getUserId());
        System.out.println(questionPosts);

        // then
        Assertions.assertEquals(1, questionPosts.size());
        Assertions.assertEquals(post.getSubjectQuestionPostId(), questionPosts.get(0).getSubjectQuestionPostId());

    }

    @Test
    @DisplayName("학생 자신이 작성한 질문 수정하기")
    public void testModifyQuestion(){
        // given
        String questionContent = "question 1";
        ReqQuestionPostQuestionerPostDTO reqQuestionPostQuestionerPostDTO = ReqQuestionPostQuestionerPostDTO.builder()
                .questionContent(questionContent)
                .subjectId(subject.getSubjectId())
                .build();

        ResSubjectQuestionPostDefaultDTO savedQuestion = subjectQuestionPostService.save(reqQuestionPostQuestionerPostDTO);
        ResSubjectQuestionPostDefaultDTO post = subjectQuestionPostService.findById(savedQuestion.getSubjectQuestionPostId());

        String modifiedContent = "question 2";

        // when
        Assertions.assertEquals("question 1", post.getQuestionContent());
        User answerer;
        if(post.getAnswerer() == null){
            answerer = null;
        }
        else{
            answerer = userRepository.findById(post.getAnswerer().getUserId()).orElse(null);
        }
        SubjectQuestionPost modifiedQuestion = SubjectQuestionPost.builder()
                .subjectQuestionPostId(post.getSubjectQuestionPostId())
                .questionContent(modifiedContent)
                .questionerId(userRepository.findById(post.getQuestioner().getUserId()).orElse(null))
                .answerContent(post.getAnswerContent())
                .answererId(answerer)
                .isAnswered(post.getIsAnswered())
                .subject(subjectRepository.findById(post.getSubjectId()).orElse(null))
                .build();

        ReqQuestionPostModifyDTO reqQuestionPostModifyDTO = ReqQuestionPostModifyDTO.builder()
                .questionContent(modifiedQuestion.getQuestionContent())
                .build();

        ResSubjectQuestionPostDefaultDTO savedModifiedQuestion = subjectQuestionPostService.updateQuestion(modifiedQuestion.getSubjectQuestionPostId(), reqQuestionPostModifyDTO);

        // then
        Assertions.assertEquals(1, subjectQuestionPostService.findAllBySubject(subject.getSubjectId()).size());

        ResSubjectQuestionPostDefaultDTO resSubjectQuestionPostDefaultDTO = subjectQuestionPostService.findById(savedModifiedQuestion.getSubjectQuestionPostId());

        Assertions.assertNotEquals("question 1", resSubjectQuestionPostDefaultDTO.getQuestionContent());
        Assertions.assertEquals("question 2", resSubjectQuestionPostDefaultDTO.getQuestionContent());
    }

    @Test
    @DisplayName("질문 삭제")
    public void testDeleteQuestion(){
        // given
        String questionContent = "question 1";
        ReqQuestionPostQuestionerPostDTO reqQuestionPostQuestionerPostDTO = ReqQuestionPostQuestionerPostDTO.builder()
                .questionContent(questionContent)
                .subjectId(subject.getSubjectId())
                .build();

        ResSubjectQuestionPostDefaultDTO savedQuestion = subjectQuestionPostService.save(reqQuestionPostQuestionerPostDTO);
        ResSubjectQuestionPostDefaultDTO post = subjectQuestionPostService.findById(savedQuestion.getSubjectQuestionPostId());

        // when
        subjectQuestionPostService.deleteById(post.getSubjectQuestionPostId());

        // then
        Assertions.assertEquals(0, subjectQuestionPostRepository.findAll().size());
    }
}
