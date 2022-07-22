import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { AllService } from "../../../../core/services/stats-service/all.service";
import { AlertService } from "ngx-alerts";
import { Observable } from "rxjs";
import { fadeSlideInOut } from "@app/animations";
import { StringValidator } from "@app/shared/validators/string.validators";
import { MatDialog } from "@angular/material/dialog";
import { DraftModalComponent } from "@app/shared/draft-modal/draft-modal.component";
import { map, startWith } from "rxjs/operators";
import { Options, LabelType } from "@angular-slider/ngx-slider";

@Component({
  selector: "app-service-code-add",
  templateUrl: "./service-code-add.component.html",
  styleUrls: ["./service-code-add.component.css"],
  animations: [fadeSlideInOut],
})
export class ServiceCodeAddComponent implements OnInit {
  addEditServiceChecker: boolean = false;
  displayLoader: boolean = false;
  serviceCodeForm: FormGroup;
  state$: Observable<object>;
  historyData;
  serviceConfig = [];
  prefixService: any;
  showEsmeDropdown = false;
  showProtocolDropDown = true;
  hide: boolean = true;
  treeExistMaintainer = false;

  constructor(
    private formBuilder: FormBuilder,
    private allService: AllService,
    private alert: AlertService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  @ViewChild("slider") myNameElem: ElementRef;
  short_code: FormControl = new FormControl("", [
    Validators.required,
    Validators.pattern(
      history.state.checker
        ? /^\*[0-9]+\*[0-9]+\#$/
        : /^(\*|\#)[0-9]+([\*]+[0-9]+)*\#$/
    ),
  ]);
  patternText = "Must start with * and end with #.";
  is_sponsored_charging: FormControl = new FormControl(false, [
    Validators.required,
  ]);
  esme_charging_msisdn: FormControl = new FormControl(null);
  title: FormControl = new FormControl("", [
    Validators.required,
    StringValidator.noAllSpaces,
  ]);
  description: FormControl = new FormControl("", [
    Validators.required,
    StringValidator.noAllSpaces,
  ]);
  action_id: FormControl = new FormControl("", [Validators.required]);
  is_chargable: FormControl = new FormControl(false, [Validators.required]);
  optional_sms: FormControl = new FormControl(false, [Validators.required]);
  has_menu: FormControl = new FormControl(false, [Validators.required]);
  charge_type: FormControl = new FormControl(null);
  intervals: FormControl = new FormControl(null);
  amount: FormControl = new FormControl(null);
  parent_id: FormControl = new FormControl(0, [Validators.required]);
  session_timeout: FormControl = new FormControl("", [
    Validators.required,
    Validators.pattern("^[0-9]+$"),
  ]);
  previous_option: FormControl = new FormControl("", [
    Validators.required,
    Validators.pattern("^[0-9]+$"),
  ]);
  sms_text: FormControl = new FormControl(null);
  is_bank_short_code: FormControl = new FormControl(false, [
    Validators.required,
  ]);
  esme_protocol: FormControl = new FormControl("", [Validators.required]);

  disable: boolean = false;
  consent_menu: FormControl = new FormControl(null);
  consent_lifetime: FormControl = new FormControl(null);
  bank_id: FormControl = new FormControl(null);
  bank_api_url: FormControl = new FormControl(null);

  authentication_api_url: FormControl = new FormControl(null);
  bank_user_name: FormControl = new FormControl(null);
  bank_password: FormControl = new FormControl(null);

  fixed: FormControl = new FormControl(true);
  relative: FormControl = new FormControl(false);
  radioButtons: FormControl = new FormControl(true);
  executeFunctionChecker: boolean = true;
  is_sensitive: FormControl = new FormControl(false, [Validators.required]);
  filteredOptions: Observable<string[]>;

  chargable_types = [
    { name: "Session Based", value: 1 },
    { name: "Event Based", value: 2 },
    { name: "Time Based", value: 3 },
  ];

  protocolNames: any = [
    { id: 1, name: "smpp" },
    { id: 2, name: "http/https" },
  ];
  minValue: number = 0;
  maxValue: number = 30;
  options: Options = {
    floor: 0,
    ceil: 60,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return value.toString();
        case LabelType.High:
          return value.toString();
        default:
          return value.toString();
      }
    },
  };
  // radioButtons = "fixed";
  heading = "Add new service";
  buttonText = "Add Service Code";
  esmes = [];

