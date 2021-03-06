package kr.co.metasoft.ito.api.app.service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;

import kr.co.metasoft.ito.api.app.dto.InvolvementDto;
import kr.co.metasoft.ito.api.common.entity.CareerEntity;
import kr.co.metasoft.ito.api.common.entity.PersonEntity;
import kr.co.metasoft.ito.api.common.entity.ProjectCareerEntity;
import kr.co.metasoft.ito.api.common.entity.ProjectPersonEntity;
import kr.co.metasoft.ito.api.common.entity.id.ProjectCareerEntityId;
import kr.co.metasoft.ito.api.common.entity.id.ProjectPersonEntityId;
import kr.co.metasoft.ito.api.common.repository.CareerRepository;
import kr.co.metasoft.ito.api.common.repository.PersonRepository;
import kr.co.metasoft.ito.api.common.repository.ProjectCareerRepository;
import kr.co.metasoft.ito.api.common.repository.ProjectPersonRepository;
import kr.co.metasoft.ito.common.validation.group.CreateValidationGroup;
import kr.co.metasoft.ito.common.validation.group.RemoveValidationGroup;

@Service
public class InvolvementService {

    @Autowired
    ProjectPersonRepository projectPersonRepository;

    @Autowired
    CareerRepository careerRepository;

    @Autowired
    PersonRepository personRepository;

    @Autowired
    ProjectCareerRepository projectCareerRepository;


    @Validated (value = {CreateValidationGroup.class})
    @Transactional
    public void createInvolvement (
            @Valid @NotNull (groups = {CreateValidationGroup.class}) InvolvementDto involvementDto) {
        ProjectPersonEntity projectPersonEntity = ProjectPersonEntity.builder()
                .projectId(involvementDto.getProjectPersonDto().getProjectId())
                .personId(involvementDto.getProjectPersonDto().getPersonId())
                .status("T")
                .build();

        CareerEntity careerEntity = CareerEntity.builder()
                .personId(involvementDto.getCareerDto().getPersonId())
                .name(involvementDto.getCareerDto().getName())
                .startPeriod(involvementDto.getCareerDto().getStartPeriod())
                .endPeriod(involvementDto.getCareerDto().getEndPeriod())
                .position(involvementDto.getCareerDto().getPosition())
                .task(involvementDto.getCareerDto().getTask())
                .pay(involvementDto.getCareerDto().getPay())
                .build();

        ProjectCareerEntity projectCareerEntity = new ProjectCareerEntity();
        Long careerId = careerCalc(careerEntity, "create").getPersonCareerId();
        projectPersonRepository.save(projectPersonEntity);
        projectCareerEntity.setCareerId(careerId);
        projectCareerEntity.setProjectId(projectPersonEntity.getProjectId());
        projectCareerRepository.save(projectCareerEntity);

    }


    @Validated (value = {RemoveValidationGroup.class})
    @Transactional
    public void removeInvolvement(
            @Valid @NotNull (groups = {RemoveValidationGroup.class}) InvolvementDto involvementDto) {

            System.out.println(involvementDto);


        CareerEntity careerEntity = CareerEntity.builder()
                .personId(involvementDto.getCareerDto().getPersonId())
                .personCareerId(involvementDto.getCareerDto().getPersonCareerId())
                .name(involvementDto.getCareerDto().getName())
                .startPeriod(involvementDto.getCareerDto().getStartPeriod())
                .endPeriod(involvementDto.getCareerDto().getEndPeriod())
                .position(involvementDto.getCareerDto().getPosition())
                .task(involvementDto.getCareerDto().getTask())
                .pay(involvementDto.getCareerDto().getPay())
                .build();


        projectCareerRepository.delete(
                ProjectCareerEntity.builder()
                .projectId(involvementDto.getProjectPersonDto().getProjectId())
                .careerId(involvementDto.getCareerDto().getPersonCareerId())
                .build()
                );
        System.out.println("projectCareer ??????");

        projectPersonRepository.delete(
                ProjectPersonEntity.builder()
                .projectId(involvementDto.getProjectPersonDto().getProjectId())
                .personId(involvementDto.getProjectPersonDto().getPersonId())
                .build()
                );
        System.out.println("projectPerson ??????");


        careerCalc(careerEntity, "delete");
        System.out.println("??????! ");

    }

    // ?????? ?????? ??????
    @Transactional
    public CareerEntity careerCalc(CareerEntity careerEntity, String s) {
        Long beforeCareer = 0L; // ??????????????? ???????????? ?????? ??? ?????????
        Long personId = careerEntity.getPersonId();
        CareerEntity e = careerRepository.findById(personId).orElse(null);
        if(e != null) beforeCareer = ChronoUnit.DAYS.between(e.getStartPeriod(), e.getEndPeriod());
        CareerEntity entity = careerRepository.save(careerEntity);

        PersonEntity personEntity = personRepository.findById(personId).orElse(null);
        int days = 0;
        if(personEntity.getDays() != null) {
            days = Integer.valueOf(personEntity.getDays());
        }

        Long career = 0L;
        LocalDate startPeriod, endPeriod;
        startPeriod = careerEntity.getStartPeriod();
        endPeriod = careerEntity.getEndPeriod();
        career = ChronoUnit.DAYS.between(startPeriod, endPeriod); // ?????? ??? ?????????

        switch (s) {
            case "create":
                days += career;
                break;
            case "modify":
                days -= beforeCareer;
                days += career;
                break;
            case "delete":
                days -= beforeCareer;
                break;
        }
        personEntity.setDays(days + "");

        // ?????? ?????? ??????
        double result; // ????????? ?????? ?????? ??????
        if (days / 365 == 0) {
            days /= 30;

            result = days * 0.01;
            if (result == 0.12) result /= 0.12;
        } else {
            double year = days / 365, month = days % 365 / 30;

            month *= 0.01;
            if (month == 0.12) month /= 0.12;

            result = year + month;
        }
        personEntity.setCareer(result + "");

        personRepository.save(personEntity);
        if (s.equals("delete")) {
            careerRepository.deleteById(careerEntity.getPersonCareerId());
        }

        return entity;
    }
}
