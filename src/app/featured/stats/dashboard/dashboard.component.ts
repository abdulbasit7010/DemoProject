import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { AllService } from "@app/core/services/stats-service/all.service";
import * as Highcharts from "highcharts";
import { AlertService } from "ngx-alerts";
import { FormBuilder, Validators } from "@angular/forms";
import * as moment from "moment";
import { fade } from "@app/animations";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
  animations: [fade],
})
export class DashboardComponent implements OnInit {
  showSubService = false;
  showService = false;
  showMenu = false;
  showConfig = false;
  componentName = "dashboard";
  dateWiseData;
  dateFormData: FormGroup;
  esmeDetailsContainer: any = {};
  treeDetailsContainer: any = {};

  st_dt: FormControl = new FormControl(
    "Sat Jan 01 2022 00:00:00 GMT+0500 (Pakistan Standard Time)",
    [Validators.required]
  );
  end_dt: FormControl = new FormControl(
    "Mon April 30 2022 00:00:00 GMT+0500 (Pakistan Standard Time)",
    [Validators.required]
  );
  servicesLineChartData: any;
  ServicesPieChart: any;
  overallServicesCounts = [];
  sidenavOpened: boolean = true;
  totalservice: number;
  totalesme: number;
  totaltree: number;

  //   totalCampaigns: number = 0;
  //   total_Campaigns_Count: number;
  // total_Campaign_Stop: any = setInterval(()=>{
  //   this.totalCampaigns++;

  //   if(this.totalCampaigns == this.total_Campaigns_Count){
  //     clearInterval(this.total_Campaign_Stop);
  //   }
  // } , 15)

  total_Service_Count: number = 0;
  has_menu_Count: number = 0;

  sub_Service_Count: number = 0;
  services_Count: number = 0;

  chargeable_Count: number = 0;

  esme_Count: number = 0;
  totalesme_Count: number = 0;
  total_Tree_Count: number = 0;
  http_Count: number = 0;

  https_Count: number = 0;

  smpp_Count: number = 0;
  list_Count: number = 0;

  whitelist_Count: number = 0;

  constructor(
    private router: Router,
    private allService: AllService,
    private alertService: AlertService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.esmeDetails();
    this.treeDetails();
    // this.barChartEsme();
    // this.barChartTree();
    this.form();
    this.overallServiceCounts();
    this.onSubmit();
    this.scdLineChart();
  }

  isSelected(e) {
    console.log("ee", e);
    this.componentName = e;
  }

  checkUndefined(esmeDetails) {
    // if (this.overallServicesCounts[0].sub_services == undefined) {
    //   this.overallServicesCounts[0].sub_services = 0;
    // }

    // if (this.overallServicesCounts[0].services == undefined) {
    //   this.overallServicesCounts[0].services = 0;
    // }

    // if (this.overallServicesCounts[0].chargeable_count == undefined) {
    //   this.overallServicesCounts[0].chargeable_count = 0;
    // }

    // if (this.overallServicesCounts[0].has_menu_count == undefined) {
    //   this.overallServicesCounts[0].has_menu_count = 0;
    // }

    // if (this.overallServicesCounts[0].esme_count == undefined) {
    //   this.overallServicesCounts[0].esme_count = 0;
    // }

    // if (this.totalservice == undefined) {
    //   this.totalservice = 0;
    // }

    // if (this.totaltree == undefined) {
    //   this.totaltree = 0;
    // }

    // if (this.totalesme == undefined) {
    //   this.totalesme = 0;
    // }

    if (this.esmeDetailsContainer.smppCount == undefined) {
      this.esmeDetailsContainer["smppCount"] = 0;
    }

    if (this.esmeDetailsContainer.httpCount == undefined) {
      this.esmeDetailsContainer["httpCount"] = 0;
    }

    if (this.esmeDetailsContainer.httpsCount == undefined) {
      this.esmeDetailsContainer["httpsCount"] = 0;
    }
  }

  esmeDetails() {
    this.allService.esmeDetails().subscribe(
      (response: any) => {
        if (!response.success) {
          this.alertService.warning("Something went wrong");
          return false;
        }

        for (let esme of response.data) {
          console.log("esme", esme);
          if (esme.protocol == "http") {
            this.esmeDetailsContainer["httpCount"] = esme.total;
          }
          if (esme.protocol == "https") {
            this.esmeDetailsContainer["httpsCount"] = esme.total;
          }
          if (esme.protocol == "smpp") {
            this.esmeDetailsContainer["smppCount"] = esme.total;
          }
        }
        this.checkUndefined(this.esmeDetailsContainer);
        console.log("this.esmeDetailsContainer", this.esmeDetailsContainer);

        console.log("here", response.data);

        this.barChartEsme();
        // this.totalesme = this.esmeDetailsContainer.httpCount +  this.esmeDetailsContainer.httpsCount +this.esmeDetailsContainer.smppCount

        this.totalesme_Count =
          this.esmeDetailsContainer.httpCount +
          this.esmeDetailsContainer.httpsCount +
          this.esmeDetailsContainer.smppCount;

        console.log("this.totalesme_Count", this.totalesme_Count);
      },
      (error) => {
        console.log("Cannot fetch dashboard API details");
      }
    );
  }

