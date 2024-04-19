package com.withSchool.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Comment;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Homework extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
    private Subject subject;

}
