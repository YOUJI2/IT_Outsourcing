package kr.co.metasoft.ito.api.common.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PersonDto {

    private Long id;

    private String name;

    private String phoneNumber;

    private String gender;

    private Long actualPay;

    private Long ratingScore;

    private String jobType;

    private String skill;

    private String inputStatus;

    private String certificateStatus;

    private String role;

    private String career;

    private String days;

    private Long minPay;

    private Long maxPay;

    private String status;

    private String local;

    private String detailLocal;

    @JsonFormat (pattern = "yyyy-MM-dd")
    @DateTimeFormat (pattern = "yyyy-MM-dd")
    private LocalDate workableDay;

    private String postcode;

    private String address;

    private String detailAddress;

    private String email;

    private String website;

    private String education;

    private String memo;

    @JsonFormat (pattern = "yyyy-MM-dd")
    @DateTimeFormat (pattern = "yyyy-MM-dd")
    private LocalDate birthDate;

    @JsonFormat (pattern = "yyyy-MM-dd HH:mm:ss")
    @DateTimeFormat (pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdDate;

    @JsonFormat (pattern = "yyyy-MM-dd HH:mm:ss")
    @DateTimeFormat (pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime lastModifiedDate;

}