package com.withSchool.repository.user;

import com.withSchool.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findById(String Id);

    Optional<User> findById(Long id);

    Optional<User> findByName(String name);

    Optional<User> findByEmail(String email);

    Optional<User> findByUserCode(String userCode);

    boolean existsById(String id);

    boolean existsByPhoneNumber(String phoneNumber);

    // 학교 모델 지우기 전에 관련 모든 유저 정보 삭제
    @Modifying
    @Query("delete from User u where u.schoolInformation.schoolId = :id")
    void deleteAllUsersBySchoolId(Long id);

    // 어드민이 유저 삭제
    @Modifying
    void deleteUserByUserId(Long userId);

    Optional<User> findBySchoolInformationSchoolIdAndNameAndUserCode(Long schoolId, String name, String userCode);

    List<User> findAllBySchoolInformation_SchoolId(Long schoolId);

    List<User> findAllBySchoolInformation_SchoolIdAndAccountTypeNot(Long schoolId, int accountType);

    List<User> findAllByClassInformation_ClassId(Long classId);

    @Query("SELECT u FROM User u WHERE u.schoolInformation.schoolId = :schoolId AND u.accountType = 0")
    List<User> findStudentBySchoolInformationSchoolId(Long schoolId);

    @Query("SELECT u FROM User u WHERE u.classInformation.classId = :classId AND u.accountType = 0")
    List<User> findStudentByClassId(Long classId);

    List<User> findByClassInformation_ClassIdAndAccountType(Long classId, int accountType);
}