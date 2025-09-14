import { useState, useEffect } from "react";

function applyGlass({blur,sat,alpha,tint}:{blur:number; sat:number; alpha:number; tint:string;}){
  const r=document.documentElement;
  r.style.setProperty("--glass-blur", `${blur}px`);
  r.style.setProperty("--glass-sat", String(sat));
  r.style.setProperty("--glass-alpha", String(alpha));
  r.style.setProperty("--glass-tint", tint);
}

export function GlassSettings(){
  const [open,setOpen]=useState(false);
  const [blur,setBlur]=useState(20);
  const [sat,setSat]=useState(1.8);
  const [alpha,setAlpha]=useState(0.10);
  const [tint,setTint]=useState("255,255,255");

  useEffect(()=>{
    const stored=localStorage.getItem("glass-settings");
    if(stored){
      try{
        const v=JSON.parse(stored);
        setBlur(v.blur??blur);
        setSat(v.sat??sat);
        setAlpha(v.alpha??alpha);
        setTint(v.tint??tint);
        applyGlass(v);
      }catch(e){/* ignore */}
    }else{
      applyGlass({blur,sat,alpha,tint});
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const update=(v:Partial<{blur:number; sat:number; alpha:number; tint:string;}>)=>{
    const next={blur,sat,alpha,tint,...v};
    setBlur(next.blur);
    setSat(next.sat);
    setAlpha(next.alpha);
    setTint(next.tint);
    localStorage.setItem("glass-settings", JSON.stringify(next));
    applyGlass(next);
  };

  return (
    <div className="relative glass-nodrag">
      <button onClick={()=>setOpen(!open)} className="glass-nodrag px-2">⚙</button>
      {open && (
        <div className="glass absolute right-0 mt-2 p-2 flex flex-col gap-2 text-xs">
          <label className="flex items-center gap-1">Blur
            <input type="range" min={0} max={50} value={blur} onChange={e=>update({blur:Number(e.target.value)})} className="flex-1" />
          </label>
          <label className="flex items-center gap-1">Sat
            <input type="range" min={1} max={3} step={0.1} value={sat} onChange={e=>update({sat:Number(e.target.value)})} className="flex-1" />
          </label>
          <label className="flex items-center gap-1">Alpha
            <input type="range" min={0} max={1} step={0.01} value={alpha} onChange={e=>update({alpha:Number(e.target.value)})} className="flex-1" />
          </label>
          <label className="flex items-center gap-1">Tint
            <input type="text" value={tint} onChange={e=>update({tint:e.target.value})} className="flex-1 text-black" />
          </label>
        </div>
      )}
    </div>
  );
}

export default GlassSettings;
