# :pushpin:ITO(IT_Outsourcing) PROJECT
* * *
## 프로젝트 설명
> "ITO"는 다른 기업에서 진행하는 프로젝트를 위탁받아 원하는 직군의 인력을 연결시켜주는 서비스입니다. 사용자는 지원하고자 하는 역할(기획, 디자인, 개발)을 기입하고 자신의 기술, 경력 등을 입력하여 프로필을 등록하고 직접 원하는 프로젝트에 지원하여 기업에서 연락을 받게되면 프로젝트에 투입되어 진행할 수 있게 됩니다. 

## ITO Project 기능 설명
### [관리자 메뉴]
* * *
**1. 사용자 현황 페이지**
  - **[사용자 검색]** 박스에 원하는 조건을 입력하면 해당 조건에 맞는 사용자들을 찾아서 보여줍니다.  
  - **[업로드]** 버튼으로 사용자의 정보를 엑셀을 통해서 대량으로 추가할 수 있습니다.  
    + ex) 엑셀에 100명의 사용자 정보를 형식에 맞춰 입력하면 대량 업로드가 가능합니다. 
  - **[삭제]** 버튼으로 해당 사용자의 정보를 삭제할 수 있습니다.
  - **[엑셀 다운로드]** 로 해당 목록에 있는 사용자 정보를 엑셀로 저장 할 수 있습니다.     
  - **[사용자 목록]** 에 있는 사용자를  클릭하면 **사용자 프로필** 페이지로 이동하여 정보를 수정할 수 있습니다.
  
  
  :pushpin: 사용 API
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

  ```
  
  
**2. 사용자 정보 입력 페이지**




