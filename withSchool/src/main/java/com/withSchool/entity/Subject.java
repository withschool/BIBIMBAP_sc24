package com.withSchool.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Comment;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "subject")
public class Subject extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "subject_id", unique = true, nullable = false)
    @Comment("과목 PK")
    private Long subjectId;

    @Column(name = "subject_name")
    @Comment("과목 이름")
    private String subjectName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "school_id")
    @Comment("학교 PK")
    private SchoolInformation schoolInformation;
}
