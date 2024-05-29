package com.withSchool.repository.community;

import com.withSchool.entity.community.Community;
import com.withSchool.entity.community.Post;
import com.withSchool.entity.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface CommunityPostRepository extends JpaRepository<Post,Long> {


    @Query("SELECT p FROM Post p WHERE p.user = :user AND p.postId = :postId")
    Optional<Post> findByIdAndUser(@Param("postId")Long postId, @Param("user")User user);

    @Query("SELECT p FROM Post p WHERE p.community.communityId = :id")
    Page<Post> getList(@Param("id") Long id, Pageable pageable);

    @Query("SELECT p FROM Post p WHERE p.title LIKE %:keyword% OR p.content LIKE %:keyword%")
    Page<Post> findByKeyword(String keyword, Pageable pageable);

}
