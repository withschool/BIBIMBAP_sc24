package com.withSchool.entity.classes;

import com.withSchool.entity.school.SchoolInformation;
import com.withSchool.entity.base.BaseEntity;
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
@Table(name = "class_information")
public class ClassInformation extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "class_id", unique = true, nullable = false)
    @Comment("반 PK")
    private Long classId;

    @Column(name = "year")
    @Comment("반이 생성된 연도")
    private int year;

    @Column(name = "grade")
    @Comment("반이 속하는 학년")
    private int grade;

    @Column(name = "in_class")
    @Comment("반 번호")
    private int inClass;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "school_id")
    @Comment("반이 속하는 학교")
    private SchoolInformation schoolInformation;
}
