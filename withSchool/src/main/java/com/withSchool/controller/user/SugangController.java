package com.withSchool.controller.user;

import com.withSchool.dto.mapping.ReqStudentSubjectScoreDTO;
import com.withSchool.dto.mapping.ResStudentSubjectDefaultDTO;
import com.withSchool.dto.mapping.StudentSubjectDTO;
import com.withSchool.service.mapping.StudentSubjectService;
import com.withSchool.service.user.UserService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/sugangs")
public class SugangController {
    private final StudentSubjectService studentSubjectService;
    private final UserService userService;

    // TODO: 2024. 4. 17 수강신청 API 구현하기 - ㅇㄱㅁ
    //  파라미터 정의부터 리턴타입도 다 정해야함
    @PostMapping
    @Operation(summary = "수강신청 인데 잠정 보류")
    public ResponseEntity<String> enrolment() {
        return null;
    }

    @GetMapping
    @Operation(summary = "학생 본인의 수강 리스트 확인")
    public ResponseEntity<List<StudentSubjectDTO>> findOnesSugang(@RequestParam(required = false) Long childId) {
        return ResponseEntity.ok()
                .body(studentSubjectService.findOnesSugang(childId));
    }

    @GetMapping("/{subjectId}")
    @Operation(summary = "성적 업로드를 위해 모든 학생을 리스트업 하는 API")
    public ResponseEntity<List<ResStudentSubjectDefaultDTO>> findStudentsScore(@PathVariable Long subjectId) {
        return ResponseEntity.ok().body(studentSubjectService.findStudentsScore(subjectId));
    }

    @GetMapping("/{subjectId}/scores")
    @Operation(summary = "학생 개인의 성적을 확인하는 데 쓰이는 API")
    public ResponseEntity<ResStudentSubjectDefaultDTO> findOnesScore(@PathVariable Long subjectId, @RequestParam(required = false) Long childId) {
        return ResponseEntity.ok().body(studentSubjectService.findOnesScore(subjectId, childId));
    }

    @PatchMapping("/scores")
    @Operation(summary = "학생의 성적을 대량으로 넣는 API", description = "중간고사는 mid, 기말고사는 final, 수행평가는 activity")
    public ResponseEntity<String> uploadScore(@RequestBody ReqStudentSubjectScoreDTO request){
        studentSubjectService.updateScore(request);

        return ResponseEntity.ok().body("upload Success");
    }
}
