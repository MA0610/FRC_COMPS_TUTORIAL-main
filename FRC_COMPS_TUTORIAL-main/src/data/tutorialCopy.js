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
- Choosing the right type prevents bugs, preserves precision, and documents intent.

Common types and when to use them in FRC:
- int — discrete whole numbers (encoder ticks, port IDs, team number)
- double — continuous/decimal values (motor speeds, angles, voltages)
- boolean — binary states (limit switch pressed? isEnabled?)
- String — human-readable text (log messages/debugging, team name)
- long/float — used rarely in FRC; prefer double for math, long for very large counts.

Why precision matters:
- Motor PID computations require double precision to avoid rounding errors.
- Storing a decimal/double in an int will truncate and cause logic errors (e.g., 0.75 -> 0).

Practice activity (inside the site):
- Create variables for: team number, left motor speed, right motor speed, isAutonomous flag, robot name.
- Then write a short paragraph: why double for speed? why boolean for flags?

Common pitfalls:
- Mixing ints and doubles in division: 3 / 2 == 1 (int division). Use 3.0 / 2.0 for decimal results.
- Reusing variable names in inner scopes leading to confusion.

Hints for the web-site exercises:
- Ask students to predict outputs before showing the solution.`,
        code:
          'int teamNumber = 4321;\ndouble leftSpeed = 0.5;\ndouble rightSpeed = 0.5;\nboolean isAutonomous = false;\nString robotName = "DemoBot";',
        solution:
          'int teamNumber = 4321;\ndouble leftSpeed = 0.5;\ndouble rightSpeed = 0.5;\nboolean isAutonomous = false;\nString robotName = "DemoBot";',
      },
      {
        id: 2,
        title: "Control Flow — if/else and switch",
        type: "coding",
        content: `Robots must make decisions. This lesson explains conditional logic (if/else) and switch statements with FRC examples.

if / else:
- Use when you need to branch based on conditions.
- Example: stop a motor when a limit switch is pressed.

switch:
- Use when you need to pick behavior based on discrete values (modes, states).
- Clearer than chained ifs when checking one variable.

Example scenarios:
- Choose an autonomous routine based on a dropdown (use switch).
- Apply safety interlocks before enabling motors (use if).

Edge cases & pitfalls:
- Floating point equality (==) is unreliable; use a tolerance for comparisons.
- Overly nested ifs reduce readability — extract methods.

Practice task:
- Predict the output of a short code block that checks battery voltage thresholds.`,
        code:
          'double batteryVoltage = 12.3;\nif (batteryVoltage < 11.0) {\n  System.out.println("Low battery — reduce performance");\n} else if (batteryVoltage < 12.0) {\n  System.out.println("Battery moderate — monitor");\n} else {\n  System.out.println("Battery OK");\n}',
        solution:
          'double batteryVoltage = 12.3;\nif (batteryVoltage < 11.0) {\n  System.out.println("Low battery — reduce performance");\n} else if (batteryVoltage < 12.0) {\n  System.out.println("Battery moderate — monitor");\n} else {\n  System.out.println("Battery OK");\n}',
      },
      {
        id: 3,
        title: "Loops — for, while, and enhanced for",
        type: "coding",
        content: `Loops let robots repeat logic. We'll cover typical patterns and safety considerations for robot code.

for loop:
- Use for a known number of iterations (e.g., run a test 10 times).

while loop:
- Use when repeating until a condition is met (e.g., wait until an encoder reaches value).
- Beware: blocking while loops in robot main threads can freeze the robot. For website practice, simulate the loop logic rather than running it in the real robot thread.

enhanced for:
- Iterate collections (arrays, lists) cleanly — great for processing sensor arrays.

Safety & pitfalls:
- Avoid infinite loops in main robot threads. Use state machines or command-based scheduling instead.
- Use breaks/timeouts responsibly.

Practice task:
- Write a for loop that simulates sampling a sensor 20 times and computing average.`,
        code:
          'double sum = 0.0;\nfor (int i = 0; i < 20; i++) {\n  double sample = Math.random() * 5.0; // pretend sensor reading\n  sum += sample;\n}\ndouble average = sum / 20.0;\nSystem.out.println("Average: " + average);',
        solution:
          'double sum = 0.0;\nfor (int i = 0; i < 20; i++) {\n  double sample = Math.random() * 5.0; // pretend sensor reading\n  sum += sample;\n}\ndouble average = sum / 20.0;\nSystem.out.println("Average: " + average);',
      },
      {
        id: 4,
        title: "Methods & Parameters",
        type: "coding",
        content: `Methods let you package behavior. In robot code this is essential for clarity: each subsystem exposes methods describing actions it can perform.

