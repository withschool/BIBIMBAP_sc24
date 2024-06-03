package com.withSchool.entity.user;

import com.withSchool.entity.base.BaseFileEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@NoArgsConstructor
@Table(name = "user_img_file")
@SuperBuilder
@AllArgsConstructor
@ToString
public class UserImgFile extends BaseFileEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userImgId;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
}
