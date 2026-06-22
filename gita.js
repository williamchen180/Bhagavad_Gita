(function(){
  // 為每個逐詞對照清單加上可點擊的展開／收合控制
  var lists = document.querySelectorAll('ul.words');
  lists.forEach(function(ul){
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'words-toggle';
    btn.setAttribute('aria-expanded', 'true');
    btn.innerHTML = '<span class="caret">▾</span><span class="label">逐詞對照</span>';
    ul.parentNode.insertBefore(btn, ul);
    btn.addEventListener('click', function(){
      var collapsed = ul.classList.toggle('collapsed');
      btn.setAttribute('aria-expanded', String(!collapsed));
    });
  });

  // 左側「本章索引」：依頁面上的詩節自動生成（螢幕夠寬時由 CSS 顯示）
  var verses = document.querySelectorAll('article.verse');
  if(verses.length){
    var nav = document.createElement('nav');
    nav.className = 'verse-index';
    nav.setAttribute('aria-label', '本章索引');
    var title = document.createElement('div');
    title.className = 'vi-title';
    title.textContent = '本章索引';
    nav.appendChild(title);
    var ul = document.createElement('ul');
    var linkById = {};
    verses.forEach(function(v){
      var num = v.querySelector('.vnum');
      if(!v.id || !num) return;
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = '#' + v.id;
      a.textContent = num.textContent.trim();
      li.appendChild(a);
      ul.appendChild(li);
      linkById[v.id] = a;
    });
    nav.appendChild(ul);
    document.body.appendChild(nav);

    // 高亮目前畫面上的詩節，並讓索引自動捲動跟上
    if('IntersectionObserver' in window){
      var current = null;
      var io = new IntersectionObserver(function(entries){
        entries.forEach(function(e){
          if(!e.isIntersecting) return;
          var a = linkById[e.target.id];
          if(!a || a === current) return;
          if(current) current.classList.remove('active');
          a.classList.add('active');
          current = a;
          a.scrollIntoView({block:'nearest'});
        });
      }, {rootMargin:'-30% 0px -60% 0px'});
      verses.forEach(function(v){ if(v.id) io.observe(v); });
    }
  }

  // 置頂按鈕：一鍵全部展開／收合
  var allBtn = document.getElementById('toggleAll');
  if(!allBtn) return;
  function refreshLabel(){
    var anyOpen = Array.prototype.some.call(lists, function(u){ return !u.classList.contains('collapsed'); });
    allBtn.textContent = anyOpen ? '全部收合逐詞對照' : '全部展開逐詞對照';
    allBtn.setAttribute('aria-pressed', String(!anyOpen));
  }
  allBtn.addEventListener('click', function(){
    var anyOpen = Array.prototype.some.call(lists, function(u){ return !u.classList.contains('collapsed'); });
    lists.forEach(function(u){ u.classList.toggle('collapsed', anyOpen); });
    document.querySelectorAll('.words-toggle').forEach(function(b){ b.setAttribute('aria-expanded', String(!anyOpen)); });
    refreshLabel();
  });
  refreshLabel();
})();
