package com.withSchool.repository.community;

import com.withSchool.entity.community.Counsel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CounselRepository extends JpaRepository<Counsel, Long> {
    List<Counsel> findAllByAnswerer_UserId(Long userId);
}
