// Define custom blocks
Blockly.Blocks['artist_block'] = {
  init: function() {
    this.appendValueInput("ARTIST_INFO")
      .setCheck("artist_image")
      .appendField("Artist:");
    
    this.appendStatementInput("GENRE")
      .setCheck("genre_block")
      .appendField("🎵 Genre:");

    this.appendStatementInput("FUN_FACTS")
      .setCheck("fact_block")
      .appendField("💡 Fun Facts:");
     
    this.appendStatementInput("AUDIO")
      .setCheck("audio_block")
      .appendField("🎧 Audio Clips:");

    this.setColour(160);
    this.setTooltip("Create an artist and attach info");
    this.setHelpUrl("");
  }
};

// blocks for the artist picture that gets dragged over  
Blockly.Blocks['artist_image_block'] = {
  init: function() {
    this.appendDummyInput()
      .appendField(new Blockly.FieldImage("", 80, 80, "Artist"), "ARTIST_IMAGE")
      .appendField(new Blockly.FieldLabel("Artist Name"), "ARTIST_NAME");
    
    this.setOutput(true, "artist_image");
    this.setColour(160);
    this.setTooltip("Artist image to attach to artist block");
  }
};


// blocks for the genre block that gets dragged over  
Blockly.Blocks['genre_block'] = {
  init: function() {
    this.appendDummyInput()
      .appendField(new Blockly.FieldLabelSerializable("Genre Name"), "GENRE_NAME");
    this.setPreviousStatement(true, "genre_block");
    this.setNextStatement(true, "genre_block");
    this.setColour(290);
  }
};

// blocks for the fact block that gets dragged over  
Blockly.Blocks['fact_block'] = {
  init: function() {
    this.appendDummyInput()
      .appendField(new Blockly.FieldLabelSerializable("Fact text"), "FACT_TEXT");
    this.setPreviousStatement(true, "fact_block");
    this.setNextStatement(true, "fact_block");
    this.setColour(50);
  }
};

//management to stop them from overlapping
let globalCurrentAudio = null;

Blockly.Blocks['audio_block'] = {
  init: function() {
    const block = this;

    this.appendDummyInput()
      .appendField(new Blockly.FieldLabelSerializable("Audio Label"), "AUDIO_LABEL")
      .appendField(new Blockly.FieldImage("play.png", 20, 20, "▶️", function() {
        const url = block.getFieldValue("AUDIO_URL");
        
        if (!url) {
          alert("No audio file assigned.");
          return;
        }

        // if audio is playing and it's THIS block's audio
        if (globalCurrentAudio && globalCurrentAudio.src.includes(url)) {
          if (globalCurrentAudio.paused) {
            // resume
            globalCurrentAudio.play();
          } else {
            // pause
            globalCurrentAudio.pause();
          }
        } else {
          // stop any other music playing
          if (globalCurrentAudio && !globalCurrentAudio.paused) {
            globalCurrentAudio.pause();
            globalCurrentAudio.currentTime = 0;
          }
          
          // start new one
          globalCurrentAudio = new Audio(url);
          globalCurrentAudio.play();
        }
      }), "PLAY_BUTTON");

    this.appendDummyInput()
      .appendField(new Blockly.FieldTextInput("audio.mp3"), "AUDIO_URL")
      .setVisible(false);

    this.setPreviousStatement(true, "audio_block");
    this.setNextStatement(true, "audio_block");
    this.setColour(15);
  }
};;

let workspace;

function start() {
  // gets toolbox from embedded XML instead of fetching
  const toolbox = document.getElementById('toolbox');
  
  workspace = Blockly.inject('blocklyDiv', {
    toolbox: toolbox,
    trashcan: true,
    grid: { spacing: 25, length: 3, colour: '#ccc', snap: true },
    move: { scrollbars: true, drag: true, wheel: true }
  });

  createInitialBlocks();
}

