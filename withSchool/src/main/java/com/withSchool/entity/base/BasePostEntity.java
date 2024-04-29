package com.withSchool.entity.base;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.Comment;
@SuperBuilder
@Getter
@MappedSuperclass
@AllArgsConstructor
@NoArgsConstructor
public class BasePostEntity extends BaseEntity {
    @Column(name = "title", nullable = false)
    @Comment("제목")
    private String title;

    @Column(name = "content", columnDefinition = "TEXT")
    @Comment("본문")
    private String content;

}
