package com.withSchool.service.community;

import com.withSchool.dto.community.*;
import com.withSchool.entity.community.Community;
import com.withSchool.entity.community.Post;
import com.withSchool.entity.community.Reply;
import com.withSchool.entity.mapping.PostLike;
import com.withSchool.entity.mapping.ReplyLike;
import com.withSchool.entity.school.SchoolInformation;
import com.withSchool.entity.user.User;
import com.withSchool.repository.community.CommunityPostRepository;
import com.withSchool.repository.community.CommunityReplyRepository;
import com.withSchool.repository.community.CommunityRepository;
import com.withSchool.repository.mapping.PostLikeRepository;
import com.withSchool.repository.mapping.ReplyLikeRepository;
import com.withSchool.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommunityService {

    private final UserService userService;
    private final CommunityRepository communityRepository;
    private final CommunityPostRepository communityPostRepository;
    private final PostLikeRepository postLikeRepository;
    private final ReplyLikeRepository replyLikeRepository;
    private final CommunityReplyRepository communityReplyRepository;

    public void createCommunity(ReqCommunityDTO dto) {
        SchoolInformation schoolInformation = userService.getCurrentUserSchoolInformation(null);
        Community community = Community.builder()
                .communityName(dto.getCommunityName())
                .category(dto.getCategory())
                .schoolInformation(schoolInformation)
                .build();
        communityRepository.save(community);
    }
    public List<PageResponseDTO> getCommunityList(PageRequestDTO dto) {
        SchoolInformation schoolInformation = userService.getCurrentUserSchoolInformation(null);
        Pageable pageable = dto.getPageable(Sort.by("communityId").descending());
       Page<Community> communities = communityRepository.getList(schoolInformation.getSchoolId(),pageable);
       List<PageResponseDTO> dtoList = new ArrayList<>();
       for(Community c : communities){
           PageResponseDTO pageResponseDTO = PageResponseDTO.builder()
                   .communityId(c.getCommunityId())
                   .category(c.getCategory())
                   .communityName(c.getCommunityName())
                   .build();
           dtoList.add(pageResponseDTO);
       }
        return dtoList;
    }

    public void createPost(ReqCommunityPostDTO dto) {

        User user = userService.getCurrentUser();
        Optional<Community> community = communityRepository.findById(dto.getCommunityId());
        if(community.isPresent()){
            Post post = Post.builder()
                    .title(dto.getTitle())
                    .content(dto.getContent())
                    .likeCount(0)
                    .user(user)
                    .community(community.get())
                    .build();
            communityPostRepository.save(post);
        }
        else{
            throw new RuntimeException("no community");
        }

    }

    public void updatePost(ReqCommunityPostDTO dto, Long postId) {
        User user = userService.getCurrentUser();

        Post post = communityPostRepository.findByIdAndUser(postId, user)
                .orElseThrow(() -> new RuntimeException("only author can update"));
        post.updatePost(dto.getTitle(), dto.getContent());
        communityPostRepository.save(post);
    }

    @Transactional
    public void deletePost(Long postId) {
        User user = userService.getCurrentUser();

        Post post = communityPostRepository.findByIdAndUser(postId, user)
                .orElseThrow(() -> new RuntimeException("only author can delete"));

        List<Long> replyIds = communityReplyRepository.findIdsByPostId(postId);

        replyLikeRepository.deleteByReplyIds(replyIds);
        communityReplyRepository.deleteByPostId(postId);
        postLikeRepository.deleteByPostId(postId);
        communityPostRepository.delete(post);
    }

    public ResCommunityPostListDTO getPostList(PageRequestDTO dto, Long id) {
        Pageable pageable = dto.getPageable(Sort.by("postId").descending());
        Page<Post> posts = communityPostRepository.getList(id,pageable);
        List<ResCommunityPostDTO> dtoList = new ArrayList<>();
        for(Post p : posts){
            int replyCount = communityReplyRepository.countReply(p.getPostId());
            ResCommunityPostDTO resCommunityPostDTO = ResCommunityPostDTO.builder()
                    .userId(p.getUser().getUserId())
                    .postId(p.getPostId())
                    .title(p.getTitle())
                    .content(p.getContent())
                    .likeCount(p.getLikeCount())
                    .replyCount(replyCount)
                    .regDate(p.getRegDate())
                    .modDate(p.getModDate())
                    .build();
            dtoList.add(resCommunityPostDTO);
        }
        return ResCommunityPostListDTO.builder()
                .postList(dtoList)
                .totalPosts(posts.getTotalElements())
                .build();
    }

    public ResCommunityPostDTO getPost(Long postId) {
        Post post = communityPostRepository.findById(postId)
                .orElseThrow(()->new RuntimeException("post is not exist"));

        int replyCount = communityReplyRepository.countReply(postId);

        return ResCommunityPostDTO.builder()
                .userId(post.getUser().getUserId())
                .postId(post.getPostId())
                .title(post.getTitle())
                .content(post.getContent())
                .likeCount(post.getLikeCount())
                .replyCount(replyCount)
                .regDate(post.getRegDate())
                .modDate(post.getModDate())
                .build();
    }

    public ResCommunityPostListDTO getPostListBySearch(PageRequestDTO dto, String keyword) {
        Pageable pageable = dto.getPageable(Sort.by("postId").descending());
        Page<Post> posts = communityPostRepository.findByKeyword(keyword,pageable);
        List<ResCommunityPostDTO> dtoList = new ArrayList<>();
        for(Post p : posts){
            int replyCount = communityReplyRepository.countReply(p.getPostId());
            ResCommunityPostDTO resCommunityPostDTO = ResCommunityPostDTO.builder()
                    .userId(p.getUser().getUserId())
                    .postId(p.getPostId())
                    .title(p.getTitle())
                    .content(p.getContent())
                    .likeCount(p.getLikeCount())
                    .replyCount(replyCount)
                    .regDate(p.getRegDate())
                    .modDate(p.getModDate())
                    .build();
            dtoList.add(resCommunityPostDTO);
        }
        return ResCommunityPostListDTO.builder()
                .postList(dtoList)
                .totalPosts(posts.getTotalElements())
                .build();
    }
    @Transactional
    public void togglePostLike(Long postId){
        User user = userService.getCurrentUser();
        Post post = communityPostRepository.findById(postId)
                .orElseThrow(()->new RuntimeException("there's no post"));
        Optional<PostLike> postLike = postLikeRepository.findByPostIdAndUserId(postId,user.getUserId());
        if(postLike.isPresent()){
            post.updateLike(false);
            postLikeRepository.delete(postLike.get());
        }
        else{
            post.updateLike(true);
            postLikeRepository.save(PostLike.builder()
                    .post(post)
                    .user(user)
                    .build());
        }

    }

    public void createComment(ReqCommunityReplyDTO reqCommunityReplyDTO, Long postId) {
        User user = userService.getCurrentUser();
        Post post = communityPostRepository.findById(postId)
                .orElseThrow(()->new RuntimeException("no Post"));

        Reply reply = Reply.builder()
                .content(reqCommunityReplyDTO.getContent())
                .likeCount(0)
                .post(post)
                .user(user)
                .build();
        communityReplyRepository.save(reply);
    }

    public List<ResCommunityReplyDTO> getReplyList(Long postId) {
        List<ResCommunityReplyDTO> result = new ArrayList<>();
        List<Reply> replyList = communityReplyRepository.findAllByPostId(postId);
        for(Reply r : replyList){
            result.add(ResCommunityReplyDTO.builder()
                    .replyId(r.getReplyId())
                    .userId(r.getUser().getUserId())
                    .content(r.getContent())
                    .like(r.getLikeCount())
                    .reqDate(r.getRegDate())
                    .modDate(r.getModDate())
                    .build());
        }
        return result;
    }

    public void updateReply(ReqCommunityReplyDTO dto,Long replyId) {
        User user = userService.getCurrentUser();
        Reply reply = communityReplyRepository.findByUserIdAndReplyId(user.getUserId(), replyId).
                orElseThrow(() -> new RuntimeException("only writer can update"));

        reply.updateReply(dto.getContent());
        communityReplyRepository.save(reply);
    }
    @Transactional
    public void deleteReply(Long replyId){
        User user = userService.getCurrentUser();
        Reply reply = communityReplyRepository.findByUserIdAndReplyId(user.getUserId(),replyId)
                .orElseThrow(()->new RuntimeException("only writer can delete"));
        replyLikeRepository.deleteByReplyId(replyId);
        communityReplyRepository.delete(reply);
    }

    public void toggleReplyLike(Long replyId) {
        User user = userService.getCurrentUser();
        Reply reply = communityReplyRepository.findById(replyId)
                .orElseThrow(()->new RuntimeException("there's no reply"));
        Optional<ReplyLike> replyLike = replyLikeRepository.findByReplyIdAndUserId(replyId,user.getUserId());
        if(replyLike.isPresent()){
            reply.updateLike(false);
            replyLikeRepository.delete(replyLike.get());
        }
        else{
            reply.updateLike(true);
            replyLikeRepository.save(ReplyLike.builder()
                    .reply(reply)
                    .user(user)
                    .build());
        }
    }
}
