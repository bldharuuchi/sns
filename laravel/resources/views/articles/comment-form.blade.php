<form class="mt-3" method="GET" action="{{ route('articles.review',['name' => $article->user->name]) }}">
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">コメント</label>
    <input type="password" class="form-control" id="exampleInputPassword1">
  </div>
  <button type="submit" class="btn btn-primary">送信</button>
</form>