$(document).ready(function () {

  // Load events from local storage
  var events = JSON.parse(localStorage.getItem('events')) || {};
  for (var dayOfWeek in events) {
    if (events.hasOwnProperty(dayOfWeek)) {
      var dayTable = '#' + getDayOfWeekName(dayOfWeek) + '-table tbody';
      for (var i = 0; i < events[dayOfWeek].length; i++) {
        var event = events[dayOfWeek][i];
        var crossedOutClass = event.crossedOut ? 'crossed-out' : '';
        var eventName = '<td contenteditable class="' + crossedOutClass + '">' + event.name + '</td>';
        var eventDate = '<td contenteditable class="' + crossedOutClass + '">' + event.date + '</td>';
        var eventDescription = '<td contenteditable class="' + crossedOutClass + '">' + event.description + '</td>';
        $(dayTable).append('<tr data-name="' + event.name + '" data-date="' + event.date + '" data-description="' + event.description + '">' + eventName + eventDate + eventDescription + '<td><button class="delete-button action-button">X</button></td><td><button class="cross-out action-button ' + crossedOutClass + '"></button></td></tr>');
      }
    }
  }

  // Submit event form
  $('#create-event-form').submit(function (event) {
    event.preventDefault();

    var eventName = $('#event-name').val();
    var eventDate = $('#event-date').val();
    var eventDescription = $('#event-description').val();

    // Create event object
    var eventObject = {
      name: eventName,
      date: eventDate,
      description: eventDescription,
      crossedOut: false
    };

    // Check if event is already crossed out
    var events = JSON.parse(localStorage.getItem('events')) || {};
    var dayOfWeek = new Date(eventDate).getUTCDay();
    if (events[dayOfWeek]) {
      for (var i = 0; i < events[dayOfWeek].length; i++) {
        if (events[dayOfWeek][i].name === eventName && events[dayOfWeek][i].date === eventDate && events[dayOfWeek][i].description === eventDescription && events[dayOfWeek][i].crossedOut) {
          eventObject.crossedOut = true;
          break;
        }
      }
    }

    // Store event in local storage
    events[dayOfWeek] = events[dayOfWeek] || [];
    events[dayOfWeek].push(eventObject);
    localStorage.setItem('events', JSON.stringify(events));


    // Add event to the corresponding day table
    var crossedOutClass = eventObject.crossedOut ? 'crossed-out' : '';
    var crossedOutName = '<td contenteditable class="' + crossedOutClass + '">' + eventName + '</td>';
    var crossedOutDate = '<td contenteditable class="' + crossedOutClass + '">' + eventDate + '</td>';
    var crossedOutDescription = '<td contenteditable class="' + crossedOutClass + '">' + eventDescription + '</td>';
    switch (dayOfWeek) {
      case 1:
        $('#monday-table tbody').append('<tr data-name="' + eventName + '" data-date="' + eventDate + '" data-description="' + eventDescription + '">' + crossedOutName + crossedOutDate + crossedOutDescription + '<td><button class="delete-button action-button">X</button></td><td><button class="cross-out action-button ' + crossedOutClass + '"></button></td></tr>');
        break;
      case 2:
        $('#tuesday-table tbody').append('<tr data-name="' + eventName + '" data-date="' + eventDate + '" data-description="' + eventDescription + '">' + crossedOutName + crossedOutDate + crossedOutDescription + '<td><button class="delete-button action-button">X</button></td><td><button class="cross-out action-button ' + crossedOutClass + '"></button></td></tr>');
        break;
      case 3:
        $('#wednesday-table tbody').append('<tr data-name="' + eventName + '" data-date="' + eventDate + '" data-description="' + eventDescription + '">' + crossedOutName + crossedOutDate + crossedOutDescription + '<td><button class="delete-button action-button">X</button></td><td><button class="cross-out action-button ' + crossedOutClass + '"></button></td></tr>');
        break;
      case 4:
        $('#thursday-table tbody').append('<tr data-name="' + eventName + '" data-date="' + eventDate + '" data-description="' + eventDescription + '">' + crossedOutName + crossedOutDate + crossedOutDescription + '<td><button class="delete-button action-button">X</button></td><td><button class="cross-out action-button ' + crossedOutClass + '"></button></td></tr>');
        break;
      case 5:
        $('#friday-table tbody').append('<tr data-name="' + eventName + '" data-date="' + eventDate + '" data-description="' + eventDescription + '">' + crossedOutName + crossedOutDate + crossedOutDescription + '<td><button class="delete-button action-button">X</button></td><td><button class="cross-out action-button ' + crossedOutClass + '"></button></td></tr>');
        break;
      case 6:
        $('#saturday-table tbody').append('<tr data-name="' + eventName + '" data-date="' + eventDate + '" data-description="' + eventDescription + '">' + crossedOutName + crossedOutDate + crossedOutDescription + '<td><button class="delete-button action-button">X</button></td><td><button class="cross-out action-button ' + crossedOutClass + '"></button></td></tr>');
        break;
      case 0:
        $('#sunday-table tbody').append('<tr data-name="' + eventName + '" data-date="' + eventDate + '" data-description="' + eventDescription + '">' + crossedOutName + crossedOutDate + crossedOutDescription + '<td><button class="delete-button action-button">X</button></td><td><button class="cross-out action-button ' + crossedOutClass + '"></button></td></tr>');
        break;
      default:
        break;
    } // Reset form fields
    $('#event-name').val('');
    $('#event-date').val('');
    $('#event-description').val('');
  });

// Cross out event
$(document).on('click', '.cross-out', function () {
  var $this = $(this);
  var tdElements = $this.closest('tr').find('td');
  
  // Check if dark mode is enabled
  var isDarkModeEnabled = $('body').hasClass('dark-mode');

  $this.toggleClass(isDarkModeEnabled ? 'crossed-out-dark' : 'crossed-out');
  $(tdElements[0]).toggleClass(isDarkModeEnabled ? 'crossed-out-dark' : 'crossed-out');
  $(tdElements[1]).toggleClass(isDarkModeEnabled ? 'crossed-out-dark' : 'crossed-out');
  $(tdElements[2]).toggleClass(isDarkModeEnabled ? 'crossed-out-dark' : 'crossed-out');

  var eventName = $(tdElements[0]).text();
  var eventDate = $(tdElements[1]).text();
  var eventDescription = $(tdElements[2]).text();
  var events = JSON.parse(localStorage.getItem('events')) || {};
  var dayOfWeek = new Date(eventDate).getUTCDay();

  for (var i = 0; i < events[dayOfWeek].length; i++) {
    if (events[dayOfWeek][i].name === eventName && events[dayOfWeek][i].date === eventDate && events[dayOfWeek][i].description === eventDescription) {
      events[dayOfWeek][i].crossedOut = !events[dayOfWeek][i].crossedOut;
      break;
    }
  }

  localStorage.setItem('events', JSON.stringify(events));
});


  // Delete event
  $(document).on('click', '.delete-button', function () {
    var $this = $(this);
    $this.closest('tr').remove();
    var tdElements = $this.closest('tr').find('td');
    var eventName = $(tdElements[0]).text();
    var eventDate = $(tdElements[1]).text();
    var eventDescription = $(tdElements[2]).text();
    var events = JSON.parse(localStorage.getItem('events')) || {};
    var dayOfWeek = new Date(eventDate).getUTCDay();
    for (var i = 0; i < events[dayOfWeek].length; i++) {
      if (events[dayOfWeek][i].name === eventName && events[dayOfWeek][i].date === eventDate && events[dayOfWeek][i].description === eventDescription) {
        events[dayOfWeek].splice(i, 1);
        break;
      }
    }
    localStorage.setItem('events', JSON.stringify(events));
  });

  $(document).on('input', 'td[contenteditable]', function () {
    var $this = $(this);
    var trElement = $this.closest('tr');
    var tdElements = trElement.find('td');
    var originalEventName = trElement.data('name');
    var originalEventDate = trElement.data('date');
    var originalEventDescription = trElement.data('description');
    var eventName = $(tdElements[0]).text();
    var eventDate = $(tdElements[1]).text();
    var eventDescription = $(tdElements[2]).text();
    var crossedOut = $(tdElements[0]).hasClass('crossed-out');
    var dayOfWeek = new Date(eventDate).getUTCDay();
    var originalDayOfWeek = new Date(originalEventDate).getUTCDay();

    var events = JSON.parse(localStorage.getItem('events')) || {};

    // Remove the original event from the events object
    if (events[originalDayOfWeek]) {
      for (var i = 0; i < events[originalDayOfWeek].length; i++) {
        if (events[originalDayOfWeek][i].name === originalEventName && events[originalDayOfWeek][i].date === originalEventDate && events[originalDayOfWeek][i].description === originalEventDescription) {
          events[originalDayOfWeek].splice(i, 1);
          break;
        }
      }
    }

    // Add the updated event to the events object
    events[dayOfWeek] = events[dayOfWeek] || [];
    events[dayOfWeek].push({
      name: eventName,
      date: eventDate,
      description: eventDescription,
      crossedOut: crossedOut
    });

    // Save the updated events array in local storage
    localStorage.setItem('events', JSON.stringify(events));

    // Update data attributes with new data
    trElement.data('name', eventName);
    trElement.data('date', eventDate);
    trElement.data('description', eventDescription);

    // Call the handleDateChange function
    clearTimeout($.data(this, 'timer')); // Clear the previous timeout
    var wait = setTimeout(function () {
      handleDateChange(trElement, dayOfWeek);
    }, 1000); // Add 1000 ms delay
    $(this).data('timer', wait);

  });

  const toggleButton = document.getElementById("theme-toggle");
  const body = document.querySelector("body");
  const icon = document.getElementById("icon");
  
  toggleButton.addEventListener("change", () => {
    body.classList.toggle("dark-theme");
    if (body.classList.contains("dark-theme")) {
      icon.classList.replace("fa-moon", "fa-sun");
    } else {
      icon.classList.replace("fa-sun", "fa-moon");
    }
  });
  
});

