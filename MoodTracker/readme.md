# Mood Tracker

A simple web application that allows users to track their mood and visualize their mood history using charts.

## Features

- **Mood Selection**: Users can select their mood from a set of predefined emotions.
- **Mood Logging**: Users can save their daily mood along with an optional note.
- **Recent Moods**: Displays the most recent mood entries.
- **Mood Statistics**: A bar chart visualizing mood distribution and total entries.
- **Most Common Mood**: Highlights the most frequently logged mood.

## Tech Stack

- **HTML**
- **Tailwind CSS**
- **JavaScript**
- **Chart js**

## Loading Test Data

To load test data into the application, follow these steps:

1. Set the variable **`str`** with the test data from the `testdata.json` file.
2. Store the test data in `localStorage`:
   ```javascript
   localStorage.moodTracker = JSON.stringify(str);
   ```

## Deployment

The application is live at:

🔗 **[Live Deployment URL](https://masterjiprojectsdashbard.netlify.app/moodtracker/)**
