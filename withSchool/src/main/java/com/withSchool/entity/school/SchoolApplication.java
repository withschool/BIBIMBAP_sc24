package com.withSchool.entity.school;

import com.withSchool.dto.school.ResApplicationDefaultDTO;
import com.withSchool.entity.base.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.Comment;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@ToString
public class SchoolApplication extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long schoolApplicationId;

    @Comment("학교명")
    private String schoolName;

    @Column(length = 13)
    @Comment("학교 전화번호 000-0000-0000")
    private String schoolPhoneNumber;

    @Comment("학교 담당자 이름")
    private String schoolAdminName;

    @Comment("학교 담당자 이메일")
    private String schoolAdminEmail;

    @Comment("""
            진행상태
            
            0 - 신청
            1 - 처리 중
            2 - 처리 완료
            """)
    private int state;

    public ResApplicationDefaultDTO toResApplicationDefaultDTO(){
        return ResApplicationDefaultDTO.builder()
                .schoolApplicationId(this.schoolApplicationId)
                .schoolName(this.getSchoolName())
                .schoolAdminName(this.getSchoolAdminName())
                .schoolAdminEmail(this.getSchoolAdminEmail())
                .schoolPhoneNumber(this.getSchoolPhoneNumber())
                .state(this.getState())
                .build();
    }

}
