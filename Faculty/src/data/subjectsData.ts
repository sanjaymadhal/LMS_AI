interface Chapter {
  id: string;
  name: string;
  presentations: {
    id: string;
    name: string;
    filePath: string;
  }[];
}

interface Module {
  id: string;
  name: string;
  chapters: Chapter[];
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  modules: Module[];
  totalChapters: number;
  color?: string;         // Add color property
  ongoing?: boolean;      // Add ongoing property
  schedule?: {            // Add schedule property
    day: string;
    time: string;
  };
  studentCount?: number;  // Add studentCount property
}

// Define subject data for each semester
const subjectsData: Record<string, Subject[]> = {
  "1": [
    {
      id: "18cs11",
      code: "18CS11",
      name: "Calculus and Linear Algebra",
      modules: [
        {
          id: "m1",
          name: "Module 1: Differential Calculus-1",
          chapters: [
            {
              id: "c1",
              name: "Limits and Continuity",
              presentations: [
                { id: "p1", name: "Introduction to Limits", filePath: "/presentations/limits.pptx" },
                { id: "p2", name: "Continuity Examples", filePath: "/presentations/continuity.pptx" },
              ]
            },
            {
              id: "c2",
              name: "Differentiation",
              presentations: [
                { id: "p3", name: "Rules of Differentiation", filePath: "/presentations/diff-rules.pptx" },
              ]
            }
          ]
        },
        {
          id: "m2",
          name: "Module 2: Differential Calculus-2",
          chapters: [
            {
              id: "c3",
              name: "Rolle's Theorem",
              presentations: [
                { id: "p4", name: "Rolle's Theorem Examples", filePath: "/presentations/rolles.pptx" },
              ]
            },
            {
              id: "c4",
              name: "Mean Value Theorems",
              presentations: [
                { id: "p5", name: "MVT Application", filePath: "/presentations/mvt.pptx" },
              ]
            }
          ]
        }
      ],
      totalChapters: 4
    },
    {
      id: "18cs12",
      code: "18CS12",
      name: "Engineering Physics",
      modules: [
        {
          id: "m1",
          name: "Module 1: Waves and Oscillations",
          chapters: [
            {
              id: "c1",
              name: "Simple Harmonic Motion",
              presentations: [
                { id: "p1", name: "Introduction to SHM", filePath: "/presentations/shm.pptx" },
              ]
            }
          ]
        },
        {
          id: "m2",
          name: "Module 2: Interference of Light",
          chapters: [
            {
              id: "c2",
              name: "Young's Double Slit Experiment",
              presentations: [
                { id: "p2", name: "Young's Experiment", filePath: "/presentations/young.pptx" },
              ]
            }
          ]
        }
      ],
      totalChapters: 2
    },
    {
      id: "18cs13",
      code: "18CS13",
      name: "Basic Electrical Engineering",
      modules: [
        {
          id: "m1",
          name: "Module 1: DC Circuits",
          chapters: [
            {
              id: "c1",
              name: "Ohm's Law",
              presentations: [
                { id: "p1", name: "Ohm's Law Applications", filePath: "/presentations/ohm.pptx" },
              ]
            }
          ]
        }
      ],
      totalChapters: 1
    }
  ],
  "2": [
    {
      id: "18cs21",
      code: "18CS21",
      name: "Vector Calculus and Transform Techniques",
      modules: [
        {
          id: "m1",
          name: "Module 1: Vector Calculus",
          chapters: [
            {
              id: "c1",
              name: "Vector Differentiation",
              presentations: [
                { id: "p1", name: "Vector Differentiation", filePath: "/presentations/vector-diff.pptx" },
              ]
            }
          ]
        }
      ],
      totalChapters: 1
    },
    {
      id: "18cs22",
      code: "18CS22",
      name: "Engineering Chemistry",
      modules: [
        {
          id: "m1",
          name: "Module 1: Electrochemistry",
          chapters: [
            {
              id: "c1",
              name: "Batteries",
              presentations: [
                { id: "p1", name: "Battery Types", filePath: "/presentations/batteries.pptx" },
              ]
            }
          ]
        }
      ],
      totalChapters: 1
    }
  ],
  "3": [
    {
      id: "18cs31",
      code: "18CS31",
      name: "Data Structures in C",
      modules: [
        {
          id: "m1",
          name: "Module 1: Arrays and Linked Lists",
          chapters: [
            {
              id: "c1",
              name: "Arrays Implementation",
              presentations: [
                { id: "p1", name: "Arrays in C", filePath: "/presentations/arrays.pptx" },
              ]
            },
            {
              id: "c2",
              name: "Linked Lists",
              presentations: [
                { id: "p2", name: "Linked List Types", filePath: "/presentations/linked-lists.pptx" },
              ]
            }
          ]
        },
        {
          id: "m2",
          name: "Module 2: Stacks and Queues",
          chapters: [
            {
              id: "c3",
              name: "Stack Implementation",
              presentations: [
                { id: "p3", name: "Stack Operations", filePath: "/presentations/stack.pptx" },
              ]
            },
            {
              id: "c4",
              name: "Queue Implementation",
              presentations: [
                { id: "p4", name: "Queue Operations", filePath: "/presentations/queue.pptx" },
              ]
            }
          ]
        }
      ],
      totalChapters: 4
    }
  ],
  "4": [
    {
      id: "18cs41",
      code: "18CS41",
      name: "Design and Analysis of Algorithms",
      modules: [
        {
          id: "m1",
          name: "Module 1: Introduction",
          chapters: [
            {
              id: "c1",
              name: "Algorithm Analysis",
              presentations: [
                { id: "p1", name: "Time Complexity", filePath: "/presentations/complexity.pptx" },
              ]
            }
          ]
        }
      ],
      totalChapters: 1
    }
  ],
  "5": [
    {
      id: "18cs51",
      code: "18CS51",
      name: "Database Management Systems",
      modules: [
        {
          id: "m1",
          name: "Module 1: Introduction to DBMS",
          chapters: [
            {
              id: "c1",
              name: "ER Model",
              presentations: [
                { id: "p1", name: "ER Diagrams", filePath: "/presentations/er-diagrams.pptx" },
              ]
            }
          ]
        }
      ],
      totalChapters: 1
    }
  ],
  "6": [
    {
      id: "18cs61",
      code: "18CS61",
      name: "Computer Networks",
      modules: [
        {
          id: "m1",
          name: "Module 1: Introduction to Networks",
          chapters: [
            {
              id: "c1",
              name: "OSI Model",
              presentations: [
                { id: "p1", name: "OSI Layers", filePath: "/presentations/osi-model.pptx" },
              ]
            }
          ]
        }
      ],
      totalChapters: 1
    }
  ],
  "7": [
    {
      id: "18cs71",
      code: "18CS71",
      name: "Artificial Intelligence",
      modules: [
        {
          id: "m1",
          name: "Module 1: Problem Solving",
          chapters: [
            {
              id: "c1",
              name: "Search Algorithms",
              presentations: [
                { id: "p1", name: "Uninformed Search", filePath: "/presentations/search.pptx" },
              ]
            }
          ]
        }
      ],
      totalChapters: 1
    }
  ],
  "8": [
    {
      id: "18cs81",
      code: "18CS81",
      name: "Internet of Things",
      modules: [
        {
          id: "m1",
          name: "Module 1: IoT Architecture",
          chapters: [
            {
              id: "c1",
              name: "IoT Protocols",
              presentations: [
                { id: "p1", name: "MQTT Protocol", filePath: "/presentations/mqtt.pptx" },
              ]
            }
          ]
        }
      ],
      totalChapters: 1
    }
  ],
};

