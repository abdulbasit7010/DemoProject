import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { AllService } from "@app/core/services/stats-service/all.service";
import { AlertService } from "ngx-alerts";

@Component({
  selector: "app-strings-based-charging-view",
  templateUrl: "./strings-based-charging-view.component.html",
  styleUrls: ["./strings-based-charging-view.component.css"],
})
export class StringsBasedChargingViewComponent
  implements OnInit, AfterViewInit
{
  displayedColumns: string[] = [
    "short_code",
    "msisdn_pattern",
    "created_by",
    "action",
  ];
  dataSource: any = new MatTableDataSource();
  @ViewChild("sorter1") sorter1: MatSort;
  @ViewChild("MatPaginator") MatPaginator: MatPaginator;

  constructor(
    private allService: AllService,
    private alert: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getStringbasedCharging();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.MatPaginator;
    this.dataSource.sort = this.sorter1;
  }

  getStringbasedCharging() {
    this.allService.getStringsBasedCharging().subscribe(
      (res) => {
        if (!res.success) {
          console.log("Cannot fetch string based charging, please try again");
          return;
        }
        this.dataSource.data = res.data;
      },
      (error) => {
        this.alert.danger(
          "Cannot fetch string based charging, please try again"
        );
      }
    );
  }

  editString(element) {
    this.router.navigate(["/stringBasedCharging"], {
      state: { data: element },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
