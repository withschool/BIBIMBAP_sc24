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
public class HomeworkSubmit extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long homeworkSubmitId;

    @Column
    @Comment("과제 제출 내용")
    private String submitContent;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "homework_id")
    private Homework homework;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

}
