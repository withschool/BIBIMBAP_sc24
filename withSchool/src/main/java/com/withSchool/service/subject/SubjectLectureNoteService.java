package com.withSchool.service.subject;

import com.withSchool.dto.file.FileDTO;
import com.withSchool.dto.file.FileDeleteDTO;
import com.withSchool.dto.subject.ReqSubjectLectureNoteDTO;
import com.withSchool.dto.subject.ResSubjectLectureNoteDTO;
import com.withSchool.dto.user.ResUserDefaultDTO;
import com.withSchool.entity.subject.SubjectLectureNote;
import com.withSchool.entity.subject.Subject;
import com.withSchool.entity.user.User;
import com.withSchool.entity.subject.SubjectLectureNoteFile;
import com.withSchool.repository.mapping.StudentSubjectRepository;
import com.withSchool.repository.subject.SubjectLectureNoteRepository;
import com.withSchool.repository.subject.SubjectRepository;
import com.withSchool.repository.file.SubjectLectureNoteFileRepository;
import com.withSchool.service.file.FileService;
import com.withSchool.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SubjectLectureNoteService {

    private final SubjectLectureNoteRepository subjectLectureNoteRepository;
    private final SubjectLectureNoteFileRepository subjectLectureNoteFileRepository;
    private final SubjectRepository subjectRepository;
    private final FileService fileService;
    private final UserService userService;
    private final StudentSubjectRepository studentSubjectRepository;

    @Transactional
    public List<ResSubjectLectureNoteDTO> getAllSubjectLectureNotes() {
        User user = userService.getCurrentUser();
        List<Subject> subjectList = studentSubjectRepository.findSubjectsByUser(user);
        List<ResSubjectLectureNoteDTO> allSubjectLectureNotes = new ArrayList<>();

        for (Subject subject : subjectList) {
            List<SubjectLectureNote> subjectLectureNotes = subjectLectureNoteRepository.findBySubject(subject).orElseThrow(NoSuchElementException::new);
            for (SubjectLectureNote subjectLectureNote : subjectLectureNotes) {
                allSubjectLectureNotes.add(mapToSubjectLectureNoteDTO(subjectLectureNote));
            }
        }
        return allSubjectLectureNotes;
    }

    @Transactional
    public ResSubjectLectureNoteDTO getSubjectLectureNoteById(Long id) {
        SubjectLectureNote subjectLectureNote = subjectLectureNoteRepository.findById(id).orElseThrow(NoSuchElementException::new);
        return mapToSubjectLectureNoteDTO(subjectLectureNote);
    }

    @Transactional
    public ResSubjectLectureNoteDTO createSubjectLectureNote(ReqSubjectLectureNoteDTO reqSubjectLectureNoteDTO) {
        Optional<Subject> optionalSubject = subjectRepository.findById(reqSubjectLectureNoteDTO.getSubjectId());
        if (optionalSubject.isPresent()) {
            SubjectLectureNote subjectLectureNote = SubjectLectureNote.builder()
                    .title(reqSubjectLectureNoteDTO.getTitle())
                    .subject(optionalSubject.get())
                    .build();
            SubjectLectureNote savedSubjectLectureNote = subjectLectureNoteRepository.save(subjectLectureNote);

            // Save files to S3 and update database
            saveFiles(reqSubjectLectureNoteDTO.getFile(), savedSubjectLectureNote.getSubjectLectureNoteId());

            return mapToSubjectLectureNoteDTO(savedSubjectLectureNote);
        } else {
            throw new IllegalArgumentException("Subject not found");
        }
    }

    @Transactional
    public ResSubjectLectureNoteDTO updateLectureNote(Long id, ReqSubjectLectureNoteDTO reqSubjectLectureNoteDTO) {
        SubjectLectureNote existingSubjectLectureNote = subjectLectureNoteRepository.findById(id)
                .orElseThrow(NoSuchElementException::new);

        Optional<Subject> optionalSubject = subjectRepository.findById(reqSubjectLectureNoteDTO.getSubjectId());
        if (optionalSubject.isPresent()) {
            Subject subject = optionalSubject.get();

            SubjectLectureNote updatedSubjectLectureNote = SubjectLectureNote.builder()
                    .subjectLectureNoteId(existingSubjectLectureNote.getSubjectLectureNoteId())
                    .title(reqSubjectLectureNoteDTO.getTitle())
                    .subject(subject)
                    .regDate(existingSubjectLectureNote.getRegDate())
                    .build();

            subjectLectureNoteRepository.save(updatedSubjectLectureNote);

            // Delete old files and save new ones
            deleteFilesByLectureNoteId(id);
            saveFiles(reqSubjectLectureNoteDTO.getFile(), id);

            return mapToSubjectLectureNoteDTO(updatedSubjectLectureNote);
        } else {
            throw new IllegalArgumentException("Subject not found");
        }
    }

    @Transactional
    public void deleteLectureNote(Long id) {
        SubjectLectureNote subjectLectureNote = subjectLectureNoteRepository.findById(id)
                .orElseThrow(NoSuchElementException::new);

        deleteFilesByLectureNoteId(id);
        subjectLectureNoteRepository.delete(subjectLectureNote);
    }

    private ResSubjectLectureNoteDTO mapToSubjectLectureNoteDTO(SubjectLectureNote subjectLectureNote) {
        ResUserDefaultDTO userDTO = ResUserDefaultDTO.builder()
                .userName(subjectLectureNote.getUser().getId())
                .name(subjectLectureNote.getUser().getName())
                .userId(subjectLectureNote.getUser().getUserId())
                .build();

        List<SubjectLectureNoteFile> files = subjectLectureNoteFileRepository.findBySubjectLectureNoteId(subjectLectureNote.getSubjectLectureNoteId()).orElse(new ArrayList<>());
        List<String> fileUrls = new ArrayList<>();
        List<String> originalNames = new ArrayList<>();
        for (SubjectLectureNoteFile file : files) {
            fileUrls.add(file.getFileUrl());
            originalNames.add(file.getOriginalName());
        }

        return ResSubjectLectureNoteDTO.builder()
                .subjectLectureNoteId(subjectLectureNote.getSubjectLectureNoteId())
                .title(subjectLectureNote.getTitle())
                .user(userDTO)
                .regDate(subjectLectureNote.getRegDate())
                .filesURl(fileUrls)
                .originalName(originalNames)
                .build();
    }

    private void saveFiles(List<MultipartFile> files, Long lectureNoteId) {
        for (MultipartFile file : files) {
            if (!file.isEmpty()) {
                FileDTO fileDTO = FileDTO.builder()
                        .file(file)
                        .repoType("subjectLectureNote")
                        .masterId(lectureNoteId)
                        .build();
                fileService.saveFile(fileDTO);
            }
        }
    }

    private void deleteFilesByLectureNoteId(Long lectureNoteId) {
        Optional<List<SubjectLectureNoteFile>> files = subjectLectureNoteFileRepository.findBySubjectLectureNoteId(lectureNoteId);
        if (files.isPresent()) {
            for (SubjectLectureNoteFile file : files.get()) {
                FileDeleteDTO fileDeleteDTO = FileDeleteDTO.builder()
                        .originalName(file.getOriginalName())
                        .repoType("subjectLectureNote")
                        .masterId(lectureNoteId)
                        .build();
                fileService.deleteFile(fileDeleteDTO);
            }
        }
    }
}
