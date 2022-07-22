import { Component, OnInit } from "@angular/core";
import { LoaderServiceService } from "@app/loader-service.service";
import { Subject } from "rxjs";

@Component({
  selector: "app-loader",
  templateUrl: "./loader.component.html",
  styleUrls: ["./loader.component.scss"],
})
export class LoaderComponent implements OnInit {
  isLoading: Subject<boolean> = this.loaderService.isLoading;

  constructor(private loaderService: LoaderServiceService) {}

  ngOnInit(): void {}
}
