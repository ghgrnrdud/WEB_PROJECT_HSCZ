package net.kdigital.web_project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import net.kdigital.web_project.entity.CCAListEntity;

public interface CCAListRepository extends JpaRepository<CCAListEntity, Long> {
    @Query(value = "SELECT * FROM CCALIST", nativeQuery = true)
    Page<CCAListEntity> findAllCCA(Pageable pageable);

    @Query(value = "SELECT * FROM CCALIST WHERE company_region LIKE CONCAT(:searchItem, '%')", nativeQuery = true)
    Page<CCAListEntity> findAllCCAByRegion(@Param("searchItem") String searchItem, Pageable pageable);

    @Query(value = "SELECT * FROM CCALIST WHERE cca_item1 = :searchItem OR cca_item2 = :searchItem OR cca_item3 = :searchItem", nativeQuery = true)
    Page<CCAListEntity> findAllCCAByProductCategory(@Param("searchItem") String searchItem, Pageable pageable);
}

