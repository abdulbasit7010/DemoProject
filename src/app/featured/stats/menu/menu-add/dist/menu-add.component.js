"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MenuAddComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var animations_1 = require("@app/animations");
var environment_1 = require("@env/environment");
var MenuAddComponent = /** @class */ (function () {
    function MenuAddComponent(router, fb, allService, alert) {
        this.router = router;
        this.fb = fb;
        this.allService = allService;
        this.alert = alert;
        this.filteredServiceCode = [];
        this.showProtocolDropDown = true;
        this.showEsmeDropDown = false;
        this.is_normal_model = true;
        this.is_whitelist_model = false;
        this.displayLoader = false;
        this.jsonStructureChangeChecker = false;
        this.d3TreeWidth = 0;
        this.d3TreeHeight = 0;
        this.menu_form_div = "block";
        this.sub_menu_div = "none";
        this.mainJson = [];
        this.showCurrentParent = "";
        this.currentParent = "";
        this.obj = {};
        this.serviceCode = new forms_1.FormControl("", [forms_1.Validators.required]);
        this.filteredServiceCodeControl = new forms_1.FormControl(0, [
            forms_1.Validators.required,
        ]);
        this.selectTreeType = new forms_1.FormControl(0, [forms_1.Validators.required]);
        this.menu_title = new forms_1.FormControl("", [forms_1.Validators.required]);
        this.menu_press_option = new forms_1.FormControl("", [
            forms_1.Validators.required,
        ]);
        this.menu_has_menu = new forms_1.FormControl(false, [forms_1.Validators.required]);
        this.menu_action_id = new forms_1.FormControl("", [forms_1.Validators.required]);
        this.sub_title = new forms_1.FormControl("", [forms_1.Validators.required]);
        this.sub_press_option = new forms_1.FormControl("", [
            forms_1.Validators.required,
        ]);
        this.sub_has_menu = new forms_1.FormControl(false, [forms_1.Validators.required]);
        this.sub_action_id = new forms_1.FormControl("", [forms_1.Validators.required]);
        this.menu_sms_text = new forms_1.FormControl(false, [forms_1.Validators.required]);
        this.menu_optional_sms = new forms_1.FormControl(" ", [forms_1.Validators.required]);
        this.sub_sms_text = new forms_1.FormControl(false, [forms_1.Validators.required]);
        this.sub_optional_sms = new forms_1.FormControl(" ", [forms_1.Validators.required]);
        this.menu_is_chargeable = new forms_1.FormControl(false, [
            forms_1.Validators.required,
        ]);
        this.menu_amount = new forms_1.FormControl(0, [forms_1.Validators.required]);
        this.sub_is_chargeable = new forms_1.FormControl(false, [
            forms_1.Validators.required,
        ]);
        this.sub_charge_type = new forms_1.FormControl(0, [forms_1.Validators.required]);
        this.menu_charge_type = new forms_1.FormControl(0, [forms_1.Validators.required]);
        this.menu_take_user_input = new forms_1.FormControl(false, [
            forms_1.Validators.required,
        ]);
        this.sub_take_user_input = new forms_1.FormControl(false, [
            forms_1.Validators.required,
        ]);
        this.menu_is_transferable = new forms_1.FormControl(false, [
            forms_1.Validators.required,
        ]);
        this.sub_is_transferable = new forms_1.FormControl(false, [
            forms_1.Validators.required,
        ]);
        this.menu_service_code_flow = new forms_1.FormControl(0, [
            forms_1.Validators.required,
        ]);
        this.sub_service_code_flow = new forms_1.FormControl(0, [
            forms_1.Validators.required,
        ]);
        this.menu_transfer_ussdString = new forms_1.FormControl("null", [
            forms_1.Validators.required,
        ]);
        this.sub_transfer_ussdString = new forms_1.FormControl("null", [
            forms_1.Validators.required,
        ]);
        this.menu_user_input = new forms_1.FormControl(" ", [forms_1.Validators.required]);
        this.sub_user_input = new forms_1.FormControl(" ", [forms_1.Validators.required]);
        this.whiteListGroupChecker = false;
        this.whiteListgroup = [];
        this.menu_esme_protocol = new forms_1.FormControl("", [forms_1.Validators.required]);
        this.sub_esme_protocol = new forms_1.FormControl("", [forms_1.Validators.required]);
        this.white_list_group_id = new forms_1.FormControl(0, [forms_1.Validators.required]);
        this.sub_amount = new forms_1.FormControl(0, [forms_1.Validators.required]);
        this.menu_is_package_code = new forms_1.FormControl(false, [
            forms_1.Validators.required,
        ]);
        this.sub_is_package_code = new forms_1.FormControl(false, [
            forms_1.Validators.required,
        ]);
        this.menu_package_code_text = new forms_1.FormControl(" ", [
            forms_1.Validators.required,
        ]);
        this.sub_package_code_text = new forms_1.FormControl(" ", [
            forms_1.Validators.required,
        ]);
        this.menu_is_3p_num = new forms_1.FormControl(false, [forms_1.Validators.required]);
        this.sub_is_3p_num = new forms_1.FormControl(false, [forms_1.Validators.required]);
        this.menu_is_consent = new forms_1.FormControl(false, [forms_1.Validators.required]);
        this.sub_is_consent = new forms_1.FormControl(false, [forms_1.Validators.required]);
        this.menu_consent_text = new forms_1.FormControl(" ", [forms_1.Validators.required]);
        this.sub_consent_text = new forms_1.FormControl(" ", [forms_1.Validators.required]);
        this.menu_is_root = new forms_1.FormControl(false, [forms_1.Validators.required]);
        this.sub_is_root = new forms_1.FormControl(false, [forms_1.Validators.required]);
        this.isEditable = true;
        this.serviceCodes = [];
        this.esmeConfig = [];
        this.normalflowCodes = [];
        this.normalFlowCodesDtmf = [];
        this.isUpdate = false;
        this.nodeForDlt = {};
        this.getTransferableData = [];
        this.outputJson = new core_1.EventEmitter();
        this.chargeable_types = [
            { name: "Session Based", id: 1 },
            { name: "Event Based", id: 2 },
            { name: "Time Based", id: 3 },
        ];
        this.treeType = ["Normal", "WhiteList"];
        this.protocolNames = [
            { id: 1, name: "smpp" },
            { id: 2, name: "http" },
        ];
        this.counter = 0;
        this.getPathCounter = 0;
        this.validateMenuForm();
        this.validateSubMenuForm();
        this.validateStartForm();
    }
    MenuAddComponent.prototype.ngOnInit = function () {
        if (history.state.name === "editMenu") {
            this.mainJson = history.state.data.press_options;
        }
        this.lengthJson = this.mainJson.length;
        this.getCodes();
        this.getWhiteListGroups();
        this.mainJson.push({
            press_options: []
        });
        if (!history.state.data) {
            this.showShorCodeModal();
        }
        //  this.menuCheck(this.serviceCode.value.menu_has_menu, true);
    };
    MenuAddComponent.prototype.getWhiteListGroups = function () {
        var _this = this;
        this.allService.getWhiteListGroups().subscribe(function (res) {
            if (!res.success) {
                _this.alert.danger("Unable to fetch white list group");
                return false;
            }
            _this.whiteListgroup = res.data.data;
            console.log("this.whiteListgroup", _this.whiteListgroup);
        }, function (error) {
            _this.alert.danger("Unable to fetch white list group");
        });
    };
    MenuAddComponent.prototype.changeWhiteListGroup = function (id) {
        console.log(this.startForm.value.white_list_group_id);
    };
    MenuAddComponent.prototype.validateStartForm = function () {
        this.startForm = this.fb.group({
            serviceCode: this.serviceCode,
            filteredServiceCodeControl: this.filteredServiceCodeControl,
            white_list_group_id: this.white_list_group_id,
            selectTreeType: this.selectTreeType
        });
    };
    MenuAddComponent.prototype.validateMenuForm = function () {
        this.menuForm = this.fb.group({
            menu_title: this.menu_title,
            menu_take_user_input: this.menu_take_user_input,
            menu_user_input: this.menu_user_input,
            menu_press_option: this.menu_press_option,
            menu_has_menu: this.menu_has_menu,
            menu_action_id: this.menu_action_id,
            menu_sms_text: this.menu_sms_text,
            menu_optional_sms: this.menu_optional_sms,
            menu_is_chargeable: this.menu_is_chargeable,
            menu_amount: this.menu_amount,
            menu_charge_type: this.menu_charge_type,
            menu_is_transferable: this.menu_is_transferable,
            menu_service_code_flow: this.menu_service_code_flow,
            menu_transfer_ussdString: this.menu_transfer_ussdString,
            menu_esme_protocol: this.menu_esme_protocol,
            menu_is_package_code: this.menu_is_package_code,
            menu_package_code_text: this.menu_package_code_text,
            menu_is_3p_num: this.menu_is_3p_num,
            menu_is_consent: this.menu_is_consent,
            menu_consent_text: this.menu_consent_text,
            menu_is_root: this.menu_is_root
        });
    };
    MenuAddComponent.prototype.validateSubMenuForm = function () {
        this.subMenuForm = this.fb.group({
            sub_title: this.sub_title,
            sub_take_user_input: this.sub_take_user_input,
            sub_user_input: this.sub_user_input,
            sub_press_option: this.sub_press_option,
            sub_action_id: this.sub_action_id,
            sub_has_menu: this.sub_has_menu,
            sub_sms_text: this.sub_sms_text,
            sub_optional_sms: this.sub_optional_sms,
            sub_is_chargeable: this.sub_is_chargeable,
            sub_amount: this.sub_amount,
            sub_charge_type: this.sub_charge_type,
            sub_is_transferable: this.sub_is_transferable,
            sub_service_code_flow: this.sub_service_code_flow,
            sub_transfer_ussdString: this.sub_transfer_ussdString,
            sub_esme_protocol: this.sub_esme_protocol,
            sub_is_package_code: this.sub_is_package_code,
            sub_package_code_text: this.sub_package_code_text,
            sub_is_3p_num: this.sub_is_3p_num,
            sub_is_consent: this.sub_is_consent,
            sub_consent_text: this.sub_consent_text,
            sub_is_root: this.sub_is_root
        });
    };
    // _keydown(event: any) {
    //   if (
    //     !(
    //       /^[0-9]+$/.test(event.key) ||
    //       event.key == "Tab" ||
    //       event.key == "Backspace"
    //     )
    //   ) {
    //     // invalid character, prevent input
    //     event.preventDefault();
    //   }
    // }
    MenuAddComponent.prototype.updateField = function (value) {
        //this.menuForm.controls["menu_action_id"].setValue(0);
        this.esmeConfig = [];
        console.log("value", value);
        if (value == 1) {
            this.showEsmeDropDown = true;
            this.getEsmeConfig(value);
        }
        else if (value == 2) {
            this.showEsmeDropDown = true;
            this.getEsmeConfig(value);
        }
        else {
            this.showEsmeDropDown = false;
        }
    };
    MenuAddComponent.prototype.menuCheck = function (value, checker) {
        console.log(value);
        if (value) {
            this.showEsmeDropDown = false;
            this.menuForm.controls["menu_action_id"].setValue(0);
            this.menuForm.controls["menu_esme_protocol"].setValue(0);
            this.subMenuForm.controls["sub_action_id"].setValue(0);
            this.subMenuForm.controls["sub_esme_protocol"].setValue(0);
            this.menuForm.controls["menu_is_package_code"].setValue(false);
            this.subMenuForm.controls["sub_is_package_code"].setValue(false);
            this.packageCodeCheck(false);
        }
        else {
            this.menuForm.controls["menu_action_id"].setValue(null);
            this.menuForm.controls["menu_esme_protocol"].setValue(null);
            this.subMenuForm.controls["sub_action_id"].setValue(null);
            this.subMenuForm.controls["sub_esme_protocol"].setValue(null);
        }
        // this.menuForm.controls[""]
    };
    MenuAddComponent.prototype.chargeCheck = function (value) {
        console.log("value");
        if (value) {
            this.menuForm.controls["menu_amount"].setValue(null);
            this.menuForm.controls["menu_charge_type"].setValue(null);
            this.subMenuForm.controls["sub_amount"].setValue(null);
            this.subMenuForm.controls["sub_charge_type"].setValue(null);
            return;
        }
        this.menuForm.controls["menu_amount"].setValue(0);
        this.menuForm.controls["menu_charge_type"].setValue(0);
        this.subMenuForm.controls["sub_amount"].setValue(0);
        this.subMenuForm.controls["sub_charge_type"].setValue(0);
    };
    MenuAddComponent.prototype.messageCheck = function (value) {
        // console.log("value", this.subMenuForm.value.sub_take_user_input);
        if (value) {
            this.menuForm.controls["menu_optional_sms"].setValue(null);
            this.subMenuForm.controls["sub_optional_sms"].setValue(null);
            return;
        }
        this.menuForm.controls["menu_optional_sms"].setValue(" ");
        this.subMenuForm.controls["sub_optional_sms"].setValue(" ");
    };
    MenuAddComponent.prototype.userInputCheck = function (value) {
        console.log("value", this.subMenuForm.value.sub_take_user_input);
        if (value) {
            this.menuForm.controls["menu_user_input"].setValue(null);
            this.subMenuForm.controls["sub_user_input"].setValue(null);
            return;
        }
        this.menuForm.controls["menu_user_input"].setValue(" ");
        this.subMenuForm.controls["sub_user_input"].setValue(" ");
        this.menuForm.controls["menu_is_consent"].setValue(false);
        this.subMenuForm.controls["sub_is_consent"].setValue(false);
        this.consentCheck(false);
    };
    MenuAddComponent.prototype.packageCodeCheck = function (value) {
        console.log("value", this.menuForm.value.menu_is_package_code);
        console.log("value", this.subMenuForm.value.sub_is_package_code);
        if (value) {
            this.menuForm.controls["menu_package_code_text"].setValue(null);
            this.subMenuForm.controls["sub_package_code_text"].setValue(null);
            this.menuForm.controls["menu_is_3p_num"].setValue(false);
            this.subMenuForm.controls["sub_is_3p_num"].setValue(false);
            return;
        }
        this.menuForm.controls["menu_package_code_text"].setValue(" ");
        this.subMenuForm.controls["sub_package_code_text"].setValue(" ");
        this.menuForm.controls["menu_is_3p_num"].setValue(false);
        this.subMenuForm.controls["sub_is_3p_num"].setValue(false);
    };
    MenuAddComponent.prototype.consentCheck = function (value) {
        if (value) {
            this.menuForm.controls["menu_consent_text"].setValue(null);
            this.subMenuForm.controls["sub_consent_text"].setValue(null);
            return;
        }
        this.menuForm.controls["menu_consent_text"].setValue(" ");
        this.subMenuForm.controls["sub_consent_text"].setValue(" ");
    };
    MenuAddComponent.prototype.getSubNormalFlowCode = function (value) {
        console.log("value", value);
        this.getTransferable();
        if (value) {
            this.subMenuForm.controls["sub_has_menu"].setValue(false);
            this.subMenuForm.controls["sub_action_id"].setValue(0);
            this.subMenuForm.controls["sub_esme_protocol"].setValue(0);
            this.subMenuForm.controls["sub_service_code_flow"].setValue(null);
            this.subMenuForm.controls["sub_transfer_ussdString"].setValue(null);
            this.showEsmeDropDown = false;
        }
        else {
            this.subMenuForm.controls["sub_service_code_flow"].setValue(0);
            this.subMenuForm.controls["sub_transfer_ussdString"].setValue("null");
            this.subMenuForm.controls["sub_action_id"].setValue(null);
            this.subMenuForm.controls["sub_esme_protocol"].setValue(null);
            this.subMenuForm.controls["sub_is_root"].setValue(false);
        }
    };
    MenuAddComponent.prototype.routeCheck = function (value) {
        // this.subMenuForm.controls["sub_service_code_flow"].setValue("null");
        // this.menuForm.controls["menu_service_code_flow"].setValue("null");
        if (value) {
            this.subMenuForm.controls["sub_transfer_ussdString"].setValue("null");
            this.menuForm.controls["menu_transfer_ussdString"].setValue("null");
            this.normalflowCodes = this.getTransferableData;
        }
        else {
            this.subMenuForm.controls["sub_transfer_ussdString"].setValue(null);
            this.menuForm.controls["menu_transfer_ussdString"].setValue(null);
            this.normalflowCodes = this.getTransferableData.filter(function (x) {
                return x.is_whitelist != 0 || x.is_normal != 0;
            });
        }
    };
    MenuAddComponent.prototype.getTransferable = function () {
        var _this = this;
        var spliced;
        this.allService
            .getNormalFlowCodes(this.currentTreeSelectionMaintainer == 2 ? 1 : 0)
            .subscribe({
            next: function (res) {
                if (!res.success) {
                    _this.alert.danger(res.message);
                    return false;
                }
                console.log("this.startForm.value.serviceCode.id", _this.startForm.value.serviceCode.id);
                console.log("res.data", res.data);
                _this.getTransferableData = res.data;
                _this.normalflowCodes = _this.getTransferableData.filter(function (x) {
                    return x.is_whitelist != 0 || x.is_normal != 0;
                });
                console.log("this.normalflowCodes", _this.normalflowCodes);
            },
            error: function (e) {
                console.log("Error===========>", e);
            }
        });
    };
    MenuAddComponent.prototype.getTransferableMenuList = function (whitelist, id, root) {
        var _this = this;
        var spliced;
        this.allService.getNormalFlowCodes(whitelist == true ? 1 : 0).subscribe({
            next: function (res) {
                if (!res.success) {
                    _this.alert.danger(res.message);
                    return false;
                }
                console.log("this.startForm.value.serviceCode.id", id);
                console.log("res.data", res.data);
                _this.getTransferableData = res.data;
                _this.normalflowCodes = _this.getTransferableData.filter(function (x) {
                    return x.is_whitelist != 0 || x.is_normal != 0;
                });
                _this.routeCheck(root == 0 ? false : true);
                console.log("this.normalflowCodes", _this.normalflowCodes);
            },
            error: function (e) {
                console.log("Error===========>", e);
            }
        });
    };
    MenuAddComponent.prototype.getNormalFlowCodes = function (value) {
        console.log("value", value);
        this.getTransferable();
        if (value) {
            this.menuForm.controls["menu_has_menu"].setValue(false);
            this.menuForm.controls["menu_action_id"].setValue(0);
            this.menuForm.controls["menu_esme_protocol"].setValue(0);
            this.menuForm.controls["menu_service_code_flow"].setValue(null);
            this.menuForm.controls["menu_transfer_ussdString"].setValue(null);
            this.showEsmeDropDown = false;
        }
        else {
            this.menuForm.controls["menu_service_code_flow"].setValue(0);
            this.menuForm.controls["menu_transfer_ussdString"].setValue("null");
            this.menuForm.controls["menu_action_id"].setValue(null);
            this.menuForm.controls["menu_esme_protocol"].setValue(null);
            this.menuForm.controls["menu_is_root"].setValue(false);
        }
    };
    MenuAddComponent.prototype.serviceCodeFlowCodes = function (event) {
        var _this = this;
        if (this.menuForm.value.menu_is_root) {
            var root_dtmf = this.getTransferableData.filter(function (x) {
                if (x.id == _this.menuForm.value.menu_service_code_flow) {
                    return x.short_code;
                }
            });
            this.menuForm.controls["menu_transfer_ussdString"].setValue(root_dtmf[0].short_code);
        }
        console.log(this.menuForm.value.menu_service_code_flow);
        this.normalFlowCodesDtmf = [];
        this.allService
            .getDtmfsById(this.menuForm.value.menu_service_code_flow, this.currentTreeSelectionMaintainer == 2 ? 1 : 0)
            .subscribe({
            next: function (res) {
                if (!res.success) {
                    _this.alert.danger(res.message);
                    return false;
                }
                if (res.data.length > 0) {
                    for (var _i = 0, _a = res.data; _i < _a.length; _i++) {
                        var i = _a[_i];
                        var push = {
                            unModified: i,
                            modified: i.replace(/\+/g, "*")
                        };
                        push.modified = push.modified.includes("wl-")
                            ? push.modified.slice(3)
                            : push.modified;
                        _this.normalFlowCodesDtmf.push(push);
                    }
                }
                // this.normalFlowCodesDtmf = res.data;
                console.log(_this.normalFlowCodesDtmf);
            },
            error: function (e) {
                console.log("Error===========>", e);
            }
        });
    };
    MenuAddComponent.prototype.subServiceCodeFlowCodes = function () {
        var _this = this;
        if (this.subMenuForm.value.sub_is_root) {
            var root_dtmf = this.getTransferableData.filter(function (x) {
                if (x.id == _this.subMenuForm.value.sub_service_code_flow) {
                    return x.short_code;
                }
            });
            this.subMenuForm.controls["sub_transfer_ussdString"].setValue(root_dtmf[0].short_code);
        }
        console.log(this.subMenuForm.value.sub_service_code_flow);
        this.normalFlowCodesDtmf = [];
        this.allService
            .getDtmfsById(this.subMenuForm.value.sub_service_code_flow, this.currentTreeSelectionMaintainer == 2 ? 1 : 0)
            .subscribe({
            next: function (res) {
                if (!res.success) {
                    _this.alert.danger(res.message);
                    return false;
                }
                if (res.data.length > 0) {
                    for (var _i = 0, _a = res.data; _i < _a.length; _i++) {
                        var i = _a[_i];
                        var push = {
                            unModified: i,
                            modified: i.replace(/\+/g, "*")
                        };
                        push.modified = push.modified.includes("wl-")
                            ? push.modified.slice(3)
                            : push.modified;
                        _this.normalFlowCodesDtmf.push(push);
                    }
                }
                console.log(_this.normalFlowCodesDtmf);
            },
            error: function (e) {
                console.log("Error===========>", e);
            }
        });
    };
    MenuAddComponent.prototype.getEsmeConfig = function (value) {
        var _this = this;
        this.allService.getHttpSmppConf(value).subscribe({
            next: function (res) {
                if (!res.success) {
                    _this.alert.danger(res.message);
                    return false;
                }
                if (res.data.data.length > 0) {
                    _this.esmeConfig = res.data.data;
                }
                console.log("this.esmeConfig", _this.esmeConfig);
            },
            error: function (e) {
                console.log("Error===========>", e);
            }
        });
    };
    MenuAddComponent.prototype.getCodes = function () {
        var _this = this;
        this.allService.getServiceCodesList().subscribe({
            next: function (res) {
                if (res.success != true) {
                    alert(res.message);
                    return false;
                }
                _this.allServiceCode = res.data;
                var serviceData = res.data.filter(function (value) {
                    if (value.has_menu)
                        return value;
                });
                var finalData = serviceData.filter(function (value) {
                    if (!value.is_whitelist || !value.is_normal)
                        return value;
                });
                _this.serviceCodes = finalData;
            },
            error: function (e) {
                console.log("Error=========>", e);
            }
        });
    };
    MenuAddComponent.prototype.getFilteredServiceCode = function (serviceCodes) {
        console.log("this.currentTreeSelectionMaintainer", this.currentTreeSelectionMaintainer);
        this.filteredServiceCode = [];
        var data = serviceCodes;
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var x = data_1[_i];
            if (this.currentTreeSelectionMaintainer == 1) {
                if (x.is_normal == 1) {
                    this.filteredServiceCode.push(x);
                }
            }
            if (this.currentTreeSelectionMaintainer == 2) {
                if (this.startForm.value.selectTreeType == "Normal") {
                    if (x.is_normal == 1) {
                        this.filteredServiceCode.push(x);
                    }
                }
                if (this.startForm.value.selectTreeType == "WhiteList") {
                    if (x.is_whitelist == 1) {
                        this.filteredServiceCode.push(x);
                    }
                }
            }
        }
    };
    MenuAddComponent.prototype.getWhiteTreeTypeServiceCode = function (treeType) {
        this.filteredServiceCode = [];
        this.startForm.controls["filteredServiceCodeControl"].setValue(null);
        console.log("TreeType", treeType);
        var data = this.allServiceCode;
        for (var _i = 0, data_2 = data; _i < data_2.length; _i++) {
            var x = data_2[_i];
            if (treeType == "Normal") {
                if (x.is_normal == 1) {
                    this.filteredServiceCode.push(x);
                }
            }
            if (treeType == "WhiteList") {
                if (x.is_whitelist == 1) {
                    this.filteredServiceCode.push(x);
                }
            }
        }
        console.log("this.filteredServiceCode ", this.filteredServiceCode);
    };
    MenuAddComponent.prototype.cloneTree = function ($event) {
        console.log("clone", $event.checked);
        console.log("this.is_whitelist_checker", this.is_whitelist_checker);
        console.log("this.is_normal_checker", this.is_normal_checker);
        if ($event.checked) {
            this.cloneChecker = true;
            this.startForm.controls["filteredServiceCodeControl"].setValue(null);
            this.startForm.controls["selectTreeType"].setValue("Normal");
            this.getFilteredServiceCode(this.allServiceCode);
        }
        else {
            this.cloneChecker = false;
            this.startForm.controls["filteredServiceCodeControl"].setValue(0);
            this.startForm.controls["selectTreeType"].setValue(0);
            this.filteredServiceCode = [];
            this.mainJson[0].press_options = [];
        }
    };
    MenuAddComponent.prototype.changeFilteredServiceCode = function (value) {
        var _this = this;
        console.log("value", value);
        if (this.currentTreeSelectionMaintainer == 2) {
            this.allService
                .getMenuById(value.id, this.startForm.value.selectTreeType == "WhiteList" ? true : false)
                .subscribe(function (res) {
                console.log("res", res);
                _this.convertToJson(res.data);
            });
            return;
        }
        this.allService.getMenuById(value.id, false).subscribe(function (res) {
            console.log("res", res);
            _this.convertToJson(res.data);
        });
    };
    // Choose service code using select dropdown
    MenuAddComponent.prototype.changeServiceCode = function (e) {
        console.log("e", e);
        this.forwhite = false;
        this.fornormal = false;
        var shortcode = this.serviceCodes.filter(function (obj) { return obj.id == e.id; });
        this.serviceCodeNumber = shortcode[0].short_code;
        this.serviceCodeId = e.id;
        if (!e.is_whitelist && !e.is_normal) {
            this.whiteListGroupChecker = false;
            this.startForm.controls["white_list_group_id"].setValue(0);
            this.is_normal_checker = true;
            this.currentTreeSelectionMaintainer = 1;
            this.is_whitelist_checker = false;
            this.menuWhiteListChecker = false;
        }
        if (e.is_whitelist && !e.is_normal) {
            this.whiteListGroupChecker = false;
            this.startForm.controls["white_list_group_id"].setValue(0);
            this.is_whitelist_checker = true;
            this.is_normal_checker = true;
            this.forwhite = true;
            this.menuWhiteListChecker = false;
            this.currentTreeSelectionMaintainer = 1;
        }
        if (!e.is_whitelist && e.is_normal) {
            this.whiteListGroupChecker = true;
            this.startForm.controls["white_list_group_id"].setValue(null);
            this.is_whitelist_checker = true;
            this.is_normal_checker = true;
            this.fornormal = true;
            this.menuWhiteListChecker = true;
            this.currentTreeSelectionMaintainer = 2;
        }
        console.log("this.currentTreeSelectionMaintainer", this.currentTreeSelectionMaintainer);
        if (this.fornormal) {
            this.radio_Button_Checker = "is_whitelist";
        }
        else if (this.forwhite) {
            this.radio_Button_Checker = "is_normal";
        }
        else {
            this.radio_Button_Checker = "is_normal";
        }
        this.getTransferable();
        console.log("this.is_whitelist_checker", this.is_whitelist_checker);
        console.log("this.is_normal_checker", this.is_normal_checker);
    };
    MenuAddComponent.prototype.changeRadio = function (e) {
        console.log("e", e);
        if (this.is_whitelist_checker && this.is_normal_checker) {
            return false;
        }
        if (e == "is_whitelist") {
            this.whiteListGroupChecker = true;
            this.startForm.controls["white_list_group_id"].setValue(null);
            this.is_whitelist_checker = true;
            this.is_normal_checker = false;
            this.menuWhiteListChecker = true;
            this.serviceCodeNumber = "wl-" + this.serviceCodeNumber;
            this.currentTreeSelectionMaintainer = 2;
        }
        if (e == "is_normal") {
            this.whiteListGroupChecker = false;
            this.startForm.controls["white_list_group_id"].setValue(0);
            this.is_whitelist_checker = false;
            this.is_normal_checker = true;
            this.menuWhiteListChecker = false;
            this.currentTreeSelectionMaintainer = 1;
        }
        console.log("this.currentTreeSelectionMaintainer", this.currentTreeSelectionMaintainer);
        console.log("this.is_whitelist_checker", this.is_whitelist_checker);
        console.log("this.is_normal_checker", this.is_normal_checker);
        this.getTransferable();
        if (this.cloneChecker) {
            this.mainJson[0].press_options = [];
            this.startForm.controls["filteredServiceCodeControl"].setValue(0);
            this.getFilteredServiceCode(this.allServiceCode);
            console.log(this.mainJson);
            this.outputJson.emit(this.mainJson);
        }
    };
    MenuAddComponent.prototype.resetForm = function (id) {
        var formId = document.getElementById(id);
        formId.reset();
    };
    MenuAddComponent.prototype.isValidPressOption = function ($event) {
        var val = $event.target.value;
        if (val <= 0) {
            $event.target.value = "";
            this.subMenuForm.controls["sub_press_option"].setValue("");
            this.menuForm.controls["menu_press_option"].setValue("");
            return false;
        }
    };
    MenuAddComponent.prototype.isValidPressOption01 = function (event) {
        if (event < 0 || event > 1) {
            event = "";
            return false;
        }
    };
    MenuAddComponent.prototype.isValidTitle = function (arr, $event, child) {
        var nodes = arr;
        if (child == false) {
            for (var _i = 0, _a = this.mainJson[0].press_options; _i < _a.length; _i++) {
                var x = _a[_i];
                if (x.menu_item_text == $event.target.value) {
                    $event.target.value = "";
                    this.subMenuForm.controls["sub_title"].setValue("");
                    this.menuForm.controls["menu_title"].setValue("");
                    this.alert.danger("Same name is already added on parent nodes, please try another");
                    return false;
                }
            }
        }
        if (child == true) {
            if (this.titleMaintainer.menu_item_text == $event.target.value) {
                $event.target.value = "";
                this.subMenuForm.controls["sub_title"].setValue("");
                this.menuForm.controls["menu_title"].setValue("");
                this.alert.danger("Cannot add same name as parent");
                return false;
            }
            for (var _b = 0, _c = this.titleMaintainer.press_options; _b < _c.length; _b++) {
                var x = _c[_b];
                if (x.menu_item_text == $event.target.value) {
                    $event.target.value = "";
                    this.subMenuForm.controls["sub_title"].setValue("");
                    this.menuForm.controls["menu_title"].setValue("");
                    this.alert.danger("Same name is already added on parent " +
                        this.titleMaintainer.menu_item_text +
                        " please try another");
                    return false;
                }
            }
        }
    };
    MenuAddComponent.prototype.deleteMenu = function (parentNode) {
        if (parentNode === void 0) { parentNode = this.nodeForDlt; }
        this.currentParent = "";
        this.currentParent = parentNode.menu_unique;
        this.walkTree(this.mainJson[0].press_options, this.currentParent, "delete", []);
        this.lengthJson = this.mainJson[0].press_options.length;
        this.closedltMenuDialog();
    };
    MenuAddComponent.prototype.updateMenu = function (parentNode) {
        var menu_unique;
        this.openDialog();
        this.history_menu_item_text = parentNode.menu_item_text;
        this.history_short_code_dtmf = parentNode.short_code_dtmf;
        this.subServiceShortCode = parentNode.short_code_dtmf;
        this.currentParentObject = {};
        this.titleMaintainer = {};
        this.titleMaintainer = parentNode;
        menu_unique = this.titleMaintainer.menu_unique;
        this.currentParentObject = parentNode;
        this.currentParent = "";
        this.getPathCounter = 0;
        this.getPath(this.mainJson[0].press_options, menu_unique);
        console.log("this.titleMaintainer", this.titleMaintainer);
        this.showCurrentParent = "";
        this.showCurrentParent = parentNode.menu_item_text;
        this.currentParent = parentNode.menu_unique;
        var firstLayerNodes = [];
        this.mainJson[0].press_options.forEach(function (element) {
            firstLayerNodes.push(element.menu_unique);
        });
        this.isUpdate = true;
        this.walkTree(this.mainJson[0].press_options, this.currentParent, "update", firstLayerNodes);
    };
    MenuAddComponent.prototype.walkTree = function (arr, parentNode, flag, firstLayerNodes) {
        var _this = this;
        var nodes = arr;
        nodes.forEach(function (child) {
            if (child.menu_unique == parentNode) {
                if (flag == "delete") {
                    var index = nodes.indexOf(child);
                    if (index > -1) {
                        nodes.splice(index, 1);
                    }
                    console.log(_this.mainJson);
                    _this.outputJson.emit(_this.mainJson);
                }
                if (flag == "update") {
                    console.log("child", child);
                    console.log("parentNode", parentNode);
                    // Update menu for first layer nodes based on created firstLayerNode array
                    var elementExists = firstLayerNodes.find(function (x) { return x == parentNode; });
                    console.log("dsadsa", child);
                    if (elementExists) {
                        _this.resetForm("menuForm");
                        _this.menuForm.controls["menu_service_code_flow"].setErrors(null);
                        _this.menuForm.patchValue({
                            menu_title: child.menu_item_text,
                            menu_take_user_input: child.take_user_input,
                            menu_user_input: child.user_input,
                            menu_is_consent: child.is_consent,
                            menu_consent_text: child.consent_text,
                            menu_is_package_code: child.is_package_code,
                            menu_package_code_text: child.package_code_text,
                            menu_is_3p_num: child.is_3p_num,
                            menu_press_option: child.short_code_dtmf,
                            menu_has_menu: child.has_menu,
                            menu_action_id: child.action_id,
                            menu_sms_text: child.sms_text,
                            menu_optional_sms: child.optional_sms || " ",
                            menu_is_chargeable: child.is_chargeable,
                            menu_amount: child.amount || 0,
                            menu_charge_type: child.charge_type || 0,
                            menu_is_transferable: child.is_transferable,
                            menu_transfer_ussdString: child.transfer_ussdString,
                            menu_esme_protocol: child.esme_protocol,
                            menu_service_code_flow: child.service_code_flow,
                            menu_is_root: child.is_root
                        });
                        if (child.is_root) {
                            _this.normalflowCodes = _this.getTransferableData;
                        }
                        else {
                            _this.normalflowCodes = _this.getTransferableData.filter(function (x) {
                                return x.is_whitelist != 0 || x.is_normal != 0;
                            });
                        }
                        if (child.has_menu || child.is_transferable) {
                            _this.showEsmeDropDown = false;
                        }
                        if (child.is_transferable) {
                            _this.serviceCodeFlowCodes();
                        }
                        if (child.esme_protocol !== 0) {
                            _this.updateField(child.esme_protocol);
                        }
                        // if(child.transfer_ussdString !== null){
                        //   this.getNormalFlowCodes()
                        // }
                        _this.sub_menu_div = "none";
                        _this.menu_form_div = "block";
                        console.log(_this.menuForm);
                    }
                    else {
                        _this.resetForm("subMenuForm");
                        _this.subMenuForm.controls["sub_service_code_flow"].setErrors(null);
                        _this.subMenuForm.patchValue({
                            sub_title: child.menu_item_text,
                            sub_take_user_input: child.take_user_input,
                            sub_user_input: child.user_input,
                            sub_is_consent: child.is_consent,
                            sub_consent_text: child.consent_text,
                            sub_is_package_code: child.is_package_code,
                            sub_package_code_text: child.package_code_text,
                            sub_is_3p_num: child.is_3p_num,
                            sub_press_option: child.short_code_dtmf,
                            sub_action_id: child.action_id,
                            sub_has_menu: child.action_id == 0 ? child.has_menu : false,
                            sub_sms_text: child.sms_text,
                            sub_optional_sms: child.optional_sms || " ",
                            sub_is_chargeable: child.is_chargeable,
                            sub_amount: child.amount || 0,
                            sub_charge_type: child.charge_type || 0,
                            sub_is_transferable: child.is_transferable,
                            sub_transfer_ussdString: child.transfer_ussdString,
                            sub_esme_protocol: child.esme_protocol,
                            sub_service_code_flow: child.service_code_flow,
                            sub_is_root: child.is_root
                        });
                        if (child.has_menu || child.is_transferable) {
                            _this.showEsmeDropDown = false;
                        }
                        if (child.is_transferable) {
                            _this.subServiceCodeFlowCodes();
                        }
                        // if (child.service_code_flow !== 0) {
                        //   this.updateField(child.esme_protocol);
                        // }
                        if (child.esme_protocol !== 0) {
                            _this.updateField(child.esme_protocol);
                        }
                        _this.sub_menu_div = "block";
                        _this.menu_form_div = "none";
                        console.log(_this.subMenuForm);
                    }
                }
                _this.outputJson.emit(_this.mainJson);
            }
            else {
                _this.walkTree(child.press_options, parentNode, flag, firstLayerNodes);
            }
        });
    };
    MenuAddComponent.prototype.saveMenuForm = function () {
        var _this = this;
        this.closeDialog();
        var counter = 0;
        for (var _i = 0, _a = this.mainJson[0].press_options; _i < _a.length; _i++) {
            var x = _a[_i];
            counter = counter + x.menu_item_text.length;
        }
        counter = counter + this.menuForm.value.menu_title.length;
        if (this.isUpdate) {
            counter = counter - this.currentParentObject.menu_item_text.length;
        }
        if (counter > environment_1.environment.characterLimit) {
            this.alert.danger("Maximum character limit of " + environment_1.environment.characterLimit + " reached");
            counter = counter - this.menuForm.value.menu_title.length;
            return false;
        }
        console.log("counter", counter);
        if (!this.isUpdate) {
            // if (this.mainJson[0].press_options.length > 9) {
            //   return false;
            // }
            for (var _b = 0, _c = this.mainJson[0].press_options.entries(); _b < _c.length; _b++) {
                var _d = _c[_b], i = _d[0], obj = _d[1];
                console.log(this.menuForm.value.menu_press_option);
                if (this.mainJson[0].press_options[i].short_code_dtmf ==
                    this.menuForm.value.menu_press_option.toString()) {
                    this.menuForm.controls.menu_press_option.setValue("");
                    // this.alert.danger(
                    //   "Cannot add with same press options, please try another one"
                    // );
                    this.menuForm.reset();
                    this.patchValueMenuForm();
                    return false;
                }
            }
            console.log("it passed");
            //CHECK LATER IF ANY ISSUE ARISES
            this.mainJson[0].press_options.push({
                menu_press_options: this.menuForm.value.menu_press_option,
                menu_unique: this.menuForm.value.menu_title +
                    this.menuForm.value.menu_press_option.toString() +
                    Math.random(),
                is_package_code: this.menuForm.value.menu_is_package_code,
                package_code_text: this.menuForm.value.menu_is_package_code
                    ? this.menuForm.value.menu_package_code_text
                    : " ",
                is_3p_num: this.menuForm.value.menu_is_3p_num,
                take_user_input: this.menuForm.value.menu_take_user_input,
                user_input: this.menuForm.value.menu_take_user_input
                    ? this.menuForm.value.menu_user_input
                    : " ",
                is_consent: this.menuForm.value.menu_is_consent,
                is_root: this.menuForm.value.menu_is_root,
                consent_text: this.menuForm.value.menu_consent_text,
                menu_item_text: this.menuForm.value.menu_title,
                short_code_dtmf: this.menuForm.value.menu_press_option.toString(),
                has_menu: this.menuForm.value.menu_has_menu,
                action_id: this.menuForm.value.menu_action_id,
                sms_text: this.menuForm.value.menu_sms_text,
                optional_sms: this.menuForm.value.menu_sms_text
                    ? this.menuForm.value.menu_optional_sms
                    : " ",
                is_chargeable: this.menuForm.value.menu_is_chargeable,
                amount: this.menuForm.value.menu_is_chargeable
                    ? this.menuForm.value.menu_amount
                    : 0,
                charge_type: this.menuForm.value.menu_is_chargeable
                    ? this.menuForm.value.menu_charge_type
                    : 0,
                is_transferable: this.menuForm.value.menu_is_transferable,
                transfer_ussdString: this.menuForm.value.menu_transfer_ussdString,
                esme_protocol: this.menuForm.value.menu_esme_protocol,
                service_code_flow: this.menuForm.value.menu_service_code_flow,
                parent_id: 0,
                press_options: []
            });
        }
        if (this.isUpdate) {
            var verified = true;
            var verifyPressOptions = true;
            if (this.history_short_code_dtmf ==
                this.menuForm.value.menu_press_option.toString()) {
                verifyPressOptions = false;
            }
            if (verifyPressOptions) {
                for (var _e = 0, _f = this.mainJson[0].press_options; _e < _f.length; _e++) {
                    var checker = _f[_e];
                    if (checker.short_code_dtmf ==
                        this.menuForm.value.menu_press_option.toString()) {
                        this.alert.danger("Cannot add with same press options, please try another one");
                        verified = false;
                    }
                }
            }
            if (verified) {
                this.mainJson[0].press_options.forEach(function (child, index) {
                    if (child.menu_unique == _this.currentParent) {
                        _this.mainJson[0].press_options[index] = {
                            menu_press_options: _this.menuForm.value.menu_press_option,
                            menu_unique: _this.menuForm.value.menu_title +
                                _this.menuForm.value.menu_press_option.toString() +
                                Math.random(),
                            is_package_code: _this.menuForm.value.menu_is_package_code,
                            package_code_text: _this.menuForm.value.menu_package_code_text,
                            is_3p_num: _this.menuForm.value.menu_is_3p_num,
                            take_user_input: _this.menuForm.value.menu_take_user_input,
                            is_root: _this.menuForm.value.menu_is_root,
                            is_consent: _this.menuForm.value.menu_is_consent,
                            consent_text: _this.menuForm.value.menu_consent_text,
                            user_input: _this.menuForm.value.menu_take_user_input
                                ? _this.menuForm.value.menu_user_input
                                : " ",
                            menu_item_text: _this.menuForm.value.menu_title,
                            short_code_dtmf: _this.menuForm.value.menu_press_option.toString(),
                            has_menu: _this.menuForm.value.menu_has_menu,
                            action_id: _this.menuForm.value.menu_action_id,
                            sms_text: _this.menuForm.value.menu_sms_text,
                            optional_sms: _this.menuForm.value.menu_sms_text
                                ? _this.menuForm.value.menu_optional_sms
                                : " ",
                            is_chargeable: _this.menuForm.value.menu_is_chargeable,
                            amount: _this.menuForm.value.menu_is_chargeable
                                ? _this.menuForm.value.menu_amount
                                : 0,
                            charge_type: _this.menuForm.value.menu_is_chargeable
                                ? _this.menuForm.value.menu_charge_type
                                : 0,
                            is_transferable: _this.menuForm.value.menu_is_transferable,
                            transfer_ussdString: _this.menuForm.value.menu_transfer_ussdString,
                            esme_protocol: _this.menuForm.value.menu_esme_protocol,
                            service_code_flow: _this.menuForm.value.menu_service_code_flow,
                            parent_id: 0,
                            press_options: _this.menuForm.value.menu_has_menu == false
                                ? []
                                : child.press_options
                        };
                    }
                });
            }
            // this.updateChildToTree(
            //   this.currentParent,
            //   this.mainJson[0].press_options
            // );
        }
        this.mainJson[0].press_options = this.mainJson[0].press_options.sort(function (a, b) {
            return a.menu_press_options - b.menu_press_options;
        });
        this.outputJson.emit(this.mainJson);
        console.log(this.mainJson);
        this.resetForm("menuForm");
        this.isUpdate = false;
        this.lengthJson = this.mainJson.length;
        this.patchValueMenuForm();
        if (!this.isUpdate) {
            this.addWIdthHeight(true);
        }
    };
    MenuAddComponent.prototype.addWIdthHeight = function (parent) {
        if (parent) {
            this.d3TreeWidth = this.d3TreeWidth + 100;
            this.d3TreeHeight = this.d3TreeHeight + 150;
        }
        else {
            this.d3TreeWidth = this.d3TreeWidth + 50;
            this.d3TreeHeight = this.d3TreeHeight + 50;
        }
        console.log("this.d3TreeHeight ", this.d3TreeHeight, " this.d3TreeWidth", this.d3TreeWidth);
    };
    MenuAddComponent.prototype.addChild = function (parentNode) {
        // this.menuForm.controls["menu_action_id"].setValue(null);
        // this.menuForm.controls["menu_esme_protocol"].setValue(null);
        // this.subMenuForm.controls["sub_action_id"].setValue(null);
        // this.subMenuForm.controls["sub_esme_protocol"].setValue(null);
        this.openDialog();
        this.subServiceShortCode = parentNode.short_code_dtmf;
        this.titleMaintainer = parentNode;
        console.log("this.titleMaintainer", this.titleMaintainer);
        // this.childTitleCounter = parentNode
        this.isUpdate = false;
        this.showCurrentParent = "";
        this.showCurrentParent = parentNode.menu_item_text;
        this.currentParent = "";
        this.currentParent = parentNode.menu_unique;
        if (this.mainJson[0].menu_unique == parentNode.menu_unique) {
            this.sub_menu_div = "none";
            this.menu_form_div = "block";
            console.log("matched");
        }
        else {
            this.sub_menu_div = "block";
            this.menu_form_div = "none";
            this.resetForm("subMenuForm");
            this.patchValueSubMenuForm();
            // this.subMenuForm.controls["sub_action_id"].setValue(null);
            // this.subMenuForm.controls["sub_esme_protocol"].setValue(null);
        }
    };
    MenuAddComponent.prototype.saveSubMenuForm = function () {
        var counter = 0;
        this.closeDialog();
        console.log("this.currentParent", this.currentParent);
        console.log("this.titleMaintainer", this.titleMaintainer);
        for (var _i = 0, _a = this.titleMaintainer.press_options; _i < _a.length; _i++) {
            var x = _a[_i];
            counter = counter + x.menu_item_text.length;
        }
        counter = counter + this.subMenuForm.value.sub_title.length;
        if (this.isUpdate) {
            counter = counter - this.currentParentObject.menu_item_text.length;
        }
        console.log("counter", counter);
        if (counter > environment_1.environment.characterLimit) {
            this.alert.danger("Maximum character limit of " + environment_1.environment.characterLimit + " reached");
            return false;
        }
        if (!this.isUpdate) {
            this.obj = {
                menu_press_options: this.subMenuForm.value.sub_press_option,
                menu_unique: this.subMenuForm.value.sub_title +
                    this.subMenuForm.value.sub_press_option.toString() +
                    +Math.random(),
                is_package_code: this.subMenuForm.value.sub_is_package_code,
                package_code_text: this.subMenuForm.value.sub_package_code_text,
                is_3p_num: this.subMenuForm.value.sub_is_3p_num,
                take_user_input: this.subMenuForm.value.sub_take_user_input,
                is_root: this.subMenuForm.value.sub_is_root,
                is_consent: this.subMenuForm.value.sub_is_consent,
                consent_text: this.subMenuForm.value.sub_consent_text,
                user_input: this.subMenuForm.value.sub_take_user_input
                    ? this.subMenuForm.value.sub_user_input
                    : " ",
                menu_item_text: this.subMenuForm.value.sub_title,
                short_code_dtmf: this.subMenuForm.value.sub_press_option.toString(),
                has_menu: this.subMenuForm.value.sub_has_menu,
                action_id: this.subMenuForm.value.sub_action_id,
                sms_text: this.subMenuForm.value.sub_sms_text,
                optional_sms: this.subMenuForm.value.sub_sms_text
                    ? this.subMenuForm.value.sub_optional_sms
                    : "",
                is_chargeable: this.subMenuForm.value.sub_is_chargeable,
                amount: this.subMenuForm.value.sub_is_chargeable
                    ? this.subMenuForm.value.sub_amount
                    : 0,
                charge_type: this.subMenuForm.value.sub_is_chargeable
                    ? this.subMenuForm.value.sub_charge_type
                    : 0,
                is_transferable: this.subMenuForm.value.sub_is_transferable,
                transfer_ussdString: this.subMenuForm.value.sub_transfer_ussdString,
                esme_protocol: this.subMenuForm.value.sub_esme_protocol,
                service_code_flow: this.subMenuForm.value.sub_service_code_flow,
                parent_id: 0,
                press_options: []
            };
        }
        if (this.isUpdate) {
            console.log("this.currentParentObject", this.currentParentObject);
            this.obj = {
                menu_press_options: this.subMenuForm.value.sub_press_option,
                menu_unique: this.subMenuForm.value.sub_title +
                    this.subMenuForm.value.sub_press_option.toString() +
                    Math.random(),
                take_user_input: this.subMenuForm.value.sub_take_user_input,
                user_input: this.subMenuForm.value.sub_take_user_input
                    ? this.subMenuForm.value.sub_user_input
                    : " ",
                is_package_code: this.subMenuForm.value.sub_is_package_code,
                package_code_text: this.subMenuForm.value.sub_package_code_text,
                is_3p_num: this.subMenuForm.value.sub_is_3p_num,
                menu_item_text: this.subMenuForm.value.sub_title,
                is_consent: this.subMenuForm.value.sub_is_consent,
                is_root: this.subMenuForm.value.sub_is_root,
                consent_text: this.subMenuForm.value.sub_consent_text,
                short_code_dtmf: this.subMenuForm.value.sub_press_option.toString(),
                has_menu: this.subMenuForm.value.sub_has_menu,
                action_id: this.subMenuForm.value.sub_has_menu
                    ? 0
                    : this.subMenuForm.value.sub_action_id,
                sms_text: this.subMenuForm.value.sub_sms_text,
                optional_sms: this.subMenuForm.value.sub_sms_text
                    ? this.subMenuForm.value.sub_optional_sms
                    : "",
                is_chargeable: this.subMenuForm.value.sub_is_chargeable,
                amount: this.subMenuForm.value.sub_is_chargeable
                    ? this.subMenuForm.value.sub_amount
                    : 0,
                charge_type: this.subMenuForm.value.sub_is_chargeable
                    ? this.subMenuForm.value.sub_charge_type
                    : 0,
                is_transferable: this.subMenuForm.value.sub_is_transferable,
                transfer_ussdString: this.subMenuForm.value.sub_transfer_ussdString,
                service_code_flow: this.subMenuForm.value.sub_service_code_flow,
                esme_protocol: this.subMenuForm.value.sub_esme_protocol,
                parent_id: 0,
                press_options: []
            };
            if (this.checkPressoptions()) {
                this.updateChildToTree(this.currentParent, this.mainJson[0].press_options);
            }
            this.resetForm("subMenuForm");
            this.outputJson.emit(this.mainJson);
            this.patchValueSubMenuForm();
            this.patchValueMenuForm();
            this.isUpdate = false;
            this.sub_menu_div = "none";
            this.menu_form_div = "block";
            return;
        }
        this.addChildToTree(this.currentParent, this.mainJson[0].press_options);
        this.patchValueSubMenuForm();
        this.patchValueMenuForm();
        this.sub_menu_div = "none";
        this.menu_form_div = "block";
        if (!this.isUpdate) {
            this.addWIdthHeight(false);
        }
    };
    MenuAddComponent.prototype.checkValues = function (checker, parentNode) {
        for (var _i = 0, _a = checker.press_options; _i < _a.length; _i++) {
            var childChecker = _a[_i];
            if (childChecker.menu_unique == parentNode) {
                this.currentUpdateParent = checker;
                // console.log("this.currentUpdateParent", this.currentUpdateParent);
                break;
            }
            else {
                if (childChecker.press_options.length != 0) {
                    this.checkValues(childChecker, parentNode);
                }
            }
        }
    };
    MenuAddComponent.prototype.checkPressoptions = function () {
        var verified = true;
        var verifyPressOptions = true;
        if (this.history_short_code_dtmf ==
            this.subMenuForm.value.sub_press_option.toString()) {
            verifyPressOptions = false;
        }
        if (verifyPressOptions) {
            for (var _i = 0, _a = this.mainJson[0].press_options; _i < _a.length; _i++) {
                var checker = _a[_i];
                if (checker.press_options.length != 0) {
                    for (var _b = 0, _c = checker.press_options; _b < _c.length; _b++) {
                        var childChecker = _c[_b];
                        if (childChecker.menu_unique == this.currentParent) {
                            this.currentUpdateParent = checker;
                            break;
                        }
                        else {
                            if (childChecker.press_options.length != 0) {
                                this.checkValues(childChecker, this.currentParent);
                            }
                        }
                    }
                }
            }
            for (var _d = 0, _e = this.currentUpdateParent.press_options; _d < _e.length; _d++) {
                var verify = _e[_d];
                if (verify.short_code_dtmf ==
                    this.subMenuForm.value.sub_press_option.toString()) {
                    // this.alert.danger(
                    //   "Cannot add with same press options, please try another one"
                    // );
                    verified = false;
                }
            }
        }
        console.log("this.currentUpdateParent", this.currentUpdateParent);
        return verified;
    };
    MenuAddComponent.prototype.updateChildToTree = function (parentNode, arr) {
        var _this = this;
        var nodes = arr;
        console.log("this.obj", this.obj);
        console.log("parentNode", parentNode);
        console.log("nodes", nodes);
        nodes.forEach(function (child, index) {
            if (child.menu_unique == parentNode) {
                if (!_this.obj.has_menu) {
                    _this.obj.press_options = [];
                }
                _this.obj.press_options = child.press_options;
                nodes[index] = _this.obj;
                nodes = nodes.sort(function (a, b) {
                    return a.menu_press_options - b.menu_press_options;
                });
                return;
            }
            else {
                _this.updateChildToTree(parentNode, child.press_options);
            }
            _this.updateChildToTree(parentNode, child.press_options);
        });
    };
    MenuAddComponent.prototype.addChildToTree = function (parentNode, arr) {
        var _this = this;
        var nodes = arr;
        nodes.forEach(function (child) {
            if (child.menu_unique == parentNode) {
                // if (child.press_options.length < 9) {
                for (var i = 0; i < child.press_options.length; i++) {
                    if (child.press_options[i].short_code_dtmf == _this.obj.short_code_dtmf) {
                        _this.subMenuForm.controls.sub_press_option.setValue("");
                        // this.alert.danger(
                        //   "Cannot add with same press options, please try another one"
                        // );
                        return false;
                    }
                }
                console.log("child.press_options", child.press_options);
                child.press_options.push(_this.obj);
                child.press_options = child.press_options.sort(function (a, b) {
                    return a.menu_press_options - b.menu_press_options;
                });
                _this.outputJson.emit(_this.mainJson);
                // this.menu_form_div = "none";
                _this.resetForm("subMenuForm");
                // } else {
                //   return false;
                // }
            }
            else {
                _this.addChildToTree(parentNode, child.press_options);
            }
            _this.addChildToTree(parentNode, child.press_options);
        });
    };
    MenuAddComponent.prototype.filterTree = function (tree) {
        var _this = this;
        var index = 0;
        tree.forEach(function (child) {
            index += 1;
            if (child.press_options.length === 0) {
                delete child["press_options"];
            }
            else {
                if (child.press_options) {
                    _this.filterTree(child.press_options);
                }
            }
        });
    };
    MenuAddComponent.prototype.getServiceCodes = function (id, tree) {
        var _this = this;
        this.allService.getServiceCodesList().subscribe({
            next: function (res) {
                if (res.success != true) {
                    alert(res.message);
                    return false;
                }
                var short_code = res.data.filter(function (value) {
                    if (value.id == id) {
                        return value;
                    }
                });
                console.log("short_code", short_code);
                _this.startForm.value.serviceCode = short_code[0];
                _this.JsonStructureChangeUpdate(tree);
                _this.filterTree(_this.mainJson[0].press_options);
                Object.assign(_this.mainJson[0], {
                    service_code_id: _this.startForm.value.serviceCode.id ||
                        _this.startForm.value.serviceCode.short_code_id,
                    is_whitelist: _this.is_whitelist_checker,
                    is_normal: _this.is_normal_checker,
                    menuListCheck: _this.menuWhiteListChecker
                });
                for (var _i = 0, _a = _this.mainJson[0].press_options; _i < _a.length; _i++) {
                    var val = _a[_i];
                    if (!val.press_options) {
                        Object.assign(val, { press_options: [] });
                    }
                }
                console.log("this.mainJson[0]", _this.mainJson[0]);
                _this.displayLoader = true;
                _this.allService
                    .updateMenu(_this.mainJson[0], _this.d3TreeWidth, _this.d3TreeHeight)
                    .subscribe({
                    next: function (res) {
                        if (!res.success) {
                            _this.alert.danger("Menu Cannot be Added Sucessfully");
                            _this.displayLoader = false;
                            return false;
                        }
                        _this.alert.success("Menu Updated Sucessfully");
                        _this.displayLoader = false;
                        _this.router.navigateByUrl("/view-menus-list");
                    },
                    error: function (e) {
                        this.displayLoader = false;
                        this.alert.danger("Something went wrong");
                        console.log("Error===========>", e);
                    }
                });
            },
            error: function (e) {
                console.log("Error=========>", e);
            }
        });
    };
    MenuAddComponent.prototype.saveJsonFromView = function (id, tree) {
        this.getServiceCodes(id, tree);
    };
    MenuAddComponent.prototype.saveJson = function () {
        var _this = this;
        console.log("yeh waaaa", this.startForm.value.serviceCode);
        console.log("yeh waaaa", this.startForm.value.serviceCode.short_code);
        if (!this.jsonStructureChangeChecker) {
            this.JsonStructureChange();
        }
        //return;
        console.log("this.is_whitelist_checker", this.is_whitelist_checker);
        console.log("this.is_normal_checker", this.is_normal_checker);
        this.filterTree(this.mainJson[0].press_options);
        Object.assign(this.mainJson[0], {
            service_code_id: this.startForm.value.serviceCode.id ||
                this.startForm.value.serviceCode.short_code_id,
            is_whitelist: this.is_whitelist_checker,
            is_normal: this.is_normal_checker,
            menuListCheck: this.menuWhiteListChecker,
            white_list_group_id: this.startForm.value.white_list_group_id
        });
        for (var _i = 0, _a = this.mainJson[0].press_options; _i < _a.length; _i++) {
            var val = _a[_i];
            if (!val.press_options) {
                Object.assign(val, { press_options: [] });
            }
        }
        this.displayLoader = true;
        console.log("this.mainJson[0]", this.mainJson[0]);
        console.log("this.mainJson", this.mainJson[0]);
        this.allService
            .addMenu(this.mainJson[0], this.d3TreeWidth, this.d3TreeHeight)
            .subscribe({
            next: function (res) {
                if (!res.success) {
                    _this.alert.danger("Menu Cannot be Added Sucessfully");
                    _this.displayLoader = false;
                    return false;
                }
                _this.alert.success("Menu Added Sucessfully");
                _this.displayLoader = false;
                _this.router.navigateByUrl("/view-menus-list");
            },
            error: function (e) {
                this.displayLoader = false;
                this.alert.danger("Something went wrong");
                console.log("Error===========>", e);
            }
        });
    };
    //added by wasim
    MenuAddComponent.prototype.openDialog = function () {
        // this.menuForm.controls["menu_action_id"].setValue(null);
        // this.menuForm.controls["menu_esme_protocol"].setValue(null);
        // this.subMenuForm.controls["sub_action_id"].setValue(null);
        // this.subMenuForm.controls["sub_esme_protocol"].setValue(null);
        this.showModal = "block";
        this.shortCodeModal = " ";
    };
    MenuAddComponent.prototype.openDialogFirst = function () {
        if (this.cloneChecker) {
            this.showModal = " ";
            this.shortCodeModal = " ";
            return;
        }
        this.showModal = "block";
        this.shortCodeModal = " ";
    };
    MenuAddComponent.prototype.closeDialog = function (onClose) {
        this.showModal = " ";
        console.log("Close");
        if (onClose) {
            this.isUpdate = false;
            this.menuForm.reset();
            this.subMenuForm.reset();
            this.patchValueMenuForm();
            this.patchValueSubMenuForm();
            this.sub_menu_div = "none";
            this.menu_form_div = "block";
        }
    };
    MenuAddComponent.prototype.opendltMenuDialog = function (node) {
        this.nodeForDlt = {};
        this.nodeForDlt = node;
        this.showDltModal = "block";
    };
    MenuAddComponent.prototype.closedltMenuDialog = function () {
        this.showDltModal = " ";
    };
    MenuAddComponent.prototype.showShorCodeModal = function () {
        this.shortCodeModal = "block";
    };
    MenuAddComponent.prototype.closeShortCodeModal = function () {
        this.shortCodeModal = " ";
        this.router.navigate(["/view-menus-list"]);
    };
    MenuAddComponent.prototype.patchValueMenuForm = function () {
        this.menuForm.patchValue({
            menu_has_menu: false,
            menu_take_user_input: false,
            menu_user_input: " ",
            menu_action_id: 0,
            menu_sms_text: false,
            menu_optional_sms: " ",
            menu_is_chargeable: false,
            menu_amount: 0,
            menu_charge_type: 0,
            menu_is_transferable: false,
            menu_service_code_flow: 0,
            menu_transfer_ussdString: "null",
            menu_esme_protocol: 0,
            menu_is_package_code: false,
            menu_package_code_text: " ",
            menu_is_3p_num: false,
            menu_is_consent: false,
            menu_consent_text: " ",
            menu_is_root: false
        });
        this.showEsmeDropDown = false;
    };
    MenuAddComponent.prototype.patchValueSubMenuForm = function () {
        this.subMenuForm.patchValue({
            sub_has_menu: false,
            sub_take_user_input: false,
            sub_user_input: " ",
            sub_action_id: 0,
            sub_sms_text: false,
            sub_optional_sms: " ",
            sub_is_chargeable: false,
            sub_amount: 0,
            sub_charge_type: 0,
            sub_is_transferable: false,
            sub_service_code_flow: 0,
            sub_transfer_ussdString: "null",
            sub_esme_protocol: 0,
            sub_is_package_code: false,
            sub_package_code_text: " ",
            sub_is_3p_num: false,
            sub_is_consent: false,
            sub_consent_text: " ",
            sub_is_root: false
        });
        this.showEsmeDropDown = false;
    };
    MenuAddComponent.prototype.checkValues1 = function () {
        console.log("this.menuForm.value", this.menuForm.value);
        console.log("this.menuForm", this.menuForm);
    };
    MenuAddComponent.prototype.JsonStructureChangeUpdate = function (tree) {
        var savedJson = [];
        var Json = this.mainJson[0];
        console.log("tree", tree);
        if (Json.press_options.length > 0) {
            for (var _i = 0, _a = Json.press_options; _i < _a.length; _i++) {
                var updater = _a[_i];
                if (tree == "true") {
                    updater = __assign(__assign({}, updater), { short_code_dtmf: "wl-" +
                            this.startForm.value.serviceCode.short_code +
                            "+" +
                            updater.short_code_dtmf });
                }
                else {
                    updater = __assign(__assign({}, updater), { short_code_dtmf: this.startForm.value.serviceCode.short_code +
                            "+" +
                            updater.short_code_dtmf });
                }
                if (updater.press_options.length > 0) {
                    updater.press_options = this.updateChildNode(updater);
                }
                console.log(updater);
                savedJson.push(updater);
            }
        }
        Json.press_options = savedJson;
        this.jsonStructureChangeChecker = true;
        console.log("this.mainJson[0]", this.mainJson[0]);
        console.log("Json", Json);
    };
    MenuAddComponent.prototype.JsonStructureChange = function () {
        var savedJson = [];
        var Json = this.mainJson[0];
        if (Json.press_options.length > 0) {
            for (var _i = 0, _a = Json.press_options; _i < _a.length; _i++) {
                var updater = _a[_i];
                if (this.is_whitelist_checker &&
                    this.startForm.value.serviceCode.is_whitelist == 0) {
                    updater = __assign(__assign({}, updater), { short_code_dtmf: "wl-" +
                            this.startForm.value.serviceCode.short_code +
                            "+" +
                            updater.short_code_dtmf });
                }
                else {
                    updater = __assign(__assign({}, updater), { short_code_dtmf: this.startForm.value.serviceCode.short_code +
                            "+" +
                            updater.short_code_dtmf });
                }
                if (updater.press_options.length > 0) {
                    updater.press_options = this.updateChildNode(updater);
                }
                console.log(updater);
                savedJson.push(updater);
            }
        }
        Json.press_options = savedJson;
        this.jsonStructureChangeChecker = true;
        console.log("this.mainJson[0]", this.mainJson[0]);
        console.log("Json", Json);
    };
    MenuAddComponent.prototype.updateChildNode = function (child) {
        var savedJson = [];
        for (var _i = 0, _a = child.press_options; _i < _a.length; _i++) {
            var updater = _a[_i];
            updater = __assign(__assign({}, updater), { short_code_dtmf: child.short_code_dtmf + "+" + updater.short_code_dtmf });
            if (updater.press_options.length > 0) {
                updater.press_options = this.updateChildNode(updater);
            }
            savedJson.push(updater);
        }
        return savedJson;
    };
    MenuAddComponent.prototype.convertToJson = function (data) {
        var press_options = [];
        for (var _i = 0, data_3 = data; _i < data_3.length; _i++) {
            var menudata = data_3[_i];
            if (menudata.parent_id == "shortcode") {
                press_options.push({
                    menu_press_options: menudata.menu_press_options == undefined
                        ? null
                        : menudata.menu_press_options,
                    menu_unique: menudata.menu_unique,
                    is_package_code: menudata.is_package_code,
                    package_code_text: menudata.package_code_text,
                    is_3p_num: menudata.is_3p_num,
                    menu_item_text: menudata.menu_item_text,
                    is_consent: menudata.is_consent,
                    is_root: menudata.is_root,
                    consent_text: menudata.consent_text,
                    take_user_input: menudata.take_user_input,
                    user_input: menudata.user_input,
                    short_code_dtmf: menudata.short_code_dtmf,
                    has_menu: menudata.has_menu,
                    service_code_id: menudata.service_code_id,
                    action_id: menudata.action_id,
                    created_by: menudata.created_by,
                    created_dt: menudata.created_dt,
                    redis_flag: menudata.redis_flag,
                    id: menudata.id,
                    parent_id: menudata.parent_id,
                    charge_type: menudata.charge_type,
                    is_chargeable: menudata.is_chargeable,
                    optional_sms: menudata.optional_sms,
                    sms_text: menudata.sms_text,
                    amount: menudata.amount,
                    wl_menu_item_text: menudata.wl_menu_item_text,
                    transfer_ussdString: menudata.transfer_ussdString == null
                        ? "null"
                        : menudata.transfer_ussdString,
                    is_transferable: menudata.is_transferable,
                    esme_protocol: menudata.esme_protocol,
                    service_code_flow: menudata.service_code_flow,
                    press_options: this.recursiveConverttoJson(menudata, data) == undefined
                        ? []
                        : this.recursiveConverttoJson(menudata, data)
                });
            }
        }
        this.mainJson[0].press_options = press_options;
        this.convertTosingledtmf();
        console.log("Test", this.mainJson[0]);
        this.outputJson.emit(this.mainJson);
        // this.mainJson[0].press_options =
        //   this.jsonTreeData[0].press_options;
        // console.log(
        //   "this.jsonTreeData[0].press_options",
        //   this.jsonTreeData[0].press_options
        // );
        // console.log(
        //   "this.childComp.mainJson[0].press_options",
        //   this.childComp.mainJson[0].press_options
        // );
    };
    MenuAddComponent.prototype.recursiveConverttoJson = function (menuData, data) {
        var press_options = [];
        for (var _i = 0, data_4 = data; _i < data_4.length; _i++) {
            var menudata = data_4[_i];
            if (menudata.parent_id == menuData.id) {
                console.log("menudata:", menudata);
                console.log("menuData:", menuData);
                press_options.push({
                    menu_press_options: menudata.menu_press_options == undefined
                        ? null
                        : menudata.menu_press_options,
                    menu_unique: menudata.menu_unique,
                    is_package_code: menudata.is_package_code,
                    package_code_text: menudata.package_code_text,
                    is_root: menudata.is_root,
                    is_consent: menudata.is_consent,
                    consent_text: menudata.consent_text,
                    is_3p_num: menudata.is_3p_num,
                    menu_item_text: menudata.menu_item_text,
                    take_user_input: menudata.take_user_input,
                    user_input: menudata.user_input,
                    short_code_dtmf: menudata.short_code_dtmf,
                    has_menu: menudata.has_menu,
                    service_code_id: menudata.service_code_id,
                    wl_menu_item_text: menudata.wl_menu_item_text,
                    action_id: menudata.action_id,
                    created_by: menudata.created_by,
                    created_dt: menudata.created_dt,
                    redis_flag: menudata.redis_flag,
                    id: menudata.id,
                    parent_id: menudata.parent_id,
                    charge_type: menudata.charge_type,
                    is_chargeable: menudata.is_chargeable,
                    optional_sms: menudata.optional_sms,
                    sms_text: menudata.sms_text,
                    amount: menudata.amount,
                    service_code_flow: menudata.service_code_flow,
                    transfer_ussdString: menuData.transfer_ussdString == null
                        ? "null"
                        : menudata.transfer_ussdString,
                    is_transferable: menudata.is_transferable,
                    esme_protocol: menudata.esme_protocol,
                    press_options: this.recursiveConverttoJson(menudata, data) == undefined
                        ? []
                        : this.recursiveConverttoJson(menudata, data)
                });
            }
        }
        return press_options;
    };
    MenuAddComponent.prototype.convertTosingledtmf = function () {
        var savedJson = [];
        var Json = this.mainJson[0];
        if (Json.press_options.length > 0) {
            for (var _i = 0, _a = Json.press_options; _i < _a.length; _i++) {
                var updater = _a[_i];
                updater = __assign(__assign({}, updater), { short_code_dtmf: updater.menu_press_options });
                if (updater.press_options.length > 0) {
                    updater.press_options = this.updateChildNodeFunction(updater);
                }
                console.log(updater);
                savedJson.push(updater);
            }
        }
        Json.press_options = savedJson;
        console.log("this.mainJson[0]", this.mainJson[0]);
        console.log("Json", Json);
    };
    MenuAddComponent.prototype.updateChildNodeFunction = function (child) {
        var savedJson = [];
        for (var _i = 0, _a = child.press_options; _i < _a.length; _i++) {
            var updater = _a[_i];
            updater = __assign(__assign({}, updater), { short_code_dtmf: updater.menu_press_options });
            if (updater.press_options.length > 0) {
                updater.press_options = this.updateChildNode(updater);
            }
            savedJson.push(updater);
        }
        return savedJson;
    };
    MenuAddComponent.prototype.getPath = function (object, search) {
        if (object.menu_unique === search)
            return [object];
        else if (object.press_options || Array.isArray(object)) {
            var children = Array.isArray(object) ? object : object.press_options;
            for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
                var child = children_1[_i];
                var result = this.getPath(child, search);
                if (result) {
                    console.log("getpathCounter", this.getPathCounter);
                    this.getPathCounter = this.getPathCounter + 1;
                    if (object.id)
                        result.unshift(object);
                    if (this.getPathCounter == 2) {
                        this.titleMaintainer = child;
                    }
                    console.log("children", children);
                    console.log("child", child);
                    return result;
                }
            }
        }
    };
    MenuAddComponent.prototype.testForm = function () {
        console.log("this.menuForm.value", this.menuForm.value);
        console.log("this.menuForm", this.menuForm);
    };
    __decorate([
        core_1.Output()
    ], MenuAddComponent.prototype, "outputJson");
    MenuAddComponent = __decorate([
        core_1.Component({
            selector: "app-menu-add",
            templateUrl: "./menu-add.component.html",
            styleUrls: ["./menu-add.component.css"],
            animations: [animations_1.fadeSlideInOut]
        })
    ], MenuAddComponent);
    return MenuAddComponent;
}());
exports.MenuAddComponent = MenuAddComponent;
