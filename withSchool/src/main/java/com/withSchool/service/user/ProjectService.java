package com.withSchool.service.user;

import com.withSchool.dto.file.FileDTO;
import com.withSchool.dto.file.FileDeleteDTO;
import com.withSchool.dto.user.*;
import com.withSchool.entity.user.Project;
import com.withSchool.entity.user.ProjectTask;
import com.withSchool.entity.user.ProjectTaskFile;
import com.withSchool.entity.user.User;
import com.withSchool.repository.user.ProjectRepository;
import com.withSchool.repository.user.ProjectTaskFileRepository;
import com.withSchool.repository.user.ProjectTaskRepository;
import com.withSchool.service.file.FileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProjectService {
    private final UserService userService;
    private final FileService fileService;
    private final ProjectRepository projectRepository;
    private final ProjectTaskRepository projectTaskRepository;
    private final ProjectTaskFileRepository projectTaskFileRepository;

    public void postProject(ReqProjectDTO reqProjectDTO) {
        User user = userService.getCurrentUser();
        Project project = Project.builder()
                .title(reqProjectDTO.getTitle())
                .user(user)
                .build();
        projectRepository.save(project);
    }

    public List<ResProjectDTO> getList(){
        User user = userService.getCurrentUser();
        List<Project> projectList = projectRepository.findByUserId(user.getUserId());
        List<ResProjectDTO> resProjectDTOList = new ArrayList<>();

        for (Project p : projectList) {
            List<ProjectTask> projectTaskList = projectTaskRepository.findByProjectId(p.getProjectId());
            List<ResProjectTaskDTO> projectTaskDTOList = new ArrayList<>();

            for (ProjectTask pt : projectTaskList) {
                List<ProjectTaskFile> projectTaskFileList = projectTaskFileRepository.findByTaskId(pt.getTaskId());
                List<String> imgList = new ArrayList<>();

                for (ProjectTaskFile ptf : projectTaskFileList) {
                    imgList.add(ptf.getFileUrl());
                }

                ResProjectTaskDTO resProjectTaskDTO = ResProjectTaskDTO.builder()
                        .projectId(pt.getProject().getProjectId())
                        .taskId(pt.getTaskId())
                        .title(pt.getTitle())
                        .description(pt.getDescription())
                        .url(imgList)  // 파일
                        .date(pt.getDate())
                        .tags(pt.getTags())
                        .build();
                projectTaskDTOList.add(resProjectTaskDTO);
            }

            ResProjectDTO resProjectDTO = ResProjectDTO.builder()
                    .projectId(p.getProjectId())
                    .title(p.getTitle())
                    .dto(projectTaskDTOList)
                    .build();
            resProjectDTOList.add(resProjectDTO);
        }

        return resProjectDTOList;
    }


    public void updateProject(ReqUpdateProjectDTO reqUpdateProjectDTO) {
        User user = userService.getCurrentUser();
        projectRepository.findById(reqUpdateProjectDTO.getProjectId())
                .orElseThrow(()->new RuntimeException("해당하는 프로젝트가 없습니다"));
        Project project = Project.builder()
                .projectId(reqUpdateProjectDTO.getProjectId())
                .title(reqUpdateProjectDTO.getTitle())
                .user(user)
                .build();
        projectRepository.save(project);
    }

    public void deleteProject(Long projectId) {
        List<ProjectTask> taskList = projectTaskRepository.findByProjectId(projectId);
        for(ProjectTask pt : taskList){ // 해당하는 task 다 지워야함
            this.deleteTask(pt.getTaskId());
        }
        projectRepository.deleteById(projectId);
    }

    @Transactional
    public void postTask(ReqProjectTaskDTO reqProjectTaskDTO) {
        Project project = projectRepository.findById(reqProjectTaskDTO.getProjectId())
                .orElseThrow(()->new RuntimeException("해당하는 프로젝트가 없습니다"));

        ProjectTask projectTask = ProjectTask.builder()
                .title(reqProjectTaskDTO.getTitle())
                .description(reqProjectTaskDTO.getDescription())
                .date(reqProjectTaskDTO.getDate())
                .tags(reqProjectTaskDTO.getTags())
                .project(project)
                .build();
        ProjectTask result = projectTaskRepository.save(projectTask);

        List<MultipartFile> files = reqProjectTaskDTO.getFiles();
        if(files != null && !files.isEmpty()) {
            for (MultipartFile s : files) {
                if (!s.isEmpty()) {
                    FileDTO fileDTO = FileDTO.builder()
                            .file(s)
                            .repoType("kanban")
                            .masterId(result.getTaskId())
                            .build();
                    fileService.saveFile(fileDTO);
                }
            }
        }
    }

    public void updatePost(ReqUpdateProjectTaskDTO reqUpdateProjectTaskDTO) {
        ProjectTask result = projectTaskRepository.findById(reqUpdateProjectTaskDTO.getTaskId())
                .orElseThrow(()->new RuntimeException("해당하는 태스크가 없습니다"));
        Project project = projectRepository.findById(reqUpdateProjectTaskDTO.getProjectId())
                .orElseThrow(()->new RuntimeException("해당하는 프로젝트가 없습니다"));

        ProjectTask projectTask = ProjectTask.builder()
                .taskId(reqUpdateProjectTaskDTO.getTaskId())
                .title(reqUpdateProjectTaskDTO.getTitle())
                .description(reqUpdateProjectTaskDTO.getDescription())
                .tags(reqUpdateProjectTaskDTO.getTags())
                .date(reqUpdateProjectTaskDTO.getDate())
                .project(project)
                .build();
        projectTaskRepository.save(projectTask);

        this.deleteFileById(reqUpdateProjectTaskDTO.getTaskId());

        List<MultipartFile> dtoFile = reqUpdateProjectTaskDTO.getFiles();

        if(dtoFile != null && !dtoFile.isEmpty()){
            for(MultipartFile s : dtoFile){
                if(!s.isEmpty()){
                    FileDTO fileDTO = FileDTO.builder()
                            .repoType("kanban")
                            .file(s)
                            .masterId(reqUpdateProjectTaskDTO.getTaskId())
                            .build();
                    fileService.saveFile(fileDTO);
                }
            }
        }

    }
    public void deleteTask(Long projectTaskId) {
        this.deleteFileById(projectTaskId);
        projectTaskRepository.deleteById(projectTaskId);
    }

    public void deleteFileById(Long projectTaskId){
        List<ProjectTaskFile> fileList = projectTaskFileRepository.findByTaskId(projectTaskId);
        for(ProjectTaskFile files : fileList){
            FileDeleteDTO dto = FileDeleteDTO.builder()
                    .savedName(files.getSavedName())
                    .repoType("kanban")
                    .masterId(projectTaskId)
                    .build();
            fileService.deleteFile(dto);
        }
    }
}
