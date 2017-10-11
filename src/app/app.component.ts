import { Component }                      from '@angular/core';
import APP_CONFIG                         from './app.config';
import { Node, Link }                     from './d3';
// import { startingNodes, startingLinks }   from './model/interactomeData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  nodes: Node[] = [];
  links: Link[] = [];

  pid_to_nodePos: {} = {};

  /**
  * @desc Parses list of protein objects and converts into nodes. Adds mapping
  * @param Object[]: List of protein objects
  * @returns Node[]: List of nodes
  */
  parseProteinNodes(proteinNodes){
    let nodes: Node[] = [];

    for(let i = 1; i<=proteinNodes.length; i++){
      let curr = proteinNodes[i];    
      this.pid_to_nodePos[curr.id] = i;    // Map proteinID to position of its node

      nodes.push(new Node(curr.id, curr.label));
    }

    return nodes;
  }

  /**
  * @desc Parses list of proteinLinks and converts into links. Uses Mapping
  * @param Object[]: List of proteinLink objects
  * @returns Node[]: List of links
  */
  parseProteinEdges(proteinEdges){
    let links: Link[] = [];
    for(let i = 1; i<=proteinEdges.length; i++){
      let curr = proteinEdges[i];
      let t = this.pid_to_nodePos[curr.target];
      let s = this.pid_to_nodePos[curr.source];

      this.nodes[t].linkCount++;
      this.nodes[s].linkCount++;

      links.push(new Link(t,s));
    }
    return links;
  }

  proteinSetUp(){
    let startingNodes:Object[] = [
    {"id": "5", "label": "PLEKHF2"},{"id": "1", "label": "DIPA"},{"id": "8", "label": "KRTAP4-12"},{"id": "2", "label": "RBPMS"},{"id": "4", "label": "NIF3L1"},{"id": "3", "label": "EFEMP2"},{"id": "6", "label": "FLJ22494"},{"id": "7", "label": "TSC22D4"},{"id": "13", "label": "DPPA2"},{"id": "10", "label": "PEPP-2"},{"id": "11", "label": "LNX"},{"id": "9", "label": "USHBP1"},{"id": "12", "label": "ZBTB8"},
    ]
    let startingLinks:Object[] = [
    {"source": "4", "target": "1"},{"source": "5", "target": "1"},{"source": "7", "target": "4"},{"source": "8", "target": "6"},{"source": "10", "target": "2"},{"source": "10", "target": "3"},{"source": "11", "target": "1"},{"source": "11", "target": "7"},{"source": "11", "target": "8"},{"source": "12", "target": "11"},
    ]

    this.nodes = this.parseProteinNodes(startingNodes);
    this.links = this.parseProteinEdges(startingLinks);
  }

  constructor() {
     this.proteinSetUp();
  }
}
