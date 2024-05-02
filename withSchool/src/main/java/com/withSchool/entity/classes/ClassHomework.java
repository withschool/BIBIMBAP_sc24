package com.withSchool.entity.classes;

import com.withSchool.entity.base.BasePostEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.Comment;

import java.time.LocalDateTime;

@Getter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "class_homework")
public class ClassHomework extends BasePostEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "class_homework_id", unique = true, nullable = false)
    @Comment("반 과제 PK")
    private Long classHomeworkId;

    @Column(name = "homework_due")
    @Comment("반 과제 마감일")
    private LocalDateTime homeworkDue;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "class_id", nullable = false)
    @Comment("반 PK")
    private ClassInformation classInformation;
}
