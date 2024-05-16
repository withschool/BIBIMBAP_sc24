package com.withSchool.feat.feat_46_3;

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
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@SpringBootTest
public class SubjectSubjectQuestionPostRepositoryTest {
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

    @BeforeEach
    public void init() {
        schoolInformation = schoolInformationRepository.save(SchoolInformation.builder().schulNm("아주고등학교").build());
        subject = subjectRepository.save(Subject.builder().subjectName("수학").grade("3").semester("1").year("2024").schoolInformation(schoolInformation).build());
        classInformation = classRepository.save(ClassInformation.builder().grade(1).year(2024).inClass(8).schoolInformation(schoolInformation).build());
        student = userRepository.save(User.builder().id("student").name("student").accountType(0).schoolInformation(schoolInformation).classInformation(classInformation).build());
        teacher = userRepository.save(User.builder().id("teacher").name("teacher").accountType(1).schoolInformation(schoolInformation).classInformation(classInformation).build());
    }

    @Test
    @DisplayName("학생 질문 첫 작성")
    public void testMakeQuestion(){
        // given
        String questionContent = "question 1";
        int isAnswered = 0;

        SubjectQuestionPost subjectQuestionPost = SubjectQuestionPost.builder()
                .questionerId(student)
                .subject(subject)
                .questionContent("question 1")
                .isAnswered(isAnswered)
                .build();

        // when
        SubjectQuestionPost savedQuestion = subjectQuestionPostRepository.save(subjectQuestionPost);
        System.out.println(savedQuestion);

        // then
        Assertions.assertEquals(1, subjectQuestionPostRepository.findAll().size());

        Assertions.assertTrue(subjectQuestionPostRepository.findById(savedQuestion.getSubjectQuestionPostId()).isPresent());
        SubjectQuestionPost post = subjectQuestionPostRepository.findById(savedQuestion.getSubjectQuestionPostId()).get();

        Assertions.assertEquals(subject.getSubjectName(), post.getSubject().getSubjectName());
        Assertions.assertEquals(questionContent, post.getQuestionContent());
    }

    @Test
    @DisplayName("학생 자신이 작성한 질문 목록 확인하기")
    public void testShowOnesQuestionPost(){
        // given
        String questionContent = "question 1";
        int isAnswered = 0;

        SubjectQuestionPost subjectQuestionPost = SubjectQuestionPost.builder()
                .questionerId(student)
                .subject(subject)
                .questionContent(questionContent)
                .isAnswered(isAnswered)
                .build();

        SubjectQuestionPost savedQuestion = subjectQuestionPostRepository.save(subjectQuestionPost);
        Assertions.assertTrue(subjectQuestionPostRepository.findById(savedQuestion.getSubjectQuestionPostId()).isPresent());
        SubjectQuestionPost post = subjectQuestionPostRepository.findById(savedQuestion.getSubjectQuestionPostId()).get();

        // 다른 유저가 작성한 question post
        subjectQuestionPost = SubjectQuestionPost.builder()
                .questionerId(teacher)
                .subject(subject)
                .questionContent("question 1")
                .isAnswered(isAnswered)
                .build();
        savedQuestion = subjectQuestionPostRepository.save(subjectQuestionPost);

        // when
        List<SubjectQuestionPost> subjectQuestionPosts = subjectQuestionPostRepository.findAllByQuestionerId_UserId(student.getUserId());
        System.out.println(subjectQuestionPosts);

        // then
        Assertions.assertEquals(1, subjectQuestionPosts.size());
        Assertions.assertEquals(post.getSubjectQuestionPostId(), subjectQuestionPosts.get(0).getSubjectQuestionPostId());

    }

    @Test
    @DisplayName("학생 자신이 작성한 질문 수정하기")
    public void testModifyQuestion(){
        // given
        String questionContent = "question 1";
        int isAnswered = 0;

        SubjectQuestionPost subjectQuestionPost = SubjectQuestionPost.builder()
                .questionerId(student)
                .subject(subject)
                .questionContent(questionContent)
                .isAnswered(isAnswered)
                .build();

        SubjectQuestionPost savedQuestion = subjectQuestionPostRepository.save(subjectQuestionPost);
        Assertions.assertTrue(subjectQuestionPostRepository.findById(savedQuestion.getSubjectQuestionPostId()).isPresent());
        SubjectQuestionPost post = subjectQuestionPostRepository.findById(savedQuestion.getSubjectQuestionPostId()).get();

        // 다른 유저가 작성한 question post
        subjectQuestionPost = SubjectQuestionPost.builder()
                .questionerId(teacher)
                .subject(subject)
                .questionContent("question 1")
                .isAnswered(isAnswered)
                .build();
        subjectQuestionPostRepository.save(subjectQuestionPost);

        String modifiedContent = "question 2";

        // when
        Assertions.assertEquals("question 1", post.getQuestionContent());
        SubjectQuestionPost modifiedQuestion = SubjectQuestionPost.builder()
                .subjectQuestionPostId(post.getSubjectQuestionPostId())
                .questionContent(modifiedContent)
                .questionerId(post.getQuestionerId())
                .answerContent(post.getAnswerContent())
                .answererId(post.getAnswererId())
                .isAnswered(post.getIsAnswered())
                .subject(post.getSubject())
                .build();
        SubjectQuestionPost savedModifiedQuestion = subjectQuestionPostRepository.save(modifiedQuestion);

        // then
        Assertions.assertEquals(2, subjectQuestionPostRepository.findAll().size());

        Assertions.assertTrue(subjectQuestionPostRepository.findById(savedModifiedQuestion.getSubjectQuestionPostId()).isPresent());
        SubjectQuestionPost modifiedPost = subjectQuestionPostRepository.findById(savedModifiedQuestion.getSubjectQuestionPostId()).get();

        Assertions.assertEquals("수학", modifiedPost.getSubject().getSubjectName());
        Assertions.assertNotEquals("question 1", modifiedPost.getQuestionContent());
        Assertions.assertEquals("question 2", post.getQuestionContent());
    }

    @Test
    @DisplayName("질문 삭제")
    public void testDeleteQuestion(){
        // given
        String questionContent = "question 1";
        int isAnswered = 0;

        SubjectQuestionPost subjectQuestionPost = SubjectQuestionPost.builder()
                .questionerId(student)
                .subject(subject)
                .questionContent(questionContent)
                .isAnswered(isAnswered)
                .build();

        SubjectQuestionPost savedQuestion = subjectQuestionPostRepository.save(subjectQuestionPost);
        Assertions.assertTrue(subjectQuestionPostRepository.findById(savedQuestion.getSubjectQuestionPostId()).isPresent());
        SubjectQuestionPost post = subjectQuestionPostRepository.findById(savedQuestion.getSubjectQuestionPostId()).get();

        // when
        Assertions.assertEquals(1, subjectQuestionPostRepository.findAll().size());
        subjectQuestionPostRepository.deleteById(post.getSubjectQuestionPostId());

        // then
        Assertions.assertEquals(0, subjectQuestionPostRepository.findAll().size());
    }
}
