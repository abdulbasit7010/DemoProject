import { Component, EventEmitter, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AlertService } from "ngx-alerts";
import { AllService } from "@app/core/services/stats-service/all.service";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
@Component({
  selector: "app-draft-modal",
  templateUrl: "./draft-modal.component.html",
  styleUrls: ["./draft-modal.component.css"],
})
export class DraftModalComponent implements OnInit {
  isOpenDltNode: boolean = false;
  onSave = new EventEmitter();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private alertService: AlertService,
    private allservice: AllService,
    private router: Router,
    private formBuilder: FormBuilder,
    private allService: AllService,
    public dialogRef: MatDialogRef<DraftModalComponent>
  ) {
    if (this.data.flag == "dltCurrentNode") {
      this.isOpenDltNode = true;
    }
  }

  ngOnInit(): void {}
  deleteServiceConfig() {
    // Use element ID to send service call for DELETE request
    this.allService.deleteServiceConf(this.data.e.id).subscribe({
      next: (res: any) => {
        if (!res.success) {
          this.alertService.danger(res.message);
          this.onSave.emit(res);
          return false;
        }
        this.alertService.success(res.message);
        this.onSave.emit(res);
      },
      error(e) {
        this.alertService.danger("something went wrong");
        this.onSave.emit(e);
        console.log("Error===========>", e);
      },
    });
  }

  deleteServiceCode() {
    this.allService.deleteServiceCode(this.data.e.id).subscribe({
      next: (res: any) => {
        if (!res.success) {
          this.alertService.danger(res.message);
          this.onSave.emit(res);
          return false;
        }
        this.alertService.success(res.message);
        this.onSave.emit(res);
      },
      error(e) {
        this.alert.danger(e.message);
        this.onSave.emit(e);
        console.log("Error=========>", e);
      },
    });
  }
  deleteCurrentNode() {
    this.dialogRef.close("dlt");
  }

  deleteMenu() {
    this.allService.deleteMenu(this.data.data).subscribe((res) => {
      if (!res.success) {
        this.alertService.danger("Something went Wrong");
        this.onSave.emit(res);
      }
      console.log(res.data);
      this.alertService.success("Menu Deleted Sucessfully");
      this.onSave.emit(res);
    },);
  }

  editService() {
    this.allService
      .updateServiceCode(this.data.formdata, history.state.data.id)
      .subscribe({
        next: (res: any) => {
          if (!res.success) {
            this.alertService.success(res.message);
            this.onSave.emit(res)
            return false;
          }
          this.alertService.success(res.message);
          this.router.navigate(["/service-code-list-view"]);
          this.onSave.emit(res)
        },
        error(e) {
          this.alertService.success("Something went wrong!");
          this.onSave.emit(e)

          console.log("Error===========>", e);
        },
      });
  }
}
