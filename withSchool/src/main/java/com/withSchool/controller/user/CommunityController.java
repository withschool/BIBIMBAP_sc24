package com.withSchool.controller.user;

import com.withSchool.dto.community.*;
import com.withSchool.service.community.CommunityService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/community")
public class CommunityController {

    private final CommunityService communityService;

    @PostMapping("")
    @Operation(summary = "커뮤니티 만들기")
    public ResponseEntity<Void> createCommunity(@RequestBody ReqCommunityDTO reqCommunityDTO) {
        communityService.createCommunity(reqCommunityDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
    @GetMapping("")
    @Operation(summary = "커뮤니티 목록 조회")
    public ResponseEntity<List<PageResponseDTO>> getCommunityList(@ModelAttribute PageRequestDTO dto){
        return ResponseEntity.ok().body(communityService.getCommunityList(dto));
    }
    // 커뮤니티 수정, 삭제는 나중에
    @PostMapping("/post")
    @Operation(summary = "커뮤니티에 게시글 올리기")
    public ResponseEntity<Void> createPost(@RequestBody ReqCommunityPostDTO reqCommunityPostDTO){
        communityService.createPost(reqCommunityPostDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
    @PatchMapping("/post/{post-id}")
    @Operation(summary = "커뮤니티 게시글 수정하기")
    public ResponseEntity<Void> updatePost(@RequestBody ReqCommunityPostDTO reqCommunityPostDTO, @PathVariable("post-id") Long postId){
        communityService.updatePost(reqCommunityPostDTO,postId);
        return ResponseEntity.ok().build();
    }
    @DeleteMapping("/post/{post-id}")
    @Operation(summary = "커뮤니티 게시글 삭제하기")
    public ResponseEntity<Void> deletePost(@PathVariable("post-id") Long postId){
        communityService.deletePost(postId);
        return ResponseEntity.ok().build();
    }
    @GetMapping("/{community-id}/post")
    @Operation(summary = "커뮤니티 게시글 목록 조회")
    public ResponseEntity<ResCommunityPostListDTO> getPostList(@ModelAttribute PageRequestDTO dto,@PathVariable("community-id")Long id){
        ResCommunityPostListDTO resCommunityPostListDTO = communityService.getPostList(dto,id);
        return ResponseEntity.ok(resCommunityPostListDTO);
    }
    @GetMapping("/post/{post-id}")
    @Operation(summary = "커뮤니티 게시글 하나 조회")
    public ResponseEntity<ResCommunityPostDTO> getPost(@PathVariable("post-id") Long postId){
        ResCommunityPostDTO post = communityService.getPost(postId);
        return ResponseEntity.ok(post);
    }

    @GetMapping("/post/search")
    @Operation(summary="키워드 검색을 통한 게시글 목록 조회")
    public ResponseEntity<ResCommunityPostListDTO> getPostListBySearch(@ModelAttribute PageRequestDTO dto, @RequestParam String keyword){
        ResCommunityPostListDTO resCommunityPostListDTO = communityService.getPostListBySearch(dto, keyword);
        return ResponseEntity.ok(resCommunityPostListDTO);
    }

    @PatchMapping("/post/{post-id}/like")
    @Operation(summary = "커뮤니티 게시글 좋아요 처리")
    public ResponseEntity<Void> togglePostLike(@PathVariable("post-id") Long postId){
        communityService.togglePostLike(postId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/post/{post-id}/reply")
    @Operation(summary="특정 게시물에 댓글을 달 수 있다")
    public ResponseEntity<Void> createComment(@RequestBody ReqCommunityReplyDTO reqCommunityReplyDTO,@PathVariable("post-id") Long postId){
        communityService.createComment(reqCommunityReplyDTO,postId);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
    @GetMapping("/post/{post-id}/reply")
    @Operation(summary="특정 게시물에 댓글 목록을 확인할 수 있다")
    public ResponseEntity<List<ResCommunityReplyDTO>> getCommentList(@PathVariable("post-id") Long postId){
        return ResponseEntity.ok().body(communityService.getReplyList(postId));
    }
    @PatchMapping("/post/reply/{reply-id}")
    @Operation(summary="자신의 댓글을 수정할 수 있다")
    public ResponseEntity<Void> updateComment(@RequestBody ReqCommunityReplyDTO dto,@PathVariable("reply-id") Long replyId){
        communityService.updateReply(dto,replyId);
        return ResponseEntity.ok().build();
    }
    @DeleteMapping("/post/reply/{reply-id}")
    @Operation(summary="자신의 댓글을 삭제할 수 있다")
    public ResponseEntity<Void> deleteComment(@PathVariable("reply-id")Long replyId){
        communityService.deleteReply(replyId);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/post/reply/{reply-id}/like")
    @Operation(summary = "커뮤니티 댓글 좋아요 처리")
    public ResponseEntity<Void> toggleReplyLike(@PathVariable("reply-id") Long replyId){
        communityService.toggleReplyLike(replyId);
        return ResponseEntity.ok().build();
    }

}