  treeDetails() {
    this.allService.treeDetails().subscribe(
      (response: any) => {
        if (!response.success) {
          this.alertService.warning("Something went wrong");
          return false;
        }

        console.log("here", response.data);
        this.treeDetailsContainer["whiteList"] = response.data[0].WhiteList;
        this.treeDetailsContainer["list"] = response.data[0].List;
        console.log("this.treeDetailsContainer", this.treeDetailsContainer);
        this.barChartTree();

        console.log("the ", this.whitelist_Count, " ", this.list_Count);
        this.totaltree =
          (this.treeDetailsContainer.whiteList == 0 ||
          this.treeDetailsContainer.whiteList == undefined
            ? 0
            : this.treeDetailsContainer.whiteList) +
          (this.treeDetailsContainer.list == 0 ||
          this.treeDetailsContainer.list == undefined
            ? 0
            : this.treeDetailsContainer.list);
        console.log("this.totaltree", this.totaltree);
      },

      (error) => {
        console.log("Cannot fetch dashboard API details");
      }
    );
  }

  overallServiceCounts() {
    this.allService.serviceCounts().subscribe(
      (response: any) => {
        if (!response.success) {
          this.alertService.warning("Something went wrong");
          return false;
        }

        this.overallServicesCounts = response.data;

        console.log("here", this.overallServicesCounts);
        this.pieCHarts();

        this.total_Service_Count = this.overallServicesCounts[0].services;

        this.sub_Service_Count = this.overallServicesCounts[0].sub_services;
        this.services_Count = this.overallServicesCounts[0].services;
        this.chargeable_Count = this.overallServicesCounts[0].chargeable_count;
        this.has_menu_Count = this.overallServicesCounts[0].has_menu_count;
        this.esme_Count = this.overallServicesCounts[0].esme_count;
      },
      (error) => {
        console.log("Cannot fetch dashboard API details");
      }
    );
  }

  onSubmit() {
    this.dateWiseData = this.dateFormData.value;

    console.log("here", this.dateWiseData);
    this.dateWiseData.st_dt = moment(this.dateWiseData.st_dt).format(
      "YYYY-MM-DD"
    );
    this.dateWiseData.end_dt = moment(this.dateWiseData.end_dt).format(
      "YYYY-MM-DD"
    );

    this.allService.dateWiseServices(this.dateWiseData).subscribe(
      (response: any) => {
        if (!response.success) {
          this.alertService.warning("Something went wrong");
          return false;
        }
        this.dateFormData.reset();

        for (let val of response.data) {
          for (let obj of val.chargable) {
            obj.x = new Date(obj.x);
          }
          for (let obj of val.esme) {
            obj.x = new Date(obj.x);
          }
          for (let obj of val.has_menu) {
            obj.x = new Date(obj.x);
          }
        }

        this.servicesLineChartData = response.data;

        console.log("here", this.servicesLineChartData);

        this.scdLineChart();
      },
      (error) => {
        console.log("Cannot fetch dashboard API details");
      }
    );
  }
  updateSidebar(e) {
    this.sidenavOpened = e;
  }

  form() {
    this.dateFormData = this.formBuilder.group({
      st_dt: this.st_dt,
      end_dt: this.end_dt,
    });
  }

  scdLineChart() {
    Highcharts.chart({
      chart: {
        renderTo: "container",
        type: "spline",
        height: 275,
      },

      // title: {
      //   text: "Services Comparison (Chargeable vs ESME vs Menu)",
      // },
      title: {
        text: "",
        style: {
          display: "none",
        },
      },

      yAxis: {
        min: 0,
        allowDecimals: false,
        title: {
          text: "count",
        },
        type: undefined,
      },
      credits: {
        enabled: false,
      },

      xAxis: {
        title: {
          text: "Date Range",
        },

        type: "datetime",
      },

      tooltip: {
        pointFormatter: function () {
          var point = this;
          return (
            '<span style="color:' +
            point.color +
            '">\u25CF</span> ' +
            point.series.name +
            ": <b>" +
            Highcharts.numberFormat(point.y, 0) +
            "</b><br/>"
          );
        },
      },

      legend: {
        layout: "horizontal",
        align: "center",
        verticalAlign: "bottom",
      },

      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
            color: "#000000",
            formatter() {
              return `<span style="color:#000000">${Highcharts.numberFormat(
                this.point.y,
                0,
                "",
                ","
              )} </span>`;
            },
          },
        },
      },

