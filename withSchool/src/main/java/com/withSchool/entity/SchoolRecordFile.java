package com.withSchool.entity;
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
@Table(name = "school_record_file")
public class SchoolRecordFile extends BaseFileEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "school_record_file", unique = true, nullable = false)
    @Comment("생활기록부파일ID")
    private Long schoolRecordFileId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "school_record_id")
    @Comment("생활기록부ID")
    private SchoolRecord schoolRecord;
}
