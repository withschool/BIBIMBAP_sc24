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

    public SchoolApplication toEntity(int state){
        return SchoolApplication.builder()
                .schoolAdminName(this.getSchoolAdminName())
                .schoolAdminEmail(this.getSchoolAdminEmail())
                .schoolName(this.getSchoolName())
                .schoolPhoneNumber(this.getSchoolPhoneNumber())
                .state(state)
                .build();
    }
}
