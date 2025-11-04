export const tutorialData = [
  /* =========================
     1. Java Basics
     ========================= */
  {
    id: 1,
    title: "Java Basics",
    description:
      "Foundation Java topics focused on explanations, examples, and web-based practice that prepare learners to read and reason about FRC robot code.",
    lessons: [
      {
        id: 1,
        title: "Variables & Data Types — Deep Dive",
        type: "coding",
        content: `This lesson goes beyond "what" a variable is and explains "why" types matter in FRC robot programming.

Overview:
- Variables hold data. Types tell Java how to store and operate on that data.

Practice activity:
- Drag the following code snippets to assemble the correct variable declarations.`,
        codeBlocks: [
          'double rightSpeed = 0.5;',
          'String robotName = "DemoBot";',
          'int teamNumber = 4321;',
          'boolean isAutonomous = false;',
          'double leftSpeed = 0.5;'
        ],
        solution: [
          'int teamNumber = 4321;',
          'double leftSpeed = 0.5;',
          'double rightSpeed = 0.5;',
          'boolean isAutonomous = false;',
          'String robotName = "DemoBot";'
        ]
      },
      {
        id: 2,
        title: "Control Flow — if/else and switch",
        type: "coding",
        content: `Robots must make decisions. Drag the following snippets to assemble the correct if/else logic for battery voltage monitoring.`,
        codeBlocks: [
          'System.out.println("Battery OK");',
          'else if (batteryVoltage < 12.0) { System.out.println("Battery moderate — monitor"); }',
          'if (batteryVoltage < 11.0) { System.out.println("Low battery — reduce performance"); }'
        ],
        solution: [
          'if (batteryVoltage < 11.0) { System.out.println("Low battery — reduce performance"); }',
          'else if (batteryVoltage < 12.0) { System.out.println("Battery moderate — monitor"); }',
          'else { System.out.println("Battery OK"); }'
        ]
      },
      {
        id: 3,
        title: "Loops — for, while, and enhanced for",
        type: "coding",
        content: `Loops let robots repeat logic. Drag the snippets to build a loop that samples a sensor 20 times and computes the average.`,
        codeBlocks: [
          'double sum = 0.0;',
          'sum += sample;',
          'double sample = Math.random() * 5.0;',
          'double average = sum / 20.0;',
          'for (int i = 0; i < 20; i++) { ... }',
          'System.out.println("Average: " + average);'
        ],
        solution: [
          'double sum = 0.0;',
          'for (int i = 0; i < 20; i++) {',
          '  double sample = Math.random() * 5.0;',
          '  sum += sample;',
          '}',
          'double average = sum / 20.0;',
          'System.out.println("Average: " + average);'
        ]
      },
      {
        id: 4,
        title: "Methods & Parameters",
        type: "coding",
        content: `Methods let you package behavior. Drag the snippets to assemble a method that drives a robot and checks if a target encoder count is reached.`,
        codeBlocks: [
          'leftMotor.set(speed);',
          'public boolean reachedTarget(double currentTicks, double targetTicks) { return currentTicks >= targetTicks; }',
          'rightMotor.set(speed);',
          'public void driveAtSpeed(double speed) { ... }'
        ],
        solution: [
          'public void driveAtSpeed(double speed) {',
          '  leftMotor.set(speed);',
          '  rightMotor.set(speed);',
          '}',
          'public boolean reachedTarget(double currentTicks, double targetTicks) { return currentTicks >= targetTicks; }'
        ]
      },
      {
        id: 5,
        title: "Classes & Objects — OOP for Robot Code",
        type: "lecture",
        content: `Understanding OOP keeps robot code scalable. Subsystems are natural objects; commands are classes that operate on those objects.`
      },
      {
        id: 6,
        title: "Java Basics — Quiz",
        type: "quiz",
        content: "Check foundational concepts (types, control flow, methods).",
        question: "Which type should be used to represent a motor speed that may be 0.0 to 1.0?",
        options: {
          a: "int",
          b: "double",
          c: "boolean",
          d: "String"
        },
        correctAnswer: "b",
        explanation:
          "Motor speeds are continuous decimals between -1.0 and 1.0, so double is the correct type."
      }
    ]
  },

  /* =========================
     2. FRC Setup (Website-Only, Conceptual)
     ========================= */
  {
    id: 2,
    title: "FRC Setup (Conceptual)",
    description:
      "All the 'setup' knowledge students need, presented on-site: what each tool does, how pieces fit together, and conceptual workflows — no installations required.",
    lessons: [
      {
        id: 1,
        title: "What is WPILib and Why It Matters",
        type: "lecture",
        content: `WPILib is the core library and tooling for FRC robot code. Treat it as the robot-specific standard library.`
      },
      {
        id: 2,
        title: "What is the Driver Station & Robot Lifecycle",
        type: "lecture",
        content: `Driver Station: the match control program used during competitions. It allows teams to enable/disable the robot and switch between autonomous and teleop.`
      },
      {
        id: 3,
        title: "RoboRIO, NetworkTables, and Data Flow",
        type: "lecture",
        content: `RoboRIO is the robot controller hardware — the "brain" that runs your Java code.`
      },
      {
        id: 4,
        title: "Simulated Development & Testing (Website Exercises)",
        type: "lecture",
        content: `You won't install tools here, but you can simulate common tasks.`
      },
      {
        id: 5,
        title: "FRC Setup — Quiz",
        type: "quiz",
        content: "Evaluate understanding of tools and roles.",
        question: "Which component stores and shares telemetry between robot code and the dashboard?",
        options: {
          a: "VS Code",
          b: "NetworkTables",
          c: "Gradle",
          d: "GitHub"
        },
        correctAnswer: "b",
        explanation: "NetworkTables is the runtime key/value store used for telemetry and settings exchange."
      }
    ]
  },

  /* =========================
     3. Robot Programming Fundamentals
     ========================= */
  {
    id: 3,
    title: "Robot Programming Fundamentals",
    description:
      "Core structure and idioms of FRC robot software explained with examples you can study and reason about on the website.",
    lessons: [
      {
        id: 1,
        title: "Project Structure & Command-Based Architecture",
        type: "lecture",
        content: `Command-based architecture increases modularity and decouples scheduling from subsystems.`
      },
      {
        id: 2,
        title: "Writing a Subsystem",
        type: "coding",
        content: `A subsystem class acts similar to a code library. Drag snippets to assemble a Drivetrain class.`,
        codeBlocks: [
          'private final MotorController left;',
          'private final MotorController right;',
          'private final Encoder encoder;',
          'left = new MotorController(1);',
          'right = new MotorController(2);',
          'encoder = new Encoder(0, 1);',
          'public void tankDrive(double leftSpeed, double rightSpeed) { left.set(leftSpeed); right.set(rightSpeed); }',
          'public void stop() { left.stopMotor(); right.stopMotor(); }',
          'public double getDistance() { return encoder.getDistance(); }'
        ],
        solution: [
          'private final MotorController left;',
          'private final MotorController right;',
          'private final Encoder encoder;',
          'left = new MotorController(1);',
          'right = new MotorController(2);',
          'encoder = new Encoder(0, 1);',
          'public void tankDrive(double leftSpeed, double rightSpeed) { left.set(leftSpeed); right.set(rightSpeed); }',
          'public void stop() { left.stopMotor(); right.stopMotor(); }',
          'public double getDistance() { return encoder.getDistance(); }'
        ]
      },
      {
        id: 3,
        title: "Writing Commands",
        type: "coding",
        content: `Commands define robot actions. Drag snippets to assemble a DriveForward command using your Drivetrain subsystem.`,
        codeBlocks: [
          'private final Drivetrain drivetrain;',
          'public DriveForward(Drivetrain dt) { drivetrain = dt; addRequirements(drivetrain); }',
          'protected void execute() { drivetrain.tankDrive(0.5, 0.5); }',
          'protected boolean isFinished() { return false; }',
          'protected void end(boolean interrupted) { drivetrain.stop(); }'
        ],
        solution: [
          'private final Drivetrain drivetrain;',
          'public DriveForward(Drivetrain dt) { drivetrain = dt; addRequirements(drivetrain); }',
          'protected void execute() { drivetrain.tankDrive(0.5, 0.5); }',
          'protected boolean isFinished() { return false; }',
          'protected void end(boolean interrupted) { drivetrain.stop(); }'
        ]
      },
      {
        id: 4,
        title: "Subsystems & Commands — Quiz",
        type: "quiz",
        content: "Check understanding of object relationships and command lifecycle.",
        question: "Which method in a Command is repeatedly called by the scheduler?",
        options: {
          a: "initialize()",
          b: "execute()",
          c: "end()",
          d: "isFinished()"
        },
        correctAnswer: "b",
        explanation: "The scheduler repeatedly calls execute() until isFinished() returns true."
      }
    ]
  },

  /* =========================
     4. Sensors and Actuators
     ========================= */
  {
    id: 4,
    title: "Sensors and Actuators",
    description:
      "Working with motor controllers, encoders, gyros, and other sensors with live examples in the browser.",
    lessons: [
      {
        id: 1,
        title: "Reading Encoder Values",
        type: "coding",
        content: `Drag snippets to assemble code that reads distance from an encoder and prints it.`,
        codeBlocks: [
          'Encoder leftEncoder = new Encoder(0,1);',
          'double distance = leftEncoder.getDistance();',
          'System.out.println("Distance: " + distance);'
        ],
        solution: [
          'Encoder leftEncoder = new Encoder(0,1);',
          'double distance = leftEncoder.getDistance();',
          'System.out.println("Distance: " + distance);'
        ]
      },
      {
        id: 2,
        title: "Using a Gyroscope",
        type: "coding",
        content: `Drag snippets to assemble code that reads gyro angle and resets it if it exceeds 360.`,
        codeBlocks: [
          'Gyro gyro = new Gyro();',
          'double angle = gyro.getAngle();',
          'if(angle > 360) { gyro.reset(); }',
          'System.out.println("Angle: " + angle);'
        ],
        solution: [
          'Gyro gyro = new Gyro();',
          'double angle = gyro.getAngle();',
          'if(angle > 360) { gyro.reset(); }',
          'System.out.println("Angle: " + angle);'
        ]
      }
    ]
  },

  /* =========================
     5. Autonomous Programming
     ========================= */
  {
    id: 5,
    title: "Autonomous Programming",
    description: "Autonomous sequences, command groups, and sensor-based decisions.",
    lessons: [
      {
        id: 1,
        title: "SequentialCommandGroup",
        type: "coding",
        content: `Drag snippets to assemble a SequentialCommandGroup that drives forward, waits, then stops.`,
        codeBlocks: [
          'addCommands(new DriveForward(drivetrain), new WaitCommand(2), new StopCommand(drivetrain));',
          'public class AutoRoutine extends SequentialCommandGroup { public AutoRoutine(Drivetrain dt) { ... } }'
        ],
        solution: [
          'public class AutoRoutine extends SequentialCommandGroup { public AutoRoutine(Drivetrain dt) {',
          '  addCommands(new DriveForward(dt), new WaitCommand(2), new StopCommand(dt));',
          '} }'
        ]
      }
    ]
  },

  /* =========================
     6. Advanced Topics
     ========================= */
  {
    id: 6,
    title: "Advanced Topics",
    description: "Advanced robot programming concepts.",
    lessons: [
      {
        id: 1,
        title: "PID Control",
        type: "coding",
        content: `Drag snippets to assemble a basic PID control loop for driving to a setpoint.`,
        codeBlocks: [
          'double error = setpoint - currentPosition;',
          'double output = kP * error;',
          'motor.set(output);'
        ],
        solution: [
          'double error = setpoint - currentPosition;',
          'double output = kP * error;',
          'motor.set(output);'
        ]
      }
    ]
  },

  /* =========================
     7. Capstone Project
     ========================= */
  {
    id: 7,
    title: "Capstone Project",
    description: "Apply all previous lessons to build a full robot program using drag-and-drop exercises.",
    lessons: [
      {
        id: 1,
        title: "Capstone — Drive & Sensors",
        type: "coding",
        content: `Drag snippets to assemble a robot class that reads sensors and drives the drivetrain.`,
        codeBlocks: [
          'public class Robot extends TimedRobot { ... }',
          'Drivetrain drivetrain = new Drivetrain();',
          'Encoder encoder = new Encoder(0,1);',
          'Gyro gyro = new Gyro();',
          'public void teleopPeriodic() { drivetrain.tankDrive(0.5, 0.5); }'
        ],
        solution: [
          'public class Robot extends TimedRobot {',
          'Drivetrain drivetrain = new Drivetrain();',
          'Encoder encoder = new Encoder(0,1);',
          'Gyro gyro = new Gyro();',
          'public void teleopPeriodic() { drivetrain.tankDrive(0.5, 0.5); }',
          '}'
        ]
      }
    ]
  }
];
