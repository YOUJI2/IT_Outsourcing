# πITO(IT_Outsourcing) PROJECT
* * *
## νλ‘μ νΈ μ€λͺ
> "ITO"λ IT μμμμ±μ μ½μλ‘ μΈλΆ κΈ°μμμ μ§ννλ νλ‘μ νΈλ₯Ό μνλ°μ μνλ μ§κ΅°μ μΈλ ₯μ μ°κ²°μμΌμ£Όλ μλΉμ€μλλ€. μ¬μ©μλ μ§μνκ³ μ νλ λΆμΌ(κΈ°ν, λμμΈ, κ°λ°), μμ μ κΈ°μ , κ²½λ ₯ λ±μ μλ ₯νμ¬ νλ‘νμ λ±λ‘νκ³  λͺ¨μ§μ€μΈ νλ‘μ νΈμ μ§μνμ¬ μΆν κΈ°μμμ μ°λ½μ λ°κ²λλ©΄ κΈμ¬ λΌμ ν νλ¦¬λμλ‘ νλ‘μ νΈμ ν©λ₯νμ¬ μ§ν ν  μ μμ΅λλ€. 

* * *
κΈ°μ  μ€ν 
  - Java, Spring Boot, JPA
  - Vue.js, Vuetify

## ITO Project κΈ°λ₯ μ€λͺ
* * *
**1. μ¬μ©μ νν© νμ΄μ§**