Anatomy of a method:
- Access modifier (public/private)
- Return type (void, double, boolean, etc.)
- Method name (verb phrase, camelCase)
- Parameter list

Why methods matter in FRC:
- Reusability: call the same drive method from teleop and autonomous.
- Testability: smaller methods are easier to test and reason about.
- Encapsulation: hide low-level motor details inside the method.

Design tips:
- Keep methods short and single-purpose.
- Use descriptive names (driveStraightAtSpeed, isArmAtSetpoint).

Practice task:
- Write a method that takes a target encoder count and stops motors when reached (pseudo-code allowed for site).`,
        code:
          'public void driveAtSpeed(double speed) {\n  leftMotor.set(speed);\n  rightMotor.set(speed);\n}\n\npublic boolean reachedTarget(double currentTicks, double targetTicks) {\n  return currentTicks >= targetTicks;\n}',
        solution:
          'public void driveAtSpeed(double speed) {\n  leftMotor.set(speed);\n  rightMotor.set(speed);\n}\n\npublic boolean reachedTarget(double currentTicks, double targetTicks) {\n  return currentTicks >= targetTicks;\n}',
      },
      {
        id: 5,
        title: "Classes & Objects — OOP for Robot Code",
        type: "lecture",
        content: `Understanding OOP keeps robot code scalable. Subsystems are natural objects; commands are classes that operate on those objects.

Concepts:
- Class: blueprint (e.g., Drivetrain)
- Object: an instance of a class (e.g., drivetrain)
- Encapsulation: keep motor references private
- Inheritance & Interfaces: use inheritance for common behavior, interfaces for shared contracts

Example structure (conceptual):
- class Drivetrain { private Motor left; private Motor right; public void tankDrive(double l, double r) {...} }

Design decisions:
- Prefer composition (subsystems own motors) over global variables.
- Use dependency injection (pass subsystems into commands) rather than static singletons when possible.

Practice task:
- Identify classes you would create for a simple robot (Drivetrain, Shooter, Intake). For each, list two methods you expect to implement.`,
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
          "Motor speeds are continuous decimals between -1.0 and 1.0, so double is the correct type.",
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
        content: `WPILib is the core library and tooling for FRC robot code. Treat it as the robot-specific standard library.

Key features:
- Hardware abstractions (motors, encoders, gyros, solenoids)
- Utility classes (Timers, PID controllers)
- Project templates and Gradle build files
- Simulation support and desktop testing helpers (useful for learning on the website)

Why we teach it on-site:
- Students need to understand how WPILib structures robot code and common classes so that when they later use a real project they recognize patterns.

Practice task:
- Read example class docs (provided in-site) for motor controllers and answer a multiple-choice question about what methods are commonly available (set, stopMotor, getPosition).`,
      },
      {
        id: 2,
        title: "What is the Driver Station & Robot Lifecycle",
        type: "lecture",
        content: `Driver Station: the match control program used during competitions. It allows teams to:
- Enable/disable robot
- Switch between Autonomous and Teleop modes
- See network status and battery

Robot lifecycle (conceptual):
- robotInit — one-time initialization
- autonomousInit / autonomousPeriodic — autonomous phase
- teleopInit / teleopPeriodic — teleoperated phase
- disabledInit / disabledPeriodic — robot is disabled

Understanding these callbacks helps you design safe state transitions and avoid side-effects during mode switches.

Practice task:
- Given a pseudo code snippet, ask students where to initialize sensors (answer: robotInit).`,
      },
      {
        id: 3,
        title: "RoboRIO, NetworkTables, and Data Flow",
        type: "lecture",
        content: `RoboRIO is the robot controller hardware — the "brain" that runs your Java code. NetworkTables is the real-time key/value store used for telemetry and inter-process communication (e.g. SmartDashboard, Shuffleboard, vision processes).

Conceptual data flow:
- Sensors -> roboRIO -> NetworkTables -> Dashboard (PC)
- Dashboard -> NetworkTables -> roboRIO (for tuning values)

Why this matters for web learners:
- Knowing where telemetry comes from and how it is used helps you reason about debugging output and tuning controls in simulation or when viewing logs.

Practice:
- Match diagram pieces: roboRIO, DS, Dashboard, camera, vision co-processor.`,
      },
      {
        id: 4,
        title: "Simulated Development & Testing (Website Exercises)",
        type: "lecture",
        content: `You won't install tools here, but you can simulate common tasks:
