package net.kdigital.web_project.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import net.kdigital.web_project.dto.CCAListDTO;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
@Builder

@Entity
@Table(name="ccalist") 
public class CCAListEntity {
    
    @Id
    @Column(name = "cca_num")
    private Long ccaNum;
    
    @Column(name="cca_name", nullable=false)
    private String ccaName;
    
    @Column(name="company_name", nullable=false)
    private String companyName;
    
    @Column(name="phone", nullable=false)
    private String phone;
    
    @Column(name="company_region", nullable=false)
    private String companyRegion;
    
    @Column(name="cca_email", nullable=false)
    private String ccaEmail;
    
    @Column(name="cca_item1", nullable=false)
    private String ccaItem1;
    
    @Column(name="cca_item2", nullable=false)
    private String ccaItem2;
    
    @Column(name="cca_item3", nullable=false)
    private String ccaItem3;

    /*
     * 댓글과의 관계설정
     * mappedBy: one에 해당하는 테이블 엔티티
     * CascadeType.REMOVE 이 값으로 on delete cascade를 설정
     * fetch : LAZY는 지연호출, EAGER: 즉시 호출
     */
    
    public static CCAListEntity toEntity(CCAListDTO ccaListDTO) {
        return CCAListEntity.builder()
                .ccaNum(ccaListDTO.getCcaNum())
                .ccaName(ccaListDTO.getCcaName())
                .companyName(ccaListDTO.getCompanyName())
                .phone(ccaListDTO.getPhone())
                .companyRegion(ccaListDTO.getCompanyRegion())
                .ccaEmail(ccaListDTO.getCcaEmail())
                .ccaItem1(ccaListDTO.getCcaItem1())
                .ccaItem2(ccaListDTO.getCcaItem2())
                .ccaItem3(ccaListDTO.getCcaItem3())
                .build();
    }
}
