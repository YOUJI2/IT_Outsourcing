package kr.co.metasoft.ito.api.common.controller;

import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.metasoft.ito.api.common.dto.ApprovalDto;
import kr.co.metasoft.ito.api.common.dto.ApprovalParamDto;
import kr.co.metasoft.ito.api.common.dto.VacationDto;
import kr.co.metasoft.ito.api.common.dto.VacationParamDto;
import kr.co.metasoft.ito.api.common.entity.ApprovalEntity;
import kr.co.metasoft.ito.api.common.entity.VacationEntity;
import kr.co.metasoft.ito.api.common.service.ApprovalService;
import kr.co.metasoft.ito.api.common.service.VacationService;
import kr.co.metasoft.ito.common.util.PageRequest;
import kr.co.metasoft.ito.common.util.PageResponse;

@RestController
@RequestMapping(path = "api/app/approvals")
public class ApiCommonApprovalController {


    @Autowired
    private ApprovalService approvalService;

    @GetMapping(path = "")
    public PageResponse<ApprovalEntity> getApprovalList(
            @ModelAttribute ApprovalParamDto approvalParamDto,
            @ModelAttribute PageRequest pageRequest){
        return approvalService.getApprovalList(approvalParamDto, pageRequest);
    }


    @GetMapping(path = "{id}")
    public ApprovalEntity getApproval(
            @PathVariable Long id) {
        return approvalService.getApprovalEntity(id);
    }

    @PostMapping(path = "", params = {"!bulk"})
    public ApprovalEntity createApproval(
            @RequestBody ApprovalDto approvalDto) {
        ApprovalEntity approvalEntity = ApprovalEntity.builder()
                .id(approvalDto.getId())
                .vacationId(approvalDto.getVacationId())
                .step(approvalDto.getStep())
                .teamLeader(approvalDto.getTeamLeader())
                .director(approvalDto.getDirector())
                .president(approvalDto.getPresident())
                .approvalDate(approvalDto.getApprovalDate())
                .build();
        return approvalService.createApprovalEntity(approvalEntity);
    }

    @PutMapping(path = "{id}") //vacationId
    public ApprovalEntity modifyApproval(
            @PathVariable (name = "id") Long id,
            @RequestBody ApprovalDto approvalDto) {
        ApprovalEntity approval = getApproval(id);
        String teamStatus = approval.getTeamLeader();
        String directorStatus = approval.getDirector();
        String presidentStatus = approval.getPresident();
        if(Objects.equals(approvalDto.getTeamLeader(), "T")) {
            teamStatus = approvalDto.getTeamLeader();
            approvalDto.setStep(1L);
        }
        if(Objects.equals(approvalDto.getDirector(), "T")) {
            directorStatus = approvalDto.getDirector();
            approvalDto.setStep(2L);
        }
        if(Objects.equals(approvalDto.getPresident(), "T")) {
            presidentStatus = approval.getPresident();
            approvalDto.setStep(3L);
        }
        Long approvalId = approval.getId();
        ApprovalEntity approvalEntity = ApprovalEntity.builder()
                .id(approvalId)
                .vacationId(id)
                .step(approvalDto.getStep())
                .teamLeader(teamStatus)
                .director(directorStatus)
                .president(presidentStatus)
                .approvalDate(approvalDto.getApprovalDate())
                .build();
        return approvalService.modifyApprovalEntity(approvalEntity);
    }

    @DeleteMapping(path = "{id}")
    public void removeApproval(
            @PathVariable (name = "id") Long id) {
        approvalService.removeApproval(id);
    }

    @DeleteMapping(path = "")
    public void removeApprovalList(
            @RequestBody List<Long> idList) {
        approvalService.removeApprovalList(idList);
    }


}