- Simulated motor behavior (code examples show expected outputs)
- Virtual sensors (randomized but reproducible values for exercises)
- Practice diagnosing failures from log snippets

Exercise:
- Simulate a motor command sequence and predict whether the robot will reach a target position (answer through in-site validation).`,
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
        explanation: "NetworkTables is the runtime key/value store used for telemetry and settings exchange.",
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
        content: `Command-based architecture increases modularity and decouples scheduling (what runs) from subsystems (what acts).

Main pieces:
- Subsystems: own hardware, expose methods
- Commands: encapsulate behaviors, can be sequenced or run concurrently
- Robot container: connects subsystems to commands and input bindings

Advantages:
- Easier to test and reason about behaviors
- Makes troubleshooting easier since mechanisms are isolated/organized by their subsystem or commands (ex. if one motor isn't moving how you expect it to move, you can look at the subsystem and command files that control the motor and see if there is an issue there rather than looking through a thousand lines of code in one file).
`,
      },
      {
        id: 2,
        title: "Writing a Subsystem",
        type: "coding",
        content: `A subsystem class acts similar to a code library, you essentially will define the functions/methods that you will be using in your commands. This will include methods that do things such as drive, stop, set brake mode, read sensors, etc.... This is a very important concept to understand as it is the backbone of your robot code as although it is relatively simple, it can make your life way easier. This is because you will be able to call these methods in your commands without needing to write the logic of a specific action multiple times (ex. moving an arm to a position using an encoder), you will instead just call the method and the robot will do it (provided you made sure it works). 

Core ideas:
- Keep motor instances private
- Provide public methods for actions (driveTank, setBrakeMode, resetEncoder)
- Provide getters to read sensors (getEncoderDistance)

`,
        code:
          'public class Drivetrain extends SubsystemBase {\n  private final MotorController left;\n  private final MotorController right;\n  private final Encoder encoder;\n\n  public Drivetrain() {\n    left = new MotorController(1);\n    right = new MotorController(2);\n    encoder = new Encoder(0, 1);\n  }\n\n  public void tankDrive(double leftSpeed, double rightSpeed) {\n    left.set(leftSpeed);\n    right.set(rightSpeed);\n  }\n\n  public void stop() {\n    left.stopMotor();\n    right.stopMotor();\n  }\n\n  public double getDistance() {\n    return encoder.getDistance();\n  }\n}',
        solution:
          'public class Drivetrain extends SubsystemBase {\n  private final MotorController left;\n  private final MotorController right;\n  private final Encoder encoder;\n\n  public Drivetrain() {\n    left = new MotorController(1);\n    right = new MotorController(2);\n    encoder = new Encoder(0, 1);\n  }\n\n  public void tankDrive(double leftSpeed, double rightSpeed) {\n    left.set(leftSpeed);\n    right.set(rightSpeed);\n  }\n\n  public void stop() {\n    left.stopMotor();\n    right.stopMotor();\n  }\n\n  public double getDistance() {\n    return encoder.getDistance();\n  }\n}',
      },
      {
        id: 3,
        title: "Commands Pt. 1 (Buttons)",
        type: "coding",
        content: `Commands call subsystem methods. They can be one-shot (InstantCommand), timed (WaitCommand), or continuous (RunCommand). In addition to these more specialized commands, you will more often than not just create a regular Command file and link that to a control input within RobotContainer. The easiest way to use them is to create a new Command file for each action you want your robot to do. So if you want your arm to move up when a certain button is pressed you will create a new command file called something like ArmUpCommand.java and within that file you will call the method you created in your Arm subsystem to move the arm up. Always make sure to call your stopArm() method (a method you should create that zeros out/sets the speed of the motor to 0) within the end() method of your command to make sure that the arm stops moving when the command ends. If you don't do this your arm will keep moving even if you aren't holding the button down and this can be dangerous and cause things to break (ALWAYS BE READY TO DISABLE THE ROBOT IN THE DRIVER STATION SO YOU CAN STOP THINGS LIKE THIS FROM BREAKING STUFF).  

        
        
        
        

Example commands:
- DriveForwardCommand: runs until a distance is reached
- ShootBallCommand: spins shooter motors for a fixed time

Key behaviors:
- Commands declare which subsystems they require (prevents conflict)
- Commands have lifecycle methods (initialize, execute, end, isFinished)

Example (conceptual):`,
        code:
          'public class DriveForwardCommand extends CommandBase {\n  private final Drivetrain drivetrain;\n  private final double targetDistance;\n\n  public DriveForwardCommand(Drivetrain dt, double distance) {\n    drivetrain = dt;\n    targetDistance = distance;\n    addRequirements(drivetrain);\n  }\n\n  @Override\n  public void initialize() {\n    drivetrain.resetEncoder();\n  }\n\n  @Override\n  public void execute() {\n    drivetrain.tankDrive(0.5, 0.5);\n  }\n\n  @Override\n  public boolean isFinished() {\n    return drivetrain.getDistance() >= targetDistance;\n  }\n\n  @Override\n  public void end(boolean interrupted) {\n    drivetrain.stop();\n  }\n}',
        solution:
          'public class DriveForwardCommand extends CommandBase {\n  private final Drivetrain drivetrain;\n  private final double targetDistance;\n\n  public DriveForwardCommand(Drivetrain dt, double distance) {\n    drivetrain = dt;\n    targetDistance = distance;\n    addRequirements(drivetrain);\n  }\n\n  @Override\n  public void initialize() {\n    drivetrain.resetEncoder();\n  }\n\n  @Override\n  public void execute() {\n    drivetrain.tankDrive(0.5, 0.5);\n  }\n\n  @Override\n  public boolean isFinished() {\n    return drivetrain.getDistance() >= targetDistance;\n  }\n\n  @Override\n  public void end(boolean interrupted) {\n    drivetrain.stop();\n  }\n}',
      },
         {
        id: 4,
        title: "Commands Pt. 2 Default Commands (Joysticks)",
        type: "coding",
        content: `Writing commands that run continuously on a joystick axis (like driving or arm control) is a bit different than button commands. This is because unlike commands used in buttons, where usually they only run when the button is held down, joystick commands require the value of the joystick axis to be constantly read and used to tell the motors what to do as soon as the joystick axis is moved. This means that instead of just telling the motor to go at a certain speed and telling it to stop when the button is released (in the end method within the command), you need to have the method created in the subsystem that takes in a double/decimal value and sets the speed of the motors to that value. In addition to that it requires you to create the Joystick within the Command so that you can read the value of the axis and pass that over to the method I mentioned before. For something like an arm (in this case lets assume one motor is used), it would look something like this: 


public class driveCommand extends Command {
  /** Creates a new driveCommand. */
  Joystick armJoystick;
  public driveCommand() {
    // Use addRequirements() here to declare subsystem dependencies.
    addRequirements(RobotContainer.NAME_OF_SUBSYSTEM); //This lets you use the methods in your subsystem
    armJoystick = new Joystick(0); //The 0 is the port number of the joystick, you can set this up in the driver station
  }

  // Called when the command is initially scheduled.
  @Override
  public void initialize() {}

  // Called every time the scheduler runs while the command is scheduled.
  @Override
  public void execute() {
  
  RobotContainer.NAME_OF_SUBSYSTEM.moveArm(armJoystick.getRawAxis(1)); //This calls the method you created in your subsystem and passes the joystick value to it so that the motor speed is set to that value
  }


        `,
        code:
          '',
        solution:
          '',
      },
      {
        id: 5,
        title: "Controller Inputs & Binding Buttons",
        type: "coding",
        content: `Mapping controller inputs to commands is done in the RobotContainer. This lets you link joystick movements and button presses to specific actions.

Common patterns:
- whileHeld: run a command while a button is held
- whenPressed: trigger a command once on press
- toggleWhenPressed: toggle command state each press
- Default commands: bind a command to run continuously when no other command is using the subsystem (e.g., stuff on joystick axes)

Example binding (conceptual):`,
        code:
          'Joystick driver = new Joystick(0);\nJoystickButton aButton = new JoystickButton(driver, 1);\naButton.whenPressed(new InstantCommand(() -> shooter.spinUp(), shooter));\n// Or bind drive to joystick axes in DefaultCommand',
        solution:
          'Joystick driver = new Joystick(0);\nJoystickButton aButton = new JoystickButton(driver, 1);\naButton.whenPressed(new InstantCommand(() -> shooter.spinUp(), shooter));\n// Or bind drive to joystick axes in DefaultCommand',
      },
      {
        id: 6,
        title: "Controller Deadbands",
        type: "lecture",
        content: `Default commands run automatically when no other command requires the subsystem (commonly used for teleop driving). Deadbands ignore small joystick noise.

Design tips:
- Implement deadband filtering to prevent drift (if Math.abs(x) < 0.05 => 0).
- Keep default commands lightweight.
- Use scaling and sensitivity curves when mapping joystick input to motor output.`,
      },
      {
        id: 7,
        title: "Programming Fundamentals — Quiz",
        type: "quiz",
        content: "Verify understanding of subsystems, commands, and scheduler behavior.",
        question: "What prevents two commands from controlling the same subsystem simultaneously?",
        options: {
          a: "Java VM",
          b: "Scheduler + command requirements",
          c: "NetworkTables",
          d: "SmartDashboard"
        },
        correctAnswer: "b",
        explanation:
          "The scheduler manages command lifecycle and prevents commands from running concurrently if they declare the same subsystem as a requirement.",
      }
    ]
  },

  /* =========================
     4. Sensors & Inputs
     ========================= */
  {
    id: 4,
    title: "Sensors & Inputs",
    description:
      "Explanations of common robot sensors, how to read them in code, and how to reason about their data using website simulations and exercises.",
    lessons: [
      {
        id: 1,
        title: "Limit Switches & Digital Inputs",
        type: "coding",
        content: `Limit switches are simple digital inputs: pressed (True) or not pressed (False).

Usage:
- Usually wired to Digital IO ports
- Debounce if your hardware is noisy (ignore bouncing for X ms)
- Use as safety stops (stop motion when pressed)

Pitfalls:
- Wiring polarity (NO vs NC). Logic may be inverted.
- Not debouncing leads to false triggers.

Web exercise:
- Given simulated button press timestamps, ask students to implement a debounce function that returns true only if the state is stable for 20ms.`,
        code:
          'public boolean debounce(boolean raw, long lastChangedMillis, long nowMillis) {\n  long diff = nowMillis - lastChangedMillis;\n  return raw && diff >= 20; // simplistic example for site exercises\n}',
        solution:
          'public boolean debounce(boolean raw, long lastChangedMillis, long nowMillis) {\n  long diff = nowMillis - lastChangedMillis;\n  return raw && diff >= 20; // simplistic example for site exercises\n}',
      },
      {
        id: 2,
        title: "Encoders — distance & velocity",
        type: "coding",
        content: `Encoders measure rotation (in ticks). There are two common types: incremental (quadrature) and absolute.

Key concepts:
- Counts per revolution (CPR) converts ticks to distance
- Gear ratios multiply counts
- getDistance() often returns real-world units (meters). Conversion: distance = ticks / CPR * wheelCircumference

Common tasks:
- Zeroing/resetting encoders before autonomous
- Using encoder velocities for feedforward control

Notes:
- A rotation of the axle does not always mean one rotation of mechanism it is attached to (due to gearing).

Exercise:
- Given wheel diameter and encoder CPR, compute distance per tick and total distance after N ticks.`,
        code:
          'double wheelDiameterMeters = 0.1524; // 6 inches\nint cpr = 2048;\ndouble circumference = Math.PI * wheelDiameterMeters;\ndouble distancePerTick = circumference / cpr;\n// Example: ticks = 4096 -> distance = distancePerTick * 4096',
        solution:
          'double wheelDiameterMeters = 0.1524; // 6 inches\nint cpr = 2048;\ndouble circumference = Math.PI * wheelDiameterMeters;\ndouble distancePerTick = circumference / cpr;\n// Example: ticks = 4096 -> distance = distancePerTick * 4096',
      },
      {
        id: 3,
        title: "Gyro & IMU — orientation and heading",
        type: "lecture",
        content: `Gyros measure rotational rate; IMUs combine gyro + accelerometer + magnetometer.

Important concepts:
- Integrate rate to get angle (wpilib handles this)
- Watch for wrap-around (angles often normalized to -180..180 or 0..360)
- Drift: gyros can slowly drift; sensor fusion reduces error.

Practice:
- Normalize an angle to the range -180 to 180 (show code snippet and ask student to predict output).`,
        code:
          'public double normalizeAngle(double angle) {\n  while (angle > 180) angle -= 360;\n  while (angle <= -180) angle += 360;\n  return angle;\n}',
        solution:
          'public double normalizeAngle(double angle) {\n  while (angle > 180) angle -= 360;\n  while (angle <= -180) angle += 360;\n  return angle;\n}',
      },
      {
        id: 4,
        title: "Cameras & Vision (conceptual)",
        type: "lecture",
        content: `Vision systems provide rich data but also complexity. On-site we cover high-level concepts and sample outputs rather than live camera feeds.

Topics:
- How vision produces targets (x,y,area,confidence)
- Latency & filtering (average detections to reduce jitter)
- Using vision for alignment (compute error between camera target and desired setpoint)

Exercise:
- Given a target x offset (-0.2 to 0.2), compute a steering correction using a simple proportional controller (kP * error).`,
        code:
          'double kP = 0.5;\ndouble xError = 0.12; // positive means target is right of center\ndouble correction = kP * xError; // apply to left/right motor speeds',
        solution:
          'double kP = 0.5;\ndouble xError = 0.12; // positive means target is right of center\ndouble correction = kP * xError; // apply to left/right motor speeds',
      },
      {
        id: 5,
        title: "Sensors & Inputs — Quiz",
        type: "quiz",
        content: "Quick check for sensor basics.",
        question: "Which sensor would you use to measure wheel rotations precisely?",
        options: {
          a: "Limit switch",
          b: "Encoder",
          c: "Gyro",
          d: "Camera"
        },
        correctAnswer: "b",
        explanation:
          "Encoders are designed to measure rotation and are the standard for wheel distance/velocity measurements.",
      }
    ]
  },

  /* =========================
     5. Autonomous Programming
     ========================= */
  {
    id: 5,
    title: "Autonomous Programming",
    description:
      "Design patterns and approaches for writing autonomous robot behaviors, explained with website exercises and simulated examples.",
    lessons: [
      {
        id: 1,
        title: "Timed Autonomous — reasoning & limitations",
        type: "lecture",
        content: `Timed autos run actions for predetermined durations. They're simple but fragile (and can fail for many reasons).

When to use:
- If you can guarantee consistent robot & field conditions (this sounds easy but is rarely the case).
- You don't have access to the needed sensors to make life easy (very often the case).
- You need a quick-and-dirty solution for a simple task/problem coverup (likely the position you will be in during setup day at competition/in between matches).

Limitations:
- Battery voltage, field conditions (friction differences between test field and real competition field), and collisions change results.
- Lack of sensor feedback makes them brittle.

VERY IMPORTANT NOTES: 
-If you have seen the auto work decently well during testing while at the competition field, DO NOT IMMEDIATELY CHANGE THINGS. This will result in you likely breaking something that was working but that the field team messed up or changed while placing the robot down (or just dumb luck). If you have time try and make it consistent but it may not always work, and that is OK. You can always try and fix it between matches if you have time. 
- DO NOT CHANGE MULTIPLE THINGS AT ONCE. Change things one at a time if you can afford time to test, this will make it so you can identify what change fixed or broke something. (This will save time and sanity in the long run).`,
      },
      {
        id: 2,
        title: "Sensor-Based Autonomous — encoders & gyros",
        type: "coding",
        content: `Use sensor feedback to make autonomous more reliable. Instead of waiting a fixed time, stop when an encoder reaches a count or gyro reaches an angle.

Example pattern:
- Reset sensors
- Command motors to move
- Use if conditions to check sensor values and have the motor stop moving when the target is reached

Pitfalls:
- Not resetting encoders/gyro at start leads to incorrect distances.
- Using noisy sensor spikes without filtering can prematurely end actions.

Example code snippet (conceptual):`,
        code:
          'public void autonomousInit() {\n  drivetrain.resetEncoder();\n  drivetrain.resetGyro();\n  schedule(new DriveToDistanceCommand(drivetrain, 2.0)); // 2 meters\n}\n\n// DriveToDistanceCommand uses encoder feedback in isFinished()',
        solution:
          'public void autonomousInit() {\n  drivetrain.resetEncoder();\n  drivetrain.resetGyro();\n  schedule(new DriveToDistanceCommand(drivetrain, 2.0)); // 2 meters\n}\n\n// DriveToDistanceCommand uses encoder feedback in isFinished()',
      },
      {
        id: 3,
        title: "Sequencing & Parallel Actions",
        type: "lecture",
        content: `You often need to run sequences of actions (drive, then shoot) or parallel actions (spin up shooter while driving). Command groups help you express both.

Patterns:
- SequentialCommandGroup: run tasks one after another
- ParallelCommandGroup: run tasks together (ends when all finish)
- ParallelDeadlineGroup: run multiple commands but end when a "deadline" command finishes

Exercise:
- Given a required sequence (drive 3m, spin shooter for 2s, feed ball), design a command group and explain dependencies.`,
      },
      {
        id: 4,
        title: "Path Following — concepts (no installation)",
        type: "lecture",
        content: `Path following uses precomputed trajectories and controllers (Ramsete, Pure Pursuit). On the website we cover the math, expected inputs/outputs, and how trajectory files are structured.

Core ideas:
- Trajectory = time stamped poses (x,y,heading)
- Controller computes wheel speeds to follow path
- Feedforward + feedback loop reduces tracking error

Exercise:
- Visualize a sample trajectory (provided on-site) and answer: where should we slow down? why?`,
      },
      {
        id: 5,
        title: "Autonomous — Quiz",
        type: "quiz",
        content: "Check understanding of sensors vs timed autos and sequencing.",
        question: "Which approach is generally more robust to real-world variability?",
        options: {
          a: "Purely timed commands",
          b: "Sensor-based commands",
          c: "Neither",
          d: "Both are equivalent"
        },
        correctAnswer: "b",
        explanation:
          "Sensor-based commands react to actual robot state and are typically more robust than purely timed sequences.",
      }
    ]
  },

  /* =========================
     6. Advanced Topics
     ========================= */
  {
    id: 6,
    title: "Advanced Topics",
    description:
      "Advanced but website-taught topics: control theory, tuning, telemetry, debugging practices and safety best practices for robot code.",
    lessons: [
      {
        id: 1,
        title: "PID Control — intuition and web exercises",
        type: "lecture",
        content: `PID controllers are fundamental for closed-loop control.

Intuition:
- P (proportional): correct proportionally to error
- I (integral): correct accumulated steady-state error
- D (derivative): dampen overshoot by reacting to rate of error change

Common use-cases:
- Maintain shooter wheel speed
- Control elevator position
- Keep heading using gyro

On-site interactive:
- Change kP/kI/kD values on simulated plant and observe overshoot, settling time, steady-state error.
- Provide best-practice starting values and tuning steps. MIGHT WANT TO REMOVE THIS IF IT'S TOO COMPLEX

Pitfalls:
- Too high kP causes oscillation.
- Integral windup — limit integral accumulation.`,
      },
      {
        id: 2,
        title: "Feedforward + Feedback (practical patterns)",
        type: "lecture",
        content: `Robot control often uses feedforward for predictable dynamics and feedback for corrections.

Feedforward:
- Compute expected motor output from velocity/acceleration targets
- Reduces burden on PID loop
- Often used for things such as robot arms or drivetrains so that you can counteract constant forces (gravity, friction)

Feedback:
- Corrects modeling inaccuracies and disturbances

On-site exercise:
- Given a motion profile velocity and kS/kV/kA constants, compute a feedforward voltage and combined output with a feedback correction.`,
      },
      {
        id: 3,
        title: "Logging, Telemetry & SmartDashboard Concepts",
        type: "coding",
        content: `Good telemetry is essential for debugging.

Best practices:
- Log meaningful metrics (encoder distance, battery voltage, motor temperature, error terms)
- Avoid spamming logs at high rates; sample at appropriate intervals
- Use SmartDashboard/Shuffleboard keys that describe what you send

Example telemetry calls:`,
        code:
          'SmartDashboard.putNumber("L Encoder", drivetrain.getLeftDistance());\nSmartDashboard.putNumber("R Encoder", drivetrain.getRightDistance());\nSmartDashboard.putNumber("Battery", RobotController.getBatteryVoltage());',
        solution:
          'SmartDashboard.putNumber("L Encoder", drivetrain.getLeftDistance());\nSmartDashboard.putNumber("R Encoder", drivetrain.getRightDistance());\nSmartDashboard.putNumber("Battery", RobotController.getBatteryVoltage());',
      },
      {
        id: 4,
        title: "Debugging Strategies (website exercises using logs)",
        type: "lecture",
        content: `Debugging is about forming hypotheses and isolating problems.

Common strategies:
- Reproduce problem in simulation or on-site test harness
- Log state at key points
- Binary search the code (disable subsystems to isolate failure)
- Use abstractions to create unit-testable functions

On-site exercise:
- Show a failing log trace and ask students to identify the most likely cause (sensor drift vs motor wiring).`,
      },
      {
        id: 5,
        title: "Safety & Best Practices",
        type: "lecture",
        content: `Safety is non-negotiable.

Key points:
- Always implement software and mechanical hard-stops.
- Use watchdog/soft-timeouts for long-running actions.
- Respect voltage/current limits; monitor temperatures and errors.
- Fail safe on sensor errors (e.g., if encoder returns NaN, stop movement).

On-site quiz:
- Multiple choice about when to fallback to a safe stop.`,
      },
      {
        id: 6,
        title: "Advanced Topics — Quiz",
        type: "quiz",
        content: "Check knowledge on PID basics and telemetry best practices.",
        question: "Which term helps reduce steady-state error in a PID controller?",
        options: {
          a: "Proportional (P)",
          b: "Integral (I)",
          c: "Derivative (D)",
          d: "Feedforward (F)"
        },
        correctAnswer: "b",
        explanation: "Integral accumulates error over time and reduces steady-state error.",
      }
    ]
  },

  /* =========================
     7. Capstone & Practice Projects
     ========================= */
  {
    id: 7,
    title: "Capstone Projects & Guided Practices",
    description:
      "A set of web-only capstone style exercises that combine multiple skills: reading code, predicting behavior, and writing small snippets to achieve goals.",
    lessons: [
      {
        id: 1,
        title: "Capstone: Drive Straight Simulation (conceptual)",
        type: "coding",
        content: `Objective:
- Given a simplified drivetrain API and simulated noisy gyro/encoder values, write code (or choose pseudocode) that keeps the robot driving straight for 3 meters.

Requirements:
- Use encoder-based distance to stop at 3m.
- Use gyro-based heading correction with a simple P controller to maintain heading.

Evaluation (on-site):
- Student submits code; site runs simulation and reports final error and a score.

Hints:
- Reset both encoders and gyro at start.
- Use a small kP for heading correction to prevent oscillation.`,
        code:
          'public void autoDriveStraight(Drivetrain dt) {\n  dt.resetEncoder();\n  dt.resetGyro();\n  double kP = 0.05;\n  while (dt.getAverageDistance() < 3.0) {\n    double headingError = normalizeAngle(0 - dt.getHeading());\n    double correction = kP * headingError;\n    double baseSpeed = 0.4;\n    dt.tankDrive(baseSpeed - correction, baseSpeed + correction);\n    // In real robot avoid while-loop blocking — use commands/scheduler\n  }\n  dt.stop();\n}',
        solution:
          'public void autoDriveStraight(Drivetrain dt) {\n  dt.resetEncoder();\n  dt.resetGyro();\n  double kP = 0.05;\n  while (dt.getAverageDistance() < 3.0) {\n    double headingError = normalizeAngle(0 - dt.getHeading());\n    double correction = kP * headingError;\n    double baseSpeed = 0.4;\n    dt.tankDrive(baseSpeed - correction, baseSpeed + correction);\n    // In real robot avoid while-loop blocking — use commands/scheduler\n  }\n  dt.stop();\n}',
      },
      {
        id: 2,
        title: "Capstone: Simple Shooter Control (conceptual)",
        type: "coding",
        content: `Objective:
- Implement a control sequence that spins up a shooter, checks speed via encoder, and then feeds a ball once at-target speed is reached.

Key points:
- Use feedback (encoder RPM) to determine when to start feeder motor.
- Add a timeout as a safety fallback.

On-site evaluation:
- Simulate variable wind/drag affecting RPM; students must tune thresholds to pass.`,
        code:
          'public void shootSequence(Shooter shooter, Feeder feeder) {\n  shooter.setTargetRPM(3200);\n  shooter.enable();\n  double start = System.currentTimeMillis();\n  while (System.currentTimeMillis() - start < 5000) { // 5s timeout\n    if (Math.abs(shooter.getRPM() - 3200) < 50) { // within 50 RPM\n      feeder.start();\n      Timer.delay(0.5); // feed time\n      feeder.stop();\n      break;\n    }\n  }\n  shooter.disable();\n}',
        solution:
          'public void shootSequence(Shooter shooter, Feeder feeder) {\n  shooter.setTargetRPM(3200);\n  shooter.enable();\n  double start = System.currentTimeMillis();\n  while (System.currentTimeMillis() - start < 5000) { // 5s timeout\n    if (Math.abs(shooter.getRPM() - 3200) < 50) { // within 50 RPM\n      feeder.start();\n      Timer.delay(0.5); // feed time\n      feeder.stop();\n      break;\n    }\n  }\n  shooter.disable();\n}',
      },
      {
        id: 3,
        title: "Capstone Reflection & Next Steps",
        type: "lecture",
        content: `After completing the capstones, reflect on:
- Which parts required tuning vs logic fixes?
- What telemetry was most helpful?
- Where would you add safety checks for competition?

Next steps on site:
- Offer downloadable cheat-sheets (types, common WPILib classes, tuning tips)
- Offer an "export to repo" template for when students are ready to run on hardware.`,
      }
    ]
  }
];
