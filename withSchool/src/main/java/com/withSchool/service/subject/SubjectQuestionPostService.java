package com.withSchool.service.subject;

import com.withSchool.dto.subject.ReqQuestionPostModifyDTO;
import com.withSchool.dto.subject.ReqQuestionPostQuestionerPostDTO;
import com.withSchool.dto.subject.ResSubjectQuestionPostDefaultDTO;
import com.withSchool.dto.user.ResUserDefaultDTO;
import com.withSchool.entity.subject.SubjectQuestionPost;
import com.withSchool.entity.subject.Subject;
import com.withSchool.repository.subject.SubjectQuestionPostRepository;
import com.withSchool.repository.subject.SubjectRepository;
import com.withSchool.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;



@Service
@RequiredArgsConstructor
@Transactional
public class SubjectQuestionPostService {
    private final SubjectQuestionPostRepository subjectQuestionPostRepository;
    private final UserService userService;
    private final SubjectRepository subjectRepository;

    public ResSubjectQuestionPostDefaultDTO save(ReqQuestionPostQuestionerPostDTO reqQuestionPostQuestionerPostDTO) {
        Optional<Subject> response = subjectRepository.findById(reqQuestionPostQuestionerPostDTO.getSubjectId());
        if(response.isEmpty()) return null;

        Subject subject = response.get();

        SubjectQuestionPost subjectQuestionPost = SubjectQuestionPost.builder()
                .questionerId(userService.getCurrentUser())
                .subject(subject)
                .questionContent(reqQuestionPostQuestionerPostDTO.getQuestionContent())
                .isAnswered(0)
                .build();

        return entityToResDTO(subjectQuestionPostRepository.save(subjectQuestionPost));
    }

    public List<ResSubjectQuestionPostDefaultDTO> findAllBySubject(Long subjectId) {
        List<SubjectQuestionPost> subjectQuestionPosts = subjectQuestionPostRepository.findAllBySubject_SubjectId(subjectId);
        List<ResSubjectQuestionPostDefaultDTO> response = new ArrayList<>();

        for(SubjectQuestionPost q: subjectQuestionPosts){
            response.add(entityToResDTO(q));
        }
        return response;
    }

    public ResSubjectQuestionPostDefaultDTO findById(Long questionPostId) {
        Optional<SubjectQuestionPost> optionalQuestionPost = subjectQuestionPostRepository.findById(questionPostId);
        if(optionalQuestionPost.isEmpty())return null;
        SubjectQuestionPost subjectQuestionPost = optionalQuestionPost.get();


        return entityToResDTO(subjectQuestionPost);

    }

    public List<ResSubjectQuestionPostDefaultDTO> findAllByQuestionerId_UserId(Long userId) {
        List<SubjectQuestionPost> subjectQuestionPosts = subjectQuestionPostRepository.findAllByQuestionerId_UserId(userId);
        List<ResSubjectQuestionPostDefaultDTO> response = new ArrayList<>();

        for(SubjectQuestionPost q: subjectQuestionPosts){
            response.add(entityToResDTO(q));
        }
        return response;
    }

    public ResSubjectQuestionPostDefaultDTO entityToResDTO(SubjectQuestionPost subjectQuestionPost) {
        ResUserDefaultDTO answerer = Optional.ofNullable(subjectQuestionPost.getAnswererId())
                .map(answererId -> new ResUserDefaultDTO(
                        answererId.getUserId(),
                        answererId.getName(),
                        answererId.getId()
                ))
                .orElse(null);

        return ResSubjectQuestionPostDefaultDTO.builder()
                .subjectQuestionPostId(subjectQuestionPost.getSubjectQuestionPostId())
                .questionContent(subjectQuestionPost.getQuestionContent())
                .answerContent(subjectQuestionPost.getAnswerContent())
                .isAnswered(subjectQuestionPost.getIsAnswered())
                .subjectId(subjectQuestionPost.getSubject().getSubjectId())
                .questioner(ResUserDefaultDTO.builder()
                        .name(subjectQuestionPost.getQuestionerId().getName())
                        .userId(subjectQuestionPost.getQuestionerId().getUserId())
                        .userName(subjectQuestionPost.getQuestionerId().getId())
                        .build())
                .answerer(answerer)
                .build();
    }

    public ResSubjectQuestionPostDefaultDTO updateByStudent(ReqQuestionPostModifyDTO reqQuestionPostModifyDTO) {
        ResSubjectQuestionPostDefaultDTO questionPost = findById(reqQuestionPostModifyDTO.getQuestionPostId());
        if(questionPost.getIsAnswered() == 1){
            throw new RuntimeException("해당 질문은 답변이 완료되었기 때문에 수정할 수 없습니다.");
        }

        return entityToResDTO(subjectQuestionPostRepository.save(SubjectQuestionPost.builder()
                .subjectQuestionPostId(reqQuestionPostModifyDTO.getQuestionPostId())
                .questionContent(reqQuestionPostModifyDTO.getQuestionContent())
                .answerContent(questionPost.getAnswerContent())
                .questionerId(userService.findById(questionPost.getQuestioner().getUserName()))
                .answererId(null)
                .isAnswered(0)
                .subject(subjectRepository.findById(questionPost.getSubjectId()).get())
                .build()));
    }

    public void deleteById(Long questionPostId) {
        subjectQuestionPostRepository.deleteById(questionPostId);
    }
}
