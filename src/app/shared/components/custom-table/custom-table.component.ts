import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTable, MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "app-custom-table",
  templateUrl: "./custom-table.component.html",
  styleUrls: ["./custom-table.component.scss"],
})
export class CustomTableComponent implements OnInit {
  dataSource = new MatTableDataSource<any>([]);
  constructor() {}
  displayedColumns: string[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;
  @Input() columns: any;
  data = [];
  @Input() tableOptions: any;
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.tableOptions = this.tableOptions;
    this.displayedColumns = this.columns.map((x) => x.key);
  }
}
