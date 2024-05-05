package net.kdigital.web_project.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.kdigital.web_project.dto.CountryChartDTO;
import net.kdigital.web_project.dto.YearChartDTO;
import net.kdigital.web_project.service.ChartService;

@Controller
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/chart")
public class ChartController {

    private final ChartService chartService;

    @GetMapping("/imexXYChart")
    @ResponseBody
    public List<YearChartDTO> imexXYChart(
            @RequestParam(name = "hs4digit") String hs4digit) {
        log.info("======hscode: {}", hs4digit);
        List<YearChartDTO> yearImexList = chartService.selectYearImex(hs4digit);

        log.info("======yearImexList: {}", yearImexList);
        return yearImexList;
    }

    @GetMapping("/exPieChart")
    @ResponseBody
    public List<CountryChartDTO> pieChartExport(
            @RequestParam(name = "hs4digit") String hs4digit) {
        log.info("======hscode: {}", hs4digit);
        List<CountryChartDTO> exportRankingList = chartService.selectExportRanking(hs4digit);

        log.info("======exportRankingList: {}", exportRankingList);
        return exportRankingList;
    }

    @GetMapping("/imPieChart")
    @ResponseBody
    public List<CountryChartDTO> pieChartImport(
            @RequestParam(name = "hs4digit") String hs4digit) {
        log.info("======hscode: {}", hs4digit);
        List<CountryChartDTO> importRankingList = chartService.selectImportRanking(hs4digit);

        log.info("======importRankingList: {}", importRankingList);
        return importRankingList;
    }
}
