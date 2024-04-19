package com.withSchool.entity;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Comment;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@EntityListeners(AuditingEntityListener.class)
@Setter
@Getter
@MappedSuperclass
public class BaseFileEntity extends BaseEntity {
    @Column(name = "orignal_name", nullable = false)
    @Comment("원본 파일 이름")
    private String originalName;

    @Column(name = "save_name", nullable = false)
    @Comment("서버에 저장된 파일 이름")
    private String saveName;

    @Column(name = "file_url", nullable = false)
    @Comment("서버에 저장된 파일 주소")
    private String fileUrl;
}
