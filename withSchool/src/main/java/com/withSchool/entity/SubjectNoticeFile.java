package com.withSchool.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SubjectNoticeFile extends BaseFileEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long subjectNoticeId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subject_notice_id")
    private SubjectNotice subjectNotice;
}
