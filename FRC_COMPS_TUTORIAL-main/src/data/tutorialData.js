export const tutorialData = [
  /* =========================
     1. Java Basics
     ========================= */
  {
    id: 1,
    title: "Java & FRC Basics",
    description:
      "Foundation Java topics focused on explanations, examples, and web-based practice that prepare learners to read and reason about FRC robot code.",
    lessons: [
      {
        id: 1,
        title: "Variables & Data Types",
        type: "lecture",
        content: `This lesson goes beyond "what" a variable is and explains "why" types matter in FRC robot programming. Variables hold data, types tell Java how to store and operate on that data. You will typicallly use the following types in FRC robot programming: int (whole numbers), double (decimal numbers), boolean (true/false), and String (text). Drag the following snippets to assemble variable declarations for things like a controller id, motor speeds, to see if a sensor senses something, or to have print statements for debugging.`,
        media: [
          // { type: "image", src: "/src/assets/media/testPath", alt: "test" },
          { type: "video", src: "https://www.youtube.com/embed/9mv4nd3P8nk", alt: "test2" },

        ],
        // codeBlocks: [
        //   'double rightSpeed = 0.5;',
        //   'String robotName = "DemoBot";',
        //   'int teamNumber = 4321;',
        //   'boolean isAutonomous = false;',
        //   'double leftSpeed = 0.5;'
        // ],
        // solution: [
        //   'int teamNumber = 4321;',
        //   'double leftSpeed = 0.5;',
        //   'double rightSpeed = 0.5;',
        //   'boolean isAutonomous = false;',
        //   'String robotName = "DemoBot";'
        // ]
      },
      {
        id: 2,
        title: "Print statements + Debugging",
        type: "coding",
        content: `Print statements are ways that the user can get feedback from their code within the terminal. This can be helpful to help debug code so you can see the flow of code execution (for example, if you notice that something you expected to happen isn't happening, your code may be getting skipped so you can add print statements to see if a certain block of code is being executed). 
        
        Drag the following snippets to assemble the print statement logic to check battery voltage levels.`,
        codeBlocks: [
          `if (batteryVoltage < 11.0) {
          \nSystem.out.println("Low battery — reduce performance"); }`,
          `else if (batteryVoltage < 12.0) {
          \nSystem.out.println("Battery moderate — monitor"); }`,
          `else {
          \nSystem.out.println("Battery OK"); }`
        ],
        solution: [
          `if (batteryVoltage < 11.0) {
          \nSystem.out.println("Low battery — reduce performance"); }`,
          `else if (batteryVoltage < 12.0) {
          \nSystem.out.println("Battery moderate — monitor"); }`,
          `else {
          \nSystem.out.println("Battery OK"); }`
        ]
      },
      {
        id: 3,
        title: "Methods & Parameters",
        type: "coding",
        content: `Methods let you package behavior. For most methods that have the robot do actions you won't need to return a value so you will just use the "void" return type so you don't have to return anything. 
        
        Drag the snippets to assemble a method that makes the robot drive forward.`,
        codeBlocks: [
          `public void driveAtSpeed(double speed) {`,
          `leftMotor.set(speed);
           \nrightMotor.set(speed);`,
          `}`
          
        ],
        solution: [
          `public void driveAtSpeed(double speed) {`,
          `leftMotor.set(speed);
           \nrightMotor.set(speed);`,
          `}`
          
        ]
      },
      {
        id: 4,
        title: "Java Basics — Quiz",
        type: "quiz",
        content: "Check foundational concepts (types, control flow, methods).",
        question: "Which type should be used to represent a motor speed that may be -1.0 to 1.0?",
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
     2. Robot Programming Fundamentals - Intro + Subsystems
     ========================= */
  {
    id: 2,
    title: "Robot Programming Fundamentals - Intro + Subsystems",
    description:
      "Core structure and idioms of FRC robot software explained with examples you can study and reason about on the website.",
    lessons: [
      {
        id: 1,
        title: "Project Structure & Command-Based Architecture",
        type: "lecture",
        content: `Command-based architecture increases modularity and decouples scheduling (what runs) from subsystems (what acts).

**Main pieces:**

**Subsystems:** contain methods used to control robot mechanisms and handle robot/sensor logic

**Commands:** encapsulate behaviors, can be sequenced or run concurrently

**Robot container:** connects subsystems to commands and input bindings

Advantages:
- Easier to test and reason about behaviors
- Makes troubleshooting easier since mechanisms are isolated/organized by their subsystem or commands (ex. if one motor isn't moving how you expect it to move, you can look at the subsystem and command files that control the motor and see if there is an issue there rather than looking through a thousand lines of code in one file).`
      },
      {
        id: 2,
        title: "What is a Subsystem?",
        type: "lecture",
        content: `A subsystem class acts similar to a code library, you essentially will define the functions/methods that you will be using in your commands. This will include methods that do things such as drive, stop, set brake mode, read sensors, etc.... This is a very important concept to understand as it is the backbone of your robot code as although it is relatively simple, it can make your life way easier. This is because you will be able to call these methods in your commands without needing to write the logic of a specific action multiple times (ex. moving an arm to a position using an encoder), you will instead just call the method and the robot will do it (provided you made sure it works).`
      },
      {
        id: 3,
        title: "Writing a Subsystem",
        type: "lecture",
        content: `A subsystem will contain a constructor method (which will be the name of the file/class) and a periodic method. When creating a subsystem you will mainly be creating your own methods that you will later call in your commands to make the robot do things. In your template class, you will create your speedcontrollers, sensors, and any other objects you need to control your mechanism within the subsystem (This will be done between the line that says "public class THENAMEOFTHECLASS extends SubsystemBase {" and the line that says "public THE NAMEOFTHECLASS() {"). You will then intialize these objects within the constructor method. Once this is done, you will create your methods below the periodic method that will control your mechanism (ex. moveArmUp(), moveArmDown(), stopArm(), etc...).`,
      },
      {
        id: 4,
        title: "Writing a Subsystem: Activity",
        type: "coding",
        content: `Drag snippets to assemble a Drivetrain subsystem with TalonFX speed controllers with a tankDrive method to control the robot and a stop method to halt the motors.`,
        codeBlocks: [
          'public class Drivetrain extends SubsystemBase {',
          'TalonFX left, right;',
          'public Drivetrain() {',
          'left = new TalonFX(0);',
          'right = new TalonFX(1);}',
          'public void periodic() {}',   
          'public void tankDrive(double leftSpeed, double rightSpeed) {',
          'left.set(leftSpeed); right.set(rightSpeed); }',
          'public void stop() {',
          'left.set(0); right.set(0); }',
        ],
        solution: [
          'public class Drivetrain extends SubsystemBase {',
          'TalonFX left, right;',
          'public Drivetrain() {',
          'left = new TalonFX(0);',
          'right = new TalonFX(1);}',
          'public void periodic() {}',   
          'public void tankDrive(double leftSpeed, double rightSpeed) {',
          'left.set(leftSpeed); right.set(rightSpeed); }',
          'public void stop() {',
          'left.set(0); right.set(0); }',
        ]
      },
      
      {
        id: 5,
        title: "Subsystems & Commands — Quiz",
        type: "quiz",
        content: "Check understanding of object relationships and command lifecycle.",
        question: "Which method in a Command is repeatedly called by the scheduler get the robot to do things?",
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
     3. Robot Programming Fundamentals - Commands
     ========================= */
      {
    id: 3,
    title: "Robot Programming Fundamentals - Commands",
    description:
      "All the 'setup' knowledge students need, presented on-site: what each tool does, how pieces fit together, and conceptual workflows — no installations required.",
    lessons: [
  {
        id: 1,
        title: "What is a Command?",
        type: "lecture",
        content: `Commands call subsystem methods. They can be one-shot (InstantCommand), timed (WaitCommand), or continuous (RunCommand). In addition to these more specialized commands, you will more often than not just create a regular Command file and link that to a control input within RobotContainer. The easiest way to use them is to create a new Command file for each action you want your robot to do. So if you want your arm to move up when a certain button is pressed, or use a joystick you will create a new command file.`
      },
      {
        id: 2,
        title: "Writing a Command - Buttons",
        type: "lecture",
        content: `There are two ways we will primarily use commands, controlling them using buttons and controlling them using joysticks. When using buttons the simplest (yet tedious way) is to create a new command file for each individual action you want your robot to do. For example, if you are controlling a robot arm, the arm at its most basic level can do 2 things: move up, move down. So you will create 2 command files: one for moving the arm up and one for moving the arm down if you are using buttons to control the arm. To do this you will need to bring in the methods from your subsystem that you made earlier so you will use the addRequirements(RobotContainer.SUBSYSTEM_NAME) method within the constructor of your command file to bring in the subsystem. You will then call the method you will want to be used when a button is pressed within the execute() method of your command file. And then finally you will (usually) want to stop the mechanism when the button is released so you will call the stop method you made in your subsystem within the end() method of your command file.`,
      },
      {
        id: 3,
        title: "Button Command - Activity",
        type: "coding",
        content: `Drag snippets to assemble a MoveArmUp command that calls the Arm subsystem's moveArmUp() method and requires the Arm subsystem.`,
        codeBlocks: [
           `public class moveArmUpCommand extends Command{
          \npublic moveArmUpCommand(){`,
          `addRequirements(RobotContainer.armSubystem); }`,
          `public void execute(){`,
          `RobotContainer.armSubsystem.moveArmUp(); }`,
          `RobotContainer.armSubsystem.stopArmDown(); }`,
          `public void end(boolean interrupted){`,
          `RobotContainer.armSubsystem.stopArm(); }`,
          
        ],
        solution: [
          `public class moveArmUpCommand extends Command{
          \npublic moveArmUpCommand(){`,
          `addRequirements(RobotContainer.armSubystem); }`,
          `public void execute(){`,
          `RobotContainer.armSubsystem.moveArmUp(); }`,
          `public void end(boolean interrupted){`,
          `RobotContainer.armSubsystem.stopArm(); }`,
        

        ]
      },
      {
        id: 4,
        title: "Writing a Command - Joysticks",
        type: "lecture",
        content: `Writing the command for joysticks is very similar to writing the command for buttons. The main difference is that you will be getting a value from the joystick axis in order to control the speed of the motor rather than having the motor go at a preset speed. This means that for your method you will have to create one that takes in a parameter/input variable (ex. moveArm(double speed)) rather than just having a method that makes the arm go up at a preset speed. In your command file you will need to create a joystick (Joystick JOYSTICK_NAME = new Joystick(JOYSTICK_ID)), this will be declared above the constructor and intialized within the constructor. You will then get the value of the axis you are using to control the mechanism within the execute() method by using JOYSTICK_NAME.getRawAxis(AXIS_ID) and passing that value into the method you made in your subsystem to control the mechanism. You will not need to put anything in the end() method as when using joysticks, the motor will not move when the joystick not being moved (as the value will be 0.0 unless there is stick drift and in that case get a new controller).`,
      },
      {
        id: 5,
        title: "Joystick Command - Activity",
        type: "coding",
        content: `Drag snippets to assemble a moveArmCommand that reads joystick axis 1 and calls the Arm subsystem's moveArm(double speed) method.`,
        codeBlocks: [
          `public class moveArmCommand extends Command{`,
          `Joystick driverJoystick;`,
          `public moveArmCommand(){
           \ndriverJoystick = new Joystick(1);}`,
          `public void execute(){`,
          `RobotContainer.armSubsystem.moveArm(driverJoystick.getRawAxis(1));}`,
          `public void end(boolean interrupted){`,
          `RobotContainer.armSubsystem.stopArm();`,
          `}`,
        
          
        ],
        solution: [
          `public class moveArmCommand extends Command{`,
          `Joystick driverJoystick;`,
          `public moveArmCommand(){
           \ndriverJoystick = new Joystick(1);}`,
          `public void execute(){`,
          `RobotContainer.armSubsystem.moveArm(driverJoystick.getRawAxis(1));}`,
          `public void end(boolean interrupted){`,
          `}`,

        ]
      },
      {
        id: 6,
        title: "Using Commands in RobotContainer",
        type: "lecture",
        content: `You have now created commands, however, right now they aren't able to do anything since they are not being executed/activated. In order to do this you will need to go into the RobotContainer class/file and bind the commands to either buttons or joysticks. This is done within the configureBindings() method of the RobotContainer class/file. For buttons you will create a new JoystickButton object (JoystickButton BUTTON_NAME = new JoystickButton(JOYSTICK_OBJECT, BUTTON_ID)) and then you will use the whenPressed() method of the button object to bind the command to the button (BUTTON_NAME.whenPressed(new CommandName());). For joysticks you will use the setDefaultCommand() method of the subsystem object to bind the command to the subsystem (SUBSYSTEM_OBJECT.setDefaultCommand(new CommandName());). This is because these commands require a constant reading of the joystick axis in order to use them in the commands, this means that these commands are always activated when the robot is enabled.`,
      },
      
      
    ]
  },

  /* =========================
     4. Sensor Integration
     ========================= */
      {
    id: 4,
    title: "Sensor Integration",
    description:
      "How to use sensors to give your robot feedback about the world and make smarter decisions and make your robot more consistent and autonomous.",
    lessons: [
  {
        id: 1,
        title: "Types of sensors & what they are used for",
        type: "lecture",
        content: `There are many different types of sensors used in robotics, each with its own specific purpose. Some common types of sensors include:

        - Limit Switches:
          Pros: Simple and reliable for detecting the presence or absence of an object. .
          Cons: Can only detect the presence or absence of an object, not its distance. May wear out over time with mechanical use (these get pressed a lot)

        - Ultrasonic Sensors: 
          Pros: Measure distance to an object using sound waves. Useful for obstacle detection and avoidance.
          Cons: Can be affected by environmental noise (things happening around the sensor that can intefere with the sound waves), can have a limited range, and may struggle with soft or angled surfaces.

        - Gyroscopes:
          Pros: Measure rotational motion and orientation. Useful for maintaining balance and navigation/robot heading(which way the robot is facing).
          Cons: Can drift over time, requiring calibration. May be sensitive to vibrations.

        - Encoders:
          Pros: Measure rotational position and speed of motors or wheels (in a measure called ticks, each encoder may have a different ratio for how many ticks there are per rotation of the axle). Useful for precise movement control and distance measurement. Also makes consistent movements less dependent on battery voltage levels.
          Cons: Can be affected by slippage or mechanical issues. May require additional hardware for installation (ex. be built into a speed controller, or external mounting brackets/account for spacing to insert encoder on a shaft within mechanism).`

      },
      {
        id: 2,
        title: "Sensor Types — Quiz",
        type: "quiz",
        content: "Figure out which sensor to use for different tasks.",
        question: "Which type of sensor should you use to stop a robot arm from moving too far up?",
        options: {
          a: "Encoder",
          b: "Camera",
          c: "Limit Switch",
          d: "Ultrasonic Sensor"
        },
        correctAnswer: "c",
        explanation:
          "Although you can use an encoder to measure position and tell the arm to stop once it reaches a certain height, a limit switch is a more simple & cost effective solution for this task."
      },
      {
        id: 3,
        title: "Limit Switch - Activity",
        type: "coding",
        content: `Limit switches are simple sensors that act as a flag to tell the robot to do/not do something/stop when the limit switch is pressed. They are commonly used to prevent a mechanism to move past a certain point to stop them from breaking. Limit switches give a boolean value (true/false) depending on whether they are pressed or not. In this activity drag the snippets to assemble code that stops a robot arm from moving up if the upper limit switch is pressed (the value is true).`,
        codeBlocks: [
           ``,
          
        ],
        solution: [
          ``,
        

        ]
      },
      {
        id: 4,
        title: "Encoders - Activity",
        type: "coding",
        content: `Encoders are sensors that measure the rotation of a motor/axle in ticks. They are used to determine the position of a mechanism or see how far a robot has traveled. Each encoder brand may have a different ratio for how many ticks there are per rotation of the axle. Keep in mind, a rotation of the axle DOES NOT ALWAYS equal a rotation of the mechanism (ex. an arm) as there may be gears or other mechanisms in between the motor and the mechanism. When making a command with encoders you will have a method in your subsystem which returns the value of the encoder (in ticks converted to rotations) and then in your command you will use that value to determine when to stop moving the mechanism using an if statement. You can also make the command implement the "isFinished()" method to automatically stop the command when the condition is met. This will make it so the command will not work again because the value will still be true, so you will need to use this very carefully (ex. Use encoders for one time movements on a button like moving the arm to a certain position).
        
        In this activity drag the snippets to assemble code that moves a robot arm up until it reaches 500 ticks on the encoder.`,
        codeBlocks: [
           ``,
          
        ],
        solution: [
          ``,
        

        ]
      },
      {
        id: 5,
        title: "Gyroscopes - Activity",
        type: "coding",
        content: `Gyroscopes are sensors that measure the orientation of the robot (yaw, pitch, roll). They are commonly used to help the robot maintain a certain heading or balance. These are especially useful for swerve/holonomic drive robots as they can help the robot maintain a certain orientation while moving in different directions. They have also been used in previous seasons to help keep the robot balanced on a balance board. Like encoders you will typically set up a get method to get the yaw, pitch, or roll value of the gyroscope and use that in an if statement or in a complicated formula in the case of swerve drive (swerve will not be covered here but if you are interested use the YAGSL- Yet Another Generic Swerve Library or the example templates made by CTRE). 
        
        In this activity drag the snippets to assemble code that makes the robot drive forward while maintaining a heading of 0 degrees using a gyroscope.`,
        codeBlocks: [
           ``,
          
        ],
        solution: [
          ``,
        

        ]
      },
      {
        id: 6,
        title: "Ultrasonic - Activity",
        type: "coding",
        content: `Ultrasonic sensors measure the distance from the sensor to an object using sound waves. They are most often used for obstacle detection and avoidance, nowadays they are less often used in FRC due to the prevalance of vision systems but are pretty simple to use and understand so they are a good starting point if you don't understand smart vision systems like those seen with Limelight or PhotonVision. Ultrasonics typically have a getDistance() or getRange() method that returns the distance to the nearest object in either inches, centimeters, or milimeters depending on the model of ultrasonic being used. You will use this value in an if statement or isFinished() method of a command to dictate when an action should start or stop. 
        
        In this activity drag the snippets to assemble code that makes the robot stop if it gets within 12 inches of an obstacle while driving forward.`,
        codeBlocks: [
           ``,
          
        ],
        solution: [
          ``,
        

        ]
      },
      
      
      
    ]
  },

  /* =========================
     5. Autonomous Programming
     ========================= */
  {
    id: 5,
    title: "Autonomous Programming",
    description:
      "How to program your robot for the autonomous period of a match using commands & sensor feedback.",
    lessons: [
      {
        id: 1,
        title: "Autonomous Best Practices",
        type: "lecture",
        content: `The autonomous period in an FRC match lasts for 15 seconds where the robot operates without any driver input. This means that all actions are pre-programmed and rely on previous testing of the autonomous program/script to ensure the robot does what is expected as points during autonomous under most FRC rulesets are worth more than points during the teleoperated portion of the match. Safety is a big concern during autonomous testing as without driver input the robot may do unexpected actions that could be dangerous for the robot, game field/pieces, or people around the robot. ALWAYS make sure to let EVERYONE AROUND know when you are about to test a run of your autonomous script. In addition to that, you should also start by running the autonomous at less speed than you intend on running it at when you begin testing, this makes it so you see that the actions are being done correctly before you run it at a faster speed. On the topic of full speed, the robot's move fast, when the robot starts at full speed from a stopped position, the robot can lurch forward making it so the robot either doesn't go straight or can actually make your robot fall over if you have robot mechanisms fully extended (ex. arm straight up/robot elevator up high). To combat this you can either use a ramp rate method (CTRE/Talon speed controllers support this) or you can just have your autonomous not run at full speed (80-90% is still plenty fast for autonomous, if you must use 100% to have your auto finish in under 15 seconds, be careful). Finally, ALWAYS make sure someone is in the driver station application ready to disable the robot if something goes wrong. If the robot doesn't stop once disable is hit you might have to do an emergency stop on the robot by hitting the physical emergency stop button or power button on the robot, be knowledgeable about where these are on your robot before testing autonomous and prioritize your own safety and the safety of those around you over your robot.`
      },
      {
        id: 2,
        title: "Making an Time-Based Autonomous Command Sequence",
        type: "lecture",
        content: `Altough sensor-based autonomous is way more reliable and consistent (and super easy), time-based autonomous is where most teams start off with since they often don't either have the required sensors nor the knowledge to use them properly. Time-based autonomous works most often by using if statements within a command's execute() method to tell the robot what to do at certain time intervals. You will use a Timer object to keep track of how long the command has been running. You will declare/create this Timer object above the constructor and initialize it within the constructor. A VERY IMPORTANT step is to reset (TIMER_NAME.reset()) AND start the timer (TIMER_NAME.start()) within the initialize() method, this makes it so the timer starts counting from 0.0 seconds when the command starts running. To retrieve the value from the Timer object you will use the get() method (TIMER_NAME.get()) which returns a double value representing the number of seconds since the timer was started(). You would use an if/else if/else statement structure to tell the robot what to do at certain time intervals. It would look something like this if(timer.get() <2.0){ start driving forward } else if(2.0<timer.get() < 4.0){ stop drive forward & move arm out } else { stop arm} }. The reason why we will use either less/greater than (</>) or less than/equal to/greater than (<=/>=) is because sometimes the robot may not read a specific time value (ex. 2.0 seconds) due to how fast the code is running and how often the get() method is being called within execute() due to the command scheduler. Finally, remember to stop ALL MOTORS within the end() method of the command to make sure it stops moving at the end of autonomous or if the command has to end early for some reason.`,
      },
      {
        id: 3,
        title: "Time-Based Autonomous — Quiz",
        type: "quiz",
        content: "Check your understanding of timers and command structure.",
        question: "In this activity, which set of code will have the robot go forward for two seconds, then turn right with a tank control drivetrain method (tankDrive(leftSpeed, rightSpeed)) [assume it takes 1.5 seconds to turn 90 degrees at 100 percent speed] then go forward again for 2 seconds and then stop?",
        options: {
          a: `drivetrain.tankDrive(1.0, 1.0);
              \nif(timer.get() >2.0 && timer.get() <=2.1){
              \ndrivetrain.tankDrive(0.0, 0.0);
              \ndrivetrain.tankDrive(1.0, -1.0);}
              else if(timer.get() >3.6 && timer.get() <=3.7){
              \ndrivetrain.tankDrive(0.0, 0.0);
              \ndrivetrain.tankDrive(-1.0, -1.0);}
              else if(timer.get() >5.7){
              \ndrivetrain.tankDrive(0.0, 0.0);}`,
          b: `drivetrain.tankDrive(1.0, 1.0);
              if(timer.get() >2.0 && timer.get() <=2.1){
              \ndrivetrain.tankDrive(0.0, 0.0);
              \ndrivetrain.tankDrive(-1.0, 1.0);}
              else if(timer.get() >3.6 && timer.get() <=3.7){
              \ndrivetrain.tankDrive(0.0, 0.0);
              \ndrivetrain.tankDrive(1.0, 1.0);}
              else if(timer.get() >5.7){
              \ndrivetrain.tankDrive(0.0, 0.0);}`,
          c: `drivetrain.tankDrive(1.0, 1.0);
              if(timer.get() >2.0 && timer.get() <=2.1){
              \ndrivetrain.tankDrive(0.0, 0.0);
              \ndrivetrain.tankDrive(1.0, -1.0);}
              else if(timer.get() >3.6 && timer.get() <=3.7){
              \ndrivetrain.tankDrive(0.0, 0.0);
              \ndrivetrain.tankDrive(1.0, 1.0);}
              else if(timer.get() >8.7){
              \ndrivetrain.tankDrive(0.0, 0.0);}`,
          d: `drivetrain.tankDrive(1.0, 1.0);
              if(timer.get() >2.0 && timer.get() <=2.1){
              \ndrivetrain.tankDrive(0.0, 0.0);
              \ndrivetrain.tankDrive(1.0, -1.0);}
              else if(timer.get() >3.6 && timer.get() <=3.7){
              \ndrivetrain.tankDrive(0.0, 0.0);
              \ndrivetrain.tankDrive(1.0, 1.0);}
              else if(timer.get() >5.7){
              \ndrivetrain.tankDrive(0.0, 0.0);}`
        },
        correctAnswer: "d",
        explanation:
          ""
      }
      
    ]
  },
    
];
