package com.withSchool.repository.community;

import com.withSchool.entity.community.Community;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;


public interface CommunityRepository extends JpaRepository<Community,Long> {
    @Query("SELECT c FROM Community c WHERE c.schoolInformation.schoolId = :schoolId")
    Page<Community> getList(@Param("schoolId")Long schoolId,Pageable pageable);

}