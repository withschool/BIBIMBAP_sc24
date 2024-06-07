package com.withSchool.entity.school;

import com.withSchool.dto.school.ReqApplicationDefaultDTO;
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

    @Comment("""
            서비스 타입
                        
            0 ~ 2(월간)
            0 - 소규모(300명)
            1 - 중규모(500명)
            2 - 대규모(700명)
                        
            3 ~ 5(연간)
            3 - 소규모
            4 - 중규모
            5 - 대규모
            """)
    @Column(columnDefinition = "int default 0")
    private int serviceType;

    @Comment("학교 코드")
    private String SD_SCHUL_CODE;

    public ResApplicationDefaultDTO toResApplicationDefaultDTO(){
        return ResApplicationDefaultDTO.builder()
                .schoolApplicationId(this.schoolApplicationId)
                .schoolName(this.getSchoolName())
                .schoolAdminName(this.getSchoolAdminName())
                .schoolAdminEmail(this.getSchoolAdminEmail())
                .schoolPhoneNumber(this.getSchoolPhoneNumber())
                .state(this.getState())
                .serviceType(this.getServiceType())
                .SD_SCHUL_CODE(this.getSD_SCHUL_CODE())
                .build();
    }

    public ReqApplicationDefaultDTO toReqApplicationDefaultDTO(){
        return ReqApplicationDefaultDTO.builder()
                .schoolName(this.getSchoolName())
                .schoolAdminName(this.getSchoolAdminName())
                .schoolAdminEmail(this.getSchoolAdminEmail())
                .schoolPhoneNumber(this.getSchoolPhoneNumber())
                .serviceType(this.getServiceType())
                .SD_SCHUL_CODE(this.getSD_SCHUL_CODE())
                .build();
    }
}
