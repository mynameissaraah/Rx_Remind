// Function to add a drug reminder
function addReminder() {
    const drugName = document.getElementById('drugName').value;
    const reminderTime = document.getElementById('reminderTime').value;
    const selectedEmoji = document.getElementById('emojiPicker').value;
  
    if (drugName.trim() === '' || reminderTime === '') {
      alert('Please enter the drug name, reminder time, and select an emoji.');
      return;
    }
  
    // Save the reminder in the browser's local storage
    const reminder = {
      drugName: drugName,
      reminderTime: reminderTime,
      emoji: selectedEmoji,
    };
  
    let reminders = JSON.parse(localStorage.getItem('reminders')) || [];
    let drugReminders = reminders.find((r) => r.drugName === drugName);
  
    if (!drugReminders) {
      drugReminders = {
        drugName: drugName,
        reminders: [],
      };
      reminders.push(drugReminders);
    }
  
    drugReminders.reminders.push(reminder);
    localStorage.setItem('reminders', JSON.stringify(reminders));
  
    // Update the reminders list
    displayReminders();
  }
  
  // Function to display drugs and their reminders in the list
  function displayReminders() {
    const drugsList = document.getElementById('drugsList');
    const remindersList = document.getElementById('remindersList');
  
    drugsList.innerHTML = '';
    remindersList.innerHTML = '';
  
    const reminders = JSON.parse(localStorage.getItem('reminders')) || [];
  
    reminders.forEach((drugReminders) => {
      // Display drugs list
      const drugListItem = document.createElement('li');
      drugListItem.textContent = drugReminders.drugName;
      drugsList.appendChild(drugListItem);
  
      // Display reminders list for each drug
      drugReminders.reminders.forEach((reminder, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${reminder.drugName} - ${reminder.reminderTime} ${reminder.emoji}`;
  
        // Add a remove button for each reminder
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => removeReminder(drugReminders.drugName, index));
  
        listItem.appendChild(removeButton);
        remindersList.appendChild(listItem);
      });
    });
  }
  
  // Function to remove a reminder from the list and local storage
  function removeReminder(drugName, index) {
    let reminders = JSON.parse(localStorage.getItem('reminders')) || [];
  
    const drugReminders = reminders.find((r) => r.drugName === drugName);
    if (drugReminders) {
      if (index >= 0 && index < drugReminders.reminders.length) {
        drugReminders.reminders.splice(index, 1);
        localStorage.setItem('reminders', JSON.stringify(reminders));
        displayReminders();
      }
    }
  }
  
  // Initialize emoji picker
  cdocument.querySelector('emoji-picker')
  .addEventListener('emoji-click', event => console.log(event.detail));
  // Call the displayReminders function on page load
  displayReminders();
  
