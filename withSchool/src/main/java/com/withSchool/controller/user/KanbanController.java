package com.withSchool.controller.user;

import com.withSchool.dto.user.*;
import com.withSchool.service.user.ProjectService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@EnableAutoConfiguration
@RequestMapping("/kanban")
public class KanbanController {

    private final ProjectService projectService;

    @PostMapping("")
    @Operation(summary = "프로젝트 1개 생성")
    public ResponseEntity<Void> postProject(@RequestBody ReqProjectDTO reqProjectDTO){
        projectService.postProject(reqProjectDTO);
        return ResponseEntity.ok().build();
    }
    @GetMapping("")
    @Operation(summary = "프로젝트 리스트와 태스크들 조회하기")
    public ResponseEntity<List<ResProjectDTO>> getProjectList(){
        return ResponseEntity.ok().body(projectService.getList());
    }
    @PatchMapping("")
    @Operation(summary = "프로젝트 수정하기")
    public ResponseEntity<Void> updateProject(@RequestBody ReqUpdateProjectDTO reqUpdateProjectDTO){
        projectService.updateProject(reqUpdateProjectDTO);
        return ResponseEntity.ok().build();
    }
    @DeleteMapping("/{project-id}")
    @Operation(summary = "프로젝트를 삭제합니다")
    public ResponseEntity<Void> deleteProject(@PathVariable("project-id")Long projectId){
        projectService.deleteProject(projectId);
        return ResponseEntity.ok().build();
    }
    @PostMapping("/task")
    @Operation(summary = "프로젝트에 태스크 추가하기")
    public ResponseEntity<Void> postTask(@ModelAttribute ReqProjectTaskDTO reqProjectTaskDTO){
        projectService.postTask(reqProjectTaskDTO);
        return ResponseEntity.ok().build();
    }
    @PatchMapping("/task")
    @Operation(summary = "태스크 수정하기")
    public ResponseEntity<Void> updateTask(@ModelAttribute ReqUpdateProjectTaskDTO reqUpdateProjectTaskDTO){
        projectService.updatePost(reqUpdateProjectTaskDTO);
        return ResponseEntity.ok().build();
    }
    @DeleteMapping("/task/{task-id}")
    @Operation(summary = "태스크 삭제하기")
    public ResponseEntity<Void> deleteTask(@PathVariable("task-id")Long taskId){
        projectService.deleteTask(taskId);
        return ResponseEntity.ok().build();
    }
}
