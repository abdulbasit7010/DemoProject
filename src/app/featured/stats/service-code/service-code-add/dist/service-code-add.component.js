"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ServiceCodeAddComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var animations_1 = require("@app/animations");
var string_validators_1 = require("@app/shared/validators/string.validators");
var draft_modal_component_1 = require("@app/shared/draft-modal/draft-modal.component");
var operators_1 = require("rxjs/operators");
var ngx_slider_1 = require("@angular-slider/ngx-slider");
var ServiceCodeAddComponent = /** @class */ (function () {
    function ServiceCodeAddComponent(formBuilder, allService, alert, router, dialog) {
        this.formBuilder = formBuilder;
        this.allService = allService;
        this.alert = alert;
        this.router = router;
        this.dialog = dialog;
        this.addEditServiceChecker = false;
        this.displayLoader = false;
        this.serviceConfig = [];
        this.showEsmeDropdown = false;
        this.showProtocolDropDown = true;
        this.hide = true;
        this.treeExistMaintainer = false;
        this.short_code = new forms_1.FormControl("", [
            forms_1.Validators.required,
            forms_1.Validators.pattern(history.state.checker
                ? /^\*[0-9]+\*[0-9]+\#$/
                : /^(\*|\#)[0-9]+([\*]+[0-9]+)*\#$/),
        ]);
        this.patternText = "Must start with * and end with #.";
        this.is_sponsored_charging = new forms_1.FormControl(false, [
            forms_1.Validators.required,
        ]);
        this.esme_charging_msisdn = new forms_1.FormControl(null);
        this.title = new forms_1.FormControl("", [
            forms_1.Validators.required,
            string_validators_1.StringValidator.noAllSpaces,
        ]);
        this.description = new forms_1.FormControl("", [
            forms_1.Validators.required,
            string_validators_1.StringValidator.noAllSpaces,
        ]);
        this.action_id = new forms_1.FormControl("", [forms_1.Validators.required]);
        this.is_chargable = new forms_1.FormControl(false, [forms_1.Validators.required]);
        this.optional_sms = new forms_1.FormControl(false, [forms_1.Validators.required]);
        this.has_menu = new forms_1.FormControl(false, [forms_1.Validators.required]);
        this.charge_type = new forms_1.FormControl(null);
        this.intervals = new forms_1.FormControl(null);
        this.amount = new forms_1.FormControl(null);
        this.parent_id = new forms_1.FormControl(0, [forms_1.Validators.required]);
        this.session_timeout = new forms_1.FormControl("", [
            forms_1.Validators.required,
            forms_1.Validators.pattern("^[0-9]+$"),
        ]);
        this.previous_option = new forms_1.FormControl("", [
            forms_1.Validators.required,
            forms_1.Validators.pattern("^[0-9]+$"),
        ]);
        this.sms_text = new forms_1.FormControl(null);
        this.is_bank_short_code = new forms_1.FormControl(false, [
            forms_1.Validators.required,
        ]);
        this.esme_protocol = new forms_1.FormControl("", [forms_1.Validators.required]);
        this.disable = false;
        this.consent_menu = new forms_1.FormControl(null);
        this.consent_lifetime = new forms_1.FormControl(null);
        this.bank_id = new forms_1.FormControl(null);
        this.bank_api_url = new forms_1.FormControl(null);
        this.authentication_api_url = new forms_1.FormControl(null);
        this.bank_user_name = new forms_1.FormControl(null);
        this.bank_password = new forms_1.FormControl(null);
        this.fixed = new forms_1.FormControl(true);
        this.relative = new forms_1.FormControl(false);
        this.radioButtons = new forms_1.FormControl(true);
        this.executeFunctionChecker = true;
        this.is_sensitive = new forms_1.FormControl(false, [forms_1.Validators.required]);
        this.chargable_types = [
            { name: "Session Based", value: 1 },
            { name: "Event Based", value: 2 },
            { name: "Time Based", value: 3 },
        ];
        this.protocolNames = [
            { id: 1, name: "smpp" },
            { id: 2, name: "http/https" },
        ];
        this.minValue = 0;
        this.maxValue = 30;
        this.options = {
            floor: 0,
            ceil: 60,
            translate: function (value, label) {
                switch (label) {
                    case ngx_slider_1.LabelType.Low:
                        return value.toString();
                    case ngx_slider_1.LabelType.High:
                        return value.toString();
                    default:
                        return value.toString();
                }
            }
        };
        // radioButtons = "fixed";
        this.heading = "Add new service";
        this.buttonText = "Add Service Code";
        this.esmes = [];
        this.setInterval = 0;
        this.currentIndex = 1;
    }
    ServiceCodeAddComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.historyData = history.state.name;
        //  this.getServiceConfigList();
        this.form();
        this.filteredOptions = this.action_id.valueChanges.pipe(operators_1.startWith(""), operators_1.map(function (value) { return _this._filter(value || ""); }));
    };
    ServiceCodeAddComponent.prototype._filter = function (value) {
        var filterValue = value.toLowerCase();
        return this.esmes.filter(function (option) {
            return option.name.toLowerCase().includes(filterValue);
        });
    };
    ServiceCodeAddComponent.prototype._keydown = function (event) {
        if (!(/^[0-9]+$/.test(event.key) ||
            event.key == "Tab" ||
            event.key == "Backspace")) {
            // invalid character, prevent input
            event.preventDefault();
        }
    };
    ServiceCodeAddComponent.prototype.form = function () {
        this.serviceCodeForm = this.formBuilder.group({
            short_code: this.short_code,
            title: this.title,
            description: this.description,
            is_chargable: this.is_chargable,
            has_menu: this.has_menu,
            charge_type: this.charge_type,
            intervals: this.intervals,
            amount: this.amount,
            action_id: this.action_id,
            parent_id: this.parent_id,
            session_timeout: this.session_timeout,
            previous_option: this.previous_option,
            sms_text: this.sms_text,
            fixed: this.fixed,
            relative: this.relative,
            radioButtons: this.radioButtons,
            is_bank_short_code: this.is_bank_short_code,
            consent_menu: this.consent_menu,
            consent_lifetime: this.consent_lifetime,
            bank_id: this.bank_id,
            bank_api_url: this.bank_api_url,
            is_sponsored_charging: this.is_sponsored_charging,
            optional_sms: this.optional_sms,
            esme_charging_msisdn: this.esme_charging_msisdn,
            authentication_api_url: this.authentication_api_url,
            bank_user_name: this.bank_user_name,
            bank_password: this.bank_password,
            esme_protocol: this.esme_protocol,
            is_sensitive: this.is_sensitive
        });
        this.serviceCodeForm.controls["sms_text"].setValue(null);
        this.serviceCodeForm.controls["is_sponsored_charging"].disable();
        //if adding sub service of existing service
        if (this.historyData == "subService") {
            this.heading = "Add Sub Service code";
            this.buttonText = "Add sub service";
            this.patternText = "Correct format *xxx*xxxxxxxx#.";
            this.patchingValuesSubService();
        }
        // this.serviceCodeForm.controls["is_sponsored_charging"].setValue(false);
        // this.serviceCodeForm.controls["is_sponsored_charging"].disable();
        //while editing the service
        if (this.historyData == "editService") {
            this.addEditServiceChecker = true;
            this.heading = "Edit Service Code";
            this.patchingValues();
            this.updateFieldHistory();
            this.radioButtonsCheck();
            this.serviceCodeForm.controls["esme_protocol"].setValue(history.state.data.esme_protocol);
            this.serviceCodeForm.controls["optional_sms"].setValue(history.state.data.optional_sms);
            this.serviceCodeForm.controls["sms_text"].setValue(history.state.data.sms_text);
            this.update_sms();
            this.checkRadio(this.serviceCodeForm.getRawValue().radioButtons);
            this.bankingHistory(this.serviceCodeForm.getRawValue().is_bank_short_code);
            this.onCheckBox2(this.serviceCodeForm.getRawValue().has_menu);
            this.chargeableHistory(this.serviceCodeForm.getRawValue().is_chargable);
            this.update_sponsored();
            if (history.state.data.is_whitelist == 1 ||
                history.state.data.is_normal == 1) {
                this.executeFunctionChecker = false;
                this.treeExistMaintainer = true;
                this.disableFields();
            }
            this.serviceCodeForm.get("short_code").disable();
        }
    };
    ServiceCodeAddComponent.prototype.disableFields = function () {
        this.serviceCodeForm.controls["is_bank_short_code"].disable();
        this.serviceCodeForm.controls["has_menu"].disable();
        // this.serviceCodeForm.controls["action_id"].disable();
        this.serviceCodeForm.controls["consent_menu"].disable();
        this.serviceCodeForm.controls["consent_lifetime"].disable();
        this.serviceCodeForm.controls["bank_id"].disable();
        this.serviceCodeForm.controls["bank_api_url"].disable();
        this.serviceCodeForm.controls["authentication_api_url"].disable();
        this.serviceCodeForm.controls["bank_user_name"].disable();
        this.serviceCodeForm.controls["bank_password"].disable();
        //this.serviceCodeForm.controls["is_bank_short_code"].disable()
        this.disable = true;
    };
    ServiceCodeAddComponent.prototype.bankingHistory = function (value) {
        if (value == true) {
            this.serviceCodeForm.controls["has_menu"].setValue(false);
            this.serviceCodeForm.controls["has_menu"].disable();
            this.serviceCodeForm.controls["fixed"].setValue(true);
            this.serviceCodeForm.controls["relative"].setValue(false);
            this.serviceCodeForm.controls["has_menu"].setErrors(null);
            // this.serviceCodeForm.controls["action_id"].setValue("null");
            // this.serviceCodeForm.controls["action_id"].setErrors(null);
            // this.showEsmeDropdown = false;
            this.showProtocolDropDown = true;
            this.showEsmeDropdown = true;
            // this.serviceCodeForm.controls["esme_protocol"].setValidators(
            //   Validators.required
            // );
            this.serviceCodeForm.controls["consent_menu"].setValidators(forms_1.Validators.required);
            this.serviceCodeForm.controls["consent_lifetime"].setValidators([
                forms_1.Validators.required,
                forms_1.Validators.pattern("^[0-9]+$"),
            ]);
            this.serviceCodeForm.controls["bank_id"].setValidators([
                forms_1.Validators.required,
                forms_1.Validators.pattern("^[0-9]+$"),
            ]);
            this.serviceCodeForm.controls["bank_api_url"].setValidators(forms_1.Validators.required);
            this.serviceCodeForm.controls["authentication_api_url"].setValidators(forms_1.Validators.required);
            this.serviceCodeForm.controls["bank_user_name"].setValidators(forms_1.Validators.required);
            this.serviceCodeForm.controls["bank_password"].setValidators(forms_1.Validators.required);
        }
        else {
            // this.serviceCodeForm.controls["fixed"].setValue(false);
            // this.serviceCodeForm.controls["relative"].setValue(false);
            this.serviceCodeForm.controls["has_menu"].enable();
            // this.showEsmeDropdown = true;
            this.showProtocolDropDown = true;
            this.serviceCodeForm.controls["consent_menu"].setValue(null);
            this.serviceCodeForm.controls["consent_menu"].setErrors(null);
            this.serviceCodeForm.controls["consent_lifetime"].setValue(null);
            this.serviceCodeForm.controls["consent_lifetime"].setErrors(null);
            this.serviceCodeForm.controls["bank_id"].setValue(null);
            this.serviceCodeForm.controls["bank_id"].setErrors(null);
            this.serviceCodeForm.controls["bank_api_url"].setValue(null);
            this.serviceCodeForm.controls["bank_api_url"].setErrors(null);
            this.serviceCodeForm.controls["authentication_api_url"].setValue(null);
            this.serviceCodeForm.controls["authentication_api_url"].setErrors(null);
            this.serviceCodeForm.controls["bank_user_name"].setValue(null);
            this.serviceCodeForm.controls["bank_user_name"].setErrors(null);
            this.serviceCodeForm.controls["bank_password"].setValue(null);
            this.serviceCodeForm.controls["bank_password"].setErrors(null);
            this.serviceCodeForm.controls["has_menu"].setValidators(forms_1.Validators.required);
        }
    };
    ServiceCodeAddComponent.prototype.onCheckBox2 = function (value) {
        if (!this.serviceCodeForm.value.is_bank_short_code) {
            if (value == true) {
                console.log("In If");
                // this.serviceCodeForm.controls["action_id"].setValue(0);
                // this.serviceCodeForm.controls["action_id"].setErrors(null);
                // this.serviceCodeForm.controls["esme_protocol"].setValue(0);
                // this.serviceCodeForm.controls["esme_protocol"].setErrors(null);
                // this.serviceCodeForm.value.has_menu =
                //   !this.serviceCodeForm.value.has_menu;
                this.showProtocolDropDown = false;
                this.showEsmeDropdown = false;
            }
            else {
                console.log("In else");
                // this.serviceCodeForm.value.has_menu =
                //   !this.serviceCodeForm.value.has_menu;
                // this.showEsmeDropdown = true;
                this.showProtocolDropDown = true;
                this.showEsmeDropdown = true;
            }
        }
        console.log(this.serviceCodeForm.value);
    };
    ServiceCodeAddComponent.prototype.checkSubService = function () {
        if (this.historyData == "subService") {
            console.log("in change");
            if (!this.serviceCodeForm.value.short_code.includes(history.state.data.short_code.replace(/#$/, "*"))) {
                this.serviceCodeForm.controls["short_code"].setValue(history.state.data.short_code.replace(/#$/, "*"));
            }
        }
    };
    ServiceCodeAddComponent.prototype.patchingValues = function () {
        this.serviceCodeForm.patchValue({
            short_code: history.state.data.short_code,
            // subServiceCode: "*12345*45#",
            title: history.state.data.code_title,
            description: history.state.data.code_description,
            is_chargable: history.state.data.is_chargable == 1
                ? (history.state.data.is_chargable = true)
                : false,
            has_menu: history.state.data.has_menu == 1
                ? (history.state.data.has_menu = true)
                : false,
            charge_type: history.state.data.is_chargable == 0
                ? 0
                : history.state.data.charge_type,
            amount: history.state.data.is_chargable == 0 ? 0 : history.state.data.amount,
            esme_charging_msisdn: history.state.data.esme_charging_msisdn,
            action_id: history.state.data.action_id,
            parent_id: history.state.data.id,
            session_timeout: history.state.data.session_timeout / 1000,
            previous_option: history.state.data.previous_option,
            fixed: history.state.data.fixed == 1
                ? (history.state.data.fixed = true)
                : false,
            relative: history.state.data.relative == 1
                ? (history.state.data.relative = true)
                : false,
            is_bank_short_code: history.state.data.is_bank_short_code == 1
                ? (history.state.data.is_bank_short_code = true)
                : false,
            consent_menu: history.state.data.consent_menu,
            consent_lifetime: history.state.data.consent_lifetime,
            bank_id: history.state.data.bank_id,
            bank_api_url: history.state.data.bank_api_url,
            authentication_api_url: history.state.data.authentication_api_url,
            bank_user_name: history.state.data.bank_user_name,
            bank_password: history.state.data.bank_password,
            esme_protocol: history.state.data.esme_protocol,
            is_sponsored_charging: history.state.data.is_sponsored_charging == 1
                ? (history.state.data.is_sponsored_charging = true)
                : false,
            is_sensitive: history.state.data.is_sensitive == 1 ? true : false
        });
    };
    ServiceCodeAddComponent.prototype.patchingValuesSubService = function () {
        this.serviceCodeForm.patchValue({
            short_code: history.state.data.short_code.replace(/#$/, "*"),
            // subServiceCode: "*12345*45#",
            parent_id: history.state.data.id
        });
    };
    ServiceCodeAddComponent.prototype.getHttpSmppConfig = function (id) {
        var _this = this;
        this.allService.getHttpSmppConf(id).subscribe({
            next: function (res) {
                if (res.success == true) {
                    if (res.data.data.length > 0) {
                        _this.esmes = res.data.data;
                    }
                    console.log("this.esmes", _this.esmes);
                }
            },
            error: function (e) {
                console.log("Error===========>", e);
            }
        });
    };
    ServiceCodeAddComponent.prototype.updateFieldHistory = function () {
        if (history.state.data.esme_protocol != null) {
            this.getHttpSmppConfig(history.state.data.esme_protocol);
        }
    };
    ServiceCodeAddComponent.prototype.updateField = function (value) {
        this.esmes = [];
        console.log("value", value);
        if (value == 1) {
            this.showEsmeDropdown = true;
            this.serviceCodeForm.controls["action_id"].setValue(null);
            this.getHttpSmppConfig(value);
        }
        else if (value == 2) {
            this.showEsmeDropdown = true;
            this.serviceCodeForm.controls["action_id"].setValue(null);
            this.getHttpSmppConfig(value);
        }
        else {
            this.showEsmeDropdown = false;
        }
    };
    ServiceCodeAddComponent.prototype.onCheckBox = function (value) {
        if (!this.disable) {
            if (!this.serviceCodeForm.value.is_bank_short_code) {
                if (value == true) {
                    console.log("In If");
                    this.serviceCodeForm.controls["action_id"].setValue(0);
                    this.serviceCodeForm.controls["action_id"].setErrors(null);
                    this.serviceCodeForm.controls["esme_protocol"].setValue(0);
                    this.serviceCodeForm.controls["esme_protocol"].setErrors(null);
                    // this.serviceCodeForm.value.has_menu =
                    //   !this.serviceCodeForm.value.has_menu;
                    this.showProtocolDropDown = false;
                    this.showEsmeDropdown = false;
                }
                else {
                    this.showProtocolDropDown = true;
                    this.serviceCodeForm.controls["action_id"].setValue(null);
                    this.serviceCodeForm.controls["esme_protocol"].setValue(null);
                }
                console.log("working");
            }
            console.log(this.serviceCodeForm.value);
        }
    };
    ServiceCodeAddComponent.prototype.banking = function (value) {
        if (!this.disable) {
            if (value == true) {
                this.serviceCodeForm.controls["has_menu"].setValue(false);
                this.serviceCodeForm.controls["has_menu"].disable();
                this.serviceCodeForm.controls["fixed"].setValue(true);
                this.serviceCodeForm.controls["relative"].setValue(false);
                this.serviceCodeForm.controls["has_menu"].setErrors(null);
                this.serviceCodeForm.controls["esme_protocol"].setValue(null);
                // this.serviceCodeForm.controls["action_id"].setValue("null");
                // this.serviceCodeForm.controls["action_id"].setErrors(null);
                // this.showEsmeDropdown = false;
                this.showProtocolDropDown = true;
                this.serviceCodeForm.controls["esme_protocol"].setValidators(forms_1.Validators.required);
                this.serviceCodeForm.controls["consent_menu"].setValidators(forms_1.Validators.required);
                this.serviceCodeForm.controls["consent_lifetime"].setValidators([
                    forms_1.Validators.min(0),
                    forms_1.Validators.required,
                ]);
                this.serviceCodeForm.controls["bank_id"].setValidators([
                    forms_1.Validators.required,
                    forms_1.Validators.pattern("^[0-9]+$"),
                ]);
                this.serviceCodeForm.controls["bank_api_url"].setValidators(forms_1.Validators.required);
                this.serviceCodeForm.controls["authentication_api_url"].setValidators(forms_1.Validators.required);
                this.serviceCodeForm.controls["bank_user_name"].setValidators(forms_1.Validators.required);
                // this.serviceCodeForm.controls["bank_user_name"].setValidators(
                //   [ Validators.required,Validators.pattern('^[a-z A-Z _ .]+$')]
                //  );
                this.serviceCodeForm.controls["bank_password"].setValidators(forms_1.Validators.required);
            }
            else {
                // this.serviceCodeForm.controls["fixed"].setValue(false);
                // this.serviceCodeForm.controls["relative"].setValue(false);
                if (!this.serviceCodeForm.controls.is_sponsored_charging.value) {
                    this.serviceCodeForm.controls["has_menu"].enable();
                }
                // this.serviceCodeForm.controls["has_menu"].enable();
                // this.showEsmeDropdown = true;
                this.showProtocolDropDown = true;
                this.serviceCodeForm.controls["consent_menu"].setValue(null);
                this.serviceCodeForm.controls["consent_menu"].setErrors(null);
                this.serviceCodeForm.controls["consent_lifetime"].setValue(null);
                this.serviceCodeForm.controls["consent_lifetime"].setErrors(null);
                this.serviceCodeForm.controls["bank_id"].setValue(null);
                this.serviceCodeForm.controls["bank_id"].setErrors(null);
                this.serviceCodeForm.controls["bank_api_url"].setValue(null);
                this.serviceCodeForm.controls["bank_api_url"].setErrors(null);
                this.serviceCodeForm.controls["authentication_api_url"].setValue(null);
                this.serviceCodeForm.controls["authentication_api_url"].setErrors(null);
                this.serviceCodeForm.controls["bank_user_name"].setValue(null);
                this.serviceCodeForm.controls["bank_user_name"].setErrors(null);
                this.serviceCodeForm.controls["bank_password"].setValue(null);
                this.serviceCodeForm.controls["bank_password"].setErrors(null);
                this.serviceCodeForm.controls["has_menu"].setValidators(forms_1.Validators.required);
                // this.serviceCodeForm.patchValue({
                //   consent_menu: "-",
                //   consent_lifetime: 0,
                //   bank_id: 0,
                //   bank_api_url: 0,
                //   authentication_api_url: "-",
                //   bank_user_name: "-",
                //   bank_password: "-",
                // });
            }
        }
    };
    ServiceCodeAddComponent.prototype.chargeableHistory = function (value) {
        if (value) {
            this.serviceCodeForm.controls["charge_type"].setValidators(forms_1.Validators.required);
            this.serviceCodeForm.controls["intervals"].setValidators(forms_1.Validators.required);
            this.serviceCodeForm.controls["is_sponsored_charging"].enable();
            // if (this.serviceCodeForm.getRawValue().is_sponsored_charging == false) {
            //   this.serviceCodeForm.controls["is_sponsored_charging"].setValue(false);
            //   this.serviceCodeForm.controls["is_sponsored_charging"].disable();
            // } else {
            //   this.serviceCodeForm.controls["is_sponsored_charging"].enable();
            //   //   this.serviceCodeForm.controls["is_sponsored_charging"].setValue(true);
            // }
            if (this.serviceCodeForm.getRawValue().has_menu == false) {
                // this.serviceCodeForm.controls["esme_protocol"].setValue(null);
                // this.serviceCodeForm.controls["esme_protocol"].setValidators(
                //   Validators.required
                // );
                console.log("false ma ha charge");
                this.showProtocolDropDown = true;
                this.showEsmeDropdown = true;
            }
            else {
                console.log("false ma ha debbug123ger");
                // this.showProtocolDropDown = false;
                // this.showEsmeDropdown = false;
                this.serviceCodeForm.controls["esme_protocol"].setValue(null);
                // this.serviceCodeForm.controls["esme_protocol"].setErrors(null);
            }
            this.serviceCodeForm.controls["amount"].setValidators([
                forms_1.Validators.required,
                forms_1.Validators.min(0),
                forms_1.Validators.pattern("^[.0-9]+$"),
            ]);
        }
        else {
            // this.showProtocolDropDown = false;
            // this.showEsmeDropdown = false;
            // this.serviceCodeForm.controls["esme_protocol"].setValue(null);
            // this.serviceCodeForm.controls["esme_protocol"].setErrors(null);
            this.serviceCodeForm.controls["charge_type"].setValue(null);
            this.serviceCodeForm.controls["charge_type"].setErrors(null);
            this.serviceCodeForm.controls["intervals"].setValue(null);
            this.serviceCodeForm.controls["intervals"].setErrors(null);
            this.serviceCodeForm.controls["is_sponsored_charging"].setValue(false);
            this.serviceCodeForm.controls["is_sponsored_charging"].disable();
            this.serviceCodeForm.controls["amount"].setValue(null);
            this.serviceCodeForm.controls["amount"].setErrors(null);
            this.serviceCodeForm.controls["esme_charging_msisdn"].setErrors(null);
            this.serviceCodeForm.controls["esme_charging_msisdn"].setValidators(null);
        }
        this.update_sponsored();
        console.log("this.serviceCodeForm.value.is_chargable", this.serviceCodeForm.value.is_chargable);
    };
    ServiceCodeAddComponent.prototype.chargeable = function (value) {
        if (value) {
            this.serviceCodeForm.controls["charge_type"].setValidators(forms_1.Validators.required);
            this.serviceCodeForm.controls["intervals"].setValidators(forms_1.Validators.required);
            this.serviceCodeForm.controls["esme_protocol"].setValue(null);
            this.serviceCodeForm.controls["is_sponsored_charging"].setValue(true);
            this.serviceCodeForm.controls["is_sponsored_charging"].enable();
            this.showProtocolDropDown = true;
            this.serviceCodeForm.controls["amount"].setValidators([
                forms_1.Validators.required,
                forms_1.Validators.min(0),
                forms_1.Validators.pattern("^[.0-9]+$"),
            ]);
        }
        else {
            this.showProtocolDropDown = true;
            this.showEsmeDropdown = false;
            this.serviceCodeForm.controls["esme_protocol"].setValue(null);
            //    this.serviceCodeForm.controls["esme_protocol"].setErrors(null);
            this.serviceCodeForm.controls["charge_type"].setValue(null);
            this.serviceCodeForm.controls["charge_type"].setErrors(null);
            this.serviceCodeForm.controls["intervals"].setValue(null);
            this.serviceCodeForm.controls["intervals"].setErrors(null);
            this.serviceCodeForm.controls["is_sponsored_charging"].setValue(false);
            this.serviceCodeForm.controls["is_sponsored_charging"].disable();
            this.serviceCodeForm.controls["amount"].setValue(null);
            this.serviceCodeForm.controls["amount"].setErrors(null);
            this.serviceCodeForm.controls["esme_charging_msisdn"].setErrors(null);
            this.serviceCodeForm.controls["esme_charging_msisdn"].setValidators(null);
        }
        this.update_sponsored();
        console.log("this.serviceCodeForm.value.is_chargable", this.serviceCodeForm.value.is_chargable);
    };
    ServiceCodeAddComponent.prototype.findDropdownIDs = function () {
        var _this = this;
        var _a;
        console.log(this.serviceCodeForm.value.action_id);
        var id = this.esmes.filter(function (findID) {
            return findID.esme_name == _this.serviceCodeForm.value.action_id;
        });
        this.serviceCodeForm.controls["action_id"].setValue((_a = id[0]) === null || _a === void 0 ? void 0 : _a.esme_id);
    };
    ServiceCodeAddComponent.prototype.onSubmit = function () {
        var _this = this;
        // SERVICE CALL FOR POST REQUEST ON FORM SUBMISSION
        this.displayLoader = true;
        var formdata;
        if (this.serviceCodeForm.value.has_menu == false) {
            this.findDropdownIDs();
        }
        formdata = this.serviceCodeForm.getRawValue();
        // console.log("Service Code Data::", this.serviceCodeForm.value);
        formdata.session_timeout = formdata.session_timeout * 1000;
        console.log("formdata", formdata);
        this.allService.addServiceCode(formdata).subscribe(function (res) {
            if (!res.success) {
                _this.alert.success(res.message);
                _this.displayLoader = false;
                console.log(res);
                return false;
            }
            _this.alert.success(res.message);
            _this.displayLoader = false;
            _this.router.navigate(["/service-code-list-view"]);
        }, function (error) {
            console.log("Error===========>", error.error.error.message);
            if (error.error.error.message != undefined) {
                if (error.error.error.message.includes("1062")) {
                    _this.alert.danger("Duplicate entries are not allowed");
                    _this.displayLoader = false;
                    return true;
                }
                _this.displayLoader = false;
            }
            _this.alert.danger("Something went wrong!");
            _this.displayLoader = false;
        });
    };
    ServiceCodeAddComponent.prototype.editService = function () {
        // SERVICE CALL FOR POST REQUEST ON FORM SUBMISSION
        var _this = this;
        var formdata;
        formdata = this.serviceCodeForm.getRawValue();
        formdata.session_timeout = formdata.session_timeout * 1000;
        var dialogRef = this.dialog.open(draft_modal_component_1.DraftModalComponent, {
            data: {
                name: "editService",
                heading: "Are you sure you want to edit this service code?",
                formdata: formdata
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.displayLoader = true;
        });
        dialogRef.componentInstance.onSave.subscribe(function (result) {
            _this.displayLoader = false;
        });
    };
    ServiceCodeAddComponent.prototype.clearForm = function () {
        console.log("Service Code Data::", this.serviceCodeForm.getRawValue());
        console.log("Service Code Data::", this.serviceCodeForm);
        // this.serviceCodeForm.reset();
        // console.log("Service Code Data::", this.serviceCodeForm.valid);
        // console.log("Service Code Data::", this.serviceCodeForm);
    };
    ServiceCodeAddComponent.prototype.checkRadio = function (event) {
        console.log(event);
        console.log(event.value);
        console.log(this.serviceCodeForm.value.radioButtons);
        if (this.serviceCodeForm.value.radioButtons == true) {
            this.serviceCodeForm.controls["fixed"].setValue(true);
            this.serviceCodeForm.controls["relative"].setValue(false);
        }
        if (this.serviceCodeForm.value.radioButtons == false) {
            this.serviceCodeForm.controls["fixed"].setValue(false);
            this.serviceCodeForm.controls["relative"].setValue(true);
        }
    };
    ServiceCodeAddComponent.prototype.radioButtonsCheck = function () {
        if (history.state.data.fixed == 1) {
            this.serviceCodeForm.controls["radioButtons"].setValue(true);
        }
        else if (history.state.data.relative == 1) {
            this.serviceCodeForm.controls["radioButtons"].setValue(false);
        }
        else {
            this.serviceCodeForm.controls["radioButtons"].setValue(null);
        }
    };
    ServiceCodeAddComponent.prototype.update_sponsored = function () {
        if (this.serviceCodeForm.controls.is_sponsored_charging.value) {
            if (this.treeExistMaintainer == false) {
                this.serviceCodeForm.controls["has_menu"].setValue(false);
                this.serviceCodeForm.controls["has_menu"].disable();
            }
            this.showProtocolDropDown = true;
            this.serviceCodeForm.controls["esme_charging_msisdn"].setValidators([
                forms_1.Validators.required,
                forms_1.Validators.minLength(6),
                forms_1.Validators.pattern("^[0-9]+$"),
                forms_1.Validators.maxLength(16),
            ]);
        }
        else {
            console.log(this.serviceCodeForm.value.is_chargable);
            if (!this.serviceCodeForm.value.is_bank_short_code &&
                this.treeExistMaintainer == false) {
                this.serviceCodeForm.controls["has_menu"].enable();
            }
            this.serviceCodeForm.controls["esme_charging_msisdn"].setValue(null);
            this.serviceCodeForm.controls["esme_charging_msisdn"].setValidators(null);
            this.serviceCodeForm.controls["esme_charging_msisdn"].setErrors(null);
        }
    };
    ServiceCodeAddComponent.prototype.update_sms = function () {
        if (this.serviceCodeForm.controls.sms_text.value) {
            this.serviceCodeForm.controls["sms_text"].setValidators([
                forms_1.Validators.required,
            ]);
        }
        else {
            this.serviceCodeForm.controls["sms_text"].clearValidators();
            this.serviceCodeForm.controls["sms_text"].updateValueAndValidity();
        }
    };
    ServiceCodeAddComponent.prototype.numSequence = function (n) {
        return Array(n);
    };
    ServiceCodeAddComponent.prototype.changeIntervals = function () {
        this.setInterval = this.serviceCodeForm.value.intervals;
    };
    ServiceCodeAddComponent.prototype.setIntervalRanges = function (index) {
        console.log("index", index);
        // console.log(this.myNameElem.nativeElement.value);
        // console.log(element("#slider")[0].val());
        console.log(document.getElementById("slider"));
        if (index == this.currentIndex) {
        }
        else {
            this.alert.danger("Enter Interval " + this.currentIndex + " first");
        }
    };
    __decorate([
        core_1.ViewChild("slider")
    ], ServiceCodeAddComponent.prototype, "myNameElem");
    ServiceCodeAddComponent = __decorate([
        core_1.Component({
            selector: "app-service-code-add",
            templateUrl: "./service-code-add.component.html",
            styleUrls: ["./service-code-add.component.css"],
            animations: [animations_1.fadeSlideInOut]
        })
    ], ServiceCodeAddComponent);
    return ServiceCodeAddComponent;
}());
exports.ServiceCodeAddComponent = ServiceCodeAddComponent;
