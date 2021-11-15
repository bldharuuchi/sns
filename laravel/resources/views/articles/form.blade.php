@csrf
<div class="md-form">
  <label>タイトル</label>
  <input type="text" name="title" class="form-control" required value="{{ $article->title ?? old('title') }}">
</div>
<div class="form-group">
  <article-tags-input
    :initial-tags='@json($tagNames ?? [])'
    :autocomplete-items='@json($allTagNames ?? [])'
  >
  </article-tags-input>
</div>
<div class="form-group">
  <label></label>
  <div id="codex-editor">
  <textarea name="body" required class="form-control" rows="16" placeholder="本文">{{ $article->body ?? old('body') }}
    
  </textarea>
  <div class="about">
    <input type="text" v-model="title" />
    <div>
      <div class="edit" id="editorjs"></div>
    </div>
    <div>
      <button @click="save">SAVE</button>
    </div>
  </div>
  </div>
</div>