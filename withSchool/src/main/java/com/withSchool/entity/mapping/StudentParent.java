package com.withSchool.entity.mapping;

import com.withSchool.dto.mapping.ResStudentParentDefaultDTO;
import com.withSchool.dto.user.ResUserMappingParentDTO;
import com.withSchool.entity.base.BaseEntity;
import com.withSchool.entity.school.SchoolInformation;
import com.withSchool.entity.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.Comment;

import java.util.Optional;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Table(name = "student_parent")
public class StudentParent extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "student_parent_id", nullable = false, unique = true)
    @Comment("학생부모 매핑 PK")
    private Long studentParentId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    @Comment("학생 PK")
    private User student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id", nullable = false)
    @Comment("부모 PK")
    private User parent;

    public ResStudentParentDefaultDTO toResStudentParentDefaultDTO() {
        User user = this.getStudent();
        SchoolInformation schoolInformation = user.getSchoolInformation();

        String schoolName = Optional.ofNullable(schoolInformation)
                .map(SchoolInformation::getSchulNm)
                .orElse(null);

        return ResStudentParentDefaultDTO.builder()
                .studentParentId(this.getStudentParentId())
                .regDate(this.getRegDate())
                .user(ResUserMappingParentDTO.builder()
                        .userId(user.getUserId())
                        .name(user.getName())
                        .birthdate(user.getBirthDate())
                        .schoolName(schoolName)
                        .userName(user.getUsername())
                        .build())
                .build();
    }
}