//pre placed blocks
//this is so the users know what to do or an exmaple
function createInitialBlocks() {
  // creates Adele image block
  const adeleImageBlock = workspace.newBlock('artist_image_adele');
  adeleImageBlock.initSvg();
  adeleImageBlock.render();
  adeleImageBlock.moveBy(100, 100);

  // has the artist blank template 
  const artistBlock = workspace.newBlock('artist_block');
  artistBlock.initSvg();
  artistBlock.render();
  artistBlock.moveBy(50, 50);
  

  // attaches adele to template
  const artistInfoConnection = artistBlock.getInput('ARTIST_INFO').connection;
  const adeleOutputConnection = adeleImageBlock.outputConnection;
  artistInfoConnection.connect(adeleOutputConnection);

  

  // adds the pop genre block
  const popGenreBlock = workspace.newBlock('genre_block');
  popGenreBlock.setFieldValue('Pop', 'GENRE_NAME');
  popGenreBlock.initSvg();
  popGenreBlock.render();

  // conencts it
  const genreConnection = artistBlock.getInput('GENRE').connection;
  const popPreviousConnection = popGenreBlock.previousConnection;
  genreConnection.connect(popPreviousConnection);
}


// Adele image block
Blockly.Blocks['artist_image_adele'] = {
  init: function() {
    this.appendDummyInput()
      .appendField(new Blockly.FieldImage("Adele.jpg", 80, 80, "Adele"))
      .appendField("Adele");
    
    this.setOutput(true, "artist_image");
    this.setColour(160);
    this.setTooltip("Adele");
  }
};

// Kanye image block
Blockly.Blocks['artist_image_kanye'] = {
  init: function() {
    this.appendDummyInput()
      .appendField(new Blockly.FieldImage("kanye.jpeg", 80, 80, "Kanye West"))
      .appendField("Kanye West");
    
    this.setOutput(true, "artist_image");
    this.setColour(160);
    this.setTooltip("Kanye West");
  }
};

// Carrie image block
Blockly.Blocks['artist_image_carrie'] = {
  init: function() {
    this.appendDummyInput()
      .appendField(new Blockly.FieldImage("carrie.jpeg", 80, 80, "Carrie Underwood"))
      .appendField("Carrie Underwood");
    
    this.setOutput(true, "artist_image");
    this.setColour(160);
    this.setTooltip("Carrie Underwood");
  }};

  // Taylor Swift image block
Blockly.Blocks['artist_image_taylor'] = {
  init: function() {
    this.appendDummyInput()
      .appendField(new Blockly.FieldImage("taylor.jpeg", 80, 80, "Taylor Swift"))
      .appendField("Taylor Swift");
    
    this.setOutput(true, "artist_image");
    this.setColour(160);
    this.setTooltip("Taylor Swift");
  }};

 // Nirvana image block
Blockly.Blocks['artist_image_nirvana'] = {
  init: function() {
    this.appendDummyInput()
      .appendField(new Blockly.FieldImage("nirvana.jpeg", 80, 80, "Nirvana"))
      .appendField("Nirvana");
    
    this.setOutput(true, "artist_image");
    this.setColour(160);
    this.setTooltip("Nirvana");
  }};

  // Chris Brown image block
Blockly.Blocks['artist_image_chris'] = {
  init: function() {
    this.appendDummyInput()
      .appendField(new Blockly.FieldImage("chris.jpeg", 80, 80, "Chris Brown"))
      .appendField("Chris Brown");
    
    this.setOutput(true, "artist_image");
    this.setColour(160);
    this.setTooltip("Chris Brown");
  }};

  // Reba McEntire image block
Blockly.Blocks['artist_image_reba'] = {
  init: function() {
    this.appendDummyInput()
      .appendField(new Blockly.FieldImage("reba.png", 80, 80, "Reba McEntire"))
      .appendField("Reba McEntire");
    
    this.setOutput(true, "artist_image");
    this.setColour(160);
    this.setTooltip("Reba McEntire");
  }};

  // Metallica image block
