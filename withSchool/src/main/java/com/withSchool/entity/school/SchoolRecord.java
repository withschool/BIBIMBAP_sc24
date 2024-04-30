package com.withSchool.entity.school;

import com.withSchool.entity.user.User;
import com.withSchool.entity.base.BasePostEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.Comment;

@Entity
@Getter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "school_record")
public class SchoolRecord extends BasePostEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "school_record_id", nullable = false, unique = true)
    @Comment("생활기록부 PK")
    private Long schoolRecordId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @Comment("생활기록부 주인 학생 PK")
    private User user;
}
