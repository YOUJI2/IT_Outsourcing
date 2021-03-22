
var MainAdminPage = Vue.component('main-admin-userInfo-page', function (resolve, reject) {
    axios.get("/vue/page/main/admin/user-info/main.html").then(function (response) {
        resolve({
            "template": response.data,
            "data": function () {
                return {
                    "user": {
                        "panels": {
                            "search": [0],
                            "list": [0]
                        },
                        "dataTable": {
                            "headers": [
                                {"text": "이름", "value": "name"},
                                {"text": "전화번호", "value": "number"},
                                {"text": "직종",  "value": "jobType"},
                                {"text": "기술",  "value": "skill"},
                                {"text": "생년월일(나이)",  "value": "birthDate"},
                                {"text": "경력",  "value": "career"},
                                {"text": "희망 급여",  "value": "pay"},
                                {"text": "지역",  "value": "address"},
                                {"text": "투입여부",  "value": "inputStatus"},
                                {"text": "업무 가능일",  "value": "workableDay"}

                            ],
/*                            "items": [
                                {name: '유수민', number:"01010101010",job_type:"개발자",skill:"JAVA",birthDate:"11111",career:"1",pay:"1",address:"주우소",inputStatus:"투입중",workableDate:"3"},
                                {name: "김희민", number:"01010101010",job_type:"개발자",skill:"JAVA",birthDate:"11111",career:"1",pay:"1",address:"주우소",inputStatus:"투입중",workableDate:"3"},
                                {name: "새대갈1", number:"01010101010",job_type:"개발자",skill:"JAVA",birthDate:"11111",career:"1",pay:"1",address:"주우소",inputStatus:"투입중",workableDate:"3"},
                                {name: "새대갈2", number:"01010101010",job_type:"개발자",skill:"JAVA",birthDate:"11111",career:"1",pay:"1",address:"주우소",inputStatus:"투입중",workableDate:"3"},
                                {name: "새대갈3", number:"01010101010",job_type:"개발자",skill:"JAVA",birthDate:"11111",career:"1",pay:"1",address:"주우소",inputStatus:"투입중",workableDate:"3"},
                                {name: "새대갈4", number:"01010101010",job_type:"개발자",skill:"JAVA",birthDate:"11111",career:"1",pay:"1",address:"주우소",inputStatus:"투입중",workableDate:"3"},
                                {name: "새대갈5", number:"01010101010",job_type:"개발자",skill:"JAVA",birthDate:"11111",career:"1",pay:"1",address:"주우소",inputStatus:"투입중",workableDate:"3"},
                                {name: "새대갈6", number:"01010101010",job_type:"개발자",skill:"JAVA",birthDate:"11111",career:"1",pay:"1",address:"주우소",inputStatus:"투입중",workableDate:"3"},
                                {name: "새대갈7", number:"01010101010",job_type:"개발자",skill:"JAVA",birthDate:"11111",career:"1",pay:"1",address:"주우소",inputStatus:"투입중",workableDate:"3"},
                                {name: "새대갈8", number:"01010101010",job_type:"개발자",skill:"JAVA",birthDate:"11111",career:"1",pay:"1",address:"주우소",inputStatus:"투입중",workableDate:"3"},
                                {name: "새대갈9", number:"01010101010",job_type:"개발자",skill:"JAVA",birthDate:"11111",career:"1",pay:"1",address:"주우소",inputStatus:"투입중",workableDate:"3"},
                                {name: "새대갈10", number:"01010101010",job_type:"개발자",skill:"JAVA",birthDate:"11111",career:"1",pay:"1",address:"주우소",inputStatus:"투입중",workableDate:"3"},
                                {name: "새대갈11", number:"01010101010",job_type:"개발자",skill:"JAVA",birthDate:"11111",career:"1",pay:"1",address:"주우소",inputStatus:"투입중",workableDate:"3"},
                                {name: "새대갈12", number:"01010101010",job_type:"개발자",skill:"JAVA",birthDate:"11111",career:"1",pay:"1",address:"주우소",inputStatus:"투입중",workableDate:"3"},
                                {name: "새대갈13", number:"01010101010",job_type:"개발자",skill:"JAVA",birthDate:"11111",career:"1",pay:"1",address:"주우소",inputStatus:"투입중",workableDate:"3"},
                                {name: "새대갈14", number:"01010101010",job_type:"개발자",skill:"JAVA",birthDate:"11111",career:"1",pay:"1",address:"주우소",inputStatus:"투입중",workableDate:"3"},
                                {name: "새대갈15", number:"01010101010",job_type:"개발자",skill:"JAVA",birthDate:"11111",career:"1",pay:"1",address:"주우소",inputStatus:"투입중",workableDate:"3"},
                                {name: "새대갈16", number:"01010101010",job_type:"개발자",skill:"JAVA",birthDate:"11111",career:"1",pay:"1",address:"주우소",inputStatus:"투입중",workableDate:"3"},
                                {name: "새대갈17", number:"01010101010",job_type:"개발자",skill:"JAVA",birthDate:"11111",career:"1",pay:"1",address:"주우소",inputStatus:"투입중",workableDate:"3"},
                                {name: "새대갈18", number:"01010101010",job_type:"개발자",skill:"JAVA",birthDate:"11111",career:"1",pay:"1",address:"주우소",inputStatus:"투입중",workableDate:"3"}


                            ],
*/
                            "items": [],
                            "loading": false,
                            "serverItemsLength": 0,
                            "page": 1,
                            "itemsPerPage": 10,
                            "jobTypeItems": [
                                 {"text":"개발자", "value":"개발자"},
                                 {"text":"기획자", "value":"기획자"},
                                 {"text":"퍼블리셔", "value":"퍼블리셔"},
                                 {"text":"디자이너", "value":"디자이너"}
                             ],
                            "address": [
                                {"text":"서울특별시", "value":0},
                                {"text":"경기도", "value":1},
                                {"text":"대전광역시", "value":2},
                            ],
                            "addressValue": "",
                            "addressIndex": [
                                ["강서구","은평구","광진구","서초구","구로구"],
                                ["김포시","부천","광명","시흥","안양","과천","성남","하남","수원","광주"],
                                ["중구","서구","대덕구","유성구","동구"],
                            ],
                            "addressSelect": [],
                            "career": [
                                {"text":"신입", "value": "0"},
                                {"text":"1년", "value": "1"},
                                {"text":"2년", "value": "2"},
                                {"text":"3년", "value": "3"},
                                {"text":"4년", "value": "4"},
                                {"text":"5년", "value": "5"},
                                {"text":"6년", "value": "6"},
                                {"text":"7년", "value": "7"},
                            ],
                            "checkbox:": [],
                        },
                        "pagination": {
                            "length": 10,
                            "totalVisible": 10
                        },
                        "query": {
                            "id":"",
                            "name": "",
                            "jobType": "",
                            "career": "",
                            "pay": "",
                            "address": "",
                            "inputStatus":"",
                            "birthDate":"",
                            "workableDay":"",
                        },
                        "itemsPerPageItems": [
                            {"text":"3", "value":3},
                            {"text":"5", "value": 5},
                            {"text": "10", "value": 10},
                            {"text": "20", "value": 20},
                            {"text": "30", "value": 30},
                            {"text": "40", "value": 40},
                            {"text": "50", "value": 50}
                        ]
                    }
                };
            },

            "watch": {
                "user.dataTable.addressValue":{
                    "handler": function(value){
                        this.user.dataTable.addressSelect=this.user.dataTable.addressIndex[value];
                    }
                },

/*                "user.dataTable.page": {
                    "handler": function (newValue, oldValue){
                        Promise.resolve()
                            .then(this.setUserInfoList)
                            .then(this.replaceQuery);
                    }
                },
*/
/*                 "user.dataTable.itemsPerPage": {
                    "handler": function (newValue, oldValue) {
                        Promise.resolve()
                            .then(this.setUserInfoList)
                            .then(this.replaceQuery)
                    }
                }
*/
            },
            "methods": {
/*                "addressSelect": function(address){
                    var self = this;
                    if(address.isEqual(self.user.dataTable.address[0])){
                        return "ad1"
                    }else{
                        return "ad2"
                    }
                },
*/
                "editUserInfo": function(value){
                    this.$router.push({
                        "path": "/main/admin/user-info-form",
                        "query": {
                            "id": value.id
                        }
                       });
                },
                "handlePageChange": function (value){
                    return this.currentPage=value;
                },
                "getUserInfoList": function (params) {
                    return axios({
                        "url": "/api/common/user-info",
                        "method": "get",
                        "params": params
                    });
                },

                "setUserInfoList": function () {
                    var self = this;
                    return new Promise(function (resolve, reject) {
                        Promise.resolve()
                            .then(function () {
                                var params = {};
                                params.page = self.user.dataTable.page;
                                params.size = self.user.dataTable.itemsPerPage;
                                params.id = !_.isEmpty(self.user.query.id) ? self.user.query.id : null;
                                params.name = !_.isEmpty(self.user.query.name) ? self.user.query.name : null;
                                params.jobType = !_.isEmpty(self.user.query.jobType) ? self.user.query.jobType : null;
                                params.career = !_.isEmpty(self.user.query.career) ? self.user.query.career : null;
                                params.pay = !_.isEmpty(self.user.query.pay) ? self.user.query.pay : null;
                                params.address = !_.isEmpty(self.user.query.address) ? self.user.query.address : null;
                                params.inputStatus = !_.isEmpty(self.user.query.inputStatus) ? self.user.query.inputStatus : null;
                                self.user.dataTable.loading = true;
                                return self.getUserInfoList(params);
                            })
                            .then(function (response) {
                                var data = response.data;
                                self.user.dataTable.items = data.items;
                                self.user.dataTable.serverItemsLength = data.totalElements;
                                self.user.dataTable.loading = false;
                            })
                            .then(function () { resolve(); });
                    });
                },
                "getQuery": function () {
                    var query = {},
                    routeQuery = this.$route.query;
                    query.id = routeQuery.id ? routeQuery.id : String(this.user.query.id);
                    query.page = routeQuery.page ? routeQuery.page : String(this.user.dataTable.page);
                    query.size = routeQuery.size ? routeQuery.size : String(this.user.dataTable.itemsPerPage);
                    query.name = routeQuery.name ? routeQuery.name : this.user.query.name;
                    query.jobType = routeQuery.jobType ? routeQuery.jobType : this.user.query.jobType;
                    query.career = routeQuery.career ? routeQuery.career : this.user.query.career;
                    query.pay = routeQuery.pay ? routeQuery.pay : this.user.query.pay;
                    query.address = routeQuery.address ? routeQuery.address : this.user.query.address;
                    query.inputStatus=routeQuery.inputStatus ? routeQuery.inputStatus : this.user.query.inputStatus;
                    return query;
                },
                "setQuery": function () {
                    var query = this.getQuery();
                    this.user.query.id = Number(query.id);
                    this.user.dataTable.page = Number(query.page);
                    this.user.dataTable.itemsPerPage = Number(query.size);
                    this.user.query.name = query.name;
                    this.user.query.jobType = query.jobType;
                    this.user.query.career = query.career;
                    this.user.query.pay = query.pay;
                    this.user.query.address = query.address;
                    this.user.query.inputStatus = query.inputStatus;
                },
                "replaceQuery": function () {
                    var query = {},
                    routeQuery = this.$route.query;
                    query.id = String(this.user.query.id);
                    query.page = String(this.user.dataTable.page);
                    query.size = String(this.user.dataTable.itemsPerPage);
                    query.name = String(this.user.query.name);
                    query.jobType = String(this.user.query.jobType);
                    query.career = String(this.user.query.career);
                    query.pay = String(this.user.query.pay);
                    query.address = String(this.user.query.address);
                    query.inputStatus = String(this.user.query.inputStatus);
                    query.workableDay = String(this.user.query.workableDay);
                    if (!_.isEqual(query, routeQuery)) {
                        this.$router.replace({"query": query});
                    }
                },
                "search": function () {
                    var self = this;
                    return new Promise(function (resolve, reject) {
                        Promise.resolve()
                            .then(function () {
                                return self.setUserInfoList();
                            })
                            .then(function () {
                                self.replaceQuery();
                            })
                            .then(function () {
                             resolve();
                         });
                    });
                },
                "reset": function () {
                    var self = this;
                    return new Promise(function (resolve, reject) {
                        Promise.resolve()
                            .then(function () {
                            })
                            .then(function () {
                                self.user.query.name = "";
                                self.user.query.jobType = "";
                                self.user.query.career = "";
                                self.user.query.pay = "";
                                self.user.query.address = "";
                                self.user.query.inputStatus = "";
                            })
                            .then(function () {
                                return self.search();
                            })
                            .then(function () { resolve(); });
                    });
                }
            },
            "mounted": function () {
                Promise.resolve()
                    .then(this.setQuery)
                    .then(this.replaceQuery)
                    .then(this.setUserInfoList);
            }
        });
    });
});