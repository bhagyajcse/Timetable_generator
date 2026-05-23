const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

const slots = [
  "8:00 AM - 9:00 AM",
  "9:00 AM - 10:00 AM",
  "10:00 AM - 10:20 AM",
  "10:20 AM - 11:20 AM",
  "11:20 AM - 12:20 PM",
  "12:20 PM - 1:00 PM",
  "1:00 PM - 2:00 PM",
  "2:00 PM - 3:00 PM",
  "3:00 PM - 4:00 PM"
];

// Fixed break periods
const SHORT_BREAK = "10:00 AM - 10:20 AM";
const LUNCH_BREAK = "12:20 PM - 1:00 PM";

// Saturday limit
const SATURDAY_LAST_SLOT = "1:00 PM - 2:00 PM";

export function generateTimetable(sections, subjects) {

  const result = [];

  // Global faculty conflict tracker
  const facultySchedule = {};

  sections.forEach((section) => {

    const timetable = {};

    // Initialize all days
    days.forEach((day) => {
      timetable[day] = [];
    });

    // Section-specific subjects
    let sectionSubjects = subjects;

    if (
      section.subjects &&
      section.subjects.length > 0
    ) {

      const subjectIds =
        section.subjects.map((s) =>
          s._id.toString()
        );

      sectionSubjects = subjects.filter((sub) =>
        subjectIds.includes(sub._id.toString())
      );
    }

    // Separate labs and theory
    const theorySubjects =
      sectionSubjects.filter((s) => !s.isLab);

    const labSubjects =
      sectionSubjects.filter((s) => s.isLab);

    let theoryIndex = 0;
    let labIndex = 0;

    days.forEach((day, dayIndex) => {

      let labAddedToday = false;

      // Saturday timetable only till 2 PM
      const activeSlots =
        day === "Saturday"
          ? slots.filter(
              (slot) =>
                slot !== "2:00 PM - 3:00 PM" &&
                slot !== "3:00 PM - 4:00 PM"
            )
          : slots;

      activeSlots.forEach((time) => {

        // ======================
        // SHORT BREAK
        // ======================
        if (time === SHORT_BREAK) {

          timetable[day].push({
            time,
            subject: "SHORT BREAK",
            faculty: "---",
            type: "BREAK"
          });

          return;
        }

        // ======================
        // LUNCH BREAK
        // ======================
        if (time === LUNCH_BREAK) {

          timetable[day].push({
            time,
            subject: "LUNCH BREAK",
            faculty: "---",
            type: "BREAK"
          });

          return;
        }

        let chosenSubject = null;

        // ======================
        // LAB SLOT
        // ======================
        if (
          time === "1:00 PM - 2:00 PM" &&
          !labAddedToday &&
          labSubjects.length > 0 &&
          dayIndex < 3
        ) {

          let attempts = 0;

          while (
            attempts < labSubjects.length
          ) {

            const subject =
              labSubjects[
                labIndex %
                labSubjects.length
              ];

            labIndex++;

            const facultyCode =
              subject.facultyId?.code;

            const key =
              `${facultyCode}-${day}-${time}`;

            // faculty available
            if (!facultySchedule[key]) {

              chosenSubject = subject;
              labAddedToday = true;
              break;
            }

            attempts++;
          }

        } else {

          // ======================
          // THEORY SLOT
          // ======================
          if (theorySubjects.length > 0) {

            let attempts = 0;

            while (
              attempts < theorySubjects.length
            ) {

              const subject =
                theorySubjects[
                  theoryIndex %
                  theorySubjects.length
                ];

              theoryIndex++;

              const facultyCode =
                subject.facultyId?.code;

              const key =
                `${facultyCode}-${day}-${time}`;

              // faculty available
              if (!facultySchedule[key]) {

                chosenSubject = subject;
                break;
              }

              attempts++;
            }
          }
        }

        // ======================
        // FREE PERIOD
        // ======================
        if (!chosenSubject) {

          timetable[day].push({
            time,
            subject: "FREE",
            faculty: "---",
            type: "FREE"
          });

          return;
        }

        // ======================
        // ASSIGN SUBJECT
        // ======================

        const facultyName =
          chosenSubject.facultyId?.name ||
          "TBA";

        const facultyCode =
          chosenSubject.facultyId?.code ||
          "TBA";

        const facultyKey =
          `${facultyCode}-${day}-${time}`;

        // Reserve faculty
        facultySchedule[facultyKey] = true;

        timetable[day].push({
          time,
          subject: chosenSubject.name,
          faculty: facultyName,
          type:
            chosenSubject.isLab
              ? "LAB"
              : "THEORY"
        });

      });

    });

    result.push({
      section: section.name,
      timetable
    });

  });

  return result;
}