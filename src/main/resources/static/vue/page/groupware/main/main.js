var GroupwareMainPage;
GroupwareMainPage = Vue.component('groupware-main-page', async function (resolve) {
    resolve({
        "template": (await axios.get("/vue/page/groupware/main/main.html")).data,
        "data": function() {
            return {
                "calendar": {
                    "panels": {
                        "list": [0]
                    },
                    "selectedEvent": {},
                    "selectedElement": null,
                    "selectedOpen": false,
                    "events": [],
                    "names": [],
                    "move": '',
                },
                "dialogVacation": {
                    "visible": false,
                    "title": "휴가 신청서",
                    "data": {}
                }
            };
        },
        "methods": {
            "prevCalendar": function() {
                this.$refs.calendar.prev();
            },
            "nextCalendar": function() {
                this.$refs.calendar.next();
            },
            "showEvent": async function({nativeEvent, event}) {
                let self = this;
                if(this.calendar.selectedOpen) {
                    self.calendar.selectedOpen = false;
                    await setTimeout(()=>{
                        self.calendar.selectedOpen = true;
                    },10);
                }else {
                    self.calendar.selectedOpen = true;
                }
                event.term = event.start + " ~ " + event.end;
                self.calendar.selectedEvent = event;
                self.calendar.selectedElement = nativeEvent.target;
                nativeEvent.stopPropagation();
            },
            "loadCalendar": async function({start, end}) {
                await this.getVacationList({start, end});
                await this.getNoticeList({start});
            },
            "getVacationList": async function({start, end}) {
                let userName, color, step, vacationList;
                vacationList = (await ito.api.app.vacation.getVacationList({
                    "rowSize": 100000000,
                    "sterm": start.date,
                    "eterm": end.date
                })).data.items;

                this.calendar.events = [];
                for(let i=0; i<vacationList.length; i++) {
                    step = (await ito.api.app.approval.getApproval(vacationList[i].id)).data.step;
                    if(step !== 3) continue;

                    userName = (await ito.api.common.user.getUser(vacationList[i].userId)).data.username;
                    switch(vacationList[i].type) {
                        case "M":
                            color="green";
                            vacationList[i].type = "월차";
                            break;
                        case "O":
                            color="deep-purple";
                            vacationList[i].type = "반차";
                            break;
                        case "S":
                            color="grey darken-1";
                            vacationList[i].type = "병가";
                            break;
                        case "E":
                            color="orange";
                            vacationList[i].type = "기타";
                            break;
                    }

                    this.calendar.events.push({
                        "name": userName,
                        "type": vacationList[i].type,
                        "start": vacationList[i].sterm,
                        "end": vacationList[i].eterm,
                        "color": color,
                        "sep": "휴가"
                    });
                }
            },
            "getNoticeList": async function ({start}) {
                let noticeList;
                noticeList = (await ito.api.app.notice.getNoticeList({
                    "rowSize": 100000000,
                    "postingDate": start.date,
                })).data.items;

                for(let i=0; i<noticeList.length; i++) {
                    this.calendar.events.push({
                        "name": noticeList[i].title,
                        "contents": noticeList[i].contents,
                        "start": noticeList[i].postingDate,
                        "end": noticeList[i].postingDate,
                        "color": "red",
                        "sep": "공지사항"
                    });
                }
            },
            "saveNotice": async function(data) {
                console.log(data);
                data.userId = store.state.app.user.id;
                if(await ito.confirm("저장하시겠습니까?")) {
                    await ito.api.app.vacation.createVacation(data);
                    await ito.alert("저장되었습니다.");

                    this.loadCalendar();
                }
            },
            "registerNotice": function() {
                this.$router.push({
                    "path": "/groupware/notices/details"
                });
            },
            "openVacationDialog": function() {
                this.dialogVacation.data = {};
                this.dialogVacation.visible = true;
            }
        },
    });
});