package com.withSchool.repository.file;

import com.withSchool.entity.community.PostFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface CommunityPostFileRepository extends JpaRepository<PostFile,Long> {
    @Transactional
    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("DELETE FROM PostFile p WHERE p.post.postId = : postId")
    void deleteAllByPostFileId(Long postId);
}
