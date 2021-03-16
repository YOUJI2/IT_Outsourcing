package kr.co.metasoft.ito.api.common.entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "tb_prof")
@EntityListeners(value = {AuditingEntityListener.class})
@Getter
@Setter
public class ProfileEntity {
    @Id
    @Column(name = "user_prof_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "address")
    private String address;

    @Column(name = "number")
    private String number;

    @Column(name = "email")
    private String email;

    @Column(name = "skill")
    private String skill;

    @Column(name = "career")
    private String career;

    @Column(name = "status")
    private String status;

    @Column(name = "pay")
    private String pay;

    @Column(name = "name")
    private String name;

    @Column(name = "birth_date")
    private LocalDate birthDate;

    @Column(name = "job")
    private String job;
}
