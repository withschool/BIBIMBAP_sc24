package com.withSchool.entity.classes;

import com.withSchool.entity.user.User;
import com.withSchool.entity.base.BasePostEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Comment;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "class_notice")
public class ClassNotice extends BasePostEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "class_notice_id", nullable = false, unique = true)
    @Comment("반 공지 PK")
    private Long classNoticeId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "class_id", nullable = false)
    @Comment("반 PK")
    private ClassInformation classInformation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "teacher_id", nullable = false)
    @Comment("반 공지 작성 선생님 PK")
    private User teacher;
}
