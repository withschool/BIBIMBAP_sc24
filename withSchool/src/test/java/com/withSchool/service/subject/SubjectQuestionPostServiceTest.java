package com.withSchool.service.subject;

import com.withSchool.dto.subject.ReqQuestionPostModifyDTO;
import com.withSchool.dto.subject.ReqQuestionPostQuestionerPostDTO;
import com.withSchool.dto.subject.ResSubjectQuestionPostDefaultDTO;
import com.withSchool.entity.classes.ClassInformation;
import com.withSchool.entity.school.SchoolInformation;
import com.withSchool.entity.subject.Subject;
import com.withSchool.entity.subject.SubjectQuestionPost;
import com.withSchool.entity.user.User;
import com.withSchool.repository.subject.SubjectQuestionPostRepository;
import com.withSchool.repository.subject.SubjectRepository;
import com.withSchool.service.user.UserService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class SubjectQuestionPostServiceTest {
    @InjectMocks
    private SubjectQuestionPostService subjectQuestionPostService;

    @Mock
    private SubjectRepository subjectRepository;
    @Mock
    private UserService userService;
    @Mock
    private SubjectQuestionPostRepository subjectQuestionPostRepository;

    SchoolInformation schoolInformation = SchoolInformation.builder().schoolId(1L).atptOfcdcScCode("T10").atptOfcdcScNm("제주특별자치도교육청").sdSchulCode("9299048").schulNm("가마초등학교").engSchulNm("GAMA ELEMENTARY SCHOOL").schulKndScNm("초등학교").lctnScNm("제주특별자치도").juOrgNm("서귀포시교육지원청").fondScNm("공립").orgRdnzc("63625").orgRdnma("제주특별자치도 서귀포시 표선면 일주동로6285번길 8").orgRdnda("/ 가마초등학교 (표선면)").orgTelno("064-780-9500").hmpgAdres("http://gama.jje.es.kr").coeduScNm("남여공학").orgFaxno("064-780-9580").hsScNm("").indstSpeclCccclExstYn("N").hsGnrlBusnsScNm("해당없음").spclyPurpsHsOrdNm("").eneBfeSehfScNm("전기").dghtScNm("주간").fondYmd("19680301").foasMemrd("19730316").loadDtm("20230615").build();
    Subject subject = Subject.builder().subjectId(1L).subjectName("수학").grade("1").year("2024").year("2024").semester("1").regDate(LocalDateTime.now()).schoolInformation(schoolInformation).build();
    ClassInformation classInfo = ClassInformation.builder().grade(1).inClass(2).year(2024).classId(1L).modDate(null).regDate(LocalDateTime.now()).schoolInformation(schoolInformation).build();
    User student = User.builder().userId(18L).id("id1").password("$2a$10$ObJRKLgEVLam.jWp.qssiuYlQ4Nq.mY8pZw8It3Ae6spt45Hiy0sm").email("newemail@ajou.ac.kr").name("황근출1").sex(false).phoneNumber("01012345678").address("new address").birthDate(null).accountType(0).userCode("asdas12as1").schoolInformation(schoolInformation).classInformation(classInfo).build();
    User teacher = User.builder().userId(19L).id("id2").password("$2a$10$ObJRKLgEVLam.jWp.qssiuYlQ4Nq.mY8pZw8It3Ae6spt45Hiy0sm").email("newemail@ajou.ac.kr").name("황근출1").sex(false).phoneNumber("01012345678").address("new address").birthDate(null).accountType(2).userCode("asdas12as1").schoolInformation(schoolInformation).classInformation(classInfo).build();
    SubjectQuestionPost subjectQuestionPost = SubjectQuestionPost.builder().questionerId(student).subject(subject).questionContent("content").isAnswered(0).build();
//    @BeforeEach
//    public void init() {
//        SecurityContext context = SecurityContextHolder.getContext();
//        context.setAuthentication(new UsernamePasswordAuthenticationToken(student, student.getPassword()));
//    }

    @Test
    @DisplayName("과목별 질문 저장")
    void testSave() {
        // given
        ReqQuestionPostQuestionerPostDTO reqQuestionPostQuestionerPostDTO = ReqQuestionPostQuestionerPostDTO.builder()
                .subjectId(1L)
                .questionContent("content")
                .build();
        SubjectQuestionPost returnedSubjectQuestionPost = SubjectQuestionPost.builder()
                .subjectQuestionPostId(1L)
                .questionerId(student)
                .subject(subject)
                .questionContent(reqQuestionPostQuestionerPostDTO.getQuestionContent())
                .isAnswered(0)
                .build();

        when(subjectRepository.findById(anyLong())).thenReturn(Optional.of(subject));
        when(userService.getCurrentUser()).thenReturn(student);

        // when
        when(subjectQuestionPostRepository.save(subjectQuestionPost)).thenReturn(returnedSubjectQuestionPost);
        ResSubjectQuestionPostDefaultDTO resSubjectQuestionPostDefaultDTO = subjectQuestionPostService.save(reqQuestionPostQuestionerPostDTO);

        // then
        Assertions.assertEquals(subject.getSubjectId(), resSubjectQuestionPostDefaultDTO.getSubjectId());
        Assertions.assertEquals(reqQuestionPostQuestionerPostDTO.getQuestionContent(), resSubjectQuestionPostDefaultDTO.getQuestionContent());
        Assertions.assertEquals(0, resSubjectQuestionPostDefaultDTO.getIsAnswered());
    }

    @Test
    @DisplayName("과목별 질문 리스트 조회")
    void testFindAllBySubject() {
        // given
        when(subjectQuestionPostRepository.findAllBySubject_SubjectId(subject.getSubjectId())).thenReturn(List.of(subjectQuestionPost));

        // when
        List<ResSubjectQuestionPostDefaultDTO> dtos = subjectQuestionPostService.findAllBySubject(subject.getSubjectId());

        // then
        Assertions.assertEquals(1, dtos.size());
        Assertions.assertEquals("content", dtos.get(0).getQuestionContent());
        Assertions.assertEquals(student.getUserId(), dtos.get(0).getQuestioner().getUserId());
    }

    @Test
    @DisplayName("과목별 질문 단건 조회")
    void testFindById(){
        // given
        when(subjectQuestionPostRepository.findById(subjectQuestionPost.getSubjectQuestionPostId())).thenReturn(Optional.of(subjectQuestionPost));

        // when
        ResSubjectQuestionPostDefaultDTO resSubjectQuestionPostDefaultDTO = subjectQuestionPostService.findById(subjectQuestionPost.getSubjectQuestionPostId());

        // then
        Assertions.assertEquals(subjectQuestionPost.getSubjectQuestionPostId(), resSubjectQuestionPostDefaultDTO.getSubjectQuestionPostId());
    }

    @Test
    @DisplayName("학생 자신이 작성한 질문 목록 확인하기")
    void testFindAllByQuestionerId_UserId(){
        // given
        when(subjectQuestionPostRepository.findAllByQuestionerId_UserId(student.getUserId())).thenReturn(List.of(subjectQuestionPost));

        // then
        List<ResSubjectQuestionPostDefaultDTO> dtos = subjectQuestionPostService.findAllByQuestionerId_UserId(student.getUserId());

        // then
        Assertions.assertEquals(1, dtos.size());
        Assertions.assertEquals(subjectQuestionPost.getQuestionContent(), dtos.get(0).getQuestionContent());

    }

    @Test
    @DisplayName("과목별 질문 단건 삭제")
    void testDeleteById(){
        // given
        doNothing().when(subjectQuestionPostRepository).deleteById(subjectQuestionPost.getSubjectQuestionPostId());

        // when
        subjectQuestionPostService.deleteById(subjectQuestionPost.getSubjectQuestionPostId());

        // then
        verify(subjectQuestionPostRepository, times(1)).deleteById(subjectQuestionPost.getSubjectQuestionPostId());
    }

    @Test
    @DisplayName("학생의 질문 수정")
    void testUpdateQuestion_Student(){
        // given
        Long questionPostId = 1L;
        ReqQuestionPostModifyDTO reqQuestionPostModifyDTO = ReqQuestionPostModifyDTO.builder()
                .questionContent("modified content")
                .answerContent(null)
                .build();

        when(userService.getCurrentUser()).thenReturn(student);
        SubjectQuestionPost modifiedSubjectQuestionPost = SubjectQuestionPost.builder()
                .subjectQuestionPostId(questionPostId)
                .questionContent("modified content")
                .answerContent(null)
                .questionerId(student)
                .answererId(null)
                .isAnswered(0)
                .subject(subject)
                .build();

        when(subjectQuestionPostRepository.save(any(SubjectQuestionPost.class))).thenReturn(modifiedSubjectQuestionPost);
        when(subjectQuestionPostRepository.findById(questionPostId)).thenReturn(Optional.of(subjectQuestionPost));
        when(subjectRepository.findById(anyLong())).thenReturn(Optional.of(subject));

        // when
        ResSubjectQuestionPostDefaultDTO resSubjectQuestionPostDefaultDTO = subjectQuestionPostService.updateQuestion(questionPostId, reqQuestionPostModifyDTO);

        // then
        Assertions.assertNotEquals(subjectQuestionPost.getQuestionContent(), resSubjectQuestionPostDefaultDTO.getQuestionContent());
        Assertions.assertEquals(questionPostId, resSubjectQuestionPostDefaultDTO.getSubjectQuestionPostId());
        Assertions.assertEquals(subjectQuestionPost.getIsAnswered(), resSubjectQuestionPostDefaultDTO.getIsAnswered());
        Assertions.assertNull(resSubjectQuestionPostDefaultDTO.getAnswerContent());

    }
    @Test
    @DisplayName("교사의 질문 답변")
    void testUpdateQuestion_Teacher(){
        // given
        Long questionPostId = 1L;
        ReqQuestionPostModifyDTO reqQuestionPostModifyDTO = ReqQuestionPostModifyDTO.builder()
                .questionContent("modified content")
                .answerContent("answer")
                .build();

        when(userService.getCurrentUser()).thenReturn(teacher);
        SubjectQuestionPost modifiedSubjectQuestionPost = SubjectQuestionPost.builder()
                .subjectQuestionPostId(questionPostId)
                .questionContent("modified content")
                .answerContent("answer")
                .questionerId(student)
                .answererId(teacher)
                .isAnswered(1)
                .subject(subject)
                .build();

        when(subjectQuestionPostRepository.save(any(SubjectQuestionPost.class))).thenReturn(modifiedSubjectQuestionPost);
        when(subjectQuestionPostRepository.findById(questionPostId)).thenReturn(Optional.of(subjectQuestionPost));
        when(subjectRepository.findById(anyLong())).thenReturn(Optional.of(subject));

        // when
        ResSubjectQuestionPostDefaultDTO resSubjectQuestionPostDefaultDTO = subjectQuestionPostService.updateQuestion(questionPostId, reqQuestionPostModifyDTO);

        // then
        Assertions.assertNotEquals(subjectQuestionPost.getAnswerContent(), resSubjectQuestionPostDefaultDTO.getAnswerContent());
        Assertions.assertEquals(questionPostId, resSubjectQuestionPostDefaultDTO.getSubjectQuestionPostId());
        Assertions.assertEquals(1, resSubjectQuestionPostDefaultDTO.getIsAnswered());
        Assertions.assertNotNull(resSubjectQuestionPostDefaultDTO.getAnswerContent());

    }
}
