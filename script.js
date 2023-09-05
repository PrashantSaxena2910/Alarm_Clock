document.addEventListener("DOMContentLoaded", () => {
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");
    const setAlarmBtn = document.getElementById("setAlarmBtn");
    const alarmsList = document.getElementById("alarmsList");

    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const seconds = String(now.getSeconds()).padStart(2, "0");

        hoursElement.textContent = hours;
        minutesElement.textContent = minutes;
        secondsElement.textContent = seconds;
    }

    function setAlarm() {
        const alarmHours = document.getElementById("alarmHours").value;
        const alarmMinutes = document.getElementById("alarmMinutes").value;
        const alarmSeconds = document.getElementById("alarmSeconds").value;
        const amPm = document.getElementById("amPm").value;

        const alarmTime = `${alarmHours}:${alarmMinutes}:${alarmSeconds} ${amPm}`;
        const alarmListItem = document.createElement("li");
        alarmListItem.textContent = alarmTime;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            alarmsList.removeChild(alarmListItem);
        });

        alarmListItem.appendChild(deleteButton);
        alarmsList.appendChild(alarmListItem);
    }

    function checkAlarms() {
        const now = new Date();
        const currentHours = now.getHours();
        const currentMinutes = now.getMinutes();
        const currentSeconds = now.getSeconds();
        const currentAmPm = currentHours < 12 ? "AM" : "PM";

        const alarms = document.querySelectorAll("#alarmsList li");
        alarms.forEach(alarm => {
            const alarmTimeParts = alarm.textContent.split(" ");
            const alarmTime = alarmTimeParts[0];
            const alarmAmPm = alarmTimeParts[1];

            if (
                alarmAmPm === currentAmPm &&
                alarmTime === `${String(currentHours).padStart(2, "0")}:${String(currentMinutes).padStart(2, "0")}:${String(currentSeconds).padStart(2, "0")}`
            ) {
                alert(`Alarm at ${alarmTime}`);
                alarmsList.removeChild(alarm);
            }
        });
    }

    setAlarmBtn.addEventListener("click", setAlarm);
    setInterval(updateClock, 1000);
    setInterval(checkAlarms, 1000);
});
function updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const ampm = hours >= 12 ? "PM" : "AM";

    document.getElementById("clock").textContent = `${hours % 12}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")} ${ampm}`;
  }

  function setAlarm() {
    const alarmHour = parseInt(document.getElementById("alarmHour").value);
    const alarmMinute = parseInt(document.getElementById("alarmMinute").value);
    const alarmSecond = parseInt(document.getElementById("alarmSecond").value);
    const ampm = document.getElementById("ampm").value;

    const alarmsList = document.getElementById("alarms");

    const alarmTime = new Date();
    alarmTime.setHours(alarmHour + (ampm === "pm" && alarmHour !== 12 ? 12 : 0));
    alarmTime.setMinutes(alarmMinute);
    alarmTime.setSeconds(alarmSecond);

    const alarmItem = document.createElement("div");
    alarmItem.innerHTML = `${alarmHour}:${alarmMinute
      .toString()
      .padStart(2, "0")}:${alarmSecond.toString().padStart(2, "0")} ${ampm} <button class="deleteAlarm">Delete</button>`;
    alarmsList.appendChild(alarmItem);

    const deleteButton = alarmItem.querySelector(".deleteAlarm");
    deleteButton.addEventListener("click", function () {
      alarmsList.removeChild(alarmItem);
    });

    const intervalId = setInterval(function () {
      const now = new Date();
      if (now >= alarmTime) {
        clearInterval(intervalId);
        alert("Alarm!");
      }
    }, 1000);
  }

  updateClock();
  setInterval(updateClock, 1000);

  document.getElementById("setAlarm").addEventListener("click", setAlarm);
