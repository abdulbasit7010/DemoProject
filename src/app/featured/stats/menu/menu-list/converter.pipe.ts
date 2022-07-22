import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "converter",
})
export class ConverterPipe implements PipeTransform {
  transform(
    array: any[],
    id: string = "id",
    parentId: string = "parent_id"
  ): any[] {
    const map = array.reduce(
      (acc, node) => ((node.press_options = []), (acc[node[id]] = node), acc),
      {}
    );

    return Object.values(map)
      .map(
        (node) => (
          node[parentId] && map[node[parentId]].press_options.push(node), node
        )
      )
      .filter((node) => node[parentId] === null);
  }
}
