// reports.component.ts

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { initFlowbite } from 'flowbite';
import * as d3 from 'd3';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit {

  private svg: any;
  private margin = 10;
  private width = 550;
  private height = 400;
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors: any;
  private data!: any[];

  constructor(private http: HttpClient) {} 

  private createSvg(): void {
    this.svg = d3.select("figure#pie")
      .append("svg")
      .attr("width", this.width)
      .attr("height", this.height)
      .append("g")
      .attr(
        "transform",
        "translate(" + this.width / 2 + "," + this.height / 2 + ")"
      );
  }

  private createColors(): void {
    this.colors = d3.scaleOrdinal()
      .domain(this.data.map((d: any) => d.Stars.toString()))
      .range(["#e0f2fe", "#bae6fd", "#7dd3fc", "#0ea5e9", "#0284c7"]);
  }

  private drawChart(): void {
    const pie = d3.pie<any>().value((d: any) => Number(d.Stars));

    this.svg
      .selectAll('pieces')
      .data(pie(this.data))
      .enter()
      .append('path')
      .attr('d', d3.arc()
        .innerRadius(0)
        .outerRadius(this.radius)
      )
      .attr('fill', (d: any, i: any) => (this.colors(i)))
      .attr("stroke", "#e0f2fe")
      .style("stroke-width", "1px");

    const labelLocation = d3.arc()
      .innerRadius(100)
      .outerRadius(this.radius);

    this.svg
      .selectAll('pieces')
      .data(pie(this.data))
      .enter()
      .append('text')
      .text((d: any) => d.data.Framework)
      .attr("transform", (d: any) => "translate(" + labelLocation.centroid(d) + ")")
      .style("text-anchor", "middle")
      .style("font-size", 12);
  }
  private svg2: any;
  private colors2: any;
  private data2!: any[];

  private createSvg2(): void {
    this.svg2 = d3.select("figure#pie2")
      .append("svg")
      .attr("width", this.width)
      .attr("height", this.height)
      .append("g")
      .attr(
        "transform",
        "translate(" + this.width / 2 + "," + this.height / 2 + ")"
      );
  }

  private createColors2(): void {
    this.colors2 = d3.scaleOrdinal()
      .domain(this.data2.map((d: any) => d.Released.toString()))
      .range(["#f3e8ff", "#e9d5ff", "#d8b4fe", "#c084fc", "#a855f7"]);
  }

  private drawChart2(): void {
    const pie2 = d3.pie<any>().value((d: any) => Number(d.Released));

    this.svg2
      .selectAll('pieces')
      .data(pie2(this.data2))
      .enter()
      .append('path')
      .attr('d', d3.arc()
        .innerRadius(0)
        .outerRadius(this.radius)
      )
      .attr('fill', (d: any, i: any) => (this.colors2(i)))
      .attr("stroke", "#f3e8ff")
      .style("stroke-width", "1px");

    const labelLocation2 = d3.arc()
      .innerRadius(100)
      .outerRadius(this.radius);

    this.svg2
      .selectAll('pieces')
      .data(pie2(this.data2))
      .enter()
      .append('text')
      .text((d: any) => d.data.Framework)
      .attr("transform", (d: any) => "translate(" + labelLocation2.centroid(d) + ")")
      .style("text-anchor", "middle")
      .style("font-size", 12);
  }

  ngOnInit(): void {
    initFlowbite();
    
    // First Pie Chart
    this.createSvg();
    this.http.get('https://65a95968219bfa3718691505.mockapi.io/chart/charv1')
      .subscribe((data: any) => {
        this.data = data;
        this.createColors();
        this.drawChart();
      });

    // Second Pie Chart
    this.createSvg2();
    this.http.get('https://65a95968219bfa3718691505.mockapi.io/chart/chartv2')
      .subscribe((data: any) => {
        this.data2 = data;
        this.createColors2();
        this.drawChart2();
      });
  }

  
}
