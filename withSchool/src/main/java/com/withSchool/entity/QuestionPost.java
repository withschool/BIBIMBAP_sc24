package com.withSchool.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Comment;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuestionPost extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long qid;

    @Column(nullable = false)
    @Comment("질문 내용")
    private String questionContent;
    @Column
    @Comment("답변 내용")
    private String answerContent;
    @Column(nullable = false)
    @Comment("답변 상태")
    private int isAnswered;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subject_id")
    private Subject subject;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="questioner_id")
    private User questionerId;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="answerer_id")
    private User answererId;


}
