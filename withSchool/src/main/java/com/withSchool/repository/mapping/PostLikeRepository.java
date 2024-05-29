package com.withSchool.repository.mapping;

import com.withSchool.entity.mapping.PostLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface PostLikeRepository extends JpaRepository<PostLike,Long> {
    @Query("SELECT p FROM PostLike p WHERE p.post.postId=:postId AND p.user.userId=:userId")
    Optional<PostLike> findByPostIdAndUserId(@Param("postId") Long postId, @Param("userId") Long userId);

    @Modifying
    @Transactional
    @Query("DELETE FROM PostLike p WHERE p.post.postId=:postId")
    void deleteByPostId(@Param("postId") Long postId);

}
