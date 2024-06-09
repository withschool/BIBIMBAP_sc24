package com.withSchool.entity.base;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.Comment;
@SuperBuilder
@Getter
@MappedSuperclass
@AllArgsConstructor
@NoArgsConstructor
@Data
public class BasePostEntity extends BaseEntity {
    @Column(name = "title", nullable = false)
    @Comment("제목")
    protected String title;

    @Column(name = "content", columnDefinition = "TEXT")
    @Comment("본문")
    protected String content;
}
