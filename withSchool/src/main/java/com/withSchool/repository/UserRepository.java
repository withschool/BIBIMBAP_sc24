package com.withSchool.repository;

import com.withSchool.entity.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findById(String Id);
    Optional<User> findByName(String name);
    Optional<User> findByEmail(String email);


    @Modifying
    @Query("delete from User u where u.schoolInformation.schoolId = :id")
    void deleteAllUsersBySchoolId(Long id);
}