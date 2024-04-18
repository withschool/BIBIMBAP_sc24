package com.withSchool.repository;

import com.withSchool.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findById(String Id);

    Optional<User> findByName(String name);

    Optional<User> findByEmail(String email);

}