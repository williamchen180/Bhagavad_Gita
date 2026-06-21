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
