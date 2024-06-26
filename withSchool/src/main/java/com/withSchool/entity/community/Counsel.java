package com.withSchool.entity.community;

import com.withSchool.dto.community.ResCounselDefaultDTO;
import com.withSchool.entity.base.BaseEntity;
import com.withSchool.entity.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.Comment;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Table(name = "counsel")
public class Counsel extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "counsel_id", unique = true, nullable = false)
    @Comment("상담 PK")
    private Long counselId;

    @Column(name = "counsel_state", nullable = false)
    @ColumnDefault("0")
    @Comment("""
            상담상태
            
            0 - 신청
            1 - 승낙
            2 - 반려
            3 - 완료
            """)
    private int counselState;

    @Column(name = "category", nullable = false)
    @Comment("상담 분야")
    private String category;

    @Column(name = "schedule", nullable = false)
    @Comment("상담 일정")
    private LocalDateTime schedule;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "asker_id", nullable = false)
    @Comment("상담 요청자")
    private User asker;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "answerer_id", nullable = false)
    @Comment("상담 응답자")
    private User answerer;

    public ResCounselDefaultDTO toResCounselDefaultDTO(){
        return ResCounselDefaultDTO.builder()
                .counselId(this.getCounselId())
                .askerId(this.getAsker().getUserId())
                .answererId(this.getAnswerer().getUserId())
                .counselState(this.getCounselState())
                .category(this.getCategory())
                .schedule(this.getSchedule())
                .regDate(this.getRegDate())
                .build();
    }

}
