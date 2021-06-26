# :pushpin:ITO(IT_Outsourcing) PROJECT
* * *
## 프로젝트 설명
> "ITO"는 다른 기업에서 진행하는 프로젝트를 위탁받아 원하는 직군의 인력을 연결시켜주는 서비스입니다. 사용자는 지원하고자 하는 역할(기획, 디자인, 개발)을 기입하고 자신의 기술, 경력 등을 입력하여 프로필을 등록하고 직접 원하는 프로젝트에 지원하여 기업에서 연락을 받게되면 프로젝트에 투입되어 진행할 수 있게 됩니다. 

## ITO Project 기능 설명
### [관리자 메뉴]
* * *
**1. 사용자 현황 페이지**
  - **[사용자 검색]** TextField에 원하는 조건을 입력하면 해당 조건에 맞는 사용자들을 찾아서 보여줍니다.  
    + PersonMapper.xml 에 입력한 조건을 기준으로 사용자DB에서 검색하여 List로 가져옵니다. (Mybatis 사용)
  - **[업로드]** 버튼으로 사용자의 정보를 엑셀을 통해서 대량으로 추가할 수 있습니다.  
    + ex) 엑셀에 100명의 사용자 정보를 형식에 맞춰 입력하면 대량 업로드가 가능합니다.
    + ```java
       // excel 업로드 controller
       @PostMapping (path = "/person")
       public Map<String, Object> getPersonExcelFile(
            DataUploadParamDto dataUploadParamDto) throws Exception {
            return dataUploadService.uploadCMDBExcelFile(dataUploadParamDto);
       }
       //-------------------------------------------------------------------------
       //excel 파일 열기 
       OPCPackage opcPackage = OPCPackage.open(excelFile.getInputStream());
       XSSFWorkbook workbook = new XSSFWorkbook(opcPackage);      
     
  - **[삭제]** 버튼으로 해당 사용자의 정보를 삭제할 수 있습니다.
  - **[엑셀 다운로드]** 로 해당 목록에 있는 사용자 정보를 엑셀로 저장 할 수 있습니다.
    + ```java
       @RestController
       @RequestMapping(path = "api/app/person-downloads")
       public class ApiCommonPersonFileDownloadController {
       @Autowired
       private PersonDataDownloadService personDataDownloadService;

       @GetMapping(path = "list.xlsx", produces = {"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"})
       public byte[] getPersonListXlsx(
            @ModelAttribute PersonParamDto personParamDto,
            @ModelAttribute PageRequest pageRequest) {
               return personDataDownloadService.getPersonListXlsx(personParamDto, pageRequest);
            }
       }
     
  - **[사용자 목록]** 에 있는 사용자를  클릭하면 **사용자 프로필** 페이지로 이동하여 정보를 수정할 수 있습니다.
  
**2. 사용자 프로필 입력 페이지**
  - 각각의 TextField에 정보를 입력하고 **[저장]** 버튼을 누르게 되면 DB에 사용자ID를 생성하여 DB에 저장시킵니다. 
  - **[초기화]** 는 TextField에 입력한 정보를 전부 지운다.


  📄 사용 API
  ```javaScript
            "person": {
                "getPersonList": function (params) { return axios({"url": "/api/common/people", "method": "get", "params": params}); },
                "getPerson": function (id) { return axios({"url": "/api/common/people/" + id, "method": "get"}); },
                "createPersonList": function (data) { return axios({"url": "/api/common/people?bulk", "method": "post", "data": data}); },
                "createPerson": function (data) { return axios({"url": "/api/common/people", "method": "post", "data": data}); },
                "modifyPersonList": function (data) { return axios({"url": "/api/common/people", "method": "put", "data": data}); },
                "modifyPerson": function (id, data) { return axios({"url": "/api/common/people/" + id, "method": "put", "data": data}); },
                "removePersonList": function (data) { return axios({"url": "/api/common/people", "method": "delete", "data": data}); },
                "removePerson": function (id) { return axios({"url": "/api/common/people/"+ id, "method": "delete"}); },
            },
            //Excel 업로드 API
            "upload" : {
                "person" : function (data) { return axios({"url": "/api/app/uploads/person","enctype": "multipart/form-data", "contentType" : false, "cache" : false, "processData" : false, "method": "post", "data": data});}
            },
            //Excel 다운로드 API
            "personDownload": {
                "downloadPersonListXlsx": async function(params, title) {
                    let a, data, url;
                    data = (await axios({
                        "url": "/api/app/person-downloads/list.xlsx",
                        "method": "get",
                        "responseType": "blob",
                        "params": params
                    })).data;
                    url = window.URL.createObjectURL(data);
                    a = document.createElement("a");
                    a.setAttribute("href", url);
                    switch(title) {
                        case "available": a.setAttribute("download", "가용인력 현황.xlsx"); break;
                        case "confirm": a.setAttribute("download", "확정 현황.xlsx"); break;
                        case "apply": a.setAttribute("download", "지원자 현황.xlsx"); break;
                        default: a.setAttribute("download", "사용자 현황.xlsx");
                    }
                    a.click();
                    window.URL.revokeObjectURL(url);
                },
            },
```            


**3. 프로젝트 목록 페이지**
  - **[프로젝트 검색]** TextField에 원하는 조건을 입력하면 해당 조건에 맞는 프로젝트를 찾아서 보여줍니다.  
    + PersonMapper.xml 에 입력한 조건을 기준으로 프로젝트DB에서 검색하여 List로 가져옵니다. (Mybatis 사용)
  - **
  




