package net.kdigital.web_project.controller;

import java.io.UnsupportedEncodingException;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.kdigital.web_project.api.OpenApiManager;
import net.kdigital.web_project.dto.SubheadingDTO;
import net.kdigital.web_project.dto.TaxDTO;
import net.kdigital.web_project.service.SubheadingService;

@Controller
@RequestMapping("/subhead")
@RequiredArgsConstructor
@Slf4j
public class SubheadingController {
    
    public final SubheadingService subheadingService;
    private final OpenApiManager openApiManager;

    @GetMapping("/detail")
    public String subheadDetail(
        @RequestParam(name = "hs4digit") String hs4digit
        , Model model
    ) {
        log.info("======hscode: {}", hs4digit);

        List<SubheadingDTO> subheadingList = subheadingService.selectDetail(hs4digit);

        log.info("======subheading list: {}", subheadingList);
        
        model.addAttribute("hs4digit", hs4digit);
        model.addAttribute("list", subheadingList);

        return "subhead/detail";
    }

    @GetMapping("/info")
    public String subheadInfo(
        @RequestParam(name = "hsAll") String hsAll
        , Model model
    ) {
        log.info("=============subheadInfo");
        List<TaxDTO> dtoList = openApiManager.taxOpenApi(hsAll);

        model.addAttribute("hsCode", hsAll);
        model.addAttribute("wght", dtoList.get(0).getWghtUt());
        model.addAttribute("qty", dtoList.get(0).getQtyUt());
        model.addAttribute("koDescription", dtoList.get(0).getKorePrnm());
        model.addAttribute("list", dtoList);
        return "subhead/info";
    }

}
