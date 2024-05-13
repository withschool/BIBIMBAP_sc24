package com.withSchool.service.subject;

import com.withSchool.dto.subject.LectureNoteDTO;
import com.withSchool.entity.school.SchoolInformation;
import com.withSchool.entity.subject.LectureNote;
import com.withSchool.entity.subject.Subject;
import com.withSchool.entity.user.User;
import com.withSchool.repository.mapping.StudentSubjectRepository;
import com.withSchool.repository.subject.LectureNoteRepository;
import com.withSchool.repository.subject.SubjectRepository;
import com.withSchool.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.security.core.context.SecurityContextHolder;


import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class LectureNoteService {

    private final LectureNoteRepository lectureNoteRepository;
    private final SubjectRepository subjectRepository;
    private final UserService userService;
    private final StudentSubjectRepository studentSubjectRepository;
    public List<LectureNoteDTO> getAllLectureNotes() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userService.findById(authentication.getName());
        if (user == null) return null;
        else if (user.getAccountType() == 0 || user.getAccountType() == 2) {// 학생, 교사
            return getAllLectureNotesfromStudent(user);
        }
        else if (user.getAccountType() == 1) {// 학부모
            return null; // 개발 예정
        }
        else if (user.getAccountType() == 3) {// 어드민
            return getAllLectureNotesfromSchool(user);
        }
        else if (user.getAccountType() == 4) {// 슈퍼 어드민
            return lectureNoteRepository.findAll().stream()
                    .map(this::mapToLectureNoteDTO)
                    .collect(Collectors.toList());
        }
        else return null;
    }

    public List<LectureNoteDTO> getAllLectureNotesfromStudent(User user) {
        List<Subject> subjectList = studentSubjectRepository.findSubjectsByUser(user);
        return getAllLectureNotesfromSubjectList(subjectList);
    }

    public List<LectureNoteDTO> getAllLectureNotesfromSubjectList(List<Subject> subjectList)
    {
        List<LectureNoteDTO> allLectureNotes = new ArrayList<>();
        for (Subject subject : subjectList) {
            List<LectureNote> lectureNotes = lectureNoteRepository.findBySubject(subject).orElseThrow(NoSuchElementException::new);
            for (LectureNote lectureNote : lectureNotes) {
                allLectureNotes.add(mapToLectureNoteDTO(lectureNote));
            }
        }
        return allLectureNotes;
    }
    public List<LectureNoteDTO>getAllLectureNotesfromSchool(User user)
    {
        SchoolInformation schoolInformation = user.getSchoolInformation();
        List<Subject> subjectList = subjectRepository.findBySchool(schoolInformation);
        return getAllLectureNotesfromSubjectList(subjectList);
    }

    public Optional<LectureNoteDTO> getLectureNoteById(Long id) {
        return lectureNoteRepository.findById(id)
                .map(this::mapToLectureNoteDTO);
    }

    public LectureNoteDTO createLectureNote(LectureNoteDTO lectureNoteDTO) {
        Optional<Subject> optionalSubject = subjectRepository.findById(lectureNoteDTO.getSubjectId());
        if (optionalSubject.isPresent()) {
            LectureNote lectureNote = LectureNote.builder()
                    .title(lectureNoteDTO.getTitle())
                    .subject(optionalSubject.get())
                    .build();
            LectureNote savedLectureNote = lectureNoteRepository.save(lectureNote);
            return mapToLectureNoteDTO(savedLectureNote);
        } else {
            throw new IllegalArgumentException("Subject not found");
        }
    }

    public LectureNoteDTO updateLectureNote(Long id, LectureNoteDTO newLectureNoteDTO) {
        LectureNote existingLectureNote = lectureNoteRepository.findById(id)
                .orElseThrow(NoSuchElementException::new);
        existingLectureNote.setTitle(newLectureNoteDTO.getTitle());
        Optional<Subject> optionalSubject = subjectRepository.findById(newLectureNoteDTO.getSubjectId());
        if (optionalSubject.isPresent()) {
            existingLectureNote.setSubject(optionalSubject.get());
        } else {
            throw new IllegalArgumentException("Subject not found");
        }
        LectureNote updatedLectureNote = lectureNoteRepository.save(existingLectureNote);
        return mapToLectureNoteDTO(updatedLectureNote);
    }

    public void deleteLectureNote(Long id) {
        LectureNote lectureNote = lectureNoteRepository.findById(id)
                .orElseThrow(NoSuchElementException::new);
        lectureNoteRepository.delete(lectureNote);
    }

    private LectureNoteDTO mapToLectureNoteDTO(LectureNote lectureNote) {
        return LectureNoteDTO.builder()
                .lectureNoteId(lectureNote.getLectureNoteId())
                .title(lectureNote.getTitle())
                .subjectId(lectureNote.getSubject().getSubjectId())
                .subjectName(lectureNote.getSubject().getSubjectName())
                .regDate(String.valueOf(lectureNote.getRegDate()))
                .build();
    }
}

