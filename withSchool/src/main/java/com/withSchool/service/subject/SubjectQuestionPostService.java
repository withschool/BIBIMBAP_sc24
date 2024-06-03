package com.withSchool.service.subject;

import com.withSchool.dto.subject.ReqQuestionPostModifyDTO;
import com.withSchool.dto.subject.ReqQuestionPostQuestionerPostDTO;
import com.withSchool.dto.subject.ResSubjectQuestionPostDefaultDTO;
import com.withSchool.dto.user.ResUserDefaultDTO;
import com.withSchool.entity.subject.SubjectQuestionPost;
import com.withSchool.entity.subject.Subject;
import com.withSchool.entity.user.User;
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

    public void deleteById(Long questionPostId) {
        subjectQuestionPostRepository.deleteById(questionPostId);
    }

    public ResSubjectQuestionPostDefaultDTO updateQuestion(Long questionPostId, ReqQuestionPostModifyDTO request) {
        int accountType = userService.getCurrentUser().getAccountType();

        ResSubjectQuestionPostDefaultDTO questionPost = findById(questionPostId);

        int isAnswered;
        String questionContent;
        String answerContent;
        User questionerId;
        User answererId;

        if(accountType == 0){
            questionContent = request.getQuestionContent();
            answerContent = null;
            questionerId = userService.getCurrentUser();
            answererId = null;
            isAnswered = 0;
        }
        else if(accountType == 2){
            questionContent = questionPost.getQuestionContent();
            answerContent = request.getAnswerContent();
            questionerId = userService.findByUserId(questionPost.getQuestioner().getUserId());
            answererId = userService.getCurrentUser();
            isAnswered = 1;
        } else throw new RuntimeException("no student or teacher");

        if(questionPost.getIsAnswered() == 1){
            throw new RuntimeException("해당 질문은 답변이 완료되었기 때문에 수정할 수 없습니다.");
        }

        return entityToResDTO(subjectQuestionPostRepository.save(SubjectQuestionPost.builder()
                .subjectQuestionPostId(questionPostId)
                .questionContent(questionContent)
                .answerContent(answerContent)
                .questionerId(questionerId)
                .answererId(answererId)
                .isAnswered(isAnswered)
                .subject(subjectRepository.findById(questionPost.getSubjectId()).get())
                .build()));
    }

}
