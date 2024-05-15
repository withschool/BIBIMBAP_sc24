package com.withSchool.entity.subject;

import com.withSchool.entity.user.User;
import com.withSchool.entity.base.BasePostEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Comment;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SubjectNotice extends BasePostEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Comment("과목 공지 PK")
    private Long subjectNoticeId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    @Comment("과목 공지 작성자 PK")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="subject_id")
    @Comment("과목 PK")
    private Subject subject;

}
