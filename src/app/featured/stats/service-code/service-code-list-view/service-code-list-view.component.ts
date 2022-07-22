import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { AllService } from "../../../../core/services/stats-service/all.service";
import { AlertService } from "ngx-alerts";
import { DraftModalComponent } from "@app/shared/draft-modal/draft-modal.component";
import { MatDialog } from "@angular/material/dialog";
import { fadeInGrow } from "@app/animations";
import * as moment from "moment";

@Component({
  selector: "app-service-code-list-view",
  templateUrl: "./service-code-list-view.component.html",
  styleUrls: ["./service-code-list-view.component.css"],
  animations: [fadeInGrow],
})
export class ServiceCodeListViewComponent implements OnInit, AfterViewInit {
  sidenavOpened: boolean = true;
  displayLoader: boolean = false;
  displayedColumns: string[] = [
    "short_code",
    "code_title",
    "code_description",
    "created_by",
    "created_dt",
    "action",
  ];
  dataSource: any = new MatTableDataSource();
  @ViewChild("sorter1") sorter1: MatSort;
  @ViewChild("MatPaginator") MatPaginator: MatPaginator;

  service_array = [];
  sub_service_array = [];

  constructor(
    private router: Router,
    private allService: AllService,
    private alert: AlertService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getServiceCodeList();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.MatPaginator;
    this.dataSource.sort = this.sorter1;
  }

  updateSidebar(e) {
    this.sidenavOpened = e;
  }

  getServiceCodeList() {
    this.allService.getServiceCodesList().subscribe({
      next: (res: any) => {
        if (!res.success) {
          return false;
        }
        this.changeDateFormatter(res.data);
        this.service_array = [];
        this.sub_service_array = [];
        for (let a of res.data)
          if (a.parent_id == 0) this.service_array.push(a);

        for (let a of res.data)
          if (a.parent_id !== 0) this.sub_service_array.push(a);

        this.dataSource.data = [];
        this.dataSource.data = this.service_array.reverse();
      },
      error(e) {
        this.alert.success(e.message);

        console.log("Error=========>", e);
      },
    });
  }

  changeDateFormatter(data: any[]) {
    for (let i = 0; i < data.length; i++) {
      data[i].created_dt = moment(data[i].created_dt).format(
        "DD-MM-YYYY HH:mm:ss"
      );
    }
  }

  editServiceCode(element) {
    console.log(element);
    this.router.navigate(["/service-code-add"], {
      state: { data: element, name: "editService", checker: false },
    });
  }

  editSubServiceCode(element) {
    console.log(element);
    this.router.navigate(["/service-code-add"], {
      state: { data: element, name: "editService", checker: true },
    });
  }

  openDialog(e) {
    const dialogRef = this.dialog.open(DraftModalComponent, {
      data: {
        name: "deleteService",
        heading: "Are you sure you want to delete this Service?",
        e,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.displayLoader = true;
    });
    dialogRef.componentInstance.onSave.subscribe((result) => {
      this.displayLoader = false;
      this.getServiceCodeList();
    });
  }

  addSubService(e) {
    this.router.navigate(["/service-code-add"], {
      state: { data: e, name: "subService", checker: true },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  addServiceCode() {
    this.router.navigate(["/"]);
  }
}