  ngOnInit(): void {
    this.historyData = history.state.name;

    //  this.getServiceConfigList();
    this.form();
    this.filteredOptions = this.action_id.valueChanges.pipe(
      startWith(""),
      map((value) => this._filter(value || ""))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.esmes.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  _keydown(event: any) {
    if (
      !(
        /^[0-9]+$/.test(event.key) ||
        event.key == "Tab" ||
        event.key == "Backspace"
      )
    ) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
  form() {
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
      is_sensitive: this.is_sensitive,
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
      this.serviceCodeForm.controls["esme_protocol"].setValue(
        history.state.data.esme_protocol
      );
      this.serviceCodeForm.controls["optional_sms"].setValue(
        history.state.data.optional_sms
      );
      this.serviceCodeForm.controls["sms_text"].setValue(
        history.state.data.sms_text
      );

      this.update_sms();
      this.checkRadio(this.serviceCodeForm.getRawValue().radioButtons);
      this.bankingHistory(
        this.serviceCodeForm.getRawValue().is_bank_short_code
      );
      this.onCheckBox2(this.serviceCodeForm.getRawValue().has_menu);
      this.chargeableHistory(this.serviceCodeForm.getRawValue().is_chargable);
      this.update_sponsored();
      if (
        history.state.data.is_whitelist == 1 ||
        history.state.data.is_normal == 1
      ) {
        this.executeFunctionChecker = false;
        this.treeExistMaintainer = true;
        this.disableFields();
      }
      this.serviceCodeForm.get("short_code").disable();
    }
  }

  disableFields() {
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
  }

  bankingHistory(value) {
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

      this.serviceCodeForm.controls["consent_menu"].setValidators(
        Validators.required
      );

      this.serviceCodeForm.controls["consent_lifetime"].setValidators([
        Validators.required,
        Validators.pattern("^[0-9]+$"),
      ]);

      this.serviceCodeForm.controls["bank_id"].setValidators([
        Validators.required,
        Validators.pattern("^[0-9]+$"),
      ]);

      this.serviceCodeForm.controls["bank_api_url"].setValidators(
        Validators.required
      );

      this.serviceCodeForm.controls["authentication_api_url"].setValidators(
        Validators.required
      );

      this.serviceCodeForm.controls["bank_user_name"].setValidators(
        Validators.required
      );

      this.serviceCodeForm.controls["bank_password"].setValidators(
        Validators.required
      );
    } else {
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

      this.serviceCodeForm.controls["has_menu"].setValidators(
        Validators.required
      );
    }
  }

  onCheckBox2(value) {
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
      } else {
        console.log("In else");
        // this.serviceCodeForm.value.has_menu =
        //   !this.serviceCodeForm.value.has_menu;
        // this.showEsmeDropdown = true;
        this.showProtocolDropDown = true;
        this.showEsmeDropdown = true;
      }
    }
    console.log(this.serviceCodeForm.value);
  }

  checkSubService() {
    if (this.historyData == "subService") {
      console.log("in change");
      if (
        !this.serviceCodeForm.value.short_code.includes(
          history.state.data.short_code.replace(/#$/, "*")
        )
      ) {
        this.serviceCodeForm.controls["short_code"].setValue(
          history.state.data.short_code.replace(/#$/, "*")
        );
      }
    }
  }

  patchingValues() {
    this.serviceCodeForm.patchValue({
      short_code: history.state.data.short_code,
      // subServiceCode: "*12345*45#",
      title: history.state.data.code_title,
      description: history.state.data.code_description,
      is_chargable:
        history.state.data.is_chargable == 1
          ? (history.state.data.is_chargable = true)
          : false,
      has_menu:
        history.state.data.has_menu == 1
          ? (history.state.data.has_menu = true)
          : false,
      charge_type:
        history.state.data.is_chargable == 0
          ? 0
          : history.state.data.charge_type,
      amount:
        history.state.data.is_chargable == 0 ? 0 : history.state.data.amount,
      esme_charging_msisdn: history.state.data.esme_charging_msisdn,
      action_id: history.state.data.action_id,
      parent_id: history.state.data.id,
      session_timeout: history.state.data.session_timeout / 1000,
      previous_option: history.state.data.previous_option,
      fixed:
        history.state.data.fixed == 1
          ? (history.state.data.fixed = true)
          : false,
      relative:
        history.state.data.relative == 1
          ? (history.state.data.relative = true)
          : false,
      is_bank_short_code:
        history.state.data.is_bank_short_code == 1
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
      is_sponsored_charging:
        history.state.data.is_sponsored_charging == 1
          ? (history.state.data.is_sponsored_charging = true)
          : false,
      is_sensitive: history.state.data.is_sensitive == 1 ? true : false,
    });
  }

  patchingValuesSubService() {
    this.serviceCodeForm.patchValue({
      short_code: history.state.data.short_code.replace(/#$/, "*"),
      // subServiceCode: "*12345*45#",
      parent_id: history.state.data.id,
    });
  }

  getHttpSmppConfig(id) {
    this.allService.getHttpSmppConf(id).subscribe({
      next: (res: any) => {
        if (res.success == true) {
          if (res.data.data.length > 0) {
            this.esmes = res.data.data;
          }
          console.log("this.esmes", this.esmes);
        }
      },
      error(e) {
        console.log("Error===========>", e);
      },
    });
  }

  updateFieldHistory() {
    if (history.state.data.esme_protocol != null) {
      this.getHttpSmppConfig(history.state.data.esme_protocol);
    }
  }

  updateField(value) {
    this.esmes = [];
    console.log("value", value);
    if (value == 1) {
      this.showEsmeDropdown = true;
      this.serviceCodeForm.controls["action_id"].setValue(null);
      this.getHttpSmppConfig(value);
    } else if (value == 2) {
      this.showEsmeDropdown = true;
      this.serviceCodeForm.controls["action_id"].setValue(null);
      this.getHttpSmppConfig(value);
    } else {
      this.showEsmeDropdown = false;
    }
  }

  onCheckBox(value) {
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
        } else {
          this.showProtocolDropDown = true;
          this.serviceCodeForm.controls["action_id"].setValue(null);
          this.serviceCodeForm.controls["esme_protocol"].setValue(null);
        }
        console.log("working");
      }
      console.log(this.serviceCodeForm.value);
    }
  }

  banking(value) {
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

        this.serviceCodeForm.controls["esme_protocol"].setValidators(
          Validators.required
        );

        this.serviceCodeForm.controls["consent_menu"].setValidators(
          Validators.required
        );

        this.serviceCodeForm.controls["consent_lifetime"].setValidators([
          Validators.min(0),
          Validators.required,
        ]);

        this.serviceCodeForm.controls["bank_id"].setValidators([
          Validators.required,
          Validators.pattern("^[0-9]+$"),
        ]);

        this.serviceCodeForm.controls["bank_api_url"].setValidators(
          Validators.required
        );

        this.serviceCodeForm.controls["authentication_api_url"].setValidators(
          Validators.required
        );

        this.serviceCodeForm.controls["bank_user_name"].setValidators(
          Validators.required
        );
        // this.serviceCodeForm.controls["bank_user_name"].setValidators(
        //   [ Validators.required,Validators.pattern('^[a-z A-Z _ .]+$')]
        //  );
        this.serviceCodeForm.controls["bank_password"].setValidators(
          Validators.required
        );
      } else {
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

        this.serviceCodeForm.controls["has_menu"].setValidators(
          Validators.required
        );

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
  }

  chargeableHistory(value: boolean) {
    if (value) {
      this.serviceCodeForm.controls["charge_type"].setValidators(
        Validators.required
      );
      this.serviceCodeForm.controls["intervals"].setValidators(
        Validators.required
      );

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
      } else {
        console.log("false ma ha debbug123ger");
        // this.showProtocolDropDown = false;
        // this.showEsmeDropdown = false;
        this.serviceCodeForm.controls["esme_protocol"].setValue(null);
        // this.serviceCodeForm.controls["esme_protocol"].setErrors(null);
      }

      this.serviceCodeForm.controls["amount"].setValidators([
        Validators.required,
        Validators.min(0),
        Validators.pattern("^[.0-9]+$"),
      ]);
    } else {
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

    console.log(
      "this.serviceCodeForm.value.is_chargable",
      this.serviceCodeForm.value.is_chargable
    );
  }

  chargeable(value: boolean) {
    if (value) {
      this.serviceCodeForm.controls["charge_type"].setValidators(
        Validators.required
      );
      this.serviceCodeForm.controls["intervals"].setValidators(
        Validators.required
      );

      this.serviceCodeForm.controls["esme_protocol"].setValue(null);
      this.serviceCodeForm.controls["is_sponsored_charging"].setValue(true);
      this.serviceCodeForm.controls["is_sponsored_charging"].enable();

      this.showProtocolDropDown = true;

      this.serviceCodeForm.controls["amount"].setValidators([
        Validators.required,
        Validators.min(0),
        Validators.pattern("^[.0-9]+$"),
      ]);
    } else {
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

    console.log(
      "this.serviceCodeForm.value.is_chargable",
      this.serviceCodeForm.value.is_chargable
    );
  }

  findDropdownIDs() {
    console.log(this.serviceCodeForm.value.action_id);

    let id = this.esmes.filter((findID) => {
      return findID.esme_name == this.serviceCodeForm.value.action_id;
    });

    this.serviceCodeForm.controls["action_id"].setValue(id[0]?.esme_id);
  }

  onSubmit() {
    // SERVICE CALL FOR POST REQUEST ON FORM SUBMISSION
    this.displayLoader = true;
    let formdata;
    if (this.serviceCodeForm.value.has_menu == false) {
      this.findDropdownIDs();
    }

    formdata = this.serviceCodeForm.getRawValue();
    // console.log("Service Code Data::", this.serviceCodeForm.value);
    formdata.session_timeout = formdata.session_timeout * 1000;
    console.log("formdata", formdata);
    this.allService.addServiceCode(formdata).subscribe(
      (res: any) => {
        if (!res.success) {
          this.alert.success(res.message);
          this.displayLoader = false;
          console.log(res);
          return false;
        }
        this.alert.success(res.message);
        this.displayLoader = false;
        this.router.navigate(["/service-code-list-view"]);
      },
      (error) => {
        console.log("Error===========>", error.error.error.message);
        if (error.error.error.message != undefined) {
          if (error.error.error.message.includes("1062")) {
            this.alert.danger("Duplicate entries are not allowed");
            this.displayLoader = false;
            return true;
          }
          this.displayLoader = false;
        }
        this.alert.danger("Something went wrong!");
        this.displayLoader = false;
      }
    );
  }

  editService() {
    // SERVICE CALL FOR POST REQUEST ON FORM SUBMISSION

    let formdata;
    formdata = this.serviceCodeForm.getRawValue();
    formdata.session_timeout = formdata.session_timeout * 1000;

    const dialogRef = this.dialog.open(DraftModalComponent, {
      data: {
        name: "editService",
        heading: "Are you sure you want to edit this service code?",
        formdata,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.displayLoader = true;
    });

    dialogRef.componentInstance.onSave.subscribe((result) => {
      this.displayLoader = false;
    });
  }

  clearForm() {
    console.log("Service Code Data::", this.serviceCodeForm.getRawValue());
    console.log("Service Code Data::", this.serviceCodeForm);
    // this.serviceCodeForm.reset();
    // console.log("Service Code Data::", this.serviceCodeForm.valid);
    // console.log("Service Code Data::", this.serviceCodeForm);
  }

  checkRadio(event) {
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
  }

  radioButtonsCheck() {
    if (history.state.data.fixed == 1) {
      this.serviceCodeForm.controls["radioButtons"].setValue(true);
    } else if (history.state.data.relative == 1) {
      this.serviceCodeForm.controls["radioButtons"].setValue(false);
    } else {
      this.serviceCodeForm.controls["radioButtons"].setValue(null);
    }
  }
  update_sponsored() {
    if (this.serviceCodeForm.controls.is_sponsored_charging.value) {
      if (this.treeExistMaintainer == false) {
        this.serviceCodeForm.controls["has_menu"].setValue(false);
        this.serviceCodeForm.controls["has_menu"].disable();
      }
      this.showProtocolDropDown = true;

      this.serviceCodeForm.controls["esme_charging_msisdn"].setValidators([
        Validators.required,
        Validators.minLength(6),
        Validators.pattern("^[0-9]+$"),
        Validators.maxLength(16),
      ]);
    } else {
      console.log(this.serviceCodeForm.value.is_chargable);
      if (
        !this.serviceCodeForm.value.is_bank_short_code &&
        this.treeExistMaintainer == false
      ) {
        this.serviceCodeForm.controls["has_menu"].enable();
      }

      this.serviceCodeForm.controls["esme_charging_msisdn"].setValue(null);
      this.serviceCodeForm.controls["esme_charging_msisdn"].setValidators(null);
      this.serviceCodeForm.controls["esme_charging_msisdn"].setErrors(null);
    }
  }
  update_sms() {
    if (this.serviceCodeForm.controls.sms_text.value) {
      this.serviceCodeForm.controls["sms_text"].setValidators([
        Validators.required,
      ]);
    } else {
      this.serviceCodeForm.controls["sms_text"].clearValidators();
      this.serviceCodeForm.controls["sms_text"].updateValueAndValidity();
    }
  }

  numSequence(n: number): Array<number> {
    return Array(n);
  }

  setInterval = 0;
  currentIndex = 1;

  changeIntervals() {
    this.setInterval = this.serviceCodeForm.value.intervals;
  }

  setIntervalRanges(index) {
    console.log("index", index);
    // console.log(this.myNameElem.nativeElement.value);
    // console.log(element("#slider")[0].val());
    console.log(<HTMLFormElement>document.getElementById("slider"));
    if (index == this.currentIndex) {
    } else {
      this.alert.danger("Enter Interval " + this.currentIndex + " first");
    }
  }
}
