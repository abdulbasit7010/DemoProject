import { Component, OnInit } from "@angular/core";
import { AllService } from "@app/core/services/stats-service/all.service";
import { AlertService } from "ngx-alerts";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-strings-based-charging",
  templateUrl: "./strings-based-charging.component.html",
  styleUrls: ["./strings-based-charging.component.css"],
})
export class StringsBasedChargingComponent implements OnInit {
  serviceCodes: any = [];
  countMaintainer: number;
  stringForm: FormGroup;
  numOfFiles = 1;

  heading = "String Based Charging";
  edit: boolean = false;
  addresses!: FormArray;
  addressForm: FormGroup;

  short_code: FormControl = new FormControl("", [Validators.required]);
  chargeable: FormControl = new FormControl(false, [Validators.required]);

  constructor(
    private allService: AllService,
    private alert: AlertService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.addressForm = this.formBuilder.group({
      addresses: this.formBuilder.array([this.createAddress()]),
    });
  }

  ngOnInit(): void {
    this.getCodes();

    this.form();

    this.addAddress(1);
  }

  getCodes() {
    this.allService.getServiceCodesList().subscribe({
      next: (res: any) => {
        if (res.success != true) {
          alert(res.message);
          return false;
        }

        this.serviceCodes = res.data.map((value) => value.short_code);
      },
      error(e) {
        console.log("Error=========>", e);
      },
    });
  }

  form() {
    this.stringForm = this.formBuilder.group({
      short_code: this.short_code,
      chargeable: this.chargeable,
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
        short_code: history.state.data.short_code,
      });
    }
  }

  onSubmit() {
    let formdata: object;
    let msisdn_pattern = this.edit
      ? history.state.data.short_code.slice(0, -1)
      : this.stringForm.value.short_code.slice(0, -1);

    console.log("this.addresses.value", this.addresses.value);
    for (let x of this.addresses.value) {
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
    } else {
      msisdn_pattern = msisdn_pattern + "#";

      let data = Object.assign(this.stringForm.value, {
        msisdn_pattern: msisdn_pattern,
      });

      console.log("data", data);
      if (!this.edit) {
        this.allService.addStringsBasedCharging(data).subscribe(
          (res) => {
            if (!res.success) {
              this.alert.danger(
                "Cannot add string based charging, please try again"
              );
              return;
            }
            this.alert.success("String based charging added successfully");
            this.router.navigateByUrl("/stringBasedChargingView");
          },
          (error) => {
            this.alert.danger(
              "Cannot add string based charging, please try again"
            );
          }
        );
      } else {
        this.allService
          .editStringsBasedCharging(data, history.state.data.id)
          .subscribe(
            (res) => {
              if (!res.success) {
                this.alert.danger(
                  "Cannot add string based charging, please try again"
                );
                return;
              }
              this.alert.success("String based charging edited successfully");
              this.router.navigateByUrl("/stringBasedChargingView");
            },
            (error) => {
              this.alert.danger(
                "Cannot add string based charging, please try again"
              );
            }
          );
      }
    }
  }

  get addressControls() {
    return this.addressForm.get("addresses")["controls"];
  }

  addAddress(count: any): void {
    this.addresses = this.addressForm.get("addresses") as FormArray;
    this.addresses.push(this.createAddress());
    this.addresses.clear();

    const fillArray = (value: number, len: number) => {
      const arr: any = [];
      for (let i = 0; i < len; i++) {
        this.addresses.push(this.createAddress());
      }
      return arr;
    };

    fillArray(2, count);
  }

  createAddress(): FormGroup {
    return this.formBuilder.group({
      addValue: "",
    });
  }

  increment(value, condition) {
    if (condition == 1) {
      if (value == 9) return false;
      this.numOfFiles = ++this.numOfFiles;
      this.addAddress(value + 1);
    } else {
      if (value == 1) return false;

      this.numOfFiles = --this.numOfFiles;
      this.addAddress(value - 1);
    }
  }
}
