package com.withSchool.repository.file;

import com.withSchool.entity.community.PostFile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommunityPostFileRepository extends JpaRepository<PostFile,Long> {
}
