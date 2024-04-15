package com.withSchool.repository;

import com.withSchool.entity.SchoolInformation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SchoolInformationRepository extends JpaRepository<SchoolInformation, Long> {

    Optional<SchoolInformation> findByAtptOfcdcScCodeAndSdSchulCode(String atptOfcdcScCode, String sdSchulCode);
}
