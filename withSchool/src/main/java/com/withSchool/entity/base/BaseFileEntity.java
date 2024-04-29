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
