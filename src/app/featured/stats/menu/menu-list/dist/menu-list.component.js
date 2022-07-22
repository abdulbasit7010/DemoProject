"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MenuListComponent = void 0;
var core_1 = require("@angular/core");
var tree_1 = require("@angular/material/tree");
var tree_2 = require("@angular/cdk/tree");
var d3 = require("d3");
var data = {
    name: "A1",
    children: [
        {
            name: "B1",
            children: [
                {
                    name: "C1",
                    children: []
                },
                {
                    name: "C2",
                    children: [
                        {
                            name: "D1",
                            children: []
                        },
                        {
                            name: "D2",
                            children: []
                        },
                    ]
                },
                {
                    name: "C3",
                    children: []
                },
            ]
        },
        {
            name: "B2",
            children: [
                {
                    name: "C4",
                    children: []
                },
                {
                    name: "C5",
                    children: []
                },
                {
                    name: "C6",
                    children: [
                        {
                            name: "D3",
                            children: []
                        },
                        {
                            name: "D4",
                            children: []
                        },
                    ]
                },
            ]
        },
    ]
};
var MenuListComponent = /** @class */ (function () {
    function MenuListComponent(router, allService) {
        var _this = this;
        this.router = router;
        this.allService = allService;
        this.response = [];
        this.mainObj = {};
        this.mainJson = [];
        this.press_options = [];
        this.jsonTreeData = [];
        this.showModal = "";
        this.showTextModal = "";
        this.nodeText = "";
        this.treeControl = new tree_2.NestedTreeControl(function (node) { return node.press_options; });
        this.dataSource = new tree_1.MatTreeNestedDataSource();
        this.margin = { top: 200, bottom: 90, left: 100, right: 90 };
        this.duration = 750;
        this.nodeWidth = 5;
        this.nodeHeight = 5;
        this.nodeRadius = 5;
        this.horizontalSeparationBetweenNodes = 5;
        this.verticalSeparationBetweenNodes = 5;
        this.nodeTextDistanceY = "-5px";
        this.nodeTextDistanceX = 5;
        this.displayLoader = false;
        this.treeName = history.state.name == "true"
            ? history.state.data.short_code + " Whitelist Tree"
            : history.state.data.short_code + " Normal Tree";
        //end
        this.isLinear = false;
        this.hasChild = function (_, node) {
            return !!node.press_options && node.press_options;
        };
        this.click = function (d) {
            console.log("click");
            if (d.data.menu_item_text == history.state.data.short_code) {
                return false;
            }
            if (d.data) {
                _this.openCurrentNode(d.data);
                d._children = d.data;
                d.press_options = null;
            }
            else {
                d.press_options = d._children;
                d._children = null;
            }
            _this.updateChart(d);
        };
        this.mouseover = function (d) {
            _this.showNodeText(d);
        };
        this.mouseout = function (d) {
            clearTimeout();
            _this.closeModal();
        };
        if (history.state.data === undefined) {
            router.navigate(["/view-menus-list"]);
        }
    }
    MenuListComponent.prototype.opentree = function (node) {
        this._tree.treeControl.expandAll();
    };
    MenuListComponent.prototype.setTreeValue = function () {
        this.dataSource.data = null;
        this.dataSource.data = this.jsonTreeData[0].press_options;
        console.log("tree data source", this.dataSource.data);
    };
    MenuListComponent.prototype.ngOnInit = function () {
        this.onSubmit(history.state.data.service_code_id);
        console.log("history.state.data", history.state.data);
        console.log("history.state.name", history.state.name);
    };
    MenuListComponent.prototype.ngAfterViewInit = function () {
        console.log("this.childComp", this.childComp);
        this.childComp.getTransferableMenuList(history.state.name == "true" ? 1 : 0, history.state.data.service_code_id, history.state.data.is_root);
    };
    MenuListComponent.prototype.getChildValue = function (data) {
        this.jsonTreeData[0].press_options = [];
        this.jsonTreeData[0].press_options = data[0].press_options;
        console.log(this.jsonTreeData);
        d3.select("svg").remove();
        this.renderTreeChart();
        console.log("get json from child", data);
    };
    MenuListComponent.prototype.onSubmit = function (id) {
        var _this = this;
        this.displayLoader = true;
        this.allService.getMenuById(id, history.state.name).subscribe({
            next: function (res) {
                // this.height = parseInt(res.treeDiemenstions[0].tree_height) + 200;
                // this.width = parseInt(res.treeDiemenstions[0].tree_width) + 200;
                (_this.width = 2000), (_this.height = 2000);
                for (var _i = 0, _a = res.data; _i < _a.length; _i++) {
                    var val = _a[_i];
                    if (val.id == "shortcode") {
                        _this.mainJson.push(val);
                        console.log(val);
                        val.menu_item_text = history.state.data.short_code;
                        delete val.id;
                        _this.childComp.startForm.patchValue({
                            serviceCode: val
                        });
                        _this.childComp.subServiceShortCode = history.state.data.short_code;
                        _this.childComp.menuWhiteListChecker = val.menuListCheck;
                        _this.childComp.serviceCodeNumber = history.state.data.short_code;
                        _this.jsonTreeData.push({
                            menu_item_text: history.state.data.short_code
                        });
                    }
                }
                _this.response = res.data;
                _this.convertToJson(res.data);
                _this.displayLoader = false;
            },
            error: function (e) {
                console.log("Error==============>", e);
                this.displayLoader = false;
            }
        });
    };
    MenuListComponent.prototype.convertToJson = function (data) {
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var menudata = data_1[_i];
            if (menudata.parent_id == "shortcode") {
                this.press_options.push({
                    menu_press_options: menudata.menu_press_options == undefined
                        ? null
                        : menudata.menu_press_options,
                    menu_unique: menudata.menu_unique,
                    is_package_code: menudata.is_package_code,
                    package_code_text: menudata.package_code_text,
                    is_3p_num: menudata.is_3p_num,
                    is_consent: menudata.is_consent,
                    consent_text: menudata.consent_text,
                    is_root: menudata.is_root,
                    menu_item_text: menudata.menu_item_text,
                    take_user_input: menudata.take_user_input,
                    user_input: menudata.user_input,
                    short_code_dtmf: menudata.short_code_dtmf,
                    has_menu: menudata.has_menu,
                    service_code_id: menudata.service_code_id,
                    action_id: menudata.action_id,
                    created_by: menudata.created_by,
                    created_dt: menudata.created_dt,
                    redis_flag: menudata.redis_flag,
                    id: menudata.id,
                    parent_id: menudata.parent_id,
                    charge_type: menudata.charge_type,
                    is_chargeable: menudata.is_chargeable,
                    optional_sms: menudata.optional_sms,
                    sms_text: menudata.sms_text,
                    amount: menudata.amount,
                    wl_menu_item_text: menudata.wl_menu_item_text,
                    transfer_ussdString: menudata.transfer_ussdString == null
                        ? "null"
                        : menudata.transfer_ussdString,
                    is_transferable: menudata.is_transferable,
                    esme_protocol: menudata.esme_protocol,
                    service_code_flow: menudata.service_code_flow,
                    press_options: this.recursiveConverttoJson(menudata, data) == undefined
                        ? []
                        : this.recursiveConverttoJson(menudata, data)
                });
            }
        }
        this.jsonTreeData[0].press_options = this.press_options;
        this.convertTosingledtmf();
        this.renderTreeChart();
        this.setTreeValue();
        this.childComp.mainJson[0].press_options =
            this.jsonTreeData[0].press_options;
        console.log("this.jsonTreeData[0].press_options", this.jsonTreeData[0].press_options);
        console.log("this.childComp.mainJson[0].press_options", this.childComp.mainJson[0].press_options);
    };
    MenuListComponent.prototype.recursiveConverttoJson = function (menuData, data) {
        var press_options = [];
        for (var _i = 0, data_2 = data; _i < data_2.length; _i++) {
            var menudata = data_2[_i];
            if (menudata.parent_id == menuData.id) {
                console.log("menudata:", menudata);
                console.log("menuData:", menuData);
                press_options.push({
                    menu_press_options: menudata.menu_press_options == undefined
                        ? null
                        : menudata.menu_press_options,
                    menu_unique: menudata.menu_unique,
                    is_package_code: menudata.is_package_code,
                    package_code_text: menudata.package_code_text,
                    is_3p_num: menudata.is_3p_num,
                    is_consent: menudata.is_consent,
                    is_root: menudata.is_root,
                    consent_text: menudata.consent_text,
                    menu_item_text: menudata.menu_item_text,
                    take_user_input: menudata.take_user_input,
                    user_input: menudata.user_input,
                    short_code_dtmf: menudata.short_code_dtmf,
                    has_menu: menudata.has_menu,
                    service_code_id: menudata.service_code_id,
                    wl_menu_item_text: menudata.wl_menu_item_text,
                    action_id: menudata.action_id,
                    created_by: menudata.created_by,
                    created_dt: menudata.created_dt,
                    redis_flag: menudata.redis_flag,
                    id: menudata.id,
                    parent_id: menudata.parent_id,
                    charge_type: menudata.charge_type,
                    is_chargeable: menudata.is_chargeable,
                    optional_sms: menudata.optional_sms,
                    sms_text: menudata.sms_text,
                    amount: menudata.amount,
                    service_code_flow: menudata.service_code_flow,
                    transfer_ussdString: menuData.transfer_ussdString == null
                        ? "null"
                        : menudata.transfer_ussdString,
                    is_transferable: menudata.is_transferable,
                    esme_protocol: menudata.esme_protocol,
                    press_options: this.recursiveConverttoJson(menudata, data) == undefined
                        ? []
                        : this.recursiveConverttoJson(menudata, data)
                });
            }
        }
        return press_options;
    };
    MenuListComponent.prototype.convertTosingledtmf = function () {
        var savedJson = [];
        var Json = this.jsonTreeData[0];
        if (Json.press_options.length > 0) {
            for (var _i = 0, _a = Json.press_options; _i < _a.length; _i++) {
                var updater = _a[_i];
                updater = __assign(__assign({}, updater), { short_code_dtmf: updater.menu_press_options });
                if (updater.press_options.length > 0) {
                    updater.press_options = this.updateChildNode(updater);
                }
                console.log(updater);
                savedJson.push(updater);
            }
        }
        Json.press_options = savedJson;
        console.log("this.mainJson[0]", this.mainJson[0]);
        console.log("Json", Json);
    };
    MenuListComponent.prototype.updateChildNode = function (child) {
        var savedJson = [];
        for (var _i = 0, _a = child.press_options; _i < _a.length; _i++) {
            var updater = _a[_i];
            updater = __assign(__assign({}, updater), { short_code_dtmf: updater.menu_press_options });
            if (updater.press_options.length > 0) {
                updater.press_options = this.updateChildNode(updater);
            }
            savedJson.push(updater);
        }
        return savedJson;
    };
    MenuListComponent.prototype.openCurrentNode = function (node) {
        this.mainObj = {};
        this.mainObj = node;
        console.log("mainObj", this.mainObj);
        this.showModal = "block";
    };
    MenuListComponent.prototype.showNodeText = function (d) {
        this.nodeText = d.data.menu_item_text;
        this.showTextModal = "block";
    };
    MenuListComponent.prototype.deleteCurrentNode = function () {
        this.closeModal();
        this.childComp.opendltMenuDialog(this.mainObj);
    };
    MenuListComponent.prototype.updateNode = function () {
        this.closeModal();
        this.childComp.updateMenu(this.mainObj);
    };
    MenuListComponent.prototype.addNewNode = function () {
        this.closeModal();
        console.log("idr aaaaa", this.mainObj);
        this.childComp.addChild(this.mainObj);
    };
    MenuListComponent.prototype.viewMenusList = function () {
        this.router.navigateByUrl("/view-menus-list");
    };
    MenuListComponent.prototype.closeModal = function () {
        this.showModal = "";
        this.showTextModal = "";
    };
    MenuListComponent.prototype.renderTreeChart = function () {
        var element = this.chartContainer.nativeElement;
        // this.width = element.offsetWidth - this.margin.left - this.margin.right;
        // this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
        console.log(document.getElementById("_svg"));
        if (document.getElementById("_svg") !== null) {
            // let domElement = document.getElementById("_svg");
            // let w = domElement.getAttribute("width");
            // let h = domElement.getAttribute("height");
            // console.log("width when not null",w);
            // let new_w = Number(w)+150;
            // let new_h = Number(h)+25;
            // console.log("width when not null",new_w);
        }
        else {
            this.svg = d3
                .select(element)
                .append("svg")
                .attr("width", this.width)
                .attr("height", this.height)
                .attr("id", "_svg")
                .append("g")
                .attr("transform", "translate(" + this.margin.left + "," + 500 + ")");
        }
        // declares a tree layout and assigns the size
        this.tree = d3
            .tree()
            .size([this.height, this.width + 120])
            .nodeSize([
            this.nodeWidth + this.horizontalSeparationBetweenNodes,
            this.nodeHeight + this.verticalSeparationBetweenNodes,
        ])
            .separation(function (a, b) {
            return a.parent == b.parent ? 5 : 5;
        });
        // Assigns parent, children, height, depth
        this.root = d3.hierarchy(this.jsonTreeData[0], function (d) {
            return d.press_options;
        });
        this.root.x0 = this.height / 2;
        this.root.y0 = 10;
        // Collapse after the second level
        //this.root.children.forEach(collapse);
        this.updateChart(this.root);
        // function collapse(d) {
        //   if (d.children) {
        //       d._children = d.children;
        //       d._children.forEach(collapse);
        //       d.children = null;
        //   }
        // }
    };
    MenuListComponent.prototype.updateChart = function (source) {
        var domElement = document.getElementById("_svg");
        var w = domElement.getAttribute("width");
        var h = domElement.getAttribute("height");
        var new_w = Number(w) + 150;
        var new_h = Number(h) + 25;
        domElement.removeAttribute("height");
        domElement.removeAttribute("width");
        domElement.setAttribute("width", "" + new_w);
        domElement.setAttribute("height", "" + new_h);
        this.width = new_w;
        this.height = new_h;
        var i = 0;
        console.log("source", source);
        this.treeData = this.tree(this.root);
        this.nodes = this.treeData.descendants();
        this.links = this.treeData.descendants().slice(1);
        this.nodes.forEach(function (d) {
            d.y = d.depth * 180;
        });
        var node = this.svg.selectAll("g.node").data(this.nodes, function (d) {
            return d.id || (d.id = ++i);
        });
        var nodeEnter = node
            .enter()
            .append("g")
            .attr("class", "node")
            .attr("transform", function (d) {
            return "translate(" + source.y0 + "," + source.x0 + ")";
        });
        nodeEnter
            .append("circle")
            .attr("class", "node")
            .attr("r", 1e-6)
            .on("mousedown", this.click)
            .style("fill", function (d) {
            return d._children ? "lightsteelblue" : "#fff";
        });
        nodeEnter
            .append("text")
            .attr("dy", ".35em")
            .attr("x", function (d) {
            return d.press_options || d._children ? -13 : 13;
        })
            .attr("text-anchor", function (d) {
            return d.press_options || d._children ? "end" : "start";
        })
            .on("click", this.mouseover)
            .style("font", "12px sans-serif")
            .text(function (d) {
            console.log("d", d);
            if (d.data.menu_item_text.length > 10) {
                return ((d.data.menu_press_options == undefined
                    ? ""
                    : d.data.menu_press_options + ":") +
                    d.data.menu_item_text.substring(0, 10).concat("..."));
            }
            return ((d.data.menu_press_options == undefined
                ? ""
                : d.data.menu_press_options + ":") + d.data.menu_item_text);
        });
        var nodeUpdate = nodeEnter.merge(node);
        nodeUpdate
            .transition()
            .duration(this.duration)
            .attr("transform", function (d) {
            return "translate(" + d.y + "," + d.x + ")";
        });
        nodeUpdate
            .select("circle.node")
            .attr("r", 10)
            .style("stroke-width", "3px")
            .style("stroke", "steelblue")
            .style("fill", function (d) {
            return d._children ? "lightsteelblue" : "#fff";
        })
            .attr("cursor", "pointer");
        var nodeExit = node
            .exit()
            .transition()
            .duration(this.duration)
            .attr("transform", function (d) {
            return "translate(" + source.y + "," + source.x + ")";
        })
            .remove();
        nodeExit.select("circle").attr("r", 1e-6);
        nodeExit.select("text").style("fill-opacity", 1e-6);
        var link = this.svg.selectAll("path.link").data(this.links, function (d) {
            return d.id;
        });
        var linkEnter = link
            .enter()
            .insert("path", "g")
            .attr("class", "link")
            .style("fill", "none")
            .style("stroke", "#ccc")
            .style("stroke-width", "2px")
            .attr("d", function (d) {
            var o = { x: source.x0, y: source.y0 };
            return diagonal(o, o);
        });
        var linkUpdate = linkEnter.merge(link);
        linkUpdate
            .transition()
            .duration(this.duration)
            .attr("d", function (d) {
            return diagonal(d, d.parent);
        });
        var linkExit = link
            .exit()
            .transition()
            .duration(this.duration)
            .attr("d", function (d) {
            var o = { x: source.x, y: source.y };
            return diagonal(o, o);
        })
            .remove();
        this.nodes.forEach(function (d) {
            d.x0 = d.x;
            d.y0 = d.y;
        });
        function diagonal(s, d) {
            var path = "M " + s.y + " " + s.x + "\n                  C " + (s.y + d.y) / 2 + " " + s.x + ",\n                  " + (s.y + d.y) / 2 + " " + d.x + ",\n                  " + d.y + " " + d.x;
            return path;
        }
    };
    MenuListComponent.prototype.saveChanges = function () {
        this.childComp.d3TreeWidth = this.width;
        this.childComp.d3TreeHeight = this.height;
        this.childComp.saveJsonFromView(history.state.data.service_code_id, history.state.name);
    };
    __decorate([
        core_1.ViewChild("child")
    ], MenuListComponent.prototype, "childComp");
    __decorate([
        core_1.ViewChild("chart", { static: true })
    ], MenuListComponent.prototype, "chartContainer");
    __decorate([
        core_1.ViewChild("tree")
    ], MenuListComponent.prototype, "_tree");
    MenuListComponent = __decorate([
        core_1.Component({
            selector: "app-menu-list",
            templateUrl: "./menu-list.component.html",
            styleUrls: ["./menu-list.component.scss"]
        })
    ], MenuListComponent);
    return MenuListComponent;
}());
exports.MenuListComponent = MenuListComponent;
