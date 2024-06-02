package com.withSchool.repository.user;

import com.withSchool.entity.user.UserImgFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface UserImgFileRepository extends JpaRepository<UserImgFile,Long> {
    @Query("SELECT uif FROM UserImgFile uif WHERE uif.user.userId = :userId")
    Optional<UserImgFile> findByUserId(@Param("userId")Long userId);

    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("DELETE FROM UserImgFile uif WHERE uif.user.userId = :userId")
    void deleteByUserId(Long userId);
}
