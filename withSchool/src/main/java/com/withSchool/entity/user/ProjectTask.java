package com.withSchool.entity.user;

import com.withSchool.entity.base.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@Table(name = "project_task")
@SuperBuilder
@AllArgsConstructor
@ToString
public class ProjectTask extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long taskId;

    private String title;
    private String description;
    private String tags;
    private LocalDateTime date;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="project_id")
    private Project project;

}
