package net.kdigital.web_project.api;

import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import com.fasterxml.jackson.databind.ObjectMapper;

import net.kdigital.web_project.dto.TaxDTO;

@Component
public class OpenApiManager {

    private static String getTagValue(String tag, Element eElement) {
        NodeList nodeList = eElement.getElementsByTagName(tag);
        if (nodeList != null && nodeList.getLength() > 0) {
            NodeList nlList = nodeList.item(0).getChildNodes();
            if (nlList != null && nlList.getLength() > 0) {
                Node nValue = nlList.item(0);
                if (nValue != null) {
                    return nValue.getNodeValue();
                }
            }
        }
        return null;
    }

    public List<TaxDTO> taxOpenApi(String hsAll) {
        ObjectMapper mapper = new ObjectMapper();
        List<Map<String, String>> list = new ArrayList<>();
        String key = "x220d224k064z055q000i000u0";

        try {
            String url = "https://unipass.customs.go.kr:38010/ext/rest/hsSgnQry/searchHsSgn?"
                    + "crkyCn=" + key // 인증키
                    + "&hsSgn=" + hsAll // 입력 받은 hs code
                    + "&koenTp=1";

            DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
            Document doc = dBuilder.parse(url);
            doc.getDocumentElement().normalize();
            System.out.println("Root element : " + doc.getDocumentElement().getNodeName());

            NodeList nList = doc.getElementsByTagName("hsSgnSrchRsltVo");
            System.out.println("파싱할 리스트 수 : " + nList.getLength());

            for (int temp = 0; temp < nList.getLength(); temp++) {
                Map<String, String> map = new HashMap<>();
                Node nNode = nList.item(temp);
                if (nNode.getNodeType() == Node.ELEMENT_NODE) {
                    Element eElement = (Element) nNode;
                    // 각 hsSgnSrchRsltVo 요소에서 필요한 데이터 가져오기
                    map.put("qtyUt", getTagValue("qtyUt", eElement));
                    map.put("hsSgn", getTagValue("hsSgn", eElement));
                    map.put("wghtUt", getTagValue("wghtUt", eElement));
                    map.put("englPrnm", getTagValue("englPrnm", eElement));
                    map.put("txrt", getTagValue("txrt", eElement));
                    map.put("korePrnm", getTagValue("korePrnm", eElement));
                    map.put("txtpSgn", getTagValue("txtpSgn", eElement));
                    list.add(map);
                }
            }
            System.out.println(list);

            // List<Map> to List<Dto>
            List<TaxDTO> dtoList = mapper.convertValue(list, mapper.getTypeFactory().constructCollectionType(List.class, TaxDTO.class));
            System.out.println(dtoList.get(0).getHsSgn() + dtoList.get(0).getTxtpSgn() + dtoList.get(0).getTxrt());

            return dtoList;

        } catch (Exception e) {
            e.printStackTrace();

            return null;
        }
    }

    public String refundsOpenApi(String hsAll) {
        String key = "j210k284u074o078h000d030b0";
        String refundsWon = "";

        try {
            String url = "https://unipass.customs.go.kr:38010/ext/rest/simlXamrttXtrnUserQry/retrieveSimlXamrttXtrnUser?"
                    + "crkyCn=" + key // 인증키
                    + "&baseDt=20240101"
                    + "&hsSgn=" + hsAll;

            DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
            Document doc = dBuilder.parse(url);
            doc.getDocumentElement().normalize();
            System.out.println("Root element : " + doc.getDocumentElement().getNodeName());

            NodeList nList = doc.getElementsByTagName("simlXamrttXtrnUserQryRsltVo");
            System.out.println("파싱할 리스트 수 : " + nList.getLength());

            if (nList.getLength() > 0) {
                Node nNode = nList.item(0);
                if (nNode.getNodeType() == Node.ELEMENT_NODE) {
                    Element eElement = (Element) nNode;
                    // 각 simlXamrttXtrnUserQryRsltVo 요소에서 필요한 데이터 가져오기
                    //String hsCode = getTagValue("hs10", eElement);
                    refundsWon = getTagValue("prutDrwbWncrAmt", eElement);
                }
            }
            System.out.println("단위당환급원화금액 : " + refundsWon);
            return refundsWon;

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public List<String> exOpenApi(String hsAll) {
        String key = "l250r204o024n155l040m050b0";
        List<String> exCheckList = new ArrayList<>();

        try {
            String url = "https://unipass.customs.go.kr:38010/ext/rest/ccctLworCdQry/retrieveCcctLworCd?"
                    + "crkyCn=" + key // 인증키
                    + "&hsSgn=" + hsAll
                    + "&imexTp=1";

            DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
            Document doc = dBuilder.parse(url);
            doc.getDocumentElement().normalize();
            System.out.println("Root element : " + doc.getDocumentElement().getNodeName());

            NodeList nList = doc.getElementsByTagName("ccctLworCdQryRtnVo");
            System.out.println("파싱할 리스트 수 : " + nList.getLength());

            if (nList.getLength() > 0) {
                Node nNode = nList.item(0);
                if (nNode.getNodeType() == Node.ELEMENT_NODE) {
                    Element eElement = (Element) nNode;
                    // 각 ccctLworCdQryRtnVo 요소에서 필요한 데이터 가져오기
                    System.out.println("신고인확인법령명 : " + getTagValue("dcerCfrmLworNm", eElement));
                    System.out.println("요건확인서류명 : " + getTagValue("reqCfrmIstmNm", eElement));
                    exCheckList.add(getTagValue("dcerCfrmLworNm", eElement));
                    exCheckList.add(getTagValue("reqCfrmIstmNm", eElement));
                }
            }
            return exCheckList;

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public List<String> imOpenApi(String hsAll) {
        String key = "l250r204o024n155l040m050b0";
        List<String> imCheckList = new ArrayList<>();

        try {
            String url = "https://unipass.customs.go.kr:38010/ext/rest/ccctLworCdQry/retrieveCcctLworCd?"
                    + "crkyCn=" + key // 인증키
                    + "&hsSgn=" + hsAll
                    + "&imexTp=2";

            DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
            Document doc = dBuilder.parse(url);
            doc.getDocumentElement().normalize();
            System.out.println("Root element : " + doc.getDocumentElement().getNodeName());

            NodeList nList = doc.getElementsByTagName("ccctLworCdQryRtnVo");
            System.out.println("파싱할 리스트 수 : " + nList.getLength());

            if (nList.getLength() > 0) {
                Node nNode = nList.item(0);
                if (nNode.getNodeType() == Node.ELEMENT_NODE) {
                    Element eElement = (Element) nNode;
                    // 각 ccctLworCdQryRtnVo 요소에서 필요한 데이터 가져오기
                    System.out.println("신고인확인법령명 : " + getTagValue("dcerCfrmLworNm", eElement));
                    System.out.println("요건확인서류명 : " + getTagValue("reqCfrmIstmNm", eElement));
                    imCheckList.add(getTagValue("dcerCfrmLworNm", eElement));
                    imCheckList.add(getTagValue("reqCfrmIstmNm", eElement));
                }
            }
            return imCheckList;

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
