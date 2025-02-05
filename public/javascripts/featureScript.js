 const cards = document.querySelectorAll('.card');

const lightColors = [
    //'#F5F5F5', // whitesmoke
    '#ADD8E6', // light blue
    '#C9E4CA', // pale green
    //'#F0F0F0', // light gray
    '#C5CAE9', // light sky blue
    '#FFC5C5',//light pink
    '#FFFFE0',//light yellow
    '#FFC0CB',//light red
  ];
  
  function changeColor() {
    cards.forEach((card) => {
      const randomIndex = Math.floor(Math.random() * lightColors.length);
      card.style.backgroundColor = lightColors[randomIndex];
    });
  }
  
  setInterval(changeColor, 1000); // change color every 1 second
    
