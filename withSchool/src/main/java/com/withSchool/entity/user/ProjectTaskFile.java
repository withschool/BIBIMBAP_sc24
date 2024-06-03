package com.withSchool.entity.user;

import com.withSchool.entity.base.BaseFileEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Entity
@Data
@NoArgsConstructor
@Table(name = "project_task_file")
@SuperBuilder
@AllArgsConstructor
@ToString
public class ProjectTaskFile extends BaseFileEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long taskFileId;

    @ManyToOne
    @JoinColumn(name = "task_id")
    private ProjectTask projectTask;
}