      series: [
        {
          name: "Chargeable",
          type: undefined,
          data: this.servicesLineChartData[0].chargable,
        },
        // {
        //   name: "ESME",
        //   type: undefined,
        //   data: this.servicesLineChartData[0].esme,
        // },
        {
          name: "Menu",
          type: undefined,
          data: this.servicesLineChartData[0].has_menu,
        },
      ],

      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 400,
            },
            chartOptions: {
              legend: {
                layout: "horizontal",
                align: "center",
                verticalAlign: "bottom",
              },
            },
          },
        ],
      },
    });
  }

  pieCHarts() {
    Highcharts.chart("main", {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: "pie",
        height: 220,
      },
      // title: {
      //   text: "Overall Services Details",
      // },
      title: {
        text: "",
        style: {
          display: "none",
        },
      },
      tooltip: {
        pointFormat: "{series.name}: <b>{point.y}</b>",
      },

      accessibility: {
        point: {
          valueSuffix: "%",
        },
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          size: 140,
          dataLabels: {
            enabled: true,
            format: "<b>{point.name}</b>: {point.percentage:.1f} %",
          },
        },
      },
      series: [
        {
          name: "Total",
          colorByPoint: true,
          type: "pie",
          data: [
            // {
            //   name: "Sub services",
            //   y: this.overallServicesCounts[0].sub_services,
            // },
            {
              name: "Parent Services",
              y: this.overallServicesCounts[0].services,
            },
            {
              name: "Chargeable Services",
              y: this.overallServicesCounts[0].chargeable_count,
            },
            {
              name: "Menu Services",
              y: this.overallServicesCounts[0].has_menu_count,
            },
            // {
            //   name: "ESME Services",
            //   y: this.overallServicesCounts[0].esme_count,
            // },
          ],
        },
      ],
    });
  }

  barChartEsme() {
    Highcharts.chart("stackedChart", {
      chart: {
        type: "column",
        height: 300,
      },
      title: {
        text: "ESME Details",
      },

      accessibility: {
        announceNewData: {
          enabled: true,
        },
      },
      xAxis: {
        type: "category",
      },

      legend: {
        enabled: false,
      },
      plotOptions: {
        series: {
          borderWidth: 0,

          dataLabels: {
            enabled: true,
            format: "{point.y}",
          },
        },
      },

      tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat:
          '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b><br/>',
      },

      series: [
        {
          name: "Total Count",
          colorByPoint: true,
          type: "column",
          data: [
            {
              name: "Http",
              pointWidth: 40,
              y:
                this.esmeDetailsContainer.httpCount == undefined || null
                  ? 0
                  : this.esmeDetailsContainer.httpCount,
            },
            {
              name: "Https",
              pointWidth: 40,
              y:
                this.esmeDetailsContainer.httpsCount == undefined || null
                  ? 0
                  : this.esmeDetailsContainer.httpsCount,
            },
            {
              name: "SMPP",
              pointWidth: 40,
              y:
                this.esmeDetailsContainer.smppCount == undefined || null
                  ? 0
                  : this.esmeDetailsContainer.smppCount,
            },
          ],
        },
      ],
    });
  }

  barChartTree() {
    Highcharts.chart("stackedChartTree", {
      chart: {
        type: "column",
        height: 345,
      },
      title: {
        text: "Tree Count",
      },

      accessibility: {
        announceNewData: {
          enabled: true,
        },
      },
      xAxis: {
        type: "category",
      },

      legend: {
        enabled: false,
      },
      plotOptions: {
        series: {
          borderWidth: 0,

          dataLabels: {
            enabled: true,
            format: "{point.y}",
          },
        },
      },

      tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat:
          '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b><br/>',
      },

      series: [
        {
          name: "Browsers",
          colorByPoint: true,
          type: "column",
          data: [
            {
              name: "Normal Tree",
              pointWidth: 40,
              y:
                this.treeDetailsContainer.list == undefined || null
                  ? 0
                  : this.treeDetailsContainer.list,
            },
            {
              name: "WhiteList Tree",
              pointWidth: 40,
              y:
                this.treeDetailsContainer.whiteList == undefined || null
                  ? 0
                  : this.treeDetailsContainer.whiteList,
            },
          ],
        },
      ],
    });
  }
}
