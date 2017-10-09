
  var setSong = function(songNumber) {
      if (currentSoundFile) {
          currentSoundFile.stop();
      }
 
        currentlyPlayingSongNumber = songNumber;
      currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
  //#1
      currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl,  {
          //#2 
          formats: ['mp3'],
          preload: true      
      });
    setVolume(currentVolume);  
  };
    var seek = function(time)  {
        if(currentSoundFile) {
            currentSoundFile.setTime(time);
        }
    }
  
    var setVolume = function(volume) {
        if (currentSoundFile) {
            currentSoundFile.setVolume(volume);
        }
    };

var getSongNumberCell = function(number) {
    return $('.song-item-number[data-song-number="' + number + '"]');
};
  var createSongRow = function(songNumber, songName, songLength) {
       var template =
          '<tr class="album-view-song-item">'
       + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
        + '  <td class="song-item-title">' + songName + '</td>'
        + '  <td class="song-item-duration">' + songLength + '</td>'
         + '</tr>'
         ;  

      var $row = $(template);
      
      var clickHandler = function() {
	   var songNumber = parseInt($(this).attr('data-song-number'));


	if (currentlyPlayingSongNumber !== null) {
		// Revert to song number for currently playing song because user started playing new song.
		var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
		currentlyPlayingCell.html(currentlyPlayingSongNumber);
	}
	if (currentlyPlayingSongNumber !== songNumber) {
		// Switch from Play -> Pause button to indicate new song is playing.
		setSong(songNumber);
        currentSoundFile.play();
        updateSeekBarWhileSongPlays();
        
        $(this).html(pauseButtonTemplate);
        $('.main-controls .play-pause'). html(playerBarPauseButton);

        updatePlayerBarSong();
        
	} else if (currentlyPlayingSongNumber === songNumber) {
		// Switch from Pause -> Play button to pause currently playing song.
		
        if (currentSoundFile.isPaused()) {
            $(this).html(pauseButtonTemplate);
            $('.main-controls .play-pause'). html(playerBarPauseButton);
            currentSoundFile.play();
        } else {
                $(this).html(playButtonTemplate);
                $('.main-controls .play-pause'). html(playerBarPlayButton);
                currentSoundFile.pause();
                currentlyPlayingSongNumber = null;
            }
        }
	}
      
      var onHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));

        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(playButtonTemplate);
        }
    var songNumber = parseInt($(this).attr('data-song-number'));
    };

    var offHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));

        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(songNumber);
       console.log("songNumber type is " + typeof songNumber + "\n and currentlyPlayingSongNumber type is " + typeof currentlyPlayingSongNumber);

        }
    };
      
          $row.find('.song-item-number').click(clickHandler) ;
      //#2
        $row.hover(onHover, offHover);
      //#3  
      return $row;
};
      
    
    
  
    var setCurrentAlbum = function(album) {    
        currentAlbum = album;
      var $albumTitle = $('.album-view-title') 
      var $albumArtist = $('.album-view-artist');
      var $albumReleaseInfo = $('.album-view-release-info');
      var $albumImage = $('.album-cover-art');
      var $albumSongList = $('.album-view-song-list');
      
      $albumTitle.text(album.title);
      $albumArtist.text(album.artist);
      $albumReleaseInfo.text(album.year + ' ' + album.label);
      $albumImage.attr('src', album.albumArtUrl);
    
          $albumSongList.empty();

         for (var i = 0; i < album.songs.length; i++) {

 var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
          $albumSongList.append($newRow);
         };
    };
var updateSeekBarWhileSongPlays = function() {
     if (currentSoundFile) {
         // #10
         currentSoundFile.bind('timeupdate', function(event) {
             // #11
             var seekBarFillRatio = this.getTime() / this.getDuration();
             var $seekBar = $('.seek-control .seek-bar');
 
             updateSeekPercentage($seekBar, seekBarFillRatio);
         });
     }
 };
 
var updateSeekPercentage = function($seekBar, seekBarFillRatio) {
    var offsetXPercent = seekBarFillRatio * 100;
    // #1
    offsetXPercent = Math.max(0, offsetXPercent);
    offsetXPercent = Math.min(100, offsetXPercent);
 
    // #2
    var percentageString = offsetXPercent + '%';
    $seekBar.find('.fill').width(percentageString);
    $seekBar.find('.thumb').css({left: percentageString});
 };

