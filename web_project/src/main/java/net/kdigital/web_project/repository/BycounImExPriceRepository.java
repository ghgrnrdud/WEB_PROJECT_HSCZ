package net.kdigital.web_project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import lombok.extern.slf4j.Slf4j;
import net.kdigital.web_project.entity.BycounImExPriceEntity;
import net.kdigital.web_project.service.BycounImExPriceService;
public interface BycounImExPriceRepository extends JpaRepository<BycounImExPriceEntity, Long> {
	List<BycounImExPriceEntity> findAllByCountryOrderBySeq6Desc(String country);
}