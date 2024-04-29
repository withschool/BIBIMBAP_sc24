package com.withSchool.entity.subject;

import com.withSchool.entity.base.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.Comment;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class Homework extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Comment("과제 PK")
    private Long homeworkId;

    @Column(nullable = false)
    @Comment("과제제목")
    private String homeworkTitle;

    @Column
    @Comment("과제내용")
    private String homeworkContent;

    @Column
    @Comment("과제기한")
    private LocalDateTime homeworkDue;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="subject_id")
    @Comment("과목 PK")
    private Subject subject;

}
