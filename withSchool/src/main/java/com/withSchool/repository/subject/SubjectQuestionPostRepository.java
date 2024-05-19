package com.withSchool.repository.subject;

import com.withSchool.entity.subject.SubjectQuestionPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubjectQuestionPostRepository extends JpaRepository<SubjectQuestionPost, Long> {
    List<SubjectQuestionPost> findAllByQuestionerId_UserId(Long userId);

    List<SubjectQuestionPost> findAllBySubject_SubjectId(Long subjectId);
}
