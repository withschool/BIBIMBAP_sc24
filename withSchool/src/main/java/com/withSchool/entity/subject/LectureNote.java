package com.withSchool.entity.subject;

import com.withSchool.entity.base.BaseEntity;
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
public class LectureNote extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Comment("강의노트 PK")
    private Long lectureNoteId;

    @Column(nullable = false)
    @Comment("강의노트제목")
    private String title;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subject_id")
    @Comment("과목 PK")
    private Subject subject;
}
