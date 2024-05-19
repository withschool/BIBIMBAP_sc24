package com.withSchool.feat.feat_31;

import com.withSchool.entity.classes.ClassInformation;
import com.withSchool.entity.school.SchoolInformation;
import com.withSchool.entity.subject.Subject;
import com.withSchool.entity.subject.SubjectQuestionPost;
import com.withSchool.entity.user.User;
import com.withSchool.repository.classes.ClassRepository;
import com.withSchool.repository.school.SchoolInformationRepository;
import com.withSchool.repository.subject.SubjectRepository;
import com.withSchool.repository.user.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
public class SubjectQuestionPostRepository {
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
    private com.withSchool.repository.subject.SubjectQuestionPostRepository subjectQuestionPostRepository;

    @BeforeEach
    public void init() {
        schoolInformation = schoolInformationRepository.save(SchoolInformation.builder().schulNm("아주고등학교").build());
        subject = subjectRepository.save(Subject.builder().subjectName("수학").grade("3").semester("1").year("2024").schoolInformation(schoolInformation).build());
        classInformation = classRepository.save(ClassInformation.builder().grade(1).year(2024).inClass(8).schoolInformation(schoolInformation).build());
        student = userRepository.save(User.builder().id("student").name("student").accountType(0).schoolInformation(schoolInformation).classInformation(classInformation).build());
        teacher = userRepository.save(User.builder().id("teacher").name("teacher").accountType(1).schoolInformation(schoolInformation).classInformation(classInformation).build());

        String questionContent = "question 1";
        int isAnswered = 0;

        SubjectQuestionPost subjectQuestionPost = SubjectQuestionPost.builder()
                .questionerId(student)
                .subject(subject)
                .questionContent(questionContent)
                .isAnswered(isAnswered)
                .build();
        subjectQuestionPostRepository.save(subjectQuestionPost);
    }

}
