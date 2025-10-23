export function metaFromCode(code){
  const a=code[0], ape=code[1];
  if(a==='S' && ['P','I'].includes(ape)) return "🔥 創造者群（Creators）";
  if(a==='S' && ['S','E'].includes(ape)) return "☀️ 導師群（Luminaries）";
  if(a==='E' && ['I','E'].includes(ape)) return "⚙️ 構築者群（Architects）";
  if(a==='E' && ['P','S'].includes(ape)) return "🌿 守護者群（Guardians）";
  if(a==='M' && ['P','S'].includes(ape)) return "🌌 共鳴者群（Empaths）";
  if(a==='M' && ['I','E'].includes(ape)) return "🌙 調律者群（Harmonics）";
  return "—";
}
export function score6(code){
  const base = {comm:3, think:3, exec:3, empathy:3, create:3, stable:3};
  const add = (k,v)=> base[k]=Math.max(0,Math.min(5,base[k]+v));
  const a=code[0], ape=code[1], mb=code.slice(2);
  if(a==='S'){ add('exec',+1); add('create',+1); }
  if(a==='E'){ add('stable',+1); add('think',+1); }
  if(a==='M'){ add('empathy',+1); add('create',+1); }
  if(ape==='P'){ add('comm',+1); add('exec',+1); }
  if(ape==='S'){ add('stable',+1); }
  if(ape==='I'){ add('think',+1); }
  if(ape==='E'){ add('empathy',+1); }
  if(mb==='NT'){ add('think',+1); }
  if(mb==='NF'){ add('empathy',+1); }
  if(mb==='SJ'){ add('stable',+1); }
  if(mb==='SP'){ add('exec',+1); }
  return base;
}
export function lifeBalance(a,ape,mb){
  let fire=0, earth=0, water=0;
  if(a==="S")fire+=3; if(a==="E")earth+=3; if(a==="M")water+=3;
  if(ape==="P")fire+=2; if(ape==="S")earth+=2; if(ape==="I")earth+=1; if(ape==="E")water+=2;
  if(mb==="SP")fire+=2; if(mb==="SJ")earth+=2; if(mb==="NT")earth+=1; if(mb==="NF")water+=2;
  const sum=fire+earth+water || 1;
  return {fire:Math.round(fire/sum*100), earth:Math.round(earth/sum*100), water:Math.round(water/sum*100)};
}
