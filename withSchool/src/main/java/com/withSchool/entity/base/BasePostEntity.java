package com.withSchool.entity.base;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Comment;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Setter
@Getter
@MappedSuperclass
public class BasePostEntity extends BaseEntity {
    @Column(name = "title", nullable = false)
    @Comment("제목")
    private String title;

    @Column(name = "content", columnDefinition = "TEXT")
    @Comment("본문")
    private String content;

}
