package com.withSchool.entity.community;

import com.withSchool.entity.base.BaseEntity;
import com.withSchool.entity.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Comment;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "counsel")
public class Counsel extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "counsel_id", unique = true, nullable = false)
    @Comment("상담 PK")
    private Long counselId;

    @Column(name = "counsel_state", nullable = false)
    @Comment("상담 상태")
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
    private User akser;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "answerer_id", nullable = false)
    @Comment("상담 응답자")
    private User answerer;


}
