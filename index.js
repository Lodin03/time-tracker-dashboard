const dashboardContainer = document.getElementById('container');
const timeFrameButtons = document.querySelectorAll('.container-box__profile-bottom__time-list button');
let statsData = [];
let selectedTimeFrame = 'weekly';

async function fetchData() {
  const res = await fetch('data.json')
  statsData = await res.json();
  displayData(selectedTimeFrame);
}

fetchData()

// Add event listeners for time frame buttons
timeFrameButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    timeFrameButtons.forEach(btn => btn.classList.remove('container-box__profile-bottom__active'));
    // Add active class to clicked button
    button.classList.add('container-box__profile-bottom__active');
    // Update selected timeframe and display data
    selectedTimeFrame = button.id;
    displayData(selectedTimeFrame);
  });
});

function displayData(timeframe) {
  dashboardContainer.querySelectorAll('.card').forEach(card => card.remove())

  statsData.forEach(stat => {
    const item = document.createElement('div')
    item.classList.add('card', `${stat.title.toLowerCase().replace(' ', '-')}-card`)

    // Get timeframe data
    const timeData = stat.timeframes[timeframe]
    const previousText = timeframe === 'daily' ? 'Yesterday' : timeframe === 'weekly' ? 'Last Week' : 'Last Month';

    item.innerHTML = `
      <div class='card-top'>
        <img src='images/icon-${stat.title.toLowerCase().replace(' ', '-')}.svg' alt='' class='card-icon'>
      </div>
      <div class='card-bottom'>
        <div class='card-header'>
          <p class='title bold-text'>${stat.title}</p>
          <div class='menu-btn'><img src='images/icon-ellipsis.svg' alt=''></div>
        </div>
        <div class='time'>
          <p class='current-hours big-text'>${timeData.current}hrs</p>
          <p class='previous-hours small-text'>${previousText} - <span class='previous-hour'>${timeData.previous}</span>hrs</p>
        </div>
      </div>
    `

    dashboardContainer.appendChild(item);
  })
}