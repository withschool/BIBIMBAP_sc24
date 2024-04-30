package com.withSchool.entity.subject;

import com.withSchool.entity.base.BaseFileEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.Comment;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class SubjectNoticeFile extends BaseFileEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Comment("과목 공지 파일 PK")
    private Long subjectNoticeFileId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subject_notice_id")
    @Comment("과목 공지 PK")
    private SubjectNotice subjectNotice;
}
