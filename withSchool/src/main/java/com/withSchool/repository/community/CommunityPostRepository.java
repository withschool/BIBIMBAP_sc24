package com.withSchool.repository.community;

import com.withSchool.entity.community.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommunityPostRepository extends JpaRepository<Post,Long> {
}
