package com.withSchool.entity.mapping;

import com.withSchool.dto.mapping.ResStudentSubjectDefaultDTO;
import com.withSchool.entity.base.BaseEntity;
import com.withSchool.entity.subject.Subject;
import com.withSchool.entity.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.Comment;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Table(name = "student_subject")
public class StudentSubject extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "student_subject_id", unique = true, nullable = false)
    @Comment("학생 수업 매핑 PK")
    private Long studentSubjectId;

    @Column(name = "midterm_score")
    @ColumnDefault("-1")
    @Comment("중간고사 성적")
    private int midtermScore;

    @Column(name = "final_score")
    @ColumnDefault("-1")
    @Comment("기말고사 성적")
    private int finalScore;

    @Column(name = "activity_score")
    @ColumnDefault("-1")
    @Comment("수행평가 성적")
    private int activityScore;

    @Column(name = "total_score")
    @ColumnDefault("-1")
    @Comment("총점")
    private int totalScore;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @Comment("학생 PK")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subject_id")
    @Comment("과목 PK")
    private Subject subject;

    public ResStudentSubjectDefaultDTO toUserScoreDTO(){
        return ResStudentSubjectDefaultDTO.builder()
                .studentSubjectId(this.getStudentSubjectId())
                .userId(this.getUser().getUserId())
                .userName(this.getUser().getName())
                .subjectId(this.getSubject().getSubjectId())
                .activityScore(this.getActivityScore())
                .midtermScore(this.getMidtermScore())
                .finalScore(this.getFinalScore())
                .totalScore(this.getTotalScore())
                .build();
    }

}
