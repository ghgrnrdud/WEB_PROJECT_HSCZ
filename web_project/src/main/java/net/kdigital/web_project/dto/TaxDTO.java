package net.kdigital.web_project.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class TaxDTO {
    private String qtyUt;
    private String hsSgn;
    private String wghtUt;
    private String englPrnm;
    private String txrt;
    private String korePrnm;
    private String txtpSgn;
    /*
     * map.put("수량단위", getTagValue("qtyUt", eElement));
        map.put("HS 부호", getTagValue("hsSgn", eElement));
        map.put("중량단위", getTagValue("wghtUt", eElement));
        map.put("영문품명", getTagValue("englPrnm", eElement));
        map.put("세율", getTagValue("txrt", eElement));
        map.put("한글품명", getTagValue("korePrnm", eElement));
        map.put("세종부호", getTagValue("txtpSgn", eElement));
     */
}
