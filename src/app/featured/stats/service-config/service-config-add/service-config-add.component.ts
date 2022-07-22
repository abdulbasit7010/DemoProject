import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { fadeSlideInOut } from "@app/animations";
import { AlertService } from "ngx-alerts";
import { Observable } from "rxjs";
import { AllService } from "../../../../core/services/stats-service/all.service";

@Component({
  selector: "app-service-config-add",
  templateUrl: "./service-config-add.component.html",
  styleUrls: ["./service-config-add.component.css"],
  animations: [fadeSlideInOut],
})
export class ServiceConfigAddComponent implements OnInit {
  sidenavOpened: boolean = true;
  serviceConfigForm: FormGroup;
  state$: Observable<object>;

  displayLoader: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private allService: AllService,
    private alert: AlertService,
    private route: Router
  ) { }

  protocol: FormControl = new FormControl("", [Validators.required]);
  serviceName: FormControl = new FormControl("", [Validators.required]);
  description: FormControl = new FormControl("", [Validators.required]);
  requestUrl: FormControl = new FormControl(null);
  requestTypeSelect: FormControl = new FormControl(null);
  systemId: FormControl = new FormControl(null);
  password: FormControl = new FormControl(null);
  destination_ip: FormControl = new FormControl(0);
  port: FormControl = new FormControl(null);
  destination_address: FormControl = new FormControl("", [Validators.required]);
  generic_message: FormControl = new FormControl("", [Validators.required]);
  is_dialog: FormControl = new FormControl(false, [Validators.required]);
  is_subnet: FormControl = new FormControl(false, [Validators.required]);
  is_sponsored_charging: FormControl = new FormControl(false, [
    Validators.required,
  ]);
  is_sms_mo: FormControl = new FormControl(false, [Validators.required]);
  esme_charging_msisdn: FormControl = new FormControl(null);
  esme_mo_msisdn: FormControl = new FormControl(null);
  esme_mo_keyword: FormControl = new FormControl(null);
  subnet: FormControl = new FormControl(null);

  body: FormControl = new FormControl([]);
  addEditServiceConfigChecker: boolean = false;
  bodyKey: any = "";
  bodyValue: any = "";
  bodyObj: any = {};
  protocolNames: any = ["http", "https", "smpp"];
  reqTypes: any = ["GET", "POST"];
  subnetValues: any = [24, 25, 26, 27, 28, 29, 30];

  heading = "Add";
  historyData;
  IPArray = [];

  ngOnInit(): void {
    this.form();
    this.historyData = history.state.name;
    if (this.historyData == "esmeConfig") {
      this.heading = "Edit";
      console.log("history.state.data.protocol", history.state.data);
      this.updateFieldHistory(history.state.data.protocol);
      this.update_sms();
      this.update_sponsored();
      if (this.serviceConfigForm.value.is_subnet) {
        this.IPArray = this.serviceConfigForm.value.destination_ip.split(",");

        this.serviceConfigForm.controls["destination_ip"].setValue(null);
      }
    }
  }

  form() {
    this.serviceConfigForm = this.formBuilder.group({
      serviceName: this.serviceName,
      description: this.description,
      requestUrl: this.requestUrl,
      protocol: this.protocol,
      requestTypeSelect: this.requestTypeSelect,
      body: this.body,
      systemId: this.systemId,
      password: this.password,
      destination_ip: this.destination_ip,
      port: this.port,
      is_dialog: this.is_dialog,
      is_sponsored_charging: this.is_sponsored_charging,
      is_sms_mo: this.is_sms_mo,
      esme_charging_msisdn: this.esme_charging_msisdn,
      esme_mo_msisdn: this.esme_mo_msisdn,
      esme_mo_keyword: this.esme_mo_keyword,
      generic_message: this.generic_message,
      is_subnet: this.is_subnet,
      subnet: this.subnet,
    });

    if (history.state.name == "esmeConfig") {
      this.addEditServiceConfigChecker = true;
      this.serviceConfigForm.patchValue({
        serviceName: history.state.data.service_name,
        description: history.state.data.service_description,
        requestUrl: history.state.data.request_url,
        protocol: history.state.data.protocol,
        requestTypeSelect: history.state.data.request_type,
        body: JSON.parse(history.state.data.request_body),
        systemId: history.state.data.system_id,
        password: history.state.data.system_password,
        destination_ip: history.state.data.destination_ip,
        port: history.state.data.destination_port,
        is_dialog: history.state.data.is_dialog,
        is_sponsored_charging: history.state.data.is_sponsored_charging,
        is_sms_mo: history.state.data.is_sms_mo,
        esme_charging_msisdn: history.state.data.esme_charging_msisdn,
        esme_mo_msisdn:
          history.state.data.esme_mo_msisdn == "null"
            ? null
            : history.state.esme_mo_msisdn,
        esme_mo_keyword:
          history.state.data.esme_mo_keyword == "null"
            ? null
            : history.state.esme_mo_keyword,
        generic_message: history.state.data.generic_message,
        is_subnet:
          history.state.data.is_subnet == "null"
            ? null
            : history.state.data.is_subnet,
        subnet: history.state.data.subnet,
      });
    }
  }

  checkSubnet() {
    if (!this.serviceConfigForm.value.is_subnet) {
      this.serviceConfigForm.controls["subnet"].setValue(null);
      this.serviceConfigForm.controls["subnet"].setErrors(null);
    } else {
      this.serviceConfigForm.controls["subnet"].setValidators(
        Validators.required
      );
    }
  }

  addIPS() {
    if (this.serviceConfigForm.value.is_subnet) {
      if (
        this.serviceConfigForm.value.destination_ip != null &&
        this.serviceConfigForm.value.destination_ip != ""
      ) {
        this.IPArray.push(this.serviceConfigForm.value.destination_ip);
        this.serviceConfigForm.controls["destination_ip"].setValue("");
        this.serviceConfigForm.controls["destination_ip"].setErrors(null);
      }
    }
  }

  onAddBody() {
    this.bodyObj[this.bodyKey] = this.bodyValue;
    this.body.setValue(this.bodyObj);
    console.log(this.bodyObj);
    console.log(this.body.value);

    this.bodyKey = "";
    this.bodyValue = "";
  }

  removeBody(index) {
    delete this.body.value[index];
  }

  onSubmit() {
    console.log("Service Configuration Data::", this.serviceConfigForm.value);
    let formdata = this.serviceConfigForm.value;

    if (this.serviceConfigForm.value.is_subnet) {
      formdata["destination_ip"] = this.IPArray;
    }

    console.log(formdata);

    this.displayLoader = true;

    this.allService.addNewServiceConf(formdata).subscribe({
      next: (res: any) => {
        if (!res.success) {
          this.alert.danger("Unable to add ESME configuration");
          this.displayLoader = false;
          return false;
        }
        this.alert.success(res.message);
        this.displayLoader = false;
        this.route.navigate(["/service-config-list"]);
      },
      error(e) {
        console.log("Error===========>", e);
        this.alert.danger("Something went wrong!");
        this.displayLoader = false;
      },
    });
  }

  updateEsmeConfiguration() {
    console.log("Service Configuration Data::", this.serviceConfigForm.value);
    let formdata = this.serviceConfigForm.value;

    if (this.serviceConfigForm.value.is_subnet) {
      formdata["destination_ip"] = this.IPArray;
    }
    console.log("Service Configuration Data::", this.serviceConfigForm.value);
    this.allService
      .updateServiceConf(this.serviceConfigForm.value, history.state.data.id)
      .subscribe({
        next: (res: any) => {
          if (!res.success) {
            this.alert.danger(res.message);
            return false;
          }
          this.alert.success(res.message);
          this.route.navigate(["/service-config-list"]);
        },
        error(e) {
          console.log("Error===========>", e);
          this.alert.danger("Something went wrong!");
        },
      });
  }

  clearForm() {
    console.log("this.serviceConfigForm", this.serviceConfigForm);
    console.log("this.serviceConfigForm.value", this.serviceConfigForm.value);
    // this.serviceConfigForm.reset();
  }

  updateFieldHistory(e) {
    if (e == "smpp") {
      this.serviceConfigForm.controls["systemId"].setValidators(
        Validators.required
      );
      this.serviceConfigForm.controls["password"].setValidators(
        Validators.required
      );
      this.serviceConfigForm.controls["destination_ip"].setValidators(
        Validators.required
      );
      this.serviceConfigForm.controls["port"].setValidators(
        Validators.required
      );
    }

    if (e == "http" || e == "https") {
      this.serviceConfigForm.controls["requestTypeSelect"].setValidators(
        Validators.required
      );

      this.serviceConfigForm.controls["body"].setValidators(
        Validators.required
      );

      this.serviceConfigForm.controls["requestUrl"].setValidators(
        Validators.required
      );
    }
  }

  updateField(e) {
    if (e == "smpp") {
      this.serviceConfigForm.controls["systemId"].setValidators(
        [Validators.pattern('^[0-9]+$')]
      );
      this.serviceConfigForm.controls["systemId"].setValue(null);

      this.serviceConfigForm.controls["password"].setValidators(
        Validators.required
      );
      this.serviceConfigForm.controls["password"].setValue(null);

      this.serviceConfigForm.controls["destination_ip"].setValidators(
        Validators.required
      );
      this.serviceConfigForm.controls["destination_ip"].setValue(null);

      this.serviceConfigForm.controls["port"].setValidators(
        [Validators.required,Validators.pattern('^[0-9]+$')]
      );
      this.serviceConfigForm.controls["port"].setValue(null);

      this.serviceConfigForm.controls["requestTypeSelect"].setValue(null);
      this.serviceConfigForm.controls["requestTypeSelect"].setErrors(null);

      this.serviceConfigForm.controls["body"].setValue(null);
      this.serviceConfigForm.controls["body"].setErrors(null);

      this.serviceConfigForm.controls["requestUrl"].setValue(null);
      this.serviceConfigForm.controls["requestUrl"].setErrors(null);
    } else {
      this.serviceConfigForm.value.is_subnet = false;
      this.IPArray = [];

      this.serviceConfigForm.controls["systemId"].setValue(0);
      this.serviceConfigForm.controls["systemId"].setErrors(null);

      this.serviceConfigForm.controls["password"].setValue(0);
      this.serviceConfigForm.controls["password"].setErrors(null);

      this.serviceConfigForm.controls["destination_ip"].setValue(0);
      this.serviceConfigForm.controls["destination_ip"].setErrors(null);

      this.serviceConfigForm.controls["port"].setValue(0);
      this.serviceConfigForm.controls["port"].setErrors(null);

      this.serviceConfigForm.controls["requestTypeSelect"].setValidators(
        Validators.required
      );
      this.serviceConfigForm.controls["requestTypeSelect"].setValue(null);

      this.serviceConfigForm.controls["body"].setValidators(
        Validators.required
      );
      this.serviceConfigForm.controls["body"].setValue(null);

      this.serviceConfigForm.controls["requestUrl"].setValidators(
        Validators.required
      );
      this.serviceConfigForm.controls["requestUrl"].setValue(null);
    }
  }

  // updateField(e) {
  //   if (e == "smpp") {
  //     this.serviceConfigForm.controls["requestTypeSelect"].setValue(null);
  //     this.serviceConfigForm.controls["requestTypeSelect"].setErrors(null);

  //     this.serviceConfigForm.controls["body"].setValue(null);
  //     this.serviceConfigForm.controls["body"].setErrors(null);

  //     this.serviceConfigForm.controls["requestUrl"].setValue(null);
  //     this.serviceConfigForm.controls["requestUrl"].setErrors(null);
  //   } else {
  //     this.serviceConfigForm.controls["requestTypeSelect"].setValidators(
  //       Validators.required
  //     );

  //     this.serviceConfigForm.controls["body"].setValidators(
  //       Validators.required
  //     );

  //     this.serviceConfigForm.controls["requestUrl"].setValidators(
  //       Validators.required
  //     );
  //   }

  //   if (e == "http" || e == "https") {
  //     this.serviceConfigForm.patchValue({
  //       requestUrl: e + "://",
  //     });
  //     this.serviceConfigForm.value.is_subnet = false;
  //     this.IPArray = [];

  //     this.serviceConfigForm.controls["systemId"].setValue(0);
  //     this.serviceConfigForm.controls["systemId"].setErrors(null);

  //     this.serviceConfigForm.controls["password"].setValue(0);
  //     this.serviceConfigForm.controls["password"].setErrors(null);

  //     this.serviceConfigForm.controls["destination_ip"].setValue(0);
  //     this.serviceConfigForm.controls["destination_ip"].setErrors(null);

  //     this.serviceConfigForm.controls["port"].setValue(0);
  //     this.serviceConfigForm.controls["port"].setErrors(null);
  //   } else {
  //     this.serviceConfigForm.controls["systemId"].setValidators(
  //       Validators.required
  //     );
  //     this.serviceConfigForm.controls["systemId"].setValue(null);

  //     this.serviceConfigForm.controls["password"].setValidators(
  //       Validators.required
  //     );
  //     this.serviceConfigForm.controls["password"].setValue(null);

  //     this.serviceConfigForm.controls["destination_ip"].setValidators(
  //       Validators.required
  //     );
  //     this.serviceConfigForm.controls["destination_ip"].setValue(null);

  //     this.serviceConfigForm.controls["port"].setValidators(
  //       Validators.required
  //     );
  //     this.serviceConfigForm.controls["port"].setValue(null);
  //   }
  // }

  update_sponsored() {
    if (!this.serviceConfigForm.value.is_sponsored_charging) {
      console.log("in sponsored");
      this.serviceConfigForm.controls["esme_charging_msisdn"].setValue(null);
      this.serviceConfigForm.controls["esme_charging_msisdn"].setErrors(null);
    } else {
      this.serviceConfigForm.controls["esme_charging_msisdn"].setValidators([
        Validators.required, Validators.minLength(6), Validators.pattern('^[0-9]+$'), Validators.maxLength(16)]
      );
    }
  }
  _keydown(event: any) {
    
    if (!(/^[0-9]+$/.test(event.key)||event.key=='Tab'||event.key=='Backspace')) {
        // invalid character, prevent input
        event.preventDefault();
      }
  }
  update_sms() {
    if (!this.serviceConfigForm.value.is_sms_mo) {
      console.log("in SMS");
      this.serviceConfigForm.controls["esme_mo_msisdn"].setValue(null);
      this.serviceConfigForm.controls["esme_mo_msisdn"].setErrors(null);

      this.serviceConfigForm.controls["esme_mo_keyword"].setValue(null);
      this.serviceConfigForm.controls["esme_mo_keyword"].setErrors(null);
    } else {
      this.serviceConfigForm.controls["esme_mo_msisdn"].setValidators(
        [Validators.required, Validators.minLength(6),Validators.pattern('^[0-9]+$'), Validators.maxLength(16)]
      );

      this.serviceConfigForm.controls["esme_mo_keyword"].setValidators(
        Validators.required
      );
    }
  }
}
