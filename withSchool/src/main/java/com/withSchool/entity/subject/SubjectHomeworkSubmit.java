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
public class SubjectHomeworkSubmit extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Comment("과제 제출 PK")
    private Long subjectHomeworkSubmitId;

    @Column
    @Comment("과제 제출 내용")
    private String subjectSubmitContent;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "homework_id")
    @Comment("과제 PK")
    private SubjectHomework subjectHomework;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @Comment("과제 제출한 학생 PK")
    private User user;

}