Blockly.Blocks['artist_image_metallica'] = {
  init: function() {
    this.appendDummyInput()
      .appendField(new Blockly.FieldImage("metallica.jpeg", 80, 80, "Metallica"))
      .appendField("Metallica");
    
    this.setOutput(true, "artist_image");
    this.setColour(160);
    this.setTooltip("Metallica");
  }};


function checkAllAnswers() {
  if (!workspace) return;

  const artistBlocks = workspace.getBlocksByType('artist_block', false);
  let totalArtists = 0;
  let correctArtists = 0;
//all the correct answers
  const correctData = {
    'Adele': {
      genre: ['Pop'],
      facts: ['This person shares the record with Beyoncé for the most Grammy Awards won by a female artist in a single night.'],
      audio: ['Random Clip1']
    },
    'Kanye West': {
      genre: ['Hip-Hop'],
      facts: ['Has a daughter named North and a son named Saint.'],
      audio: ['Random Clip2']
    },
    'Taylor Swift': {
      genre: ['Pop'], 
      facts: ["Has won 11 Grammy Awards, including the first person to win Album of the Year four times.", "Grew up on a Christmas tree farm."],
      audio: ['Random Clip4']
    },
    'Carrie Underwood': {
      genre: ['Country'],
      facts: ["The song rose to fame after winning American Idol in 2005."],
      audio: ['Random Clip3']
    },
    'Nirvana': {
      genre: ['Rock'],
      facts: ['Their album "Nevermind" is often credited with bringing grunge and alternative rock to a mainstream audience.', "One of their Band members killed themselves in their home"],
      audio: ['Random Clip7']
    },
    'Metallica': {
      genre: ['Rock'],
      facts: ['Their self-titled album, also known as "The Black Album," is one of the best-selling albums worldwide.', "The only band to have performed on all seven continents"],
      audio: ['Random Clip8']
    },
    'Reba McEntire': {
      genre: ['Country'],
      facts: ["Known as \"The Queen of Country\"", "Has a sitcom named after them"],
      audio: ['Random Clip5']
    },
    'Chris Brown': {
      genre: ['Hip-Hop'],
      facts: ['Assaulted his then-girlfriend Rihanna during an argument, leaving her with visible facial injuries that required hospitalization.'],
      audio: ['Random Clip6']
        
    }
  };
    //removes any old markers left on the. workspcae

    removeAllFeedbackMarkers();


  artistBlocks.forEach(block => {
    // gets the artist name from the attached image block
    const artistImageBlock = block.getInputTargetBlock('ARTIST_INFO');
    if (!artistImageBlock) return;
    
    // determines artist name based on block type
    let artistName;
    if (artistImageBlock.type === 'artist_image_adele') {
      artistName = 'Adele';
    } else if (artistImageBlock.type === 'artist_image_kanye') {
      artistName = 'Kanye West';
    } else if (artistImageBlock.type === 'artist_image_carrie') {
      artistName = 'Carrie Underwood';
    } else if (artistImageBlock.type === 'artist_image_taylor') {
      artistName = 'Taylor Swift';
    } else if (artistImageBlock.type === 'artist_image_chris') {
      artistName = 'Chris Brown';
    } else if (artistImageBlock.type === 'artist_image_reba') {
      artistName = 'Reba McEntire';
    } else if (artistImageBlock.type === 'artist_image_nirvana') {
      artistName = 'Nirvana';
    } else if (artistImageBlock.type === 'artist_image_metallica') {
      artistName = 'Metallica';

    }
    
    const expected = correctData[artistName];
    if (!expected) return;
    totalArtists++;

    // chekcs genres
    let genreBlock = block.getInputTargetBlock('GENRE');
    const actualGenres = [];
    while (genreBlock) {
      actualGenres.push(genreBlock.getFieldValue('GENRE_NAME'));
      genreBlock = genreBlock.nextConnection && genreBlock.nextConnection.targetBlock();
    }

    const genreMatch =
      actualGenres.length === expected.genre.length &&
      actualGenres.every(c => expected.genre.includes(c));

    // checks facts
    let factBlock = block.getInputTargetBlock('FUN_FACTS');
    const actualFacts = [];
    while (factBlock) {
      actualFacts.push(factBlock.getFieldValue('FACT_TEXT'));
      factBlock = factBlock.nextConnection && factBlock.nextConnection.targetBlock();
    }

    const factMatch =
      actualFacts.length === expected.facts.length &&
      actualFacts.every(f => expected.facts.includes(f));

    // chekcs audio
    let audioBlock = block.getInputTargetBlock('AUDIO');
    const actualAudio = [];
    while (audioBlock) {
      actualAudio.push(audioBlock.getFieldValue('AUDIO_LABEL'));
      audioBlock = audioBlock.nextConnection && audioBlock.nextConnection.targetBlock();
    }

    const audioMatch =
      actualAudio.length === expected.audio.length &&
      actualAudio.every(a => expected.audio.includes(a));

    // chekcks if all are correct
    const isArtistCorrect = genreMatch && factMatch && audioMatch;
    
    if (isArtistCorrect) {
      correctArtists++;
    }

    // add visual feedback
    addFeedbackToBlock(block, isArtistCorrect, genreMatch, factMatch, audioMatch);
  });

  // popup of the score
  if (correctArtists === totalArtists && totalArtists > 0) {
    alert(`🎉 Perfect! All ${totalArtists} artists are correct!`);
  } else {
    alert(`You have ${correctArtists} out of ${totalArtists} artists completely correct.\n\nCheck the ✓ and ✗ markers on each artist block for details!`);
  }
}

