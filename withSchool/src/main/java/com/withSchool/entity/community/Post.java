package com.withSchool.entity.community;

import com.withSchool.entity.base.BasePostEntity;
import com.withSchool.entity.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.Comment;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Table(name = "post")
public class Post extends BasePostEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id", unique = true, nullable = false)
    @Comment("게시글ID")
    private Long postId;

    @Column(name = "like_count", nullable = false, columnDefinition = "int default 0")
    @Comment("좋아요 수")
    private int likeCount;

    @Column(name = "hashtag")
    @Comment("해쉬태그")
    private String hashtag;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "community_id")
    @Comment("커뮤니티ID")
    private Community community;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @Comment("사용자ID")
    private User user;

    public void updatePost(String title, String content){
        this.title = title;
        this.content = content;
    }

    public void updateLike(boolean state){
        if(state){
            this.likeCount++;
        }
        else{
            this.likeCount--;
        }
    }
}
