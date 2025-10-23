export function drawRadar(container, scores){
  container.innerHTML = "";
  const labels = ["🗣コミュ","🧠思考","⚙実行","💫共感","🔮創造","🧱安定"];
  const vals = [scores.comm, scores.think, scores.exec, scores.empathy, scores.create, scores.stable];
  const maxR = 120, levels = 8, factor = 1.6; const cx = 180, cy = 180;
  const toRad = deg => deg*Math.PI/180; const NS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(NS,"svg"); svg.setAttribute("viewBox","0 0 360 360");
  for(let l=1;l<=levels;l++){ const r = maxR*(l/levels); const poly=document.createElementNS(NS,"polygon"); const pts=[];
    for(let i=0;i<6;i++){ const ang=toRad(-90+i*60); pts.push((cx+r*Math.cos(ang))+","+(cy+r*Math.sin(ang))); }
    poly.setAttribute("points",pts.join(" ")); poly.setAttribute("class","gridLine"); svg.appendChild(poly);
  }
  for(let i=0;i<6;i++){ const ang=toRad(-90+i*60); const x2=cx+maxR*Math.cos(ang), y2=cy+maxR*Math.sin(ang);
    const line=document.createElementNS(NS,"line"); line.setAttribute("x1",cx); line.setAttribute("y1",cy);
    line.setAttribute("x2",x2); line.setAttribute("y2",y2); line.setAttribute("class","gridLine"); line.setAttribute("opacity","0.5"); svg.appendChild(line);
    const lx=cx+(maxR+16)*Math.cos(ang), ly=cy+(maxR+16)*Math.sin(ang); const text=document.createElementNS(NS,"text");
    text.setAttribute("x",lx); text.setAttribute("y",ly); text.setAttribute("class","axisLbl"); text.setAttribute("text-anchor","middle"); text.setAttribute("dominant-baseline","middle");
    text.textContent=labels[i]; svg.appendChild(text);
  }
  const pts=[]; const dotPos=[];
  for(let i=0;i<6;i++){ const ang=toRad(-90+i*60); const r=(vals[i]*factor/levels)*maxR; const x=cx+r*Math.cos(ang); const y=cy+r*Math.sin(ang);
    pts.push(x+","+y); dotPos.push({x,y,ang,i});
  }
  const poly=document.createElementNS(NS,"polygon"); poly.setAttribute("points",pts.join(" ")); poly.setAttribute("class","dataPoly"); svg.appendChild(poly);
  const dots=document.createElementNS(NS,"g"); dots.setAttribute("class","dataDots");
  for(const p of dotPos){ const c=document.createElementNS(NS,"circle"); c.setAttribute("cx",p.x); c.setAttribute("cy",p.y); c.setAttribute("r",3.5); dots.appendChild(c); }
  svg.appendChild(dots);
  const texts=document.createElementNS(NS,"g"); texts.setAttribute("class","dataVals");
  for(let k=0;k<dotPos.length;k++){ const p=dotPos[k]; const t=document.createElementNS(NS,"text");
    const ox=p.x+10*Math.cos(p.ang), oy=p.y+10*Math.sin(p.ang); t.setAttribute("x",ox); t.setAttribute("y",oy);
    t.setAttribute("text-anchor","middle"); t.setAttribute("dominant-baseline","middle"); t.textContent=vals[k]; texts.appendChild(t);
  }
  svg.appendChild(texts); container.appendChild(svg);
}
