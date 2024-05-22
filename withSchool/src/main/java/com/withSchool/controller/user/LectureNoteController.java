package com.withSchool.controller.user;

import com.withSchool.dto.subject.ReqSubjectLectureNoteDTO;
import com.withSchool.dto.subject.ResSubjectLectureNoteDTO;
import com.withSchool.service.subject.SubjectLectureNoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/subject/lecture-notes")
@RequiredArgsConstructor
public class LectureNoteController {

    private final SubjectLectureNoteService subjectLectureNoteService;

    @GetMapping
    public ResponseEntity<List<ResSubjectLectureNoteDTO>> getAllLectureNotes() {
        List<ResSubjectLectureNoteDTO> lectureNotes = subjectLectureNoteService.getAllSubjectLectureNotes();
        return new ResponseEntity<>(lectureNotes, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResSubjectLectureNoteDTO> getLectureNoteById(@PathVariable Long id) {
        return new ResponseEntity<>(subjectLectureNoteService.getSubjectLectureNoteById(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ResSubjectLectureNoteDTO> createLectureNote(@ModelAttribute ReqSubjectLectureNoteDTO reqSubjectLectureNoteDTO) {
        ResSubjectLectureNoteDTO createdLectureNote = subjectLectureNoteService.createSubjectLectureNote(reqSubjectLectureNoteDTO);
        return new ResponseEntity<>(createdLectureNote, HttpStatus.CREATED);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ResSubjectLectureNoteDTO> updateLectureNote(@PathVariable Long id, @ModelAttribute ReqSubjectLectureNoteDTO reqSubjectLectureNoteDTO) {
        ResSubjectLectureNoteDTO updatedLectureNote = subjectLectureNoteService.updateLectureNote(id, reqSubjectLectureNoteDTO);
        return new ResponseEntity<>(updatedLectureNote, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLectureNote(@PathVariable Long id) {
        subjectLectureNoteService.deleteLectureNote(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
