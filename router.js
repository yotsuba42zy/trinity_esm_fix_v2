const routes = {};
export function register(path, render){ routes[path]=render; }
export function setActive(path){
  document.querySelectorAll('#navlinks a').forEach(a=>{
    if(a.dataset.path===path) a.classList.add('active'); else a.classList.remove('active');
  });
}
export function startRouter(rootEl){
  async function render(){
    try{
      const hash = location.hash.replace(/^#/, '') || '/diagnose';
      const [path, qs] = hash.split('?');
      const query = Object.fromEntries(new URLSearchParams(qs||''));
      const page = routes[path] || routes['/diagnose'];
      setActive(path);
      rootEl.innerHTML = '';
      await page(rootEl, query);
    }catch(e){
      console.error('[router] render error:', e);
      rootEl.innerHTML = `<div class="card" style="border-color:#ef4444">
        <h3 class="title">読み込みエラー</h3>
        <p class="small">ページ描画で問題が発生しました。再読み込みしてください。</p>
      </div>`;
    }
  }
  addEventListener('hashchange', render);
  render();
}
