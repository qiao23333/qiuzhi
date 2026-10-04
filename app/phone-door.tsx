import { useLayoutEffect, useRef } from 'react';
import { sitePath } from './site-path';

type Point = [number, number];
// Project the photographed door onto the booth's own oblique camera plane.
// The jamb stays fixed; the free edge travels outwards through a physical quarter turn.
function projection(source: Point[], target: Point[]) {
  const rows: number[][] = [];
  source.forEach(([x, y], i) => {
    const [u, v] = target[i];
    rows.push([x,y,1,0,0,0,-u*x,-u*y,u], [0,0,0,x,y,1,-v*x,-v*y,v]);
  });
  for (let col=0; col<8; col++) {
    let pivot=col;
    for (let row=col+1; row<8; row++) if (Math.abs(rows[row][col])>Math.abs(rows[pivot][col])) pivot=row;
    [rows[col],rows[pivot]]=[rows[pivot],rows[col]];
    const divisor=rows[col][col];
    if (Math.abs(divisor)<1e-10) return null;
    for (let n=col;n<9;n++) rows[col][n]/=divisor;
    for (let row=0;row<8;row++) if(row!==col) {
      const factor=rows[row][col];
      for(let n=col;n<9;n++) rows[row][n]-=factor*rows[col][n];
    }
  }
  return rows.map(row=>row[8]);
}

export default function PhoneDoor({open}:{open:boolean}) {
  const image=useRef<HTMLImageElement>(null);
  const progress=useRef(0);
  useLayoutEffect(()=>{
    const element=image.current, parent=element?.parentElement;
    if(!element || !parent) return;
    let frame=0, started=0;
    const from=progress.current, to=open?1:0;
    const draw=(value:number)=>{
      const w=parent.clientWidth,h=parent.clientHeight;
      if(!w||!h)return;
      const angle=value*Math.PI/2,c=Math.cos(angle),s=Math.sin(angle);
      const source:Point[]=[[235/1024*w,43/1536*h],[775/1024*w,17/1536*h],[802/1024*w,1510/1536*h],[220/1024*w,1480/1536*h]];
      const target:Point[]=[[(783-348*c+185*s)/1024*w,(331-23*c-80*s)/1536*h],[783/1024*w,331/1536*h],[783/1024*w,1330/1536*h],[(783-348*c+185*s)/1024*w,(1330+30*c+60*s)/1536*h]];
      const matrix=projection(source,target);
      if(matrix){const [a,b,c,d,e,f,g,i]=matrix;element.style.transform=`matrix3d(${a},${d},0,${g},${b},${e},0,${i},0,0,1,0,${c},${f},0,1)`;}
    };
    const tick=(time:number)=>{
      if(!started)started=time;
      const elapsed=Math.min((time-started)/850,1);
      const eased=elapsed*elapsed*(3-2*elapsed);
      progress.current=from+(to-from)*eased;draw(progress.current);
      if(elapsed<1)frame=requestAnimationFrame(tick);
    };
    draw(progress.current);
    const observer=new ResizeObserver(()=>draw(progress.current));observer.observe(parent);
    if(matchMedia('(prefers-reduced-motion:reduce)').matches){progress.current=to;draw(to);}else frame=requestAnimationFrame(tick);
    return()=>{cancelAnimationFrame(frame);observer.disconnect();};
  },[open]);
  return <img ref={image} className="desk-phone__projected-door" src={sitePath('/portfolio/scene/phone-door.webp')} alt="" draggable={false}/>;
}
