package kr.co.metasoft.ito.api.common.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import kr.co.metasoft.ito.api.common.entity.id.PersonSectorEntityId;
import kr.co.metasoft.ito.common.validation.group.CreateValidationGroup;
import kr.co.metasoft.ito.common.validation.group.ModifyValidationGroup;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table (name = "`tb_person_sector`")
@IdClass (value = PersonSectorEntityId.class)
@EntityListeners (value = {AuditingEntityListener.class})
@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PersonSectorEntity {

    @NotNull (groups = {CreateValidationGroup.class, ModifyValidationGroup.class})
    @Id
    @Column (name = "`person_id`", columnDefinition = "bigint(20)")
    private Long personId;

    @NotNull (groups = {CreateValidationGroup.class, ModifyValidationGroup.class})
    @Id
    @Column (name = "`sector`", columnDefinition = "varchar(15)")
    private String sector;

    @ManyToOne
    @NotFound (action = NotFoundAction.IGNORE)
    @JoinColumn (name = "`person_id`", referencedColumnName = "`id`", insertable = false, updatable = false)
    private PersonEntity person;

    @ManyToOne
    @NotFound (action = NotFoundAction.IGNORE)
    @JoinColumn (name = "`sector`", referencedColumnName = "`id`", insertable = false, updatable = false)
    private CodeEntity code;

}