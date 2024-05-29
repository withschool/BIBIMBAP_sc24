package com.withSchool.repository.community;

import com.withSchool.entity.community.Reply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface CommunityReplyRepository extends JpaRepository<Reply,Long> {

    @Query("SELECT r FROM Reply r WHERE r.post.postId = :postId")
    List<Reply> findAllByPostId(@Param("postId")Long postId);

    @Query("SELECT r FROM Reply r WHERE r.user.userId=:userId AND r.replyId=:replyId")
    Optional<Reply> findByUserIdAndReplyId(@Param("userId")Long userId, @Param("replyId")Long replyId);

    @Query("SELECT COUNT(r) FROM Reply r WHERE r.post.postId =:postId")
    int countReply(@Param("postId")Long postId);

    @Modifying
    @Transactional
    @Query("DELETE FROM Reply r WHERE r.post.postId=:postId")
    void deleteByPostId(@Param("postId")Long postId);

    @Query("SELECT r.replyId FROM Reply r WHERE r.post.postId = :postId")
    List<Long> findIdsByPostId(Long postId);
}
