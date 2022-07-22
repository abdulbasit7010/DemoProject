"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.StringsBasedChargingComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var StringsBasedChargingComponent = /** @class */ (function () {
    function StringsBasedChargingComponent(allService, alert, router, formBuilder) {
        this.allService = allService;
        this.alert = alert;
        this.router = router;
        this.formBuilder = formBuilder;
        this.serviceCodes = [];
        this.numOfFiles = 1;
        this.heading = "String Based Charging";
        this.edit = false;
        this.short_code = new forms_1.FormControl("", [forms_1.Validators.required]);
        this.chargeable = new forms_1.FormControl(false, [forms_1.Validators.required]);
        this.addressForm = this.formBuilder.group({
            addresses: this.formBuilder.array([this.createAddress()])
        });
    }
    StringsBasedChargingComponent.prototype.ngOnInit = function () {
        this.getCodes();
        this.form();
        this.addAddress(1);
    };
    StringsBasedChargingComponent.prototype.getCodes = function () {
        var _this = this;
        this.allService.getServiceCodesList().subscribe({
            next: function (res) {
                if (res.success != true) {
                    alert(res.message);
                    return false;
                }
                _this.serviceCodes = res.data.map(function (value) { return value.short_code; });
            },
            error: function (e) {
                console.log("Error=========>", e);
            }
        });
    };
    StringsBasedChargingComponent.prototype.form = function () {
        this.stringForm = this.formBuilder.group({
            short_code: this.short_code,
            chargeable: this.chargeable
        });
        if (history.state.data != undefined) {
            this.edit = true;
            this.heading =
                "Edit String based Charging " +
                    "(" +
                    history.state.data.msisdn_pattern +
                    ")";
            this.stringForm.patchValue({
                chargeable: history.state.data.chargeable,
                short_code: history.state.data.short_code
            });
        }
    };
    StringsBasedChargingComponent.prototype.onSubmit = function () {
        var _this = this;
        var formdata;
        var msisdn_pattern = this.edit
            ? history.state.data.short_code.slice(0, -1)
            : this.stringForm.value.short_code.slice(0, -1);
        console.log("this.addresses.value", this.addresses.value);
        for (var _i = 0, _a = this.addresses.value; _i < _a.length; _i++) {
            var x = _a[_i];
            msisdn_pattern = msisdn_pattern + "*" + x.addValue;
        }
        console.log("msisdn_pattern", msisdn_pattern);
        // for (let j = 1; j <= this.countMaintainer; j++) {
        //   console.log(
        //     (<HTMLInputElement>document.getElementById("input" + j)).value
        //   );
        //   if (
        //     (<HTMLInputElement>document.getElementById("input" + j)).value == ""
        //   ) {
        //     this.alert.danger("Enter all values to proceed");
        //     msisdn_pattern = null;
        //     break;
        //   } else {
        //     msisdn_pattern =
        //       msisdn_pattern +
        //       "*" +
        //       (<HTMLInputElement>(
        //         document.getElementById("input" + j)
        //       )).value.toString();
        //   }
        // }
        if (msisdn_pattern == null) {
            return;
        }
        else {
            msisdn_pattern = msisdn_pattern + "#";
            var data = Object.assign(this.stringForm.value, {
                msisdn_pattern: msisdn_pattern
            });
            console.log("data", data);
            if (!this.edit) {
                this.allService.addStringsBasedCharging(data).subscribe(function (res) {
                    if (!res.success) {
                        _this.alert.danger("Cannot add string based charging, please try again");
                        return;
                    }
                    _this.alert.success("String based charging added successfully");
                    _this.router.navigateByUrl("/stringBasedChargingView");
                }, function (error) {
                    _this.alert.danger("Cannot add string based charging, please try again");
                });
            }
            else {
                this.allService
                    .editStringsBasedCharging(data, history.state.data.id)
                    .subscribe(function (res) {
                    if (!res.success) {
                        _this.alert.danger("Cannot add string based charging, please try again");
                        return;
                    }
                    _this.alert.success("String based charging edited successfully");
                    _this.router.navigateByUrl("/stringBasedChargingView");
                }, function (error) {
                    _this.alert.danger("Cannot add string based charging, please try again");
                });
            }
        }
    };
    Object.defineProperty(StringsBasedChargingComponent.prototype, "addressControls", {
        get: function () {
            return this.addressForm.get("addresses")["controls"];
        },
        enumerable: false,
        configurable: true
    });
    StringsBasedChargingComponent.prototype.addAddress = function (count) {
        var _this = this;
        this.addresses = this.addressForm.get("addresses");
        this.addresses.push(this.createAddress());
        this.addresses.clear();
        var fillArray = function (value, len) {
            var arr = [];
            for (var i = 0; i < len; i++) {
                _this.addresses.push(_this.createAddress());
            }
            return arr;
        };
        fillArray(2, count);
    };
    StringsBasedChargingComponent.prototype.createAddress = function () {
        return this.formBuilder.group({
            addValue: ""
        });
    };
    StringsBasedChargingComponent.prototype.increment = function (value, condition) {
        if (condition == 1) {
            if (value == 9)
                return false;
            this.numOfFiles = ++this.numOfFiles;
            this.addAddress(value + 1);
        }
        else {
            if (value == 1)
                return false;
            this.numOfFiles = --this.numOfFiles;
            this.addAddress(value - 1);
        }
    };
    StringsBasedChargingComponent = __decorate([
        core_1.Component({
            selector: "app-strings-based-charging",
            templateUrl: "./strings-based-charging.component.html",
            styleUrls: ["./strings-based-charging.component.css"]
        })
    ], StringsBasedChargingComponent);
    return StringsBasedChargingComponent;
}());
exports.StringsBasedChargingComponent = StringsBasedChargingComponent;
