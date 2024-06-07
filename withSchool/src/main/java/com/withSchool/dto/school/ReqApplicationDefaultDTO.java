package com.withSchool.dto.school;

import com.withSchool.entity.school.SchoolApplication;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.ToString;

@Builder
@Getter
@Data
@ToString
public class ReqApplicationDefaultDTO {
    private String schoolName;
    private String schoolPhoneNumber;
    private String schoolAdminName;
    private String schoolAdminEmail;
    private int serviceType;
    private String SD_SCHUL_CODE;

    public SchoolApplication toEntity(int state){
        return SchoolApplication.builder()
                .schoolAdminName(this.getSchoolAdminName())
                .schoolAdminEmail(this.getSchoolAdminEmail())
                .schoolName(this.getSchoolName())
                .schoolPhoneNumber(this.getSchoolPhoneNumber())
                .state(state)
                .serviceType(this.getServiceType())
                .SD_SCHUL_CODE(this.getSD_SCHUL_CODE())
                .build();
    }

}
