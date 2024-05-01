package com.withSchool.entity.subject;

import com.withSchool.entity.base.BaseEntity;
import com.withSchool.entity.school.SchoolInformation;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.Comment;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
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

    @Column(name = "year" ,length = 4)
    @Comment("과목 해당 연도")
    private String year;

    @Column(name = "grade")
    @Comment("과목 대상 학년")
    private String grade;

    @Column(name = "semester")
    @Comment("과목 대상 학기 ")
    private String semester;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "school_id")
    @Comment("학교 PK")
    private SchoolInformation schoolInformation;
}
