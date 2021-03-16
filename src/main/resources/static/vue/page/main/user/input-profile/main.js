var InputProfileMainComponent;
InputProfileMainComponent = Vue.component('inputProfile-main-component', async function(resolve) {
    resolve({
        "template": (await axios.get("/vue/page/main/user/input-profile/main.html")).data,
        "data": function () {
            return {
                "inputProfile": {
                    "panels": {
                        "form": [0]
                    },
                    "form": {
                        "item": {
                            "name": null,
                            "birth": null,
                            "email": null,
                            "career": null,
                            "job": null,
                            "skill": null,
                        },
                    },
                    "skill": ["test1", "test2", "test3", "test4", "test5"],
                    "open": { "show": null }
                },
                "postcode": '',
                "address": '',
                "detailAddress": '',
                "extraAddress": '',
            };
        },
        "computed": {
        },
        "watch": {
        },
        "methods": {
            "setProfile": async function(queryId) {
                var self = this;
                return new Promise(function (resolve, reject) {
                    Promise.resolve()
                        .then(function() {
                            return ito.api.common.profile.getProfile(queryId);
                        })
                        .then(function (response) {
                            self.inputProfile.form.item = response.data;
                        })
                        .then(function() { resolve(); });
                });
            },
            "createProfile": function (data) {
                return axios({
                    "url": "/api/common/profiles",
                    "method": "post",
                    "data": data
                });
            },
            "saveProfile": async function () {
                var self = this;
                if(await util.confirm({"text": "저장하시겠습니까?"})) {
                    var data = self.inputProfile.form.item;
                    self.createProfile(data);
                    await util.alert({"text": "저장되었습니다."});
                }
            },
            "execDaumPostcode": function() {
                var self = this;
                new daum.Postcode({
                    "onComplete": function(data) {
                        if (data.userSelectedType === 'R') self.address = data.roadAddress;
                        else self.address = data.jibunAddress;

                        if (data.userSelectedType === 'R') {
                            if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                                self.extraAddress += data.bname;
                            }
                            if (data.buildingName !== '' && data.apartment === 'Y') {
                                self.extraAddress += (self.extraAddress !== '' ? ', ' + data.buildingName : data.buildingName);
                            }
                            if (self.extraAddress !== '') {
                                self.extraAddress =  ' (' + self.extraAddress + ')';
                            }
                        } else {
                            self.extraAddress = '';
                        }
                        self.postcode = data.zonecode;
                        self.$refs.detailAddress.focus();
                    },
                }).open();
            },
            "profileList": function() {
                this.$router.push({
                    "path": "/main/user/profiles",
                });
            },
        },
        "mounted": function() {
            var queryId = this.$route.query.id;
            if(queryId != undefined && queryId != null) {
                Promise.resolve()
                    .then(this.setProfile(queryId),
                    );
            }
        }
    });
});