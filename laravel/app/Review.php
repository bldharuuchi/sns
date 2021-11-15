<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    public function article(){
        return $this->belongsTo('App\Article');
    }
}
