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


Blockly.Blocks['genre_block'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("🎵 Genre: ")
      .appendField(new Blockly.FieldLabel("Genre Name"), "GENRE_NAME");
    this.setPreviousStatement(true, "genre_block");
    this.setNextStatement(true, "genre_block");
    this.setColour(290);
  }
};

Blockly.Blocks['fact_block'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("💬 Fact: ")
      .appendField(new Blockly.FieldLabel("Fact text"), "FACT_TEXT");
    this.setPreviousStatement(true, "fact_block");
    this.setNextStatement(true, "fact_block");
    this.setColour(50);
  }
};

Blockly.Blocks['audio_block'] = {
  init: function() {
    const block = this;

    this.appendDummyInput()
      .appendField("🎵 Song Clip:")
      .appendField(new Blockly.FieldLabel("Audio Label"), "AUDIO_LABEL")
      .appendField(new Blockly.FieldImage("play.png", 20, 20, "▶️", () => {
        const url = block.getFieldValue("AUDIO_URL");
        if (url) new Audio(url).play();
        else alert("No audio file assigned.");
      }), "PLAY_BUTTON");

    this.appendDummyInput()
      .appendField(new Blockly.FieldTextInput("audio.mp3"), "AUDIO_URL")
      .setVisible(false);

    this.setPreviousStatement(true, "audio_block");
    this.setNextStatement(true, "audio_block");
    this.setColour(15);
  }
};

let workspace;

function start() {
  // Load the toolbox XML
  fetch('toolbox.xml')
    .then(response => response.text())
    .then(toolboxXml => {
      workspace = Blockly.inject('blocklyDiv', {
        toolbox: toolboxXml,
        trashcan: true,
        grid: { spacing: 25, length: 3, colour: '#ccc', snap: true },
        move: { scrollbars: true, drag: true, wheel: true }
      });

     
      createInitialBlocks();
    });
}
//pre placed blocks
function createInitialBlocks() {
  // Create Adele image block
  const adeleImageBlock = workspace.newBlock('artist_image_adele');
  adeleImageBlock.initSvg();
  adeleImageBlock.render();
  adeleImageBlock.moveBy(100, 100);

  // Create blank artist block with Adele attached
  const artistBlock = workspace.newBlock('artist_block');
  artistBlock.initSvg();
  artistBlock.render();
  artistBlock.moveBy(50, 50);

  // Connect Adele image to the artist block
  const artistInfoConnection = artistBlock.getInput('ARTIST_INFO').connection;
  const adeleOutputConnection = adeleImageBlock.outputConnection;
  artistInfoConnection.connect(adeleOutputConnection);

  // Create Pop genre block
  const popGenreBlock = workspace.newBlock('genre_block');
  popGenreBlock.setFieldValue('Pop', 'GENRE_NAME');
  popGenreBlock.initSvg();
  popGenreBlock.render();

  // Connect Pop genre block to the artist block
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
  }
};function checkAllAnswers() {
  if (!workspace) return;

  const artistBlocks = workspace.getBlocksByType('artist_block', false);
  let allCorrect = true;

  const correctData = {
    'Adele': {
      genre: ['Pop'],
      facts: ['This person shares the record with Beyoncé for the most Grammy Awards won by a female artist in a single night.'],
      audio: ['Adele Clip']
    },
    'Kanye West': {
      genre: ['Hip-Hop'],
      facts: ['This song was a diss to Drake'],
      audio: ['Kanye Clip']
    },
    'Carrie Underwood': {
      genre: ['Country'],
      facts: ["The song was also one of the first country songs to reach top 10 on the Billboard Hot 100 and spend 64 consecutive weeks up there."],
      audio: ['Carrie Clip']
    }
  };

  artistBlocks.forEach(block => {
    // Get the artist name from the attached image block
    const artistImageBlock = block.getInputTargetBlock('ARTIST_INFO');
    if (!artistImageBlock) return;
    
    // Determine artist name based on block type
    let artistName;
    if (artistImageBlock.type === 'artist_image_adele') {
      artistName = 'Adele';
    } else if (artistImageBlock.type === 'artist_image_kanye') {
      artistName = 'Kanye West';
    } else if (artistImageBlock.type === 'artist_image_carrie') {
      artistName = 'Carrie Underwood';
    }
    
    const expected = correctData[artistName];
    if (!expected) return;

    let genreBlock = block.getInputTargetBlock('GENRE');
    const actualGenres = [];
    while (genreBlock) {
      actualGenres.push(genreBlock.getFieldValue('GENRE_NAME'));
      genreBlock = genreBlock.nextConnection && genreBlock.nextConnection.targetBlock();
    }

    const genreMatch =
      actualGenres.length === expected.genre.length &&
      actualGenres.every(c => expected.genre.includes(c));

    let factBlock = block.getInputTargetBlock('FUN_FACTS');
    const actualFacts = [];
    while (factBlock) {
      actualFacts.push(factBlock.getFieldValue('FACT_TEXT'));
      factBlock = factBlock.nextConnection && factBlock.nextConnection.targetBlock();
    }

    const factMatch =
      actualFacts.length === expected.facts.length &&
      actualFacts.every(f => expected.facts.includes(f));

    let audioBlock = block.getInputTargetBlock('AUDIO');
    const actualAudio = [];
    while (audioBlock) {
      actualAudio.push(audioBlock.getFieldValue('AUDIO_LABEL'));
      audioBlock = audioBlock.nextConnection && audioBlock.nextConnection.targetBlock();
    }

    const audioMatch =
      actualAudio.length === expected.audio.length &&
      actualAudio.every(a => expected.audio.includes(a));

    if (!genreMatch || !factMatch || !audioMatch) {
      allCorrect = false;
    }
  });

  if (allCorrect) {
    alert("🎉 All answers are correct!");
  } else {
    alert("❌ Some answers are incorrect. Please try again.");
  }
}


// Start when page loads
window.addEventListener('load', start);