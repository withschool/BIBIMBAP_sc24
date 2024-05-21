package com.withSchool.entity.mapping;

import com.withSchool.entity.base.BaseEntity;
import com.withSchool.entity.user.User;
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
}