var setupSeekBars = function() {
     var $seekBars = $('.player-bar .seek-bar');
 
     $seekBars.click(function(event) {
         // #3
         var offsetX = event.pageX - $(this).offset().left;
         var barWidth = $(this).width();
         // #4
         var seekBarFillRatio = offsetX / barWidth;
 
         // #5
         updateSeekPercentage($(this), seekBarFillRatio);
     });

 $seekBars.find('.thumb').mousedown(function(event) {
         // #8
         var $seekBar = $(this).parent();
 
         // #9
         $(document).bind('mousemove.thumb', function(event){
             var offsetX = event.pageX - $seekBar.offset().left;
             var barWidth = $seekBar.width();
             var seekBarFillRatio = offsetX / barWidth;
 
             updateSeekPercentage($seekBar, seekBarFillRatio);
         });
 
         // #10
         $(document).bind('mouseup.thumb', function() {
             $(document).unbind('mousemove.thumb');
             $(document).unbind('mouseup.thumb');
         });
     });

$seekBars.click(function(event) {
        var offsetX = event.pageX - $(this).offset().left;
        var barWidth = $(this).width();
        var seekBarFillRatio = offsetX / barWidth;
        
        if ($(this).parent().attr('class') == 'seek-control') {
            seek(seekBarFillRatio * currentSoundFile.getDuration());
        } else {
            setVolume(seekBarFillRatio * 100);   
        }
        
        updateSeekPercentage($(this), seekBarFillRatio);
    });

    $seekBars.find('.thumb').mousedown(function(event) {

        var $seekBar = $(this).parent();

        $(document).bind('mousemove.thumb', function(event){
            var offsetX = event.pageX - $seekBar.offset().left;
            var barWidth = $seekBar.width();
            var seekBarFillRatio = offsetX / barWidth;
            
            if ($seekBar.parent().attr('class') == 'seek-control') {
                seek(seekBarFillRatio * currentSoundFile.getDuration());   
            } else {
                setVolume(seekBarFillRatio);
            }
            
            updateSeekPercentage($seekBar, seekBarFillRatio);
        });
    });
};
    
    

var trackIndex = function(album, song) {
    return album.songs.indexOf(song);


};
        
var setCurrentTimeInPlayerBar = function(currentTime) {
    // set the text of the element with the .curent-time class to the currentTime value
    $('.current-time').text(currentTime);
    // This is how you would do it in vanilla JS
    // document.querySelector('.current-time').textContent = currentTime;
}; 

       
        
        
var updatePlayerBarSong = function() {

    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.artist);

};
// #3
   
   var clickHandler = function(targetElement) {
       var songItem = getSongItem(targetElement); 
      if (currentlyPlayingSong === null) {
           songItem.innerHTML = pauseButtonTemplate;
          setSong(songItem.getAttribute('data-song-number'));
        updatePlayerBarSong();
      } else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
           songItem.innerHTML = playButtonTemplate;
           currentlyPlayingSong = null;
         $('.main-controls .play-pause').html(playerBarPlayButton)
          
      } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
           var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
           currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
           songItem.innerHTML = pauseButtonTemplate;
           setSong(songItem.getAttribute('data-song-number'));
       }
      
      
  };
        
   var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
   var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
  var playerBarPlayButton = '<span class="ion-play"></span>';
    var playerBarPauseButton = '<span class="ion-pause"></span>';
   var $playerBarPlayPauseButton = $('.main-controls .play-pause');



// Store state of playing songs
   var currentAlbum = null;
   var currentlyPlayingSongNumber = null;
   var currentSongFromAlbum = null;
   var currentSoundFile = null;
   var currentVolume = 80;
 
 var $previousButton = $('.main-controls .previous');
 var $nextButton = $('.main-controls .next');

    $(document).ready(function() { 
        setCurrentAlbum(albumPicasso);
        setupSeekBars();
        
        $previousButton.click(previousSong);
        $nextButton.click(nextSong);
        $playerBarPlayPauseButton.click(togglePlayFromPlayerBar);
    }) ;

    var togglePlayFromPlayerBar = function () {
        if (!currentSoundFile) {
            return;
        }
        
        if (currentSoundFile.isPaused()) {
            var $songNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
            $songNumberCell.html(pauseButtonTemplate);
            $playerBarPlayPauseButton.html(playerBarPauseButton);
            currentSoundFile.play();
        }
        
        else {
            var $songNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
            $songNumberCell.html(currentlyPlayingSongNumber);
            $playerBarPlayPauseButton.html(playerBarPlayButton);
            currentSoundFile.pause();
        }
    };
        
    var updateSeekBarWhileSongPlays = function() {
     if (currentSoundFile) {
         // #10
         currentSoundFile.bind('timeupdate', function(event) {
             // #11
             var seekBarFillRatio = this.getTime() / this.getDuration();
             var $seekBar = $('.seek-control .seek-bar');
 
             updateSeekPercentage($seekBar, seekBarFillRatio);
         });
     }
 };
    
    
    
var nextSong= function() {
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    var lastSongIndex = currentSongIndex;
    
    //song incrememnt
    currentSongIndex++;
    
    if (currentSongIndex > currentAlbum.songs.length - 1) {
        currentSongIndex = 0;
    }
    
    var lastSongNumber = lastSongIndex + 1;

    setSong(currentSongIndex + 1);
    
    //update play bar
    updatePlayerBarSong();
    
  var $nextSongNumberCell = getSongNumberCell(currentSongIndex + 1);
    var $lastSongNumberCell = getSongNumberCell(lastSongNumber);

    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);  
    currentSoundFile.play();
};

var previousSong = function() {
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    var lastSongIndex = currentSongIndex;
    
    
    currentSongIndex--;

    if (currentSongIndex < 0) {
        currentSongIndex = currentAlbum.songs.length - 1;
    }

    var lastSongNumber = lastSongIndex + 1;

    setSong(currentSongIndex + 1);
    currentSoundFile.play();

    updatePlayerBarSong();

    $('.main-controls .play-pause').html(playerBarPauseButton);

    var $previousSongNumberCell = getSongNumberCell(currentSongIndex + 1);
    var $lastSongNumberCell = getSongNumberCell(lastSongNumber);

    $previousSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
};