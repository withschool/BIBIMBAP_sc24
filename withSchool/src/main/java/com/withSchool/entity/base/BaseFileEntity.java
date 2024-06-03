package com.withSchool.entity.base;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.Comment;

@SuperBuilder
@Getter
@Setter
@MappedSuperclass
@AllArgsConstructor
@NoArgsConstructor
public class BaseFileEntity extends BaseEntity {
    @Column(name = "saved_name", nullable = false)
    @Comment("저장 파일 이름")
    private String savedName;

    @Column(name = "file_url", nullable = false)
    @Comment("파일 URI")
    private String fileUrl;

    @Column(name = "orignal_name", nullable = false)
    @Comment("원본 파일 이름")
    private String originalName;


}
