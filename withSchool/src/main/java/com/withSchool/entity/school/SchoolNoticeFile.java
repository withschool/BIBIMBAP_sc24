package com.withSchool.entity.school;
import com.withSchool.entity.base.BaseFileEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.Comment;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Table(name = "school_notice_file")
public class SchoolNoticeFile extends BaseFileEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "school_notice_file_id", unique = true, nullable = false)
    @Comment("학교공지파일ID")
    private Long schoolNoticeFileId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "school_notice_id")
    @Comment("학교공지ID")
    private SchoolNotice schoolNotice;

}
