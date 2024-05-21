package com.withSchool.entity.mapping;

import com.withSchool.dto.mapping.ResTeacherSubjectDefaultDTO;
import com.withSchool.entity.base.BaseEntity;
import com.withSchool.entity.subject.Subject;
import com.withSchool.entity.user.User;
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
@Table(name = "teacher_subject")
public class TeacherSubject extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "teacher_subject_id", unique = true, nullable = false)
    @Comment("교사 수업 매핑 PK")
    private Long teacherSubjectId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @Comment("교사 PK")
    private User teacher;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subject_id")
    @Comment("과목 PK")
    private Subject subject;

    public ResTeacherSubjectDefaultDTO toResTeacherSubjectDefaultDTO(){
        return ResTeacherSubjectDefaultDTO.builder()
                .teacherSubjectId(this.getTeacherSubjectId())
                .teacher(this.getTeacher().toResUserDefaultDTO())
                .subject(this.getSubject().toSubjectInfoDTO())
                .regDate(this.getRegDate())
                .build();
    }
}