// Helper function to get day of week name
function getDayOfWeekName(dayOfWeek) {
  switch (dayOfWeek) {
    case '1':
      return 'monday';
    case '2':
      return 'tuesday';
    case '3':
      return 'wednesday';
    case '4':
      return 'thursday';
    case '5':
      return 'friday';
    case '6':
      return 'saturday';
    case '0':
      return 'sunday';
    default:
      return '';
  }
}

function isValidDate(dateString) {
  var regex = /^(\d{4})-(\d{2})-(\d{2})$/;
  if (!regex.test(dateString)) {
    return false;
  }
  var date = new Date(dateString);
  if (!date.getTime()) {
    return false;
  }
  return date.toISOString().slice(0, 10) === dateString;
}

function handleDateChange(trElement, dayOfWeek) {
  var eventDate = trElement.find('td:eq(1)').text();
  if (!isValidDate(eventDate)) {
    alert('Invalid date format. Please use YYYY-MM-DD format.');
    return;
  }
  var currentTable = trElement.closest('table');
  var currentDayOfWeek = getDayOfWeekFromTableId(currentTable.attr('id'));

  if (dayOfWeek !== currentDayOfWeek) {
    trElement.remove();

    var dayTableSelector = '#' + getDayOfWeekName(dayOfWeek.toString()) + '-table tbody';
    var eventName = trElement.find('td:eq(0)');
    var eventDate = trElement.find('td:eq(1)');
    var eventDescription = trElement.find('td:eq(2)');
    var deleteButton = trElement.find('td:eq(3)');
    var crossOutButton = trElement.find('td:eq(4)');

    $(dayTableSelector).append('<tr data-name="' + eventName.text() + '" data-date="' + eventDate.text() + '" data-description="' + eventDescription.text() + '">' + eventName.prop('outerHTML') + eventDate.prop('outerHTML') + eventDescription.prop('outerHTML') + deleteButton.prop('outerHTML') + crossOutButton.prop('outerHTML') + '</tr>');
  }
}

function getDayOfWeekFromTableId(tableId) {
  switch (tableId) {
    case 'monday-table':
      return 1;
    case 'tuesday-table':
      return 2;
    case 'wednesday-table':
      return 3;
    case 'thursday-table':
      return 4;
    case 'friday-table':
      return 5;
    case 'saturday-table':
      return 6;
    case 'sunday-table':
      return 0;
    default:
      return -1;
  }
}
