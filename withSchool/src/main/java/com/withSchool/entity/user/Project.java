package com.withSchool.entity.user;

import com.withSchool.entity.base.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.Comment;

@Entity
@Data
@NoArgsConstructor
@Table(name = "project")
@SuperBuilder
@AllArgsConstructor
@ToString
public class Project extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Comment("프로젝트id")
    private Long projectId;

    private String title;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
}
