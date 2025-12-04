
Blockly.Blocks['artist_block'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("Artist: ")
      .appendField(new Blockly.FieldLabel("Artist's Name"), "ARTIST_NAME")
      .appendField(new Blockly.FieldImage("teacher_placeholder.png", 64, 64, "Artist Image"), "ARTIST_IMAGE_URL");

    this.appendStatementInput("GENRE")
      .setCheck("genre_block")
      .appendField("🎵 Genre:");

    this.appendStatementInput("FUN_FACTS")
      .setCheck("fact_block")
      .appendField("💡 fun facts:");
     
    this.appendStatementInput("AUDIO")
      .setCheck("audio_block")
      .appendField("🎧 Audio Clips:");

    this.setColour(160);
    this.setDeletable(false);

   
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
  workspace = Blockly.inject('blocklyDiv', {
    toolbox: null,
    trashcan: true,
    grid: { spacing: 25, length: 3, colour: '#ccc', snap: true },
    move: { scrollbars: true, drag: true, wheel: true }
  });

 
  const artist = [
    { name: 'Adele', image: 'Adele.jpg', x: 50, y: 50 },
    { name: 'Kanye West', image: 'kanye.jpeg', x: 400, y: 50 },
    { name: 'Carrie Underwood', image: 'carrie.jpeg', x: 750, y: 50 }
  ];

  artist.forEach(t => {
    const block = workspace.newBlock('artist_block');
    block.setFieldValue(t.name, 'ARTIST_NAME');
    block.setFieldValue(t.image, 'ARTIST_IMAGE_URL');
    block.initSvg();
    block.render();
    block.moveBy(t.x, t.y);
  });


  const genre = [
    { name: 'Country', x: 100, y: 300 },
    { name: 'Pop', x: 500, y: 300 },
    { name: 'Hip-Hop', x: 900, y: 350 }
  ];

  genre.forEach(c => {
    const block = workspace.newBlock('genre_block');
    block.setFieldValue(c.name, 'GENRE_NAME');
    block.initSvg();
    block.render();
    block.moveBy(c.x, c.y);
  });

  const facts = [
    { name: 'This person shares the record with Beyoncé for the most Grammy Awards won by a female artist in a single night.', x:150, y: 550 },
    { name: 'This song was a diss to Drake', x: 400, y: 500 },
    { name: "The song was also one of the first country songs to reach top 10 on the Billboard Hot 100 and spend 64 consecutive weeks up there.", x:120, y: 450}
  ];

  facts.forEach(f => {
    const block = workspace.newBlock('fact_block');
    block.setFieldValue(f.name, 'FACT_TEXT');
    block.initSvg();
    block.render();
    block.moveBy(f.x, f.y);
  });
const audioClips = [
  { label: "Adele Clip", url: "Skyfall.mp3", x: 150, y: 650 },
  { label: "Kanye Clip", url: "LiftYourself.mp3", x: 500, y: 650 },
  { label: "Carrie Clip", url: "BeforeHeCheats.mp3", x: 850, y: 650 }
];

audioClips.forEach(a => {
  const block = workspace.newBlock('audio_block');
  block.setFieldValue(a.label, 'AUDIO_LABEL');
  block.setFieldValue(a.url, 'AUDIO_URL');
  block.initSvg();
  block.render();
  block.moveBy(a.x, a.y);
});

}

function checkAllAnswers() {
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
  const artistName = block.getFieldValue('ARTIST_NAME');
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