function removeAllFeedbackMarkers() {
  // Remove all existing feedback elements
  const existingMarkers = document.querySelectorAll('.feedback-marker');
  existingMarkers.forEach(marker => marker.remove());
}

function addFeedbackToBlock(block, isCorrect, genreCorrect, factCorrect, audioCorrect) {
  // Get the SVG element for this block
  const blockSvg = block.getSvgRoot();
  if (!blockSvg) return;

  // creates feedback markers
  const feedbackGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  feedbackGroup.setAttribute('class', 'feedback-marker');
  
  let yOffset = 10;


  const overallMarker = createSvgText(
    isCorrect ? '✓' : '✗',
    isCorrect ? '#00ff00' : '#ff0000',
    'bold',
    24
  );
  overallMarker.setAttribute('x', '10');
  overallMarker.setAttribute('y', yOffset.toString());
  feedbackGroup.appendChild(overallMarker);

  yOffset += 35;

  // genre feedback
  const genreMarker = createSvgText(
    `Genre: ${genreCorrect ? '✓' : '✗'}`,
    genreCorrect ? '#00ff00' : '#ff0000',
    'normal',
    14
  );
  genreMarker.setAttribute('x', '15');
  genreMarker.setAttribute('y', yOffset.toString());
  feedbackGroup.appendChild(genreMarker);

  yOffset += 20;

  // facts feedback
  const factMarker = createSvgText(
    `Facts: ${factCorrect ? '✓' : '✗'}`,
    factCorrect ? '#00ff00' : '#ff0000',
    'normal',
    14
  );
  factMarker.setAttribute('x', '15');
  factMarker.setAttribute('y', yOffset.toString());
  feedbackGroup.appendChild(factMarker);

  yOffset += 20;

  // audio feedback
  const audioMarker = createSvgText(
    `Audio: ${audioCorrect ? '✓' : '✗'}`,
    audioCorrect ? '#00ff00' : '#ff0000',
    'normal',
    14
  );
  audioMarker.setAttribute('x', '15');
  audioMarker.setAttribute('y', yOffset.toString());
  feedbackGroup.appendChild(audioMarker);

  // append feedback to block
  blockSvg.appendChild(feedbackGroup);
}

function createSvgText(text, color, weight, size) {
  const textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  textElement.textContent = text;
  textElement.setAttribute('fill', color);
  textElement.setAttribute('font-weight', weight);
  textElement.setAttribute('font-size', size.toString());
  textElement.setAttribute('font-family', 'Arial, sans-serif');
  return textElement;
}

window.addEventListener('load', start);