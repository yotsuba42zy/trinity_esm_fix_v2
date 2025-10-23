import { META_ORDER, META_BUCKETS, GOOD_META, BAD_META } from "../data/constants.js";
function pickFrom(meta, mbti, avoid=[]){
  const list = META_BUCKETS[meta] || [];
  for(const c of list){ if(!avoid.includes(c) && (!mbti || c.slice(2)===mbti)) return c; }
  for(const c of list){ if(!avoid.includes(c)) return c; }
  return null;
}
export function computeCompat(code, meta, mbti){
  const goods = [];
  for(const gm of (GOOD_META[meta]||[])){
    let pick = pickFrom(gm, mbti, [code, ...goods]);
    if(!pick) pick = pickFrom(gm, null, [code, ...goods]);
    if(pick) goods.push(pick);
  }
  const bads = [];
  for(const bm of (BAD_META[meta]||[])){
    const pick = pickFrom(bm, mbti, [code, ...goods, ...bads]) || pickFrom(bm, null, [code, ...goods, ...bads]);
    if(pick) bads.push(pick);
  }
  const i = META_ORDER.indexOf(meta);
  const mentorMeta = META_ORDER[(i+1)%6];
  const followerMeta = META_ORDER[(i+5)%6];
  const mentor = pickFrom(mentorMeta, "NT", [code, ...goods, ...bads]) || pickFrom(mentorMeta, "SJ", [code, ...goods, ...bads]) || pickFrom(mentorMeta, null, [code, ...goods, ...bads]);
  const follower = pickFrom(followerMeta, "NF", [code, ...goods, ...bads, mentor]) || pickFrom(followerMeta, "SP", [code, ...goods, ...bads, mentor]) || pickFrom(followerMeta, null, [code, ...goods, ...bads, mentor]);
  return {goods, bads, mentor, follower};
}
