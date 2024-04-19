package com.withSchool.entity.classes;

import com.withSchool.entity.base.BaseFileEntity;
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
@Table(name = "class_notice_file")
public class ClassNoticeFile extends BaseFileEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "class_notice_file_id", nullable = false, unique = true)
    @Comment("반 공지 파일 PK")
    private Long classNoticeFileId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "class_notice_id", nullable = false)
    @Comment("반 공지 PK")
    private ClassNotice classNotice;
}
