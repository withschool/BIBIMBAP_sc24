package com.withSchool.controller.user;

import com.withSchool.service.subject.SubjectLectureNoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/lecture-notes")
@RequiredArgsConstructor
public class LectureNoteController {

    private final SubjectLectureNoteService subjectLectureNoteService;

    @GetMapping
    public ResponseEntity<List<LectureNoteDTO>> getAllLectureNotes() {
        List<LectureNoteDTO> lectureNotes = subjectLectureNoteService.getAllLectureNotes();
        return new ResponseEntity<>(lectureNotes, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LectureNoteDTO> getLectureNoteById(@PathVariable Long id) {
        return new ResponseEntity<>(subjectLectureNoteService.getLectureNoteById(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<LectureNoteDTO> createLectureNote(@RequestBody LectureNoteDTO lectureNoteDTO) {
        LectureNoteDTO createdLectureNote = subjectLectureNoteService.createLectureNote(lectureNoteDTO);
        return new ResponseEntity<>(createdLectureNote, HttpStatus.CREATED);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<LectureNoteDTO> updateLectureNote(@PathVariable Long id, @RequestBody LectureNoteDTO newLectureNoteDTO) {
        LectureNoteDTO updatedLectureNote = subjectLectureNoteService.updateLectureNote(id, newLectureNoteDTO);
        return new ResponseEntity<>(updatedLectureNote, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLectureNote(@PathVariable Long id) {
        subjectLectureNoteService.deleteLectureNote(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}