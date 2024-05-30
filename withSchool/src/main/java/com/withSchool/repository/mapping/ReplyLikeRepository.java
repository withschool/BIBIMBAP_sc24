package com.withSchool.repository.mapping;

import com.withSchool.entity.mapping.ReplyLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface ReplyLikeRepository extends JpaRepository<ReplyLike,Long> {

    @Query("SELECT r FROM ReplyLike r WHERE r.reply.replyId=:replyId AND r.user.userId=:userId")
    Optional<ReplyLike> findByReplyIdAndUserId(Long replyId, Long userId);
    @Modifying
    @Transactional
    @Query("DELETE FROM ReplyLike r WHERE r.reply.replyId=:replyId")
    void deleteByReplyId(@Param("replyId") Long replyId);

    @Modifying
    @Query("DELETE FROM ReplyLike r WHERE r.reply.replyId IN :replyIds")
    void deleteByReplyIds(List<Long> replyIds);

}
