package kr.co.metasoft.ito.api.common.service;

import kr.co.metasoft.ito.api.common.dto.CareerParamDto;
import kr.co.metasoft.ito.api.common.entity.CareerEntity;
import kr.co.metasoft.ito.api.common.entity.PersonEntity;
import kr.co.metasoft.ito.api.common.mapper.CareerMapper;
import kr.co.metasoft.ito.api.common.repository.CareerRepository;
import kr.co.metasoft.ito.api.common.repository.PersonRepository;
import kr.co.metasoft.ito.common.util.PageRequest;
import kr.co.metasoft.ito.common.util.PageResponse;

import kr.co.metasoft.ito.common.validation.group.CreateValidationGroup;
import kr.co.metasoft.ito.common.validation.group.ModifyValidationGroup;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Validated
@Service
public class CareerService {
    @Autowired
    private CareerRepository careerRepository;

    @Autowired
    private CareerMapper careerMapper;

    @Autowired
    private PersonRepository personRepository;

    @Transactional
    public PageResponse<CareerEntity> getCareerList(
            @Valid CareerParamDto careerParamDto,
            PageRequest pageRequest) {
        Integer careerListCount = careerMapper.selectCareerListCount(careerParamDto);
        List<CareerEntity> careerList = careerMapper.selectCareerList(careerParamDto, pageRequest);
        PageResponse<CareerEntity> pageResponse = new PageResponse<>(pageRequest, careerListCount);
        pageResponse.setItems(careerList);

        return pageResponse;
    }

    @Transactional
    public CareerEntity getCareer(Long personCareerId) {
        return careerRepository.findById(personCareerId).orElse(null);
    }

    @Validated (value = {CreateValidationGroup.class})
    @Transactional
    public CareerEntity createCareer(CareerEntity careerEntity) {
        return careerCalc(careerEntity, "create");
    }

    @Validated (value = {ModifyValidationGroup.class})
    @Transactional
    public CareerEntity modifyCareer(
            @Valid @NotNull(groups = {ModifyValidationGroup.class}) CareerEntity careerEntity) {
        return careerCalc(careerEntity, "modify");
    }

    @Transactional
    public void removeCareerList(List<Long> idList) { careerMapper.deleteCareerList(idList); }

    @Transactional
    public void removeCareer(Long personCareerId) {
        CareerEntity careerEntity = careerRepository.findById(personCareerId).orElse(null);
        careerCalc(careerEntity, "delete");

        careerRepository.delete(CareerEntity.builder().personCareerId(personCareerId).build());
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

        if (s.equals("delete")) {
            personRepository.deleteById(personEntity.getId());
        } else {
            personRepository.save(personEntity);
        }

        return entity;
    }
}