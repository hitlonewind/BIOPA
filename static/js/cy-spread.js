(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a){return a(o,!0)}if(i){return i(o,!0)}var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++){s(r[o])}return s})({1:[function(_dereq_,module,exports){var foograph={insertVertex:function(vertex){this.vertices.push(vertex);this.vertexCount++},insertEdge:function(label,weight,vertex1,vertex2,style){var e1=new foograph.Edge(label,weight,vertex2,style);var e2=new foograph.Edge(null,weight,vertex1,null);vertex1.edges.push(e1);vertex2.reverseEdges.push(e2);return e1},removeEdge:function(vertex1,vertex2){for(var i=vertex1.edges.length-1;i>=0;i--){if(vertex1.edges[i].endVertex==vertex2){vertex1.edges.splice(i,1);break}}for(var i=vertex2.reverseEdges.length-1;i>=0;i--){if(vertex2.reverseEdges[i].endVertex==vertex1){vertex2.reverseEdges.splice(i,1);break}}},removeVertex:function(vertex){for(var i=vertex.edges.length-1;i>=0;i--){this.removeEdge(vertex,vertex.edges[i].endVertex)}for(var i=vertex.reverseEdges.length-1;i>=0;i--){this.removeEdge(vertex.reverseEdges[i].endVertex,vertex)}for(var i=this.vertices.length-1;i>=0;i--){if(this.vertices[i]==vertex){this.vertices.splice(i,1);break}}this.vertexCount--},plot:function(canvas){var i=0;for(i=0;i<this.vertices.length;i++){var v=this.vertices[i];if(!v.hidden){for(var j=0;j<v.edges.length;j++){var e=v.edges[j];if(!e.hidden){e.draw(canvas,v)}}}}for(i=0;i<this.vertices.length;i++){v=this.vertices[i];if(!v.hidden){v.draw(canvas)}}},Graph:function(label,directed){this.label=label;this.vertices=new Array();this.directed=directed;this.vertexCount=0;this.insertVertex=foograph.insertVertex;this.removeVertex=foograph.removeVertex;this.insertEdge=foograph.insertEdge;this.removeEdge=foograph.removeEdge;this.plot=foograph.plot},Vertex:function(label,x,y,style){this.label=label;this.edges=new Array();this.reverseEdges=new Array();this.x=x;this.y=y;this.dx=0;this.dy=0;this.level=-1;this.numberOfParents=0;this.hidden=false;this.fixed=false;if(style!=null){this.style=style}else{this.style=new foograph.VertexStyle("ellipse",80,40,"#ffffff","#000000",true)}},VertexStyle:function(shape,width,height,fillColor,borderColor,showLabel){this.shape=shape;this.width=width;this.height=height;this.fillColor=fillColor;this.borderColor=borderColor;this.showLabel=showLabel},Edge:function(label,weight,endVertex,style){this.label=label;this.weight=weight;this.endVertex=endVertex;this.style=null;this.hidden=false;this.curved=false;this.controlX=-1;this.controlY=-1;this.original=null;if(style!=null){this.style=style}else{this.style=new foograph.EdgeStyle(2,"#000000",true,false)}},EdgeStyle:function(width,color,showArrow,showLabel){this.width=width;this.color=color;this.showArrow=showArrow;this.showLabel=showLabel},RandomVertexLayout:function(width,height){this.width=width;this.height=height},ForceDirectedVertexLayout:function(width,height,iterations,randomize,eps){this.width=width;this.height=height;this.iterations=iterations;this.randomize=randomize;this.eps=eps;this.callback=function(){}},A:1.5,R:0.5};foograph.Vertex.prototype.toString=function(){return"[v:"+this.label+"] "};foograph.Edge.prototype.toString=function(){return"[e:"+this.endVertex.label+"] "};foograph.Vertex.prototype.draw=function(canvas){var x=this.x;var y=this.y;var width=this.style.width;var height=this.style.height;var shape=this.style.shape;canvas.setStroke(2);canvas.setColor(this.style.fillColor);if(shape=="rect"){canvas.fillRect(x,y,width,height);canvas.setColor(this.style.borderColor);canvas.drawRect(x,y,width,height)}else{canvas.fillEllipse(x,y,width,height);canvas.setColor(this.style.borderColor);canvas.drawEllipse(x,y,width,height)}if(this.style.showLabel){canvas.drawStringRect(this.label,x,y+height/2-7,width,"center")}};foograph.Graph.prototype.normalize=function(width,height,preserveAspect){for(var i8 in this.vertices){var v=this.vertices[i8];v.oldX=v.x;v.oldY=v.y}var mnx=width*0.1;var mxx=width*0.9;var mny=height*0.1;var mxy=height*0.9;if(preserveAspect==null){preserveAspect=true}var minx=Number.MAX_VALUE;var miny=Number.MAX_VALUE;var maxx=Number.MIN_VALUE;var maxy=Number.MIN_VALUE;for(var i7 in this.vertices){var v=this.vertices[i7];if(v.x<minx){minx=v.x}if(v.y<miny){miny=v.y}if(v.x>maxx){maxx=v.x}if(v.y>maxy){maxy=v.y}}var kx=(mxx-mnx)/(maxx-minx);var ky=(mxy-mny)/(maxy-miny);if(preserveAspect){kx=Math.min(kx,ky);ky=Math.min(kx,ky)}var newMaxx=Number.MIN_VALUE;var newMaxy=Number.MIN_VALUE;for(var i8 in this.vertices){var v=this.vertices[i8];v.x=(v.x-minx)*kx;v.y=(v.y-miny)*ky;if(v.x>newMaxx){newMaxx=v.x}if(v.y>newMaxy){newMaxy=v.y}}var dx=(width-newMaxx)/2;var dy=(height-newMaxy)/2;for(var i8 in this.vertices){var v=this.vertices[i8];v.x+=dx;v.y+=dy}};foograph.Edge.prototype.draw=function(canvas,v){var x1=Math.round(v.x+v.style.width/2);
var y1=Math.round(v.y+v.style.height/2);var x2=Math.round(this.endVertex.x+this.endVertex.style.width/2);var y2=Math.round(this.endVertex.y+this.endVertex.style.height/2);var x3=this.controlX;var y3=this.controlY;var X_TIP,Y_TIP,ANGLE;function Bx(t){return(1-t)*(1-t)*x1+2*(1-t)*t*x3+t*t*x2}function By(t){return(1-t)*(1-t)*y1+2*(1-t)*t*y3+t*t*y2}canvas.setStroke(this.style.width);canvas.setColor(this.style.color);if(this.curved){this.curved=false;var t=0,dt=1/10;var xs=x1,ys=y1,xn,yn;while(t<1-dt){t+=dt;xn=Bx(t);yn=By(t);canvas.drawLine(xs,ys,xn,yn);xs=xn;ys=yn}X_TIP=xs;Y_TIP=ys;ANGLE=angularCoord(Bx(1-2*dt)-X_TIP,By(1-2*dt)-Y_TIP)}else{canvas.drawLine(x1,y1,x2,y2);X_TIP=x2;Y_TIP=y2;ANGLE=angularCoord(x1-X_TIP,y1-Y_TIP)}if(this.style.showArrow){drawArrow(ANGLE,X_TIP,Y_TIP)}if(this.style.showLabel){}function drawArrow(phi,x,y){var H=50;var W=10;var p11=0,p12=0;var p21=H,p22=W/2;var p31=H,p32=-W/2;var r2=radialCoord(p21,p22);var r3=radialCoord(p31,p32);var phi2=angularCoord(p21,p22);var phi3=angularCoord(p31,p32);phi2+=phi;phi3+=phi;p21=r2*Math.cos(phi2);p22=r2*Math.sin(phi2);p31=r3*Math.cos(phi3);p32=r3*Math.sin(phi3);p11+=x;p12+=y;p21+=x;p22+=y;p31+=x;p32+=y;canvas.fillPolygon(new Array(p11,p21,p31),new Array(p12,p22,p32))}function angularCoord(x,y){var phi=0;if(x>0&&y>=0){phi=Math.atan(y/x)}if(x>0&&y<0){phi=Math.atan(y/x)+2*Math.PI}if(x<0){phi=Math.atan(y/x)+Math.PI}if(x=0&&y>0){phi=Math.PI/2}if(x=0&&y<0){phi=3*Math.PI/2}return phi}function radialCoord(x,y){return Math.sqrt(x*x+y*y)}};foograph.RandomVertexLayout.prototype.layout=function(graph){for(var i=0;i<graph.vertices.length;i++){var v=graph.vertices[i];v.x=Math.round(Math.random()*this.width);v.y=Math.round(Math.random()*this.height)}};foograph.ForceDirectedVertexLayout.prototype.__identifyComponents=function(graph){var componentCenters=new Array();var components=new Array();function dfs(vertex){var stack=new Array();var component=new Array();var centerVertex=new foograph.Vertex("component_center",-1,-1);centerVertex.hidden=true;componentCenters.push(centerVertex);components.push(component);function visitVertex(v){component.push(v);v.__dfsVisited=true;for(var i in v.edges){var e=v.edges[i];if(!e.hidden){stack.push(e.endVertex)}}for(var i in v.reverseEdges){if(!v.reverseEdges[i].hidden){stack.push(v.reverseEdges[i].endVertex)}}}visitVertex(vertex);while(stack.length>0){var u=stack.pop();if(!u.__dfsVisited&&!u.hidden){visitVertex(u)}}}for(var i in graph.vertices){var v=graph.vertices[i];v.__dfsVisited=false}for(var k in graph.vertices){var v=graph.vertices[k];if(!v.__dfsVisited&&!v.hidden){dfs(v)}}if(componentCenters.length>1){for(var i in componentCenters){graph.insertVertex(componentCenters[i])}for(var i in components){for(var j in components[i]){edge=graph.insertEdge("",1,components[i][j],componentCenters[i]);edge.hidden=true}}for(var i in componentCenters){for(var j in componentCenters){if(i!=j){e=graph.insertEdge("",3,componentCenters[i],componentCenters[j]);e.hidden=true}}}return componentCenters}return null};foograph.ForceDirectedVertexLayout.prototype.layout=function(graph){this.graph=graph;var area=this.width*this.height;var k=Math.sqrt(area/graph.vertexCount);var t=this.width/10;var dt=t/(this.iterations+1);var eps=this.eps;function Fa(z){return foograph.A*z*z/k}function Fr(z){return foograph.R*k*k/z}function Fw(z){return 1/z*z}centers=this.__identifyComponents(graph);if(this.randomize){randomLayout=new foograph.RandomVertexLayout(this.width,this.height);randomLayout.layout(graph)}for(var q=0;q<this.iterations;q++){for(var i1 in graph.vertices){var v=graph.vertices[i1];v.dx=0;v.dy=0;if(!v.fixed){for(var i2 in graph.vertices){var u=graph.vertices[i2];if(v!=u&&!u.fixed){var difx=v.x-u.x;var dify=v.y-u.y;var d=Math.max(eps,Math.sqrt(difx*difx+dify*dify));var force=Fr(d);v.dx=v.dx+(difx/d)*force;v.dy=v.dy+(dify/d)*force}}}}for(var i3 in graph.vertices){var v=graph.vertices[i3];if(!v.fixed){for(var i4 in v.edges){var e=v.edges[i4];var u=e.endVertex;var difx=v.x-u.x;var dify=v.y-u.y;var d=Math.max(eps,Math.sqrt(difx*difx+dify*dify));var force=Fa(d);var d=Math.max(eps,Math.sqrt(difx*difx+dify*dify));v.dx=v.dx-(difx/d)*force;v.dy=v.dy-(dify/d)*force;u.dx=u.dx+(difx/d)*force;u.dy=u.dy+(dify/d)*force}}}for(var i5 in graph.vertices){var v=graph.vertices[i5];if(!v.fixed){var d=Math.max(eps,Math.sqrt(v.dx*v.dx+v.dy*v.dy));v.x=v.x+(v.dx/d)*Math.min(d,t);v.y=v.y+(v.dy/d)*Math.min(d,t);v.x=Math.round(v.x);v.y=Math.round(v.y)}}t-=dt;if(q%10==0){this.callback()}}if(centers){for(var i in centers){graph.removeVertex(centers[i])}}graph.normalize(this.width,this.height,true)};module.exports=foograph},{}],2:[function(_dereq_,module,exports){(function(){var getLayout=_dereq_("./layout");var register=function(cytoscape){var layout=getLayout(cytoscape);cytoscape("layout","spread",layout)};if(typeof module!=="undefined"&&module.exports){module.exports=register}if(typeof define!=="undefined"&&define.amd){define("cytoscape-spread",function(){return register})}if(typeof cytoscape!=="undefined"){register(cytoscape)
}})()},{"./layout":3}],3:[function(_dereq_,module,exports){var Thread;var foograph=_dereq_("./foograph");var Voronoi=_dereq_("./rhill-voronoi-core");var defaults={animate:true,ready:undefined,stop:undefined,fit:true,minDist:20,padding:20,expandingFactor:-1,maxFruchtermanReingoldIterations:50,maxExpandIterations:4,boundingBox:undefined,randomize:false};function SpreadLayout(options){var opts=this.options={};for(var i in defaults){opts[i]=defaults[i]}for(var i in options){opts[i]=options[i]}}SpreadLayout.prototype.run=function(){var layout=this;var options=this.options;var cy=options.cy;var bb=options.boundingBox||{x1:0,y1:0,w:cy.width(),h:cy.height()};if(bb.x2===undefined){bb.x2=bb.x1+bb.w}if(bb.w===undefined){bb.w=bb.x2-bb.x1}if(bb.y2===undefined){bb.y2=bb.y1+bb.h}if(bb.h===undefined){bb.h=bb.y2-bb.y1}var nodes=cy.nodes();var edges=cy.edges();var cWidth=cy.width();var cHeight=cy.height();var simulationBounds=bb;var padding=options.padding;var simBBFactor=Math.max(1,Math.log(nodes.length)*0.8);if(nodes.length<100){simBBFactor/=2}layout.trigger({type:"layoutstart",layout:layout});var simBB={x1:0,y1:0,x2:cWidth*simBBFactor,y2:cHeight*simBBFactor};if(simulationBounds){simBB.x1=simulationBounds.x1;simBB.y1=simulationBounds.y1;simBB.x2=simulationBounds.x2;simBB.y2=simulationBounds.y2}simBB.x1+=padding;simBB.y1+=padding;simBB.x2-=padding;simBB.y2-=padding;var width=simBB.x2-simBB.x1;var height=simBB.y2-simBB.y1;var startTime=Date.now();if(nodes.size()<=1){nodes.positions({x:Math.round((simBB.x1+simBB.x2)/2),y:Math.round((simBB.y1+simBB.y2)/2)});if(options.fit){cy.fit(options.padding)}var endTime=Date.now();console.info("Layout on "+nodes.size()+" nodes took "+(endTime-startTime)+" ms");layout.one("layoutready",options.ready);layout.trigger("layoutready");layout.one("layoutstop",options.stop);layout.trigger("layoutstop");return}var pData={"width":width,"height":height,"minDist":options.minDist,"expFact":options.expandingFactor,"expIt":0,"maxExpIt":options.maxExpandIterations,"vertices":[],"edges":[],"startTime":startTime,"maxFruchtermanReingoldIterations":options.maxFruchtermanReingoldIterations};nodes.each(function(i,node){var nodeId=node.id();var pos=node.position();if(options.randomize){pos={x:Math.round(simBB.x1+(simBB.x2-simBB.x1)*Math.random()),y:Math.round(simBB.y1+(simBB.y2-simBB.y1)*Math.random())}}pData["vertices"].push({id:nodeId,x:pos.x,y:pos.y})});edges.each(function(){var srcNodeId=this.source().id();var tgtNodeId=this.target().id();pData["edges"].push({src:srcNodeId,tgt:tgtNodeId})});var t1=layout.thread;if(!t1||t1.stopped()){t1=layout.thread=Thread();t1.require(foograph,"foograph");t1.require(Voronoi,"Voronoi")}function setPositions(pData){var dataVertices=pData["vertices"];var vertices=[];for(var i=0;i<dataVertices.length;++i){var dv=dataVertices[i];vertices[dv.id]={x:dv.x,y:dv.y}}nodes.positions(function(i,node){var id=node.id();var vertex=vertices[id];return{x:Math.round(simBB.x1+vertex.x),y:Math.round(simBB.y1+vertex.y)}});if(options.fit){cy.fit(options.padding)}cy.nodes().rtrigger("position")}var didLayoutReady=false;t1.on("message",function(e){var pData=e.message;if(!options.animate){return}setPositions(pData);if(!didLayoutReady){layout.trigger("layoutready");didLayoutReady=true}});layout.one("layoutready",options.ready);t1.pass(pData).run(function(pData){function cellCentroid(cell){var hes=cell.halfedges;var area=0,x=0,y=0;var p1,p2,f;for(var i=0;i<hes.length;++i){p1=hes[i].getEndpoint();p2=hes[i].getStartpoint();area+=p1.x*p2.y;area-=p1.y*p2.x;f=p1.x*p2.y-p2.x*p1.y;x+=(p1.x+p2.x)*f;y+=(p1.y+p2.y)*f}area/=2;f=area*6;return{x:x/f,y:y/f}}function sitesDistance(ls,rs){var dx=ls.x-rs.x;var dy=ls.y-rs.y;return Math.sqrt(dx*dx+dy*dy)}foograph=eval("foograph");Voronoi=eval("Voronoi");var lWidth=pData["width"];var lHeight=pData["height"];var lMinDist=pData["minDist"];var lExpFact=pData["expFact"];var lMaxExpIt=pData["maxExpIt"];var lMaxFruchtermanReingoldIterations=pData["maxFruchtermanReingoldIterations"];var savePositions=function(){pData["width"]=lWidth;pData["height"]=lHeight;pData["expIt"]=expandIteration;pData["expFact"]=lExpFact;pData["vertices"]=[];for(var i=0;i<fv.length;++i){pData["vertices"].push({id:fv[i].label,x:fv[i].x,y:fv[i].y})}};var messagePositions=function(){broadcast(pData)};var frg=new foograph.Graph("FRgraph",false);var frgNodes={};var dataVertices=pData["vertices"];for(var ni=0;ni<dataVertices.length;++ni){var id=dataVertices[ni]["id"];var v=new foograph.Vertex(id,Math.round(Math.random()*lHeight),Math.round(Math.random()*lHeight));frgNodes[id]=v;frg.insertVertex(v)}var dataEdges=pData["edges"];for(var ei=0;ei<dataEdges.length;++ei){var srcNodeId=dataEdges[ei]["src"];var tgtNodeId=dataEdges[ei]["tgt"];frg.insertEdge("",1,frgNodes[srcNodeId],frgNodes[tgtNodeId])}var fv=frg.vertices;var iterations=lMaxFruchtermanReingoldIterations;var frLayoutManager=new foograph.ForceDirectedVertexLayout(lWidth,lHeight,iterations,false,lMinDist);frLayoutManager.callback=function(){savePositions();
messagePositions()};frLayoutManager.layout(frg);savePositions();messagePositions();if(lMaxExpIt<=0){return pData}var voronoi=new Voronoi();var bbox={xl:0,xr:lWidth,yt:0,yb:lHeight};var vSites=[];for(var i=0;i<fv.length;++i){vSites[fv[i].label]=fv[i]}function checkMinDist(ee){var infractions=0;for(var eei=0;eei<ee.length;++eei){var e=ee[eei];if((e.lSite!=null)&&(e.rSite!=null)&&sitesDistance(e.lSite,e.rSite)<lMinDist){++infractions}}return infractions}var diagram=voronoi.compute(fv,bbox);var cells=diagram.cells;for(var i=0;i<cells.length;++i){var cell=cells[i];var site=cell.site;var centroid=cellCentroid(cell);var currv=vSites[site.label];currv.x=centroid.x;currv.y=centroid.y}if(lExpFact<0){lExpFact=Math.max(0.05,Math.min(0.1,lMinDist/Math.sqrt((lWidth*lHeight)/fv.length)*0.5))}var prevInfractions=checkMinDist(diagram.edges);var bStop=(prevInfractions<=0)||lMaxExpIt<=0;var voronoiIteration=0;var expandIteration=0;while(!bStop){++voronoiIteration;for(var it=0;it<=4;++it){voronoi.recycle(diagram);diagram=voronoi.compute(fv,bbox);for(var i=0;i<cells.length;++i){var cell=cells[i];var site=cell.site;var centroid=cellCentroid(cell);var currv=vSites[site.label];currv.x=centroid.x;currv.y=centroid.y}}var currInfractions=checkMinDist(diagram.edges);if(currInfractions<=0){bStop=true}else{if(currInfractions>=prevInfractions||voronoiIteration>=4){if(expandIteration>=lMaxExpIt){bStop=true}else{lWidth+=lWidth*lExpFact;lHeight+=lHeight*lExpFact;bbox={xl:0,xr:lWidth,yt:0,yb:lHeight};++expandIteration;voronoiIteration=0}}}prevInfractions=currInfractions;savePositions();messagePositions()}savePositions();return pData}).then(function(pData){var dataVertices=pData["vertices"];setPositions(pData);var startTime=pData["startTime"];var endTime=new Date();console.info("Layout on "+dataVertices.length+" nodes took "+(endTime-startTime)+" ms");layout.one("layoutstop",options.stop);if(!options.animate){layout.trigger("layoutready")}layout.trigger("layoutstop");t1.stop()});return this};SpreadLayout.prototype.stop=function(){if(this.thread){this.thread.stop()}this.trigger("layoutstop")};SpreadLayout.prototype.destroy=function(){if(this.thread){this.thread.stop()}};module.exports=function get(cytoscape){Thread=cytoscape.Thread;return SpreadLayout}},{"./foograph":1,"./rhill-voronoi-core":4}],4:[function(_dereq_,module,exports){
/*!
Copyright (C) 2010-2013 Raymond Hill: https://github.com/gorhill/Javascript-Voronoi
MIT License: See https://github.com/gorhill/Javascript-Voronoi/LICENSE.md
*/
function Voronoi(){this.vertices=null;this.edges=null;this.cells=null;this.toRecycle=null;this.beachsectionJunkyard=[];this.circleEventJunkyard=[];this.vertexJunkyard=[];this.edgeJunkyard=[];this.cellJunkyard=[]}Voronoi.prototype.reset=function(){if(!this.beachline){this.beachline=new this.RBTree()}if(this.beachline.root){var beachsection=this.beachline.getFirst(this.beachline.root);while(beachsection){this.beachsectionJunkyard.push(beachsection);beachsection=beachsection.rbNext}}this.beachline.root=null;if(!this.circleEvents){this.circleEvents=new this.RBTree()}this.circleEvents.root=this.firstCircleEvent=null;this.vertices=[];this.edges=[];this.cells=[]};Voronoi.prototype.sqrt=function(n){return Math.sqrt(n)};Voronoi.prototype.abs=function(n){return Math.abs(n)};Voronoi.prototype.ε=Voronoi.ε=1e-9;Voronoi.prototype.invε=Voronoi.invε=1/Voronoi.ε;Voronoi.prototype.equalWithEpsilon=function(a,b){return this.abs(a-b)<1e-9};Voronoi.prototype.greaterThanWithEpsilon=function(a,b){return a-b>1e-9};Voronoi.prototype.greaterThanOrEqualWithEpsilon=function(a,b){return b-a<1e-9};Voronoi.prototype.lessThanWithEpsilon=function(a,b){return b-a>1e-9};Voronoi.prototype.lessThanOrEqualWithEpsilon=function(a,b){return a-b<1e-9};Voronoi.prototype.RBTree=function(){this.root=null};Voronoi.prototype.RBTree.prototype.rbInsertSuccessor=function(node,successor){var parent;if(node){successor.rbPrevious=node;successor.rbNext=node.rbNext;if(node.rbNext){node.rbNext.rbPrevious=successor}node.rbNext=successor;if(node.rbRight){node=node.rbRight;while(node.rbLeft){node=node.rbLeft}node.rbLeft=successor}else{node.rbRight=successor}parent=node}else{if(this.root){node=this.getFirst(this.root);successor.rbPrevious=null;successor.rbNext=node;node.rbPrevious=successor;node.rbLeft=successor;parent=node}else{successor.rbPrevious=successor.rbNext=null;this.root=successor;parent=null}}successor.rbLeft=successor.rbRight=null;successor.rbParent=parent;successor.rbRed=true;var grandpa,uncle;node=successor;while(parent&&parent.rbRed){grandpa=parent.rbParent;if(parent===grandpa.rbLeft){uncle=grandpa.rbRight;if(uncle&&uncle.rbRed){parent.rbRed=uncle.rbRed=false;grandpa.rbRed=true;node=grandpa}else{if(node===parent.rbRight){this.rbRotateLeft(parent);node=parent;parent=node.rbParent}parent.rbRed=false;grandpa.rbRed=true;this.rbRotateRight(grandpa)}}else{uncle=grandpa.rbLeft;if(uncle&&uncle.rbRed){parent.rbRed=uncle.rbRed=false;grandpa.rbRed=true;node=grandpa}else{if(node===parent.rbLeft){this.rbRotateRight(parent);
node=parent;parent=node.rbParent}parent.rbRed=false;grandpa.rbRed=true;this.rbRotateLeft(grandpa)}}parent=node.rbParent}this.root.rbRed=false};Voronoi.prototype.RBTree.prototype.rbRemoveNode=function(node){if(node.rbNext){node.rbNext.rbPrevious=node.rbPrevious}if(node.rbPrevious){node.rbPrevious.rbNext=node.rbNext}node.rbNext=node.rbPrevious=null;var parent=node.rbParent,left=node.rbLeft,right=node.rbRight,next;if(!left){next=right}else{if(!right){next=left}else{next=this.getFirst(right)}}if(parent){if(parent.rbLeft===node){parent.rbLeft=next}else{parent.rbRight=next}}else{this.root=next}var isRed;if(left&&right){isRed=next.rbRed;next.rbRed=node.rbRed;next.rbLeft=left;left.rbParent=next;if(next!==right){parent=next.rbParent;next.rbParent=node.rbParent;node=next.rbRight;parent.rbLeft=node;next.rbRight=right;right.rbParent=next}else{next.rbParent=parent;parent=next;node=next.rbRight}}else{isRed=node.rbRed;node=next}if(node){node.rbParent=parent}if(isRed){return}if(node&&node.rbRed){node.rbRed=false;return}var sibling;do{if(node===this.root){break}if(node===parent.rbLeft){sibling=parent.rbRight;if(sibling.rbRed){sibling.rbRed=false;parent.rbRed=true;this.rbRotateLeft(parent);sibling=parent.rbRight}if((sibling.rbLeft&&sibling.rbLeft.rbRed)||(sibling.rbRight&&sibling.rbRight.rbRed)){if(!sibling.rbRight||!sibling.rbRight.rbRed){sibling.rbLeft.rbRed=false;sibling.rbRed=true;this.rbRotateRight(sibling);sibling=parent.rbRight}sibling.rbRed=parent.rbRed;parent.rbRed=sibling.rbRight.rbRed=false;this.rbRotateLeft(parent);node=this.root;break}}else{sibling=parent.rbLeft;if(sibling.rbRed){sibling.rbRed=false;parent.rbRed=true;this.rbRotateRight(parent);sibling=parent.rbLeft}if((sibling.rbLeft&&sibling.rbLeft.rbRed)||(sibling.rbRight&&sibling.rbRight.rbRed)){if(!sibling.rbLeft||!sibling.rbLeft.rbRed){sibling.rbRight.rbRed=false;sibling.rbRed=true;this.rbRotateLeft(sibling);sibling=parent.rbLeft}sibling.rbRed=parent.rbRed;parent.rbRed=sibling.rbLeft.rbRed=false;this.rbRotateRight(parent);node=this.root;break}}sibling.rbRed=true;node=parent;parent=parent.rbParent}while(!node.rbRed);if(node){node.rbRed=false}};Voronoi.prototype.RBTree.prototype.rbRotateLeft=function(node){var p=node,q=node.rbRight,parent=p.rbParent;if(parent){if(parent.rbLeft===p){parent.rbLeft=q}else{parent.rbRight=q}}else{this.root=q}q.rbParent=parent;p.rbParent=q;p.rbRight=q.rbLeft;if(p.rbRight){p.rbRight.rbParent=p}q.rbLeft=p};Voronoi.prototype.RBTree.prototype.rbRotateRight=function(node){var p=node,q=node.rbLeft,parent=p.rbParent;if(parent){if(parent.rbLeft===p){parent.rbLeft=q}else{parent.rbRight=q}}else{this.root=q}q.rbParent=parent;p.rbParent=q;p.rbLeft=q.rbRight;if(p.rbLeft){p.rbLeft.rbParent=p}q.rbRight=p};Voronoi.prototype.RBTree.prototype.getFirst=function(node){while(node.rbLeft){node=node.rbLeft}return node};Voronoi.prototype.RBTree.prototype.getLast=function(node){while(node.rbRight){node=node.rbRight}return node};Voronoi.prototype.Diagram=function(site){this.site=site};Voronoi.prototype.Cell=function(site){this.site=site;this.halfedges=[];this.closeMe=false};Voronoi.prototype.Cell.prototype.init=function(site){this.site=site;this.halfedges=[];this.closeMe=false;return this};Voronoi.prototype.createCell=function(site){var cell=this.cellJunkyard.pop();if(cell){return cell.init(site)}return new this.Cell(site)};Voronoi.prototype.Cell.prototype.prepareHalfedges=function(){var halfedges=this.halfedges,iHalfedge=halfedges.length,edge;while(iHalfedge--){edge=halfedges[iHalfedge].edge;if(!edge.vb||!edge.va){halfedges.splice(iHalfedge,1)}}halfedges.sort(function(a,b){return b.angle-a.angle});return halfedges.length};Voronoi.prototype.Cell.prototype.getNeighborIds=function(){var neighbors=[],iHalfedge=this.halfedges.length,edge;while(iHalfedge--){edge=this.halfedges[iHalfedge].edge;if(edge.lSite!==null&&edge.lSite.voronoiId!=this.site.voronoiId){neighbors.push(edge.lSite.voronoiId)}else{if(edge.rSite!==null&&edge.rSite.voronoiId!=this.site.voronoiId){neighbors.push(edge.rSite.voronoiId)}}}return neighbors};Voronoi.prototype.Cell.prototype.getBbox=function(){var halfedges=this.halfedges,iHalfedge=halfedges.length,xmin=Infinity,ymin=Infinity,xmax=-Infinity,ymax=-Infinity,v,vx,vy;while(iHalfedge--){v=halfedges[iHalfedge].getStartpoint();vx=v.x;vy=v.y;if(vx<xmin){xmin=vx}if(vy<ymin){ymin=vy}if(vx>xmax){xmax=vx}if(vy>ymax){ymax=vy}}return{x:xmin,y:ymin,width:xmax-xmin,height:ymax-ymin}};Voronoi.prototype.Cell.prototype.pointIntersection=function(x,y){var halfedges=this.halfedges,iHalfedge=halfedges.length,halfedge,p0,p1,r;while(iHalfedge--){halfedge=halfedges[iHalfedge];p0=halfedge.getStartpoint();p1=halfedge.getEndpoint();r=(y-p0.y)*(p1.x-p0.x)-(x-p0.x)*(p1.y-p0.y);if(!r){return 0}if(r>0){return -1}}return 1};Voronoi.prototype.Vertex=function(x,y){this.x=x;this.y=y};Voronoi.prototype.Edge=function(lSite,rSite){this.lSite=lSite;this.rSite=rSite;this.va=this.vb=null};Voronoi.prototype.Halfedge=function(edge,lSite,rSite){this.site=lSite;this.edge=edge;if(rSite){this.angle=Math.atan2(rSite.y-lSite.y,rSite.x-lSite.x)
}else{var va=edge.va,vb=edge.vb;this.angle=edge.lSite===lSite?Math.atan2(vb.x-va.x,va.y-vb.y):Math.atan2(va.x-vb.x,vb.y-va.y)}};Voronoi.prototype.createHalfedge=function(edge,lSite,rSite){return new this.Halfedge(edge,lSite,rSite)};Voronoi.prototype.Halfedge.prototype.getStartpoint=function(){return this.edge.lSite===this.site?this.edge.va:this.edge.vb};Voronoi.prototype.Halfedge.prototype.getEndpoint=function(){return this.edge.lSite===this.site?this.edge.vb:this.edge.va};Voronoi.prototype.createVertex=function(x,y){var v=this.vertexJunkyard.pop();if(!v){v=new this.Vertex(x,y)}else{v.x=x;v.y=y}this.vertices.push(v);return v};Voronoi.prototype.createEdge=function(lSite,rSite,va,vb){var edge=this.edgeJunkyard.pop();if(!edge){edge=new this.Edge(lSite,rSite)}else{edge.lSite=lSite;edge.rSite=rSite;edge.va=edge.vb=null}this.edges.push(edge);if(va){this.setEdgeStartpoint(edge,lSite,rSite,va)}if(vb){this.setEdgeEndpoint(edge,lSite,rSite,vb)}this.cells[lSite.voronoiId].halfedges.push(this.createHalfedge(edge,lSite,rSite));this.cells[rSite.voronoiId].halfedges.push(this.createHalfedge(edge,rSite,lSite));return edge};Voronoi.prototype.createBorderEdge=function(lSite,va,vb){var edge=this.edgeJunkyard.pop();if(!edge){edge=new this.Edge(lSite,null)}else{edge.lSite=lSite;edge.rSite=null}edge.va=va;edge.vb=vb;this.edges.push(edge);return edge};Voronoi.prototype.setEdgeStartpoint=function(edge,lSite,rSite,vertex){if(!edge.va&&!edge.vb){edge.va=vertex;edge.lSite=lSite;edge.rSite=rSite}else{if(edge.lSite===rSite){edge.vb=vertex}else{edge.va=vertex}}};Voronoi.prototype.setEdgeEndpoint=function(edge,lSite,rSite,vertex){this.setEdgeStartpoint(edge,rSite,lSite,vertex)};Voronoi.prototype.Beachsection=function(){};Voronoi.prototype.createBeachsection=function(site){var beachsection=this.beachsectionJunkyard.pop();if(!beachsection){beachsection=new this.Beachsection()}beachsection.site=site;return beachsection};Voronoi.prototype.leftBreakPoint=function(arc,directrix){var site=arc.site,rfocx=site.x,rfocy=site.y,pby2=rfocy-directrix;if(!pby2){return rfocx}var lArc=arc.rbPrevious;if(!lArc){return -Infinity}site=lArc.site;var lfocx=site.x,lfocy=site.y,plby2=lfocy-directrix;if(!plby2){return lfocx}var hl=lfocx-rfocx,aby2=1/pby2-1/plby2,b=hl/plby2;if(aby2){return(-b+this.sqrt(b*b-2*aby2*(hl*hl/(-2*plby2)-lfocy+plby2/2+rfocy-pby2/2)))/aby2+rfocx}return(rfocx+lfocx)/2};Voronoi.prototype.rightBreakPoint=function(arc,directrix){var rArc=arc.rbNext;if(rArc){return this.leftBreakPoint(rArc,directrix)}var site=arc.site;return site.y===directrix?site.x:Infinity};Voronoi.prototype.detachBeachsection=function(beachsection){this.detachCircleEvent(beachsection);this.beachline.rbRemoveNode(beachsection);this.beachsectionJunkyard.push(beachsection)};Voronoi.prototype.removeBeachsection=function(beachsection){var circle=beachsection.circleEvent,x=circle.x,y=circle.ycenter,vertex=this.createVertex(x,y),previous=beachsection.rbPrevious,next=beachsection.rbNext,disappearingTransitions=[beachsection],abs_fn=Math.abs;this.detachBeachsection(beachsection);var lArc=previous;while(lArc.circleEvent&&abs_fn(x-lArc.circleEvent.x)<1e-9&&abs_fn(y-lArc.circleEvent.ycenter)<1e-9){previous=lArc.rbPrevious;disappearingTransitions.unshift(lArc);this.detachBeachsection(lArc);lArc=previous}disappearingTransitions.unshift(lArc);this.detachCircleEvent(lArc);var rArc=next;while(rArc.circleEvent&&abs_fn(x-rArc.circleEvent.x)<1e-9&&abs_fn(y-rArc.circleEvent.ycenter)<1e-9){next=rArc.rbNext;disappearingTransitions.push(rArc);this.detachBeachsection(rArc);rArc=next}disappearingTransitions.push(rArc);this.detachCircleEvent(rArc);var nArcs=disappearingTransitions.length,iArc;for(iArc=1;iArc<nArcs;iArc++){rArc=disappearingTransitions[iArc];lArc=disappearingTransitions[iArc-1];this.setEdgeStartpoint(rArc.edge,lArc.site,rArc.site,vertex)}lArc=disappearingTransitions[0];rArc=disappearingTransitions[nArcs-1];rArc.edge=this.createEdge(lArc.site,rArc.site,undefined,vertex);this.attachCircleEvent(lArc);this.attachCircleEvent(rArc)};Voronoi.prototype.addBeachsection=function(site){var x=site.x,directrix=site.y;var lArc,rArc,dxl,dxr,node=this.beachline.root;while(node){dxl=this.leftBreakPoint(node,directrix)-x;if(dxl>1e-9){node=node.rbLeft}else{dxr=x-this.rightBreakPoint(node,directrix);if(dxr>1e-9){if(!node.rbRight){lArc=node;break}node=node.rbRight}else{if(dxl>-1e-9){lArc=node.rbPrevious;rArc=node}else{if(dxr>-1e-9){lArc=node;rArc=node.rbNext}else{lArc=rArc=node}}break}}}var newArc=this.createBeachsection(site);this.beachline.rbInsertSuccessor(lArc,newArc);if(!lArc&&!rArc){return}if(lArc===rArc){this.detachCircleEvent(lArc);rArc=this.createBeachsection(lArc.site);this.beachline.rbInsertSuccessor(newArc,rArc);newArc.edge=rArc.edge=this.createEdge(lArc.site,newArc.site);this.attachCircleEvent(lArc);this.attachCircleEvent(rArc);return}if(lArc&&!rArc){newArc.edge=this.createEdge(lArc.site,newArc.site);return}if(lArc!==rArc){this.detachCircleEvent(lArc);this.detachCircleEvent(rArc);var lSite=lArc.site,ax=lSite.x,ay=lSite.y,bx=site.x-ax,by=site.y-ay,rSite=rArc.site,cx=rSite.x-ax,cy=rSite.y-ay,d=2*(bx*cy-by*cx),hb=bx*bx+by*by,hc=cx*cx+cy*cy,vertex=this.createVertex((cy*hb-by*hc)/d+ax,(bx*hc-cx*hb)/d+ay);
this.setEdgeStartpoint(rArc.edge,lSite,rSite,vertex);newArc.edge=this.createEdge(lSite,site,undefined,vertex);rArc.edge=this.createEdge(site,rSite,undefined,vertex);this.attachCircleEvent(lArc);this.attachCircleEvent(rArc);return}};Voronoi.prototype.CircleEvent=function(){this.arc=null;this.rbLeft=null;this.rbNext=null;this.rbParent=null;this.rbPrevious=null;this.rbRed=false;this.rbRight=null;this.site=null;this.x=this.y=this.ycenter=0};Voronoi.prototype.attachCircleEvent=function(arc){var lArc=arc.rbPrevious,rArc=arc.rbNext;if(!lArc||!rArc){return}var lSite=lArc.site,cSite=arc.site,rSite=rArc.site;if(lSite===rSite){return}var bx=cSite.x,by=cSite.y,ax=lSite.x-bx,ay=lSite.y-by,cx=rSite.x-bx,cy=rSite.y-by;var d=2*(ax*cy-ay*cx);if(d>=-2e-12){return}var ha=ax*ax+ay*ay,hc=cx*cx+cy*cy,x=(cy*ha-ay*hc)/d,y=(ax*hc-cx*ha)/d,ycenter=y+by;var circleEvent=this.circleEventJunkyard.pop();if(!circleEvent){circleEvent=new this.CircleEvent()}circleEvent.arc=arc;circleEvent.site=cSite;circleEvent.x=x+bx;circleEvent.y=ycenter+this.sqrt(x*x+y*y);circleEvent.ycenter=ycenter;arc.circleEvent=circleEvent;var predecessor=null,node=this.circleEvents.root;while(node){if(circleEvent.y<node.y||(circleEvent.y===node.y&&circleEvent.x<=node.x)){if(node.rbLeft){node=node.rbLeft}else{predecessor=node.rbPrevious;break}}else{if(node.rbRight){node=node.rbRight}else{predecessor=node;break}}}this.circleEvents.rbInsertSuccessor(predecessor,circleEvent);if(!predecessor){this.firstCircleEvent=circleEvent}};Voronoi.prototype.detachCircleEvent=function(arc){var circleEvent=arc.circleEvent;if(circleEvent){if(!circleEvent.rbPrevious){this.firstCircleEvent=circleEvent.rbNext}this.circleEvents.rbRemoveNode(circleEvent);this.circleEventJunkyard.push(circleEvent);arc.circleEvent=null}};Voronoi.prototype.connectEdge=function(edge,bbox){var vb=edge.vb;if(!!vb){return true}var va=edge.va,xl=bbox.xl,xr=bbox.xr,yt=bbox.yt,yb=bbox.yb,lSite=edge.lSite,rSite=edge.rSite,lx=lSite.x,ly=lSite.y,rx=rSite.x,ry=rSite.y,fx=(lx+rx)/2,fy=(ly+ry)/2,fm,fb;this.cells[lSite.voronoiId].closeMe=true;this.cells[rSite.voronoiId].closeMe=true;if(ry!==ly){fm=(lx-rx)/(ry-ly);fb=fy-fm*fx}if(fm===undefined){if(fx<xl||fx>=xr){return false}if(lx>rx){if(!va||va.y<yt){va=this.createVertex(fx,yt)}else{if(va.y>=yb){return false}}vb=this.createVertex(fx,yb)}else{if(!va||va.y>yb){va=this.createVertex(fx,yb)}else{if(va.y<yt){return false}}vb=this.createVertex(fx,yt)}}else{if(fm<-1||fm>1){if(lx>rx){if(!va||va.y<yt){va=this.createVertex((yt-fb)/fm,yt)}else{if(va.y>=yb){return false}}vb=this.createVertex((yb-fb)/fm,yb)}else{if(!va||va.y>yb){va=this.createVertex((yb-fb)/fm,yb)}else{if(va.y<yt){return false}}vb=this.createVertex((yt-fb)/fm,yt)}}else{if(ly<ry){if(!va||va.x<xl){va=this.createVertex(xl,fm*xl+fb)}else{if(va.x>=xr){return false}}vb=this.createVertex(xr,fm*xr+fb)}else{if(!va||va.x>xr){va=this.createVertex(xr,fm*xr+fb)}else{if(va.x<xl){return false}}vb=this.createVertex(xl,fm*xl+fb)}}}edge.va=va;edge.vb=vb;return true};Voronoi.prototype.clipEdge=function(edge,bbox){var ax=edge.va.x,ay=edge.va.y,bx=edge.vb.x,by=edge.vb.y,t0=0,t1=1,dx=bx-ax,dy=by-ay;var q=ax-bbox.xl;if(dx===0&&q<0){return false}var r=-q/dx;if(dx<0){if(r<t0){return false}if(r<t1){t1=r}}else{if(dx>0){if(r>t1){return false}if(r>t0){t0=r}}}q=bbox.xr-ax;if(dx===0&&q<0){return false}r=q/dx;if(dx<0){if(r>t1){return false}if(r>t0){t0=r}}else{if(dx>0){if(r<t0){return false}if(r<t1){t1=r}}}q=ay-bbox.yt;if(dy===0&&q<0){return false}r=-q/dy;if(dy<0){if(r<t0){return false}if(r<t1){t1=r}}else{if(dy>0){if(r>t1){return false}if(r>t0){t0=r}}}q=bbox.yb-ay;if(dy===0&&q<0){return false}r=q/dy;if(dy<0){if(r>t1){return false}if(r>t0){t0=r}}else{if(dy>0){if(r<t0){return false}if(r<t1){t1=r}}}if(t0>0){edge.va=this.createVertex(ax+t0*dx,ay+t0*dy)}if(t1<1){edge.vb=this.createVertex(ax+t1*dx,ay+t1*dy)}if(t0>0||t1<1){this.cells[edge.lSite.voronoiId].closeMe=true;this.cells[edge.rSite.voronoiId].closeMe=true}return true};Voronoi.prototype.clipEdges=function(bbox){var edges=this.edges,iEdge=edges.length,edge,abs_fn=Math.abs;while(iEdge--){edge=edges[iEdge];if(!this.connectEdge(edge,bbox)||!this.clipEdge(edge,bbox)||(abs_fn(edge.va.x-edge.vb.x)<1e-9&&abs_fn(edge.va.y-edge.vb.y)<1e-9)){edge.va=edge.vb=null;edges.splice(iEdge,1)}}};Voronoi.prototype.closeCells=function(bbox){var xl=bbox.xl,xr=bbox.xr,yt=bbox.yt,yb=bbox.yb,cells=this.cells,iCell=cells.length,cell,iLeft,halfedges,nHalfedges,edge,va,vb,vz,lastBorderSegment,abs_fn=Math.abs;while(iCell--){cell=cells[iCell];if(!cell.prepareHalfedges()){continue}if(!cell.closeMe){continue}halfedges=cell.halfedges;nHalfedges=halfedges.length;iLeft=0;while(iLeft<nHalfedges){va=halfedges[iLeft].getEndpoint();vz=halfedges[(iLeft+1)%nHalfedges].getStartpoint();if(abs_fn(va.x-vz.x)>=1e-9||abs_fn(va.y-vz.y)>=1e-9){switch(true){case this.equalWithEpsilon(va.x,xl)&&this.lessThanWithEpsilon(va.y,yb):lastBorderSegment=this.equalWithEpsilon(vz.x,xl);vb=this.createVertex(xl,lastBorderSegment?vz.y:yb);edge=this.createBorderEdge(cell.site,va,vb);
iLeft++;halfedges.splice(iLeft,0,this.createHalfedge(edge,cell.site,null));nHalfedges++;if(lastBorderSegment){break}va=vb;case this.equalWithEpsilon(va.y,yb)&&this.lessThanWithEpsilon(va.x,xr):lastBorderSegment=this.equalWithEpsilon(vz.y,yb);vb=this.createVertex(lastBorderSegment?vz.x:xr,yb);edge=this.createBorderEdge(cell.site,va,vb);iLeft++;halfedges.splice(iLeft,0,this.createHalfedge(edge,cell.site,null));nHalfedges++;if(lastBorderSegment){break}va=vb;case this.equalWithEpsilon(va.x,xr)&&this.greaterThanWithEpsilon(va.y,yt):lastBorderSegment=this.equalWithEpsilon(vz.x,xr);vb=this.createVertex(xr,lastBorderSegment?vz.y:yt);edge=this.createBorderEdge(cell.site,va,vb);iLeft++;halfedges.splice(iLeft,0,this.createHalfedge(edge,cell.site,null));nHalfedges++;if(lastBorderSegment){break}va=vb;case this.equalWithEpsilon(va.y,yt)&&this.greaterThanWithEpsilon(va.x,xl):lastBorderSegment=this.equalWithEpsilon(vz.y,yt);vb=this.createVertex(lastBorderSegment?vz.x:xl,yt);edge=this.createBorderEdge(cell.site,va,vb);iLeft++;halfedges.splice(iLeft,0,this.createHalfedge(edge,cell.site,null));nHalfedges++;if(lastBorderSegment){break}va=vb;lastBorderSegment=this.equalWithEpsilon(vz.x,xl);vb=this.createVertex(xl,lastBorderSegment?vz.y:yb);edge=this.createBorderEdge(cell.site,va,vb);iLeft++;halfedges.splice(iLeft,0,this.createHalfedge(edge,cell.site,null));nHalfedges++;if(lastBorderSegment){break}va=vb;lastBorderSegment=this.equalWithEpsilon(vz.y,yb);vb=this.createVertex(lastBorderSegment?vz.x:xr,yb);edge=this.createBorderEdge(cell.site,va,vb);iLeft++;halfedges.splice(iLeft,0,this.createHalfedge(edge,cell.site,null));nHalfedges++;if(lastBorderSegment){break}va=vb;lastBorderSegment=this.equalWithEpsilon(vz.x,xr);vb=this.createVertex(xr,lastBorderSegment?vz.y:yt);edge=this.createBorderEdge(cell.site,va,vb);iLeft++;halfedges.splice(iLeft,0,this.createHalfedge(edge,cell.site,null));nHalfedges++;if(lastBorderSegment){break}default:throw"Voronoi.closeCells() > this makes no sense!"}}iLeft++}cell.closeMe=false}};Voronoi.prototype.quantizeSites=function(sites){var ε=this.ε,n=sites.length,site;while(n--){site=sites[n];site.x=Math.floor(site.x/ε)*ε;site.y=Math.floor(site.y/ε)*ε}};Voronoi.prototype.recycle=function(diagram){if(diagram){if(diagram instanceof this.Diagram){this.toRecycle=diagram}else{throw"Voronoi.recycleDiagram() > Need a Diagram object."}}};Voronoi.prototype.compute=function(sites,bbox){var startTime=new Date();this.reset();if(this.toRecycle){this.vertexJunkyard=this.vertexJunkyard.concat(this.toRecycle.vertices);this.edgeJunkyard=this.edgeJunkyard.concat(this.toRecycle.edges);this.cellJunkyard=this.cellJunkyard.concat(this.toRecycle.cells);this.toRecycle=null}var siteEvents=sites.slice(0);siteEvents.sort(function(a,b){var r=b.y-a.y;if(r){return r}return b.x-a.x});var site=siteEvents.pop(),siteid=0,xsitex,xsitey,cells=this.cells,circle;for(;;){circle=this.firstCircleEvent;if(site&&(!circle||site.y<circle.y||(site.y===circle.y&&site.x<circle.x))){if(site.x!==xsitex||site.y!==xsitey){cells[siteid]=this.createCell(site);site.voronoiId=siteid++;this.addBeachsection(site);xsitey=site.y;xsitex=site.x}site=siteEvents.pop()}else{if(circle){this.removeBeachsection(circle.arc)}else{break}}}this.clipEdges(bbox);this.closeCells(bbox);var stopTime=new Date();var diagram=new this.Diagram();diagram.cells=this.cells;diagram.edges=this.edges;diagram.vertices=this.vertices;diagram.execTime=stopTime.getTime()-startTime.getTime();this.reset();return diagram};module.exports=Voronoi},{}]},{},[2]);