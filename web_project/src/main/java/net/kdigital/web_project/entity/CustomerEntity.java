package net.kdigital.web_project.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import net.kdigital.web_project.dto.CustomerDTO;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
@Builder
@Entity
@Table(name="customer")
public class CustomerEntity {
	
	@Id
	@Column(name="user_id")
	private String userId;
	
	@Column(name="user_pwd", nullable=false)
	private String userPwd;
	
	@Column(name="user_name", nullable=false)
	private String userName;
	
	@Column(name="user_role", nullable=false)
	private String userRole;
	
	private String phone;
	private String email;
	
	@Column(name="company_name")
	private String companyName;
	
	@Column(name="company_region")
	private String companyRegion;
	
	@Column(name="like_total")
	private int likeTotal;
	
	@Column(name="self_info")
	private String selfInfo;
	
	/* item table과 관계설정
	 * 
	 */
	@OneToMany(mappedBy = "customerEntity"
			, cascade = CascadeType.REMOVE
			, orphanRemoval = true
			, fetch = FetchType.LAZY
			)
	@OrderBy("item_id asc")
	private List<CustomerItemEntity> customerItemEntity = new ArrayList<>();
	
	public static CustomerEntity toEntity(CustomerDTO customerDTO) {
		return CustomerEntity.builder()
				.userId(customerDTO.getUserId())
				.userPwd(customerDTO.getUserPwd())
				.userName(customerDTO.getUserName())
				.userRole(customerDTO.getUserRole())
				.phone(customerDTO.getPhone())
				.email(customerDTO.getEmail())
				.companyName(customerDTO.getCompanyName())
				.companyRegion(customerDTO.getCompanyRegion())
				.likeTotal(customerDTO.getLikeTotal())
				.selfInfo(customerDTO.getSelfInfo())
				.build();
	}
}
