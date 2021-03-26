var ApplyProjectMainComponent;
ApplyProjectMainComponent = Vue.component('applyProject-main-component', async function(resolve) {
    resolve({
        "template": (await axios.get("/vue/page/main/user/apply-project/main.html")).data,
        "data": function() {
            return {
                "data": {
                    "paginationList": [
                        {"text": "5개 보기", "value": 5},
                        {"text": "10개 보기", "value": 10},
                        {"text": "15개 보기", "value": 15},
                        {"text": "20개 보기", "value": 20},
                        {"text": "25개 보기", "value": 25},
                        {"text": "30개 보기", "value": 30},
                        {"text": "전체 보기", "value": null}
                    ],
                },
                "select": {

                },
                "dialog": false,
                "project": {
                    "panels": {
                        "list": [0, 1]
                    },
                    "selected": [],
                    "dataTable": {
                        "headers": [
                            {"text": "프로젝트명", "value": "name"},
                            {"text": "직종", "value": "job"},
                            {"text": "기술", "value": "skill"},
                            {"text": "경력요건", "value": "career"},
                            {"text": "학위요건", "value": "degree"},
                            {"text": "시작기간", "value": "sterm"},
                            {"text": "종료기간", "value": "eterm"},
                            {"text": "장소", "value": "place"},
                            {"text": "필요인원", "value": "prsnl"},
                            {"text": "현황", "value": "status"},
                            {"text": "월급여", "value": "salary"},
                            {"text": "모집마감일", "value": "calc"},
                        ],
                        "query": {
                            "projectName": null,
                            "skill": null,
                            "careerLike": null,
                            "degree": null,
                            "stermStart": null,
                            "stermEnd": null,
                            "etermStart": null,
                            "etermEnd": null,
                            "place": null,
                            "prsnl": null,
                            "status": null,
                            "salary": null
                        },
                        "items": [],
                        "options": {
                            "page": 1,
                            "itemsPerPage": 10,
                        },
                        "loading" : false,
                        "totalRows": 0,
                    },
                }
            };
        },
        "watch": {
            "project.dataTable.options.page": {
                "handler": async function(n ,o) {
                    await this.loadProjectList();
                },
                "deep": true
            },
            "project.dataTable.options.itemsPerPage": {
                "handler": async function(n, o) {
                    this.project.dataTable.options.page = 1;
                    await this.loadProjectList();
                },
                "deep": true
            },
        },
        "methods": {
            "handleClick": function(value) {
                this.$router.push({
                    "path": "/main/user/apply-project/detail",
                    "query": {
                        "id": value.adminProjId
                    }
                });
            },
            "init": async function() {
                await this.loadProjectList();
            },
            "loadProjectList": async function() {
                let self = this, projectList;

                self.project.dataTable.loading = true;

                projectList = (await ito.api.common.project.getProjectList({
                    "page": self.project.dataTable.options.page,
                    "rowSize": self.project.dataTable.options.itemsPerPage,

                    "nameLike": self.project.dataTable.query.projectName,
                    "stermStart": self.project.dataTable.query.stermStart,
                    "prsnl": self.project.dataTable.query.prsnl,
                    "salary": self.project.dataTable.query.salary,
                })).data;

                self.project.dataTable.totalRows = projectList.totalRows;
                self.project.dataTable.items = projectList.items;
                self.project.dataTable.loading = false;
            },
            "searchProjectList": async function() {
                this.loadProjectList();
            },
            "initialize": async function() {
                let self = this;

                self.project.dataTable.query.projectName = null;
                self.project.dataTable.query.skill = null;
                self.project.dataTable.query.careerLike = null;
                self.project.dataTable.query.degree = null;
                self.project.dataTable.query.stermStart = null;
                self.project.dataTable.query.place = null;
                self.project.dataTable.query.prsnl = null;
                self.project.dataTable.query.status = null;
                self.project.dataTable.query.salary = null;
            },
        },
        "mounted": function() {
            this.init();
        }
    });
});