![image](https://user-images.githubusercontent.com/43923432/147879392-66fc5ef6-60d4-42c2-974a-6758bb4462ac.png)


  - **[μ¬μ©μ κ²μ]** TextFieldμ μνλ μ‘°κ±΄μ μλ ₯νλ©΄ ν΄λΉ μ‘°κ±΄μ λ§λ μ¬μ©μλ€μ μ°Ύμμ λ³΄μ¬μ€λλ€.  
    + PersonMapper.xml μ μλ ₯ν μ‘°κ±΄μ κΈ°μ€μΌλ‘ μ¬μ©μDBμμ κ²μνμ¬ Listλ‘ κ°μ Έμ΅λλ€. (Mybatis μ¬μ©)
  - **[μλ‘λ]** λ²νΌμΌλ‘ μ¬μ©μμ μ λ³΄λ₯Ό μμμ ν΅ν΄μ λλμΌλ‘ μΆκ°ν  μ μμ΅λλ€.  
    + ex) μμμ 100λͺμ μ¬μ©μ μ λ³΄λ₯Ό νμμ λ§μΆ° μλ ₯νλ©΄ λλ μλ‘λκ° κ°λ₯ν©λλ€.
    + ```java
       // excel μλ‘λ controller
       @PostMapping (path = "/person")
       public Map<String, Object> getPersonExcelFile(
            DataUploadParamDto dataUploadParamDto) throws Exception {
            return dataUploadService.uploadCMDBExcelFile(dataUploadParamDto);
       }
       //-------------------------------------------------------------------------
       //excel νμΌ μ΄κΈ° 
       OPCPackage opcPackage = OPCPackage.open(excelFile.getInputStream());
       XSSFWorkbook workbook = new XSSFWorkbook(opcPackage);      
     
  - **[μ­μ ]** CheckBoxλ‘ μ νλ ν­λͺ©μ λν μ¬μ©μλ€μ μ λ³΄λ₯Ό μ­μ ν  μ μμ΅λλ€.
  - **[μμ λ€μ΄λ‘λ]** λ‘ ν΄λΉ λͺ©λ‘μ μλ μ¬μ©μ μ λ³΄λ₯Ό μμλ‘ μ μ₯ ν  μ μμ΅λλ€.
    + ```java
       @RestController
       @RequestMapping(path = "api/app/person-downloads")
       public class ApiCommonPersonFileDownloadController {
       @Autowired
       private PersonDataDownloadService personDataDownloadService;

       @GetMapping(path = "list.xlsx", produces = {"application/vnd.openxmlformats-
       officedocument.spreadsheetml.sheet"})
       public byte[] getPersonListXlsx(
            @ModelAttribute PersonParamDto personParamDto,
            @ModelAttribute PageRequest pageRequest) {
               return personDataDownloadService
                 .getPersonListXlsx(personParamDto, pageRequest);
            }
       }
     
  - **[μ¬μ©μ λͺ©λ‘]** μ μλ μ¬μ©μλ₯Ό  ν΄λ¦­νλ©΄ **μ¬μ©μ νλ‘ν** νμ΄μ§λ‘ μ΄λνμ¬ μμΈν μ λ³΄λ₯Ό νμΈν  μ μλ€.
  
**2. μ¬μ©μ νλ‘ν μλ ₯ νμ΄μ§**
![image](https://user-images.githubusercontent.com/43923432/147879519-6fc6715a-65e8-45eb-843a-3f1f6fa2dd5a.png)

  - κ°κ°μ TextFieldμ μ λ³΄λ₯Ό μλ ₯νκ³  **[μ μ₯]** λ²νΌμ λλ₯΄κ² λλ©΄ DBμ μ¬μ©μIDλ₯Ό μμ±νμ¬ DBμ μ μ₯μν΅λλ€. 
  - **[μ΄κΈ°ν]** λ TextFieldμ μλ ₯ν μ λ³΄λ₯Ό μ λΆ μ§μ΄λ€.


  π μ¬μ© API
  ```javaScript
            "person": {
                "getPersonList": function (params) {
                        return axios({
                          "url": "/api/common/people",
                          "method": "get",
                          "params": params});
                },
                "getPerson": function (id) {
                        return axios({
                          "url": "/api/common/people/" + id,
                          "method": "get"});
                },
                "createPersonList": function (data) {
                        return axios({
                          "url": "/api/common/people?bulk",
                          "method": "post",
                          "data": data});
                },
                "createPerson": function (data) {
                		return axios({
                          "url": "/api/common/people",
                          "method": "post",
                          "data": data});
                },
                "modifyPersonList": function (data) {
                		return axios({
                          "url": "/api/common/people",
                          "method": "put",
                          "data": data});
                 },
                "modifyPerson": function (id, data) {
                		return axios({"url": "/api/common/people/" + id,
                        "method": "put",
                        "data": data});
                },
                "removePersonList": function (data) {
                		return axios({
                          "url": "/api/common/people",
                          "method": "delete",
                          "data": data});
                },
                "removePerson": function (id) {
                		return axios({
                          "url": "/api/common/people/"+ id,
                          "method": "delete"});
                },
            },
            //Excel μλ‘λ API
            "upload" : {
                "person" : function (data) {
                		return axios({
                          "url": "/api/app/uploads/person",
                          "enctype": "multipart/form-data",
                          "contentType" : false,
                          "cache" : false,
                          "processData" : false,
                          "method": "post",
                          "data": data});}
            },
            //Excel λ€μ΄λ‘λ API
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
                        case "available": a.setAttribute("download", "κ°μ©μΈλ ₯ νν©.xlsx"); break;
                        case "confirm": a.setAttribute("download", "νμ  νν©.xlsx"); break;
                        case "apply": a.setAttribute("download", "μ§μμ νν©.xlsx"); break;
                        default: a.setAttribute("download", "μ¬μ©μ νν©.xlsx");
                    }
                    a.click();
                    window.URL.revokeObjectURL(url);
                },
            },
```            


**3. νλ‘μ νΈ λͺ©λ‘ νμ΄μ§**
![image](https://user-images.githubusercontent.com/43923432/147879414-d3fd439f-7a7d-4198-865e-f05620ee32b3.png)

  - **[νλ‘μ νΈ κ²μ]** TextFieldμ μνλ μ‘°κ±΄μ μλ ₯νλ©΄ ν΄λΉ μ‘°κ±΄μ λ§λ νλ‘μ νΈλ₯Ό μ°Ύμμ λ³΄μ¬μ€λλ€.  
    + PersonMapper.xml μ μλ ₯ν μ‘°κ±΄μ κΈ°μ€μΌλ‘ νλ‘μ νΈDBμμ κ²μνμ¬ Listλ‘ κ°μ Έμ΅λλ€. (Mybatis μ¬μ©)
  - **[μΆκ°]** λ²νΌμΌλ‘ νλ‘μ νΈλ₯Ό μλ ₯νμ¬ λ±λ‘ν  μ μμ΅λλ€.
  - **[μ­μ ]** λͺ©λ‘μμ CheckBoxλ‘ μ νλ ν­λͺ©λ€μ λν΄μ μ­μ ν  μ μμ΅λλ€.
  - **[μμ λ€μ΄λ‘λ]** μμ μ¬μ©μ νν© νμ΄μ§μμμ μμ λ€μ΄λ‘λμ κ°μ κΈ°λ₯μ ν©λλ€
  - **[νλ‘μ νΈ ν­λͺ© μ ν]** λͺ©λ‘μ μλ νλ‘μ νΈλ₯Ό **ν΄λ¦­**νκ² λλ©΄ **[νλ‘μ νΈ μμΈ νμ΄μ§]** λ‘ μ΄λνκ² λ©λλ€.
       
**4. νλ‘μ νΈ μμΈ νμ΄μ§**
![image](https://user-images.githubusercontent.com/43923432/147879513-5c1ae0ae-457d-49ef-8a32-5ce71548bd72.png)

  - **νλ‘μ νΈ μμΈνμ΄μ§**μμλ νλ‘μ νΈμ λν νν©(νμ κΈ°μ , νμ, λ½λ μΈμ λ±μ μ λ³΄) 
  - ν΄λΉ νλ‘μ νΈμ **[μ§μν μ¬λμ μ λ³΄]**, **[μ§μν μ¬λλ€ μ€ λ½ν μ¬λμ μ λ³΄]**, **[κ°μ© μΈλ ₯ λͺ©λ‘]** λ₯Ό λ³΄μ¬μ€λλ€.
    + **[κ°μ©μΈλ ₯]** μ ν΄λΉ νλ‘μ νΈμ μ§μν  μ μλ μ¬μ©μλ€μ λͺ©λ‘μΌλ‘ κΈ°μμμ μνλ μΈλ ₯μ μ¬μ©μμ νμ ν ν¬μ μν¬ μ μλ€.
      * **[ν¬μνκΈ°]** λ²νΌμΌλ‘ μ¬μ©μλ₯Ό λ°λ‘ νλ‘μ νΈμ ν¬μ μν¬ μ μλ€.    

**5. νλ‘μ νΈ λ±λ‘ νμ΄μ§**
  - νλ‘μ νΈ λ±λ‘νμ΄μ§μμλ κΈ°μμμ λͺ¨μ§νκ³ μ νλ νλ‘μ νΈλ₯Ό λ±λ‘νλ νμ΄μ§ μλλ€. 
![image](https://user-images.githubusercontent.com/43923432/147879498-54afedaf-844d-4c5e-888d-cabd67562f0a.png)


  π μ¬μ© API
  ```javaScript
             //νλ‘μ νΈ API
             "project": {
                "getProjectList": function (params) {
                		return axios({
                          "url": "/api/common/projects",
                          "method": "get",
                          "params": params});
                },
                "getProject": function (id) {
                		return axios({
                          "url": "/api/common/projects/" + id,
                          "method": "get"});
                },
                "createProjectList": function (data) {
                		return axios({
                          "url": "/api/common/projects?bulk",
                          "method": "post",
                          "data": data});
                },
                "createProject": function (data) {
                		return axios({
                          "url": "/api/common/projects",
                          "method": "post",
                          "data": data});
                },
                "modifyProjectList": function (data) {
                		return axios({
                          "url": "/api/common/projects",
                          "method": "put",
                          "data": data});
                },
                "modifyProject": function (id, data) {
                		return axios({
                          "url": "/api/common/projects/" + id,
                          "method": "put",
                          "data": data});
                },
                "removeProjectList": function (data) {
                		return axios({
                          "url": "/api/common/projects",
                          "method": "delete",
                          "data": data});
                },
                "removeProject": function (id) {
                		return axios({
                          "url": "/api/common/projects/"+ id,
                          "method": "delete"});
                }
            },
            
            //νλ‘μ νΈμ μ§μν μ¬μ©μ κ΄λ ¨ API (μ§μν μ¬λ, νμ λ μ¬λμ μ λ³΄)
            "projectPerson": {
                "getProjectPersonList": function(params) {
                		return axios({
                        "url": "/api/common/project-person",
                        "method": "get",
                        "params": params});
                },
                "createProjectPerson": function (data) {
                		return axios({
                          "url": "/api/common/project-person",
                          "method": "post",
                          "data": data});
                },
                "modifyProjectPerson": function (personId, projectId, data) {
                		return axios({
                          "url": "/api/common/project-person/" + personId + "," + projectId,
                          "method": "put",
                          "data": data});
                },
                "removeProjectPerson": function (projectId, personId) {
                		return axios({
                          "url": "/api/common/project-person/"+ projectId + "," + personId,
                          "method": "delete"});
                },
                "removeProjectPersonList": function (data) {
                		return axios({
                        "url": "/api/common/project-person",
                        "method": "delete" ,
                        "data": data});
                }
            },
            
            //νλ‘μ νΈμ λν λͺ©λ‘μ Excelλ‘ λ€μ΄λ‘λ API
            "projectDownload": {
                "downloadProjectListXlsx": async function(params) {
                    let a, data, url;
                    data = (await axios({
                        "url": "/api/app/project-downloads/list.xlsx",
                        "method": "get",
                        "responseType": "blob",
                        "params": params
                    })).data;
                    url = window.URL.createObjectURL(data);
                    a = document.createElement("a");
                    a.setAttribute("href", url);
                    a.setAttribute("download", "νλ‘μ νΈλͺ©λ‘.xlsx");
                    a.click();
                    window.URL.revokeObjectURL(url);
                },
            },  
  ```


