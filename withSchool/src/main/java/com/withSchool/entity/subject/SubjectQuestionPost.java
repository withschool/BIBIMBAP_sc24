package com.withSchool.entity.subject;

import com.withSchool.entity.user.User;
import com.withSchool.entity.base.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.Comment;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class SubjectQuestionPost extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Comment("질문게시판 PK")
    private Long subjectQuestionPostId;

    @Column(nullable = false, columnDefinition = "TEXT")
    @Comment("질문 내용")
    private String questionContent;

    @Column(columnDefinition = "TEXT")
    @Comment("답변 내용")
    private String answerContent;

    @Column(nullable = false)
    @Comment("답변 상태")
    private int isAnswered;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subject_id")
    @Comment("과목 PK")
    private Subject subject;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="questioner_id")
    @Comment("질문자 PK")
    private User questionerId;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="answerer_id")
    @Comment("답변자 PK")
    private User answererId;


}