export const getSemesterSubjects = (semesterId: string): Subject[] => {
  return subjectsData[semesterId] || [];
};

export const getSubject = (subjectId: string): Subject | undefined => {
  for (const semester in subjectsData) {
    const subject = subjectsData[semester].find(s => s.id === subjectId);
    if (subject) return subject;
  }
  return undefined;
};

// Add the getSubjectsByParams function
export const getSubjectsByParams = ({ 
  semester, 
  search 
}: { 
  semester: string; 
  search: string 
}): Subject[] => {
  const subjects = getSemesterSubjects(semester);
  
  if (!search) {
    return subjects.map(subject => ({
      ...subject,
      color: subject.color || getRandomColor(subject.id),
      ongoing: subject.ongoing !== undefined ? subject.ongoing : Math.random() > 0.5,
      schedule: subject.schedule || {
        day: getRandomDay(),
        time: getRandomTime()
      },
      studentCount: subject.studentCount || Math.floor(Math.random() * 60) + 20
    }));
  }
  
  const searchLower = search.toLowerCase();
  return subjects
    .filter(subject => 
      subject.name.toLowerCase().includes(searchLower) || 
      subject.code.toLowerCase().includes(searchLower)
    )
    .map(subject => ({
      ...subject,
      color: subject.color || getRandomColor(subject.id),
      ongoing: subject.ongoing !== undefined ? subject.ongoing : Math.random() > 0.5,
      schedule: subject.schedule || {
        day: getRandomDay(),
        time: getRandomTime()
      },
      studentCount: subject.studentCount || Math.floor(Math.random() * 60) + 20
    }));
};

// Helper functions for generating random values
const getRandomColor = (id: string): string => {
  const colors = [
    '#FF5733', '#33FF57', '#3357FF', '#F033FF', '#FF33F0',
    '#33FFF0', '#F0FF33', '#5733FF', '#FF5733', '#33FF57'
  ];
  // Use the id to generate a consistent color for the same subject
  const index = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
  return colors[index];
};

const getRandomDay = (): string => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  return days[Math.floor(Math.random() * days.length)];
};

const getRandomTime = (): string => {
  const hours = ['8:00', '9:30', '11:00', '1:00', '2:30', '4:00'];
  const periods = ['AM', 'AM', 'AM', 'PM', 'PM', 'PM'];
  const index = Math.floor(Math.random() * hours.length);
  return `${hours[index]} ${periods[index]}`;
};
