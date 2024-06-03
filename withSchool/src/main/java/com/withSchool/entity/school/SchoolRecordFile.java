package com.withSchool.entity.school;

import com.withSchool.entity.base.BaseFileEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.Comment;

@Entity
@Getter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "school_record_file")
public class SchoolRecordFile extends BaseFileEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "school_record_file_id", nullable = false, unique = true)
    @Comment("생활기록부 파일 PK")
    private Long schoolRecordFileId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "school_record_id", nullable = false)
    @Comment("생활기록부 PK")
    private SchoolRecord schoolRecord;
}
