import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { AllService } from "../../../../core/services/stats-service/all.service";
import { DraftModalComponent } from "@app/shared/draft-modal/draft-modal.component";
import { MatDialog } from "@angular/material/dialog";
import { fadeInGrow } from "@app/animations";
import * as moment from "moment";

@Component({
  selector: "app-service-config-list",
  templateUrl: "./service-config-list.component.html",
  styleUrls: ["./service-config-list.component.css"],
  animations: [fadeInGrow],
})
export class ServiceConfigListComponent implements OnInit {
  sidenavOpened: boolean = true;
  displayLoader: boolean = false;
  displayedColumns: string[] = [
    "service_name",
    "protocol",
    "created_by",
    "created_dt",
    "action",
  ];
  dataSource: any = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private router: Router,
    private allService: AllService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getServiceConfigList();
  }

  updateSidebar(e) {
    this.sidenavOpened = e;
  }

  getServiceConfigList() {
    this.allService.getServiceConfList().subscribe({
      next: (res: any) => {
        if (res.success == true) {
          if (res.data.length > 0) {
            this.changeDateFormatter(res.data);
            this.dataSource.data = [];
            this.dataSource.data = res.data;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
        }
      },
      error(e) {
        console.log("Error===========>", e);
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

  editServiceConfig(element) {
    this.router.navigate(["/service-config-add"], {
      state: { data: element, name: "esmeConfig" },
    });
  }

  openDialog(e) {
    const dialogRef = this.dialog.open(DraftModalComponent, {
      data: {
        name: "deleteEsme",
        heading: "Are you sure you want to delete this configuration?",
        e,
      },
    });
    this.dialog.afterAllClosed.subscribe(() => this.getServiceConfigList());
    dialogRef.afterClosed().subscribe((result) => {
      this.displayLoader = true;
    });
    dialogRef.componentInstance.onSave.subscribe((result) => {
      this.displayLoader = false;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  addServiceConfig() {
    this.router.navigate(["/"]);
  }
}
