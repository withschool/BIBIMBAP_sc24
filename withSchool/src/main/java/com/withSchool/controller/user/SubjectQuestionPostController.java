package com.withSchool.controller.user;

import com.withSchool.dto.subject.ReqQuestionPostModifyDTO;
import com.withSchool.dto.subject.ReqQuestionPostQuestionerPostDTO;
import com.withSchool.dto.subject.ResSubjectQuestionPostDefaultDTO;
import com.withSchool.service.subject.SubjectQuestionPostService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@EnableAutoConfiguration
@RequestMapping("/subjects/questions")
public class SubjectQuestionPostController {
    private final SubjectQuestionPostService subjectQuestionPostService;

    @PostMapping
    @Operation(summary = "과목별 질문 저장")
    public ResponseEntity<ResSubjectQuestionPostDefaultDTO> saveQuestion(@RequestBody ReqQuestionPostQuestionerPostDTO request) {
        return ResponseEntity.ok()
                .body(subjectQuestionPostService.save(request));
    }

    @GetMapping
    @Operation(summary = "과목별 질문 리스트 조회")
    public ResponseEntity<List<ResSubjectQuestionPostDefaultDTO>> showQuestions(@RequestParam("subjectId") Long subjectId) {
        return ResponseEntity.ok()
                .body(subjectQuestionPostService.findAllBySubject(subjectId));
    }

    @GetMapping("/{question-id}")
    @Operation(summary = "과목별 질문 단건 조회")
    public ResponseEntity<ResSubjectQuestionPostDefaultDTO> showOneQuestion(@PathVariable("question-id") Long questionPostId) {
        return ResponseEntity.ok()
                .body(subjectQuestionPostService.findById(questionPostId));
    }

    @PatchMapping("/{question-id}")
    @Operation(summary = "과목별 질문 단건 수정(학생, 교사)")
    public ResponseEntity<ResSubjectQuestionPostDefaultDTO> modifyOneQuestion(@PathVariable("question-id") Long questionPostId, @RequestBody ReqQuestionPostModifyDTO request) {

        return ResponseEntity.ok()
                .body(subjectQuestionPostService.updateQuestion(questionPostId, request));
    }

    @DeleteMapping("/{question-id}")
    @Operation(summary = "과목별 질문 단건 삭제")
    public ResponseEntity<String> deleteOneQuestion(@PathVariable("question-id") Long questionPostId) {
        subjectQuestionPostService.deleteById(questionPostId);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_TYPE, MediaType.TEXT_PLAIN_VALUE + ";charset=" + StandardCharsets.UTF_8)
                .body("삭제 완료");
    }
}
