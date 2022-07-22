import { Component, Input, OnInit, SimpleChanges, ViewChild,AfterViewChecked } from '@angular/core';
import { MatTreeNestedDataSource } from "@angular/material/tree";
import { NestedTreeControl } from "@angular/cdk/tree";
import { MenuAddComponent } from '../menu-add/menu-add.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu-mat-tree-view',
  templateUrl: './menu-mat-tree-view.component.html',
  styleUrls: ['./menu-mat-tree-view.component.css']
})
export class MenuMatTreeViewComponent implements OnInit   {
  treeControl = new NestedTreeControl<any>((node) => node.press_options);
  dataSource = new MatTreeNestedDataSource<any>();
  mainJson: any = [];
  @ViewChild("tree") tree:any;
  @ViewChild(MenuAddComponent) child:any;
  nodeText:string;
  showTextModal:string=""
  constructor(private router:Router) {}

  hasChild = (_: number, node: any) => !!node.press_options && node.press_options;

  ngOnInit(): void {}

  opentree(node) {
    this.tree.treeControl.expandAll();
  }

  setTreeValue() {
    this.dataSource.data = null;
    this.dataSource.data = this.mainJson[0].press_options;
  }

  getChildValue(data){
    this.mainJson = [];
    this.mainJson = data;
    this.setTreeValue();
  }

  viewMenu(){
    this.router.navigateByUrl('/view-menus-list')
  }
  closeModal(){
    this.nodeText="";
    this.showTextModal=""
  }
  showNodeTextModal(node:any){
    this.showTextModal="block";
    this.nodeText=node.menu_item_text;
  }
}
