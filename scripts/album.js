
  var setSong = function(songNumber) {
      setSong(songNumber) = parseInt(songNumber);
      currentSongFromAlbum = currentAlbum.songs[songNumber -1];
  };

var getSongNumberCell = function(number) {
    return $(.song-item-number[data-song-number="' + number + '"]');
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

	if (setSong(songNumber) !== null) {
		// Revert to song number for currently playing song because user started playing new song.
		var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber) + setSong(songNumber) + '"]');
		currentlyPlayingCell.html(currentlyPlayingSongNumber);
	}
	if (currentlyPlayingSongNumber !== songNumber) {
		// Switch from Play -> Pause button to indicate new song is playing.
		$(this).html(pauseButtonTemplate);
		setSong(songNumber); = songNumber;
        currentSongFromAlbum = currrentAlbum.songs[songNumber - 1];
	} else if (setSong(songNumber) === songNumber) {
		// Switch from Pause -> Play button to pause currently playing song.
		$(this).html(playButtonTemplate);
		setSong(songNumber) = null;
        currentSongFromAlbum = null;
	}
};
      
    var onHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = parseInt($(songNumberCell.attr('data-song-number')));

        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(playButtonTemplate);
        }
    var songNumber = parseInt($(this).attr('data-song-number'));
    };

    var offHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = parseInt($(songNumberCell.attr('data-song-number'));

        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(songNumber);
       console.log("songNumber type is " + typeof songNumber + "\n and currentlyPlayingSongNumber type is " + typeof currentlyPlayingSongNumber);

        }
    };
        $row.find('song-item-number').click(clickHandler);
      //#2
        $row.hover(onHover, offHover);
      //#3  
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

var trackIndex = function(album, song) {
    return album.songs.indexOf(song);


};
var updatePlayerBarSong = function() {

    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.artist);
$('.main-controls .play-pause').html(playerBarPlayButton);

};
// #3
   
   var clickHandler = function(targetElement) {
       var songItem = getSongItem(targetElement); 
      if (currentlyPlayingSong === null) {
           songItem.innerHTML = pauseButtonTemplate;
           currentlyPlayingSong = songItem.getAttribute('data-song-number');
        updatePlayerBarSong();
      } else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
           songItem.innerHTML = playButtonTemplate;
           currentlyPlayingSong = null;
         $('.main-controls .play-pause').html(playerBarPlayButton)
          
      } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
           var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
           currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
           songItem.innerHTML = pauseButtonTemplate;
           currentlyPlayingSong = songItem.getAttribute('data-song-number');
       }
      
      
  };
        
   var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
   var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
  var playerBarPlayButton = '<span class="ion-play"></span>';
    var playBarButton = '<span class="ion-pause"></span>';
   


// Store state of playing songs
   var currentAlbum = null;
   var currentlyPlayingSongNumber = null;
   var currentSongFromAlbum = null;
 
 var $previousButton = $('.main-controls .previous');
 var $nextButton = $('.main-controls .next');
      $(document).ready(function() { 
         setCurrentAlbum(albumPicasso);
    $previousButton.click(previousSong);
    $nextButton.click(nextSong);
      });
             
var nextSong= function() {
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    //song incrememnt
    currentSong++;
    
    if (currentSongIdex >= currentAlbum.songs.length) {
        currentSongIndex = 0;
    }
    
    var lastSongNumber = currentlyPlayingSong.songs[currentSongIdex];
    
    //update play bar
    updatePlayerBarSong();
    
  var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber) + setSong(songNumber) + '"]');
    var $lastSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber) + lastSongNumber + '"]');

    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);    
};

var previousSong = function() {
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    currentSongIndex--;

    if (currentSongIndex < 0) {
        currentSongIndex = currentAlbum.songs.length - 1;
    }

    var lastSongNumber = currentlyPlayingSongNumber;

    currentlyPlayingSongNumber = currentSongIndex + 1;
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

    updatePlayerBarSong();

    $('.main-controls .play-pause').html(playerBarPauseButton);

    var $previousSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber)="' + setSong(songNumber) + '"]');
    var $lastSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber)="' + lastSongNumber + '"]');

    $previousSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
};
